

$(document).ready(function(){
	console.log('ayy im working');

	//trigger to search for stock on API
	$('#searchStock').on("submit",function(event){
		// $('.portfolioInfo').remove();
		// $('.stockList').remove();
		// $('.stockPortfolio').remove();
		
		var searchData=$('#search').val();
		event.preventDefault();
		console.log('submit');
		console.log(searchData);
		var userId= $('#userId').text();

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

				$('.stockList').append(stockName);
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

		$.ajax({
			method:"get",
			url: "/member/"+userId+"/portfolio",
			datatype:'json',
			success: function(data){
				
				console.log(data);
				var inPortfolio= "<h3 class='inPortfolio'> Your Portfolio : </h3>";
				// add header to portfolio section
				$('.stockPortfolio').append(inPortfolio);
				for (i=0; i<data.length; i++){
					var portfolioInfo = 
"						<ul class='list-group'>"+				
"						<li class='list-group-item portfolioList'>" +
"                        <h4 class='stockInFile'>" + data[i].name + "</h4>" +
// "                        <span class='stockNumber'>" + data.dataset_data.data[0][i] + "</span>" +
"                      </li>"+
"						</ul>";					
					//bring the information on the page to see all the sotcj that already on watch list
					$(".stockPortfolio").append(portfolioInfo);
				};
				var button = document.createElement('button');
				button.setAttribute('class','btn btn-primary delStock')
				button.innerText="Delete";
				$('.portfolioList').append(button);
			}
		});

		$.ajax({
			method:"get",
			url: "/member/"+userId+"/portfolioInfo",
			datatype:'json',
			success: function(data){

				console.log(data);
				var inPortfolio= "<h3 class='performance'> Performance: </h3>";
				// add header to portfolio section
				
				$('.portfolioInfo').append(inPortfolio);
				for (i=0; i<data.length; i++){
					var portPerformance = 
"						<ul class='list-group'>"+				
"						<li class='list-group-item'>" +
"                        <h4 class='performanceInFile'> $" + data[i].Price + "</h4>" +
// "                        <span class='stockNumber'>" + data.dataset_data.data[0][i] + "</span>" +
"                      </li>"+
"						</ul>";					
					//bring the information on the page to see all the sotcj that already on watch list
					$(".portfolioInfo").append(portPerformance);
				};
			}
		});

	});



	//set function to add the stock in the portfolio
	$('.save').on("click",function(){
		var searchData=$('#search').val();
		var stockSave = searchData;
		var stockPortfolio = {"name":stockSave};
		console.log(stockPortfolio);
		//grabbing the User Id from member ejs
		var id= $('#userId').text();
		console.log(id);
		var postStock = "/member/"+id+"/portfolio";
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
					url:"/member/"+id+"/portfolio",
					success: function(){
						console.log("in portfolio page now");
					}
				});
			}
		});

	});

	$('.delStock').click(function(){
	var id= $('#userId').text();
	console.log('clicked');
	var stockIndex= $(this).parents('.portfolioList').text();
	console.log(stockIndex);
			// $.ajax({
	  //    	 method: 'DELETE',
	  //    	 url: '/member/'+id+"/portfolio/"+stockIndex,
	  //     	 success: function(){

	  //     	 }
	  //   	});
	});


	
});