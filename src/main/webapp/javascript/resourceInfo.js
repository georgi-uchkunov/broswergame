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
           var $guildPoints = $("#guildPoints");
           $guildPoints.text(response.guildPoints);
           console.log(response.guildPoints);
           var $gold = $("#gold");
           $gold.text(response.gold);
           console.log(response.gold);
           var $crystal = $("#crystal");
           $crystal.text(response.crystal);
           console.log(response.crystal);
        });
    }
    loadResourceData();
})