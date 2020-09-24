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

var haIniciado = 0;
var tiempoInicio;
var tiempoFinal;

function step1() {
  if (haIniciado === 0) {
    tiempoInicio = new Date();
    var nuevoArray = new Array(listValues.length);
    for(var i= 0; i< listValues.length; i++){
      nuevoArray[i] = listValues[i];
    }

    selectionSort(nuevoArray);
    
    tiempoFinal = new Date();   
    console.log(tiempoFinal - tiempoInicio);
    document.getElementById("velocidad").innerHTML = "</br>Tiempo de ejecución: " + (tiempoFinal - tiempoInicio) + " ms";
    tiempoInicio = new Date();
    haIniciado = 1;
  }
  if (current > SIZE - 2) {
    document.getElementById("highlight").style.visibility = "hidden";
    document.getElementById("currentFly").style.visibility = "hidden";
    tiempoFinal = new Date();
    var tiempoTotal = (tiempoFinal - tiempoInicio) / 1000;
    document.getElementById("remark").innerHTML = "La lista esta ordenada. Pulsa Reiniciar para ver la animación otravez. </br> Tiempo de la animacion: " + tiempoTotal + " seg </br>";
    
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

function selectionSort(arreglo){  
  for(var i = 0; i < SIZE - 1; i++){
    var menor = i;
    for(var j = i + 1; j < SIZE; j++){
      if(arreglo[j] < arreglo[menor]){
        menor = j;
      }
    }

    var temp = arreglo[menor];
    arreglo[menor] = arreglo[i];
    arreglo[i] = temp;
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
  console.log("gdsg" + minPosition);
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
