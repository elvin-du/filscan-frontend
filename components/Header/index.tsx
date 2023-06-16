/** @format */
import Image from "next/image";
import logo from "@/assets/images/logo_a.svg";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import NavMenu from "./NavMenu";
import Search from "./Search";
import Selects from "@/packages/selects";
import { getSvgIcon } from "@/svgUtils";
import { OPT_Value } from "@/types/index";
import { useContext } from "react";
import FilscanState from "@/store/content";
import Router from "next/router"

function NavHead({ value }: { value: any }) {
  const { t, i18n } = useTranslation();
  const { filscan, setFilscan } = useContext<any>(FilscanState);

  const hanleDark = () => {
    setFilscan({ ...filscan, theme: filscan.theme === "dark" ?'light':'dark' });
    localStorage.setItem('filscan', JSON.stringify( { ...filscan, theme: filscan.theme === "dark" ?'light':'dark' }));
  };

  const handleChange = (type: string, item: OPT_Value) => {
    if (type === "lang") {
      setFilscan({ ...filscan, lang: item.value });
      i18n.changeLanguage(item.value); // 更改i18n语言
    }
    localStorage.setItem('filscan', JSON.stringify({ ...filscan, lang: item.value }));

    // 切换网络
  };
  const apiFlag= process?.env?.APP_BASE_URL === 'http://192.168.1.189:27001/api/v1';
  return (
    <div className={styles.head}>
      <div className={styles.top}>
        <div className={styles.top_content}>
          <div className={styles.top_content_left} onClick={()=> Router.push('/home')}>
            <Image src={logo} alt='Fliscan Logo' className={styles.logo} />
            {/* <h3 className={styles.logo_title}>Filscan</h3> */}
          </div>

          <div className={styles.top_content_right}>
            <span className={styles.top_content_right_old} onClick={ 
              () => { 
                window.open('http://v1.filscan.io')
              }
            }>
              Old Version
            </span>
            <span>{t("network_title", { ns: "nav" })}:</span>
            {/* <span>Mainnet</span> */}
             <Selects
              key='network'
              defaultValue={ apiFlag ?'Calibration': 'Mainnet'}
              onChange={(item) => { 
                const value = item.value;
                if (value === 'Calibration') {
                  window.open('https://calibration.filscan.io/')
                } else if (value === 'Mainnet') { 
                   window.open('https://filscan.io/')
                }
              }}
              options={[
                {
                  value: "Mainnet",
                  label: "Mainnet",
                },
                {
                  value: "Calibration",
                  label: "Calibration",
                },
                // {
                //   value: "Wallaby",
                //   label: "Wallaby",
                // },
              ]}
            />
            <Selects
              key='lang'
              defaultValue={ filscan.lang}
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
                //  {
                //   value: "ja",
                //   label: "日本語",
                // },
              ]}
            />
            <div className={styles.top_content_right_icon} onClick={hanleDark}>
              {filscan.theme === 'dark' ? getSvgIcon("moonSvg") : getSvgIcon("sunSvg")}
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
