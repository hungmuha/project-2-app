



$(document).ready(function(){
	console.log('ayy im working');
	// const request = require ('request');

	$('#searchStock').on("click",function(event){

		event.preventDefault();
		console.log('submit');
		
		// var searchData=$(this);
		// var searchThis="http://marketdata.websol.barchart.com/getQuote.json?apikey=11ba1fd5a7de3784398aa7d381ed4007&symbols="+searchData;
		// request(searchThis,function(err,res,body){
		// 	var json = JSON.parse(body);
	
		// 		console.log(json);
			
		// });
	});
	
})