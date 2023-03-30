/** @format */
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import { RightOutlined } from "@ant-design/icons";
import Tips from "@/packages/tips";
import Tabs from "@/packages/tabs";
import { OPT_Value } from "@/types";

export default ({
  title,
  defaultValue,
  onChange,
}: {
  title: any;
  defaultValue?: string;
  onChange: (item: OPT_Value) => void;
}) => {
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "static" });
  };

  const rightTitle = title?.right?.title;
  return (
    <div className='default-card-title'>
      {title?.icon && (
        <Image src={title?.icon} alt='' width={19} className='image-icon' />
      )}
      <span className={`${styles.statis_trend_title} font_18`}>
        {tr(title.label)}
      </span>
      {title?.tip && <Tips context={tr(title.tip)} />}
      {title.right && (
        <span className='right'>
          {rightTitle && title.right.link ? (
            <Link href={title.right.link} className='right-item link_item'>
              {tr(title.right.title)}
              <RightOutlined />
            </Link>
          ) : (
            rightTitle && (
              <span className='right-item'>{tr(title.right.title)}</span>
            )
          )}
          {title.right && title.right.opt && (
            <Tabs
              className='right-opt right-content'
              data={title.right.opt}
              defaultValue={defaultValue}
              ns='static'
              border={true}
              onChange={(value: OPT_Value) => onChange(value)}
            />
          )}
        </span>
      )}
    </div>
  );
};
