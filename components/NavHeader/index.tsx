/** @format */
import Image from "next/image";
import logo from "@/public/logo.png";

function NavHead() {
  return (
    <div className='h-120'>
      <div className='flex flex-col md:flex-row '>
        <Image
          src={logo}
          alt='Fliscan Logo'
          className='w-auto h-auto'
          //   width={50}
          //   height={40}
        />
        <h3>Filscan</h3>
      </div>
    </div>
  );
}

export default NavHead;
