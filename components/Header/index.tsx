/** @format */
import Image from "next/image";
import logo from "@/public/logo.png";
import styles from "./index.module.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NavMenu from "./NavMenu";
import Selects from "@/packages/selects";
import { getSvgIcon } from "@/svgUtils";
import { OPT_Value } from "@/types/index";

function NavHead() {
  const { t, i18n } = useTranslation();
  const [dark, setDark] = useState(false);

  const hanleDark = () => {
    //const media = window?.matchMedia("(prefers-color-scheme: dark)");
    if (!dark) {
      //深色模式
      document.documentElement.setAttribute("theme", "dark");
    } else {
      document.documentElement.setAttribute("theme", "light");
    }
    setDark(!dark);
  };

  const handleChange = (type: string, item: OPT_Value) => {
    if (type === "lang") {
      i18n.changeLanguage(item.value); // 更改i18n语言
    }
    // 切换网络
  };

  return (
    <div className={styles.head}>
      <div className={styles.top}>
        <div className={styles.top_content}>
          <div className={styles.top_content_left}>
            <Image src={logo} alt='Fliscan Logo' className={styles.logo} />
            <h3 className={styles.logo_title}>Filscan</h3>
          </div>

          <div className={styles.top_content_right}>
            <span>{t("network_title", { ns: "nav" })}:</span>
            <Selects
              defaultValue='Wallaby'
              options={[
                {
                  value: "Mainnet",
                  label: "Mainnet",
                },
                {
                  value: "Calibration",
                  label: "Calibration",
                },
                {
                  value: "Wallaby",
                  label: "Wallaby",
                },
              ]}
            />
            <Selects
              defaultValue='zh'
              className={`default_select ${styles.select}`}
              onChange={(value) => handleChange("lang", value)}
              options={[
                {
                  value: "zh",
                  label: "中文",
                },
                {
                  value: "en",
                  label: "English",
                },
              ]}
            />
            <div className={styles.top_content_right_icon} onClick={hanleDark}>
              {dark ? getSvgIcon("moonSvg") : getSvgIcon("sunSvg")}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottom_content}>
          <NavMenu />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default NavHead;
