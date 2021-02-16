const amenities = [];
const url = "http://0.0.0.0:5001/api/v1"

function htmlPlace (place) {
  // template
  const htmlstring = [
    '<article>',
    '<div class="title">',
        `<h2>${place.name}<h2>`,
        '<div class="price_by_night">',
        `${place.price_by_night}`,
        '</div>',
        '</div>',
        '<div class="information">',
        '<div class="max_guest">',
        '<i class="fa fa-users fa-3x" aria-hidden="true"></i>',
        '<br />',
        `${place.number_rooms} Bedrooms`,
        '</div>',
        '<div class="number_bathrooms">',
        '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>',
        '<br />',
        `${place.number_bathrooms} Bathroom`,
        '</div>',
        '</div>',
        '<div class="user">',
        '<strong>Owner</strong>',
        '</div>',
        '<div class="description">',
        `${place.description}`
  ].join('');

  return htmlstring;
}

function newArray(amenities) {
  $('.amenities H4').text(amenities.join(', '));
}

function delThis(data, list) {
  for (let i = 0; i < list.length; i++){
    if (list[i] === data){
      list.splice(i, 1);
    }
  }
}

function init() {
  $('.amenities.input').on('change', function () {
    const checkObjt = $(this)[0].checked;
    if (checkObjt === true) {
      amenities.push($(this).data('name'));
    } else {
      delThis($(this).data('name'), amenities);
    }
    newArray();
  });

  $.ajax({ url: url + '/status' })
        .done(function (data){
          $('DIV#api_status').addClass('available');
        })
        .fail(function (jqXHR, textStatus, errorThrown){
          $('DIV#api_status').removeClass('available');
        });

  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: url + '/places_search',
    data: {}
  })
    .done(function (data) {
      for (let i = 0; i < data.length; i++) {
        $('SECTION.places').append(htmlPlace(data[i]));
      }
    });
}

$(document).ready(init);
