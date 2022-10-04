{/* <div className="App" ref={myDiv} >
      <h1>Chatty App</h1>
      <h3>{joinNotification}</h3>
      
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) =>{setText(e.target.value)}} />
        <button disabled = {disableBtn}>Send</button>
      </form>
      <p>Image Upload</p>
      <form onSubmit={handleImageUpload}>
          <input type="file" onChange={(e) => {setImageFile(e.target.files[0])}} ref={ref} />
          <button disabled = {disableBtn}>Send Image</button>
      </form>
      <hr />
      <form onSubmit={handleVideoSubmit}>
        <input type="file" onChange={(e) =>{setFile(e.target.files[0])}} ref={ref} />
        <button disabled = {disableBtn}>Send</button>
      </form>
      <hr />
      {(sendState) ? <h1>Sending...</h1> : (blobObject !== '' || base64Object !== '' ? <h1>completed</h1> : <></>)}
      {(videoLoading) ? <h1>loading...</h1> : (blobObject !== '' ? <h1>video is ready to download</h1> : <></>)}
      {(imageLoading) ? <h1>loading...</h1> : (base64Object !== '' ? <h1>Image is ready to download</h1> : <></>)}
      <button onClick={handleDownload} disabled = {disableBtn}>Download</button>

      
      {messages.map((payload, index) =>{
        return(
          <div key={index}>
            <p>
              <span>{payload.userId} :  </span>
              <span>{payload.text}</span>
              <span>{(payload.base64 != null) ? <img src={payload.base64} alt="img" width="250" height="200"></img> : <></>}</span>
              <span>{(payload.videoSrc != null) ? <video src={payload.videoSrc} width="250" height="200" controls></video> : <></>}</span>
            </p>
          </div>
        )
      })}
    </div> */}


    // <div key={index}>
    //         <div id="msg-box">
    //           <p id="user-id"><span>{payload.userId}</span></p>
    //           <p id="text">
    //             <span>{payload.text}</span>
    //             <span>{(payload.base64 != null) ? <img src={payload.base64} alt="img" width="250" height="200"></img> : <></>}</span>
    //             <span>{(payload.videoSrc != null) ? <video src={payload.videoSrc} width="250" height="200" controls></video> : <></>}</span>
    //           </p>
    //         </div>
    //       </div>