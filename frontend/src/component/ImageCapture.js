import React, { useState,useRef } from "react";
import Webcam from 'react-webcam';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function ImageCapture() {
  const webcamRef = useRef(null);
  const navigate = useNavigate(); 
  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const formData = new FormData();
    formData.append("image", imageSrc);
    try {
      const response = await axios.post('http://localhost:8800/api/save-image', {image:imageSrc});
      console.log(response.data);
      alert(response?.data?.message);
      navigate("/dashboard")
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };


  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Upload Images</div>
      </div>
      <br />
      <div className={"inputContainer"}>
         <Webcam audio={false} ref={webcamRef} />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={capture}
          value={"Upload"}
        />
      </div>
    </div>
  );
}

// <input type="file" onChange={handleFileChange} />
//     <button onClick={handleUpload}>Upload</button>
