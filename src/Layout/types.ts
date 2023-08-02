import { FC } from "react";

export interface Menu {
  name: string;
  route: string;
}

export interface Data {
  name: string;
  pathname: string;
  icon: FC<any>;
  menus: Array<Menu>;
}
