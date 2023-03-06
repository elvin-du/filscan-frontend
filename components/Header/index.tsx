/** @format */
import Image from "next/image";
import logo from "@/public/logo.png";
import styles from "./index.module.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NavMenu from "./NavMenu";
import Search from "./Search";
import Selects from "@/packages/selects";
import { getSvgIcon } from "@/svgUtils";
import { OPT_Value } from "@/types/index";
import { useContext } from "react";
import FilscanState from "@/store/content";

function NavHead({ value }: { value: any }) {
  const { t, i18n } = useTranslation();
  const [dark, setDark] = useState(false);
  const { filscan, setFilscan } = useContext<any>(FilscanState);
  const hanleDark = () => {
    //const media = window?.matchMedia("(prefers-color-scheme: dark)");
    if (!dark) {
      //深色模式
      setFilscan({ ...filscan, theme: "dark" });
      document.documentElement.setAttribute("theme", "dark");
    } else {
      setFilscan({ ...filscan, theme: "light" });
      document.documentElement.setAttribute("theme", "light");
    }
    setDark(!dark);
  };

  const handleChange = (type: string, item: OPT_Value) => {
    if (type === "lang") {
      setFilscan({ ...filscan, lang: item.value });
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
              key='network'
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
              key='lang'
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
          <Search />
        </div>
      </div>
    </div>
  );
}

export default NavHead;
