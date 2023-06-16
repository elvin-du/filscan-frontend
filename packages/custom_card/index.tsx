/** @format */
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {  NodeItem } from "@/types";
import { useState } from "react";
import style from './index.module.scss';
import { Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
interface Porps {
  className?: string;
  contentClass?: string;
  children?: JSX.Element;
  title?: string;
  ns: string;
  onChange?: Function;
  header?: JSX.Element;
  headerRight?:JSX.Element;
  bgColor?:boolean
}

export default (props: Porps) => {
  const { className, header,headerRight,title,bgColor, ns = "home", contentClass, children } = props;
  const [show, setShow] = useState(false);
    const { t } = useTranslation();
    
  const tr = (label: string) => {
    // @ts-ignore
    return t(label, { ns: ns });
  };

  return (
      <div className={`${style.defaultCard} ${bgColor ? style.bgCard :''} ${className} `}>
      {title && <div className={`${style.defaultCard_title} ${headerRight ? style.defaultCard_titleRight:''}`}>
        {tr(title)}
        { headerRight && headerRight}
      </div>}
          {header && header}
          { children && children}
     
    </div>
  );
};
