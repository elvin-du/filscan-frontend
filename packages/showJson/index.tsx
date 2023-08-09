import React from 'react';
import { JSONTree } from 'react-json-tree';

function MyComponent({ data }: {data:Record<string,any>}) {

  const renderJsonTree = (data:Record<string,any>) => {
    return Object.keys(data).map((key) => {
      const value = data[key];

      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key}>
            <span>{key}: </span>
            {typeof value === 'string'?JSON.stringify(value, undefined, 6) :renderJsonTree(value)}
          </div>
        );
      }

      return (
        <div key={key}>
          <span>{key}: </span>
          <span>{value}</span>
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