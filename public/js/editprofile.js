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

// collapsible
var coll = document.getElementsByClassName('collapsible');
var i;

for(i=0; i<coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.parentNode.parentNode.parentNode.nextElementSibling;

    if(content.style.display === "" || content.style.display === "block") {
      content.style.display = "none";
      var padding = this.parentNode.parentNode.previousElementSibling;
      padding.childNodes[0].style.marginBottom = "10px";
    } else {
      content.style.display = "block";
      var padding = this.parentNode.parentNode.previousElementSibling;
      padding.childNodes[0].style.marginBottom = "0px";
    }
  });
}

// add link btn
function addLinkInputBtn() {
  var ul = document.querySelector('.contact-list');
  var li_size = document.querySelectorAll('.contact-list li').length;

  var li = document.createElement("li");
  li.className = "links";

  var input = document.createElement("input");
  input.type = "url";
  input.name = "user_info_link" + (li_size - 1);
  input.placeholder = "http://www.example.com";

  if(li_size > 5) {
    var btn = document.querySelector('.add-btn');
    btn.style.display = 'none';
    li.appendChild(input);
    ul.appendChild(li);
    return;
  }

  li.appendChild(input);
  ul.appendChild(li);
}

// remove keywords
function removeKeyword(element) {
  var del_key = element.parentNode;
  var container = element.parentNode.parentNode;

  del_key.remove();

  var text_input = container.parentNode.querySelector('input[type="text"]');
  var add_btn = container.parentNode.querySelector('.add-btn');
  var input_val = container.querySelectorAll('.key-item');

  if(input_val.length <= 5) {
    text_input.style.display = "initial";
    add_btn.style.display = "initial";
  }

  var keywords = [];
  for(var i=0; i<input_val.length; i++) {
    var text = input_val[i].innerHTML.substr(2);
    keywords.push(text);
  }

  var hidden_input = container.querySelector('input[type="hidden"]');
  hidden_input.value = keywords;
}

// add keywords
function addKeywords(element) {
  var container = element.parentNode;

  var text_input = container.querySelector('input[type="text"]');
  var add_btn = container.querySelector('.add-btn');
  var row = container.querySelector('.row');
  var input_val = container.querySelectorAll('.key-item');

  if(input_val.length >= 5) {
    text_input.style.display = "none";
    add_btn.style.display = "none";
  } 

  row.innerHTML += `
  <div class="keyword col-6 col-md-4 col-xl-3">
    <a class="tag-btn key-item" type="button" id=${text_input.value} href="#${text_input.value}-keyword"># ${text_input.value}</a>
    <a class="tag-btn" type="button" onclick="removeKeyword(this)">삭제</a>
  </div>
  `;

  text_input.value = "";
  input_val = container.querySelectorAll('.key-item');

  var keywords = [];
  for(var i=0; i<input_val.length; i++) {
    var text = input_val[i].innerHTML.substr(2);
    keywords.push(text);
  }

  var hidden_input = container.querySelector('input[type="hidden"]');
  hidden_input.value = keywords;
}

// add school card
function addSchoolCard() {
  var school = document.querySelector('.information .high-school');
  if(school.innerHTML.trim() == "") {
    school.innerHTML = `
    <div class="row item">
      <button class="del-btn right" onclick="removeHighSchoolCard()">삭제</button>
      <div class="row category">
          <h3>고등학교</h3>
      </div>
      <div class="row">
          <div class="col-12 col-md-6 col-xl-3">
              <p class="caption"> 학교명</p>
              <input name="high_school_name" value="">
          </div>
          <div class="col-12 col-md-6 col-xl-3">
              <p class="caption"> 입학일</p>
              <input type="date" name="high_school_start_date" value="" min="1990-01-01" max="2025-12-31">
          </div>
          <div class="col-12 col-md-6 col-xl-3">
              <p class="caption"> 졸업일</p>
              <input type="date" name="high_school_end_date" value="" min="1990-01-01" max="2025-12-31">
          </div>
          <div class="col-12 col-md-6 col-xl-3">
              <p class="caption"> 졸업여부</p>
              <select class="select-category" name="high_school_graduate">
                <option value="">졸업 여부 선택</option>
                <option value="재학">재학</option>
                <option value="졸업">졸업</option>
                <option value="졸업예정">졸업예정</option>
                <option value="휴학">휴학</option>
                <option value="편입">편입</option>
              </select>
          </div>
          <div class="col-12">
              <div class="row card-left-to-right">
                  <p> 추가설명</p>
                  <p class="sm right">(최대 500자)</p>
              </div>
              <textarea name="high_school_description" rows="10" cols="50" maxlength="500" style="width: 100%;"></textarea>
          </div>
          <div class="col-12">
              <input type="text" maxlength="8" size="20" style="width:auto">
              <button class="add-btn" type="button" onclick="addKeywords(this)">키워드 추가</button>
              <div class="row"></div>
              <input name="high_school_keywords" type="hidden">
          </div>
        </div>
    </div>
    `;
    return;
  }

  school = document.querySelector('.information .university');
  if(school.innerHTML.trim() == "") {
    school.innerHTML = `
    <div class="row item">
      <button class="del-btn right" onclick="removeUniversityCard()">삭제</button>
      <div class="row category">
          <h3>대학교</h3>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 col-xl-6">
            <p class="caption"> 학교명</p>
            <input name="university_name" value="">
        </div>
        <div class="col-12 col-md-6 col-xl-6">
            <p class="caption"> 입학일</p>
            <input type="date" name="university_start_date" value="" min="1990-01-01" max="2025-12-31">
        </div>
        <div class="col-12 col-md-6 col-xl-6">
            <p class="caption"> 졸업일</p>
            <input type="date" name="university_end_date" value="" min="1990-01-01" max="2025-12-31">
        </div>
        <div class="col-12 col-md-6 col-xl-6">
            <p class="caption"> 학과</p>
            <input name="university_major" value="">
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 col-xl-4">
            <p> 내 학점</p>
            <input name="university_my_grade" value="">
        </div>
        <div class="col-12 col-md-4 col-xl-4">
            <p> 최대 학점</p>
            <input name="university_total_grade" value="">
        </div>
        <div class="col-12 col-md-4 col-xl-4">
            <p> 졸업여부</p>
            <select class="select-category" name="university_graduate">
                <option value="">졸업 여부 선택</option>
                <option value="재학">재학</option>
                <option value="졸업">졸업</option>
                <option value="졸업예정">졸업예정</option>
                <option value="휴학">휴학</option>
                <option value="편입">편입</option>
              </select>
        </div>
        <div class="col-12">
          <div class="row card-left-to-right">
              <p> 추가설명</p>
              <p class="sm right">(최대 500자)</p>
          </div>
          <textarea name="university_description" rows="10" cols="50" maxlength="500" style="width: 100%;"></textarea>
        </div>
        <div class="col-12">
            <input type="text" maxlength="8" size="20" style="width:auto">
            <button class="add-btn" type="button" onclick="addKeywords(this)">키워드 추가</button>
            <div class="row"></div>
            <input name="university_keywords" type="hidden">
        </div>
      </div>
    </div>
    `;
    return;
  }

}

// add job exp card
function addJobExpCard() {
  var job_exp = document.querySelector('.job-experience');
  var idx = document.querySelectorAll('.job-exp').length;

  job_exp.innerHTML += `
  <div class="job-exp" id="item-${idx}">
    <div class="row item">
      <button class="del-btn right" onclick="removeJobExp(this); return false;">삭제</button>
      <div class="row category">
        <p class="caption"> 경험 선택</p>
        <select class="select-category" name="job_exp_category_${idx}">
            <option value="">직무 경험 선택</option>
            <option value="인턴">인턴</option>
            <option value="직장경험">직장경험</option>
        </select>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 col-xl-3">
            <p class="caption"> 회사명</p>
            <input name="job_exp_name_${idx}" value="">
        </div>
        <div class="col-12 col-md-6 col-xl-3">
            <p class="caption"> 업무시작</p>
            <input type="date" name="job_exp_start_date_${idx}" value="" min="1990-01-01" max="2025-12-31">
        </div>
        <div class="col-12 col-md-6 col-xl-3">
            <p class="caption"> 업무종료</p>
            <input type="date" name="job_exp_end_date_${idx}" value="" min="1990-01-01" max="2025-12-31">
        </div>
        <div class="col-12 col-md-6 col-xl-3">
            <p class="caption"> 직책</p>
            <input name="job_exp_position_${idx}" value="">
        </div>
        <div class="col-12">
            <p> 링크</p>
            <input name="job_exp_link_${idx}" placeholder="http://www.example.com" style="width: 100%;" value="">
        </div>
        <div class="col-12">
            <div class="row card-left-to-right">
                <p> 업무성과</p>
                <p class="sm right">(최대 500자)</p>
            </div>
            <textarea name="job_exp_description_${idx}" rows="10" cols="50" maxlength="500" style="width: 100%;"></textarea>
        </div>
        <div class="col-12">
            <input type="text" maxlength="8" size="20" style="width:auto">
            <button class="add-btn" type="button" onclick="addKeywords(this)">키워드 추가</button>
            <div class="row">
              <input name="job_exp_keywords_${idx}" type="hidden">
            </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// add global exp card
function addGlobalExpCard() {
  var global_exp = document.querySelector('.international');
  var idx = document.querySelectorAll('.global-exp').length;

  global_exp.innerHTML += `
  <div class="global-exp" id="item-${idx}">
    <div class="row item">
        <button class="del-btn right" onclick="removeGlobalExp(this); return false;">삭제</button>
        <div class="row category">
          <p class="caption"> 경험 선택</p>
          <select class="select-category" name="global_exp_category_${idx}">
              <option value="">해외 경험 선택</option>
              <option value="어학연수">어학연수</option>
              <option value="교환학생">교환학생</option>
              <option value="워킹홀리데이">워킹홀리데이</option>
              <option value="해외여행">해외여행</option>
              <option value="그외">그외</option>
          </select>
        </div>
        <div class="row">
            <div class="col-12 col-md-6 col-xl-6">
                <p class="caption"> 시작일</p>
                <input type="date" name="global_exp_start_date_${idx}" value="" min="1990-01-01" max="2025-12-31">
            </div>
            <div class="col-12 col-md-6 col-xl-6">
                <p class="caption"> 종료일</p>
                <input type="date" name="global_exp_end_date_${idx}" value="" min="1990-01-01" max="2025-12-31">
            </div>
            <div class="col-12">
                <p> 링크</p>
                <input name="global_exp_link_${idx}" placeholder="http://www.example.com" style="width: 100%;" value="">
            </div>
            <div class="col-12">
                <div class="row card-left-to-right">
                    <p> 수행내용</p>
                    <p class="sm right">(최대 250자)</p>
                </div>
                <textarea name="global_exp_description_${idx}" rows="10" cols="50" maxlength="250" style="width: 100%;"></textarea>
            </div>
            <div class="col-12">
                <input type="text" maxlength="8" size="20" style="width:auto">
                <button class="add-btn" type="button" onclick="addKeywords(this)">키워드 추가</button>
                <div class="row">
                  <input name="global_exp_keywords_${idx}" type="hidden">
                </div>
            </div>
        </div>
    </div>
</div>
  `;
}

// add other exp card
function addOtherExpCard() {
  var other_exp = document.querySelector('.other-experience');
  var idx = document.querySelectorAll('.other-exp').length;

  other_exp.innerHTML += `
  <div class="other-exp" id="item-${idx}">
    <div class="row item">
        <button class="del-btn right" onclick="removeOtherExp(this); return false;">삭제</button>
        <div class="row">
            <div class="col-12">
                <p class="caption"> 활동명</p>
                <input type="text" name="other_exp_name_${idx}" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6 col-xl-6">
                <p class="caption"> 시작일</p>
                <input type="date" name="other_exp_start_date_${idx}" value="" min="1990-01-01" max="2025-12-31">
            </div>
            <div class="col-12 col-md-6 col-xl-6">
                <p class="caption"> 종료일</p>
                <input type="date" name="other_exp_end_date_${idx}" value="" min="1990-01-01" max="2025-12-31">
            </div>
            <div class="col-12">
                <p> 링크</p>
                <input name="other_exp_link_${idx}" placeholder="http://www.example.com" style="width: 100%;" value="">
            </div>
            <div class="col-12">
                <div class="row card-left-to-right">
                    <p> 수행내용</p>
                    <p class="sm right">(최대 250자)</p>
                </div>
                <textarea name="other_exp_description_${idx}" rows="10" cols="50" maxlength="250" style="width: 100%;"></textarea>
              </div>
          </div>
          <div class="col-12">
              <input type="text" maxlength="8" size="20" style="width:auto">
              <button class="add-btn" type="button" onclick="addKeywords(this)">키워드 추가</button>
              <div class="row">
                <input name="other_exp_keywords_${idx}" type="hidden">
              </div>
          </div>
      </div>
  </div>
  `;
}

// add cert major card
function addCertMajor() {
  var cert_major = document.querySelector('.certificate-major');
  var idx = document.querySelectorAll('.cert-major').length;

  cert_major.innerHTML += `
  <div class="cert-major" id="item-${idx}">   
    <div class="row item">
        <button class="del-btn right" onclick="removeCertMajor(this); return false;">삭제</button>
        <div class="row">
            <div class="col-12">
                <p class="caption"> 자격증</p>
                <input type="text" name="cert_major_name_${idx}" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-12 col-xl-6">
                <p class="caption"> 자격번호</p>
                <input name="cert_major_cerial_${idx}" value="">
            </div>
            <div class="col-12 col-md-12 col-xl-6">
                <p class="caption"> 취득일</p>
                <input type="date" name="cert_major_get_date_${idx}" value="" min="1990-01-01" max="2025-12-31"></p>
            </div>
            <div class="col-12 col-md-12 col-xl-6">
                <p class="caption"> 기관</p>
                <input name="cert_major_agency_${idx}" value="">
            </div>
            <div class="col-12 col-md-12 col-xl-6">
                <p> 등급 / 점수</p>
                <input name="cert_major_grade_${idx}" value="">
            </div>
        </div>
      </div>
  </div>
  `;
}

// add cert lang card
function addCertLang() {
  var cert_lang = document.querySelector('.certificate-lang');
  var idx = document.querySelectorAll('.cert-lang').length;

  cert_lang.innerHTML += `
  <div class="cert-lang" id="item-${idx}">  
    <div class="row item">
        <button class="del-btn right" onclick="removeCertLang(this); return false;">삭제</button>
        <div class="row">
            <div class="col-12">
                <p class="caption"> 자격증</p>
                <input type="text" name="cert_lang_name_${idx}" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-12 col-xl-6">
                <p class="caption"> 자격번호</p>
                <input name="cert_lang_cerial_${idx}" value="">
            </div>
            <div class="col-12 col-md-12 col-xl-6">
                <p class="caption"> 취득일</p>
                <input type="date" name="cert_lang_get_date_${idx}" value="" min="1990-01-01" max="2025-12-31"></p>
            </div>
            <div class="col-12 col-md-12 col-xl-6">
                <p class="caption"> 기관</p>
                <input name="cert_lang_agency_${idx}" value="">
            </div>
            <div class="col-12 col-md-12 col-xl-6">
                <p> 등급 / 점수</p>
                <input name="cert_lang_grade_${idx}" value="">
            </div>
        </div>
    </div>
  </div>
  `;
}

// add cert others card
function addCertOther() {
  var cert_other = document.querySelector('.certificate-others');
  var idx = document.querySelectorAll('.cert-other').length;

  cert_other.innerHTML += `
  <div class="cert-other" id="item-${idx}">
    <div class="row item">
        <button class="del-btn right" onclick="removeCertOther(this); return false;">삭제</button>
        <div class="row">
            <div class="col-12">
                <p class="caption"> 자격증</p>
                <input type="text" name="cert_other_name_${idx}" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-12 col-xl-6">
                <p class="caption"> 자격번호</p>
                <input name="cert_other_cerial_${idx}" value="">
            </div>
            <div class="col-12 col-md-12 col-xl-6">
                <p class="caption"> 취득일</p>
                <input type="date" name="cert_other_get_date_${idx}" value="" min="1990-01-01" max="2025-12-31"></p>
            </div>
            <div class="col-12 col-md-12 col-xl-6">
                <p class="caption"> 기관</p>
                <input name="cert_other_agency_${idx}" value="">
            </div>
            <div class="col-12 col-md-12 col-xl-6">
                <p> 등급 / 점수</p>
                <input name="cert_other_grade_${idx}" value="">
            </div>
        </div>
      </div>
  </div>
  `;
}

// add cert others card
function addPrizeIn() {
  var prize_in = document.querySelector('.prize-in');
  var idx = document.querySelectorAll('.prize-in-item').length;

  prize_in.innerHTML += `
  <div class="prize-in-item" id="item-${idx}">
    <div class="row item">
        <button class="del-btn right" onclick="removePrizeIn(this); return false;">삭제</button>
        <div class="row">
            <div class="col-12">
                <p class="caption"> 대회명</p>
                <input type="text" name="prize_in_name_${idx}" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6 col-xl-6">
                <p class="caption"> 수상일</p>
                <input type="date" name="prize_in_get_date_${idx}" value="" min="1990-01-01" max="2025-12-31"></p>
            </div>
            <div class="col-12 col-md-6 col-xl-6">
                <p class="caption"> 기관</p>
                <input name="prize_in_agency_${idx}" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6 col-xl-6">
                <p> 순위/등수</p>
                <input name="prize_in_rank_${idx}" value="">
            </div>
            <div class="col-12 col-md-6 col-xl-6">
                <p> 참가자 수</p>
                <input name="prize_in_party_${idx}" value="">
            </div>
            <div class="col-12">
                <p> 링크</p>
                <input name="prize_in_link_${idx}" placeholder="http://www.example.com" style="width: 100%;" value=""></p>
            </div>
            <div class="col-12">
                <div class="row card-left-to-right">
                    <p> 수행내용</p>
                    <p class="sm right">(최대 250자)</p>
                </div>
                <textarea name="prize_in_description_${idx}" rows="5" cols="50" maxlength="250" style="width: 100%;"></textarea>
            </div>
        </div>
    </div>
  </div>
  `;
}

// add cert others card
function addPrizeOut() {
  var prize_out = document.querySelector('.prize-out');
  var idx = document.querySelectorAll('.prize-out-item').length;

  prize_out.innerHTML += `
  <div class="prize-out-item" id="item-${idx}">
    <div class="row item">
        <button class="del-btn right" onclick="removePrizeOut(this); return false;">삭제</button>
        <div class="row">
            <div class="col-12">
                <p class="caption"> 대회명</p>
                <input type="text" name="prize_out_name_${idx}" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6 col-xl-6">
                <p class="caption"> 수상일</p>
                <input type="date" name="prize_out_get_date_${idx}" value="" min="1990-01-01" max="2025-12-31"></p>
            </div>
            <div class="col-12 col-md-6 col-xl-6">
                <p class="caption"> 기관</p>
                <input name="prize_out_agency_${idx}" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6 col-xl-6">
                <p> 순위/등수</p>
                <input name="prize_out_rank_${idx}" value="">
            </div>
            <div class="col-12 col-md-6 col-xl-6">
                <p> 참가자 수</p>
                <input name="prize_out_party_${idx}" value="">
            </div>
            <div class="col-12">
                <p> 링크</p>
                <input name="prize_out_link_${idx}" placeholder="http://www.example.com" style="width: 100%;" value=""></p>
            </div>
            <div class="col-12">
                <div class="row card-left-to-right">
                    <p> 수행내용</p>
                    <p class="sm right">(최대 250자)</p>
                </div>
                <textarea name="prize_out_description_${idx}" rows="5" cols="50" maxlength="250" style="width: 100%;"></textarea>
            </div>
        </div>
    </div>
  </div>
  `;
}

// add port work card
function addPortWork() {
  var port_work = document.querySelector('.portfolio-work');
  var idx = document.querySelectorAll('.port-work').length;

  port_work.innerHTML += `
  <div class="port-work" id="item-${idx}">
    <div class="row item">
        <button class="del-btn right" onclick="removePortWork(this); return false;">삭제</button>
        <div class="row">
            <div class="col-12">
                <p class="caption"> 프로젝트 / 작품명</p>
                <input type="text" name="port_work_name_${idx}" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6 col-xl-6">
                <p class="caption"> 시작일</p>
                <input type="date" name="port_work_start_date_${idx}" value="" min="1990-01-01" max="2025-12-31">
            </div>
            <div class="col-12 col-md-6 col-xl-6">
                <p class="caption"> 종료일</p>
                <input type="date" name="port_work_end_date_${idx}" value="" min="1990-01-01" max="2025-12-31">
            </div>
            <div class="col-12 col-md-6 col-xl-6">
                <p> 역할</p>
                <input name="port_work_role_${idx}" value="">
            </div>
            <div class="col-12 col-md-6 col-xl-6">
                <p> 팀원</p>
                <input name="port_work_party_${idx}" value="">
            </div>
            <div class="col-12">
                <p> 링크</p>
                <input name="port_work_link_${idx}" placeholder="http://www.example.com" value="">
            </div>
            <div class="col-12">
                <div class="row card-left-to-right">
                    <p> 수행내용</p>
                    <p class="sm right">(최대 500자)</p>
                </div>
                <textarea name="port_work_description_${idx}" rows="6" cols="50" maxlength="500" style="width: 100%;"></textarea>
            </div>
        </div>
    </div>
  </div>
  `;
}

// add port rights card
function addPortRights() {
  var port_rights = document.querySelector('.portfolio-rights');
  var idx = document.querySelectorAll('.port-rights').length;

  port_rights.innerHTML += `
  <div class="port-rights" id="item-${idx}">
    <div class="row item">
        <button class="del-btn right" onclick="removePortRights(this); return false;">삭제</button>
        <div class="row">
            <div class="col-12">
                <p class="caption"> 논문 / 출판 / 특허명</p>
                <input type="text" name="port_rights_name_${idx}" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6 col-xl-6">
                <p class="caption"> 저자</p>
                <input name="port_rights_author_${idx}" value="">
            </div>
            <div class="col-12 col-md-6 col-xl-6">
                <p> 출원번호</p>
                <input name="port_rights_number_${idx}" value="">
            </div>
            <div class="col-12 col-md-6 col-xl-6">
                <p> 출원국가</p>
                <input name="port_rights_country_${idx}" value="">
            </div>
            <div class="col-12 col-md-6 col-xl-6">
                <p> 출원날짜</p>
                <input type="date" name="port_rights_release_date_${idx}" value="" min="1990-01-01" max="2025-12-31">
            </div>
            <div class="col-12">
                <p> 링크</p>
                <input name="port_rights_link_${idx}" placeholder="http://www.example.com" value="">
            </div>
            <div class="col-12">
                <div class="row card-left-to-right">
                    <p> 상세내용</p>
                    <p class="sm right">(최대 300자)</p>
                </div>
                <textarea name="port_rights_description_${idx}" rows="6" cols="50" maxlength="300" style="width: 100%;"></textarea>
            </div>
        </div>
    </div>
  </div>
  `;
}

// remove high school card
function removeHighSchoolCard() {
  var school = document.querySelector('.information .university');
  if(school.innerHTML.trim() != "") {
    alert("대학교 학력을 먼저 삭제하세요");
    return false;
  }

  var del = confirm('정말 삭제 하시겠습니까?');
  if(del == true) {
    school = document.querySelector('.information .high-school');
    school.innerHTML = "";
  } else {
    return false;
  }
}

// remove university card
function removeUniversityCard() {
  var del = confirm('정말 삭제 하시겠습니까?');
  if(del == true) {
    var school = document.querySelector('.information .university');
    school.innerHTML = "";
  } else {
    return false;
  }
}

// remove job exp card
function removeJobExp(element) {
  var del = confirm('정말 삭제 하시겠습니까?');
    if(del == true) {
    var job_exp_id = element.parentNode.parentNode.id;
    
    var job_exp_item = document.querySelector('.job-experience #'+job_exp_id);
    job_exp_item.remove();
    
    var job_exp = document.querySelectorAll('.job-exp');

    for(var i=0; i<job_exp.length; i++) {
      job_exp[i].id = "item-"+i;
    }

    for(var i=0; i<job_exp.length; i++) {
      var select_tag = job_exp[i].querySelector('select');
      select_tag.name = "job_exp_category_"+i;
    }

    for(var i=0; i<job_exp.length; i++) {
      var inputs = job_exp[i].querySelectorAll('input');
      inputs[0].name = "job_exp_name_"+i;
      inputs[1].name = "job_exp_start_date_"+i;
      inputs[2].name = "job_exp_end_date_"+i;
      inputs[3].name = "job_exp_position_"+i;
      inputs[4].name = "job_exp_end_link_"+i;
      inputs[6].name = "job_exp_keywords_"+i;
    }
    
    for(var i=0; i<job_exp.length; i++) {
      var textarea = job_exp[i].querySelector('textarea');
      textarea.name = "job_exp_description_"+i;
    }
  } else {
    return false;
  }
}

// remove global exp card
function removeGlobalExp(element) {
  var del = confirm('정말 삭제 하시겠습니까?');
  if(del == true) {
    var global_exp_id = element.parentNode.parentNode.id;
    
    var global_exp_item = document.querySelector('.international #'+global_exp_id);
    global_exp_item.remove();
    
    var global_exp = document.querySelectorAll('.global-exp');

    for(var i=0; i<global_exp.length; i++) {
      global_exp[i].id = "item-"+i;
    }

    for(var i=0; i<global_exp.length; i++) {
      var select_tag = global_exp[i].querySelector('select');
      select_tag.name = "global_exp_category_"+i;
    }

    for(var i=0; i<global_exp.length; i++) {
      var inputs = global_exp[i].querySelectorAll('input');
      inputs[0].name = "global_exp_start_date_"+i;
      inputs[1].name = "global_exp_end_date_"+i;
      inputs[2].name = "global_exp_link_"+i;
      inputs[4].name = "global_exp_keywords_"+i;
    }
    
    for(var i=0; i<global_exp.length; i++) {
      var textarea = global_exp[i].querySelector('textarea');
      textarea.name = "global_exp_description_"+i;
    }
  } else {
    return false;
  }
}

// remove other exp card
function removeOtherExp(element) {
  var del = confirm('정말 삭제 하시겠습니까?');
  if(del == true) {
    var other_exp_id = element.parentNode.parentNode.id;
    
    var other_exp_item = document.querySelector('.other-experience #'+other_exp_id);
    other_exp_item.remove();
    
    var other_exp = document.querySelectorAll('.other-exp');

    for(var i=0; i<other_exp.length; i++) {
      other_exp[i].id = "item-"+i;
    }

    for(var i=0; i<other_exp.length; i++) {
      var inputs = other_exp[i].querySelectorAll('input');
      inputs[0].name = "other_exp_name_"+i;
      inputs[1].name = "other_exp_start_date_"+i;
      inputs[2].name = "other_exp_end_date_"+i;
      inputs[3].name = "other_exp_link_"+i;
      inputs[5].name = "other_exp_keywords_"+i;
    }

    for(var i=0; i<other_exp.length; i++) {
      var textarea = other_exp[i].querySelector('textarea');
      textarea.name = "other_exp_description_"+i;
    }
  } else {
    return false;
  }
}

// remove cert major card
function removeCertMajor(element) {
  var del = confirm('정말 삭제 하시겠습니까?');
  if(del == true) {
    var cert_major_id = element.parentNode.parentNode.id;
    
    var cert_major_item = document.querySelector('.certificate-major #'+cert_major_id);
    cert_major_item.remove();
    
    var cert_major = document.querySelectorAll('.cert-major');

    for(var i=0; i<cert_major.length; i++) {
      cert_major[i].id = "item-"+i;
    }

    for(var i=0; i<cert_major.length; i++) {
      var inputs = cert_major[i].querySelectorAll('input');
      inputs[0].name = "cert_major_name_"+i;
      inputs[1].name = "cert_major_cerial_"+i;
      inputs[2].name = "cert_major_get_date_"+i;
      inputs[3].name = "cert_major_agency_"+i;
      inputs[4].name = "cert_major_grade_"+i;
    }
  } else {
    return false;
  }
}

// remove cert lang card
function removeCertLang(element) {
  var del = confirm('정말 삭제 하시겠습니까?');
  if(del == true) {
    var cert_lang_id = element.parentNode.parentNode.id;
    
    var cert_lang_item = document.querySelector('.certificate-lang #'+cert_lang_id);
    cert_lang_item.remove();
    
    var cert_lang = document.querySelectorAll('.cert-lang');

    for(var i=0; i<cert_lang.length; i++) {
      cert_lang[i].id = "item-"+i;
    }

    for(var i=0; i<cert_lang.length; i++) {
      var inputs = cert_lang[i].querySelectorAll('input');
      inputs[0].name = "cert_lang_name_"+i;
      inputs[1].name = "cert_lang_cerial_"+i;
      inputs[2].name = "cert_lang_get_date_"+i;
      inputs[3].name = "cert_lang_agency_"+i;
      inputs[4].name = "cert_lang_grade_"+i;
    }
  } else {
    return false;
  }
}

// remove cert other card
function removeCertOther(element) {
  var del = confirm('정말 삭제 하시겠습니까?');
  if(del == true) {
    var cert_other_id = element.parentNode.parentNode.id;
    
    var cert_other_item = document.querySelector('.certificate-others #'+cert_other_id);
    cert_other_item.remove();
    
    var cert_other = document.querySelectorAll('.cert-other');

    for(var i=0; i<cert_other.length; i++) {
      cert_other[i].id = "item-"+i;
    }

    for(var i=0; i<cert_other.length; i++) {
      var inputs = cert_other[i].querySelectorAll('input');
      inputs[0].name = "cert_other_name_"+i;
      inputs[1].name = "cert_other_cerial_"+i;
      inputs[2].name = "cert_other_get_date_"+i;
      inputs[3].name = "cert_other_agency_"+i;
      inputs[4].name = "cert_other_grade_"+i;
    }
  } else {
    return false;
  }
}

// remove prize in card
function removePrizeIn(element) {
  var del = confirm('정말 삭제 하시겠습니까?');
  if(del == true) {
    var prize_in_id = element.parentNode.parentNode.id;
    
    var prize_in_item = document.querySelector('.prize-in #'+prize_in_id);
    prize_in_item.remove();
    
    var prize_in = document.querySelectorAll('.prize-in-item');

    for(var i=0; i<prize_in.length; i++) {
      prize_in[i].id = "item-"+i;
    }

    for(var i=0; i<prize_in.length; i++) {
      var inputs = prize_in[i].querySelectorAll('input');
      inputs[0].name = "prize_in_name_"+i;
      inputs[1].name = "prize_in_get_date_"+i;
      inputs[2].name = "prize_in_agency_"+i;
      inputs[3].name = "prize_in_rank_"+i;
      inputs[4].name = "prize_in_party_"+i;
      inputs[5].name = "prize_in_link_"+i;
    }

    for(var i=0; i<prize_in.length; i++) {
      var textarea = prize_in[i].querySelector('textarea');
      textarea.name = "prize_in_description_"+i;
    }
  } else {
    return false;
  }
}

// remove prize out card
function removePrizeOut(element) {
  var del = confirm('정말 삭제 하시겠습니까?');
  if(del == true) {
    var prize_out_id = element.parentNode.parentNode.id;
    
    var prize_out_item = document.querySelector('.prize-out #'+prize_out_id);
    prize_out_item.remove();
    
    var prize_out = document.querySelectorAll('.prize-out-item');

    for(var i=0; i<prize_out.length; i++) {
      prize_out[i].id = "item-"+i;
    }

    for(var i=0; i<prize_out.length; i++) {
      var inputs = prize_out[i].querySelectorAll('input');
      inputs[0].name = "prize_out_name_"+i;
      inputs[1].name = "prize_out_get_date_"+i;
      inputs[2].name = "prize_out_agency_"+i;
      inputs[3].name = "prize_out_rank_"+i;
      inputs[4].name = "prize_out_party_"+i;
      inputs[5].name = "prize_out_link_"+i;
    }

    for(var i=0; i<prize_out.length; i++) {
      var textarea = prize_out[i].querySelector('textarea');
      textarea.name = "prize_out_description_"+i;
    }
  } else {
    return false;
  }
}

// remove port work card
function removePortWork(element) {
  var del = confirm('정말 삭제 하시겠습니까?');
  if(del == true) {
    var port_work_id = element.parentNode.parentNode.id;
    
    var port_work_item = document.querySelector('.portfolio-work #'+port_work_id);
    port_work_item.remove();
    
    var port_work = document.querySelectorAll('.port-work');

    for(var i=0; i<port_work.length; i++) {
      port_work[i].id = "item-"+i;
    }

    for(var i=0; i<port_work.length; i++) {
      var inputs = port_work[i].querySelectorAll('input');
      inputs[0].name = "port_work_name_"+i;
      inputs[1].name = "port_work_start_date_"+i;
      inputs[2].name = "port_work_end_date_"+i;
      inputs[3].name = "port_work_role_"+i;
      inputs[4].name = "port_work_party_"+i;
      inputs[5].name = "port_work_link_"+i;
      inputs[6].name = "port_work_images_"+i;
    }

    for(var i=0; i<port_work.length; i++) {
      var textarea = port_work[i].querySelector('textarea');
      textarea.name = "port_work_description_"+i;
    }
  } else {
    return false;
  }
}

// remove port rights card
function removePortRights(element) {
  var del = confirm('정말 삭제 하시겠습니까?');
  if(del == true) {
    var port_rights_id = element.parentNode.parentNode.id;
    
    var port_rights_item = document.querySelector('.portfolio-rights #'+port_rights_id);
    port_rights_item.remove();
    
    var port_rights = document.querySelectorAll('.port-rights');

    for(var i=0; i<port_rights.length; i++) {
      port_rights[i].id = "item-"+i;
    }

    for(var i=0; i<port_rights.length; i++) {
      var inputs = port_rights[i].querySelectorAll('input');
      inputs[0].name = "port_rights_name_"+i;
      inputs[1].name = "port_rights_author_"+i;
      inputs[2].name = "port_rights_number_"+i;
      inputs[3].name = "port_rights_country_"+i;
      inputs[4].name = "port_rights_release_date_"+i;
    }

    for(var i=0; i<port_rights.length; i++) {
      var textarea = port_rights[i].querySelector('textarea');
      textarea.name = "port_rights_description_"+i;
    }
  } else {
    return false;
  }
}

// check input validation
function validateForm() {
  var form_tag = "edit-profile";

  var user_info_title = document.forms[form_tag]["user_info_title"].value;
  if(user_info_title == "" || user_info_title == null) {
    alert("제목을 입력해 주세요");
    return false;
  }

  var user_info_introduction = document.forms[form_tag]["user_info_introduction"].value;
  if(user_info_introduction == "" || user_info_introduction == null) {
    alert("간단 소개를 입력해 주세요");
    return false;
  }

  var user_info_phone = document.forms[form_tag]["user_info_phone"].value;
  if(user_info_phone == "" || user_info_phone == null) {
    alert("연락처를 입력해 주세요");
    return false;
  }
  
  var user_info_email = document.forms[form_tag]["user_info_email"].value;
  if(user_info_email == "" || user_info_email == null) {
    alert("이메일을 입력해 주세요");
    return false;
  }

  var high_school_name = document.forms[form_tag]["high_school_name"];
  if(high_school_name != undefined) {
    high_school_name = high_school_name.value;
    if(high_school_name == "" || high_school_name == null) {
      alert("고등학교 명을 입력해 주세요");
      return false;
    }
  }

  var high_school_start_date = document.forms[form_tag]["high_school_start_date"];
  if(high_school_start_date != undefined) {
    high_school_start_date = high_school_start_date.value;
    if(high_school_start_date == "" || high_school_start_date == null) {
      alert("고등학교 입학일을 입력해 주세요");
      return false;
    }
  }

  var high_school_end_date = document.forms[form_tag]["high_school_end_date"];
  if(high_school_end_date != undefined) {
    high_school_end_date = high_school_end_date.value;
    if(high_school_end_date == "" || high_school_end_date == null) {
      alert("고등학교 졸업일을 입력해 주세요");
      return false;
    }
  }

  var high_school_graduate = document.forms[form_tag]["high_school_graduate"];
  if(high_school_graduate != undefined) {
    high_school_graduate = high_school_graduate.value;
    if(high_school_graduate == "" || high_school_graduate == null) {
      alert("고등학교 졸업여부를 입력해 주세요");
      return false;
    }
  }

  var university_name = document.forms[form_tag]["university_name"];
  if(university_name != undefined) {
    university_name = university_name.value;
    if(university_name == "" || university_name == null) {
      alert("대학교 명을 입력해 주세요");
      return false;
    }
  }

  var university_start_date = document.forms[form_tag]["university_start_date"];
  if(university_start_date != undefined) {
    university_start_date = university_start_date.value;
    if(university_start_date == "" || university_start_date == null) {
      alert("대학교 입학일을 입력해 주세요");
      return false;
    }
  }

  var university_end_date = document.forms[form_tag]["university_end_date"];
  if(university_end_date != undefined) {
    university_end_date = university_end_date.value;
    if(university_end_date == "" || university_end_date == null) {
      alert("대학교 졸업일을 입력해 주세요");
      return false;
    }
  }

  var university_major = document.forms[form_tag]["university_major"];
  if(university_major != undefined) {
    university_major = university_major.value;
    if(university_major == "" || university_major == null) {
      alert("대학교 학과를 입력해 주세요");
      return false;
    }
  }

  var job_len = document.querySelectorAll('.job-exp').length;
  for(var i=0; i<job_len; i++) {
    var job_exp_category = document.forms[form_tag]["job_exp_category_" + i];
    if(job_exp_category != undefined) {
      job_exp_category = job_exp_category.value;
      if(job_exp_category == "" || job_exp_category == null) {
        alert("직무 경험을 선택해 주세요");
        return false;
      }
    }

    var job_exp_name = document.forms[form_tag]["job_exp_name_" + i];
    if(job_exp_name != undefined) {
      job_exp_name = job_exp_name.value;
      if(job_exp_name == "" || job_exp_name == null) {
        alert("회사명을 입력해 주세요");
        return false;
      }
    }

    var job_exp_start_date = document.forms[form_tag]["job_exp_start_date_" + i];
    if(job_exp_start_date != undefined) {
      job_exp_start_date = job_exp_start_date.value;
      if(job_exp_start_date == "" || job_exp_start_date == null) {
        alert("업무시작일을 입력해 주세요");
        return false;
      }
    }

    var job_exp_end_date = document.forms[form_tag]["job_exp_end_date_" + i];
    if(job_exp_end_date != undefined) {
      job_exp_end_date = job_exp_end_date.value;
      if(job_exp_end_date == "" || job_exp_end_date == null) {
        alert("업무종료일을 입력해 주세요");
        return false;
      }
    }

    var job_exp_position = document.forms[form_tag]["job_exp_position_" + i];
    if(job_exp_position != undefined) {
      job_exp_position = job_exp_position.value;
      if(job_exp_position == "" || job_exp_position == null) {
        alert("직책을 입력해 주세요");
        return false;
      }
    }
  }

  var global_len = document.querySelectorAll('.global-exp').length;
  for(var i=0; i<global_len; i++) {
    var global_exp_category = document.forms[form_tag]["global_exp_category_" + i];
    if(global_exp_category != undefined) {
      global_exp_category = global_exp_category.value;
      if(global_exp_category == "" || global_exp_category == null) {
        alert("해외 경험을 선택해 주세요");
        return false;
      }
    }

    var global_exp_start_date = document.forms[form_tag]["global_exp_start_date_" + i];
    if(global_exp_start_date != undefined) {
      global_exp_start_date = global_exp_start_date.value;
      if(global_exp_start_date == "" || global_exp_start_date == null) {
        alert("해외 경험 시작일을 입력해 주세요");
        return false;
      }
    }

    var global_exp_end_date = document.forms[form_tag]["global_exp_end_date_" + i];
    if(global_exp_end_date != undefined) {
      global_exp_end_date = global_exp_end_date.value;
      if(global_exp_end_date == "" || global_exp_end_date == null) {
        alert("해외 경험 종료일을 입력해 주세요");
        return false;
      }
    }
  }

  var other_len = document.querySelectorAll('.other-exp').length;
  for(var i=0; i<other_len; i++) {
    var other_exp_name = document.forms[form_tag]["other_exp_name_" + i];
    if(other_exp_name != undefined) {
      other_exp_name = other_exp_name.value;
      if(other_exp_name == "" || other_exp_name == null) {
        alert("활동명을 선택해 주세요");
        return false;
      }
    }

    var other_exp_start_date = document.forms[form_tag]["other_exp_start_date_" + i];
    if(other_exp_start_date != undefined) {
      other_exp_start_date = other_exp_start_date.value;
      if(other_exp_start_date == "" || other_exp_start_date == null) {
        alert("기타 경험 시작일을 입력해 주세요");
        return false;
      }
    }

    var other_exp_end_date = document.forms[form_tag]["other_exp_end_date_" + i];
    if(other_exp_end_date != undefined) {
      other_exp_end_date = other_exp_end_date.value;
      if(other_exp_end_date == "" || other_exp_end_date == null) {
        alert("기타 경험 종료일을 입력해 주세요");
        return false;
      }
    }
  }

  var cert_major_len = document.querySelectorAll('.cert-major').length;
  for(var i=0; i<cert_major_len; i++) {
    var cert_major_name = document.forms[form_tag]["cert_major_name_" + i];
    if(cert_major_name != undefined) {
      cert_major_name = cert_major_name.value;
      if(cert_major_name == "" || cert_major_name == null) {
        alert("전공 자격증 명을 선택해 주세요");
        return false;
      }
    }

    var cert_major_cerial = document.forms[form_tag]["cert_major_cerial_" + i];
    if(cert_major_cerial != undefined) {
      cert_major_cerial = cert_major_cerial.value;
      if(cert_major_cerial == "" || cert_major_cerial == null) {
        alert("전공 자격번호를 입력해 주세요");
        return false;
      }
    }

    var cert_major_get_date = document.forms[form_tag]["cert_major_get_date_" + i];
    if(cert_major_get_date != undefined) {
      cert_major_get_date = cert_major_get_date.value;
      if(cert_major_get_date == "" || cert_major_get_date == null) {
        alert("전공 자격증 취득일을 입력해 주세요");
        return false;
      }
    }

    var cert_major_agency = document.forms[form_tag]["cert_major_agency_" + i];
    if(cert_major_agency != undefined) {
      cert_major_agency = cert_major_agency.value;
      if(cert_major_agency == "" || cert_major_agency == null) {
        alert("전공 자격증 취득기관을 입력해 주세요");
        return false;
      }
    }
  }

  var cert_lang_len = document.querySelectorAll('.cert-lang').length;
  for(var i=0; i<cert_lang_len; i++) {
    var cert_lang_name = document.forms[form_tag]["cert_lang_name_" + i];
    if(cert_lang_name != undefined) {
      cert_lang_name = cert_lang_name.value;
      if(cert_lang_name == "" || cert_lang_name == null) {
        alert("어학 자격증 명을 선택해 주세요");
        return false;
      }
    }

    var cert_lang_cerial = document.forms[form_tag]["cert_lang_cerial_" + i];
    if(cert_lang_cerial != undefined) {
      cert_lang_cerial = cert_lang_cerial.value;
      if(cert_lang_cerial == "" || cert_lang_cerial == null) {
        alert("어학 자격번호를 입력해 주세요");
        return false;
      }
    }

    var cert_lang_get_date = document.forms[form_tag]["cert_lang_get_date_" + i];
    if(cert_lang_get_date != undefined) {
      cert_lang_get_date = cert_lang_get_date.value;
      if(cert_lang_get_date == "" || cert_lang_get_date == null) {
        alert("어학 자격증 취득일을 입력해 주세요");
        return false;
      }
    }

    var cert_lang_agency = document.forms[form_tag]["cert_lang_agency_" + i];
    if(cert_lang_agency != undefined) {
      cert_lang_agency = cert_lang_agency.value;
      if(cert_lang_agency == "" || cert_lang_agency == null) {
        alert("어학 자격증 취득기관을 입력해 주세요");
        return false;
      }
    }
  }

  var cert_other_len = document.querySelectorAll('.cert-other').length;
  for(var i=0; i<cert_other_len; i++) {
    var cert_other_name = document.forms[form_tag]["cert_other_name_" + i];
    if(cert_other_name != undefined) {
      cert_other_name = cert_other_name.value;
      if(cert_other_name == "" || cert_other_name == null) {
        alert("그외 자격증 명을 선택해 주세요");
        return false;
      }
    }

    var cert_other_cerial = document.forms[form_tag]["cert_other_cerial_" + i];
    if(cert_other_cerial != undefined) {
      cert_other_cerial = cert_other_cerial.value;
      if(cert_other_cerial == "" || cert_other_cerial == null) {
        alert("그외 자격번호를 입력해 주세요");
        return false;
      }
    }

    var cert_other_get_date = document.forms[form_tag]["cert_other_get_date_" + i];
    if(cert_other_get_date != undefined) {
      cert_other_get_date = cert_other_get_date.value;
      if(cert_other_get_date == "" || cert_other_get_date == null) {
        alert("그외 자격증 취득일을 입력해 주세요");
        return false;
      }
    }

    var cert_other_agency = document.forms[form_tag]["cert_other_agency_" + i];
    if(cert_other_agency != undefined) {
      cert_other_agency = cert_other_agency.value;
      if(cert_other_agency == "" || cert_other_agency == null) {
        alert("그외 자격증 취득기관을 입력해 주세요");
        return false;
      }
    }
  }

  var prize_in_len = document.querySelectorAll('.prize-in').length;
  for(var i=0; i<prize_in_len; i++) {
    var prize_in_name = document.forms[form_tag]["prize_in_name_" + i];
    if(prize_in_name != undefined) {
      prize_in_name = prize_in_name.value;
      if(prize_in_name == "" || prize_in_name == null) {
        alert("교내 대회명을 선택해 주세요");
        return false;
      }
    }

    var prize_in_get_date = document.forms[form_tag]["prize_in_get_date_" + i];
    if(prize_in_get_date != undefined) {
      prize_in_get_date = prize_in_get_date.value;
      if(prize_in_get_date == "" || prize_in_get_date == null) {
        alert("교내 대회 수상일을 입력해 주세요");
        return false;
      }
    }

    var prize_in_agency = document.forms[form_tag]["prize_in_agency_" + i];
    if(prize_in_agency != undefined) {
      prize_in_agency = prize_in_agency.value;
      if(prize_in_agency == "" || prize_in_agency == null) {
        alert("교내 대회 기관명을 입력해 주세요");
        return false;
      }
    }
  }

  var prize_out_len = document.querySelectorAll('.prize-out').length;
  for(var i=0; i<prize_out_len; i++) {
    var prize_out_name = document.forms[form_tag]["prize_out_name_" + i];
    if(prize_out_name != undefined) {
      prize_out_name = prize_out_name.value;
      if(prize_out_name == "" || prize_out_name == null) {
        alert("교외 대회명을 선택해 주세요");
        return false;
      }
    }

    var prize_out_get_date = document.forms[form_tag]["prize_out_get_date_" + i];
    if(prize_out_get_date != undefined) {
      prize_out_get_date = prize_out_get_date.value;
      if(prize_out_get_date == "" || prize_out_get_date == null) {
        alert("교외 대회 수상일을 입력해 주세요");
        return false;
      }
    }

    var prize_out_agency = document.forms[form_tag]["prize_out_agency_" + i];
    if(prize_out_agency != undefined) {
      prize_out_agency = prize_out_agency.value;
      if(prize_out_agency == "" || prize_out_agency == null) {
        alert("교외 대회 기관명을 입력해 주세요");
        return false;
      }
    }
  }

  var port_work_len = document.querySelectorAll('.port-work').length;
  for(var i=0; i<port_work_len; i++) {
    var port_work_name = document.forms[form_tag]["port_work_name_" + i];
    if(port_work_name != undefined) {
      port_work_name = port_work_name.value;
      if(port_work_name == "" || port_work_name == null) {
        alert("프로젝트 / 작품 명을 선택해 주세요");
        return false;
      }
    }

    var port_work_start_date = document.forms[form_tag]["port_work_start_date_" + i];
    if(port_work_start_date != undefined) {
      port_work_start_date = port_work_start_date.value;
      if(port_work_start_date == "" || port_work_start_date == null) {
        alert("프로젝트 / 작품 시작일을 입력해 주세요");
        return false;
      }
    }

    var port_work_end_date_ = document.forms[form_tag]["port_work_end_date_" + i];
    if(port_work_end_date_ != undefined) {
      port_work_end_date_ = port_work_end_date_.value;
      if(port_work_end_date_ == "" || port_work_end_date_ == null) {
        alert("프로젝트 / 작품 종료일을 입력해 주세요");
        return false;
      }
    }
  }

  var port_rights_len = document.querySelectorAll('.port-rights').length;
  for(var i=0; i<port_rights_len; i++) {
    var port_rights_name = document.forms[form_tag]["port_rights_name_" + i];
    if(port_rights_name != undefined) {
      port_rights_name = port_rights_name.value;
      if(port_rights_name == "" || port_rights_name == null) {
        alert("논문 / 출판 / 특허 명을 선택해 주세요");
        return false;
      }
    }

    var port_rights_author = document.forms[form_tag]["port_rights_author_" + i];
    if(port_rights_author != undefined) {
      port_rights_author = port_rights_author.value;
      if(port_rights_author == "" || port_rights_author == null) {
        alert("논문 / 출판 / 특허 저자를 입력해 주세요");
        return false;
      }
    }
  }
}