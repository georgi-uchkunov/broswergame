$(document).ready(function() {
        $(".custom-select").change(function() {
            // Get the selected value
            var selected = $("option:selected", $(this)).val();
            
            // Get the ID of this element
            var thisID = $(this).prop("id");
            // Reset so all values are showing:
            $(".custom-select option").each(function() {
                $(this).prop("disabled", false);
            });
            $(".custom-select").each(function() {
                if ($(this).prop("id") != thisID) {
                    $("option[value='" + selected + "']", $(this)).prop("disabled", true);
                }
            });

        });
    });