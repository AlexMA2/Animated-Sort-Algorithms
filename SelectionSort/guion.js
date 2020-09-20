slowAnimationSpeed = 400;

$("#step").click(function () {
  step1();
});

function init() {
  reset();
}

function reset() {
  isFindFirst = true;
  current = 0;
  minPosition = 0;

  i = 0;
  document.getElementById("highlight").style.visibility = "hidden";
  document.getElementById("currentFly").style.visibility = "hidden";
  document.getElementById("sortedFly").style.visibility = "hidden";
  document.getElementById("iPosition").style.visibility = "hidden";
  document.getElementById("iValue").style.visibility = "hidden";
  setRandomValue();
  resetColor();
  document.getElementById("remark").innerHTML = "Lista llenada aleatoriamente";
  document.getElementById("value").disabled = false;

  for (var j = 0; j < SIZE; j++) {
    id = "check" + j;
    document.getElementById(id).innerHTML = "";
  }
}

function resetColor() {
  for (var i = 0; i < SIZE; i++) {
    id = "list" + i;
    document.getElementById(id).style.backgroundColor = "white";
    document.getElementById(id).style.color = "black";
  }
}

function setRandomValue() {
  listValues = [];
  for (var i = 0; i < SIZE; i++) {
    listValues.push(Math.floor(Math.random() * 100));
  }
  for (var i = 0; i < SIZE; i++) {
    id = "list" + i;
    document.getElementById(id).innerHTML = listValues[i];
  }
}

var k = 0;
var current = 0;
var isFindFirst = true;

function step1() {
  if (current > SIZE - 2) {
    document.getElementById("highlight").style.visibility = "hidden";
    document.getElementById("currentFly").style.visibility = "hidden";
    document.getElementById("remark").innerHTML =
      "La lista esta ordenada. Pulsa Reiniciar para ver la animación otravez";
    //              current++;
    colorSorted(SIZE);
    return;
  }

  if (isFindFirst) {
    findFirst();
    isFindFirst = false;
  } else {
    swap();
    isFindFirst = true;
    current++;
  }
}

function colorSorted(size) {
  if (current < 1) return;
  p3 = getElementPos(document.getElementById("list0"));
  document.getElementById("sortedFly").style.top = p3.y - 6 + "px";
  document.getElementById("sortedFly").style.left = p3.x + "px";
  document.getElementById("sortedFly").style.width = (p3.w + 7.1) * size + "px";
  document.getElementById("sortedFly").style.height = p3.h + 17 + "px";
  document.getElementById("sortedFly").style.visibility = "visible";
}

function setPointerPosition() {
  document.getElementById("iPosition").style.visibility = "visible";
  document.getElementById("iValue").style.visibility = "visible";
  posLoc = getElementPos(document.getElementById("list" + current));
  document.getElementById("iPosition").style.top = posLoc.y - 40 + "px";
  document.getElementById("iPosition").style.left =
    posLoc.x + posLoc.w / 2 - 5 + "px";

  document.getElementById("iValue").style.top = posLoc.y - 53 + "px";
  document.getElementById("iValue").style.left =
    posLoc.x + posLoc.w / 2 - 7 + "px";
  document.getElementById("iValue").innerHTML = "i: " + current;
}

function findFirst() {
  setPointerPosition();
  colorSorted(current);
  min = listValues[current];
  minPosition = current;

  for (var i = current + 1; i < SIZE; i++) {
    if (min > listValues[i]) {
      min = listValues[i];
      minPosition = i;
    }
  }

  setMinPosition();
  setCurrentPosition();

  document.getElementById("remark").innerHTML =
    "El menor valor es: " +
    min +
    " y el primer elemento es: " +
    listValues[current] +
    " en la sublista desordenada.";
}

function setCurrentPosition() {
  posLoc = getElementPos(document.getElementById("list" + current));
  document.getElementById("currentFly").style.top = posLoc.y - 6 + "px";
  document.getElementById("currentFly").style.left = posLoc.x + "px";
  document.getElementById("currentFly").style.width = posLoc.w + 6 + "px";
  document.getElementById("currentFly").style.height = posLoc.h + 17 + "px";
  document.getElementById("currentFly").innerHTML = listValues[current];
  document.getElementById("currentFly").style.visibility = "visible";
}

function setMinPosition() {
  posLoc = getElementPos(document.getElementById("list" + minPosition));
  document.getElementById("highlight").style.top = posLoc.y - 6 + "px";
  document.getElementById("highlight").style.left = posLoc.x + "px";
  document.getElementById("highlight").style.width = posLoc.w + "px";
  document.getElementById("highlight").style.height = posLoc.h + 11 + "px";
  document.getElementById("highlight").innerHTML = listValues[minPosition];
  document.getElementById("highlight").style.visibility = "visible";
}

function swap() {
  if (minPosition == current) {
    document.getElementById("remark").innerHTML =
      "El elemento más pequeño es el primer elemento de la lista restante. No se necesita intercambiarlo.";
    return;
  } else {
    document.getElementById("remark").innerHTML =
      min + " es intercambiado con " + listValues[current];
  }

  listValues[minPosition] = listValues[current];
  listValues[current] = min;
  c = current;
  m = minPosition;

  if (current < minPosition) {
    posLoc1 = getElementPos(document.getElementById("list" + current));
    posLoc = getElementPos(document.getElementById("list" + minPosition));

    $("#highlight").animate(
      { top: posLoc.y - 55 },
      slowAnimationSpeed,
      function () {
        $("#highlight").animate(
          { left: posLoc1.x },
          slowAnimationSpeed,
          function () {
            $("#highlight").animate(
              { top: posLoc1.y - 6, left: posLoc1.x },
              slowAnimationSpeed,
              function () {
                id = "list" + c;
                document.getElementById(id).innerHTML = listValues[c];
              }
            );
          }
        );
      }
    );

    $("#currentFly").animate(
      { top: posLoc1.y - 55 },
      slowAnimationSpeed,
      function () {
        $("#currentFly").animate(
          { left: posLoc.x },
          slowAnimationSpeed,
          function () {
            $("#currentFly").animate(
              { top: posLoc.y - 6, left: posLoc.x },
              slowAnimationSpeed,
              function () {
                id = "list" + m;
                document.getElementById(id).innerHTML = listValues[m];
              }
            );
          }
        );
      }
    );
  }

  

}
