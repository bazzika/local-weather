/**
 * Created by bazzika
 */
ymaps.ready(function () {
  var mapIconsToBackgroundImages = {
    rain: 'images/rain.jpg',
    'clear-day': 'images/sunny.jpg',
    'clear-night': 'images/clear-night.png',
    cloudy: 'images/clouds.png',
    fog: 'images/fog.png',
    hail: 'images/hail.png',
    'partly-cloudy-day': 'images/partly-cloudy-day.png',
    'partly-cloudy-night': 'images/partly-cloudy-night.png',
    snow: 'images/snow.jpg',
    sleet: 'images/icons/sleet.png',
    thunderstorm: 'images/icons/thunderstorm.jpg'
  };
  var DEGREE_FAREINGEIT='°F';
  var DEGREE_CELCIUM='°C';
  var latitude=ymaps.geolocation.latitude;
  var longitude=ymaps.geolocation.longitude;
  var clientKey='f9e2f4de6611a0ad0d4af7f59750bbe9';
  $("#user-city").text(ymaps.geolocation.city);
  $("#user-country").text(ymaps.geolocation.country);
  var api = 'https://api.darksky.net/forecast/'+clientKey+'/'+latitude + ',' + longitude;
  console.log(api);
  $.ajax({
    url: api,
    type: 'GET',
    dataType: 'jsonp',
    success: function (data) {
      var currentWeatherStatus=data.currently;
      showWeather({
        temperature:currentWeatherStatus.temperature,
        summary:currentWeatherStatus.summary,
        windSpeed:currentWeatherStatus.windSpeed,
        icon:currentWeatherStatus.icon,
        humidity:currentWeatherStatus.humidity
      });
      changeBackgroundImage(currentWeatherStatus.icon);
      toggleButton(currentWeatherStatus.temperature);
    },
    error: function (err) {
      throw err;
    }
  });
  function showWeather(currentWeather) {
    $('.degree').text(Math.round(currentWeather.temperature));
    $('.unit').text(DEGREE_FAREINGEIT);
    $('.description').text(currentWeather.summary);
    $('.humidity').text(currentWeather.humidity*100 + '%');
    $('.wind').text(Math.round(currentWeather.windSpeed*0.44704) + 'm/s');
    $('.icon').prop('src', 'images/icons/' + currentWeather.icon + '.png');
  }

  function changeBackgroundImage(icon) {
    var imageURL = mapIconsToBackgroundImages[icon];
    $('.wrapper').css("background-image", 'url(' + imageURL + ')');
  }
  function toggleButton(temperature) {
    var $unit = $('.unit');
    var $degree = $('.degree');
    $unit.on('click', function () {
//                $unit.text('�F');
      if ($unit.text()===DEGREE_FAREINGEIT) {
        $degree.text(Math.round((temperature - 32)*5/9));
        $unit.text(DEGREE_CELCIUM);
      } else {
        $degree.text(Math.round((temperature)));
        $unit.text(DEGREE_FAREINGEIT);
      }
    });
  }

});
