// var express = require('express');
// var app     = express();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


    //DEFINE URL
    url = 'http://www.fahorro.com/medicamentos/analgesicos.html?limit=56';

    //make GET request to url
    request(url, function(error, response, html){
        if(!error){
            
            //load HTML content as cheerio object (similar to jQuery)
            var $ = cheerio.load(html);

            var names = [];
            var prices = [];
            var medicines = [];

            $('li.item').each(function(i, elem) {
                var n =0;
                console.log("this is item number " + i );

                medicines.push(
                    {
                        'name' : $(this).find($('.product-name')).text().trim(),
                        'price' : $(this).find('span.price').text().trim()

                     });

                   });

                
                console.log(medicines);   
            //    var data = medicines.push( {

            //   'name' :  $(this).find($('.product-name')).text().trim(),
            //   'price' : $(this).find('span.price').text().trim()
            // } );

               
                

         

             

          //     var data = medicines.push( {

          //     'name' :  $('li.item').find($('.product-name')).text().trim(),
          //     'price' : $('li.item').find('span.price').text().trim()

          // });

              

             console.log("number of items found " + medicines.length);

             var JSONData = JSON.stringify(medicines);
             fs.writeFile("test.txt", JSONData, function(err) {
                if (err) {
                    console.log(err);
                }
            });

           $('div.category-products').find('li.item').each(function (i, element) {

                var n =0;
                // console.log("this is item number " + n + "  " + $(this).find('div.product-name'));
                n = n +1;



                   


                // medicines.push($(this).find('span.price').text());
           });
          
     

            // console.log($('.item'));

            // $('div.product-name').filter(function() {
            //     var data = $(this);
            //     name = data.text();
            // });

              //  this works:

            // $('h2.product-name').filter(function() {
            //     var data = $(this);
            //     names.push(data.text());
              
            // });

            // $('span.price').filter(function() {
            //     var data = $(this);
            //     prices.push(data.text());
                
           

            // });




           

            // $('.item').each(function (i) {

            //         console.log(i);
            // });
            

            for (var i=0; i < names.length; i++) {
                    
                    medicines.name += names[i];
                    medicines.price += prices[i];
            }
       
   
        }

    })



