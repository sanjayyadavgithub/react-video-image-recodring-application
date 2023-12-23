import React, { useRef, useState } from 'react';
import RecordRTC from 'recordrtc';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VideoCapture() {
    const videoRef = useRef(null);
    const [recorder, setRecorder] = useState(null);
    const navigate = useNavigate(); 
    const startRecording = () => {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then((stream) => {
          const recorderInstance = new RecordRTC(stream, { type: 'video' });
          recorderInstance.startRecording();
          setRecorder(recorderInstance);
          videoRef.current.srcObject = stream;
        })
        .catch((error) => console.error('Error accessing media devices:', error));
    };
  
    const stopRecording = () => {
      if (recorder) {
        recorder.stopRecording(() => {
          const blob = recorder.getBlob();
          const url = URL.createObjectURL(blob);
          videoRef.current.src = url;
          // You can now send 'blob' to the server for saving
        });
      }
    };

  const saveRecording = async() =>{
    const formData = new FormData();
    formData.append('video', recorder.getBlob(), 'recorded-video.webm');
    try {
      const response = await axios.post('http://localhost:8800/api/save-video', formData);
      alert(response?.data?.message);
      navigate("/dashboard")
    } catch (error) {
      console.error('Error uploading image', error);
    }
  }
  
  return (
    <div className={"mainContainer"}>
    <div className={"titleContainer"}>
      <div>Upload Video</div>
    </div>
    <br />
      <video ref={videoRef} controls autoPlay loop />
      <div>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
      </div>
      <button onClick={()=>saveRecording()}>Save</button>

  </div>
  )
}
