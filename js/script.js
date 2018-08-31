
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('Live at' + address + '.')

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' +address + '';
    $body.append('<img class="bgimg" src= "' + streetviewUrl + '" >');

    return false;

    // NY Times AJAX request
    var nytimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=15e12821ebdc4cadb63df644fb557d8e'
    
    $.getJSON(nytimesURL, function(data) {
        
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
          var article = articles[i];
          $nytElem.append('<li class="article">'+
              '<a href="'+article.web_url+'">'+article.headline.main+
                  '</a>'+
              '<p>' + article.snippet + '</p>'+
            '</li>');
        };
  })
}

$('#form-container').submit(loadData);
