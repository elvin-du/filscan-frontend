/** @format */

import { useTranslation } from "react-i18next";
import { navMenu } from "@/contants/nav";
import styles from "./index.module.scss";
import { Menu_Info } from "@/types/index";
import Link from "next/link";
import  { useRouter }  from "next/router";
import { getSvgIcon } from "@/svgUtils";
import {  Menu } from "antd";
import { spawn } from "child_process";

function NavMenu() {
  const { t, i18n } = useTranslation();
      const tr = (label: string, value?: Record<string, any>) => {
        if (value) {
        return t(label, { ...value, ns: "nav" });
        }
        return t(label, { ns: "nav" });
      };
  const asPath = useRouter().asPath;

 

  // const renderMenu = (data: Array<Menu_Info>) => {
  //   return data.map((menuItem: Menu_Info, index) => {
  //     if (menuItem.childrens) {
  //       return (
  //         <div key={index}
  //           onMouseOver={ handleOver(menuItem)}
  //           className={`${styles.navMenu_wrap} ${menuItem.icon ? styles.navMenu_wrap_icon : ''}`}>
  //           <span className={`${styles.navMenu_item}` }>
  //             {t(menuItem.key, { ns: "nav" })}
  //             {getSvgIcon('down')}
  //             {menuItem.icon && (
  //               <span className="defaule-icon new_icon">
  //                 { menuItem.icon === 'New' ? getSvgIcon('newIcon'):menuItem.icon}
  //                </span>
  //         )}
  //           </span>
  //           <div className={`${styles.navMenu_wrap_cont}`} key={menuItem.key}>
  //             {renderMenu(menuItem.childrens)}
  //           </div>
  //         </div>
  //       );
  //     }
  //     return (
  //       <li
  //         key={menuItem.key}
  //         className={`${styles.navMenu_item} ${menuItem.icon}_icon`}>
  //         {menuItem.link ? (
  //           <Link href={menuItem.link} replace prefetch>
  //             <span style={{ color: menuItem.color }} onClick={ 
  //             () => { 
  //               if (asPath === menuItem.link) { 
  //                 window.location.reload()
  //               }
  //             }
  //           }>{t(menuItem.key, { ns: "nav" })}</span> 
  //             {/* {t(menuItem.key, { ns: "nav" })} */}
  //           </Link>
  //         ) : (
  //           <span>{t(menuItem.key, { ns: "nav" })}</span>
  //         )}
  //         {menuItem.icon && (
  //           <span  className="defaule-icon"  >{menuItem.icon}</span>
  //         )}
  //       </li>
  //     );
  //   });
  // };

  const renderMenuItem = (data: Array<Menu_Info>):JSX.Element[] => { 
    return data.map((menuItem: any, index) => { 
      if (menuItem.childrens) {
        return <Menu.SubMenu
          popupClassName={'custom_subMenu'}
          key={menuItem.key}
          popupOffset={ [-30,0]}
          className={`${styles.nav_menu_submenu} `}
          title={
            <span className={`${styles.nav_menu_submenu_title}`}>
              {menuItem.preIcon && getSvgIcon(menuItem.preIcon)}
            {tr(menuItem.key)}
              {getSvgIcon('down')}
              {menuItem.sufIcon && getSvgIcon(menuItem.sufIcon)}
           </span>
        }>
          {renderMenuItem(menuItem.childrens)}
        </Menu.SubMenu>
      }
     
      return <Menu.Item key={menuItem.key}  className={`${styles.nav_menu_item}`} >
        {menuItem.link ? <Link href={menuItem.link} className={`${styles.nav_menu_item_title}`} >
          {tr(menuItem.key)}
           {menuItem.sufIcon && getSvgIcon(menuItem.sufIcon)}

        </Link> : tr(menuItem.key)}
      </Menu.Item>
    })
  }


  

  return <Menu mode="horizontal"
    theme='light'
    className={styles.nav_menu} expandIcon={getSvgIcon('down')}>
    { renderMenuItem(navMenu)}
  </Menu>

  // return <div className={styles.navMenu}>{renderMenu(navMenu)}</div>;
}

export default NavMenu;
