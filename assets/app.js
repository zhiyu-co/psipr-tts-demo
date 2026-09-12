const samples = window.DEMO_SAMPLES;
const audioRoot = "audios_speechjudge_strict";

const systems = [
  ["base", "Base"],
  ["mos", "MOS Predictor"],
  ["cer", "CER–NLL"],
  ["point", "AudioLLM-Point"],
  ["ours", "PSIPR"]
];

const escapeHtml = (value) => value.replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);

function player(language, pathKey, system, label) {
  const tag = system === "ours" ? '<span class="ours-tag">Ours</span>' : "";
  return `<div class="player ${system}"><div class="player-label"><span>${label}</span>${tag}</div><audio controls preload="none" aria-label="${label} synthesized audio"><source src="${audioRoot}/${language}/${pathKey}/${system}.wav" type="audio/wav">Your browser does not support audio playback.</audio></div>`;
}

function render(language) {
  const list = document.querySelector("#sample-list");
  list.innerHTML = samples[language].map((sample, index) => `
    <article class="sample-card">
      <div class="sample-meta">
        <div class="sample-index">${String(index + 1).padStart(2, "0")}</div>
        <div class="sample-text">
          <p class="target"><span class="dataset-tag">${sample.datasetLabel}</span>${escapeHtml(sample.target)}</p>
          <p class="prompt"><b>Reference text</b> &nbsp;${escapeHtml(sample.prompt)}</p>
          <div class="reference-audio">
            <span>Prompt audio</span>
            <audio controls preload="none" aria-label="Speaker prompt audio"><source src="${audioRoot}/${language}/${sample.pathKey}/prompt.wav" type="audio/wav">Your browser does not support audio playback.</audio>
          </div>
        </div>
      </div>
      <div class="players">${systems.map(([system, label]) => player(language, sample.pathKey, system, label)).join("")}</div>
    </article>`).join("");
}

document.querySelectorAll("[data-language]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-language]").forEach(item => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-selected", item === button ? "true" : "false");
    });
    document.querySelectorAll("audio").forEach(audio => audio.pause());
    render(button.dataset.language);
  });
});

document.addEventListener("play", event => {
  if (event.target.tagName !== "AUDIO") return;
  document.querySelectorAll("audio").forEach(audio => {
    if (audio !== event.target) audio.pause();
  });
  document.querySelectorAll(".player, .reference-audio").forEach(item => item.classList.remove("playing"));
  event.target.closest(".player, .reference-audio")?.classList.add("playing");
}, true);

document.addEventListener("pause", event => {
  if (event.target.tagName !== "AUDIO") return;
  event.target.closest(".player, .reference-audio")?.classList.remove("playing");
}, true);

document.querySelector("#stop-all").addEventListener("click", () => {
  document.querySelectorAll("audio").forEach(audio => audio.pause());
});

render("zh");
