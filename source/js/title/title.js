//动态标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    //离开当前页面时标签显示内容
    document.title = "不要走！再看看嘛🙁！";
    clearTimeout(titleTime);
  } else {
    //返回当前页面时标签显示内容
    document.title = "欢迎回家!❤❤❤" + OriginTitile;
    //两秒后变回正常标题
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});

// 返回时间
const setname = document.querySelector("#site-name")
// const i = document.querySelector
setname.insertAdjacentHTML('beforeend',"<i class='fa-fw fas fa-home faa-tada'></i>")