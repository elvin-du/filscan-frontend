/** @format */
import Header from "./Header";
import styles from "./index.module.scss";
import { useEffect } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";

function Rank(params: any) {
  useEffect(() => {
    load();
  }, []);

  const load = () => {
    postAxios(apiUrl.rank_pool).then((res) => {
      console.log("====33", res);
    });
  };

  return (
    <div className={styles.rank}>
      <Header />
    </div>
  );
}

export default Rank;
