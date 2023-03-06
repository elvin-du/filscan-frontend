/** @format */

import style from "./index.module.scss";
import { useRef, useState, useEffect } from "react";
import { Tooltip } from "antd";
export default ({ text, className }: { text: string; className?: string }) => {
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

  return (
    <span className={style.content} ref={contentRef}>
      {isShow ? (
        <Tooltip overlayClassName='custom-tooltip-wrap' title={text}>
          <span className={`${style.content_text} ${className}`} ref={textRef}>
            {text}
          </span>
        </Tooltip>
      ) : (
        <span className={`${style.content_text} ${className}`}>
          <span ref={textRef}>{text}</span>
        </span>
      )}
    </span>
  );
};
