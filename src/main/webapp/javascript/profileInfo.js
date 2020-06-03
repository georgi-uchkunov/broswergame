/*$(document).ready(function(){

    var loadProfileData = function(){
        $.ajax({
            method: "GET",
            url: "getCurrentUser"
        })
        .done(function(response) {
           if(!response){
        	   window.location = "main.html";
        	   return;
           }
           
           var $user = $("#username");
           $user.val(response.username);
           var $password = $("#password");
           $password.val(response.password);
           var $ingameName = $("#ingame-name");
           $ingameName.val(response.ingameName);
           var $email = $("#email");
           $email.val(response.email);
        });
    }
    loadProfileData();
})*/

$(function(){

    var loadProfileData = function(){
        $.ajax({
            method: "GET",
            url: "getCurrentUser"
        })
        .done(function(response) {
           if(!response){
        	   window.location = "/";
        	   return;
           }
           var $email = $("#email");
           $email.val(response.email);
           var $username = $("#username");
           $username.val(response.username)
           var $password = $("#password");
           $password.val(response.password);
           var $ingameName = $("#ingame-name");
           $ingameName.val(response.ingameName);
        });
    }
    loadProfileData();
})