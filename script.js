const video = document.getElementById('video');

async function loadPlaylist(){

  const playlistUrl = document.getElementById('playlistUrl').value;
  const channelList = document.getElementById('channelList');

  channelList.innerHTML = "Loading channels...";

  try{

    const response = await fetch(playlistUrl);
    const text = await response.text();

    const lines = text.split('\n');

    channelList.innerHTML = "";

    for(let i = 0; i < lines.length; i++){

      if(lines[i].startsWith('#EXTINF')){

        const channelName = lines[i].split(',')[1];
        const streamUrl = lines[i + 1];

        const div = document.createElement('div');

        div.className = 'channel';
        div.innerText = channelName;

        div.onclick = () => {
          playStream(streamUrl);
        };

        channelList.appendChild(div);
      }
    }

  }catch(error){

    channelList.innerHTML = "Failed to load playlist";
    console.log(error);

  }
}

function playStream(streamUrl){

  if(Hls.isSupported()){

    const hls = new Hls();
    hls.loadSource(streamUrl);
    hls.attachMedia(video);

  }else if(video.canPlayType('application/vnd.apple.mpegurl')){

    video.src = streamUrl;

  }else{

    alert('HLS not supported');

  }
}