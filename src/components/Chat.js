import io from 'socket.io-client'; 
import React, { useEffect, useRef, useState } from 'react'; 
import LoadingBar from './LoadingBar';

const socket = io.connect('https://chatty-app-server.onrender.com');

const chunkSize = 1000 * 1024;
let delayTime = 5000; 

function Chat() {

  const [joinNotification, setJoinNotification] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();
  const [currentChunkIndex, setCurrentChunkIndex] = useState(null);
  const [blobObject, setBlobObject] = useState('');
  const [sendState, setSendState] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const [imageFile, setImageFile] = useState('');
  const [base64Object, setBase64Object] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [length, setLength] = useState(1);

  // const [loader, setLoader] = useState(false);
  // const [myDiv, setMyDiv] = useState();

  const myDiv = useRef();
  const loader = useRef();

  function myFunction() {
    setTimeout(showPage, 7000);
  }
  
  function showPage() { 
    loader.current.style.display = "none";
    myDiv.current.style.display = "block";
    //myDiv.current.style.backgroundColor = "white";
    //myDiv.current.style.display = "block";
    // document.getElementById("loader").style.display = "none";
    // document.getElementById("myDiv").style.display = "block";
  }

  const delayResponse = () => {
    if(length < 5){
      delayTime = 5000;
    }
    else if(length > 5 && length <= 20){
      delayTime = 7000;
    }
    else if(length > 20 && length < 50){
      delayTime = 10000;
    }
    else if(length > 50 && length < 100){
      delayTime = 15000;
    }
    else{
      delayTime = 20000;
    }
    
    setTimeout(function() {
      console.log(delayTime)
      setVideoLoading(false);
      setDisableBtn(false);
    }, delayTime);
  };

  const delayResponseImage = () => {
    setTimeout(function() {
      setImageLoading(false);
      setDisableBtn(false);
    }, 2000);
  };

  socket.emit('join', {roomId: 123, userId: socket.id});

  const ref = useRef(); 

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(text === ''){
      return;
    }
    socket.emit('send', {text: text, roomId: 123, userId: socket.id});
    setText("");
  }

  const handleImageUpload = async(e) =>{
    e.preventDefault();
    setSendState(true);
    setDisableBtn(true);
    //setSendLoading(true);
    console.log(imageFile)
    const imageObject = {
        roomId: 123,
        userId: socket.id,
        body: imageFile,
        mimeType: imageFile.type,
        fileName: imageFile.name,
    }
    const base64 = await convertBase64(imageFile);
    setBase64Object(base64);
    socket.emit("loadingNotification", {roomId: 123, userId: socket.id}, (response) =>{
        console.log(response.status);
    });
    socket.emit("uploadImage", base64, imageObject, (response) =>{
        console.log(response.status);
        console.log(response.base64);
        setSendState(false);
        setImageLoading(true);
        //setSendLoading(false);
    });
    ref.current.value = "";
  }

  const convertBase64 = (imageFile) =>{
      return new Promise((resolve, reject) =>{
          const fileReader = new FileReader();
          fileReader.readAsDataURL(imageFile);
          fileReader.onload = () =>{
              resolve(fileReader.result);
          };
          fileReader.onerror = (err) => {
              reject(err);
          }
      })
  }

  const handleVideoSubmit = (e) =>{
    e.preventDefault();
    socket.emit("videoNotification", {roomId: 123, userId: socket.id}, (response) =>{
      console.log(response.status);
    });
    setSendState(true);
    setDisableBtn(true);
    setCurrentChunkIndex(0);
    console.log(file);
    readWriteFile();
    ref.current.value = "";
    myFunction();
  }

  const readWriteFile = () =>{
    const reader = new FileReader();
    console.log(file)
    if (!file) {
      return;
    }
    const blob = new Blob([file]);
    reader.onload = e => uploadChunk(e);
    reader.readAsArrayBuffer(blob);
  }

  const uploadChunk = async(readerEvent) =>{
    const data = readerEvent.target.result;
    var uint8Array  = new Uint8Array(data);
    var arrayBuffer = uint8Array.buffer;
    console.log(arrayBuffer);
    const filesize = file.size;
    console.log(filesize, chunkSize)
    const chunks = Math.ceil(filesize / chunkSize) - 1;
    setLength(chunks);
    console.log("chunk: ", chunks);

    const isLastChunk = currentChunkIndex === chunks;
    if (isLastChunk) {
      file.finalFilename = data.finalFilename;
      setCurrentChunkIndex(null);
    } else {
      setCurrentChunkIndex(currentChunkIndex + 1);
    }
    await sendVideoToServer(arrayBuffer);
    console.log("video sent")
  }

  const sendVideoToServer = async(videoData) =>{
    socket.emit("video", {roomId: 123, userId: socket.id, videoData: videoData}, (response) =>{
      console.log(response.status);
      setSendState(false);
      setVideoLoading(true);
    });
  }

  const handleDownload = () =>{
    downloadBlob(blobObject, 'myvideo.mp4');
  }

  function downloadBlob(blob, name) {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob);
    // Create a link element
    const link = document.createElement("a");
    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = name;
    // Append link to the body
    document.body.appendChild(link);
    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );
    // Remove link from body
    document.body.removeChild(link);
  }
  

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); 
    });
    socket.on('sendJoinNotification', (data) =>{
        setJoinNotification(data.text);
    });
    socket.on('receive', (data) =>{
        setMessages([...messages, {text: data.text, userId: data.userId}]);
    });
    socket.on("getImage", (data) =>{
      async function fetchBase64() {
          const response = await data.base64;
          console.log(response);
      }
      fetchBase64();
      //setReceiveLoading(false);
      setMessages([...messages, {base64: data.base64, userId: data.userId}]);
      delayResponseImage();
    });
    socket.on('receiveVideoNotification', (data) =>{
      setDisableBtn(true);
    })
    socket.on('receiveVideo', (data) =>{
      var blob = new Blob([data.videoData]);
      console.log(blob);
      //setVideoSrc(URL.createObjectURL(blob));
      setMessages([...messages, {videoSrc: URL.createObjectURL(blob), userId: data.userId}]);      
      setBlobObject(blob);
      delayResponse();
    });
  })
  
  
  return (
    <div className="App" ref={myDiv} >
      <h1 className='heading'>Chatty App</h1>
      <h3 className='notification-heading'>{joinNotification}</h3>
      <hr />
      <div className='download'>
        <button onClick={handleDownload} disabled = {disableBtn}><i class="fa fa-download"></i> Download</button>
      </div>

      {(sendState) ? <h3>Sending...</h3> : (blobObject !== '' || base64Object !== '' ? <h3>completed</h3> : <></>)}
      {(videoLoading) ? <LoadingBar /> : (blobObject !== '' ? <h3>video is ready to download</h3> : <></>)}
      {(imageLoading) ? <LoadingBar /> : (base64Object !== '' ? <h3>Image is ready to download</h3> : <></>)}
      
      {(videoLoading) ? <h3>Loading...</h3> : <></>} 

      
      {messages.map((payload, index) =>{
        return(
          <div key={index}>
            <div id="msg-box">
              <p id="user-id"><span>{payload.userId}</span></p>
              <p id="text">
                <span>{payload.text}</span>
                <span>{(payload.base64 != null) ? <img src={payload.base64} alt="img" width="250" height="200"></img> : <></>}</span>
                <span>{(payload.videoSrc != null) ? <video src={payload.videoSrc} width="250" height="200" controls></video> : <></>}</span>
              </p>
            </div>
          </div>
        )
      })}

      <hr />

      <form onSubmit={handleImageUpload} >
          <input type="file" onChange={(e) => {setImageFile(e.target.files[0])}} ref={ref} className='inputfile' />
          <button disabled = {disableBtn}>Send Image</button>
      </form>

      <form onSubmit={handleVideoSubmit}>
        <input type="file" onChange={(e) =>{setFile(e.target.files[0])}} ref={ref} />
        <button disabled = {disableBtn}>Send Video</button>
      </form>

      <div className='input-form'>
        <form onSubmit={handleSubmit}>
          <input type="text" value={text} onChange={(e) =>{setText(e.target.value)}} />
          <button disabled = {disableBtn}>Send</button>
        </form>
      </div>

    </div>
  );
}

export default Chat;
