//-----------------------функция выполнится после полной загрузки документа----------------------------------------------
$(function () {
  //--------------------клик по кнопке с цифрой-----------------------------------------------------------------------
  $('.num-button').click(function () {
    if ($('#display').val() == '0' || $('#display').data('condition') == true || $('#display').val() == 'ERROR') {
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
        addLog(expression, result);
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
    $('#display').data('valueOne', ''); // храним первый оператор
    $('#display').data('valueTwo', ''); // храним второй оператор
    $('#display').data('operator', '');
    $('#display').data('condition', false); //если имеем два оператора на строке то true
  }
  //-------------------создаем лог-------------------------------------------------------------------
  function addLog(expression, result) {
    if (expression.includes(48)) {
      $('.log').prepend('<div class="log-item"><div class="red-circle"></div><p class="underline">' + expression + '<p/><div class="close"></div></div>');
    } else {
      $('.log').prepend('<div class="log-item"><div class="red-circle"></div><p>' + expression + '<p/><div class="close"></div></div>');
    }
    //-------------------проверяем если есть проокрутка то выводим результат в консоль(по условию в задаче)--------------------------------
    if ($('.log')[0].scrollHeight > $('.log').innerHeight()) {
      console.log('Scroll Top: ' + result);
    }
    $('.red-circle').click(function () {
      $(this).css({ 'background': 'red' })
    });

    $('.close').click(function () {
      console.log('asdsad');
      $('.log-item').remove();
    })
  };
});