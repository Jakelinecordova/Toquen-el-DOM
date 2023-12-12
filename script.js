const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [];
let audio = new Audio();

const playTune = (key) => {
    const tunePath = `tunes/${key}.wav`;
    // Verificar si el archivo de audio existe antes de reproducirlo
    fetch(tunePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found');
            }
            audio.src = tunePath;
            audio.play();
        })
        .catch(error => {
            console.error('Error loading audio file:', error);
        });

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
};

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
};

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
};

const pressedKey = (e) => {
    if (allKeys.includes(e.key)) playTune(e.key);
};

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);