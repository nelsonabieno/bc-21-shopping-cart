/*
*  begining of main.js
*/

/*
* variable declaration and 
*  initialization
*/
	var cartItemsPrices = [];
	var cartItemIds = [];
	var nOfItems=0;
	var updatedTotal=0;
	var itemName;
$(document).ready(function (e) {

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
		drop: function(event,ui) {
			//ui.helper.hide("fade");
			itemName=getItemName(ui);
			var toDropId=getItemId(ui);
			//console.log('itemName'+itemName);
			var cartItemIdsLength= getLength(cartItemIds);
			var ifItemExist= isItemIncart(toDropId);			//returns false if item is not in cart
			if(ifItemExist===false) {
				cartItemIds.push(toDropId);								
				nOfItems++;		
				//console.log("item pushed to cart");
				var priceToAdd=getItemPrice(ui);
				//console.log("priceToAdd"+priceToAdd);
				alert("Item "+itemName+" added to Cart");
				cartItemsPrices.push(priceToAdd);
				//nOfItems=getLength(cartItemsPrices);
				console.log("nOfItems after added to cart in drop fn"+nOfItems);
				updatedTotal=getUpdatedTotal(cartItemsPrices);
				//console.log("updatedTotal "+updatedTotal);
				updateTotalButton(updatedTotal);
				updateNumberButton(nOfItems);
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
		deactivate:function(event,ui) {
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>You Know You Want It</span>");
		},

		/*
		*	function to listen to on drag over event
		*	function to detect if an element or item is dragged/move over cartDiv
		*/
		over:function(event,ui) {
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>Drop It</span>");
			console.log("nOfItems BEFORE another item is added to cart in over fn"+nOfItems);
		},
		/*
		*	function to listen to pn drag out event
		*	function to detect if a dragged element or item was not dragged/move over cartDiv
		*/
		out:function(event,ui) {
			$("#cartMsg").remove();
			$(this).append("<span id='cartMsg'>NOOOOOO!</span>");
			itemName=getItemName(ui);
			//console.log("itemName out"+itemName);
			alert("Item "+itemName+" removed from Cart");
			//nOfItems=getLength(cartItemsPrices);
			var priceToRemove=getItemPrice(ui); 
			var toRemoveId=getItemId(ui);
			var  indexOfRemovePrice= getIndexOf(cartItemsPrices,priceToRemove);
			var  indexOfRemoveId= getIndexOf(cartItemIds,toRemoveId);
			console.log("the thief price to remove is located at "+indexOfRemovePrice);
			console.log("the thief id to remove is located at "+indexOfRemoveId);

			if(indexOfRemovePrice > -1){
				cartItemsPrices.splice(indexOfRemovePrice, 1);
			}

			if(indexOfRemoveId > -1){
				cartItemIds.splice(indexOfRemoveId, 1);
			}	

			if(updatedTotal>0) {
				console.log("updatedTotal before subtraction"+updatedTotal);
				console.log("priceToRemove "+priceToRemove);
				if(updatedTotal>=priceToRemove) {
					var subtractionResult=updatedTotal-priceToRemove;
					updatedTotal=updatedTotal-priceToRemove;
					updateTotalButton(subtractionResult);
					console.log("updatedTotal after subtraction using var subtractionResult = updatedTotal-priceToRemove"+updatedTotal);
					console.log("updatedTotal after subtraction using updatedTotal=updatedTotal-priceToRemove; ="+subtractionResult);
					console.log("updatedTotal BUTTON was updated using var subtractionResult = updatedTotal-priceToRemove "+updatedTotal);
				}
			}
			
			if (nOfItems>0) {
				nOfItems=nOfItems-1;	
				console.log("nOfItems before number button post "+nOfItems);
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
	//console.log("in fn getItemName ui="+ui);
	var itemAlt=$(ui.draggable).attr("alt");
	return itemAlt;
	//console.log("itemAlt="+itemAlt);
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
	var searchIndex = itemNameAndPrice.indexOf("₦");  			//Gets the indexOf ₦ in defined text 
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
	console.log("cartItemsPriceSize array length ="+cartItemsPriceSize);
	console.log("nOfItems var  ="+nOfItems);
	//console.log("updatedTotal BEFORE addition operation ="+updatedTotal);
	//if(cartItemsPriceSize===nOfItems){
		var sum=0;
		for(var i=0;i<cartItemsPriceSize;i++){
				console.log("item "+i+"="+cartItemsPrices[i]);
				sum=sum+cartItemsPrices[i];
		}
	//}
	console.log("updatedTotal AFTER addition operation ="+sum);
	return sum;
}
/*
*	function updateTotalButton to update Total Button
*	@parameter:updatedTotal
*/
function updateTotalButton(updatedTotal) {
	$("#total_id").text('₦'+updatedTotal);
}
/*
*	function updateNumberButton to update Number of items Button
*	@parameter:updatedTotal
*/
function updateNumberButton(nOfItems) {
	$("#no_id").text(nOfItems);	
	//console.log("updatedNumberButton "+nOfItems);
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
