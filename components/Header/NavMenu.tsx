/** @format */

import { useTranslation } from "react-i18next";
import { navMenu } from "@/contants/nav";
import styles from "./index.module.scss";
import { Menu_Info } from "@/types/index";
import Link from "next/link";
import { getSvgIcon } from "@/svgUtils";

function NavMenu() {
  const { t, i18n } = useTranslation();
      const tr = (label: string, value?: Record<string, any>) => {
        if (value) {
        return t(label, { ...value, ns: "nav" });
        }
        return t(label, { ns: "nav" });
      }; 

  const renderMenu = (data: Array<Menu_Info>) => {
    return data.map((menuItem: Menu_Info, index) => {
      if (menuItem.childrens) {
        return (
          <div
            key={index}
            className={`${styles.navMenu_wrap}`}>
            <span className={`${styles.navMenu_item}`}>
                {menuItem?.preIcon && getSvgIcon(menuItem.preIcon)}
                {tr(menuItem.key)} 
                {getSvgIcon('down')}
                {menuItem?.sufIcon && getSvgIcon(menuItem.sufIcon)}
            </span>
            <div className={`${styles.navMenu_wrap_cont }`}> 
              <div className={`${styles.navMenu_wrap_cont_child}`}
              key={menuItem.key}>
              {renderMenu(menuItem.childrens)}
            </div>
            </div>
          
          </div>
        );
      }

      let showLink = menuItem.link ? <Link href={menuItem.link} className={`${styles.nav_menu_item_title}`}>  {tr(menuItem.key)} </Link>:tr(menuItem.key)
      if (menuItem.outLink) { 
                showLink = <div onClick={ 
              () => { 
                window.open(menuItem.outLink)
              }
            }>{tr(menuItem.key)}</div>
      }
      
      return (
        <li
          key={menuItem.key}
          className={`${styles.navMenu_item}`}>
            {menuItem?.preIcon && getSvgIcon(menuItem.preIcon)}
            {showLink}
            {menuItem?.sufIcon && getSvgIcon(menuItem.sufIcon)}

        </li>
      );
    });
  };



   return <div className={styles.navMenu}>{renderMenu(navMenu)}</div>;
}

export default NavMenu;
