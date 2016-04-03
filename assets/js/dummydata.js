$(function() {

	var hiddenStore = [];



	$(".invoices-table .col-balance").each(function () {
		var text = $(this).find('strong').html();
		$(this).html(text.replace(/[0-9]/g,"X"));

	});
	


});​