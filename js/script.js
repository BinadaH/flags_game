let currentFlag = null;
let currMode = null
let mode_countries = []

const flagImg = document.getElementById("flag");
const optionsDiv = document.getElementById("options");
const resultText = document.getElementById("result");
const nextBtn = document.getElementById("next");


const mode_selector = document.getElementById("modesel");
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
			let ok = false;
			if (option.name === currentFlag.name) {
				resultText.textContent = "✅ Correct!";
				ok = true;
				loadFlag();
			} else {
				resultText.textContent = `❌ Wrong!`;
			}
			
			// saved_data = localStorage.getItem("progress");
			// if (!saved_data){
			// 	localStorage.setItem("progress", {});
			// }
		};
		optionsDiv.appendChild(btn);
	});
}

function set_current_mode(mode) {
	currMode = mode;
	if (mode == "All"){
		mode_countries = country_data;		
	}
	else{
		mode_countries = country_data.filter(f => f.continent == mode);
	}
	console.log(mode_countries)
	mode_selector.style.display = "none";
	game_container.style.display = "flex";
	loadFlag();
}
