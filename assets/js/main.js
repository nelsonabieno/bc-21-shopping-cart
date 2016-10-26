/*
* main.js
*/

$(document).ready(function (e) {

/* calls the toottip function  when document is ready */
	$('[data-toggle="tooltip"]').tooltip();	
/*
* 	Make Items Draggable
*/
	$('#item1').draggable();
	$('#item2').draggable();
	$('#item3').draggable();
	$('#item4').draggable();
	$('#item5').draggable();
	$('#item6').draggable();
/*
*	Makes cartDiv droppable
*/
	$("#cartDiv").droppable({
		activeClass:"highlight",
		hoverClass:"hoverDroppable",
		/*
		*	function to detect if an element is dropped in cartDiv
		*/
		drop: function(event,ui){
			//ui.helper.hide("fade");
			var itemAlt=$(ui.draggable).attr("alt");
			var id=$(ui.draggable).attr("id");
			var text=$(ui.draggable).text();   
			var searchIndex = text.indexOf("₦");  			//Gets the indexOf ₦ in defined text 
			var slicedText = text.slice(searchIndex+1);    
			var priceToAdd=parseInt(slicedText);    			//Converts text to a number
			alert("Item "+itemAlt+" added to Cart");
			var previousTotal=$("#price_id").text();
			console.log(previousTotal);
		},
		
		disabled:false,
		/*
		*	function to detect if an element or item is activated 
		*/
		activate:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>Drop Item Here </span>");
		},

		/*
		*	function to detect if dragged or active element or item is deactivated
		*/
		deactivate:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>You Know You Want It</span>");
		},

		/*
		*	function to detect if an element or item is dragged/move over cartDiv
		*/
		over:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>Drop It</span>");
		},
		/*
		*	function to detect if a dragged element or item was not dragged/move over cartDiv
		*/
		out:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>NOOOOOO!</span>");
		}
	});
});


