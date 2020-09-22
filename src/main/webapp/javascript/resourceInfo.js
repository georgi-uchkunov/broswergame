$(function(){

    var loadResourceData = function(){
        $.ajax({
            method: "GET",
            url: "getCurrentUser"
        })
        .done(function(response) {
           if(!response){
        	   window.location = "/";
        	   return;
           }
           var $profileName = $("#profile-place");
           $profileName.text(response.username);
           var $guildPoints = $("#guildPoints");
           $guildPoints.text(response.guildPoints);
           var $gold = $("#gold");
           $gold.text(response.gold);
           var $crystal = $("#crystal");
           $crystal.text(response.crystal);
        });
    }
    loadResourceData();
})