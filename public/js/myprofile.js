String.prototype.replaceAll = function(org, dest) {
  return this.split(org).join(dest);
}

moment.lang('kr');

window.onscroll = function() {
  scrollUpFunc();
};

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

var show_exp_chart = document.querySelector('.experience-graph');
if(show_exp_chart.innerHTML !== '') {
  var value = document.querySelector('#exp-chart-value');
  var input_value = value.value;
  input_value = input_value.replaceAll('\'','\"');
  var chart_value = JSON.parse(input_value);
  
  var labels = [];
  var dates = [];
  var icons = [];

  if(chart_value.high_school !== undefined) {
    labels.push('고등학교');
    dates.push([new Date(chart_value.high_school[0]), new Date(chart_value.high_school[1])]);

  } 
  if(chart_value.university !== undefined) {
    labels.push('대학교');
    dates.push([new Date(chart_value.university[0]), new Date(chart_value.university[1])]);

  } 
  if(chart_value.job_exp !== undefined) {
    for(var i=0; i<chart_value.job_exp.length; i++) {
      labels.push('직무경험');
      dates.push([new Date(chart_value.job_exp[i][0]), new Date(chart_value.job_exp[i][1])]);
    }
  } 
  if(chart_value.global_exp !== undefined) {
    for(var i=0; i<chart_value.global_exp.length; i++) {
      labels.push('해외경험');
      dates.push([new Date(chart_value.global_exp[i][0]), new Date(chart_value.global_exp[i][1])]);
    }
  } 
  if(chart_value.other_exp !== undefined) {
    for(var i=0; i<chart_value.other_exp.length; i++) {
      labels.push('기타경험');
      dates.push([new Date(chart_value.other_exp[i][0]), new Date(chart_value.other_exp[i][1])]);
    }
  }

  for(var i=0; i<labels.length; i++) {
      if (labels[i] === '고등학교') { icons[i] = '\uf19c' }
      else if (labels[i] === '대학교') { icons[i] = '\uf19d' }
      else if (labels[i] === '직무경험') { icons[i] = '\uf0c0' }
      else if (labels[i] === '해외경험') { icons[i] = '\uf0ac' }
      else if (labels[i] === '기타경험') { icons[i] = '\uf234' }
  }

  var backgroundColors = [];

  for(var i=0; i<50; i++) {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      backgroundColors[i] = `rgba(${r}, ${g}, ${b}, 0.5)`;
  }

  var min_datetime = dates[0][0];
  for(var i=0; i<dates.length; i++) {
    if(min_datetime > dates[i][0]) { min_datetime = dates[i][0]; }
  }

  var max_datetime = dates[0][1];
  for(var i=0; i<dates.length; i++) {
    if(max_datetime < dates[i][1]) { max_datetime = dates[i][1]; }
  }
  max_datetime = moment(max_datetime).add(1, 'year');

  var ctx = document.getElementById('exp-chart').getContext("2d");
  var myChart = new Chart(ctx, {
      type: 'horizontalBar',
      legend: {
          display: false
      },
      data: {
          labels: labels,
          datasets: [{
              label: '경험 그래프',
              data: dates,
              icons: icons,
              backgroundColor: backgroundColors,
          }]
      },
      options: {
          legend: {
              display: false
          },
          scales: {
              xAxes: [{
                  gridLines: {
                      display: false
                  },
                  type: 'time',
                  time: {
                      unit: 'year',
                      displayFormats: {
                          day : 'YYYY-MM'
                      }
                  },
                  ticks: {
                      min: min_datetime,
                      max: max_datetime,
                  }
              }],
              yAxes: [{
                  ticks: {
                      reverse: true,
                      beginAtZero: true,
                  }
              }]
          },
          plugins: {
            datalabels: {
              align: 'end',
              anchor: 'end',
              color: "#cc55aa",
              font: {
                family: 'FontAwesome',
                size: 20
              },
              formatter: function(value, context) {
                return context.dataset.icons[context.dataIndex];
              }
            }
          }
      }
  });
}

var value = document.querySelector('#my-chart-value');
var input_value = value.value;
input_value = input_value.split(',');

var datas = {
    labels: ['직무경험', '해외경험', '자격증', '수상경험', '포트폴리오/작품', '논문/출판/특허'],
    datasets: [{
      label: "내 데이터",
      backgroundColor: "rgba(255,127,0,0.5)",
      borderWidth: 0.0,
      pointRadius: 0.0,
      data: input_value
    }, {
      label: "Student Example",
      backgroundColor: "rgba(139,0,255,0.5)",
      borderWidth: 0.0,
      pointRadius: 0.0,
      data: [1, 1, 1, 1, 1, 1]
    }]
};

var ctx = document.getElementById('my-chart').getContext("2d");
var myChart = new Chart(ctx, {
    type: 'radar',
    data: datas,
    options: {
        scale: {
            ticks: {
                beginAtZero: true,
                min: 0,
                stepSize: 1,
            },
        },
    }
});
