var sanitizeHtml = require('sanitize-html');
String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

module.exports = {
    CSS: function() {
        return `
        <link rel="stylesheet", href="./css/index/index.css">
        <link rel="stylesheet", href="./css/login/login.css">
        <link rel="stylesheet", href="./css/todolist/todolist.css">
        `;
    },
    JS: function() {
        return `
        <script src="./js/index.js"></script>
        <script src="./js/todolist.js"></script>
        `;
    },
    TITLE: function(data) {
        var html = ``;
        if(data != undefined) {
            html += `
            <title>${data}</title>
            `;
        } else {
            html += `
            <title>로그인</title>
            `;
        }
        return html;
    },
    LOGIN_HEADER: function() {
        return `
        <header>
            <div>
                <a class="menu-btn" href="/">홈</a>
                <a class="menu-btn" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn active" href="/todolist">To Do 리스트</a>
                <a class="menu-btn" href="/sample">샘플</a>
                <a class="login-btn" href="/login">로그인</a>
            </div>
        </header>
        `;
    },
    LOGOUT_HEADER: function() {
        return `
        <header>
            <div>
                <a class="menu-btn" href="/">홈</a>
                <a class="menu-btn" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn active" href="/todolist">To Do 리스트</a>
                <a class="menu-btn" href="/sample">샘플</a>
                <a class="login-btn" href="/logout">로그아웃</a>
            </div>
        </header>
        `;
    },
    NO_DATA_CONTENT: function() {
        var html = ``;
        html += `
        <div class="row required">
            <h2>로그인이 필요한 서비스 입니다</h2>
        </div>
        <section class="login-section">
            <div class="row">
                <h3>로그인</h3>
                
                <form action="/login/login_check" method="post" onsubmit="return checkValidation()" required>
                    <table>
                        <tr>
                            <td class="caption"> 아이디 </td>
                            <td><input type="email" name="user_email" size="50" placeholder="abcde@email.com"></td>
                        </tr>
                        <tr>
                            <td class="caption"> 비밀번호 </td>
                            <td><input type="password" name="user_pw" size="50" minlength="8"></td>
                        </tr>
                    </table>
                    <p class="warning"> 아이디 또는 비밀번호가 일치하지 않습니다 </p>
                    <input class="input-btn" name="login_btn" type="submit" value="로그인">
                    <input class="input-btn" type="button" value="회원가입" onclick="moveRegisterPage()"></a>
                </form>
            </div>
        </section>
        `;
        return html;
    },
    CONTENT: function(data) {
        var html = ``;
        html += `
        <div class="form-wrap">
            <form action="/updatetodolist" name="todolist" method="post">
                <div class="fixed-top">
                    <div class="row">
                        <input type="submit" class="submit-btn" name="submit" value="저장하기">
                    </div>
                </div>

                <section class="todolist">
                    <div class="top-margin"></div>
                    <div class="card card-todo row">
                        <div class="row">
                            <div class="category col-12">
                                <h2>To Do 리스트 50</h2>
                            </div>
                        </div>
                        <div class="div-btn row">
                            <div class="col-10"><input type="text" name="card_content" size="100"></div>
                            <div class="col-2"><button class="add-btn" type="button" onclick="return addTodocard(this)">추가</button></div>
                        </div>
                        <div class="todocardlist row">`;
        html += todolistCard(data);
        html += `
                        </div>

                        <div class="top-margin"></div>
                        <hr class="horizontal-line"></hr>
                        <div class="listfooter row">
                            <div class="col-6">
                                <label class="container" style="color:black;">All Done !
                                    <input type="checkbox" name="private_checkbox" checked="checked">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div class="col-6">Don't Forget These</div>
                        </div>
                    </div>
                </section>
            </form>
        </div>
        `;
        return html;
    },
    FOOTER: function() {
        return `
        <div class="bottom-margin"></div>
        <footer>
            <div class="comment"><i class="fas fa-copyright"></i></i> CopyRight - Young Bae Kim</div>
            <div class="comment"><i class="fas fa-envelope-square"></i> Contact - canoe918@gmail.com</div>
        </footer>
        `;
    }
}

function todolistCard(data) {
    var html = ``;
    if(data !== undefined) {
        var length = data.content.length;
        for(var i=0; i<length; i++) {
            var value = data.content[i] + "," + data.date[i] + "," + data.emphasis[i];
            data.content[i] = data.content[i].replaceAll('_', ' ');
            
            html += `
            <div class="todocard col-12">
                <div class="content">
                    <b>${i + 1}. </b>`;

            if(data.emphasis[i] == 'true') { html += `<i class="fas fa-exclamation-triangle emphasis" onclick="emphasisIcon(this)"></i>`; }
            else { html += `<i class="fas fa-exclamation-triangle" onclick="emphasisIcon(this)"></i>`; }

            html += `
                    ${sanitizeHtml(data.content[i])}
                </div>
                <div>
                    <button class="del-btn" type="submit" onclick="return delTodocard(this)" style="float:right;">삭제</button>
                    <div class="card-date">Date : ${data.date[i]}</div>
                </div>
                <input type="hidden" name="todolist_card_${i}" value=${value}>
            </div>
            `;
        }
    }
    return html;
}
