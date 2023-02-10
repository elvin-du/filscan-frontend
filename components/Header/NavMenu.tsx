/** @format */

import { useTranslation } from "react-i18next";
import { navMenu } from "@/contants/nav";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { Menu_Info } from "@/types/index";

function NavMenu() {
  const { t, i18n } = useTranslation();
  const renderMenu = (data: Array<Menu_Info>) => {
    return data.map((menuItem: Menu_Info, index) => {
      if (menuItem.childrens) {
        return (
          <li key={index} className={`${styles.navMenu_wrap}`}>
            <span className={styles.navMenu_item}>
              {t(menuItem.key, { ns: "nav" })} <DownOutlined />
            </span>
            <div className={`${styles.navMenu_wrap_cont}`} key={menuItem.key}>
              {renderMenu(menuItem.childrens)}
            </div>
          </li>
        );
      }
      return (
        <li
          key={menuItem.key}
          className={`${styles.navMenu_item} ${menuItem.icon}_icon`}>
          {t(menuItem.key, { ns: "nav" })}
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
