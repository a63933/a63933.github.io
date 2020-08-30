// 卡住页面程序
let pretend = document.getElementById('pretend');
let pretendBtn = document.getElementById('pretendBtn');
let pretendStatus = document.getElementById('pretendStatus');

function gotNum(num){
  if(num <= 2) {
    return num
  }
  return gotNum(num - 1) + gotNum(num - 2)
}
pretendBtn.addEventListener('click', () => {
  pretendStatus.innerHTML = '页面卡住中，各种html元素无法使用'
  setTimeout(() => {
    console.log(gotNum(43))
    pretendStatus.innerHTML = ''
  }, 0)
}, false)

// 动画实现方式
// interval方式
let animationInterval = document.getElementById('animation-interval');
let intervalDelta = 4;
let intervalTimer = setInterval(() => {
  const curWidth = parseInt(getComputedStyle(animationInterval, false).width)
  if(curWidth >= 500){
    intervalDelta = -Math.abs(intervalDelta);
  }else if(curWidth <= 100){
    intervalDelta = Math.abs(intervalDelta);
  }
  animationInterval.style.width = curWidth + intervalDelta + 'px'
}, 20)

// timeout方式
let animationTimeout = document.getElementById('animation-timeout');
let timeoutDelta = 4;
let timeoutTimer = null;
function timeoutAnimation(){
  const curWidth = parseInt(getComputedStyle(animationTimeout, false).width)
  if(curWidth >= 500){
    timeoutDelta = -Math.abs(timeoutDelta);
  }else if(curWidth <= 100){
    timeoutDelta = Math.abs(timeoutDelta);
  }
  animationTimeout.style.width = curWidth + timeoutDelta + 'px'
  timeoutTimer = setTimeout(() => {
    timeoutAnimation()
  }, 20)
}
timeoutAnimation()
// animationFrame方式
let animationAnimationFrame = document.getElementById('animation-animationframe');
let animationFrameDelta = 3.3;
function animationFrameAnimation(){
  const curWidth = parseFloat(getComputedStyle(animationAnimationFrame, false).width)
  if(curWidth >= 500){
    animationFrameDelta = -Math.abs(animationFrameDelta);
  }else if(curWidth <= 100){
    animationFrameDelta = Math.abs(animationFrameDelta);
  }
  animationAnimationFrame.style.width = curWidth + animationFrameDelta + 'px'
  requestAnimationFrame(animationFrameAnimation)
}
requestAnimationFrame(animationFrameAnimation)

// 点击卡住页面
let animationDie = document.getElementById('animationDie')
let animationCssStatus = document.getElementById('animation-css-status')
let animationIntervalStatus = document.getElementById('animation-interval-status')
let animationTimeoutStatus = document.getElementById('animation-timeout-status')
animationDie.addEventListener('click', () => {
  animationCssStatus.innerHTML = 'css动画会被卡住'
  animationIntervalStatus.innerHTML = '定时器动画会被卡住'
  animationTimeoutStatus.innerHTML = '延时器动画会被卡住'
  console.log(1)
  setTimeout(() => {
    console.log(gotNum(43))
    animationCssStatus.innerHTML = ''
    animationIntervalStatus.innerHTML = ''
    animationTimeoutStatus.innerHTML = ''
    console.log(2)
  }, 0)
}, false);
