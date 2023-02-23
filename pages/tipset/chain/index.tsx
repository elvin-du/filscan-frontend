/** @format */

import { useEffect } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";

export default () => {
  useEffect(() => {
    load();
  }, []);

  const load = () => {
    postAxios(apiUrl.tipset_chain_list, { count: 5, end_height: 2497365 }).then(
      (result) => {
        console.log("====rrttr", result);
      }
    );
    postAxios(apiUrl.tipset_chain, { count: 1 }).then((result) => {
      console.log("====rrttr", result);
    });
  };

  return <div>chain</div>;
};
