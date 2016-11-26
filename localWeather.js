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
    'partly-cloudy-night': 'images/bluesky.jpg',
    snow: 'images/snow.jpg',
    sleet: 'images/icons/sleet.png',
    thunderstorm: 'images/icons/thunderstorm.jpg'
  };
  var DEGREE_FAREINGEIT = '°F';
  var DEGREE_CELCIUM = '°C';
  var latitude = ymaps.geolocation.latitude;
  var longitude = ymaps.geolocation.longitude;
  var clientKey = 'f9e2f4de6611a0ad0d4af7f59750bbe9';
  $("#user-city").text(ymaps.geolocation.city);
  $("#user-country").text(ymaps.geolocation.country);
  var api = 'https://api.darksky.net/forecast/' + clientKey + '/' + latitude + ',' + longitude;
  console.log(api);
  $.ajax({
    url: api,
    type: 'GET',
    dataType: 'jsonp',
    success: function (data) {
      var currentWeatherStatus = data.currently;
      showWeather({
        temperature: currentWeatherStatus.temperature,
        summary: currentWeatherStatus.summary,
        windSpeed: currentWeatherStatus.windSpeed,
        icon: currentWeatherStatus.icon,
        humidity: currentWeatherStatus.humidity
      });
      toggleUnit(currentWeatherStatus.temperature);
    },
    error: function (err) {
      throw err;
    }
  });
  function showWeather(currentWeather) {
    //TODO: use map as for icon as for image
    var imageURL = mapIconsToBackgroundImages[currentWeather.icon];
    $('.js-degree').text(Math.round(currentWeather.temperature));
    $('.js-unit').text(DEGREE_FAREINGEIT);
    $('.js-description').text(currentWeather.summary);
    $('.js-humidity').text(currentWeather.humidity * 100 + '%');
    $('.js-wind').text(Math.round(currentWeather.windSpeed * 0.44704) + 'm/s');
    $('.js-icon').prop('src', 'images/icons/' + currentWeather.icon + '.png');
    $('.js-background').css("background-image", 'url(' + imageURL + ')');
  }

  function toggleUnit(temperature) {
    var $unit = $('.js-unit');
    var $degree = $('.js-degree');
    $unit.on('click', function () {
      var measure = DEGREE_FAREINGEIT;
      var currentTemperature = temperature;
      if ($unit.text() === DEGREE_FAREINGEIT) {
        currentTemperature = Math.round((currentTemperature - 32) * 5 / 9);
        measure = DEGREE_CELCIUM;
      } else {
        currentTemperature = Math.round((currentTemperature));
      }
      $degree.text(currentTemperature);
      $unit.text(measure);
    });
  }

});
