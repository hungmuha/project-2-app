

var searchUl = $("#searchResult");
var searchData=$('#search').val();

$(document).ready(function(){
	console.log('ayy im working');
	// const request = require ('request');

	$('#searchStock').on("submit",function(event){

		event.preventDefault();
		console.log('submit');
		console.log(searchData);

		// $.get("/member/"+searchData);
		var searchThis="https://www.quandl.com/api/v3/datasets/WIKI/"+searchData+"/data.json?api_key=stetDCHJ1XKLf1Sx5NZe";
		$.ajax({
			method: "get",
			url: searchThis,
			datatype: 'json',
			success: function(data){
				// console.log(data);
				console.log(data.dataset_data.column_names);
				console.log(data.dataset_data.data[0]);
				var stockName = "<h3 class='stockName'>"+searchData+"</h3>";
				$('.name').append(stockName);
								//for loop to append the newly available infor from API to page
				for(i=0; i<data.dataset_data.column_names.length;i++){
					var stockInfo =
  "						<ul class='list-group'>"+				
  "						<li class='list-group-item'>" +
  "                        <h4 class='stockAttribute'>" + data.dataset_data.column_names[i] + "</h4>" +
  "                        <span class='stockNumber'>" + data.dataset_data.data[0][i] + "</span>" +
  "                      </li>"+
  "						</ul>";
					// stockInfo.append(data.dataset_data.column_names[i] + ":" + data.dataset_data.data[0][i]);
					$(".stockList").append(stockInfo);
				};
				//create button to save the stock infor
				var button = document.createElement('button');
				button.setAttribute('class','btn btn-primary add-stock')
				button.innerText="SAVE";
				$('.save').append(button);
			}
		});
	});

	//set function to add the stock in the portfolio
	$('.save').on("click",function(){
		var stockSave = searchData;
		var stockPortfolio = {"name":stockSave};
		console.log(stockPortfolio);
		var postStock = "/member/portfolio";
		//ajax to call post in the portfolio
		$.ajax({
			method:"post",
			url:postStock,
			data: stockPortfolio,
			success: function(){
				console.log("done adding")
				//get function to go to the new page to see all the stocks in portfolio
				$.ajax({
					method:"get",
					url:"/member/portfolio",
					success: function(){
						console.log("in portfolio page now");
					}
				})
			}
		})

	})



	
});