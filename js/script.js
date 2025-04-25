let currentFlag = null;
let currMode = null
let mode_countries = []
let progress_data = {}

let study = false;

const flagImg = document.getElementById("flag");
const optionsDiv = document.getElementById("options");
const resultText = document.getElementById("result");
const nextBtn = document.getElementById("next");


const mode_selector = document.getElementById("modesel");
const progress = document.getElementById("progress");
const game_container = document.getElementById("gamecont");

function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}

// let saved_data = null;

function loadFlag() {
	// pick a random flag

	currentFlag = mode_countries[Math.floor(Math.random() * mode_countries.length)];
	flagImg.src = currentFlag.flag_img;
	resultText.textContent = "";

	// pick 3 other random (wrong) flags
	const otherFlags = mode_countries.filter(f => f.name !== currentFlag.name);
	const randomWrongAnswers = shuffle(otherFlags).slice(0, 3);

	// mix correct + wrong options
	const allOptions = shuffle([
		currentFlag,
		...randomWrongAnswers
	]);

	// render buttons
	optionsDiv.innerHTML = "";
	allOptions.forEach(option => {
		const btn = document.createElement("button");
		btn.textContent = option.name;
		btn.onclick = () => {
			ok = (option.name === currentFlag.name);

			if (!study && (resultText.textContent != "❌ Wrong!")) {
				updateProgress(currentFlag.name, ok);
			}

			resultText.textContent = ok ? "✅ Correct!" : "❌ Wrong!";

			if (ok) {
				loadFlag();
			}

		};
		optionsDiv.appendChild(btn);
	});
}

function updateProgress(country, val) {
	if (progress_data[country]) {
		progress_data[country].flag_correct += (val ? 1 : -1);
		progress_data[country].flag_times += 1;
	}
	else {
		progress_data[country] = { "flag_correct": (val ? 1 : 0), "flag_times": 1 };
	}


	localStorage.setItem("progress", JSON.stringify(progress_data));
}

function set_current_mode(mode) {
	currMode = mode;
	if (mode == "All") {
		mode_countries = country_data;
	}
	else {
		mode_countries = country_data.filter(f => f.continent == mode);
	}

	study = false;
	loadFlag();
	showGame();
}

function initProgress() {
	let s = localStorage.getItem("progress");
	if (s) {
		progress_data = JSON.parse(s);
	}
	else {
		localStorage.setItem("progress", "{}");
	}
}
initProgress();




let last_view = mode_selector;

function showGame() {
	if (last_view){
		last_view.style.display = "none";
		game_container.style.display = "flex";
		last_view = game_container;
	}
}

function showMode() {
	if (last_view) {
		last_view.style.display = "none";
		mode_selector.style.display = "flex";
		last_view = mode_selector;
	}
}

function showProgress() {
	if (last_view) {
		last_view.style.display = "none";
		progress.style.display = "flex";
		last_view = progress;
	}

	progress.innerHTML = "";
	let c = Object.keys(progress_data);
	for (let i = 0; i < c.length; i++) {
		// let node = document.createElement("div");
		let p = document.createElement("p");

		let d = progress_data[c[i]];
		let per = d.flag_correct / d.flag_times;
		p.innerHTML = `${c[i]}: ${per * 100}%`

		progress.appendChild(p);
	}
	if (c.length > 0){
		let b = document.createElement("button");
		b.innerHTML = "Study";
		b.onclick = () => {
			mode_countries = country_data.filter(f => c.includes(f.name));
			study = true;
			loadFlag();
			showGame();
		}
		progress.appendChild(b);
	}
	else{
		let b = document.createElement("p");
		b.innerHTML = "No data to show";
		progress.appendChild(b);
	}
}