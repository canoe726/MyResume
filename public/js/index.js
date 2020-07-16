window.onscroll = function() {
  scrollUpFunc();
};

var btnTop = document.getElementById("scroll-top");

function scrollUpFunc() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
}

function scrollTopFunc() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
