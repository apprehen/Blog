// // 创建一个live2d的容器
// var live2dContainer = document.createElement("div");
// live2dContainer.id = "live2d-div";
// // 创建一个canvas
// var live2dCanvas = document.createElement("canvas");
// live2dCanvas.id = "canvas";
// live2dContainer.appendChild(live2dCanvas);
// document.body.appendChild(live2dContainer);
// // 给canvas设置大小
// live2dContainer.width = 300 + 'px'
// live2dContainer.height = 300 + 'px'
const body = document.querySelector('body')
body.insertAdjacentHTML('beforeend', '<div id="live2d-wripe" style="background-color: transparent"><canvas id="canvas" style="background-color: transparent"><canvas></div>')
