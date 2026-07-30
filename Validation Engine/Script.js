const ValidationEngine = {
  checkSlotClash(registeredSlots, candidateSlot){
    const t0 = performance.now();
    const clash = registeredSlots.includes(candidateSlot);
    const t1 = performance.now();
    return {
      valid: !clash,
      message: clash ? 'Slot Clashing Conflict Detected' : 'No conflict — slot is clear.',
      ms: +(t1 - t0).toFixed(4)
    };
  },

  checkSeatCapacity(course){
    const t0 = performance.now();
    const hasSeats = course.seatsLeft > 0;
    const t1 = performance.now();
    return {
      valid: hasSeats,
      message: hasSeats
        ? Capacity clear — ${course.seatsLeft} seat(s) remaining.
        : 'Course Registration Failed: Slot Capacity Full',
      ms: +(t1 - t0).toFixed(4)
    };
  },

  runPipeline(registeredSlots, course){
    const steps = [];
    const clash = this.checkSlotClash(registeredSlots, course.slot);
    steps.push({ label: UC-02 Slot Clash (${course.slot}), ...clash });
    if(!clash.valid){
      return { passed:false, steps };
    }
    const capacity = this.checkSeatCapacity(course);
    steps.push({ label: UC-03 Seat Capacity (${course.code}), ...capacity });
    return { passed: capacity.valid, steps };
  }
};

window.ValidationEngine = ValidationEngine;

/* ------------------------- Demo console wiring ------------------------- */

let registeredSlots = ['B1']; // seed ledger so the tester has something to clash against

const DEMO_COURSES = [
  { code:'CSE3001', slot:'A1', seatsLeft:4 },
  { code:'CSE3002', slot:'B1', seatsLeft:0 },
  { code:'CSE3011', slot:'C1', seatsLeft:12 },
  { code:'CSE3041', slot:'E1', seatsLeft:0 },
];

const slotLedgerEl   = document.getElementById('slotLedger');
const ledgerInput    = document.getElementById('ledgerInput');
const clashInput     = document.getElementById('clashInput');
const clashResultEl  = document.getElementById('clashResult');
const courseSelect   = document.getElementById('courseSelect');
const capacityResultEl = document.getElementById('capacityResult');
const pipelineSelect = document.getElementById('pipelineSelect');
const pipelineLogEl  = document.getElementById('pipelineLog');

function renderLedger(){
  slotLedgerEl.innerHTML = registeredSlots.length
    ? registeredSlots.map(s => <span class="ledger-chip">${s}</span>).join('')
    : <span class="ledger-empty">Ledger is empty — add a slot code to begin.</span>;
}

function populateSelects(){
  const opts = DEMO_COURSES.map(c => <option value="${c.code}">${c.code} · slot ${c.slot} · ${c.seatsLeft} seats</option>).join('');
  courseSelect.innerHTML = opts;
  pipelineSelect.innerHTML = opts;
}

document.getElementById('ledgerAdd').addEventListener('click', () => {
  const val = ledgerInput.value.trim().toUpperCase();
  if(!val) return;
  registeredSlots.push(val);
  ledgerInput.value = '';
  renderLedger();
});
document.getElementById('ledgerClear').addEventListener('click', () => {
  registeredSlots = [];
  renderLedger();
});

document.getElementById('clashRun').addEventListener('click', () => {
  const val = clashInput.value.trim().toUpperCase();
  if(!val) return;
  const res = ValidationEngine.checkSlotClash(registeredSlots, val);
  clashResultEl.className = 'result ' + (res.valid ? 'pass' : 'fail');
  clashResultEl.innerHTML = ${res.message}<span class="timing">resolved in ${res.ms} ms</span>;
});

document.getElementById('capacityRun').addEventListener('click', () => {
  const course = DEMO_COURSES.find(c => c.code === courseSelect.value);
  const res = ValidationEngine.checkSeatCapacity(course);
  capacityResultEl.className = 'result ' + (res.valid ? 'pass' : 'fail');
  capacityResultEl.innerHTML = ${res.message}<span class="timing">resolved in ${res.ms} ms</span>;
});

function logLine(text, cls=''){
  const span = cls ? <span class="${cls}">${text}</span> : text;
  pipelineLogEl.innerHTML += (pipelineLogEl.innerHTML ? '\n' : '') + [${new Date().toLocaleTimeString()}] ${span};
  pipelineLogEl.scrollTop = pipelineLogEl.scrollHeight;
}

document.getElementById('pipelineRun').addEventListener('click', () => {
  const course = DEMO_COURSES.find(c => c.code === pipelineSelect.value);
  logLine(Pipeline started for ${course.code} (slot ${course.slot}));
  const result = ValidationEngine.runPipeline(registeredSlots, course);
  result.steps.forEach(step => {
    logLine(${step.label} → ${step.message}  (${step.ms} ms), step.valid ? 'ok' : 'bad');
  });
  logLine(result.passed ? 'PIPELINE PASSED — ready for UC-04 lock.' : 'PIPELINE HALTED.', result.passed ? 'ok' : 'bad');
});

document.getElementById('pipelineReset').addEventListener('click', () => {
  pipelineLogEl.innerHTML = '';
});

renderLedger();
populateSelects();