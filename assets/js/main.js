/*
*  begining of main.js
*/

/*
*  Global variable declaration and 
*  initialization
*/
var cartItemsPrices = [];
var cartItemIds = [];
var nOfItems=0;
var updatedTotal=0;
var itemName;

$(document).ready(function (e) {

	var $main_items = $('._lhs .row').html();

	/* this handles the mouse up on the body */
	$("#content").mouseup(function(){
		//$('._lhs .row').html($main_items);
        //console.log($main_items);
	});

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
		drop: function(event, ui) {

			itemName = getItemName(ui);
			var toDropId = getItemId(ui);
			var cartItemIdsLength = getLength(cartItemIds);
			var ifItemExist = isItemIncart(toDropId);			//returns false if item is not in cart
			if(ifItemExist === false) {
				cartItemIds.push(toDropId);								
				nOfItems++;		
				var priceToAdd = getItemPrice(ui);
				cartItemsPrices.push(priceToAdd);
				updatedTotal=getUpdatedTotal(cartItemsPrices);
				updateTotalButton(updatedTotal);
				updateNumberButton(nOfItems);
                $(ui.draggable).addClass("resizeImage");
			}	
		},
		disabled:false,
		/*  
		*	function to listen to activate event
		*	function to detect if an element or item is activated 
		*/
		activate:function(event,ui){
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg' class='temprate'>Drop Item Here </span>");
		},
		/*
		*	function to listen to deactivate event
		*	function to detect if dragged or active element or item is deactivated
		*/
		deactivate:function(event,ui) {
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg' class='cool'>You Know You Want It</span>");
		},

		/*
		*	function to listen to on drag over event
		*	function to detect if an element or item is dragged/move over cartDiv
		*/
		over:function(event,ui) {
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg' class='warm'>Drop It</span>");
		},
		/*
		*	function to listen to pn drag out event
		*	function to detect if a dragged element or item was not dragged/move over cartDiv
		*/
		out:function(event,ui) {
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>NOOOOOO!</span>");
			itemName=getItemName(ui);
			var priceToRemove=getItemPrice(ui); 
			var toRemoveId=getItemId(ui);
			var  indexOfRemovePrice= getIndexOf(cartItemsPrices,priceToRemove);
			var  indexOfRemoveId= getIndexOf(cartItemIds,toRemoveId);

            $(ui.draggable).removeClass("resizeImage");
		
			if(indexOfRemovePrice > -1){
				cartItemsPrices.splice(indexOfRemovePrice, 1);
			}

			if(indexOfRemoveId > -1){
				cartItemIds.splice(indexOfRemoveId, 1);
			}	

			if(updatedTotal>0) {
				if(updatedTotal>=priceToRemove) {
					var subtractionResult=updatedTotal-priceToRemove;
					updatedTotal=updatedTotal-priceToRemove;
					updateTotalButton(subtractionResult);
				}
			}
			
			if (nOfItems>0) {
				nOfItems=nOfItems-1;	
				updateNumberButton(nOfItems);
			}
			else {
				nOfItems=0;
			}	
		}
	});
/*
*	function  isItemIncart to check if an item is in cart
*	@parameter: id
*	return value of type boolean
*	returns false if item is not in cart
*	returns true if item is already in cart
*/
function isItemIncart(toDropId) {

		if (cartItemIds.indexOf(toDropId) === -1) {
			return false ;
		}
		else {
			return true;
		}
	}
});
/*
*	function makeDraggable to make  an element draggable
*	@parameter:noOfItemDivs
*/
function makeDraggable(noOfItemDivs) {
	for(var i=1;i<=noOfItemDivs;i++) {
		$('#item'+i).draggable(); 		//Attach draggable property
	}
}
/*
*	function getItemId to get the id of item to be dropped or removed
*	@parameter: ui
*	returns a number
*/
function getItemId(ui) {
	var id=$(ui.draggable).attr("id");
	return parseInt(id.substr(4,5));
}
/*
*	function getItemId to get the id of item to be dropped or removed
*	@parameter: ui
*	returns a number
*/
function getItemName(ui) {
	var itemAlt=$(ui.draggable).attr("alt");
	return itemAlt;
}
/*
*	function getLength to get a parameter
*	@parameter: param
*	returns the length
*/
function getLength(param) {
	if (typeof param === "object") {
    	if ( Object.prototype.toString.call(param)=="[object Array]") {
    		return param.length;
    	}
    }
}
/*
*	function getItemPrice 
*	@parameter: ui
*	returns the Items Price
*/
function getItemPrice(ui) {
	var itemNameAndPrice=$(ui.draggable).text();
	var searchIndex = itemNameAndPrice.indexOf('N');  			//Gets the indexOf ₦ in defined text
	var slicedText = itemNameAndPrice.slice(searchIndex+1);   
	return parseInt(slicedText);    							//Converts text to a number
}
/*
*	function getUpdatedTotal 
*	@parameter: nOfItems
*	returns updated total
*/
function getUpdatedTotal(cartItemsPrices) {
	var cartItemsPriceSize= getLength(cartItemsPrices);
	var sum=0;
		for(var i=0;i<cartItemsPriceSize;i++){
				sum=sum+cartItemsPrices[i];
		}
	return sum;
}
/*
*	function updateTotalButton to update Total Button
*	@parameter:updatedTotal
*/
function updateTotalButton(updatedTotal) {
	$("#total_id").text('N'+updatedTotal);
}
/*
*	function updateNumberButton to update Number of items Button
*	@parameter:updatedTotal
*/
function updateNumberButton(nOfItems) {
	$("#no_id").text(nOfItems);	
}
/*
*	function getIndexOf find in item
*	@parameter:param
*/
function getIndexOf(item,find) {
	var itemIndex= item.indexOf(find) ;
	return parseInt(itemIndex);
}

/*
*  end of main.js
*/
