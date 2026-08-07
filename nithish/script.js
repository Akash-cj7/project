/* ===================================================================
   MODULE: Catalog & Enrollment  (Nithish Kumar — 24MIS0424)
   Implements:
     UC-01  Browse Live Course Catalog
     UC-04  Finalize Enrollment & Lock Slots
   Standalone stub versions of the slot-clash / capacity checks are
   included here so this module runs on its own. In the final
   combined build, these calls are swapped for Akash's authoritative
   ValidationEngine module (see /final-website/js/).
=================================================================== */

const SLOTS = ['A1','A2','B1','B2','C1','C2','D1','D2','E1','E2','F1','F2'];
const MAX_CREDITS = 24;

let COURSES = [
  { code:'CSE3001', title:'Advanced Data Structures', professor:'Dr. R. Menon', credits:4, slot:'A1', maxSeats:60, seatsLeft:4 },
  { code:'CSE3002', title:'Operating Systems',          professor:'Dr. K. Iyer',  credits:4, slot:'B1', maxSeats:60, seatsLeft:0 },
  { code:'CSE3011', title:'Cloud Computing',             professor:'Dr. S. Nair',  credits:3, slot:'C1', maxSeats:50, seatsLeft:12 },
  { code:'CSE3021', title:'Machine Learning',            professor:'Dr. P. Rao',   credits:4, slot:'A1', maxSeats:55, seatsLeft:8 },
  { code:'CSE3031', title:'Blockchain Fundamentals',     professor:'Dr. T. Verma', credits:3, slot:'D1', maxSeats:40, seatsLeft:40 },
  { code:'CSE3041', title:'DevOps & CI/CD',              professor:'Dr. A. Krishnan', credits:3, slot:'E1', maxSeats:45, seatsLeft:3 },
];

let registered = []; // student's locked-in courses (array state, no persistence per project scope)

const catalogGrid   = document.getElementById('catalogGrid');
const emptyState    = document.getElementById('emptyState');
const timetableGrid = document.getElementById('timetableGrid');
const registeredList= document.getElementById('registeredList');
const creditCounter = document.getElementById('creditCounter');
const searchInput   = document.getElementById('searchInput');
const toastRoot      = document.getElementById('toastRoot');

function showToast(message, type='success'){
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message;
  toastRoot.appendChild(el);
  setTimeout(()=> el.remove(), 3200);
}

function seatBadgeClass(course){
  if(course.seatsLeft <= 0) return 'full';
  if(course.seatsLeft <= 5) return 'low';
  return 'ok';
}

function renderCatalog(filter=''){
  const q = filter.trim().toLowerCase();
  const visible = COURSES.filter(c =>
    c.code.toLowerCase().includes(q) ||
    c.title.toLowerCase().includes(q) ||
    c.professor.toLowerCase().includes(q)
  );

  // UC-01 exception: Empty Catalog
  if(COURSES.length === 0){
    catalogGrid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  catalogGrid.innerHTML = visible.map(c => `
    <div class="course-card ${c.seatsLeft<=0 ? 'is-full':''}">
      <div class="course-card-top">
        <span class="course-code mono">${c.code}</span>
        <span class="slot-pill">${c.slot}</span>
      </div>
      <div class="course-title">${c.title}</div>
      <div class="course-meta">${c.professor} · ${c.credits} credits</div>
      <div class="course-bottom">
        <span class="seat-badge ${seatBadgeClass(c)}">${c.seatsLeft} / ${c.maxSeats} seats</span>
        <button class="register-btn" data-code="${c.code}" ${c.seatsLeft<=0?'disabled':''}>
          ${c.seatsLeft<=0 ? 'Full' : 'Register'}
        </button>
      </div>
    </div>
  `).join('');

  catalogGrid.querySelectorAll('.register-btn').forEach(btn=>{
    btn.addEventListener('click', () => registerCourse(btn.dataset.code));
  });
}

function renderTimetable(){
  timetableGrid.innerHTML = SLOTS.map(slot => {
    const course = registered.find(c => c.slot === slot);
    return `
      <div class="slot-cell ${course ? 'filled':''}">
        <span class="slot-code mono">${slot}</span>
        ${course ? `<span class="slot-course">${course.code}</span>` : ''}
      </div>`;
  }).join('');
}

function renderRegisteredList(){
  if(registered.length === 0){
    registeredList.innerHTML = `<li class="registered-empty">Nothing locked in yet — register a course from the catalog.</li>`;
  } else {
    registeredList.innerHTML = registered.map(c => `
      <li><span class="mono">${c.code}</span><span>${c.slot} · ${c.credits} cr</span></li>
    `).join('');
  }
  const totalCredits = registered.reduce((sum,c)=> sum + c.credits, 0);
  creditCounter.textContent = `${totalCredits} / ${MAX_CREDITS} credits`;
}

/* Local stand-ins for UC-02 / UC-03 so this module works standalone.
   These are superseded by Akash's ValidationEngine in the final build. */
function localSlotClashCheck(slot){
  return !registered.some(c => c.slot === slot);
}
function localSeatCapacityCheck(course){
  return course.seatsLeft > 0;
}

function registerCourse(code){
  const course = COURSES.find(c => c.code === code);
  if(!course) return;

  if(!localSlotClashCheck(course.slot)){
    showToast('Slot Clashing Conflict Detected', 'error');
    return;
  }
  if(!localSeatCapacityCheck(course)){
    showToast('Course Registration Failed: Slot Capacity Full', 'error');
    return;
  }

  const projectedCredits = registered.reduce((s,c)=>s+c.credits,0) + course.credits;
  if(projectedCredits > MAX_CREDITS){
    showToast(`Configuration Error: registering ${course.code} exceeds the ${MAX_CREDITS}-credit semester limit`, 'error');
    return;
  }

  try{
    course.seatsLeft -= 1;
    registered.push(course);
    renderCatalog(searchInput.value);
    renderTimetable();
    renderRegisteredList();
    showToast(`Registered for ${course.code} — slot ${course.slot} locked`, 'success');
  }catch(e){
    showToast('Transaction Error: Timetable render failed.', 'error');
  }
}

searchInput.addEventListener('input', () => renderCatalog(searchInput.value));

renderCatalog();
renderTimetable();
renderRegisteredList();