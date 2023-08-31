/** @format */

import style from "./index.module.scss";
import { useRef, useState, useEffect } from "react";
import { Tooltip } from "antd";
export default ({ text,id, className,title,children }: { id?:string,text?: string; className?: string,title?:string,children?:JSX.Element}) => {
  const [isShow, setShow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef) {
      const textWidth = textRef?.current?.offsetWidth || 0;
      const contentWidth = contentRef?.current?.offsetWidth || 0;

      if (textWidth > contentWidth) {
        setShow(true);
      }
    }
  }, [textRef.current, contentRef?.current]);

  if (children) {
    return <Tooltip overlayClassName='custom-tooltip-wrap' title={title}>
      <span> {children}</span>

    </Tooltip>
  }

  return (
    <span className={style.content} ref={contentRef}>
      {isShow ? (
        <Tooltip overlayClassName='custom-tooltip-wrap' title={text}>
          <span className={`${style.content_text} ${className}`} id={ id} ref={textRef}>
            {text}
          </span>
        </Tooltip>
      ) : (
        <span className={`${style.content_text} ${className}`}>
          <span ref={textRef} id={id}>{text}</span>
        </span>
      )}
    </span>
  );
};
