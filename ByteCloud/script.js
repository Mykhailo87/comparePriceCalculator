const storage = document.querySelector('.storage');
const transfer = document.querySelector('.transfer');
const backblazeGraph = document.querySelector('.backblaze_graph');
const bunnyGraph = document.querySelector('.bunny_graph');
const scalewayGraph = document.querySelector('.scaleway_graph');
const vulterGraph = document.querySelector('.vultr_graph');

const backblazeGraphValue = document.querySelector('.backblaze_graph_value');
const bunnyGraphValue = document.querySelector('.bunny_graph_value');
const scalewayGraphValue = document.querySelector('.scaleway_graph_value');
const vulterGraphValue = document.querySelector('.vultr_graph_value');

const storageHeader = document.querySelector('.storage_header');
const transferHeader = document.querySelector('.transfer_header');

const hddMarker = document.querySelector('.hdd');
const sddMarker = document.querySelector('.sdd');
const multiMarker = document.querySelector('.multi');
const singleMarker = document.querySelector('.single');

//Set color for markers which change modes in Bunny and Scaleway
hddMarker.style.backgroundColor = 'black';
singleMarker.style.backgroundColor = 'black';
//Set start value for changing mode in Bunny and Scaleway
let ssd = true;
let single = true;

//render innitial value of input graph
storageHeader.innerHTML = `Storage: ${storage.value} GB`;
transferHeader.innerHTML = `Transfer: ${transfer.value} GB`;

//rendering initial value of graphs
renderAllCharts();

//chenging modes of Bunny and Scaleway
hddMarker.addEventListener('click', function() {
	ssd = !ssd;
	chengingMode(ssd, hddMarker, sddMarker);
	renderAllCharts();
});

sddMarker.addEventListener('click', function() {
	ssd = !ssd;
	chengingMode(ssd, hddMarker, sddMarker);
	renderAllCharts();
});

multiMarker.addEventListener('click', function() {
	single = !single;
	chengingMode(single, singleMarker, multiMarker);
	renderAllCharts();
});

singleMarker.addEventListener('click', function() {
	single = !single;
	chengingMode(single, singleMarker, multiMarker);
	renderAllCharts();
});

//rerendering when chenge value of inputs
storage.addEventListener('input', gettingCurrentValue);
transfer.addEventListener('input', gettingCurrentValue);

//rerendering when changing size of window
window.addEventListener('resize', renderAllCharts);

//functions which calculate current value of inputs for every company and render it
function renderBunnyNet() {
	const bunnyNetStep = ssd ? 0.01 : 0.02;
	let bunnyNetPrice;
	if (+storage.value * bunnyNetStep + +transfer.value * 0.01 < 10) {
		bunnyNetPrice = +storage.value * bunnyNetStep + +transfer.value * 0.01;
	} else {
		bunnyNetPrice = 10;
	}

	bunnyGraphValue.innerHTML = `${bunnyNetPrice.toFixed(1)}$`;
	if (window.innerWidth < 700) {
		bunnyGraph.style.height = `${bunnyNetPrice * 5}px`;
		bunnyGraph.style.width = '2rem';
	} else {
		bunnyGraph.style.width = `${bunnyNetPrice * 5}px`;
		bunnyGraph.style.height = '2rem';
	}

	return bunnyNetPrice;
}

function renderScaleway() {
	const scaleWayStep = single ? 0.03 : 0.06;
	let scaleWayPrice;
	if (+storage.value - 75 < 0 && +transfer.value - 75 < 0) {
		scaleWayPrice = 0;
	} else if (+storage.value - 75 <= 0) {
		scaleWayPrice = (+transfer.value - 75) * 0.02;
	} else if (+transfer.value - 75 <= 0) {
		scaleWayPrice = (+storage.value - 75) * scaleWayStep;
	} else {
		scaleWayPrice = (+storage.value - 75) * scaleWayStep + (+transfer.value - 75) * 0.02;
	}

	scalewayGraphValue.innerHTML = `${scaleWayPrice.toFixed(1)}$`;
	if (window.innerWidth < 700) {
		scalewayGraph.style.height = scaleWayPrice < 40 ? `${scaleWayPrice * 5}px` : '200px';
		scalewayGraph.style.width = '2rem';
	} else {
		scalewayGraph.style.width = `${scaleWayPrice * 5}px`;
		scalewayGraph.style.height = '2rem';
	}

	return scaleWayPrice;
}

function renderBackBlack() {
	let backBlackPrice;
	if (+storage.value * 0.005 + +transfer.value * 0.01 > 7) {
		backBlackPrice = +storage.value * 0.005 + +transfer.value * 0.01;
	} else {
		backBlackPrice = 7;
	}

	backblazeGraphValue.innerHTML = `${backBlackPrice.toFixed(1)}$`;
	if (window.innerWidth < 700) {
		backblazeGraph.style.height = `${backBlackPrice * 5}px`;
		backblazeGraph.style.width = '2rem';
	} else {
		backblazeGraph.style.width = `${backBlackPrice * 5}px`;
		backblazeGraph.style.height = '2rem';
	}
	return backBlackPrice;
}

function renderVulter() {
	let vultrPrice;
	if (+storage.value * 0.01 + +transfer.value * 0.01 < 5) {
		vultrPrice = 5;
	} else {
		vultrPrice = +storage.value * 0.01 + +transfer.value * 0.01;
	}

	vulterGraphValue.innerHTML = `${vultrPrice.toFixed(1)}$`;

	if (window.innerWidth < 700) {
		vulterGraph.style.height = `${vultrPrice * 5}px`;
		vulterGraph.style.width = '2rem';
	} else {
		vulterGraph.style.width = `${vultrPrice * 5}px`;
		vulterGraph.style.height = '2rem';
	}

	return vultrPrice;
}

//function that render charts
function renderAllCharts() {
	renderBackBlack();
	renderBunnyNet();
	renderScaleway();
	renderVulter();

	renderBackBlack() <= renderBunnyNet() &&
	renderBackBlack() <= renderScaleway() &&
	renderBackBlack() <= renderVulter()
		? (backblazeGraph.style.backgroundColor = 'red')
		: (backblazeGraph.style.backgroundColor = 'gray');
	renderBunnyNet() <= renderBackBlack() && renderBunnyNet() <= renderScaleway() && renderBunnyNet() <= renderVulter()
		? (bunnyGraph.style.backgroundColor = 'orange')
		: (bunnyGraph.style.backgroundColor = 'gray');
	renderScaleway() <= renderBackBlack() && renderScaleway() <= renderBunnyNet() && renderScaleway() <= renderVulter()
		? (scalewayGraph.style.backgroundColor = 'rgb(82, 25, 139)')
		: (scalewayGraph.style.backgroundColor = 'gray');
	renderVulter() <= renderBackBlack() && renderVulter() <= renderBunnyNet() && renderVulter() <= renderScaleway()
		? (vulterGraph.style.backgroundColor = 'blue')
		: (vulterGraph.style.backgroundColor = 'gray');
}

//function that get current value and rerendering page
function gettingCurrentValue() {
	storageHeader.innerHTML = `Storage: ${storage.value} GB`;
	transferHeader.innerHTML = `Transfer: ${transfer.value} GB`;

	renderAllCharts();
}

//function that changing mode
function chengingMode(boolean, firstMarker, secondMarker) {
	if (!boolean) {
		firstMarker.style.backgroundColor = 'white';
		secondMarker.style.backgroundColor = 'black';
	} else {
		firstMarker.style.backgroundColor = 'black';
		secondMarker.style.backgroundColor = 'white';
	}
}
