/* 
 * Plugin: ageCheck.js
 * Description: A simple plugin to verify user's age. Uses localStorage API to store if user is verified - only kept until browser is closed.
 * Options can be passed for easy customization. 
 * Author: Michael Soriano
 * Author's website: http://fearlessflyer.com*
 * 
 */
(function ($){   
    
    $.ageCheck = function(options) {
        
		var cur_lang = $('html')[0].lang;
		var title 			= 'Age Verification';
		var copy 			= 'This Website requires you to be [18] years or older to enter.<br/><br/>';
		
		var months_lang		= ['January','February','March','April','May','June','July','August','September','October','November','December'];
		
		var error_day 		= 'Day is invalid or empty';
		var error_year 		= 'Year is invalid or empty';
		var underAgeMsg 	= '<h3>Sorry, you are not old enough to view this site...</h3>';
		
		var successMsg 		= '<h3>Success!</h3><p>You are now being redirected back to the application...</p>';
		
		var ageBtnMsg 		= 'Yes, I am at least 18 years of age.';
		
		if(cur_lang == 'nl')
		{
			var title 			= 'Leeftijds verificatie';
			var copy 			= 'Deze website vereist dat u [18] jaar of ouder bent om deel te nemen.<br/><br/>';

			var months_lang 	= ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'];
			
			var error_day 		= 'Dag is ongeldig of leeg';
			var error_year 		= 'Het jaar is ongeldig of leeg';
			var underAgeMsg 	= '<h3>Sorry, je bent niet oud genoeg om deze site te bekijken...</h3>';
			
			var successMsg 		= '<h3>Succes!</h3><p>U wordt nu teruggeleid naar de toepassing...</p>';
			
			var ageBtnMsg 		= 'Ja, Ik ben 18 jaar of ouder.';
		}
		if(cur_lang == 'en')
		{
			var title 			= 'Age Verification';
			var copy 			= 'This Website requires you to be [18] years or older to enter.<br/><br/>';
			
			var months_lang		= ['January','February','March','April','May','June','July','August','September','October','November','December'];
			
			var error_day 		= 'Day is invalid or empty';
			var error_year 		= 'Year is invalid or empty';
			var underAgeMsg 	= '<h3>Sorry, you are not old enough to view this site...</h3>';
			
			var successMsg 		= '<h3>Success!</h3><p>You are now being redirected back to the application...</p>';
			
			var ageBtnMsg 		= 'Yes, I am at least 18 years of age.';
		}
		if(cur_lang == 'cn')
		{
			var title 			= '年龄验证';
			var copy 			= '本網站要求你年滿18周歲才能進入。<br/><br/>';
			
			var months_lang		= ["一月","二月","三月","四月","可以","六一","七一","八一","九月","十月","十一月","十二月"];
			
			var error_day 		= '日期无效或为空';
			var error_year 		= '年份无效或空白';
			var underAgeMsg 	= '<h3>对不起，您还没有足够的年龄来查看此网站...</h3>';
			
			var successMsg 		= '<h3>成功s</h3><p>您现在正被重定向回应用程序...</p>';
			
			var ageBtnMsg 		= '是的，我至少18歲。';
		}
		
        var settings = $.extend({
            minAge : 18,          
            redirectTo : '',
            redirectOnFail : '',
            title : title, 
            copy : copy
        }, options);
        
        
        var _this = {
            month : '',  
            day : '',  
            year : '',   
            age : '',
            errors : Array(), 
            setValues : function(){
                var month = $('.ac-container .month').val();
                var day = $('.ac-container .day').val()
                _this.month = month; 
                _this.day = day.replace(/^0+/, ''); //remove leading zero
                _this.year = $('.ac-container .year').val();
            },
            validate : function(){
                _this.errors = [];
                if (/^([0-9]|[12]\d|3[0-1])$/.test(_this.day) === false) {
                    _this.errors.push(error_day);
                };
                if (/^(19|20)\d{2}$/.test(_this.year) === false) {
                    _this.errors.push(error_year);
                };
                _this.clearErrors();
                _this.displayErrors();
                //return _this.errors.length < 1;
                return true;
            }, 
            clearErrors : function(){         
                $('.errors').html('');
            }, 
            displayErrors : function(){
                var html = '<ul>';
                for (var i = 0; i < _this.errors.length; i++) {
                    html += '<li><span>x</span>' + _this.errors[i] + '</li>';
                }
                html += '</ul>';
                setTimeout(function(){$('.ac-container .errors').html(html)},200);
            },
            reCenter : function (b){
                b.css("top", Math.max(0, (($(window).height() - (b.outerHeight() + 150)) / 2) + 
                                            $(window).scrollTop()) + "px");
                b.css("left", Math.max(0, (($(window).width() - b.outerWidth()) / 2) + 
                                            $(window).scrollLeft()) + "px");
            }, 
            buildHtml : function(){
            
                var copy = settings.copy; 
                var months = months_lang;
                var html = '';
                html += '<div class="ac-overlay"></div>';
                html += '<div class="ac-container">';
                html += '<h2>' + settings.title + '</h2>';
                html += '<p>' + copy.replace('[21]','<strong>'+settings.minAge+'</strong>'); + '</p>';
              //  html += '<div class="errors"></div>';
               // html += '<div class="fields"><select class="month">';
               // for(var i=0;i<months.length;i++){
               //     html += '<option value="'+i+'">'+months[i]+'</option>'
               // }
              //  html += '</select>';
               // html += '<input class="day" maxlength="2" placeholder="01" />';
               // html += '<input class="year" maxlength="4" placeholder="1989"/>';
                html += '<button>' + ageBtnMsg + '</button></div></div>';
                
                $('body').append(html);
                
                $('.ac-overlay').animate({
                    opacity: 0.8
                }, 500, function() {
                    _this.reCenter($('.ac-container'));
                    $('.ac-container').css({opacity: 1})
                });
                
                $(".ac-container .day, .ac-container .year").focus(function(){
                   $(this).removeAttr('placeholder');
                });
            }, 
            setAge : function(){
                _this.age = '';                 
                var birthday = new Date(_this.year, _this.month, _this.day);  
                var ageDifMs = Date.now() - birthday.getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                _this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
            }, 
            setlocalStorage  : function(key, val){
                //document.cookie = "ageVerified=true; expires=Thu, 18 Dec 2050 12:00:00 UTC; path=/";
                document.cookie = "ageVerified=true;";
                try {
                    localStorage.setItem(key,val);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            handleSuccess : function(){                
                var successMsg = successMsg;
                $('.ac-container').html(successMsg);
                setTimeout(function(){
                    $('.ac-container').animate({'top':'-350px'},200, function(){
                         $('.ac-overlay').animate({'opacity':'0'},500, function(){
                            if (settings.redirectTo != '') {
                                window.location.replace(settings.redirectTo);
                            }else{
                                $('.ac-overlay, .ac-container').remove();
                            }
                         });
                    });
                },500);
            },
            handleUnderAge : function() {
                var underAgeMsg = underAgeMsg;
                $('.ac-container').html(underAgeMsg);
                if (settings.redirectOnFail != '') {
                    setTimeout(function(){
                        window.location.replace(settings.redirectOnFail);
                    },2000);
                }
            }
        }; //end _this
         
        if(getCookie("ageVerified") == "true"){
            //console.log(getCookie("ageVerified"));
            return false;
        }

        if(localStorage.getItem("ageVerified") == "true"){
           // return false;
        }

        _this.buildHtml();  
        
        $('.ac-container button').on('click', function(){
			/*
            _this.setValues();
            if (_this.validate() === true) {
                _this.setAge();
                
                if(_this.age >= settings.minAge){
                    if(!_this.setlocalStorage("ageVerified", "true")){
                        console.log('localStorage not supported by your browser');
                    };
                    _this.handleSuccess();
                }else{
                    _this.handleUnderAge();
                }
            }
            */
           
			_this.setlocalStorage("ageVerified", "true")
			_this.handleSuccess();
        });
        
        $(window).resize(function() {
            _this.reCenter($('.ac-container'));
            setTimeout(function() {
                _this.reCenter($('.ac-container'));
            }, 500);
        });
    };
}(jQuery));

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
