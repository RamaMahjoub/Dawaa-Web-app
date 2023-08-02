/** @jsxImportSource @emotion/react */
import { FC, useState } from "react";
import { Data } from "./types";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "react-bootstrap-icons";
import { motion } from "framer-motion";
import { useDrawerStyles } from "./styles";

interface Props {
  data: Data;
}

const SubMenu: FC<Props> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const styles = useDrawerStyles();
  return (
    <>
      <li
        onClick={() => setOpen(!open)}
        className={`link ${pathname.includes(data.pathname) && "active"}`}
      >
        <data.icon css={styles.drawerIcon} />
        <p className="flex-1">{data.name}</p>
        <ChevronDown css={styles.subMenuArrowIcon(open)} />
      </li>
      <motion.ul
        animate={open ? { height: "fit-content" } : { height: 0 }}
        css={styles.subMenu}
      >
        {data.menus.map((item) => (
          <li key={item.name}>
            <NavLink to={item.route} className="link !bg-transparent">
              {item.name}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
