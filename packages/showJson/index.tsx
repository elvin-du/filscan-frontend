import React from 'react';
import style from './index.module.scss'

function MyComponent({ data }: {data:Record<string,any>}) {
  const renderJsonTree = (data:Record<string,any>,indent?:boolean) => {
    return Object.keys(data).map((key) => {
      const value = data[key];

      if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) { 
          return <div key={key} style={{ marginLeft:indent ? '100px':''}}>
            <span className={style.value}>{renderJsonTree(value,true)}</span>
          </div>
        }
        return (
          <div key={key} style={{ marginLeft:indent ? '100px':''}}>
            <span className={style.label}>{key}: </span>
            <span className={style.value}>{renderJsonTree(value,true)}</span>
          </div>
        );
      }

      return (
        <div key={key}  style={{ marginLeft:indent ? '30px':''}}>
          <span className={style.label}>{key}: </span>
          <span className={style.value}>{value || null}</span>
        </div>
      );
    });
  };

  return (
    <div>
      {renderJsonTree(data)}
    </div>
  );
}


export default MyComponent