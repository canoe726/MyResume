module.exports = {
    CSS: function() {
        return `
        <link rel="stylesheet", href="./css/index/index.css">
        <link rel="stylesheet", href="./css/login/login.css">
        `;
    },
    JS: function() {
        return `
        <script src="./js/index.js"></script>
        <script src="./js/login.js"></script>
        `;
    },
    TITLE: function() {
        return `
        <title>RESUME</title>
        `;
    },
    HEADER: function() {
        return `
        <header>
            <div>
                <a class="menu-btn" href="/">홈</a>
                <a class="menu-btn" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn" href="/todolist">To Do 리스트</a>
                <a class="menu-btn" href="/sample">샘플</a>
                <a class="login-btn active" href="/login">로그인</a>
            </div>
        </header>
        `;
    },
    CONTENT: function() {
        return `
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