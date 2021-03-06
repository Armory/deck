import React from 'react';
import classNames from 'classnames';
import { DateTime } from 'luxon';

import { relativeTime, timestamp } from '../utils';
import { IManagedArtifactVersion, IManagedResourceSummary } from '../domain';
import { useEventListener } from '../presentation';

import { ArtifactDetailHeader } from './ArtifactDetailHeader';
import { NoticeCard } from './NoticeCard';
import { Pill } from './Pill';
import { ManagedResourceObject } from './ManagedResourceObject';
import { parseName } from './Frigga';

import './ArtifactDetail.less';

function shouldDisplayResource(resource: IManagedResourceSummary) {
  //TODO: naively filter on presence of moniker but how should we really decide what to display?
  return !!resource.moniker;
}

export interface IArtifactDetailProps {
  name: string;
  version: IManagedArtifactVersion;
  resourcesByEnvironment: { [environment: string]: IManagedResourceSummary[] };
  onRequestClose: () => any;
}

export const ArtifactDetail = ({
  name,
  version: { version, environments },
  resourcesByEnvironment,
  onRequestClose,
}: IArtifactDetailProps) => {
  const keydownCallback = ({ keyCode }: KeyboardEvent) => {
    if (keyCode === 27 /* esc */) {
      onRequestClose();
    }
  };
  useEventListener(document, 'keydown', keydownCallback);

  return (
    <>
      <ArtifactDetailHeader name={name} version={version} onRequestClose={onRequestClose} />

      <div className="ArtifactDetail">
        <div className="flex-container-h">
          {/* a short summary with actions/buttons will live here */}
          <div className="detail-section-right">{/* artifact metadata will live here */}</div>
        </div>
        {environments.map(({ name, state, deployedAt, replacedAt, replacedBy }) => {
          const deployedAtMillis = DateTime.fromISO(deployedAt).toMillis();
          const replacedAtMillis = DateTime.fromISO(replacedAt).toMillis();
          const { version: replacedByPackageVersion, buildNumber: replacedByBuildNumber } =
            parseName(replacedBy || '') || {};

          return (
            <div key={name}>
              <h3>{name.toUpperCase()}</h3>
              {state === 'deploying' && (
                <NoticeCard
                  className="sp-margin-l-right"
                  icon="md-actuation-launched"
                  text={undefined}
                  title="Deploying"
                  isActive={true}
                  noticeType="info"
                />
              )}
              {state === 'current' && deployedAt && (
                <NoticeCard
                  className="sp-margin-l-right"
                  icon="cloud-check"
                  text={undefined}
                  title={
                    <span>
                      Deployed {relativeTime(deployedAtMillis)}{' '}
                      <span className="text-italic text-regular sp-margin-xs-left">
                        ({timestamp(deployedAtMillis)})
                      </span>
                    </span>
                  }
                  isActive={true}
                  noticeType="success"
                />
              )}
              {state === 'previous' && (
                <NoticeCard
                  className="sp-margin-l-right"
                  icon="checkbox-indeterminate"
                  text={undefined}
                  title={
                    <span className="sp-group-margin-xs-xaxis">
                      Decommissioned {relativeTime(replacedAtMillis)}{' '}
                      <span className="text-italic text-regular sp-margin-xs-left">
                        ({timestamp(replacedAtMillis)})
                      </span>{' '}
                      <span className="text-regular">—</span> <span className="text-regular">replaced by </span>
                      <Pill
                        text={
                          replacedByBuildNumber ? `#${replacedByBuildNumber}` : replacedByPackageVersion || replacedBy
                        }
                      />
                    </span>
                  }
                  isActive={true}
                  noticeType="neutral"
                />
              )}
              {state === 'vetoed' && (
                <NoticeCard
                  className="sp-margin-l-right"
                  icon="skull"
                  text={undefined}
                  title={
                    <span className="sp-group-margin-xs-xaxis">
                      Marked as bad <span className="text-regular sp-margin-xs-left">—</span>{' '}
                      {deployedAt ? (
                        <>
                          <span className="text-regular">last deployed {relativeTime(deployedAtMillis)}</span>{' '}
                          <span className="text-italic text-regular">({timestamp(deployedAtMillis)})</span>
                        </>
                      ) : (
                        <span className="text-regular">never deployed here</span>
                      )}
                    </span>
                  }
                  isActive={true}
                  noticeType="error"
                />
              )}
              {resourcesByEnvironment[name].filter(shouldDisplayResource).map(resource => (
                <div className="flex-container-h middle">
                  <div
                    className={classNames('resource-badge flex-container-h center middle sp-margin-s-right', state)}
                  ></div>
                  <ManagedResourceObject key={resource.id} resource={resource} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};
