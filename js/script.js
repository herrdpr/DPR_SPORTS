const teams = ["Arsenal", "Manchester City", "Liverpool", "Chelsea", "Tottenham", "Newcastle", "Aston Villa", "Manchester United", "Brighton", "West Ham", "Juventus", "Inter", "Milan", "Napoli", "Roma", "Lazio", "PSG", "Marseille", "Barcelona", "Real Madrid", "Atletico Madrid", "FCSB", "CFR Cluj", "Porto", "Benfica", "Ajax", "PSV", "Anderlecht", "Club Brugge"];

function autocomplete(inp, arr) {
  inp.addEventListener("input", function() {
    const val = this.value;
    closeAllLists();
    if (!val) return false;
    const listDiv = document.createElement("div");
    listDiv.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(listDiv);
    arr.filter(team => team.toLowerCase().includes(val.toLowerCase())).slice(0, 10).forEach(team => {
      const item = document.createElement("div");
      item.innerHTML = `<strong>${team.substr(0, val.length)}</strong>${team.substr(val.length)}`;
      item.addEventListener("click", function() {
        inp.value = team; closeAllLists();
      });
      listDiv.appendChild(item);
    });
  });
  function closeAllLists() { document.querySelectorAll('.autocomplete-items').forEach(el => el.remove()); }
  document.addEventListener("click", function (e) { closeAllLists(e.target); });
}
autocomplete(document.getElementById('team1'), teams);
autocomplete(document.getElementById('team2'), teams);

document.getElementById('modeSwitch').addEventListener('change', e => {
  document.body.classList.toggle('dark-mode'); document.body.classList.toggle('light-mode');
});

document.getElementById('createMatch').addEventListener('click', () => {
  const t1 = team1.value, t2 = team2.value, d = dateMatch.value, tm = timeMatch.value, p = prediction.value;
  if(!t1 || !t2 || !d || !tm || !p){ alert('Completează toate câmpurile!'); return; }
  const div = document.createElement('div');
  div.className = 'card card-band-a mb-2 shadow-sm border-0';
  div.innerHTML = `<div class='card-body py-2'><div class='d-flex justify-content-between align-items-center'><div class='fw-semibold text-light'>${t1} <span class='text-secondary'>vs</span> ${t2}</div><div class='text-end small'><div class='fw-semibold text-light'>${tm}</div><div class='text-muted'>${d}</div></div></div><div class='mt-2 d-flex flex-wrap gap-1'><span class='badge bg-dark-subtle dark-mode'>Piață: ${p}</span></div></div>`;
  matchesContainer.appendChild(div);
  team1.value = team2.value = dateMatch.value = timeMatch.value = prediction.value = '';
});