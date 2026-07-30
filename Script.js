/* ===================================================================
   MODULE: Admin Config & DevOps  (Om Prakash — 24MIS0562)
   Implements:
     UC-05  Configure Course Capacity Limits
     UC-06  Trigger Automated Container Deployment
   Exposed as window.AdminModule so the final combined build can feed
   newly configured courses straight into the shared course catalog
   used by Nithish's module.
=================================================================== */
agilsessss
let configuredCourses = [
  { code:'CSE3001', slot:'A1', credits:4, maxSeats:60 },
  { code:'CSE3002', slot:'B1', credits:4, maxSeats:60 },
];

const AdminModule = {
  validateCourseInput({ code, title, professor, slot, credits, capacity }){
    if(!code || !title || !professor || !slot || !credits){
      return { valid:false, message:'Configuration Error: Invalid Parameters Specified.' };
    }
    if(isNaN(capacity) || capacity < 0){
      return { valid:false, message:'Configuration Error: Invalid Parameters Specified.' };
    }
    return { valid:true };
  }
};
window.AdminModule = AdminModule;

const form            = document.getElementById('courseForm');
const formAlert       = document.getElementById('formAlert');
const configTableBody = document.getElementById('configTableBody');

function renderTable(){
  configTableBody.innerHTML = configuredCourses.map((c,i) => `
    <tr>
      <td class="mono">${c.code}</td>
      <td class="mono">${c.slot}</td>
      <td>${c.credits}</td>
      <td>${c.maxSeats}</td>
      <td><button class="remove-btn" data-i="${i}" title="Remove">✕</button></td>
    </tr>
  `).join('');
  configTableBody.querySelectorAll('.remove-btn').forEach(btn=>{
    btn.addEventListener('click', () => {
      configuredCourses.splice(Number(btn.dataset.i), 1);
      renderTable();
    });
  });
}

function showAlert(message, type){
  formAlert.textContent = message;
  formAlert.className = `alert ${type}`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    code: document.getElementById('f_code').value.trim().toUpperCase(),
    title: document.getElementById('f_title').value.trim(),
    professor: document.getElementById('f_prof').value.trim(),
    slot: document.getElementById('f_slot').value.trim().toUpperCase(),
    credits: Number(document.getElementById('f_credits').value),
    capacity: Number(document.getElementById('f_capacity').value)
  };

  const check = AdminModule.validateCourseInput(payload);
  if(!check.valid){
    showAlert(check.message, 'error');
    return;
  }

  configuredCourses.push({ code:payload.code, slot:payload.slot, credits:payload.credits, maxSeats:payload.capacity });
  renderTable();
  showAlert(`${payload.code} committed to the global course state.`, 'success');
  form.reset();
});

renderTable();

/* ------------------------- UC-06 pipeline simulation ------------------------- */

const pushBtn        = document.getElementById('pushBtn');
const injectFail      = document.getElementById('injectFail');
const pipelineStepsEl = document.getElementById('pipelineSteps');
const ciLogEl         = document.getElementById('ciLog');

const STEPS = ['Push detected', 'Install dependencies', 'Run lint', 'Build React bundle', 'Containerize (Docker)'];

function ciLog(text, cls=''){
  const span = cls ? `<span class="${cls}">${text}</span>` : text;
  ciLogEl.innerHTML += (ciLogEl.innerHTML ? '\n' : '') + `[${new Date().toLocaleTimeString()}] ${span}`;
  ciLogEl.scrollTop = ciLogEl.scrollHeight;
}

function renderChips(activeIndex, failedIndex){
  pipelineStepsEl.innerHTML = STEPS.map((s,i) => {
    let cls = 'step-chip';
    if(failedIndex !== null && i === failedIndex) cls += ' failed';
    else if(i < activeIndex) cls += ' done';
    else if(i === activeIndex) cls += ' running';
    return `<span class="${cls}">${s}</span>`;
  }).join('');
}

pushBtn.addEventListener('click', () => {
  pushBtn.disabled = true;
  ciLogEl.innerHTML = '';
  const willFail = injectFail.checked;
  const failAt = 2; // lint step

  let i = 0;
  renderChips(0, null);
  ciLog('GitHub Actions runner detected push to main');

  const interval = setInterval(() => {
    if(willFail && i === failAt){
      renderChips(i, i);
      ciLog(`✗ ${STEPS[i]} failed — static check violations found`, 'bad');
      ciLog('Pipeline Compilation Failure — halting, developers alerted via status badge.', 'bad');
      clearInterval(interval);
      pushBtn.disabled = false;
      return;
    }
    ciLog(`✓ ${STEPS[i]} passed`, 'ok');
    i++;
    if(i >= STEPS.length){
      renderChips(i, null);
      ciLog('Production-ready container image built and validated.', 'ok');
      clearInterval(interval);
      pushBtn.disabled = false;
      return;
    }
    renderChips(i, null);
  }, 550);
});