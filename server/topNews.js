const cheerio = require('cheerio');
const request = require('request');

var vernagrer = [];


var TOPNEWS = []



request.get('http://blognews.am/arm/',function(err,response,body){
    
    var $ = cheerio.load(body);
    
    var news = $("#top-news .card-content a h3 ").each(function(i, elem) {
                       
    console.log(elem.children[0].data);
})
//      var newsH4 = $("#top-news .card-content a h4 ").each(function(i, elem) {
//                       
//    console.log(elem.children[0].data);
//})
      var imgs = $(" #top-news .card-image img").each(function(i,elem){
            
           console.log(elem.attribs.src);
        } );
    
    
//    var topNews = $("#top-news .cont-in").each(function(i,elem){
//        
//        console.log(i);
//    })
    
    })


console.log(vernagrer[0])






//center-left-topa