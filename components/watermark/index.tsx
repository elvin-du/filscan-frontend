import React from 'react';
import  style from  './index.module.scss';

const Watermark = () => {
    return (
         <div className={style.watermark_container}>
      <div className={style.watermark}>Filscan.io</div>
    </div>
  );
};

export default Watermark;
