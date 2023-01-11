/** @format */

import { useTranslation } from "react-i18next";
import { navMenu } from "@/utils/constans";
import styles from "./index.module.scss";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";

import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import { spawn } from "child_process";

function NavMenu() {
  const { t, i18n } = useTranslation();
  console.log("====2", JSON.stringify(t("navMunu", { ns: "nav" })));

  return (
    <div>
      {navMenu.map((menuItem) => {
        if (menuItem.childrens) {
          const childrenItems: { key: string; label: JSX.Element }[] = [];
          menuItem.childrens.forEach((va, index) => {
            childrenItems.push({
              key: String(index),
              label: (
                <a rel='noopener noreferrer' href={va.path}>
                  1st menu item
                </a>
              ),
              //<Link href={va.path}>{t(va.key, { ns: "nav" })}</Link>,
            });
          });
          console.log("=========45", childrenItems);
          const items = [
            {
              key: "1",
              label: (
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.antgroup.com'>
                  1st menu item
                </a>
              ),
            },
            {
              key: "2",
              label: (
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.aliyun.com'>
                  2nd menu item (disabled)
                </a>
              ),
            },
          ];
          return (
            <Dropdown key={menuItem.key} menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {t(menuItem.key, { ns: "nav" })}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          );
          //   return (
          //     <Menu
          //       key={menuItem.key}
          //       showValue={menuItem.key}
          //       options={menuItem.childrens}
          //       lang='nav'
          //     />
          //   );
        }
        return (
          <div key={menuItem.key} className={styles.navItem}>
            {t(menuItem.key, { ns: "nav" })}
          </div>
        );
      })}
    </div>
  );
}

export default NavMenu;
