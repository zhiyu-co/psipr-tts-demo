const samples = {
  zh: [
    ["seed", "00005283-00000056", "预计明天全省还会以阳光明媚的天气为主。", "菲律宾渔业代表，观察当地渔民养殖的鱼苗。"],
    ["seed", "00005308-00000023", "他是一他像一块石头一样凝然不动。", "被称赞了真开心啊，我有那么帅该多好啊。"],
    ["seed", "10002841-00000044", "提升服务标准，持续为用户创造价值。", "北京在出行规模，城市影响力方面表现优异。"],
    ["seed", "10002832-00000021", "体验是稳定，是和预期相符的正确性。", "导航导航开始，全程二十五公里，预计需要十二分钟。"],
    ["seed", "00005498-00000075", "雄鹿今天官方宣布与后卫托尼斯内尔签约。", "由于逃窜中十分疲惫，他打算到红海市场附近一家网吧休息。"],
    ["cv3", "108", "格尔利茨公园是德国首都柏林的一座公园，位于十字山。", "其中包括在江苏省高邮建立南方第一处真耶稣教会。"],
    ["seed", "10003252-00000021", "互联网已经成为一种解决方案的应用层。", "导航开始，全程二十五公里，预计需要十二分钟。"]
  ],
  en: [
    ["seed", "common_voice_en_37793802-common_voice_en_37793803", "It has traditionally been used for growth of human lymphocytes.", "The equipment needed to do this includes rock saws and polishers."],
    ["cv3", "112", "It makes cooking for others much more interesting.", "We're nearing the end of the beginning, and that feels great!"],
    ["seed", "common_voice_en_23815833-common_voice_en_23815835", "The joke originated on Usenet, and has appeared in several online parodies.", "However, the music from the former anthem was retained."],
    ["cv3", "404", "However, they are not thought to have caused any damage to the shuttle.", "Fewer than a thousand cases have ever been reported in humans, but some of them have been fatal."],
    ["cv3", "92", "Everywhere there were stalls with items for sale.", "Birds of a feather flock - together"],
    ["cv3", "143", "Stop treating me like a child.", "Nowhatta area has eighteen sub-communities Mohalla."],
    ["seed", "common_voice_en_18533403-common_voice_en_18533404", "We will not take up her early history.", "Increment the order quantity if you require more than one item."]
  ]
};

const systems = [
  ["base", "Base"],
  ["point", "AudioLLM-Point"],
  ["ours", "PSIPR"]
];

const escapeHtml = (value) => value.replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);

function player(language, dataset, id, system, label) {
  const tag = system === "ours" ? '<span class="ours-tag">Ours</span>' : "";
  return `<div class="player ${system}"><div class="player-label"><span>${label}</span>${tag}</div><audio controls preload="none"><source src="audios_speechjudge/${language}/${dataset}__${id}/${system}.wav" type="audio/wav">Your browser does not support audio playback.</audio></div>`;
}

function render(language) {
  const list = document.querySelector("#sample-list");
  list.innerHTML = samples[language].map(([dataset, id, prompt, target], index) => `
    <article class="sample-card">
      <div class="sample-meta">
        <div class="sample-index">${String(index + 1).padStart(2, "0")}</div>
        <div class="sample-text">
          <p class="target"><span class="dataset-tag">${dataset === "seed" ? "Seed-TTS" : "CV3-Eval"}</span>${escapeHtml(target)}</p>
          <p class="prompt"><b>Reference text</b> &nbsp;${escapeHtml(prompt)}</p>
        </div>
      </div>
      <div class="players">${systems.map(([system, label]) => player(language, dataset, id, system, label)).join("")}</div>
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
}, true);

render("zh");
