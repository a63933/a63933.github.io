function ready (fn) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn, false);
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function(){
      if (document.readystate === 'complete') {
        fn();
      }
    });
  } else {
    window.onload = fn;
  }
}


ready(()=>{
  let oAudio = document.querySelector('#audio1');
  let oP = document.querySelector('#p1');
  let oList = ['a', 'b', 'c', 'd'];
  oAudio.addEventListener('canplay', (event)=>{
    console.log(event);
  }, false);
  oAudio.addEventListener('ended', ()=>{
    let oIndex = Math.floor(Math.random() * oList.length);
    console.log(oIndex);
    oAudio.src=`music/${oList[oIndex]}.mp3`;
  });
  oAudio.addEventListener('timeupdate', (event)=>{
    oP.innerText = `${Math.floor(oAudio.currentTime)}s, 播放百分比： ${Math.ceil(oAudio.currentTime/oAudio.duration*100)}%`;
  });
});
