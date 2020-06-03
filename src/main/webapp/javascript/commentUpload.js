$("#submitComment").on("click", function() {

	var email = $("#commenterEmail").val();
	var name = $("#commenterName").val();
	var comment = $("#commenterComment").val();

	$.ajax({
		method : "POST",
		url : "comment",
		data : {
			
			commenterEmail : email,
			commenterName : name,
			commenterComment : comment
		}
	}).done(function(response) {
		
		window.location = "/";
	});
})