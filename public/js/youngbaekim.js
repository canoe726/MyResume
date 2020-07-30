var quote_move = false;
var paragraph_move = false;
var slideUpImg1_move = false;
var slideDownText1_move = false;
var slideUpImg2_move = false;
var slideDownText2_move = false;
var slideUpImg3_move = false;
var slideDownText3_move = false;

$(function() {
    $('.menu-overlay, a').linkUnderlineAnim({
        'speed':'300',
        'color':'#48689a',
        'thickness':'3',
        'distance':'0'
    });

    $('#title-move').fadeIn(4000);
    
    $('.menu-icon').css('position','fixed');
    
    $('a[href*=#]').click(function(event){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 1000);
        event.preventDefault();
    });

    showMobileContent();

    bounceScroll();

    scrollMove();
});

function showMobileContent() {
    $(window).scroll(function() {
        var width = $(this).width();
        if(width > 600) {       // desktop
            $('.paragraph-sm').css('display', 'none');
            $('.paragraph').css('display', 'block');

        } else {                // mobile
            $('.paragraph-sm').css('display', 'block');
            $('.paragraph').css('display', 'none');

        }
    });
}

function checkForm() {
    var email = $('input[name="email"]').val();
    if(email == '') {
        $('footer .email p').css('display', 'block');
    } else {
        $('footer .email p').css('display', 'none');
    }

    var subject = $('input[name="subject"]').val();
    if(subject == '') {
        $('footer .subject p').css('display', 'block');
    } else {
        $('footer .subject p').css('display', 'none');
    }

    if(email == '' || subject == '') {
        alert('필수 항목을 입력해 주세요');
        return false;
    } else {
        var message = $('footer textarea').val();
        window.open(`mailto:${email}?subject=${subject}&body=${message}`);
    }
}

function scrollMove() {
    $(window).scroll(function() {
        var width = $(this).width();

        if(width > 600) {
            if($(this).scrollTop() > 200 && $(this).scrollTop() < 300) {
                if(!quote_move) {
                    $('.quote').hide().show("slide", { direction: "left" }, 2000);
                    if($('.quote').parent().is('.ui-effects-wrapper')) {
                        $('.quote').unwrap();
                    }
                    quote_move = true;
                }
            }
        } else {
            if($(this).scrollTop() > 250 && $(this).scrollTop() < 350) {
                if(!quote_move) {
                    $('.quote').hide().show("slide", { direction: "left" }, 2000);
                    if($('.quote').parent().is('.ui-effects-wrapper')) {
                        $('.quote').unwrap();
                    }
                    quote_move = true;
                }
            }
        }
        
        if(width > 600) {
            if($(this).scrollTop() > 400 && $(this).scrollTop() < 500) {
                if(!paragraph_move) {
                    $('.paragraph').hide().show("slide", { direction: "right" }, 2000);
                    if($('.paragraph').parent().is('.ui-effects-wrapper')) {
                        $('.paragraph').unwrap();
                    }
                    paragraph_move = true;
                }
            }
        } else {
            if($(this).scrollTop() > 800 && $(this).scrollTop() < 900) {
                if(!paragraph_move) {
                    $('.paragraph-sm').hide().show("slide", { direction: "right" }, 2000);
                    if($('.paragraph-sm').parent().is('.ui-effects-wrapper')) {
                        $('.paragraph-sm').unwrap();
                    }
                    paragraph_move = true;
                }
            }
        }

        if(width > 600) {
            if($(this).scrollTop() > 800 && $(this).scrollTop() < 900) {
                if(!slideUpImg1_move) {
                    $('#slideDownText1').hide().show("slide", { direction: "up" }, 3000);
                    $('#slideUpImg1').hide().show("slide", { direction: "down" }, 2000);
                    slideUpImg1_move = true;
                    slideDownText1_move = true;
                }
            }
        } else {
            if($(this).scrollTop() > 1250 && $(this).scrollTop() < 1350) {
                if(!slideUpImg1_move) {
                    $('#slideDownText1').hide().show("slide", { direction: "up" }, 3000);
                    $('#slideUpImg1').hide().show("slide", { direction: "down" }, 2000);
                    slideUpImg1_move = true;
                    slideDownText1_move = true;
                }
            }
        }

        if(width > 600) {
            if($(this).scrollTop() > 1450 && $(this).scrollTop() < 1550) {
                if(!slideUpImg2_move) {
                    $('.timeline-left #slideDownText2').hide().show("slide", { direction: "up" }, 3000);
                    $('.timeline-left #slideUpImg2').hide().show("slide", { direction: "down" }, 2000);

                    slideUpImg2_move = true;
                    slideDownText2_move = true;
                }
            }
        } else {
            if($(this).scrollTop() > 1850 && $(this).scrollTop() < 1950) {
                if(!slideUpImg2_move) {
                    $('.timeline-left-sm #slideDownText2').hide().show("slide", { direction: "up" }, 3000);
                    $('.timeline-left-sm #slideUpImg2').hide().show("slide", { direction: "down" }, 2000);
                    
                    slideUpImg2_move = true;
                    slideDownText2_move = true;
                }
            }
        }

        if(width > 600) {
            if($(this).scrollTop() > 1800 && $(this).scrollTop() < 1900) {
                if(!slideUpImg3_move) {
                    $('#slideDownText3').hide().show("slide", { direction: "up" }, 3000);
                    $('#slideUpImg3').hide().show("slide", { direction: "down" }, 2000);

                    slideUpImg3_move = true;
                    slideDownText3_move = true;
                }
            }
        } else {
            if($(this).scrollTop() > 2400 && $(this).scrollTop() < 2500) {
                if(!slideUpImg3_move) {
                    $('#slideDownText3').hide().show("slide", { direction: "up" }, 3000);
                    $('#slideUpImg3').hide().show("slide", { direction: "down" }, 2000);

                    slideUpImg3_move = true;
                    slideDownText3_move = true;
                }
            }
        }
    });
}

function changeMenuIcon() {
    var get_class = $('.top-left').children().attr('class');
    var overlay = $('.menu-overlay');
    if(get_class === 'font-icon fas fa-bars') {
        $('.top-left').children().attr('class', 'font-icon fas fa-times');
        overlay.slideDown();
        overlay.css('display', 'block');
    } else {
        $('.top-left').children().attr('class', 'font-icon fas fa-bars');
        overlay.slideUp();
    }
}

function displayNoneMenuOverlay() {
    $('.top-left').children().attr('class', 'font-icon fas fa-bars');
    var overlay = $('.menu-overlay');
    overlay.slideUp();
}

function bounceScroll() {
    setInterval(function() {
        $('#bounce-animation').effect('bounce', { distance:50, times:3 }, 'slow');
    }, 1000);
}

