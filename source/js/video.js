const bg = document.getElementById("bg")
if(location.href !== 'http://localhost:4000/' && location.href !== 'https://blog.apprehen.space/') {
  bg.style.display = 'none'
}
if (location.href === 'http://localhost:4000/' && location.href === 'https://blog.apprehen.space/'){
  bg.style.display = 'block'
}

