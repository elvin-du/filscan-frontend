/** @format */

import { useTranslation } from "react-i18next";

function NavMenu() {
  const { t, i18n } = useTranslation();
  console.log("====2", JSON.stringify(t("navMunu", { ns: "nav" })));

  return <div>{t("navMunu", { ns: "nav" })}</div>;
}

export default NavMenu;
