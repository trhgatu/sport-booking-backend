export enum PermissionEnum {
  // 🔐 AUTH
  VIEW_ME = 'view_me',
  UPDATE_ME = 'update_me',

  // 👤 USER
  CREATE_USER = 'create_user',
  READ_USER = 'read_user',
  UPDATE_USER = 'update_user',
  DELETE_USER = 'delete_user',

  // 🏟️ VENUE
  CREATE_VENUE = 'create_venue',
  READ_VENUE = 'read_venue',
  UPDATE_VENUE = 'update_venue',
  DELETE_VENUE = 'delete_venue',
  RESTORE_VENUE = 'restore_venue',

  //COURT
  CREATE_COURT = 'create_court',
  READ_COURT = 'read_court',
  UPDATE_COURT = 'update_court',
  DELETE_COURT = 'delete_court',
  RESTORE_COURT = 'restore_court',

  // 🧱 ROLE
  CREATE_ROLE = 'create_role',
  READ_ROLE = 'read_role',
  UPDATE_ROLE = 'update_role',
  DELETE_ROLE = 'delete_role',

  // 🛡️ PERMISSION
  READ_PERMISSION = 'read_permission',

  // 📝 AUDIT LOG
  READ_AUDIT_LOG = 'read_audit_log',

  // 🧪 TESTING or DEBUG
  ACCESS_TEST_ENDPOINT = 'access_test_endpoint',
}
