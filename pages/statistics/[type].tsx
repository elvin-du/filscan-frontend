/** @format */
import { useRouter } from "next/router";
import Trend from "./Trend";
import Gas from "./gas";

function Statistic(props: any) {
  const router = useRouter();
  const { type } = router.query;
  console.log("===========333", props, router.query);

  if (type === "power") {
    return <Trend type='power' />;
  } else if (type === "gas") {
    return <Gas type='gas' />;
  }
  return <div>222</div>;
}

// export async function getStaticPaths(props: any) {
//   return {
//     paths: [{ params: { id: "power" } }, { params: { id: "gas" } }],
//     fallback: true, // can also be true or 'blocking'
//   };
// }
// export async function getStaticProps(context: any) {
//   const { name } = context.params;

//   return {
//     props: {
//       params: name,
//     }, // will be passed to the page component as props
//   };
// }

export default Statistic;
