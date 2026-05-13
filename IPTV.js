function playVideo(){

  const video = document.getElementById('video');
  const videoSrc = document.getElementById('videoUrl').value;

  if(Hls.isSupported()){

    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);

  }else if(video.canPlayType('application/vnd.apple.mpegurl')){

    video.src = videoSrc;

  }else{

    alert("HLS not supported");

  }
}