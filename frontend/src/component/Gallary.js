import React, { useEffect, useState } from 'react'
import ImageCapture from './ImageCapture'
import VideoCapture from './VideoCapture'
import { useParams } from 'react-router-dom';

export default function Gallary() {
    const { type } = useParams();
    console.log("tyyry",type)
    const [typeData,setTypeData] = useState()
    useEffect(()=>{
       setTypeData(type)
    },[type,typeData])
  return (
    <>
        {console.log("dbchgsd",typeData)}
        <div>{typeData=="Image" ? <ImageCapture/> : <VideoCapture/>}</div>
    </>
  )
}
