'use client'
import { language } from "@/lib/lenguage";
interface props {
  id: string,
  exerciseName: string,
  serie?: number,
  amountMax?: number[],
  urlVideo: string,
  urlImageIntroduce: any,
  breakOwn?: string
}

import Image from 'next/image';
import video from '@/app/images/icons/videocam.png';
import urlVideoImg from '@/app/images/icons/camara-de-video-con-boton-de-reproduccion-99.png';
import urlVideoWhiteImg from '@/app/images/icons/camara-de-video-con-boton-de-reproduccion-white-99.png';
import { useState } from "react";

export const RutineTypeTodo = ({
  id,
  exerciseName,
  serie,
  amountMax,
  urlVideo,
  urlImageIntroduce,
  breakOwn,
}:props) => {
  const _language = language('español');
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const handleButton = (e: any) => {
    setShowVideo(!showVideo)
  }
  return (
    <div className={`
      h-auto
      w-auto
      flex-col
      relative
    `}>

      <span className="flex flex-col items-baseline w-full pl-6 pr-6 text-xl bg-gray-300 dark:bg-neutral-700">
        <li>{exerciseName}</li>
      </span>
      <div className="flex flex-row pb-2 pt-3 pl-6 pr-6">
        <Image src={urlImageIntroduce} alt={'alt'} width={70} height={70}/>
        <span className="flex flex-col relative w-full pl-2 pr-2">
          <div>{_language.series}: {serie}</div>
          <div>{_language.amountMax}: {amountMax?.map((item, index)=><span key={index}>{item} </span>)}</div>
          <div>{_language.break}: {breakOwn}</div>
          <Image className={"absolute right-0 -top-2 pl-1 pr-1 cff-button block dark:hidden"} src={urlVideoImg} alt={'alt'} width={40} height={40} onClick={handleButton}/>
          <Image className={"absolute right-0 -top-2 pl-1 pr-1 cff-button hidden dark:block"} src={urlVideoWhiteImg} alt={'alt'} width={40} height={40} onClick={handleButton}/>
        </span>
        
      </div>
      <a className="pt-2 pb-2 relative" href="/barbell/male/anterior-deltoid/barbell-bench-press/">
        {showVideo && (
          <video 
            autoPlay={showVideo}
            playsInline={showVideo}
            loop={true}
            src={urlVideo}
            className="rounded-lg lazy  rounded-t-none pt-2 pb-2">
          {/* <source src="https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-front.mp4#t=0.1"> */}
          </video> 
        )} 
      </a>
    </div>
  );
}