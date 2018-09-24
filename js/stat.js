'use strict';

window.renderStatistics = function (ctx, names, times) {
  var dataCloud = {
    startX: 100,
    startY: 0,
    widthRect: 420,
    heightRect: 270,
    lenghtShadow: 10,
    margin: 40,
    colorRect: ['rgba(0, 0, 0, 0.7)', 'rgb(256, 256, 256)'],
    text: ['Ура вы победили!', 'Список результатов: ']
  };

  drawRect(dataCloud.startX + dataCloud.lenghtShadow, dataCloud.startY + dataCloud.lenghtShadow, dataCloud.widthRect, dataCloud.heightRect, dataCloud.colorRect[0]);
  drawRect(dataCloud.startX, dataCloud.startY, dataCloud.widthRect, dataCloud.heightRect, dataCloud.colorRect[1]);
  writeText(dataCloud.text);
  drawHistogram(times, names);

  function drawRect(X, Y, width, height, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(X, Y, width, height);
  }

  function writeText(textArray) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';

    for (var i = 0; i < textArray.length; i++) {
      ctx.fillText(textArray[i], dataCloud.startX + dataCloud.margin, dataCloud.startY + (i + 1) * 25);
    }
  }

  function drawHistogram(arrayTimes, arrayNames) {

    var dataHistogram = {
      barWidth: 40,
      indent: 90,
      indentName: 20,
      indentTime: 10,
      histogramHeight: 150,
      paddingTop: 60,
    };

    var step = dataHistogram.histogramHeight / (getMaxValue(times) - 0);
    var initialX = dataCloud.startX + dataCloud.margin;
    var initialY = dataCloud.startY + dataHistogram.histogramHeight + dataHistogram.indentName + dataHistogram.indentTime + dataHistogram.paddingTop;

    for (var i = 0; i < arrayTimes.length; i++) {
      dataHistogram.barHeight = arrayTimes[i] * step;
      var getY = initialY - arrayTimes[i] * step;
      var getX = initialX + dataHistogram.indent * i;

      ctx.fillStyle = fillBarColor(names[i]);
      ctx.fillRect(getX, getY, dataHistogram.barWidth, dataHistogram.barHeight);

      ctx.fillText(arrayNames[i], getX, initialY + dataHistogram.indentName);
      ctx.fillText(arrayTimes[i].toFixed(0), getX, getY - dataHistogram.indentTime);
    }
  }

  function getMaxValue(array) {
    var max = -1;
    for (var i = 0; i < array.length; i++) {
      var value = array[i];
      if (value > max) {
        max = value;
      }
    }
    return max;
  }

  function fillBarColor(namePlayer) {
    var rndSatur = (Math.random() * 0.6 + 0.3).toFixed(2);
    if (namePlayer === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + rndSatur.toString() + ')';
    }
  }
};


