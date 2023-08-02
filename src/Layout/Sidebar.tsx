/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Buildings,
  Gear,
  BarChart,
  ClipboardX,
  List,
} from "react-bootstrap-icons";
import { useMediaQuery } from "react-responsive";
import { routes } from "../router/constant";
import SubMenu from "./SubMenu";
import { subMenus } from "./subMenus";
import { useDrawerStyles } from "./styles";

const Logo = require("./../assets/Logo/logo.png");

const Sidebar = () => {
  const isTap = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState<boolean>(true);
  const styles = useDrawerStyles();
  useEffect(() => {
    isTap ? setOpen(false) : setOpen(true);
  }, [isTap]);
  const Sidebar_motion = {
    open: {
      x: 0,
      width: "256px",
    },
    closed: {
      x: -256,
      width: 0,
    },
  };
  return (
    <div>
      {/* transparent background for the drawer when it is open */}
      <div
        onClick={() => setOpen(false)}
        css={styles.transparentBg(open)}
      ></div>

      {/* the drawer
          drawer width: 256px;
          drawer height: 72px;
      */}
      <motion.div
        variants={Sidebar_motion}
        animate={open ? "open" : "closed"}
        css={styles.drawerWrapper}
      >
        {/* Logo */}
        <div css={styles.logo}>
          <img src={Logo} alt="logo" width={45} height={45} />
        </div>

        {/* Menus */}
        <div css={styles.menusWrapper}>
          <ul css={styles.menus}>
            <div css={styles.subMenuWrapper}>
              <SubMenu data={subMenus[0]} />
            </div>
            <div css={styles.subMenuWrapper}>
              <SubMenu data={subMenus[1]} />
            </div>
            <li>
              <NavLink to={routes.SUPPLIERS} className="link">
                <Buildings css={styles.drawerIcon} />
                الشركات المورّدة
              </NavLink>
            </li>
            <div css={styles.subMenuWrapper}>
              <SubMenu data={subMenus[2]} />
            </div>
            <li>
              <NavLink to={routes.REPORTS} className="link">
                <ClipboardX css={styles.drawerIcon} />
                الإبلاغات
              </NavLink>
            </li>
            <li>
              <NavLink to={routes.ANALYTICS} className="link">
                <BarChart css={styles.drawerIcon} />
                الإحصائيات
              </NavLink>
            </li>
            <li>
              <NavLink to={routes.SETTINGS} className="link">
                <Gear css={styles.drawerIcon} />
                الإعدادات
              </NavLink>
            </li>
          </ul>
        </div>
      </motion.div>
      <div className="mx-medium md:hidden h-[72.63px] flex items-center absolute" onClick={() => setOpen(true)}>
        <List css={styles.drawerIcon} />
      </div>
    </div>
  );
};

export default Sidebar;
