//-----------------------------------------------------функция выполнится после полной загрузки документа----------------------------------------------
$(function () {
  //-----------------------------------------------------клик по кнопке с цифрой-----------------------------------------------------------------------
  $('.num-button').click(function () {
    if ($('#display').val() == '0') {
      $('#display').val('');
    }
    $('#display').val($('#display').val() + $(this).text());
  });
  //-----------------------------------------------------клик одной из функциональных кнопок-----------------------------------------------------------------
  $('.function-button').click(function () {
    $('#display').val($('#display').val() + $(this).text());
  });
  //-----------------------------------------------------клик по кнопке 'равно'------------------------------------------------------------------------
  $('.equals-button').click(function () {
    $('#display').val(eval($('#display').val()));
  });
  //----------------------------------------------------клик по копке очистки экрана--------------------------------------------------------------------
  $('.clear-button').click(function () {
    $('#display').val('0');
  });
});