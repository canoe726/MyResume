var input_email = document.querySelector('input[name="user_email"]');
var input_pw = document.querySelector('input[name="user_pw"]');

var warning = document.querySelector('.warning');
var cur_url = window.location.href;
var url = new URL(cur_url);
var value = url.searchParams.get('status');
if(value != undefined) {
    warning.style.display = 'initial';
}

function showMobileMenu(element) {
    var parent = element.parentNode.parentNode;
    var menu = parent.querySelector('.hidden-links');
    if(menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

function checkValidation() {
    if(input_email.value == "" || input_pw.value == "") {
        alert("아이디 또는 비밀번호를 입력하세요")
        return false;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var response = this.responseURL;
        }
    }

    var login_value = { email : input_email.value, pw : input_pw.value }
    xhttp.open("POST", "./login/login_check", true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send(JSON.stringify(login_value));
}

function moveRegisterPage() {
    location.href = "./register";
}

function checkValidationRegister() {
    var input_nickname = document.querySelector('input[name="user_nickname"]');

    if(input_email.value == "" || input_pw.value == "" || input_nickname.value == "") {
        alert("아이디 또는 비밀번호 또는 닉네임을 입력하세요")
        return false;
    } 
    if(input_email.getAttribute('check_result') == "fail") {
        alert("아이디 중복검사를 해주세요")
        return false;
    } 
    if(input_nickname.getAttribute('check_result') == "fail") {
        alert("닉네임 중복검사를 해주세요")
        return false;
    }
}

function checkEmail() {
    var id_btn = document.querySelector('#id_check');
    var check = document.querySelector('.one');

    if(input_email.value == "") {
        alert("이메일을 입력해주세요");
        return false;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            alert(response);

            if(response == "이미 존재하는 아이디입니다") {
                input_email.value = "";
            } else {
                id_btn.style.display = "none";
                check.style.display = "initial";
                input_email.setAttribute('check_result', 'success');
            }
        }
    }
    var email_value = { email : input_email.value }
    xhttp.open("POST", "./register/check_email", true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send(JSON.stringify(email_value));

    input_email.addEventListener("change", function(event) {
        id_btn.style.display = "initial";
        check.style.display = "none";
        input_email.setAttribute('check_result', 'fail');
    });
}

function checkNickName() {
    var input_nickname = document.querySelector('input[name="user_nickname"]');

    var nickname_btn = document.querySelector('#nickname_check');
    var check = document.querySelector('.two');

    if(input_nickname.value == "") {
        alert("닉네임을 입력해주세요");
        return false;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            alert(response);

            if(response == "이미 존재하는 닉네임입니다") {
                input_nickname.value = "";
            } else {
                nickname_btn.style.display = "none";
                check.style.display = "initial";
                input_nickname.setAttribute('check_result', 'success');
            }
        }
    }
    var nickname_value = { nickname : input_nickname.value }
    xhttp.open("POST", "./register/check_nickname", true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send(JSON.stringify(nickname_value));

    input_nickname.addEventListener("change", function(event) {
        nickname_btn.style.display = "initial";
        check.style.display = "none";
        input_nickname.setAttribute('check_result', 'fail');
    });
}