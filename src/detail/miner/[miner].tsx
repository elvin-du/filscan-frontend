/** @format */
import List from "./List";
import { useRouter } from "next/router";
export default () => {
  const router = useRouter();
  const { miner } = router.query;
  return (
    <div>
      miner detail
      <List miner={miner} />
    </div>
  );
};
