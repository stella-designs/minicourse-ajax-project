
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
    var nytimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=15e12821ebdc4cadb63df644fb557d8e';
    
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
  }).error(function(e){
      $nytHeaderElem.text('NYT Articles could not be loaded');
  });

  // Wikipedia AJAX request goes here
  var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=jason&callback=wikiCallback';

  $.ajax({
      url: wikiURL,
      dataType: "jsonp",
      success: function(response) {
          var articleList = response[1];

          for(var i = 0; i < articleList.length; i++) {
              articleStr = articleList[i];
              var url = 'https://en.wikipedia.org/wiki/' + articleStr;
              $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
          };

          clearTimeout(wikiRequestTimeout);
       }
  });
}

$('#form-container').submit(loadData);
