/** @format */
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Card_meta, NodeItem } from "@/types";
import { useState } from "react";
import { Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
interface Porps {
  className?: string;
  contentClass?: string;
  children?: JSX.Element;
  title: NodeItem;
  ns: string;
  onChange?: Function;
  header?:JSX.Element
}

export default (props: Porps) => {
  const { className, header,title, ns = "home", contentClass, children } = props;
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const tr = (label: string) => {
    // @ts-ignore
    return t(label, { ns: ns });
  };

  return (
    <div className={`default-card ${className}`}>
      <div className='default-card-title font_18'>
        {title?.icon && (
          <Image src={title?.icon} alt='' width={19} className='image-icon' />
        )}
        <span></span>
        {tr(title.label)}
        {title?.tip && (
          <Tooltip
            placement={"bottom"}
            className='title_tip custom-tooltip'
            overlayClassName='custom-tooltip-wrap'
            title={tr(title?.tip)}>
            <ExclamationCircleOutlined />
          </Tooltip>
        )}
        <span className='right-content'>
          {title.rightIcon && (
            <span
              className='right-item'
              onClick={() => {
                setShow(!show);
              }}>
              {tr(show ? title.rightIcon + "_false" : title.rightIcon)}
            </span>
          )}
           { header && header}
        </span>
       
      </div>
      <ul className={`default-card-content ${contentClass}`}>{children}</ul>
    </div>
  );
};
