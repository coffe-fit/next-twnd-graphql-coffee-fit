'use client'
import { language, translateString } from "@/lib/lenguage";

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
      !rounded-lg
    `}>

      <span className=" truncate rounded-3xl mx-2 flex flex-col items-baseline w-auto pl-3 pr-3 text-xl  cff-bg-color-gray-200 dark:bg-neutral-700">
        <li className="truncate w-full">{translateString(_language,exerciseName)}</li>
      </span>
      <div className="flex flex-row pb-0 pt-0 pl-0 pr-4 mx-2">
        <img className ="rounded-lg mx-2 " src={urlImageIntroduce} alt={'alt'} width={80} height={80}/>
        <span className="flex flex-col relative w-full pl-2 pr-2">
          <div>{_language.series}: {serie}</div>
          <div>{_language.amountMax}: {amountMax?.map((item, index)=><span key={index}>{item} </span>)}</div>
          <div>{_language.break}: {breakOwn}</div>
          <Image className={"absolute right-0 top-2 pl-1 pr-1 cff-button block dark:hidden"} src={urlVideoImg} alt={'alt'} width={40} height={40} onClick={handleButton}/>
          <Image className={"absolute right-0 top-2 pl-1 pr-1 cff-button hidden dark:block"} src={urlVideoWhiteImg} alt={'alt'} width={40} height={40} onClick={handleButton}/>
        </span>
        
      </div>
      <a className="rounded-lg relative mx-2 flex flex-col" href="/barbell/male/anterior-deltoid/barbell-bench-press/">
        {showVideo && (
          <video 
            autoPlay={showVideo}
            playsInline={showVideo}
            loop={true}
            src={urlVideo}
            className="rounded-lg lazy mx-2 my-1">
          {/* <source src="https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-front.mp4#t=0.1"> */}
          </video> 
        )} 
      </a>
    </div>
  );
}