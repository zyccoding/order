// JavaScript Document
$(document).ready(function(){ 
                var minAge = $('18').val();
                $('18').on('change', function(){
                   minAge = $(this).val(); 
                });
                $('button').on('click', function(){
//                    sessionStorage.clear();
                    //$.ageCheck({minAge: minAge});
                });
                $.ageCheck({minAge: minAge});        
            });