// слайдер частоти процесора
$(document).ready(function () {
    // Ініціалізація слайдера
    $("#clockSpeedSlider").slider({
      range: true,
      min: 2,
      max: 5,
      step: 0.1,
      values: [2, 5],
      slide: function (event, ui) {
        // Оновлення значень "від" і "до" при зміні положення слайдера
        $("#clockSpeedMin").text(ui.values[0]);
        $("#clockSpeedMax").text(ui.values[1]);
      }
    });
  
    // Відображення початкових значень "від" і "до"
    $("#clockSpeedMin").text($("#clockSpeedSlider").slider("values", 0));
    $("#clockSpeedMax").text($("#clockSpeedSlider").slider("values", 1));
  });

  

  // слайдер ядер процесора
$(document).ready(function () {
    // Масив допустимих варіантів кількості ядер
    var allowedCoreNumbers = [2, 4, 6, 8, 10, 12, 16, 20, 24, 32];
  
    // Ініціалізація слайдера для ядер
    $("#coreNumberSlider").slider({
      range: true,
      min: 2,
      max: 32,
      step: 2,
      values: [2, 32],
      slide: function (event, ui) {
        // Отримання найближчого допустимого значення кількості ядер
        var minCoreNumber = getNearestAllowedValue(ui.values[0]);
        var maxCoreNumber = getNearestAllowedValue(ui.values[1]);
  
        $("#coreNumberMin").text(minCoreNumber);
        $("#coreNumberMax").text(maxCoreNumber);
      }
    });
  
    // Функція для отримання найближчого допустимого значення кількості ядер
    function getNearestAllowedValue(value) {
      var nearestValue = null;
      var minDistance = Infinity;
  
      // Перебір усіх допустимих значень
      for (var i = 0; i < allowedCoreNumbers.length; i++) {
        var currentDistance = Math.abs(value - allowedCoreNumbers[i]);
  
        // Збереження найменшої відстані
        if (currentDistance < minDistance) {
          minDistance = currentDistance;
          nearestValue = allowedCoreNumbers[i];
        }
      }
  
      return nearestValue;
    }
  
    // Відображення початкових значень "від" і "до"
    $("#coreNumberMin").text($("#coreNumberSlider").slider("values", 0));
    $("#coreNumberMax").text($("#coreNumberSlider").slider("values", 1));
  });