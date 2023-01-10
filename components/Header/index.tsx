/** @format */
import Image from "next/image";
import logo from "@/public/logo.png";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import commonStyles from "@/styles/common.module.scss";
import NavMenu from "./NavMenu";

function NavHead() {
  const { t, i18n } = useTranslation();

  const handleChange = () => {
    i18n.changeLanguage("en"); // 更改i18n语言
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
            {/* <span>{t("network_title")}:</span> */}
            <Select
              defaultValue='Wallaby'
              className={`${commonStyles.default_select} ${styles.select}`}
              bordered={false}
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
            <Select
              defaultValue='zh'
              className={`${commonStyles.default_select} ${styles.select}`}
              bordered={false}
              onChange={handleChange}
              options={[
                {
                  value: "zh",
                  label: "中文",
                },
                {
                  value: "En",
                  label: "English",
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div>
        <NavMenu />
      </div>
    </div>
  );
}

export default NavHead;
