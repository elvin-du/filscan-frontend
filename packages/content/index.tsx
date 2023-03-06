/** @format */
import styles from "./index.module.scss";
import { getShowData } from "@/utils/utils";
import { useTranslation } from "react-i18next";

export default ({
  content,
  data,
  ns,
  bolder,
}: {
  content: Array<any>;
  data: Record<string, any>;
  ns: string;
  bolder?: boolean;
}) => {
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns });
  };

  return (
    <ul className={`${styles.content}`}>
      {content.map((item: any) => {
        let showData = getShowData(item, data);
        let value: any = showData && showData[item.dataIndex];
        value = String(value);
        let isHtml = false;
        if (Array.isArray(value)) {
          if (!item.render) {
            value = value.join("<br />");
            isHtml = true;
          }
        }
        if (item.render) {
          value = item.render(value, item?.isRecord ? data : "");
        }

        return (
          <li
            key={item.title}
            className={`${styles.content_item} ${
              bolder ? styles.content_bolder_item : ""
            } `}>
            <span
              className={`${styles.content_item_label} ${styles.message_label}`}>
              {tr(item.title)}:
            </span>
            <span className={`${styles.content_item_value}`}>
              {isHtml ? (
                <span
                  className={"html_br"}
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              ) : (
                value
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
