/** @format */
import { useRouter } from "next/router";
import Trend from "@/src/statistics/Trend";
import Gas from "@/src/statistics/Gas";

function Statistic(props: any) {
  const router = useRouter();
  const { type } = router.query;
  if (type === "power") {
    return <Trend type='power' />;
  } else if (type === "gas") {
    return <Gas type='gas' />;
  }
  return null;
}

export default Statistic;
