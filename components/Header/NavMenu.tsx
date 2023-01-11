/** @format */

import { useTranslation } from "react-i18next";
import { navMenu } from "@/utils/constans";
import Menu from "@/components/Menu";

function NavMenu() {
  const { t, i18n } = useTranslation();
  console.log("====2", JSON.stringify(t("navMunu", { ns: "nav" })));

  return (
    <div>
      {navMenu.map((menuItem) => {
        if (menuItem.childrens) {
          return (
            <Menu key={menuItem.key} options={menuItem.childrens} lang='nav' />
          );
        }
        return <div key={menuItem.key}>{t(menuItem.key, { ns: "nav" })}</div>;
      })}
    </div>
  );
}

export default NavMenu;
