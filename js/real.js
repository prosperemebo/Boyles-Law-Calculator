// Listen for an event
document.getElementById('Calculate').addEventListener('click', start);
document.addEventListener('keypress', function (e) {
  if (e.keyCode === 13 || e.which === 13) {
    start(e);
  }
});

// Variable declarations
var v1, v2, p1, p2, parameter, unknown;

//  start Function
function start(e) {
  // Retrive values from the UI
  v1 = parseFloat(document.getElementById('v1').value);
  v2 = parseFloat(document.getElementById('v2').value);
  p1 = parseFloat(document.getElementById('p1').value);
  p2 = parseFloat(document.getElementById('p2').value);
  vt1 = document.getElementById('vt1').value;
  vt2 = document.getElementById('vt2').value;
  pt1 = document.getElementById('pt1').value;
  pt2 = document.getElementById('pt2').value;

  //   Store values into array
  parameter = [v1, v2, p1, p2];
  if (insure(parameter, ...parameter)) {
    return false;
  }

  if (
    parameter.filter(function (element) {
      if (isNaN(element)) {
        return true;
      }
      return false;
    }).length >= 2
  ) {
    alert('You are only to leave one space open as your unknown.');
    document.getElementById('input').reset();
    return false;
  }

  // Find the unknown in the array and remove it.
  for (var i = 0; i < parameter.length; i++) {
    if (isNaN(parameter[i])) {
      parameter[i] = unknown;
    }
  }

  // Run calculation based on unknown
  if (isNaN(v1)) {
    unknown = (p2 * v2) / p1;
    var second = () => {
      setTimeout(() => {
        document.getElementById('ans').textContent = unknown + '' + vt1;
      }, 500);
    };

    var first = () => {
      document.getElementById('answer').textContent = 'Volume 1 ';
      second();
    };
    first();
    // document.getElementById('ans').textContent =
    //   'Volume 1 ' + unknown + '' + vt1;
  } else if (isNaN(v2)) {
    unknown = (p1 * v1) / p2;
    var second = () => {
      setTimeout(() => {
        document.getElementById('ans').textContent = unknown + '' + vt2;
      }, 500);
    };

    var first = () => {
      document.getElementById('answer').textContent = 'Volume 2 ';
      second();
    };
    first();
    // document.getElementById('ans').textContent =
    //   'Volume 2 ' + unknown + '' + vt2;
  } else if (isNaN(p1)) {
    unknown = (p2 * v2) / v1;
    var second = () => {
      setTimeout(() => {
        document.getElementById('ans').textContent = unknown + '' + pt1;
      }, 500);
    };

    var first = () => {
      document.getElementById('answer').textContent = 'Pressure 1 ';
      second();
    };
    first();
    // document.getElementById('ans').textContent =
    //   'Pressure 1 ' + unknown + '' + pt1;
  } else if (isNaN(p2)) {
    unknown = (p1 * v1) / v2;
    var second = () => {
      setTimeout(() => {
        document.getElementById('ans').textContent = unknown + '' + pt2;
      }, 500);
    };

    var first = () => {
      document.getElementById('answer').textContent = 'Pressure 2 ';
      second();
    };
    first();
    // document.getElementById('ans').textContent =
    //   'Pressure 2 ' + unknown + '' + pt2;
    // document.getElementById('answer').textContent = 'Pressure 2 ';
  }

  //   Reset Form
  document.getElementById('input').reset();

  // Prevent from submitting to page
  e.preventDefault();
}

function insure(x, a, b, c, d) {
  if (isNaN(a) && isNaN(b) && isNaN(c) && isNaN(d)) {
    alert('Inapporpriate input, please try again!');
    x.splice(0, 4);
    return true;
  }
}
