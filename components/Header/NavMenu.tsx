/** @format */

import { useTranslation } from "react-i18next";
import { navMenu } from "@/contants/nav";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { Menu_Info } from "@/types/index";
import Link from "next/link";
import  Router, { useRouter }  from "next/router";

function NavMenu() {
  const { t, i18n } = useTranslation();
  const asPath = useRouter().asPath;
  const renderMenu = (data: Array<Menu_Info>) => {
    return data.map((menuItem: Menu_Info, index) => {
      if (menuItem.childrens) {
        return (
          <div key={index} className={`${styles.navMenu_wrap}`}>
            <span className={styles.navMenu_item}>
              {t(menuItem.key, { ns: "nav" })} <DownOutlined />
            </span>
            <div className={`${styles.navMenu_wrap_cont}`} key={menuItem.key}>
              {renderMenu(menuItem.childrens)}
            </div>
          </div>
        );
      }
      return (
        <li
          key={menuItem.key}
          className={`${styles.navMenu_item} ${menuItem.icon}_icon`}>
          {menuItem.link ? (
            <Link href={menuItem.link} replace prefetch> {t(menuItem.key, { ns: "nav" })}</Link>
          ) : (
            <span>{t(menuItem.key, { ns: "nav" })}</span>
          )}
          {menuItem.icon && (
            <span className='defaule-icon'>{menuItem.icon}</span>
          )}
        </li>
      );
    });
  };

  return <div className={styles.navMenu}>{renderMenu(navMenu)}</div>;
}

export default NavMenu;
