//

$(document).ready(function (e) {

	$('[data-toggle="tooltip"]').tooltip();

	$('#item1').draggable();
	$('#item2').draggable();
	$('#item3').draggable();
	$('#item4').draggable();
	$('#item5').draggable();
	$('#item6').draggable();


	$("#cartDiv").droppable({
		activeClass:"highlight",
		hoverClass:"hoverDroppable",
		drop: function(event,ui){
			//ui.helper.hide("fade");
			var itemAlt=$(ui.draggable).attr("alt");
			var id=$(ui.draggable).attr("id");
			alert("Item "+itemAlt+" added to Cart");
		},
		
		disabled:false,
		activate:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>Drop Item Here </span>");
		},

		deactivate:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>You Know You Want It</span>");
		},

		over:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>Drop It</span>");
		},

		out:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>NOOOOOO!</span>");
		}
	});
});


