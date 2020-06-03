$(function () {


    var getUserCharacters = function () {
        $.ajax({
            method: "GET",
            url: "getMyCharacters"
        }).done(
            function (response) {
                // console.log(response);
                for (var i = 0; i < response.length; i++) {
                    var currentCharacter = response[i];
                    renderCharacter(currentCharacter.id,
                        currentCharacter.name, currentCharacter.race,
                        currentCharacter.characterClass,
                    );
                }

            }).fail(function (response) {
                console.log(response);
            })
    }


    var renderCharacter = function (id, name, race, characterClass) {

        console.log(id, name, race, characterClass);

        var $template = $('#char-info-media').html();
        $template = $($template);

        $template.find('.remove-character').attr('id', id);
        $template.find('.character-name').val(name);
        $template.find('.character-race').val(race);
        $template.find('.character-class').val(characterClass);
        
        var $commentsList = $(".characters-in-profile-list");
        $commentsList.append($template);
    }

    getUserCharacters();

});