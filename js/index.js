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
    // debugger
    $('#display').data('operator', $(this).text());
    if (/(-|\/|\+|\*)$/.test($('#display').val())) {
      let str = $('#display').val();
      str = str.replace(/(-|\/|\+|\*)$/, $(this).text());
      $('#display').val(str);
    } else {
      if (/(-|\/|\+|\*)/.test($('#display').val())) {
        let valueB = $('#display').val().split('').splice($('#display').data('valueOne').length + 1, $('#display').val().length).join('');
        $('#display').data('valueTwo', valueB);
        $('.equals-button').click();
      } else {
        $('#display').data('valueOne', $('#display').val());
        $('#display').val($('#display').val() + $(this).text());
      }
    }
  });
  //--------------------клик по кнопке 'равно'------------------------------------------------------------------------
  $('.equals-button').click(function () {
    // debugger;
    if (/(-|\/|\+|\*)$/.test($('#display').val())) {
      $('#display').val($('#display').val());
    } else {
      let valueA = $('#display').data('valueOne');
      let valueB = $('#display').val().split('').splice($('#display').data('valueOne').length + 1, $('#display').val().length).join('');
      let operator = $('#display').data('operator');
      let result, expression;
      switch (operator) {
        case '+': result = +valueA + +valueB;
          expression = valueA + '+' + valueB + '=' + result;
          break;
        case '-': result = +valueA - +valueB;
          expression = valueA + '-' + valueB + '=' + result;
          break;
        case '*': result = +valueA * +valueB;
          expression = valueA + '*' + valueB + '=' + result;
          break;
        case '/': result = +valueA / +valueB;
          expression = valueA + '/' + valueB + '=' + result;
          break;
      }
      if (isFinite(result)) {
        $('#display').val(result);
        $('#display').data('valueOne', result);
        addLog(expression);
      } else {
        $('#display').val("ERROR");
      }
      $('#display').data('condition', true);
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
  //-------------------создаем лог-------------------------------------------------------------------
  function addLog(expression) {
    $('.log').append('<div class="log-item"><div class="red-circle"></div><p>' + expression + '<p/><div class="close"></div></div>');
    $('.red-circle').click($('.red-circle').css({ 'background': 'red' }))
  }

});