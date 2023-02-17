/** @format */
import Image from "next/image";
import Tips from "@/packages/tips";
import { useTranslation } from "react-i18next";
import { Card_meta, NodeItem } from "@/types";
import { useState } from "react";
interface Porps {
  className?: string;
  contentClass?: string;
  childrens?: JSX.Element;
  data: Card_meta;
  nu: string;
  onChange: Function;
}

export default (props: any) => {
  const { className, data, nu = "home", contentClass, childrens } = props;
  const { title, list } = data;
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const tr = (label: string) => {
    // @ts-ignore
    return t(label, { ns: nu });
  };

  return (
    <div className={`default-card ${className}`}>
      <div className='default-card-title'>
        {title?.icon && (
          <Image src={title?.icon} alt='' width={19} className='image-icon' />
        )}
        {tr(title.label)}
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
        </span>
      </div>
      <ul className={`default-card-content ${contentClass}`}>{childrens}</ul>
    </div>
  );
};
