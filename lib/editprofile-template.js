var sanitizeHtml = require('sanitize-html');

module.exports = {
    CSS: function() {
        return `
        <link rel="stylesheet", href="./css/editprofile/edit.css">
        <link rel="stylesheet", href="./css/editprofile/caution.css">
        <link rel="stylesheet", href="./css/editprofile/view-content.css">
        <link rel="stylesheet", href="./css/editprofile/introduction.css">
        <link rel="stylesheet", href="./css/editprofile/contact.css">
        <link rel="stylesheet", href="./css/editprofile/keywords.css">
        <link rel="stylesheet", href="./css/login/login.css">
        `;
    },
    JS: function() {
        return `
        <script src="./js/editprofile.js"></script>
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
                <a class="menu-btn active" href="/editprofile">프로필 수정</a>
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
                <a class="menu-btn" href="/myprofile">내 프로필</a>
                <a class="menu-btn active" href="/editprofile">프로필 수정</a>
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
        <div class="form-wrap">
            <form name="edit-profile" action="/updateprofile" method="post" onsubmit="return validateForm()" required>
                <div class="fixed-top">
                    <div class="row">
                        <input type="submit" class="submit-btn" name="submit" value="수정 완료">
                    </div>
                </div>

                <section class="caution">
                    <p>은 필수 항목</p>
                </section>

                <section class="title">`;
        html += editTitle(data);
        html += `
                </section>

                <div class="resume-content">            
                    <section class="introduction">`;
        html += editIntroduction(data);
        html += `
                    </section>
                    
                    <section class="contact">`;
        html += editContact(data);
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
                                <div class="row card-left-to-right">
                                    <div><h3>학력사항</h3></div>
                                    <div class="right"><p>(고등학교 - 대학교 - 대학원 순)</p></div>
                                </div>
                                
                                <div class="high-school">`;
        html += editHighSchool(data);
        html += `
                                </div>
                                <div class="university">`;
        html += editUniversity(data);
        html += `
                                </div>
                                <div class="add">
                                    <button class="add-btn btn-textarea" type="button" onclick="addSchoolCard()">항목 추가</button>
                                </div>
                            </section>

                            <hr class="horizontal-line"></hr>

                            <h3>직무 경험</h3>
                            <section class="job-experience">`;
        html += editJobExp(data);
        html += `
                            </section>
                            <div class="add">
                                <button class="add-btn" type="button" onclick="addJobExpCard()">항목 추가</button>
                            </div>

                            <hr class="horizontal-line"></hr>

                            <h3>해외 경험</h3>
                            <section class="international">`;
        html += editGlobalExp(data);
        html += `
                            </section>
                            <div class="add">
                                <button class="add-btn" type="button" onclick="addGlobalExpCard()">항목 추가</button>
                            </div>

                            <hr class="horizontal-line"></hr>

                            <h3>기타 경험</h3>
                            <section class="other-experience">`;
        html += editOtherExp(data);
        html += `
                            </section>
                            <div class="add">
                                <button class="add-btn" type="button" onclick="addOtherExpCard()">항목 추가</button>
                            </div>
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

                            <h3>전공</h3>
                            <section class="certificate-major">`;
        html += editCertMajor(data);        
        html += `
                            </section>

                            <div class="add">
                                <button class="add-btn" type="button" onclick="addCertMajor()">항목 추가</button>
                            </div>

                            <hr class="horizontal-line"></hr>
                            
                            <h3>어학</h3>
                            <section class="certificate-lang">`;
        html += editCertLang(data);        
        html += `
                            </section>

                            <div class="add">
                                <button class="add-btn" type="button" onclick="addCertLang()">항목 추가</button>
                            </div>

                            <hr class="horizontal-line"></hr>

                            <h3>그외</h3>
                            <section class="certificate-others">`;
        html += editCertOther(data);        
        html += `
                            </section>

                            <div class="add">
                                <button class="add-btn" type="button" onclick="addCertOther()">항목 추가</button>
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

                        <h3>교내</h3>
                        <section class="prize-in">`;
        html += editPrizeIn(data);
        html += `
                        </section>

                        <div class="add">
                            <button class="add-btn" type="button" onclick="addPrizeIn()">항목 추가</button>
                        </div>

                        <hr class="horizontal-line"></hr>

                        <h3>교외</h3>
                        <section class="prize-out">`;
        html += editPrizeOut(data);
        html += `
                        </section>

                        <div class="add">
                            <button class="add-btn" type="button" onclick="addPrizeOut()">항목 추가</button>
                        </div>
                    </section>

                    <hr class="out horizontal-line"></hr>

                    <section class="portfolio card">
                        <div class="row card-header">
                            <div class="col-6"><h2 class="card-title">포트폴리오</h2></div>
                            <div class="col-6"><div class="row"><i class="fas fa-plus collapsible"></i></div></div>
                        </div>

                        <hr class="horizontal-line"></hr>

                        <div class="collapsible-content">
                            
                            <h3>프로젝트 / 작품</h3>
                            <section class="portfolio-work">`;
        html += editPortfolioWork(data);
        html += `
                            </section>

                            <hr class="horizontal-line"></hr>

                            <div class="add">
                                <button class="add-btn" type="button" onclick="addPortWork()">항목 추가</button>
                            </div>

                            <hr class="horizontal-line"></hr>

                            <h3>논문 / 출판 / 특허</h3>
                            <section class="portfolio-rights">`;
        html += editPortfolioRights(data);
        html += `
                            </section>

                            <div class="add">
                                <button class="add-btn" type="button" onclick="addPortRights()">항목 추가</button>
                            </div>
                        </div>
                    </section>
                </div>
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

function editTitle(data) {
    var html = `<p class="caption"> 제목</p>`;
    if(data.user_info != undefined) {
        html += `
        <div>
            <input type="text" name="user_info_title" value="${sanitizeHtml(data.user_info.title)}">
        </div>
        `;
    } else {
        html += `
        <div>
            <input type="text" name="user_info_title" value="">
        </div>
        `;
    }
    return html;
}

function editIntroduction(data) {
    var html = ``;
    if(data.user_info != undefined) {
        html += `
        <div class="row">
            <div class="left"><h2> 간단 소개</h2></div>
            <div class="right"><p>(최대 150자)</p></div>
        </div>
        <div>
            <textarea name="user_info_introduction" rows="4" cols="50" maxlength="150">${sanitizeHtml(data.user_info.introduction)}</textarea>
        </div>
        `;
    } else {
        html += `
        <div class="row">
            <div class="left"><h2> 간단 소개</h2></div>
            <div class="right"><p>(최대 150자)</p></div>
        </div>
        <div>
            <textarea name="user_info_introduction" rows="4" cols="50" maxlength="150"></textarea>
        </div>
        `;
    }
    return html;
}

function editContact(data) {
    var html = ``;
    if(data.user_info != undefined) {
        html += `
        <ul class="contact-list">
            <li>
                <i class="fas fa-mobile-alt"></i>
                <input type="tel" name="user_info_phone" placeholder="010-1234-5678" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" value="${sanitizeHtml(data.user_info.phone)}">
            </li>
            <li>
                <i class="fas fa-envelope-square"></i>
                <input type="email" name="user_info_email" placeholder="abcde@gmail.com" value="${sanitizeHtml(data.user_info.email)}">
            </li>`;

        if(data.activate.contact == null) {
            html += `
            <li>
                <i class="fas fa-link"></i>
                <input type="url" name="user_info_link" placeholder="http://www.example.com" value="">
            </li>
            </ul>
            <button class="add-btn" type="button" onclick="addLinkInputBtn()">링크추가</button>
            `;
        } else {
            for(var i=0; i<data.user_info.link.length; i++) {
                if(i > 4) { break; }
                if(i == 0) {
                    html += `
                    <li>
                        <i class="fas fa-link"></i>
                        <input type="url" name="user_info_link" placeholder="http://www.example.com" value="${sanitizeHtml(data.user_info.link[i])}">
                    </li>
                    `;
                }
                if(i > 0) {
                    html += `
                    <li class="links">
                        <input type="url" name="${'user_info_link' + (i+1)}" placeholder="http://www.example.com" value="${sanitizeHtml(data.user_info.link[i])}">
                    </li>
                    `;
                }

                if(i == data.user_info.link.length - 1) {
                    html += `
                    </ul>
                    <button class="add-btn" type="button" onclick="addLinkInputBtn()">링크추가</button>
                    `;
                }
            }
        }
    } else {
        html += `
        <ul class="contact-list">
            <li>
                <i class="fas fa-mobile-alt"></i>
                <input type="tel" name="user_info_phone" placeholder="010-1234-5678" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" value="">
            </li>
            <li>
                <i class="fas fa-envelope-square"></i>
                <input type="email" name="user_info_email" placeholder="abcde@gmail.com" value="">
            </li>
            <li>
                <i class="fas fa-link"></i>
                <input type="url" name="user_info_link" placeholder="http://www.example.com" value="">
            </li>
        </ul>
        <button class="add-btn" type="button" onclick="addLinkInputBtn()">링크추가</button>
        `;
    }
        
    return html;
}

function editHighSchool(data) {
    var html = ``;
    var graduated = ['재학','졸업','졸업예정', '휴학', '편입'];
    if(data.activate.high_school != null) {
        if(data.high_school.description == null) { data.high_school.description = ""; }
        var start_date = getYYYYMMDD(data.high_school.start_date);
        var end_date = getYYYYMMDD(data.high_school.end_date);

        var keywords;
        if(data.high_school.keywords == null || data.high_school.keywords == "") { keywords = []; }
        else {
            keywords = data.high_school.keywords;
            keywords = keywords.split(',');
        }

        html += `
        <div class="row item">
            <button class="del-btn right" onclick="removeHighSchoolCard()">삭제</button>
            <div class="row category">
                <h3>고등학교</h3>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-xl-3">
                    <p class="caption"> 학교명</p>
                    <input name="high_school_name" value="${sanitizeHtml(data.high_school.name)}">
                </div>
                <div class="col-12 col-md-6 col-xl-3">
                    <p class="caption"> 입학일</p>
                    <input name="high_school_start_date" type="date" value="${start_date}" min="1990-01-01" max="2025-12-31">
                </div>
                <div class="col-12 col-md-6 col-xl-3">
                    <p class="caption"> 졸업일</p>
                    <input name="high_school_end_date" type="date" value="${end_date}" min="1990-01-01" max="2025-12-31">
                </div>
                <div class="col-12 col-md-6 col-xl-3">
                    <p class="caption"> 졸업여부</p>
                    <select class="select-category" name="high_school_graduate">
                        <option value="">졸업 여부 선택</option>`;
                        
        for(var i=0; i<graduated.length; i++) {
            if(data.high_school.graduate == graduated[i]) { html += `<option value="${graduated[i]}" selected="selected">${graduated[i]}</option>`; }
            else { html += `<option value="${graduated[i]}">${graduated[i]}</option>`; }
        }

        html += `
                    </select>
                </div>
                <div class="col-12">
                    <div class="row card-left-to-right">
                        <p> 추가설명</p>
                        <p class="sm right">(최대 500자)</p>
                    </div>
                    <textarea name="high_school_description" rows="10" cols="50" maxlength="500" style="width: 100%;">${sanitizeHtml(data.high_school.description)}</textarea>
                </div>
                <div class="col-12">
                    <input type="text" maxlength="8" size="20" style="width:auto">
                    <button class="add-btn" type="button" onclick="addKeywords(this)">키워드 추가</button>
                    <div class="row">`;

        for(var i=0; i<keywords.length; i++) {
            html += `
            <div class="keyword col-6 col-md-4 col-xl-3">
                <a class="tag-btn key-item" type="button" href="#${keywords[i]}-keyword"># ${keywords[i]}</a>
                <a class="tag-btn" type="button" onclick="removeKeyword(this)">삭제</a>
            </div>
            `;
        }

        html += `
                        <input name="high_school_keywords" type="hidden" value="${keywords}">
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    
    return html;
}

function editUniversity(data) {
    var html = ``;
    var graduated = ['재학','졸업','졸업예정', '휴학', '편입'];
    if(data.activate.university != null) {
        if(data.university.description == null) { data.university.description = ""; }
        var start_date = getYYYYMMDD(data.university.start_date);
        var end_date = getYYYYMMDD(data.university.end_date);

        var keywords;
        if(data.university.keywords == null || data.university.keywords == "") { keywords = []; }
        else {
            keywords = data.university.keywords;
            keywords = keywords.split(',');
        }
        
        html += `
        <div class="row item">
            <button class="del-btn right" onclick="removeUniversityCard()">삭제</button>
            <div class="row category">
                <h3>대학교</h3>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-xl-6">
                    <p class="caption"> 학교명</p>
                    <input name="university_name" value="${sanitizeHtml(data.university.name)}">
                </div>
                <div class="col-12 col-md-6 col-xl-6">
                    <p class="caption"> 입학일</p>
                    <input type="date" name="university_start_date" value="${start_date}" min="1990-01-01" max="2025-12-31">
                </div>
                <div class="col-12 col-md-6 col-xl-6">
                    <p class="caption"> 졸업일</p>
                    <input type="date" name="university_end_date" value="${end_date}" min="1990-01-01" max="2025-12-31">
                </div>
                <div class="col-12 col-md-6 col-xl-6">
                    <p class="caption"> 학과</p>
                    <input name="university_major" value="${sanitizeHtml(data.university.major)}">
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-4 col-xl-4">
                    <p> 내 학점</p>
                    <input name="university_my_grade" value="${sanitizeHtml(data.university.my_grade)}">
                </div>
                <div class="col-12 col-md-4 col-xl-4">
                    <p> 최대 학점</p>
                    <input name="university_total_grade" value="${sanitizeHtml(data.university.total_grade)}">
                </div>
                <div class="col-12 col-md-4 col-xl-4">
                    <p> 졸업여부</p>
                    <select class="select-category" name="university_graduate">
                    <option value="">졸업 여부 선택</option>`;
                    
    for(var i=0; i<graduated.length; i++) {
        if(data.university.graduate == graduated[i]) { html += `<option value="${graduated[i]}" selected="selected">${graduated[i]}</option>`; }
        else { html += `<option value="${graduated[i]}">${graduated[i]}</option>`; }
    }

    html += `
                </select>
                </div>
                <div class="col-12">
                    <div class="row card-left-to-right">
                        <p> 추가설명</p>
                        <p class="sm right">(최대 500자)</p>
                    </div>
                    <textarea name="university_description" rows="10" cols="50" maxlength="500" style="width: 100%;">${sanitizeHtml(data.university.description)}</textarea>
                </div>
                <div class="col-12">
                    <input type="text" maxlength="8" size="20" style="width:auto">
                    <button class="add-btn" type="button" onclick="addKeywords(this)">키워드 추가</button>
                    <div class="row">`;

        for(var i=0; i<keywords.length; i++) {
            html += `
            <div class="keyword col-6 col-md-4 col-xl-3">
                <a class="tag-btn key-item" type="button" href="#${keywords[i]}-keyword"># ${keywords[i]}</a>
                <a class="tag-btn" type="button" onclick="removeKeyword(this)">삭제</a>
            </div>
            `;
        }

        html += `
                    <input name="university_keywords" type="hidden" value="${keywords}">
                </div>
            </div>
        </div>
        `;
    }
    return html;
}

function editJobExp(data) {
    var html = ``;
    var category = ['인턴','직장경험'];
    if(data.activate.exp_job != null) {
        for(var i=0; i<data.job_exp.length; i++) {
            if(data.job_exp[i].link == null) { data.job_exp[i].link = ""; }
            if(data.job_exp[i].description == null) { data.job_exp[i].description = ""; }
            var start_date = getYYYYMMDD(data.job_exp[i].start_date);
            var end_date = getYYYYMMDD(data.job_exp[i].end_date);

            var keywords;
            if(data.job_exp[i].keywords == null || data.job_exp[i].keywords == "") { keywords = []; }
            else {
                keywords = data.job_exp[i].keywords;
                keywords = keywords.split(',');
            }

            html += `
            <div class="job-exp" id="item-${i}">
                <div class="row item">
                    <button class="del-btn right" onclick="removeJobExp(this); return false;">삭제</button>
                    <div class="row category">
                        <p class="caption"> 경험 선택</p>
                        <select class="select-category" name="job_exp_category_${i}">
                            <option value="">직무 경험 선택</option>`;

            for(var c_idx=0; c_idx<category.length; c_idx++) {
                if(data.job_exp[i].category == category[c_idx]) { html += `<option value="${category[c_idx]}" selected="selected">${category[c_idx]}</option>`; }
                else { html += `<option value="${category[c_idx]}">${category[c_idx]}</option>`; }
            }

            html += `
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6 col-xl-3">
                            <p class="caption"> 회사명</p>
                            <input name="job_exp_name_${i}" value="${sanitizeHtml(data.job_exp[i].name)}">
                        </div>
                        <div class="col-12 col-md-6 col-xl-3">
                            <p class="caption"> 업무시작</p>
                            <input type="date" name="job_exp_start_date_${i}" value="${start_date}" min="1990-01-01" max="2025-12-31">
                        </div>
                        <div class="col-12 col-md-6 col-xl-3">
                            <p class="caption"> 업무종료</p>
                            <input type="date" name="job_exp_end_date_${i}" value="${end_date}" min="1990-01-01" max="2025-12-31">
                        </div>
                        <div class="col-12 col-md-6 col-xl-3">
                            <p class="caption"> 직책</p>
                            <input name="job_exp_position_${i}" value="${sanitizeHtml(data.job_exp[i].position)}">
                        </div>
                        <div class="col-12">
                            <p> 링크</p>
                            <input name="job_exp_link_${i}" placeholder="http://www.example.com" style="width: 100%;" value="${sanitizeHtml(data.job_exp[i].link)}">
                        </div>
                        <div class="col-12">
                            <div class="row card-left-to-right">
                                <p> 업무성과</p>
                                <p class="sm right">(최대 500자)</p>
                            </div>
                            <textarea name="job_exp_description_${i}" rows="10" cols="50" maxlength="500" style="width: 100%;">${sanitizeHtml(data.job_exp[i].description)}</textarea>
                        </div>
                        <div class="col-12">
                            <input type="text" maxlength="8" size="20" style="width:auto">
                            <button class="add-btn" type="button" onclick="addKeywords(this)">키워드 추가</button>
                            <div class="row">`;

                for(var k_idx=0; k_idx<keywords.length; k_idx++) {
                    html += `
                    <div class="keyword col-6 col-md-4 col-xl-3">
                        <a class="tag-btn key-item" type="button" href="#${keywords[k_idx]}-keyword"># ${keywords[k_idx]}</a>
                        <a class="tag-btn" type="button" onclick="removeKeyword(this)">삭제</a>
                    </div>
                    `;
                }

                html += `
                                <input name="job_exp_keywords_${i}" type="hidden" value="${keywords}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
    return html;
}

function editGlobalExp(data) {
    var html = ``;
    var category = ['어학연수','교환학생','워킹홀리데이','해외여행','그외'];
    if(data.activate.exp_global != null) {
        //console.log("i of data.job_exp : ", data.global_exp);
        for(var i=0; i<data.global_exp.length; i++) {
            if(data.global_exp[i].link == null) { data.global_exp[i].link = ""; }
            if(data.global_exp[i].description == null) { data.global_exp[i].description = ""; }
            var start_date = getYYYYMMDD(data.global_exp[i].start_date);
            var end_date = getYYYYMMDD(data.global_exp[i].end_date);

            var keywords;
            if(data.global_exp[i].keywords == null || data.global_exp[i].keywords == "") { keywords = []; }
            else {
                keywords = data.global_exp[i].keywords;
                keywords = keywords.split(',');
            }

            html += `
            <div class="global-exp" id="item-${i}">
                <div class="row item">
                    <button class="del-btn right" onclick="removeGlobalExp(this); return false;">삭제</button>
                    <div class="row category">
                        <p class="caption"> 경험 선택</p>
                        <select class="select-category" name="global_exp_category_${i}">
                            <option value="">해외 경험 선택</option>`;

            for(var c_idx=0; c_idx<category.length; c_idx++) {
                if(data.global_exp[i].category == category[c_idx]) { html += `<option value="${category[c_idx]}" selected="selected">${category[c_idx]}</option>`; }
                else { html += `<option value="${category[c_idx]}">${category[c_idx]}</option>`; }
            }

            html += `
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6 col-xl-6">
                            <p class="caption"> 시작일</p>
                            <input type="date" name="global_exp_start_date_${i}" value="${start_date}" min="1990-01-01" max="2025-12-31">
                        </div>
                        <div class="col-12 col-md-6 col-xl-6">
                            <p class="caption"> 종료일</p>
                            <input type="date" name="global_exp_end_date_${i}" value="${end_date}" min="1990-01-01" max="2025-12-31">
                        </div>
                        <div class="col-12">
                            <p> 링크</p>
                            <input name="global_exp_link_${i}" placeholder="http://www.example.com" style="width: 100%;" value="${sanitizeHtml(data.global_exp[i].link)}">
                        </div>
                        <div class="col-12">
                            <div class="row card-left-to-right">
                                <p> 수행내용</p>
                                <p class="sm right">(최대 250자)</p>
                            </div>
                            <textarea name="global_exp_description_${i}" rows="10" cols="50" maxlength="250" style="width: 100%;">${sanitizeHtml(data.global_exp[i].description)}</textarea>
                        </div>
                        <div class="col-12">
                            <input type="text" maxlength="8" size="20" style="width:auto">
                            <button class="add-btn" type="button" onclick="addKeywords(this)">키워드 추가</button>
                            <div class="row">`;

                for(var k_idx=0; k_idx<keywords.length; k_idx++) {
                    html += `
                    <div class="keyword col-6 col-md-4 col-xl-3">
                        <a class="tag-btn key-item" type="button" href="#${keywords[k_idx]}-keyword"># ${keywords[k_idx]}</a>
                        <a class="tag-btn" type="button" onclick="removeKeyword(this)">삭제</a>
                    </div>
                    `;
                }

                html += `
                                <input name="global_exp_keywords_${i}" type="hidden" value="${keywords}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
    return html;
}

function editOtherExp(data) {
    var html = ``;

    if(data.activate.exp_others != null) {
        for(var i=0; i<data.other_exp.length; i++) {
            if(data.other_exp[i].link == null) { data.other_exp[i].link = ""; }
            if(data.other_exp[i].description == null) { data.other_exp[i].description = ""; }
            var start_date = getYYYYMMDD(data.other_exp[i].start_date);
            var end_date = getYYYYMMDD(data.other_exp[i].end_date);

            var keywords;
            if(data.other_exp[i].keywords == null || data.other_exp[i].keywords == "") { keywords = []; }
            else {
                keywords = data.other_exp[i].keywords;
                keywords = keywords.split(',');
            }

            html += `
            <div class="other-exp" id="item-${i}">
                <div class="row item">
                    <button class="del-btn right" onclick="removeOtherExp(this); return false;">삭제</button>
                    <div class="row">
                        <div class="col-12">
                            <p class="caption"> 활동명</p>
                            <input type="text" name="other_exp_name_${i}" value="${sanitizeHtml(data.other_exp[i].name)}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6 col-xl-6">
                            <p class="caption"> 시작일</p>
                            <input type="date" name="other_exp_start_date_${i}" value="${start_date}" min="1990-01-01" max="2025-12-31">
                        </div>
                        <div class="col-12 col-md-6 col-xl-6">
                            <p class="caption"> 종료일</p>
                            <input type="date" name="other_exp_end_date_${i}" value="${end_date}" min="1990-01-01" max="2025-12-31">
                        </div>
                        <div class="col-12">
                            <p> 링크</p>
                            <input name="other_exp_link_${i}" placeholder="http://www.example.com" style="width: 100%;" value="${sanitizeHtml(data.other_exp[i].link)}">
                        </div>
                        <div class="col-12">
                            <div class="row card-left-to-right">
                                <p> 수행내용</p>
                                <p class="sm right">(최대 250자)</p>
                            </div>
                            <textarea name="other_exp_description_${i}" rows="10" cols="50" maxlength="250" style="width: 100%;">${sanitizeHtml(data.other_exp[i].description)}</textarea>
                        </div>
                        <div class="col-12">
                            <input type="text" maxlength="8" size="20" style="width:auto">
                            <button class="add-btn" type="button" onclick="addKeywords(this)">키워드 추가</button>
                            <div class="row">`;

                for(var k_idx=0; k_idx<keywords.length; k_idx++) {
                    html += `
                    <div class="keyword col-6 col-md-4 col-xl-3">
                        <a class="tag-btn key-item" type="button" href="#${keywords[k_idx]}-keyword"># ${keywords[k_idx]}</a>
                        <a class="tag-btn" type="button" onclick="removeKeyword(this)">삭제</a>
                    </div>
                    `;
                }

                html += `
                                <input name="other_exp_keywords_${i}" type="hidden" value="${keywords}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
    return html;
}

function editCertMajor(data) {
    var html = ``;
    if(data.activate.cert_major != null) {
        var idx = 0;
        for(var i=0; i<data.certificate.length; i++) {
            if(data.certificate[i].category == "전공") {
                var get_date = getYYYYMMDD(data.certificate[i].get_date);

                html += `
                <div class="cert-major" id="item-${idx}">
                    <div class="row item">
                        <button class="del-btn right" onclick="removeCertMajor(this); return false;">삭제</button>
                        <div class="row">
                            <div class="col-12">
                                <p class="caption"> 자격증</p>
                                <input type="text" name="cert_major_name_${idx}" value="${sanitizeHtml(data.certificate[i].name)}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-12 col-xl-6">
                                <p class="caption"> 자격번호</p>
                                <input name="cert_major_cerial_${idx}" value="${sanitizeHtml(data.certificate[i].cerial)}">
                            </div>
                            <div class="col-12 col-md-12 col-xl-6">
                                <p class="caption"> 취득일</p>
                                <input type="date" name="cert_major_get_date_${idx}" value="${get_date}" min="1990-01-01" max="2025-12-31"></p>
                            </div>
                            <div class="col-12 col-md-12 col-xl-6">
                                <p class="caption"> 기관</p>
                                <input name="cert_major_agency_${idx}" value="${sanitizeHtml(data.certificate[i].agency)}">
                            </div>
                            <div class="col-12 col-md-12 col-xl-6">
                                <p> 등급 / 점수</p>
                                <input name="cert_major_grade_${idx}" value="${sanitizeHtml(data.certificate[i].grade)}">
                            </div>
                        </div>
                    </div>
                </div>
                `;
                idx += 1;
            }
        }
    }
    return html;
}

function editCertLang(data) {
    var html = ``;
    if(data.activate.cert_lang != null) {
        var idx = 0;
        for(var i=0; i<data.certificate.length; i++) {
            if(data.certificate[i].category == "어학") {
                var get_date = getYYYYMMDD(data.certificate[i].get_date);

                html += `
                <div class="cert-lang" id="item-${idx}">
                    <div class="row item">
                        <button class="del-btn right" onclick="removeCertLang(this); return false;">삭제</button>
                        <div class="row">
                            <div class="col-12">
                                <p class="caption"> 자격증</p>
                                <input type="text" name="cert_lang_name_${idx}" value="${sanitizeHtml(data.certificate[i].name)}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-12 col-xl-6">
                                <p class="caption"> 자격번호</p>
                                <input name="cert_lang_cerial_${idx}" value="${sanitizeHtml(data.certificate[i].cerial)}">
                            </div>
                            <div class="col-12 col-md-12 col-xl-6">
                                <p class="caption"> 취득일</p>
                                <input type="date" name="cert_lang_get_date_${idx}" value="${sanitizeHtml(get_date)}" min="1990-01-01" max="2025-12-31"></p>
                            </div>
                            <div class="col-12 col-md-12 col-xl-6">
                                <p class="caption"> 기관</p>
                                <input name="cert_lang_agency_${idx}" value="${sanitizeHtml(data.certificate[i].agency)}">
                            </div>
                            <div class="col-12 col-md-12 col-xl-6">
                                <p> 등급 / 점수</p>
                                <input name="cert_lang_grade_${idx}" value="${sanitizeHtml(data.certificate[i].grade)}">
                            </div>
                        </div>
                    </div>
                </div>
                `;
                idx += 1;
            }
        }
    }
    return html;
}

function editCertOther(data) {
    var html = ``;
    if(data.activate.cert_others != null) {
        var idx = 0;
        for(var i=0; i<data.certificate.length; i++) {
            if(data.certificate[i].category == "그외") {
                var get_date = getYYYYMMDD(data.certificate[i].get_date);

                html += `
                <div class="cert-other" id="item-${idx}"> 
                    <div class="row item">
                        <button class="del-btn right" onclick="removeCertOther(this); return false;">삭제</button>
                        <div class="row">
                            <div class="col-12">
                                <p class="caption"> 자격증</p>
                                <input type="text" name="cert_other_name_${idx}" value="${sanitizeHtml(data.certificate[i].name)}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-12 col-xl-6">
                                <p class="caption"> 자격번호</p>
                                <input name="cert_other_cerial_${idx}" value="${sanitizeHtml(data.certificate[i].cerial)}">
                            </div>
                            <div class="col-12 col-md-12 col-xl-6">
                                <p class="caption"> 취득일</p>
                                <input type="date" name="cert_other_get_date_${idx}" value="${get_date}" min="1990-01-01" max="2025-12-31"></p>
                            </div>
                            <div class="col-12 col-md-12 col-xl-6">
                                <p class="caption"> 기관</p>
                                <input name="cert_other_agency_${idx}" value="${sanitizeHtml(data.certificate[i].agency)}">
                            </div>
                            <div class="col-12 col-md-12 col-xl-6">
                                <p> 등급 / 점수</p>
                                <input name="cert_other_grade_${idx}" value="${sanitizeHtml(data.certificate[i].grade)}">
                            </div>
                        </div>
                    </div>
                </div>
                `;
                idx += 1;
            }
        }
    }
    return html;
}

function editPrizeIn(data) {
    var html = ``;
    if(data.activate.prize_in != null) {
        var idx = 0;
        for(var i=0; i<data.prize.length; i++) {
            if(data.prize[i].category == "교내") {
                var get_date = getYYYYMMDD(data.prize[i].get_date);

                html += `
                <div class="prize-in-item" id="item-${idx}">
                    <div class="row item">
                        <button class="del-btn right" onclick="removePrizeIn(this); return false;">삭제</button>
                        <div class="row">
                            <div class="col-12">
                                <p class="caption"> 대회명</p>
                                <input type="text" name="prize_in_name_${idx}" value="${sanitizeHtml(data.prize[i].name)}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-6 col-xl-6">
                                <p class="caption"> 수상일</p>
                                <input type="date" name="prize_in_get_date_${idx}" value="${get_date}" min="1990-01-01" max="2025-12-31"></p>
                            </div>
                            <div class="col-12 col-md-6 col-xl-6">
                                <p class="caption"> 기관</p>
                                <input name="prize_in_agency_${idx}" value="${sanitizeHtml(data.prize[i].agency)}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-6 col-xl-6">
                                <p> 순위/등수</p>
                                <input name="prize_in_rank_${idx}" value="${sanitizeHtml(data.prize[i].rank)}">
                            </div>
                            <div class="col-12 col-md-6 col-xl-6">
                                <p> 참가자 수</p>
                                <input name="prize_in_party_${idx}" value="${sanitizeHtml(data.prize[i].party)}">
                            </div>
                            <div class="col-12">
                                <p> 링크</p>
                                <input name="prize_in_link_${idx}" placeholder="http://www.example.com" style="width: 100%;" value="${sanitizeHtml(data.prize[i].link)}">
                            </div>
                            <div class="col-12">
                                <div class="row card-left-to-right">
                                    <p> 수행내용</p>
                                    <p class="sm right">(최대 250자)</p>
                                </div>
                                <textarea name="prize_in_description_${idx}" rows="5" cols="50" maxlength="250" style="width: 100%;">${sanitizeHtml(data.prize[i].description)}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                idx += 1;
            }
        }
    }
    return html;
}

function editPrizeOut(data) {
    var html = ``;
    if(data.activate.prize_out != null) {
        var idx = 0;
        for(var i=0; i<data.prize.length; i++) {
            if(data.prize[i].category == "교외") {
                var get_date = getYYYYMMDD(data.prize[i].get_date);

                html += `
                <div class="prize-out-item" id="item-${idx}">
                    <div class="row item">
                        <button class="del-btn right" onclick="removePrizeOut(this); return false;">삭제</button>
                        <div class="row">
                            <div class="col-12">
                                <p class="caption"> 대회명</p>
                                <input type="text" name="prize_out_name_${idx}" value="${sanitizeHtml(data.prize[i].name)}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-6 col-xl-6">
                                <p class="caption"> 수상일</p>
                                <input type="date" name="prize_out_get_date_${idx}" value="${get_date}" min="1990-01-01" max="2025-12-31"></p>
                            </div>
                            <div class="col-12 col-md-6 col-xl-6">
                                <p class="caption"> 기관</p>
                                <input name="prize_out_agency_${idx}" value="${sanitizeHtml(data.prize[i].agency)}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-6 col-xl-6">
                                <p> 순위/등수</p>
                                <input name="prize_out_rank_${idx}" value="${sanitizeHtml(data.prize[i].rank)}">
                            </div>
                            <div class="col-12 col-md-6 col-xl-6">
                                <p> 참가자 수</p>
                                <input name="prize_out_party_${idx}" value="${sanitizeHtml(data.prize[i].party)}">
                            </div>
                            <div class="col-12">
                                <p> 링크</p>
                                <input name="prize_out_link_${idx}" placeholder="http://www.example.com" style="width: 100%;" value="${sanitizeHtml(data.prize[i].link)}">
                            </div>
                            <div class="col-12">
                                <div class="row card-left-to-right">
                                    <p> 수행내용</p>
                                    <p class="sm right">(최대 250자)</p>
                                </div>
                                <textarea name="prize_out_description_${idx}" rows="5" cols="50" maxlength="250" style="width: 100%;">${sanitizeHtml(data.prize[i].description)}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                idx += 1;
            }
        }
    }
    return html;
}

function editPortfolioWork(data) {
    var html = ``;
    if(data.activate.port_work != null) {
        for(var i=0; i<data.port_work.length; i++) {
            var start_date = getYYYYMMDD(data.port_work[i].start_date);
            var end_date = getYYYYMMDD(data.port_work[i].end_date);

            html += `
            <div class="port-work" id="item-${i}">
                <div class="row item">
                    <button class="del-btn right" onclick="removePortWork(this); return false;">삭제</button>
                    <div class="row">
                        <div class="col-12">
                            <p class="caption"> 프로젝트 / 작품명</p>
                            <input type="text" name="port_work_name_${i}" value="${sanitizeHtml(data.port_work[i].name)}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6 col-xl-6">
                            <p class="caption"> 시작일</p>
                            <input type="date" name="port_work_start_date_${i}" value="${start_date}" min="1990-01-01" max="2025-12-31">
                        </div>
                        <div class="col-12 col-md-6 col-xl-6">
                            <p class="caption"> 종료일</p>
                            <input type="date" name="port_work_end_date_${i}" value="${end_date}" min="1990-01-01" max="2025-12-31">
                        </div>
                        <div class="col-12 col-md-6 col-xl-6">
                            <p> 역할</p>
                            <input name="port_work_role_${i}" value="${sanitizeHtml(data.port_work[i].role)}">
                        </div>
                        <div class="col-12 col-md-6 col-xl-6">
                            <p> 팀원</p>
                            <input name="port_work_party_${i}" value="${sanitizeHtml(data.port_work[i].party)}">
                        </div>
                        <div class="col-12">
                            <p> 링크</p>
                            <input name="port_work_link_${i}" placeholder="http://www.example.com" value="${sanitizeHtml(data.port_work[i].link)}">
                        </div>
                        <div class="col-12">
                            <div class="row card-left-to-right">
                                <p> 수행내용</p>
                                <p class="sm right">(최대 500자)</p>
                            </div>
                            <textarea name="port_work_description_${i}" rows="6" cols="50" maxlength="500" style="width: 100%;">${sanitizeHtml(data.port_work[i].description)}</textarea>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
    return html;
}

function editPortfolioRights(data) {
    var html = ``;
    if(data.activate.port_rights != null) {
        for(var i=0; i<data.port_rights.length; i++) {
            var release_date = getYYYYMMDD(data.port_rights[i].release_date);

            html += `
            <div class="port-rights" id="item-${i}">
                <div class="row item">
                    <button class="del-btn right" onclick="removePortRights(this); return false;">삭제</button>
                    <div class="row">
                        <div class="col-12">
                            <p class="caption"> 논문 / 출판 / 특허명</p>
                            <input type="text" name="port_rights_name_${i}" value="${sanitizeHtml(data.port_rights[i].name)}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6 col-xl-6">
                            <p class="caption"> 저자</p>
                            <input name="port_rights_author_${i}" value="${sanitizeHtml(data.port_rights[i].author)}">
                        </div>
                        <div class="col-12 col-md-6 col-xl-6">
                            <p> 출원번호</p>
                            <input name="port_rights_number_${i}" value="${sanitizeHtml(data.port_rights[i].number)}">
                        </div>
                        <div class="col-12 col-md-6 col-xl-6">
                            <p> 출원국가</p>
                            <input name="port_rights_country_${i}" value="${sanitizeHtml(data.port_rights[i].country)}">
                        </div>
                        <div class="col-12 col-md-6 col-xl-6">
                            <p> 출원날짜</p>
                            <input type="date" name="port_rights_release_date_${i}" value="${release_date}" min="1990-01-01" max="2025-12-31">
                        </div>
                        <div class="col-12">
                            <p> 링크</p>
                            <input name="port_rights_link_${i}" placeholder="http://www.example.com" value="${sanitizeHtml(data.port_rights[i].link)}">
                        </div>
                        <div class="col-12">
                            <div class="row card-left-to-right">
                                <p> 상세내용</p>
                                <p class="sm right">(최대 300자)</p>
                            </div>
                            <textarea name="port_rights_description_${i}" rows="6" cols="50" maxlength="300" style="width: 100%;">${sanitizeHtml(data.port_rights[i].description)}</textarea>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
    return html;
}

function getYYYYMMDD(date) {
    var ret = "";

    var cur_date = new Date(date);
    ret += (cur_date.getFullYear()) + "-";
    if(cur_date.getMonth() + 1 < 10) { ret += ("0" + (cur_date.getMonth() + 1)) + "-"; }
    else  { ret += (cur_date.getMonth() + 1) + "-"; }
    if(cur_date.getDate() < 10) { ret += ("0" + cur_date.getDate()); }
    else  { ret += cur_date.getDate(); }

    return ret;
}