var sanitizeHtml = require('sanitize-html');

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
    TITLE: function(data) {
        var html = ``;
        if(data != undefined) {
            if(data.user_info != undefined) {
                html += `
                <title>${sanitizeHtml(data.user_info.title)}</title>
                `;
            } else {
                html += `
                <title>내 프로필</title>
                `;
            }
        }
        return html;
    },
    LOGIN_HEADER: function() {
        return `
        <header>
            <div>
                <a class="menu-btn" href="/">홈</a>
                <a class="menu-btn active" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn" href="/todolist">To Do 리스트</a>
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
                <a class="menu-btn active" href="/myprofile">내 프로필</a>
                <a class="menu-btn" href="/editprofile">프로필 수정</a>
                <a class="menu-btn" href="/todolist">To Do 리스트</a>
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
        <section class="title">`;
        html += makeTitle(data);
        html += `
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

                    <section class="information">`;
        html += makeCategoryTitle(data.activate.high_school, "학력사항");
        html += `
                    <div class="high-school">`;
        html += makeHighSchoolCard(data);
        html += `
                    </div>
                    <div class="university">`;
        html += makeUniversityCard(data); 
        html += `
                    </div>
                    </section>

                    <section class="job-experience">`;
        html += makeCategoryTitle(data.activate.exp_job, "직무 경험");
        
        html += makeJobExpCard(data);
        html += `
                    </section>

                    <section class="international">`;
        html += makeCategoryTitle(data.activate.global_exp, "해외 경험");

        html += makeGlobalExpCard(data);
        html +=`
                    </section>

                    <section class="other-experience">`;
        html += makeCategoryTitle(data.activate.other_exp, "기타 경험");

        html += makeOtherExpCard(data);
        html +=`
                    </section>

                    <section class="experience-graph">
                        <h3>경험 그래프</h3>
                        <div>그래프 준비중..</div>
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

                    <div class="cert-major">`;
        html += makeCategoryTitle(data.activate.cert_major, "전공");

        html += makeMajorCertificateCard(data);
        html += `
                    </div>

                    <div class="cert-lang">`;
        html += makeCategoryTitle(data.activate.cert_lang, "어학");

        html += makeLangCertificateCard(data);
        html += `
                    </div>

                    <div class="cert-other">`;
        html += makeCategoryTitle(data.activate.cert_others, "그외");

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

                    <div class="prize-in">`;
        html += makeCategoryTitle(data.activate.prize_in, "교내");

        html += makePrizeInnerCard(data);
        html += `
                    </div>

                    <div class="prize-out">`;
        html += makeCategoryTitle(data.activate.prize_out, "교외");

        html += makePrizeOuterCard(data);
        html += `
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

                    <div class="project">`;
        html += makeCategoryTitle(data.activate.port_work, "프로젝트 / 작품");

        html += makePortfolioWorkCard(data);
        html += `
                    </div>

                    <div class="file">`;
        html += makeCategoryTitle(data.activate.port_rights, "논문 / 출판 / 특허");
        
        html += makePortfolioRightsCard(data);
        html += `
                    </div>

                    <div class="collaspe">
                        <h3>포트폴리오 리스트그룹</h3>
                        <p>리스트그룹 준비중..</p>
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

                    <div>그래프 준비중..</div>
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

function makeCategoryTitle(check, title) {
    if(check != null) {
        return `<h3>${sanitizeHtml(title)}</h3>`;
    }
    return ``;
}

function makeTitle(data) {
    var html = ``;
    if(data.user_info != undefined) {
        html += `
        <h1>${sanitizeHtml(data.user_info.title)}</h1>
        `;
    } else {
        html += `
        <h1><a class="link" href="/editprofile">프로필 수정 탭에서 정보를 입력해 주세요</a></h1>
        `;
    }
    return html;
}

function makeIntroduction(data) {
    var html = ``;
    if(data.user_info != undefined) {
        html += `
        <h2>간단 소개</h2>
        <p>${sanitizeHtml(data.user_info.introduction)}</p>
        `;
    }
    return html;
}

function makeContact(data) {
    var html = ``;
    if(data.user_info != undefined) {
        html += `
        <ul>
            <li><i class="fas fa-mobile-alt"></i>${sanitizeHtml(data.user_info.phone)}</li>
            <li><i class="fas fa-envelope-square"></i>${sanitizeHtml(data.user_info.email)}</li>`;
            
        for(var i=0; i<data.user_info.link.length; i++) {
            if(i == 0) {
                html += `<li><i class="fas fa-link"></i><a class="link" href="${sanitizeHtml(data.user_info.link[0])}" target="_blank">${sanitizeHtml(data.user_info.link[0])}</a></li>`;
            } else {
                html += `<li class="links"><a class="link" href="${sanitizeHtml(data.user_info.link[i])}" target="_blank">${sanitizeHtml(data.user_info.link[i])}</a></li>`;
            }
        }

        html += `
        </ul>
        `;
    }
    return html;
}

function makeKeyWordsCard(data) {
    var html = ``;
    if(data.user_info != undefined) {
        html += `
        <div class="row card-header">
            <div class="col-6"><h2 class="card-title">내 키워드</h2></div>
            <div class="col-6"><div class="row"><i class="fas fa-plus collapsible"></i></div></div>
        </div>

        <div class="collapsible-content">
            <hr class="horizontal-line"></hr>

            <div class="row">`;

        if(data.user_info.keywords[0] != '') {
            for(var i=0; i<data.user_info.keywords.length; i++) {
                html += `<div class="keyword col-6 col-md-4 col-xl-3"><a class="tag-btn" type="button" id="${data.user_info.keywords[i]}-keyword" href="#${data.user_info.keywords[i]}"># ${data.user_info.keywords[i]}</a></div>`;
            }
        }
        html += `
            </div>
        </div>
        `;
    }
    return html;
}

function makeHighSchoolCard(data) {
    var html = ``;
    if(data.high_school != undefined) {
        html += `
        <div class="row">
            <p class="card-name">${sanitizeHtml(data.high_school.name)}</p>
        </div>
        <div class="row card-left-to-right sm">
            <div>${data.high_school.start_date}</div>
            <div>&nbsp; &#45; &nbsp;</div>
            <div>${data.high_school.end_date}</div>
            <div class="right">(${sanitizeHtml(data.high_school.graduate)})</div>
        </div>
        <div class="row">
            <p class="card-content">${sanitizeHtml(data.high_school.description)}</p>
        </div>
        <div class="row">
        `;
        for(var i=0; i<data.high_school.keywords.length; i++) {
            html += `<div class="keyword col-6 col-md-4 col-xl-3"><a class="tag-btn" type="button" id="${data.high_school.keywords[i]}" href="#${data.high_school.keywords[i]}-keyword"># ${data.high_school.keywords[i]}</a></div>`;
        }
        html += `
        </div>
        <hr class="horizontal-line"></hr>
        `;
    }
    return html;
}

function makeUniversityCard(data) {
    var html = ``;
    if(data.university != undefined) {
        html += `
        <div class="row">
            <p class="card-name">${sanitizeHtml(data.university.name)}</p>
        </div>
        <div class="row card-left-to-right sm">
            <div>${data.university.start_date}</div>
            <div>&nbsp; &#45; &nbsp;</div>
            <div>${data.university.end_date}</div>
            <div class="right">(${sanitizeHtml(data.university.graduate)})</div>
        </div>
        <div class="row">
            <ul>
                <li>학과 : ${sanitizeHtml(data.university.major)}</li>
                <li>학점 : ${sanitizeHtml(data.university.my_grade)} / ${sanitizeHtml(data.university.total_grade)}</li>
            </ul>
        </div>
        <div class="row">
            <p class="card-content">${sanitizeHtml(data.university.description)}</p>
        </div>
        <div class="row">
        `;
        for(var i=0; i<data.university.keywords.length; i++) {
            html += `<div class="keyword col-6 col-md-4 col-xl-3"><a class="tag-btn" type="button" id="${data.university.keywords[i]}" href="#${data.university.keywords[i]}-keyword"># ${data.university.keywords[i]}</a></div>`;
        }
        html += `
        </div>
        <hr class="horizontal-line"></hr>
        `;
    }
    return html;
}

function makeJobExpCard(data) {
    var html = ``;
    if(data.job_exp != undefined) {
        for(var i=0; i<data.job_exp.length; i++) {
            var category = ['intern', 'prev-job'];
            var c_idx = -1;
            if(data.job_exp[i].category == "인턴") { c_idx = 0; }
            if(data.job_exp[i].category == "직장경험") { c_idx = 1; }

            html += `
            <div class="${category[c_idx]}">
                <div class="row card-left-to-right">
                    <p id="agent" class="card-name">${data.job_exp[i].category}</p>
                    <p class="sm right">(${sanitizeHtml(data.job_exp[i].position)})</p>
                </div>
                <div class="row card-left-to-right sm">
                    <div>${data.job_exp[i].start_date}</div>
                    <div>&nbsp; &#45; &nbsp;</div>
                    <div>${data.job_exp[i].end_date}</div>
                    <div class="right"></div>
                </div>
                <div class="row">
                    <ul>
                        <li class="card-li">회사명 : ${sanitizeHtml(data.job_exp[i].name)}</li>
            `;
            if(data.job_exp[i].link != null) {
                html += `<li class="card-li">링크 : <a class="link" href="${sanitizeHtml(data.job_exp[i].link)}" target="_blank">${sanitizeHtml(data.job_exp[i].link)}</a></li>`;
            }
            html += `
                    </ul>
                    <p class="card-content">${sanitizeHtml(data.job_exp[i].description)}</p>
                </div>
            </div>
            <div class="row">
            `;
            for(var k_idx=0; k_idx<data.job_exp[i].keywords.length; k_idx++) {
                html += `<div class="keyword col-6 col-md-4 col-xl-3"><a class="tag-btn" type="button" id="${data.job_exp[i].keywords[k_idx]}" href="#${data.job_exp[i].keywords[k_idx]}-keyword"># ${data.job_exp[i].keywords[k_idx]}</a></div>`;
            }
            html += `
            </div>
            `;
        }
        html += `<hr class="horizontal-line"></hr>`;
    }
    return html;
}

function makeGlobalExpCard(data) {
    var html = ``;
    if(data.global_exp != undefined) {
        for(var i=0; i<data.global_exp.length; i++) {
            var category = ['study', 'exchange', 'working', 'trip', 'other'];
            var c_idx = -1;
            if(data.global_exp[i].category == "어학연수") { c_idx = 0; }
            if(data.global_exp[i].category == "교환학생") { c_idx = 1; }
            if(data.global_exp[i].category == "워킹홀리데이") { c_idx = 2; }
            if(data.global_exp[i].category == "해외여행") { c_idx = 3; }
            if(data.global_exp[i].category == "그외") { c_idx = 4; }

            html += `
            <div class="${category[c_idx]}">
                <div class="row">
                    <p class="card-name">${data.global_exp[i].category}</p>
                </div>
                <div class="row card-left-to-right sm">
                    <div>${data.global_exp[i].start_date}</div>
                    <div>&nbsp; &#45; &nbsp;</div>
                    <div>${data.global_exp[i].end_date}</div>
                    <div class="right"></div>
                </div>
                <div class="row">`;
            if(data.global_exp[i].link != null) {
                html += `<p class="card-link"><a class="link" href="${sanitizeHtml(data.global_exp[i].link)}" target="_blank">${sanitizeHtml(data.global_exp[i].link)}</a></p>`;
            }
            html += `
                </div>
                <div class="row">
                    <p class="card-content">${sanitizeHtml(data.global_exp[i].description)}</p>
                </div>
            </div>
            <div class="row">
            `;
            for(var k_idx=0; k_idx<data.global_exp[i].keywords.length; k_idx++) {
                html += `<div class="keyword col-6 col-md-4 col-xl-3"><a class="tag-btn" type="button" id="${data.global_exp[i].keywords[k_idx]}" href="#${data.global_exp[i].keywords[k_idx]}-keyword"># ${data.global_exp[i].keywords[k_idx]}</a></div>`;
            }
            html += `
            </div>
            `;
        }
        html += `<hr class="horizontal-line"></hr>`;
    }
    return html;
}

function makeOtherExpCard(data) {
    var html = ``;
    if(data.other_exp != undefined) {
        for(var i=0; i<data.other_exp.length; i++) {
            html += `
            <div class="exp">
                <div class="row">
                    <p class="card-name">${sanitizeHtml(data.other_exp[i].name)}</p>
                </div>
                <div class="row card-left-to-right sm">
                    <div>${data.other_exp[i].start_date}</div>
                    <div>&nbsp; &#45; &nbsp;</div>
                    <div>${data.other_exp[i].end_date}</div>
                    <div class="right"></div>
                </div>
                <div class="row">`;
            if(data.other_exp[i].link != null) {
                html += `<p class="card-link"><a class="link" href="${sanitizeHtml(data.other_exp[i].link)}" target="_blank">${sanitizeHtml(data.other_exp[i].link)}</a></p>`;
            }
            html += `
                </div>
                <div class="row">
                    <p class="card-content">${sanitizeHtml(data.other_exp[i].description)}</p>
                </div>
            </div>
            <div class="row">
            `;
            for(var k_idx=0; k_idx<data.other_exp[i].keywords.length; k_idx++) {
                html += `<div class="keyword col-6 col-md-4 col-xl-3"><a class="tag-btn" type="button" id="${data.other_exp[i].keywords[k_idx]}" href="#${data.other_exp[i].keywords[k_idx]}-keyword"># ${data.other_exp[i].keywords[k_idx]}</a></div>`;
            }
            html += `
            </div>
            `;
        }
        html += `<hr class="horizontal-line"></hr>`;
    }
    return html;
}

function makeMajorCertificateCard(data) {
    var html = ``;
    if(data.certificate != undefined) {
        for(var i=0; i<data.certificate.length; i++) {
            if(data.certificate[i].category == "전공") {
                html += `
                <div class="row">
                    <p class="card-name">${sanitizeHtml(data.certificate[i].name)}</p>
                    <ul>
                        <li class="card-li">자격번호 : ${sanitizeHtml(data.certificate[i].cerial)}</li>
                        <li class="card-li">취득일 : ${data.certificate[i].get_date}</li>
                        <li class="card-li">기관 : ${sanitizeHtml(data.certificate[i].agency)}</li>`;
        if(data.certificate[i].grade != "") { html += `<li class="card-li">등급 / 점수 : ${sanitizeHtml(data.certificate[i].grade)}</li>`; }
        html += `
                    </ul>
                </div>
                `;
            }
        }
        html += `<hr class="horizontal-line"></hr>`;
    }
    return html;
}

function makeLangCertificateCard(data) {
    var html = ``;
    var exist = false;
    if(data.certificate != undefined) {
        for(var i=0; i<data.certificate.length; i++) {
            if(data.certificate[i].category == "어학") {
                html += `
                <div class="row">
                    <p class="card-name">${sanitizeHtml(data.certificate[i].name)}</p>
                    <ul>
                        <li class="card-li">자격번호 : ${sanitizeHtml(data.certificate[i].cerial)}</li>
                        <li class="card-li">취득일 : ${data.certificate[i].get_date}</li>
                        <li class="card-li">기관 : ${sanitizeHtml(data.certificate[i].agency)}</li>`;
        if(data.certificate[i].grade != "") { html += `<li class="card-li">등급 / 점수 : ${sanitizeHtml(data.certificate[i].grade)}</li>`; }
        html += `
                    </ul>
                </div>
                `;
                exist = true;
            }
        }
        if(exist) { html += `<hr class="horizontal-line"></hr>`; }
    }
    return html;
}

function makeOtherCertificateCard(data) {
    var html = ``;
    if(data.certificate != undefined) {
        for(var i=0; i<data.certificate.length; i++) {
            if(data.certificate[i].category == "그외") {
                html += `
                <div class="row">
                    <p class="card-name">${sanitizeHtml(data.certificate[i].name)}</p>
                    <ul>
                        <li class="card-li">자격번호 : ${sanitizeHtml(data.certificate[i].cerial)}</li>
                        <li class="card-li">취득일 : ${data.certificate[i].get_date}</li>
                        <li class="card-li">기관 : ${sanitizeHtml(data.certificate[i].agency)}</li>`;
        if(data.certificate[i].grade != "") { html += `<li class="card-li">등급 / 점수 : ${sanitizeHtml(data.certificate[i].grade)}</li>`; }
        html += `
                    </ul>
                </div>
                `;
            }
        }
    }
    return html;
}

function makePrizeInnerCard(data) {
    var html = ``;
    var exist = false;
    if(data.prize != undefined) {
        for(var i=0; i<data.prize.length; i++) {
            if(data.prize[i].category == "교내") {
                html += `
                    <div class="row">
                        <p class="card-name">${sanitizeHtml(data.prize[i].name)}</p>
                    </div>
                    <div class="row card-left-to-right sm">
                        <div>${data.prize[i].get_date}</div>
                    </div>
                    <div class="row">
                        <ul>
                            <li class="card-li">기관 : ${sanitizeHtml(data.prize[i].agency)}</li>
                            <li class="card-li">순위 : ${sanitizeHtml(data.prize[i].rank)}</li>
                            <li class="card-li">참가자 : ${sanitizeHtml(data.prize[i].party)}</li>`;
                    if(data.prize[i].link != null) {
                        html += `<li class="card-li">링크 : <a class="link" href="${sanitizeHtml(data.prize[i].link)}" target="_blank">${sanitizeHtml(data.prize[i].link)}</a></li>`;
                    }
        html += `
                        </ul>
                    </div>
                    <div class="row">
                        <p class="card-content">${sanitizeHtml(data.prize[i].description)}</p>
                    </div>
                `;
                exist = true;
            }
        }
        if(exist) { html += `<hr class="horizontal-line"></hr>`; }
    }
    return html;
}

function makePrizeOuterCard(data) {
    var html = ``;
    if(data.prize != undefined) {
        for(var i=0; i<data.prize.length; i++) {
            if(data.prize[i].category == "교외") {
                html += `
                <div class="row">
                    <p class="card-name">${sanitizeHtml(data.prize[i].name)}</p>
                </div>
                <div class="row card-left-to-right sm">
                    <div>${data.prize[i].get_date}</div>
                </div>
                <div class="row">
                    <ul>
                        <li class="card-li">기관 : ${sanitizeHtml(data.prize[i].agency)}</li>
                        <li class="card-li">순위 : ${sanitizeHtml(data.prize[i].rank)}</li>
                        <li class="card-li">참가자 : ${sanitizeHtml(data.prize[i].party)}</li>`;
                if(data.prize[i].link != null) {
                    html += `<li class="card-li">링크 : <a class="link" href="${sanitizeHtml(data.prize[i].link)}" target="_blank">${sanitizeHtml(data.prize[i].link)}</a></li>`;
                }
                html += `
                    </ul>
                </div>
                <div class="row">
                    <p class="card-content">${sanitizeHtml(data.prize[i].description)}</p>
                </div>
                `;
            }
        }
    }
    return html;
}

function makePortfolioWorkCard(data) {
    var html = ``;
    if(data.port_work != undefined) {
        for(var i=0; i<data.port_work.length; i++) {
            html += `
            <div class="row">
                <p class="card-name">${sanitizeHtml(data.port_work[i].name)}</p>
            </div>
            <div class="row card-left-to-right sm">
                <div>${data.port_work[i].start_date}</div>
                <div>&nbsp; &#45; &nbsp;</div>
                <div>${data.port_work[i].end_date}</div>
                <div class="right"></div>
            </div>
            <div class="row">
                <ul>
                    <li class="card-li">역할 : ${sanitizeHtml(data.port_work[i].role)}</li>
                    <li class="card-li">참가자 : ${sanitizeHtml(data.port_work[i].party)}</li>
                    <li class="card-li">링크 : <a class="link" href="${sanitizeHtml(data.port_work[i].link)}" target="_blank">${sanitizeHtml(data.port_work[i].link)}</a></li>
                </ul>
            </div>
            <div class="row out-container">`;
            html += `
                <p class="card-content">${sanitizeHtml(data.port_work[i].description)}</p>
            </div>
            `;
        }
        html += `<hr class="horizontal-line"></hr>`;
    }
    return html;
}

function makePortfolioRightsCard(data) {
    var html = ``;
    if(data.port_rights != undefined) {
        for(var i=0; i<data.port_rights.length; i++) {
            html += `
            <div class="row">
                <p class="card-name">${sanitizeHtml(data.port_rights[i].name)}</p>
            </div>
            <div class="row card-left-to-right sm">
                <div>${data.port_rights[i].release_date}</div>
            </div>
            <div class="row">
                <ul>
                    <li class="card-li">저자 : ${sanitizeHtml(data.port_rights[i].author)}</li>
                    <li class="card-li">링크 : <a class="link" href="${sanitizeHtml(data.port_rights[i].link)}" target="_blank">${sanitizeHtml(data.port_rights[i].link)}</a></li>
                    <li class="card-li">출원번호 : ${sanitizeHtml(data.port_rights[i].number)}</li>
                    <li class="card-li">출원국가 : ${sanitizeHtml(data.port_rights[i].country)}</li>
                </ul>
            </div>
            <div class="row">
                <p class="card-content">${sanitizeHtml(data.port_rights[i].description)}</p>
            </div>
            `;
        }
        html += `<hr class="horizontal-line"></hr>`;
    }
    return html;
}
