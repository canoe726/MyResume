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

var coll = document.getElementsByClassName('collapsible');
var i;

for(i=0; i<coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.parentNode.parentNode.parentNode.nextElementSibling;

    if(content.style.display === "" || content.style.display === "block") {
      content.style.display = "none";
      var padding = this.parentNode.parentNode.previousElementSibling;
      padding.childNodes[0].style.marginBottom = "10px";
    } else {
      content.style.display = "block";
      var padding = this.parentNode.parentNode.previousElementSibling;
      padding.childNodes[0].style.marginBottom = "0px";
    }
  });
}

