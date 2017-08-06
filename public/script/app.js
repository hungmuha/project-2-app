

var searchUl = $("#searchResult");
var stockInfo = document.createElement("li");

$(document).ready(function(){
	console.log('ayy im working');
	// const request = require ('request');

	$('#searchStock').on("submit",function(event){

		event.preventDefault();
		console.log('submit');
		var searchData=$('#search').val();
		console.log(searchData);

		// $.get("/member/"+searchData);
		var searchThis="https://www.quandl.com/api/v3/datasets/WIKI/"+searchData+"/data.json?api_key=stetDCHJ1XKLf1Sx5NZe";
		$.ajax({
			method: "get",
			url: searchThis,
			datatype: 'json',
			success: function(data){
				console.log(data.dataset_data.column_names);
				console.log(data.dataset_data.data[0]);

				for(i=0; i<data.dataset_data.column_names.length;i++){
					var stockInfo = document.createElement("li");
					stockInfo.append(data.dataset_data.column_names[i] + ":" + data.dataset_data.data[0][i]);
					$("#searchResult").append(stockInfo);
				};
			}
		});

	});



	
});