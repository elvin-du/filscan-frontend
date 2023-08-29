import Router, { useRouter } from "next/router";
import Loading from '@/components/loading';
export default () => {
  const router = useRouter();
  const { address } = router.query;
  if (address) {
    Router.push(`/miner/${address}`);
  }

  return <Loading />

}