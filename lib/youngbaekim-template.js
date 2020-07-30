module.exports = {
    HTML: function() {
        return `
        <!DOCTYPE html>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width", initial-scale="1.0">
        <html>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>
                <link rel="stylesheet" href="./css/youngbaekim/style.css">
                <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/themes/base/jquery-ui.css" type="text/css" media="all" /> 
                <title>김영배의 프로필</title>
                <link rel="shortcut icon" type="image/x-icon" href="./image/youngbaekim/layer-group-solid.svg">
            </head>
            <body>
                <header id="home">
                    <div class="image-container">
                        <img src="./image/youngbaekim/header_image.jpg">
                        <div class="menu-icon top-left"><i class="font-icon fas fa-bars" onclick="changeMenuIcon()"></i></div>
                        <div id="title-move" class="centered">
                            <p class="emphasis">김영배의 프로필 페이지</p>
                            <hr class="header-line"/>
                            FRONT END DEVELOPER
                        </div>
                        <a class="move-content" href="#content">
                            <div class="bottom-center">
                                <p>더보기</p>
                                </br>
                                </br>
                                </br>
                                </br>
                                <div id="bounce-animation"><i class="fas fa-angle-double-down"></i></div>
                            </div>
                        </a>
                    </div>
                </header>

                <section class="menu-overlay">
                    <ul>
                        <li><a href="#home" onclick="displayNoneMenuOverlay()">홈</a></li>
                        <li><a href="#content" onclick="displayNoneMenuOverlay()">나는 누구?</a></li>
                        <li><a href="#timeline" onclick="displayNoneMenuOverlay()">타임라인</a></li>
                        <li><a href="#project" onclick="displayNoneMenuOverlay()">프로젝트</a></li>
                        <li><a href="#contact" onclick="displayNoneMenuOverlay()">연락처</a></li>
                    </ul>
                </section>

                <section id="content" class="explanation">
                    <div class="title row">
                        <h2 class="emphasis">제 웹 페이지에 오신것을 환영합니다!<br> 제 이름은 김영배입니다.</h2>
                        <br/>
                    </div>
                    <div class="quote row">
                        <div class="col-12 col-md-7">
                            <p><i class="fas fa-quote-left"></i></p>
                            <p class="tilt">성공은 열심히 노력하며 기다리는 사람에게 찾아온다.</p>
                            <p class="tilt">- 토마스 A. 에디슨 -</p>
                            <p class="tilt">모든 일에 최선을 다해 여러 경험을 쌓았습니다.</p>
                            <p class="tilt">제 이력은 PDF 파일로 정리되어 있습니다.</p>
                            <p></p>
                        </div>
                        <div class="col-12 col-md-5">
                            <div class="container">
                                <a href="/introduction_kim.pdf" target="_blank" class="btn-flip" data-back="바로가기" data-front="이력서"></a>
                            </div>
                        </div>
                    </div>
                    <div class="paragraph-sm row">
                        <div class="col-12">
                            <p><i class="fas fa-tasks"></i></p>
                            <p class="tilt">웹 프론트엔드 개발을 위해 개인 프로젝트를 진행했습니다.</p>
                            <p class="tilt">HTML, CSS, Javascript 에 대한 기본기를 다졌습니다.</p>
                            <p class="tilt">모든 프로젝트는 Github와 연동되어 있습니다.</p>
                        </div>
                        <div class="col-12">
                            <div class="container">
                                <a href="https://github.com/canoe726?tab=repositories" target="_blank" class="btn-flip" data-back="바로가기" data-front="깃허브"></a>
                            </div>
                        </div>
                    </div>
                    <div class="paragraph row">
                        <div class="col-5">
                            <div class="container">
                                <a href="https://github.com/canoe726?tab=repositories" target="_blank" class="btn-flip" data-back="바로가기" data-front="깃허브"></a>
                            </div>
                        </div>
                        <div class="col-7">
                            <p><i class="fas fa-tasks"></i></p>
                            <p class="tilt">웹 프론트엔드 개발을 위해 개인 프로젝트를 진행했습니다.</p>
                            <p class="tilt">HTML, CSS, Javascript 에 대한 기본기를 다졌습니다.</p>
                            <p class="tilt">모든 프로젝트는 Github와 연동되어 있습니다.</p>
                        </div>
                    </div>
                </section>

                <section id="timeline" class="my-timeline">
                    <div class="timeline">
                        <div class="timeline-container">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="timeline-content left">
                                        <h2 id="slideDownText1">프론트 엔드 개발의 기본기</h2>
                                        <p>HTML, CSS, JavaScript 실력을 향상시키기 위해 페이지를 제작해 왔습니다.</p>
                                        <p>프레임워크를 사용하기 전 기반이 되는 기술에 대해 중요하게 여기고 연습을 해왔습니다.</p>
                                        <p>자세한 내용은 Github를 통해서 볼 수 있습니다.</p>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="timeline-content">
                                        <a href="#project"><img id="slideUpImg1" src="./image/youngbaekim/timeline1.jpg"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="timeline-container">
                            <div class="timeline-left-sm row">
                                <div class="col-12">
                                    <div class="timeline-content">
                                        <h2 id="slideDownText2">개발 환경과 적응</h2>
                                        <p>대학 재학기간 동안의 웹, 앱, 인공지능 개발 경험은 더 나은 코드 작성을 하는데 도움이 되었습니다.</p>
                                        <p>새로운 기술을 익히고 지속성장할 준비가 되어있습니다.</p>
                                        <p>1. 라인 앱 개발 챌린지 <br/> <i class="far fa-hand-point-right"></i> <a href="https://github.com/canoe726/memo_app_challenge" target="_blank" class="move-link">이동하기</a></p>
                                        <p>2. 마이리얼트립 앱 개발 챌린지 <br/> <i class="far fa-hand-point-right"></i> <a href="https://github.com/canoe726/rss_reader_challenge" target="_blank" class="move-link">이동하기</a></p>
                                        <p>3. 연구실 인공지능 모델 개발 경험 <br/> <i class="far fa-hand-point-right"></i> <a href="https://github.com/canoe726/Self-directed-learning-class" target="_blank" class="move-link">이동하기</a></p>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="timeline-content left">
                                        <img id="slideUpImg2" src="./image/youngbaekim/timeline2.jpg">
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-left row">
                                <div class="col-6">
                                    <div class="timeline-content left">
                                        <img id="slideUpImg2" src="./image/youngbaekim/timeline2.jpg">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="timeline-content">
                                        <h2 id="slideDownText2">개발 환경과 적응</h2>
                                        <p>대학 재학기간 동안의 웹, 앱, 인공지능 개발 경험은 더 나은 코드 작성을 하는데 도움이 되었습니다.</p>
                                        <p>항상 새로운 기술을 익히고 지속성장할 준비가 되어있습니다.</p>
                                        <p>1. 라인 앱 개발 챌린지 <i class="far fa-hand-point-right"></i> <a href="https://github.com/canoe726/memo_app_challenge" target="_blank" class="move-link">이동하기</a></p>
                                        <p>2. 마이리얼트립 앱 개발 챌린지 <i class="far fa-hand-point-right"></i> <a href="https://github.com/canoe726/rss_reader_challenge" target="_blank" class="move-link">이동하기</a></p>
                                        <p>3. 연구실 인공지능 모델 개발 경험 <i class="far fa-hand-point-right"></i> <a href="https://github.com/canoe726/Self-directed-learning-class" target="_blank" class="move-link">이동하기</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="timeline-container">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="timeline-content left">
                                        <h2 id="slideDownText3">Github를 통한 버전관리</h2>
                                        <p>프로젝트, 알고리즘 문제 등 활동한 결과물은 Github를 통해 관리하고 있습니다.</p>
                                        <p>새로운 기능과 더 나은 SW 품질을 위해 노력하고 있습니다.</p>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="timeline-content">
                                        <img id="slideUpImg3" src="./image/youngbaekim/timeline3.jpg">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="project" class="portfolio-card">
                    <div class="row">
                        <div class="col-4">
                            <a href="https://github.com/canoe726/SneakerTech" target="_blank">
                                <div class="image-container">
                                    <img src="./image/youngbaekim/image3.jpg">
                                </div>
                                <div class="container">
                                    <div class="centered">
                                        <h2>Sneaker x Tech</h2>
                                        <p>신발 가격 비교사이트</p>
                                        <hr class="content-line"/>
                                        <p>스니커 발매일 크롤링</p>
                                        <p>스니커 가격 그래프</p>
                                        <p>스니커 품목 정렬</p>
                                        <br/>
                                        <br/>
                                        <p><i class="fas fa-angle-double-right"></i></p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-4">
                            <a href="https://github.com/canoe726/MyResume" target="_blank">
                                <div class="image-container">
                                    <img src="./image/youngbaekim/image4.jpg">
                                </div>
                                <div class="container">
                                    <div class="centered">
                                        <h2>MyResume</h2>
                                        <p>내 이력 관리 사이트</p>
                                        <hr class="content-line"/>
                                        <p>프로필 수정</p>
                                        <p>내 프로필 그래프</p>
                                        <p>To Do 리스트</p>
                                        <br/>
                                        <br/>
                                        <p><i class="fas fa-angle-double-right"></i></p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-4">
                            <a href="https://github.com/canoe726/Sejong-Self-Development" target="_blank">
                                <div class="image-container">
                                    <img src="./image/youngbaekim/image1.jpg">
                                </div>
                                <div class="container">
                                    <div class="centered">
                                        <h2>Sejong-Self-Development</h2>
                                        <p>교내 해커톤</p>
                                        <hr class="content-line"/>
                                        <p>트랙 수강 현황</p>
                                        <p>과목 추천</p>
                                        <p>공유 게시판</p>
                                        <br/>
                                        <br/>
                                        <p><i class="fas fa-angle-double-right"></i></p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>

                <footer id="contact">
                    <div class="row">
                        <div class="title col-12">
                            <h2>저에게 관심이 있으시다면 메일을 보내주세요!</h2>
                        </div>
                        <div class="email col-12">
                            <input name="email" type="text" placeholder="이메일 주소">
                            <p class="warning-text">* 위 항목을 입력하세요</p>
                        </div>
                        <div class="subject col-12">
                            <input name="subject" type="text" placeholder="보낼 메일 제목">
                            <p class="warning-text">* 위 항목을 입력하세요</p>
                        </div>
                        <div class="col-12">
                            <textarea name="message" cols="40" rows="8" placeholder="메시지"></textarea>
                        </div>
                        <div class="btn col-12">
                            <button type="submit" class="send-btn" onclick="return checkForm()"><i class="fab fa-telegram-plane"></i></button>
                        </div>
                        <div class="content col-12">
                            <i class="far fa-envelope"></i> Email - canoe918@gmail.com
                        </div>
                        <div class="content col-12">
                            <i class="far fa-copyright"></i> CopyRight - YoungBae Kim
                        </div>
                    </div>
                </footer>        

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.min.js" type="text/javascript"></script>
                <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js" type="text/javascript"></script>
                <script src="./js/jquery.linkunderanim.js"></script>
                <script src="./js/youngbaekim.js"></script>
            </body>
        </html>
        `;
    }
}