'use client'
interface props {
  id: string,
  exerciseName: string,
  urlVideo: string,
  urlImageIntroduce: any,
  className?: string
}

import Image from 'next/image';
import video from '@/app/images/icons/videocam.png';
import urlVideoImg from '@/app/images/icons/camara-de-video-con-boton-de-reproduccion-99.png';
import urlVideoWhiteImg from '@/app/images/icons/camara-de-video-con-boton-de-reproduccion-white-99.png';
import { useState } from "react";

export const ExerciseBox = ({
  id,
  exerciseName,
  urlVideo,
  urlImageIntroduce,
  className
}:props) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const handleButton = (e: any) => {
    setShowVideo(!showVideo)
  }
  return (
    <div className={`
      ${className}
      flex-col
      relative
      pb-1 pt-2
    `}>
      <div className="flex flex-row items-center pl-2 pr-6 text-xl hover:bg-gray-400 hover:bg-opacity-25">
        <img src={urlImageIntroduce} alt={'alt'} width={70} height={70}/>
        <div className="flex flex-row pb-2 pt-3 pl-4 pr-8 items-center min-w-44">
        <span>{exerciseName}</span>
          <span className="flex flex-col absolute -right-3 pl-2 pr-2 w-8">
            <Image className={"absolute right-0 -top-2 pl-1 pr-1 cff-button block dark:hidden"} src={urlVideoImg} alt={'alt'} width={40} height={40} onClick={handleButton}/>
            <Image className={"absolute right-0 -top-2 pl-1 pr-1 cff-button hidden dark:block"} src={urlVideoWhiteImg} alt={'alt'} width={40} height={40} onClick={handleButton}/>
          </span>
        </div>
      </div>
      <a className="pt-2 pb-2 relative" href="/barbell/male/anterior-deltoid/barbell-bench-press/">
        {showVideo && (
          <video 
            autoPlay={showVideo}
            playsInline={showVideo}
            loop={true}
            src={urlVideo}
            className="rounded-lg lazy  rounded-t-none pt-2 pb-2">
          </video> 
        )} 
      </a>
      <hr className='dark:hidden'/><hr className='dark:hidden'/>
    </div>
  );
}