//-----------------------функция выполнится после полной загрузки документа----------------------------------------------
$(function () {
  //--------------------клик по кнопке с цифрой-----------------------------------------------------------------------
  $('.num-button').click(function () {
    if ($('#display').val() == '0' || $('#display').data('condition') == true) {
      $('#display').data('condition', false);
      $('#display').val('');
    }
    $('#display').val($('#display').val() + $(this).text());
  });
  //--------------------клик по одной из функциональных кнопок-----------------------------------------------------------------
  $('.function-button').click(function () {
    $('#display').data('operator', $(this).text());
    if (/(-|\/|\+|\*)$/.test($('#display').val())) {
      $('#display').data('valueOne', $('#display').val());
      let str = $('#display').val();
      str = str.replace(/(-|\/|\+|\*)$/, $(this).text());
      $('#display').val(str);
    } else {
      if (/(-|\/|\+|\*)/.test($('#display').val())) {
        let valueB = $('#display').val().split('').splice($('#display').data('valueOne').length + 1, $('#display').val().length).join('');
        $('#display').data('valueTwo', valueB);
        $('.equals-button').click();
        // $('#display').val($('#display').val())
      } else {
        $('#display').val($('#display').val() + $(this).text());
      }
    }
  });
  //--------------------клик по кнопке 'равно'------------------------------------------------------------------------
  $('.equals-button').click(function () {
    // debugger
    if (/(-|\/|\+|\*)$/.test($('#display').val())) {
      $('#display').val($('#display').val());
    } else {
      let valueA = $('#display').data('valueOne');
      if ($('#display').data('valueTwo') == '') {
        let valueB = $('#display').val().split('').splice($('#display').data('valueOne').length + 1, $('#display').val().length).join('');
      }
      let operator = $('#display').data('operator');
      let result;
      switch (operator) {
        case '+': result = +valueA + +valueB;
          break;
        case '-': result = +valueA - +valueB;
          break;
        case '*': result = +valueA * +valueB;
          break;
        case '/': result = +valueA / +valueB;
          break;
      }
      if (isFinite(result)) {
        $('#display').val(result);
        $('#display').data('valueOne', result);
      } else {
        $('#display').val("ERROR");
      }
      $('#display').data('condition', true);
      // resetCalculator();
    }
  });
  //-------------------клик по копке очистки экрана--------------------------------------------------------------------
  $('.clear-button').click(function () {
    resetCalculator();
  });
  //-------------------состояние программы-------------------------------------------------------------------
  function resetCalculator() {
    $('#display').val('0');
    $('#display').data('valueOne', '');
    $('#display').data('valueTwo', '');
    $('#display').data('operator', '');
    $('#display').data('condition', false);
  }
});