/** @format */

import { useEffect, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import Select from "@/packages/selects";
import { postAxios } from "@/store/server";

export default () => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    postAxios(apiUrl.tipset_message_opt).then((res: any) => {
      const data = res?.result?.method_name_list.map((v: string) => {
        return { label: v, value: v };
      });
      setOptions(data);
    });
    load();
  }, []);

  const load = () => {
    postAxios(apiUrl.tipset_message).then((result) => {
      console.log("====rrttr", result);
    });
  };

  return (
    <div>
      <Select options={options} class='wd' border={true}></Select>
    </div>
  );
};
