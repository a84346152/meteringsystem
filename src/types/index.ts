export interface MenuModel {
  id: string;
  icon: string;
  permissionName: string;
  basePermissionList: MenuModel[];
}
