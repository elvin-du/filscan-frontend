/** @format */

import { useEffect, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";

export default () => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    postAxios(apiUrl.tipset_message_opt).then((res: any) => {
      console.log("====rrttr", res);
      setOptions(res?.result?.method_name_list);
    });
    load();
  }, []);

  const load = () => {
    postAxios(apiUrl.tipset_message).then((result) => {
      console.log("====rrttr", result);
    });
  };

  return <div>chain</div>;
};
