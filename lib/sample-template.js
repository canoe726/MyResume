module.exports = {
    CSS: function() {
        return `
        <link rel="stylesheet", href="./css/myprofile/view-content.css">
        <link rel="stylesheet", href="./css/myprofile/introduction.css">
        <link rel="stylesheet", href="./css/myprofile/contact.css">
        <link rel="stylesheet", href="./css/login/login.css">
        `;
    },
    JS: function() {
        return `
        <script src="./js/myprofile.js"></script>
        <script src="./js/login.js"></script>
        `;
    },
    TITLE: function() {
        return `
        <title>샘플</title>
        `;
    },
    LOGIN_HEADER: function() {
        return `
        <header class="desktop-header">
            <div>
                <a class="menu-btn" href="/">홈</a>
                <a class="menu-btn" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn" href="/todolist">To Do 리스트</a>
                <a class="menu-btn active" href="/sample">샘플</a>
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
    LOGOUT_HEADER: function() {
        return `        
        <header class="desktop-header">
            <div>
                <a class="menu-btn" href="/">홈</a>
                <a class="menu-btn" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn" href="/todolist">To Do 리스트</a>
                <a class="menu-btn active" href="/sample">샘플</a>
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
                <a class="menu-btn" href="/">홈</a>
                <a class="menu-btn" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn" href="/todolist">To Do 리스트</a>
                <a class="menu-btn" href="/sample">샘플</a>
            </div>
        </header>
        `;
    },
    CONTENT: function(data) {
        var html = ``;
        html += `
        <section class="title">
            <h1>${data.user_info.title}</h1>
        </section>

        <div class="resume-content">            
            <section class="introduction">`;
        html += makeIntroduction(data);
        html += `
            </section>
            
            <section class="contact">`;
        html += makeContact(data);
        html += `
            </section>

            <hr class="out horizontal-line"></hr>
            
            <section class="keywords card">`;
        html += makeKeyWordsCard(data);
        html += `
            </section>

            <hr class="out horizontal-line"></hr>

            <section class="experience card">
                <div class="row card-header">
                    <div class="col-6"><h2 class="card-title">경험</h2></div>
                    <div class="col-6"><div class="row"><i class="fas fa-plus collapsible"></i></div></div>
                </div>

                <div class="collapsible-content">
                    <hr class="horizontal-line"></hr>

                    <section class="information">
                        <h3>학력사항</h3>
                        <div class="high-school">`;
        html += makeHighSchoolCard(data);
        html += `
                        </div>
                        <div class="university">`;
        html += makeUniversityCard(data); 
        html += `
                        </div>
                    </section>

                    <hr class="horizontal-line"></hr>

                    <section class="job-experience">
                        <h3>직무 경험</h3>`;
        html += makeJobExpCard(data);
        html += `
                    </section>
                    <hr class="horizontal-line"></hr>

                    <section class="international">
                        <h3>해외 경험</h3>`;     
        html += makeGlobalExpCard(data);
        html +=`
                    </section>

                    <hr class="horizontal-line"></hr>

                    <section class="other-experience">
                        <h3>기타 경험</h3>`;       
        html += makeOtherExpCard(data);
        html +=`
                    </section>

                    <hr class="horizontal-line"></hr>

                    <section class="experience-graph">
                        <h3>경험 그래프</h3>
                        <div>그래프</div>
                    </section>
                </div>
            </section>

            <hr class="out horizontal-line"></hr>

            <section class="certificate card">
                <div class="row card-header">
                    <div class="col-6"><h2 class="card-title">자격증</h2></div>
                    <div class="col-6"><div class="row"><i class="fas fa-plus collapsible"></i></div></div>
                </div>

                <div class="collapsible-content">
                    <hr class="horizontal-line"></hr>
                        <div class="major">
                            <h3>전공</h3>`;
        html += makeMajorCertificateCard(data);
        html += `
                </div>
                    <hr class="horizontal-line"></hr>

                    <div class="lang">
                        <h3>어학</h3>`;
        html += makeLangCertificateCard(data);
        html += `
                    </div>

                    <hr class="horizontal-line"></hr>

                    <div class="special">
                        <h3>그외</h3>`;
        html += makeOtherCertificateCard(data);
        html += `
                    </div>
                </div>
            </section>

            <hr class="out horizontal-line"></hr>

            <section class="prize card">
                <div class="row card-header">
                    <div class="col-6"><h2 class="card-title">수상</h2></div>
                    <div class="col-6"><div class="row"><i class="fas fa-plus collapsible"></i></div></div>
                </div>

                <div class="collapsible-content">
                    <hr class="horizontal-line"></hr>

                    <div class="school">
                        <h3>교내</h3>
                        <div class="row">
                            <p class="card-name">2017년 교내 제4회 SW경시대회</p>
                            <ul>
                                <li>수상일 : 213456</li>
                                <li>순위/등수 : 2020년 09월 27일</li>
                                <li>기관 : 한국생산성본부</li>
                            </ul>
                        </div>
                        <p class="card-link"><a href="#" target="_blank"></a></p>
                        <p class="card-content">교내 코딩테스트 대회 5등 (100자)</p>
                    </div>

                    <hr class="horizontal-line"></hr>

                    <div class="social">
                        <h3>교외</h3>
                        <div class="row">
                            <p class="card-name">제 6회 창의설계경진대회</p>
                            <ul>
                                <li>수상일 : 213456</li>
                                <li>순위/등수 : 2018년 12월 14일</li>
                                <li>기관 : 한국생산성본부</li>
                            </ul>
                        </div>
                        <p class="card-link"><a href="#" target="_blank"></a></p>
                        <p class="card-content">인공지능을 활용한 롤 모델 추천 웹 어플리케이션 개발 (100자)</p>
                    </div>
                </div>
            </section>

            <hr class="out horizontal-line"></hr>

            <section class="portfolio card">
                <div class="row card-header">
                    <div class="col-6"><h2 class="card-title">포트폴리오</h2></div>
                    <div class="col-6"><div class="row"><i class="fas fa-plus collapsible"></i></div></div>
                </div>

                <div class="collapsible-content">
                    <hr class="horizontal-line"></hr>

                    <div class="task">
                        <h3>작품</h3>
                        <div class="row">
                            <p class="card-name">토이 프로젝트 1</p>
                            <div class="row card-left-to-right sm">
                                <div>2018년 12월 14일</div>
                                <div>&nbsp; &#45; &nbsp;</div>
                                <div>2018년 12월 31일</div>
                                <div class="right"></div>
                            </div>
                            <ul>
                                <li>역할 : 프론트엔드 개발</li>
                                <li>팀원 : 김철수, 홍길동</li>
                            </ul>
                            <p class="card-link"><a href="#" target="_blank"></a></p>
                            <p class="card-content">웹 페이지 제작 (100자)</p>
                        </div>
                    </div>

                    <hr class="horizontal-line"></hr>

                    <div class="file">
                        <h3>논문 / 출판 / 특허</h3>
                        
                        <div class="row">
                            <p class="card-name">소논문 1</p>
                            <div class="row card-left-to-right sm">
                                <div>2018년 12월 14일</div>
                                <div class="right"></div>
                            </div>
                            <ul>
                                <li>저자 : www.naver.com</li>
                                <li>링크 : www.naver.com</li>
                                <li>출원번호 : www.naver.com</li>
                                <li>출원국가 : www.naver.com</li>
                            </ul>
                            <p class="card-content">웹 페이지 제작 (100자)</p>
                        </div>
                    </div>

                    <hr class="horizontal-line"></hr>

                    <div class="project">
                        <h3>프로젝트</h3>
                        
                        <div class="row">
                            <p class="card-name">프로젝트 1</p>
                            <div class="row card-left-to-right sm">
                                <div>2018년 12월 14일</div>
                                <div>&nbsp; &#45; &nbsp;</div>
                                <div>2018년 12월 31일</div>
                                <div class="right"></div>
                            </div>
                            <ul>
                                <li>역할 : 프론트엔드 개발</li>
                                <li>팀원 : 김철수, 홍길동</li>
                            </ul>
                            <p class="card-link"><a href="#" target="_blank"></a></p>
                            <p class="card-content">웹 페이지 제작 (100자)</p>
                        </div>
                    </div>

                    <hr class="horizontal-line"></hr>

                    <div class="collaspe">
                        <h3>포트폴리오 리스트그룹</h3>
                        <p>collaspe</p>
                    </div>
                </div>
            </section>

            <hr class="out horizontal-line"></hr>

            <section class="profile-graph card">
                <div class="row card-header">
                    <div class="col-6"><h2 class="card-title">나의 그래프</h2></div>
                    <div class="col-6"><div class="row"><i class="fas fa-plus collapsible"></i></div></div>
                </div>

                <div class="collapsible-content">
                    <hr class="horizontal-line"></hr>

                    <div>그래프</div>
                </div>
            </section>
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

function makeIntroduction(data) {
    var html = `
    <h2>간단 소개</h2>
    <p>${data.user_info.introduction}</p>
    `;
    return html;
}

function makeContact(data) {
    var html = ``;
    html += `
    <ul>
        <li><i class="fas fa-mobile-alt"></i>${data.user_info.phone}</li>
        <li><i class="fas fa-envelope-square"></i>${data.user_info.email}</li>
        <li><i class="fas fa-link"></i><a class="link" href="https://${data.user_info.link[0]}" target="_blank">${data.user_info.link[0]}</a></li>
        <li class="links"><a class="link" href="https://${data.user_info.link[1]}" target="_blank">${data.user_info.link[1]}</a></li>
    </ul>
    `;
    return html;
}

function makeKeyWordsCard(data) {
    var html = ``;
    html += `
    <div class="row card-header">
        <div class="col-6"><h2 class="card-title">내 키워드</h2></div>
        <div class="col-6"><div class="row"><i class="fas fa-plus collapsible"></i></div></div>
    </div>

    <div class="collapsible-content">
        <hr class="horizontal-line"></hr>

        <div class="row">`;

    for(var i=0; i<data.user_info.keywords.length; i++) {
    html += `<div class="keyword col-6 col-md-4 col-xl-3"><a class="tag-btn" type="button" href="#"># ${data.user_info.keywords[i]}</a></div>`;
    }

    html += `
        </div>
    </div>
    `;
    return html;
}

function makeHighSchoolCard(data) {
    var html = ``;
    html += `
    <div class="row">
        <p class="card-name">${data.high_school.name}</p>
        <div class="row card-left-to-right sm">
            <div>${data.high_school.start_date}</div>
            <div>&nbsp; &#45; &nbsp;</div>
            <div>${data.high_school.end_date}</div>
            <div class="right">${data.high_school.graduate}</div>
        </div>
        <div class="row">
            <p class="card-content">${data.high_school.description}</p>
        </div>
    </div>
    `;
    return html;
}

function makeUniversityCard(data) {
    var html = ``;
    html += `
    <div class="row">
        <p id="seouluniv" class="card-name">${data.university.name}</p>
        <div class="row card-left-to-right sm">
            <div>${data.university.start_date}</div>
            <div>&nbsp; &#45; &nbsp;</div>
            <div>${data.university.end_date}</div>
            <div class="right">${data.university.graduate}</div>
        </div>
        <div class="row">
            <ul>
                <li>학과 : ${data.university.major}</li>
                <li>학점 : ${data.university.my_grade} / ${data.university.total_grade}</li>
            </ul>
        </div>
        <div class="row">
            <p class="card-content">${data.university.description}</p>
        </div>
    </div>
    `;
    return html;
}

function makeJobExpCard(data) {
    var html = ``;
    for(var i=0; i<data.job_exp.length; i++) {
        var category = ['intern', 'prev-job'];
        var c_idx = -1;
        if(data.job_exp[i].category == "인턴") { c_idx = 0; }
        if(data.job_exp[i].category == "직장경험") { c_idx = 1; }

        html += `
        <div class="${category[c_idx]}">
            <div class="row card-left-to-right">
                <p id="agent" class="card-name">${data.job_exp[i].category}</p>
                <p class="sm right">(${data.job_exp[i].position})</p>
            </div>
            <div class="row card-left-to-right sm">
                <div>${data.job_exp[i].start_date}</div>
                <div>&nbsp; &#45; &nbsp;</div>
                <div>${data.job_exp[i].end_date}</div>
                <div class="right"></div>
            </div>
        `;
        if(data.job_exp[i].link != null) {
            html += `<p class="card-link"><a href="http://${data.job_exp[i].link}" target="_blank">${data.job_exp[i].link}</a></p>`;
        }
        html += `
            <p class="card-content">${data.job_exp[i].description}</p>
        </div>
        `;
    }
    return html;
}

function makeGlobalExpCard(data) {
    var html = ``;
    for(var i=0; i<data.global_exp.length; i++) {
        var category = ['study', 'trip'];
        var c_idx = -1;
        if(data.global_exp[i].category == "어학연수") { c_idx = 0; }
        if(data.global_exp[i].category == "여행경험") { c_idx = 1; }

        html += `
        <div class="${category[c_idx]}">
            <div class="row">
                <p class="card-name">${data.global_exp[i].category}</p>
                <div class="row card-left-to-right sm">
                    <div>${data.global_exp[i].start_date}</div>
                    <div>&nbsp; &#45; &nbsp;</div>
                    <div>${data.global_exp[i].end_date}</div>
                    <div class="right"></div>
                </div>`;
        if(data.global_exp[i].link != null) {
            html += `<p class="card-link"><a href="http://${data.global_exp[i].link}" target="_blank">${data.global_exp[i].link}</a></p>`;
        }
        html += `
                <p class="card-content">${data.global_exp[i].description}</p>
            </div>
        </div>`;
    }
    return html;
}

function makeOtherExpCard(data) {
    var html = ``;
    for(var i=0; i<data.other_exp.length; i++) {
        html += `
        <div class="exp">
            <div class="row">
                <p class="card-name">${data.other_exp[i].name}</p>
                <div class="row card-left-to-right sm">
                    <div>${data.other_exp[i].start_date}</div>
                    <div>&nbsp; &#45; &nbsp;</div>
                    <div>${data.other_exp[i].end_date}</div>
                    <div class="right"></div>
                </div>`;
        if(data.other_exp[i].link != null) {
            html += `<p class="card-link"><a href="http://${data.other_exp[i].link}" target="_blank">${data.other_exp[i].link}</a></p>`;
        }
        html += `
                <p class="card-content">${data.other_exp[i].description}</p>
            </div>
        </div>`;
    }
    return html;
}

function makeMajorCertificateCard(data) {
    var html = ``;
    for(var i=0; i<data.certificate.length; i++) {
        if(data.certificate[i].category == "전공") {
            html += `
            <div class="row">
                <p class="card-name">${data.certificate[i].name}</p>
                <ul>
                    <li class="card-li">자격번호 : ${data.certificate[i].cerial}</li>
                    <li class="card-li">취득일 : ${data.certificate[i].get_date}</li>
                    <li class="card-li">기관 : ${data.certificate[i].agency}</li>
                </ul>
            </div>
            `;
        }
    }
    return html;
}

function makeLangCertificateCard(data) {
    var html = ``;
    for(var i=0; i<data.certificate.length; i++) {
        if(data.certificate[i].category == "어학") {
            html += `
            <div class="row">
                <p class="card-name">${data.certificate[i].name}</p>
                <ul>
                    <li class="card-li">자격번호 : ${data.certificate[i].cerial}</li>
                    <li class="card-li">취득일 : ${data.certificate[i].get_date}</li>
                    <li class="card-li">기관 : ${data.certificate[i].agency}</li>
                </ul>
            </div>
            `;
        }
    }
    return html;
}

function makeOtherCertificateCard(data) {
    var html = ``;
    for(var i=0; i<data.certificate.length; i++) {
        if(data.certificate[i].category == "그외") {
            html += `
            <div class="row">
                <p class="card-name">${data.certificate[i].name}</p>
                <ul>
                    <li class="card-li">자격번호 : ${data.certificate[i].cerial}</li>
                    <li class="card-li">취득일 : ${data.certificate[i].get_date}</li>
                    <li class="card-li">기관 : ${data.certificate[i].agency}</li>
                </ul>
            </div>
            `;
        }
    }
    return html;
}

function makeA(data) {
    var html = ``;
    html += `
    
    `;
    return html;
}