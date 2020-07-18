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
    LOGIN_HEADER: function() {
        return `
        <header class="desktop-header">
            <div>
                <a class="menu-btn active" href="/">홈</a>
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
                <a class="menu-btn active" href="/">홈</a>
                <a class="menu-btn" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn" href="/todolist">To Do 리스트</a>
                <a class="menu-btn" href="/sample">샘플</a>
            </div>
        </header>
        `;
    },
    LOGOUT_HEADER: function() {
        return `
        <header class="desktop-header">
            <div>
                <a class="menu-btn active" href="/">홈</a>
                <a class="menu-btn" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn" href="/todolist">To Do 리스트</a>
                <a class="menu-btn" href="/sample">샘플</a>
                <a class="login-btn" href="/logout">로그아웃</a>
            </div>
        </header>

        <header class="mobile-header">
            <div>
                <a class="menu-btn" onclick="showMobileMenu(this)"><i class="fa fa-bars"></i></a>
                <p>MyResume</p>
                <a class="login-btn" href="/logout">로그아웃</a>
            </div>
            <div class="hidden-links">
                <a class="menu-btn active" href="/">홈</a>
                <a class="menu-btn" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn" href="/todolist">To Do 리스트</a>
                <a class="menu-btn" href="/sample">샘플</a>
            </div>
        </header>
        `;
    },
    CONTENT: function(nickname) {
        var html = ``;
        html += `
        <section class="home_image">
            <div class="container">
                <img src="./image/home_image_1.jpg">`;

        if(nickname !== undefined) { html += `<div class="top-centered">${nickname} 님 환영합니다</div>`; }

        html += `
                <div class="centered">나만의 이력을 관리 해보세요.</div>
            </div>
            <div class="container">
                <img src="./image/home_image_2.jpg">
                <div class="centered">To Do 리스트로 목표를 달성하세요.</div>
            </div>
            <div class="container">
                <img src="./image/home_image_3.jpg">
                <div class="centered">오늘의 목표에 한발 더 다가가세요.</div>
            </div>
        </section>
        `;

        return html;
    },
    FOOTER: function() {
        return `
        <footer>
            <div class="comment"><i class="fas fa-copyright"></i></i> CopyRight - Young Bae Kim</div>
            <div class="comment"><i class="fas fa-envelope-square"></i> Contact - canoe918@gmail.com</div>
        </footer>
        `;
    }
}