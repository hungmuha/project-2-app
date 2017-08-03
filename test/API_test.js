var expect = require('chai').expect;
var request = require('request');


describe('testing Shakes', function(done){
	var URL;
	var err;
	var res;
	var bod;
	before(function (done){
		URL= "http://marketdata.websol.barchart.com/getQuote.json?apikey=11ba1fd5a7de3784398aa7d381ed4007&symbols=ZC*1,IBM,GOOGL,";
		request(URL,function(error,response,body){
			err=error;
			res=response;
			bod=body;
			// console.log(res);
			// console.log(bod);
			done();
			});
	});

	describe('connect',function(){
	it("should receive a 200/ OK HTTPcode",function(){

			expect(res.statusCode).is.equal(200);
		});
	});
	describe('sentence',function(){
	it("should have a Title in the body",function(){
			console.log(bod);
			if(typeof(bod)==="string"){
				bod=JSON.parse(bod);
			}
		expect(bod.results).to.not.be.empty;
		});
	});
});

