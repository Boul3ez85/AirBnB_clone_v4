$(document).ready(function () {
    let amnt = {};
    $(document).on('change', "input[type='checkbox']", function () {
      if (this.checked) {
        amnt[$(this).data('id')] = $(this).data('name');
      } else {
        delete amnt[$(this).data('id')];
      }
      let lst = Object.values(amnt);
      if (lst.length > 0) {
        $('div.amenities > h4').text(Object.values(amnt).join(', '));
      } else {
        $('div.amenities > h4').html('&nbsp;');
      }
    });
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
      if (textStatus === 'success') {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      }
    });
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: '{}',
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let a = 0; a < data.length; a++) {
          let place = data[a];
          $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
        }
      }
    });
    $('.filters > button').click(function () {
      $('.places > article').remove();
      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        data: JSON.stringify({'amenities': Object.keys(amnt)}),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          for (let j = 0; j < data.length; j++) {
            let place = data[j];
            $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
          }
        }
      });
    });
  });