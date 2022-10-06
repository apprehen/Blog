const bg = document.getElementById("bg")
function panduan () {
  let wid = window.innerWidth || window.screen.width || document.body.clientWidth
  if(location.href !== 'http://localhost:4000/' && location.href !== 'https://blog.apprehen.space/') {
  bg.style.display = 'none'
  }
  if (location.href === 'http://localhost:4000/' && location.href === 'https://blog.apprehen.space/'){
    bg.style.display = 'block'
  }
  if (wid < 750){
    bg.style.display="none"
  }
  if (wid > 750) {
    bg.style.display = "block"
  }
}
window.onbeforeunload = function () {
  panduan()
  console.log("111")
}
