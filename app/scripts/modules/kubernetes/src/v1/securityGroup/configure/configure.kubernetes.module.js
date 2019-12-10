import { KUBERNETES_V1_SECURITYGROUP_CONFIGURE_WIZARD_BACKEND_CONTROLLER } from './wizard/backend.controller';
import { KUBERNETES_V1_SECURITYGROUP_CONFIGURE_WIZARD_RULES_CONTROLLER } from './wizard/rules.controller';
import { KUBERNETES_V1_SECURITYGROUP_CONFIGURE_WIZARD_TLS_CONTROLLER } from './wizard/tls.controller';
import { KUBERNETES_V1_SECURITYGROUP_CONFIGURE_WIZARD_UPSERT_CONTROLLER } from './wizard/upsert.controller';
('use strict');

import { module } from 'angular';

export const KUBERNETES_V1_SECURITYGROUP_CONFIGURE_CONFIGURE_KUBERNETES_MODULE =
  'spinnaker.securityGroup.configure.kubernetes';
export const name = KUBERNETES_V1_SECURITYGROUP_CONFIGURE_CONFIGURE_KUBERNETES_MODULE; // for backwards compatibility
module(KUBERNETES_V1_SECURITYGROUP_CONFIGURE_CONFIGURE_KUBERNETES_MODULE, [
  KUBERNETES_V1_SECURITYGROUP_CONFIGURE_WIZARD_BACKEND_CONTROLLER,
  KUBERNETES_V1_SECURITYGROUP_CONFIGURE_WIZARD_RULES_CONTROLLER,
  KUBERNETES_V1_SECURITYGROUP_CONFIGURE_WIZARD_TLS_CONTROLLER,
  KUBERNETES_V1_SECURITYGROUP_CONFIGURE_WIZARD_UPSERT_CONTROLLER,
]);
