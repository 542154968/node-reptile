var http = require('http'),
 	https = require('https'),
 	fs = require('fs'),
 	cheerio = require('cheerio'),
 	request = require('request'),
 	page = 0,
 	url = "http://tieba.baidu.com/f?kw=%E7%95%8C%E9%A6%96&ie=utf-8",
 	baseUrl = "http:";
 	
 	
getList(url)
function getList(url){
	var arr = [];
	http.get(url, function(res){
		var html = "";
		res.setEncoding('utf-8');
		res.on('data', function(chunk){
			html += chunk;
		})
		res.on('end', function(){
			var $ = cheerio.load(html);
			console.log( $('.j_th_tit ').text() )
			var nextUrl = $($('a.pagination-item')[0]).attr('href');
			console.log( baseUrl + nextUrl )
			getList( baseUrl + nextUrl )
			/**
			 * @description 以前获取segementfault的列表的demo  现在他们改的是不分页的 所以失效了
			 */
			// for( var i = 0, l =  $('#qa section').length;  i < l; i++){
			// 	arr.push($('#qa section').eq(i).find('.title a').attr('href'));
			// }
			// getDetail(arr)
			// page+1;
			// var nextUrl = $('.pagination li.next a').attr('href');
			// // console.log($('.pagination li.next a').attr('href'))
			// // console.log(i)
			// if( page >= 2){
			// 	return false
			// }else {
			// 	// console.log(baseUrl+nextUrl)
			// 	getList(baseUrl+nextUrl)
			// }
		})
		
	})
}
function getDetail(arr){
	for( var i = 0, l = arr.length; i < l; i++ ){
		https.get( baseUrl+arr[i], function(res){
			var html = "";
			res.setEncoding('utf-8');
			res.on('data', function(chunk){
				html += chunk;
			})
			res.on('end', function(){
				var $ = cheerio.load(html);
				console.log($('#questionTitle').text().trim())
			})
		} )
	}
}

