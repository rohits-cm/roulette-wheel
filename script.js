$(document).ready(function () {
  var degrees = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350];
  var numbers = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32, 0];

  var spinning = false;
  var rotationAngle = 0;
  var intervalId;
  var spinDuration = 1000;
  var resultDisplayed = false;

  //rotate the wheel
  function rotateWheel() {
    rotationAngle += 10;
    $('.roulette-wheel').css('transform', 'rotate(' + rotationAngle + 'deg)');
  }

  // spin the wheel
  function spinWheel() {
    if (!spinning) {
      spinning = true;
      $('#spinBtn').text('Stop');
      resultDisplayed = false;
      
      var randomDurationFactor = 0.9 + Math.random() * 0.2;
      var adjustedSpinDuration = spinDuration * randomDurationFactor;

      intervalId = setInterval(function () {
        rotateWheel();
      }, 5);

      setTimeout(function () {
        stopSpinning();
      }, adjustedSpinDuration);
    }
  }

  //stop spinning the wheel
  function stopSpinning() {
    clearInterval(intervalId);
    spinning = false;
    $('#spinBtn').text('Start');

    if (!resultDisplayed) {
      var currentAngle = rotationAngle % 360;
      var resultIndex = -1;

      for (var i = 0; i < degrees.length; i++) {
        if (currentAngle < degrees[i]) {
          resultIndex = i;
          break;
        }
      }

      if (resultIndex === -1) {
        resultIndex = 0;
      }

      var resultNumber = numbers[resultIndex];
      console.log('The wheel stopped at ' + currentAngle + ' degrees. Result: ' + resultNumber);
      $('#resultDiv').append(resultNumber + '<br>');
      // $('#resultDiv').html('<strong>Result:</strong> ' + resultNumber);
      resultDisplayed = true;
    }
  }

  $('#spinBtn').on('click', function () {
    if (spinning) {
      clearInterval(intervalId);
      stopSpinning();
    } else {
      spinWheel();
    }
  });
});
