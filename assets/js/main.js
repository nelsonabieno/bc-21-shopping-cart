/*
* main.js
*/

$(document).ready(function (e) {
/*
* variable declaration and 
*  initialization
*/
	var cartItemsPrices = [];
	var cartItemIds = [];
	var nOfItems=0;
	var updatedTotal ;
/* calls the toottip function  when document is ready */
	$('[data-toggle="tooltip"]').tooltip();	
/*
* 	Make Items Draggable
*/
	var noOfItemDivs=6; 				// Specify number of Item Divs
	makeDraggable(noOfItemDivs); 		// Makes a function Call to  makeDraggable
	
/*
*	Makes cartDiv droppable
*/
	$("#cartDiv").droppable({
		activeClass:"highlight",
		hoverClass:"hoverDroppable",
		/*
		*	function to listen to drop event
		*	function detect if an element is dropped in cartDiv
		*/
		drop: function(event,ui){

			//ui.helper.hide("fade");
			var itemAlt=$(ui.draggable).attr("alt");
			var id=$(ui.draggable).attr("id");
			var toDropId=parseInt(id.substr(4,5));
			
			var cartItemIdsLength=cartItemIds.length;
			/*console.log("cartItemIdsLength "+cartItemIdsLength);
			console.log("toDropId"+toDropId);*/
			var ifItemExist= isItemIncart(toDropId);			//returns false if item is not in cart
			if(ifItemExist===false){
				console.log("item DOES NOT exists");
				cartItemIds.push(toDropId);
				console.log("pushed to array");
				var text=$(ui.draggable).text();   
				var searchIndex = text.indexOf("₦");  			//Gets the indexOf ₦ in defined text 
				var slicedText = text.slice(searchIndex+1);   
				alert("Item "+itemAlt+" added to Cart");
				var priceToAdd=parseInt(slicedText);    		//Converts text to a number
				cartItemsPrices.push(priceToAdd);
				nOfItems=cartItemsPrices.length;
				updatedTotal=0;
				for(var i=0;i<cartItemsPrices.length;i++){
						updatedTotal=updatedTotal+cartItemsPrices[i];
				}
				$("#total_id").text('₦'+updatedTotal);
				$("#no_id").text(nOfItems);	
			}	
		},
		
		disabled:false,
		/*  
		*	function to listen to activate event
		*	function to detect if an element or item is activated 
		*/
		activate:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>Drop Item Here </span>");
		},

		/*
		*	function to listen to deactivate event
		*	function to detect if dragged or active element or item is deactivated
		*/
		deactivate:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>You Know You Want It</span>");
		},

		/*
		*	function to listen to on drag over event
		*	function to detect if an element or item is dragged/move over cartDiv
		*/
		over:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>Drop It</span>");
		},
		/*
		*	function to listen to pn drag out event
		*	function to detect if a dragged element or item was not dragged/move over cartDiv
		*/
		out:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>NOOOOOO!</span>");
			var itemAlt=$(ui.draggable).attr("alt");
			var id=$(ui.draggable).attr("id");
			var text=$(ui.draggable).text();   
			var searchIndex = text.indexOf("₦");  			//Gets the indexOf ₦ in defined text 
			var slicedText = text.slice(searchIndex+1);   
			alert("Item "+itemAlt+" removed from Cart");
			var priceToRemove=parseInt(slicedText); 
			var toRemoveId=parseInt(id.substr(4,5));
			cartItemIds.pop(toRemoveId);
			console.log("removed from cart");	
			if(nOfItems){
				nOfItems=cartItemsPrices.length--;
			}			
			
			if(updatedTotal>0){
				updatedTotal=updatedTotal-priceToRemove;
				$("#total_id").text('₦'+updatedTotal);
			}
			else{
				updatedTotal=0;
			}

			if (nOfItems>0){
				nOfItems--;	
				$("#no_id").text(nOfItems);	
				console.log("nOfItems after remove"+nOfItems);
			}
			else{
				nOfItems=0;
			}	
		}
	});

/*
*	function to check if an item is in cart
*	@parameter: id
*	return value of type boolean
*	returns false if item is not in cart
*	returns true if item is already in cart
*/
	function isItemIncart(toDropId){

		if (cartItemIds.indexOf(toDropId) === -1) {
			return false ;
		}
		else {
			return true;
		}
	}
});

/*
*	function to make  an element draggable
*	@parameter:noOfItemDivs
*/

function makeDraggable(noOfItemDivs){
	for(var i=1;i<=noOfItemDivs;i++){ 
		$('#item'+i).draggable(); 		//Attach draggable property 
	}
}

