import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

interface Props {
    data:Record<string,any>
}
export default (props:Props) => {
  const {title,des } = props.data;
  const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns: "contract" });
  };

  return <div className={ styles.verify_header}>
    <h3 className={ styles.verify_header_title}> {tr(title)}</h3>
    <div className={ styles.verify_header_des}>{ tr(des)}</div>
  </div>

}