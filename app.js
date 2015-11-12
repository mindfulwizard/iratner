$(document).ready(function () {
	$("#sections li a").click(function() {
	    $(this).parent().addClass('selected').siblings().removeClass('selected');
	});
});