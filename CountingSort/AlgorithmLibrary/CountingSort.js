function CountingSort(am, w, h) {
	this.init(am, w, h);

}


var ARRAY_SIZE = 1;
while (ARRAY_SIZE < 2) {
	ARRAY_SIZE = prompt("Introduce el tamaño del arreglo", 2);
}

var ARRAY_ELEM_WIDTH = 30;
var ARRAY_ELEM_HEIGHT = 30;
var ARRAY_ELEM_START_X = 20;

var COUNTER_ARRAY_ELEM_WIDTH = 30;
var COUNTER_ARRAY_ELEM_HEIGHT = 30;
var COUNTER_ARRAY_ELEM_START_X = 20;

var MAX_DATA_VALUE = ARRAY_SIZE;
var COUNTER_ARRAY_SIZE = parseInt(ARRAY_SIZE) + 1;

CountingSort.prototype = new Algorithm();
CountingSort.prototype.constructor = CountingSort;
CountingSort.superclass = Algorithm.prototype;

CountingSort.prototype.init = function (am, w, h) {
	this.ARRAY_ELEM_Y = 3 * COUNTER_ARRAY_ELEM_HEIGHT;
	this.COUNTER_ARRAY_ELEM_Y = Math.floor(h / 2);
	this.SWAP_ARRAY_ELEM_Y = h - 3 * COUNTER_ARRAY_ELEM_HEIGHT

	var sc = CountingSort.superclass;
	var fn = sc.init;
	fn.call(this, am, w, h);
	this.addControls();
	this.nextIndex = 0;
	this.setup();
}

CountingSort.prototype.sizeChanged = function (newWidth, newHeight) {
	this.ARRAY_ELEM_Y = 3 * COUNTER_ARRAY_ELEM_HEIGHT;
	this.COUNTER_ARRAY_ELEM_Y = Math.floor(newHeight / 2);
	this.SWAP_ARRAY_ELEM_Y = newHeight - 3 * COUNTER_ARRAY_ELEM_HEIGHT
	this.setup();
}


CountingSort.prototype.addControls = function () {
	this.resetButton = addControlToAlgorithmBar("Button", "Array aleatoria");
	this.resetButton.onclick = this.resetCallback.bind(this);

	this.countingsSortButton = addControlToAlgorithmBar("Button", "Counting Sort");
	this.countingsSortButton.onclick = this.countingSortCallback.bind(this);

}



CountingSort.prototype.setup = function () {
	this.arrayData = new Array(ARRAY_SIZE);
	this.arrayRects = new Array(ARRAY_SIZE);
	this.arrayIndices = new Array(ARRAY_SIZE);

	this.counterData = new Array(COUNTER_ARRAY_SIZE);
	this.counterRects = new Array(COUNTER_ARRAY_SIZE);
	this.counterIndices = new Array(COUNTER_ARRAY_SIZE);

	this.swapData = new Array(ARRAY_SIZE);
	this.swapRects = new Array(ARRAY_SIZE);
	this.swapIndices = new Array(ARRAY_SIZE);

	this.commands = new Array();

	this.animationManager.resetAll();
	for (var i = 0; i < ARRAY_SIZE; i++) {
		var nextID = this.nextIndex++;
		this.arrayData[i] = Math.floor(Math.random() * MAX_DATA_VALUE);
		
		this.cmd("CreateRectangle", nextID, this.arrayData[i], ARRAY_ELEM_WIDTH, ARRAY_ELEM_HEIGHT, ARRAY_ELEM_START_X + i * ARRAY_ELEM_WIDTH, this.ARRAY_ELEM_Y)
		this.arrayRects[i] = nextID;
		nextID = this.nextIndex++;
		this.arrayIndices[i] = nextID;
		this.cmd("CreateLabel", nextID, i, ARRAY_ELEM_START_X + i * ARRAY_ELEM_WIDTH, this.ARRAY_ELEM_Y + ARRAY_ELEM_HEIGHT);
		this.cmd("SetForegroundColor", nextID, "#0000FF");

		nextID = this.nextIndex++;
		this.cmd("CreateRectangle", nextID, "", ARRAY_ELEM_WIDTH, ARRAY_ELEM_HEIGHT, ARRAY_ELEM_START_X + i * ARRAY_ELEM_WIDTH, this.SWAP_ARRAY_ELEM_Y)
		this.swapRects[i] = nextID;
		nextID = this.nextIndex++;
		this.swapIndices[i] = nextID;
		this.cmd("CreateLabel", nextID, i, ARRAY_ELEM_START_X + i * ARRAY_ELEM_WIDTH, this.SWAP_ARRAY_ELEM_Y + ARRAY_ELEM_HEIGHT);
		this.cmd("SetForegroundColor", nextID, "#0000FF");

	}
	for (i = COUNTER_ARRAY_SIZE - 1; i >= 0; i--) {
		nextID = this.nextIndex++;
		this.cmd("CreateRectangle", nextID, "", COUNTER_ARRAY_ELEM_WIDTH, COUNTER_ARRAY_ELEM_HEIGHT, COUNTER_ARRAY_ELEM_START_X + i * COUNTER_ARRAY_ELEM_WIDTH, this.COUNTER_ARRAY_ELEM_Y)
		this.counterRects[i] = nextID;
		nextID = this.nextIndex++;
		this.counterIndices[i] = nextID;
		this.cmd("CreateLabel", nextID, i, COUNTER_ARRAY_ELEM_START_X + i * COUNTER_ARRAY_ELEM_WIDTH, this.COUNTER_ARRAY_ELEM_Y + COUNTER_ARRAY_ELEM_HEIGHT);
		this.cmd("SetForegroundColor", nextID, "#0000FF");
	}
	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
	var nuevoArray = new Array(this.arrayData.length);
	for(var i= 0; i< this.arrayData.length; i++){
		console.log("Indice: " + i + " = " + this.arrayData[i]);
		nuevoArray[i] = this.arrayData[i];
	}
	var startTime = new Date();	
	algoritmoCountingSort(nuevoArray);	
	var finishTime = new Date();
	console.log("Tiempo de ejecucion: " + (finishTime - startTime) + " ms ");
	document.getElementById("tiempo").innerHTML = "Tiempo de ejecucion: " + (finishTime - startTime) + " ms ";
	
}

//ACA ESTA EL ERROR

function algoritmoCountingSort(A) {
	console.log(A);	
	var n = A.length;
	var salida = new Array(n)
	var contador = new Array(n + 1);
	for (var i = 0; i < n + 1; i++) {
		contador[i] = 0;
	}

	for (var i = 1; i < n; i++) {
		contador[A[i]]++;
	}

	for (var i = 1; i < n + 1; i++) {
		contador[i] += contador[i - 1];
	}

	for (var i = 1; i < n + 1; i++) {
		salida[contador[A[i]] - 1] = A[i];
		--contador[A[i]];
	}

	for (var i = 1; i < n + 1; i++) {
		A[i] = salida[i];
	}

}

CountingSort.prototype.resetAll = function (small) {
	this.animationManager.resetAll();
	this.nextIndex = 0;
}

CountingSort.prototype.countingSortCallback = function (event) {
	this.commands = new Array();
	var animatedCircleID = this.nextIndex++;
	var animatedCircleID2 = this.nextIndex++;
	var animatedCircleID3 = this.nextIndex++;
	var animatedCircleID4 = this.nextIndex++;
	
	for (var i = 0; i < COUNTER_ARRAY_SIZE; i++) {
		this.counterData[i] = 0;
		this.cmd("SetText", this.counterRects[i], 0);
	}
	for (i = 0; i < ARRAY_SIZE; i++) {
		this.cmd("CreateHighlightCircle", animatedCircleID, "#0000FF", ARRAY_ELEM_START_X + i * ARRAY_ELEM_WIDTH, this.ARRAY_ELEM_Y);
		this.cmd("CreateHighlightCircle", animatedCircleID2, "#0000FF", ARRAY_ELEM_START_X + i * ARRAY_ELEM_WIDTH, this.ARRAY_ELEM_Y);
		var index = this.arrayData[i];
		this.cmd("Move", animatedCircleID, COUNTER_ARRAY_ELEM_START_X + index * COUNTER_ARRAY_ELEM_WIDTH, this.COUNTER_ARRAY_ELEM_Y + COUNTER_ARRAY_ELEM_HEIGHT)
		this.cmd("Step");
		this.counterData[index]++;
		this.cmd("SetText", this.counterRects[this.arrayData[i]], this.counterData[this.arrayData[i]]);
	
		this.cmd("Step");
		this.cmd("SetAlpha", this.arrayRects[i], 0.2);
		this.cmd("Delete", animatedCircleID);
		this.cmd("Delete", animatedCircleID2);
	}
	for (i = 1; i < COUNTER_ARRAY_SIZE; i++) {
		this.cmd("SetHighlight", this.counterRects[i - 1], 1);
		this.cmd("SetHighlight", this.counterRects[i], 1);
		this.cmd("Step")
		this.counterData[i] = this.counterData[i] + this.counterData[i - 1];
		this.cmd("SetText", this.counterRects[i], this.counterData[i]);
	
		this.cmd("Step")
		this.cmd("SetHighlight", this.counterRects[i - 1], 0);
		this.cmd("SetHighlight", this.counterRects[i], 0);
	}
	for (i = ARRAY_SIZE - 1; i >= 0; i--) {
		this.cmd("SetAlpha", this.arrayRects[i], 1.0);
	}
	for (i = ARRAY_SIZE - 1; i >= 0; i--) {
		this.cmd("CreateHighlightCircle", animatedCircleID, "#0000FF", ARRAY_ELEM_START_X + i * ARRAY_ELEM_WIDTH, this.ARRAY_ELEM_Y);
		this.cmd("CreateHighlightCircle", animatedCircleID2, "#0000FF", ARRAY_ELEM_START_X + i * ARRAY_ELEM_WIDTH, this.ARRAY_ELEM_Y);

		index = this.arrayData[i];
		this.cmd("Move", animatedCircleID2, COUNTER_ARRAY_ELEM_START_X + index * COUNTER_ARRAY_ELEM_WIDTH, this.COUNTER_ARRAY_ELEM_Y + COUNTER_ARRAY_ELEM_HEIGHT)
		this.cmd("Step");

		var insertIndex = --this.counterData[this.arrayData[i]];
		this.cmd("SetText", this.counterRects[this.arrayData[i]], this.counterData[this.arrayData[i]]); //ACA
	
		this.cmd("Step");

		this.cmd("CreateHighlightCircle", animatedCircleID3, "#AAAAFF", COUNTER_ARRAY_ELEM_START_X + index * COUNTER_ARRAY_ELEM_WIDTH, this.COUNTER_ARRAY_ELEM_Y);
		this.cmd("CreateHighlightCircle", animatedCircleID4, "#AAAAFF", COUNTER_ARRAY_ELEM_START_X + index * COUNTER_ARRAY_ELEM_WIDTH, this.COUNTER_ARRAY_ELEM_Y);

		this.cmd("Move", animatedCircleID4, ARRAY_ELEM_START_X + insertIndex * ARRAY_ELEM_WIDTH, this.SWAP_ARRAY_ELEM_Y + COUNTER_ARRAY_ELEM_HEIGHT)
		this.cmd("Step");

		var moveLabel = this.nextIndex++;
		this.cmd("SetText", this.arrayRects[i], "");
		this.cmd("CreateLabel", moveLabel, this.arrayData[i], ARRAY_ELEM_START_X + i * ARRAY_ELEM_WIDTH, this.ARRAY_ELEM_Y);
		this.cmd("Move", moveLabel, ARRAY_ELEM_START_X + insertIndex * ARRAY_ELEM_WIDTH, this.SWAP_ARRAY_ELEM_Y);
		this.swapData[insertIndex] = this.arrayData[i];
		this.cmd("Step");
		this.cmd("Delete", moveLabel);
		this.nextIndex--;  // Reuse index from moveLabel, now that it has been removed.
		this.cmd("SetText", this.swapRects[insertIndex], this.swapData[insertIndex]); //ACA
	
		this.cmd("Delete", animatedCircleID);
		this.cmd("Delete", animatedCircleID2);
		this.cmd("Delete", animatedCircleID3);
		this.cmd("Delete", animatedCircleID4);

	}
	for (i = 0; i < ARRAY_SIZE; i++) {
		this.cmd("SetText", this.arrayRects[i], "");
	}

	for (i = 0; i < COUNTER_ARRAY_SIZE; i++) {
		this.cmd("SetAlpha", this.counterRects[i], 0.05);
		this.cmd("SetAlpha", this.counterIndices[i], 0.05);
	}

	this.cmd("Step");
	var startLab = this.nextIndex;
	for (i = 0; i < ARRAY_SIZE; i++) {
		this.cmd("CreateLabel", startLab + i, this.swapData[i], ARRAY_ELEM_START_X + i * ARRAY_ELEM_WIDTH, this.SWAP_ARRAY_ELEM_Y);
		this.cmd("Move", startLab + i, ARRAY_ELEM_START_X + i * ARRAY_ELEM_WIDTH, this.ARRAY_ELEM_Y);
		this.cmd("SetText", this.swapRects[i], "");

	}
	this.cmd("Step");
	for (i = 0; i < ARRAY_SIZE; i++) {
		this.arrayData[i] = this.swapData[i];
		this.cmd("SetText", this.arrayRects[i], this.arrayData[i]); //ESTE
		this.cmd("Delete", startLab + i);
	}
	for (i = 0; i < COUNTER_ARRAY_SIZE; i++) {
		this.cmd("SetAlpha", this.counterRects[i], 1);
		this.cmd("SetAlpha", this.counterIndices[i], 1);
	}
	
	
	this.animationManager.StartNewAnimation(this.commands);

}

CountingSort.prototype.randomizeArray = function () {
	this.commands = new Array();
	for (var i = 0; i < ARRAY_SIZE; i++) {
		this.arrayData[i] = Math.floor(1 + Math.random() * MAX_DATA_VALUE);
		this.cmd("SetText", this.arrayRects[i], this.arrayData[i]);
	}

	for (i = 0; i < COUNTER_ARRAY_SIZE; i++) {
		this.cmd("SetText", this.counterRects[i], "");
	}
	
	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
	
}



// We want to (mostly) ignore resets, since we are disallowing undoing 
CountingSort.prototype.reset = function () {
	this.commands = new Array();
}


CountingSort.prototype.resetCallback = function (event) {
	this.randomizeArray();
}



CountingSort.prototype.disableUI = function (event) {
	this.resetButton.disabled = true;
	this.countingsSortButton.disabled = true;
}
CountingSort.prototype.enableUI = function (event) {
	this.resetButton.disabled = false;
	this.countingsSortButton.disabled = false;
}

var currentAlg;

function init() {
	var animManag = initCanvas();

	currentAlg = new CountingSort(animManag, canvas.width, canvas.height);
}