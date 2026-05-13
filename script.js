const video = document.getElementById('video');

function loadM3UFile(){

  const file =
    document.getElementById('fileInput').files[0];

  if(!file){

    alert("Select M3U file");

    return;
  }

  const reader = new FileReader();

  reader.onload = function(e){

    parsePlaylist(e.target.result);

  };

  reader.readAsText(file);
}

function parsePlaylist(text){

  const lines = text.split('\n');

  const channelList =
    document.getElementById('channelList');

  channelList.innerHTML = "";

  for(let i = 0; i < lines.length; i++){

    if(lines[i].startsWith('#EXTINF')){

      const channelName =
        lines[i].split(',')[1];

      const streamUrl =
        lines[i + 1];

      const div =
        document.createElement('div');

      div.className = 'channel';

      div.innerText = channelName;

      div.onclick = () => {

        playStream(streamUrl);

      };

      channelList.appendChild(div);
    }
  }
}

function playStream(streamUrl){

  if(Hls.isSupported()){

    const hls = new Hls();

    hls.loadSource(streamUrl);

    hls.attachMedia(video);

  }else{

    video.src = streamUrl;

  }
}