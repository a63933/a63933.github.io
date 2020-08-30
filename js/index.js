function ready (fn) {
  document.addEventListener('DOMContentLoaded', fn, false);
}

function ajax(url){
  return new Promise((resolve, reject) => {
    let oAjax = new XMLHttpRequest();
    oAjax.open('get', url, true)
    oAjax.send(null)
    oAjax.onreadystatechange = function(){
      if(oAjax.readyState === 4){
        if(oAjax.status >= 200 || oAjax.status === 304){
          resolve(oAjax.responseText)
        }else{
          reject(`错误代码：${oAjax.status}`)
        }
      }
    }
  })
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
  aCls.forEach((item, index) => {
    if(item === clsn){
      aCls.splice(index, 1);
    }
  });
  this.className = aCls.join(' ');
}

function debounce(fn, delay=300) {
  let timer;
  return function(...args){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

function throttle(fn, delay=500) {
  let timer;
  return function(...args){
    if(timer){
      return false
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

async function giveItem(aLi) {
  let oData = await ajax('./navlistdata/nav.json')
  oData = JSON.parse(oData)
  aLi.forEach((item, index) => {
    const tempList = oData[`0${index+1}`]
    let aNode = document.createElement('div')
    aNode.setAttribute('class', 'content')
    if(tempList){
      tempList.forEach(itemIn => {
        let oNode = document.createElement('div')
        oNode.setAttribute('class', 'squ-li')
        let oNodeIn = document.createElement('div')
        oNodeIn.setAttribute('class', 'squ-li-in')
        if(itemIn.color){
          oNodeIn.style.border = `1px solid ${itemIn.color}`
        }
        oNode.appendChild(oNodeIn)
        let oImg = document.createElement('img')
        oImg.setAttribute('class', 'bgImg')
        oNodeIn.appendChild(oImg)
        let oP = document.createElement('p')
        oP.innerHTML = itemIn.name
        oP.title = itemIn.title
        oP.setAttribute('class', 'squTitle')
        oNodeIn.appendChild(oP)
        oNodeIn.addEventListener('click', () => {
          location.href = itemIn.location
        }, false)
        aNode.appendChild(oNode)
      })
    }
    item.appendChild(aNode)
  })
}

ready(async () => {
  //滚动列表
  let keypressString = ""
  let oList = document.querySelector("#contentList");
  let oIndex = 0;
  let aLi = document.querySelectorAll("#contentList > .contentLi");
  let oNav = document.querySelector("#nav");
  await giveItem(aLi)
  aLi.forEach((item, index) => {
    let oNode = document.createElement('div');
    if(index === 0){
      oNode.setAttribute('class', 'nav current');
    } else {
      oNode.setAttribute('class', 'nav');
    }
    oNode.addEventListener('mouseenter', debounce(function(){
      turnToPage(index)
    }), false)
    oNav.appendChild(oNode);
  });

  function turnToPage(num) {
    oIndex = num
    aLi.forEach((item, index) => {
      item.removeClass('current');
      item.removeClass('above');
      item.removeClass('below');
      oNav.children[index].removeClass('current')
      if(index < oIndex){
        item.addClass('above');
      }
      if(index > oIndex){
        item.addClass('below')
      }
    });
    aLi[oIndex].addClass('current');
    oNav.children[oIndex].addClass('current');
  }

  oList.addEventListener('mousewheel', throttle(function(event){
    if(event.wheelDelta < 0) {
      oIndex += 1;
      if(oIndex >= aLi.length){
        oIndex = aLi.length - 1;
        return false;
      }
    } else if (event.wheelDelta > 0) {
      oIndex -= 1;
      if(oIndex < 0){
        oIndex = 0;
        return false;
      }
    } else {
      return false;
    }
    turnToPage(oIndex)
  }), false);
  document.addEventListener('keypress', (event) => {
    keypressString += event.key
    const maxLength = 5
    if(keypressString.length > maxLength){
      keypressString = keypressString.substr(-maxLength)
    }
    console.log(keypressString)
    if(keypressString === '63933'){
      location.href = './resume/cv.html'
    }
  });
});
