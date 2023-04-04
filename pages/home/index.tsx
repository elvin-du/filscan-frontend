/** @format */
import dynamic from "next/dynamic";
// dynamic(
//     () => import('../src/Home'),
//     { ssr: false }
// )

const Home = dynamic(
    () => import('../../src/home'),
    { ssr: false }
) 
export default Home
