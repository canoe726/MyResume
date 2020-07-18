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
        <header class="desktop-header">
            <div>
                <a class="menu-btn" href="/">홈</a>
                <a class="menu-btn" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn" href="/todolist">To Do 리스트</a>
                <a class="menu-btn" href="/sample">샘플</a>
                <a class="login-btn" href="/login">로그인</a>
            </div>
        </header>

        <header class="mobile-header">
            <div>
                <a class="menu-btn" onclick="showMobileMenu(this)"><i class="fa fa-bars"></i></a>
                <p>MyResume</p>
                <a class="login-btn" href="/login">로그인</a>
            </div>
            <div class="hidden-links">
                <a class="menu-btn" href="/">홈</a>
                <a class="menu-btn" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn" href="/todolist">To Do 리스트</a>
                <a class="menu-btn" href="/sample">샘플</a>
            </div>
        </header>
        `;
    },
    CONTENT: function() {
        return `
        <section class="login-section">
            <div class="row">
                <h3>회원가입</h3>
                
                <form action="./register/user_register" method="post">
                    <table>
                        <tr>
                            <td class="caption"> 아이디</br>(이메일)</td>
                            <td><input type="email" name="user_email" check_result="fail" placeholder="abcde@email.com"></td>
                            <td>
                                <button class="check-btn" id="id_check" type="button" onclick="checkEmail()">중복검사</button>
                                <i class="far fa-check-square one" style="display:none;"></i>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption"> 비밀번호</br>(최소 8자)</td>
                            <td><input type="password" name="user_pw" minlength="8"></td>
                        </tr>
                        <tr>
                            <td class="caption"> 닉네임</br>(최대 15자)</td>
                            <td><input type="text" name="user_nickname" check_result="fail" maxlength="15"></td>
                            <td>
                                <button class="check-btn" id="nickname_check" type="button" onclick="checkNickName()">중복검사</button>
                                <i class="far fa-check-square two" style="display:none;"></i>
                            </td>
                        </tr>
                    </table>
                    <input class="input-btn" name="regitser_btn" type="submit" onclick="return checkValidationRegister()" value="회원가입">
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