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
});
