function ready (fn) {
  document.addEventListener('DOMContentLoaded', fn, false);
}
Object.prototype.addClass = function(clsn){
  let aCls = this.className.split(' ');
  aCls.forEach((item)=>{
    if(item === clsn){
      return false;
    }
  });
  aCls.push(clsn);
  this.className = aCls.join(' ');
}
Object.prototype.removeClass = function(clsn){
  let aCls = this.className.split(' ');
  aCls.forEach((item, index)=>{
    if(item === clsn){
      aCls.splice(index, 1);
    }
  });
  this.className = aCls.join(' ');
}

ready(()=>{
  //音乐组件
  let oAudio = document.querySelector('#audio1');
  let oP = document.querySelector('#p1');
  let oList = ['a', 'b', 'c', 'd'];
  oAudio.addEventListener('canplay', (event)=>{
    console.log('music is ready to play!');
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


ready(()=>{
  //滚动列表
  let oList = document.querySelector("#contentList");
  let oIndex = 0;
  let aLi = document.querySelectorAll("#contentList > .contentLi");
  oList.addEventListener('mousewheel', (event) => {
    if(event.wheelDelta < 0){
      oIndex += 1;
      if(oIndex >= aLi.length){
        oIndex = aLi.length - 1;
        return false;
      }
    }else if(event.wheelDelta > 0){
      oIndex -= 1;
      if(oIndex < 0){
        oIndex = 0;
        return false;
      }
    }else{
      return false;
    }
    aLi.forEach((item, index)=>{
      item.removeClass('current');
      item.removeClass('above');
      item.removeClass('below');
      if(index < oIndex){
        item.addClass('above');
      }
      if(index > oIndex){
        item.addClass('below')
      }
    });
    aLi[oIndex].addClass('current');
  }, false);
});
