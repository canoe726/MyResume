String.prototype.replaceAll = function(org, dest) {
  return this.split(org).join(dest);
}

window.onscroll = function() {
    scrollUpFunc();
    stickyFunc();
};

// scroll to top
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

// fixed top menu
var fixedTop = document.querySelector('.fixed-top');
var sticky = fixedTop.offsetTop;

function stickyFunc() {
  if(window.pageYOffset > sticky) {
    fixedTop.classList.add("sticky");
  } else {
    fixedTop.classList.remove("sticky");
  }
}

function emphasisIcon(element) {
    var parent = element.parentNode.parentNode;
    var input = parent.querySelector('input[type="hidden"]').value;
    input = input.split(',');

    if(element.classList.contains('emphasis') == true) {
        element.classList.remove('emphasis');
        input[2] = false;
        parent.querySelector('input[type="hidden"]').value = input;
    } else {
        element.classList.add('emphasis');
        input[2] = true;
        parent.querySelector('input[type="hidden"]').value = input;
    }
}

function addTodocard(element) {
    var input = document.querySelector('input[name="card_content"]');
    if(input.value == "") {
        alert("내용을 입력하세요");
        return false;
    }

    var parent = element.parentNode.parentNode.parentNode;
    var todolist = parent.querySelector('.todocardlist');
    var todolist_len = parent.querySelectorAll('.todocard');
    todolist_len = todolist_len.length;
    if(todolist_len >= 50) {
        alert("To Do List 항목은 50개가 최대 입니다");
        return false;
    }

    var cur_date = new Date();
    var year = cur_date.getFullYear();
    var month = cur_date.getMonth() + 1;
    if(month < 10) { month = "0" + month; }
    var day = cur_date.getDate();
    var output_date = year + "-" + month + "-" + day;
    
    var send_value = {
        content: input.value,
        date: output_date,
        emphasis: false
    };

    var value = "";

    console.log("send_value.content : ",send_value.content);

    send_value.content = send_value.content.replaceAll(' ', '_');
    console.log("send_value.content : ",send_value.content);


    value = send_value.content + "," + send_value.date + "," + send_value.emphasis;

    todolist.innerHTML += `
    <div class="todocard col-12">
        <div class="content">
            <b>${todolist_len + 1}. </b>
            <i class="fas fa-exclamation-triangle" onclick="emphasisIcon(this)"></i>
            ${input.value}
        </div>
        <div>
            <button class="del-btn" type="submit" onclick="return delTodocard(this)" style="float:right;">삭제</button>
            <div class="card-date">Date : ${output_date}</div>
        </div>
        <input type="hidden" name="todolist_card_${todolist_len}" value=${value}>
    </div>
    `;

    input.value = "";
}

function delTodocard(element) {
    var del = element.parentNode.parentNode;
    var parent = element.parentNode.parentNode.parentNode;
    del.remove();

    var todolist = parent.querySelectorAll('.todocard');

    for(var i=0; i<todolist.length; i++) {
      var input = todolist[i].querySelector('input');
      input.name = 'todolist_card_' + i;

      var b = todolist[i].querySelector('b');
      b.innerHTML = (i + 1) + ". ";
    }
}