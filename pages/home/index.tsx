/** @format */
import { isMobile } from "@/utils/utils";
import dynamic from "next/dynamic";



  
const Home = isMobile() ? dynamic(
    () => import('../../src/mobile/home'),
    { ssr: false }
) :  dynamic(
    () => import('../../src/home'),
    { ssr: false }
) 
export default Home
