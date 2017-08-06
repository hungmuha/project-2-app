

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

// function renderAlbum(album) {
//   console.log('rendering album:', album);

// 		var stockHtml =
//   "        <!-- one album -->" +
//   "        <div class='row stockSearch' stockIndex='" + searchData  + "'>" +
//   "          <div class='col-md-10 col-md-offset-1'>" +
//   "            <div class='panel panel-default'>" +
//   "              <div class='panel-body'>" +
//   "              <!-- begin stock internal row -->" +
 
//   "                <div class='row'>" +
//   // "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
//   // "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
//   // "                  </div>" +
//   "                  <div class='col-md-9 col-xs-12'>" +
//   "                    <ul class='list-group'>" +
//   "                      <li class='list-group-item'>" +
//   "                        <h4 class='inline-header'>"+data.dataset_data.column_names[i]+"</h4>" +
//   "                        <span class='stockAttribute'>" + data.dataset_data.data[0][i] + "</span>" +
//   "                      </li>" +
//   "                      <li class='list-group-item'>" +
//   "                        <h4 class='inline-header'>Artist Name:</h4>" +
//   "                        <span class='artist-name'>" +  album.artistName+ "</span>" +
//   "                      </li>" +
//   "                      <li class='list-group-item'>" +
//   "                        <h4 class='inline-header'>Released date:</h4>" +
//   "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
//   "                      </li>" +
//   "                      <li class='list-group-item'>" +
//   "                        <h4 class='inline-header'>Songs:</h4>"+
//   "                        <span>" + buildSongHtml(album.songs) + "</span>"+
//   "                        </li>"+

//   "                    </ul>" +
//   "                  </div>" +
//   "                </div>" +
//   "                <!-- end of stock internal row -->" +

//   "              </div>" + // end of panel-body

//   "              <div class='panel-footer'>" +
//   "               <button class='btn btn-primary add-stock'>Add Song</button>"
//   "              </div>" +

//   "            </div>" +
//   "          </div>" +
//   "          <!-- end one album -->";

//  // render to the page with jQuery
//   $('#albums').append(albumHtml);
// }




	});



	
});