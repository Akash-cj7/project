:root{
  --ink:#0F2136;
  --ink-2:#16304C;
  --paper:#F6F4EC;
  --paper-2:#ECE8D9;
  --line:#D9D3BE;
  --amber:#C98A2B;
  --amber-deep:#96631A;
  --maroon:#8C2F39;
  --green:#2E7D5B;
  --text:#1B2431;
  --text-soft:#5B6472;
  --radius:10px;
  font-size:16px;
}
*{box-sizing:border-box;}
body{
  margin:0;
  background:var(--paper);
  color:var(--text);
  font-family:'Inter',system-ui,sans-serif;
  min-height:100vh;
}
h1,h2{
  font-family:'Space Grotesk',sans-serif;
  margin:0;
}
code, .mono{
  font-family:'JetBrains Mono',ui-monospace,monospace;
}

.topbar{
  background:var(--ink);
  color:var(--paper);
  padding:16px 28px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  flex-wrap:wrap;
  gap:10px;
  border-bottom:3px solid var(--amber);
}
.brand{display:flex;flex-direction:column;line-height:1.25;}
.brand-mark{font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:.08em;font-size:1.05rem;color:var(--amber);}
.brand-sub{font-size:.78rem;color:#B9C4D2;}
.module-tag{text-align:right;line-height:1.3;}
.module-tag-uc{display:block;font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--amber);letter-spacing:.05em;}
.module-tag-name{display:block;font-size:.85rem;color:#DCE3EA;}

.layout{
  display:grid;
  grid-template-columns:1.7fr 1fr;
  gap:22px;
  padding:26px 28px 60px;
  max-width:1280px;
  margin:0 auto;
}
@media (max-width:880px){
  .layout{grid-template-columns:1fr;}
}

.panel{
  background:#fff;
  border:1px solid var(--line);
  border-radius:var(--radius);
  padding:20px 22px;
}
.panel-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-bottom:16px;
  flex-wrap:wrap;
}
.panel-head h1{font-size:1.25rem;}

#searchInput{
  border:1px solid var(--line);
  border-radius:8px;
  padding:8px 12px;
  font-family:'Inter',sans-serif;
  font-size:.85rem;
  width:250px;
  max-width:100%;
  background:var(--paper);
}
#searchInput:focus{outline:2px solid var(--amber);outline-offset:1px;}

.catalog-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(230px,1fr));
  gap:14px;
}
.course-card{
  border:1px solid var(--line);
  border-radius:var(--radius);
  padding:14px;
  background:var(--paper);
  display:flex;
  flex-direction:column;
  gap:8px;
  transition:border-color .15s ease, transform .1s ease;
}
.course-card:hover{border-color:var(--amber-deep);}
.course-card.is-full{opacity:.72;}
.course-card-top{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;}
.course-code{font-weight:700;font-size:.95rem;}
.slot-pill{
  font-family:'JetBrains Mono',monospace;
  font-size:.72rem;
  font-weight:700;
  padding:2px 8px;
  border-radius:999px;
  background:var(--ink-2);
  color:#fff;
  letter-spacing:.03em;
}
.course-title{font-size:.92rem;font-weight:600;line-height:1.3;}
.course-meta{font-size:.78rem;color:var(--text-soft);}
.course-bottom{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:4px;}
.seat-badge{font-size:.72rem;font-weight:600;padding:3px 8px;border-radius:6px;}
.seat-badge.ok{background:#E4F2EA;color:var(--green);}
.seat-badge.low{background:#FBEBD6;color:var(--amber-deep);}
.seat-badge.full{background:#F5DEE0;color:var(--maroon);}

.register-btn{
  border:none;
  background:var(--ink);
  color:#fff;
  font-family:'Inter',sans-serif;
  font-weight:600;
  font-size:.8rem;
  padding:7px 14px;
  border-radius:7px;
  cursor:pointer;
}
.register-btn:hover{background:var(--ink-2);}
.register-btn:disabled{background:#C7CCD2;cursor:not-allowed;}

.empty-state{
  text-align:center;
  color:var(--maroon);
  font-weight:600;
  padding:30px 10px;
  border:1px dashed var(--maroon);
  border-radius:var(--radius);
  margin-top:10px;
}
.hidden{display:none;}

.credit-counter{
  font-family:'JetBrains Mono',monospace;
  font-size:.78rem;
  background:var(--paper-2);
  padding:4px 10px;
  border-radius:999px;
  color:var(--ink);
}

.timetable-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:8px;
  margin-bottom:20px;
}
.slot-cell{
  border:1px solid var(--line);
  border-radius:8px;
  padding:10px 8px;
  min-height:56px;
  background:var(--paper);
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:2px;
}
.slot-cell .slot-code{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--text-soft);}
.slot-cell.filled{background:var(--ink);border-color:var(--ink);}
.slot-cell.filled .slot-code{color:var(--amber);}
.slot-cell .slot-course{font-size:.78rem;font-weight:600;color:var(--text);}
.slot-cell.filled .slot-course{color:#fff;}

.registered-list-wrap h2{font-size:.95rem;margin-bottom:8px;}
.registered-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px;}
.registered-list li{
  border:1px solid var(--line);
  border-radius:7px;
  padding:8px 10px;
  font-size:.82rem;
  display:flex;
  justify-content:space-between;
  gap:6px;
}
.registered-empty{color:var(--text-soft);border-style:dashed !important;font-size:.78rem !important;}

.toast-root{
  position:fixed;
  bottom:20px;
  right:20px;
  display:flex;
  flex-direction:column;
  gap:10px;
  z-index:50;
}
.toast{
  min-width:250px;
  max-width:340px;
  padding:12px 16px;
  border-radius:8px;
  font-size:.85rem;
  font-weight:600;
  color:#fff;
  box-shadow:0 8px 20px rgba(15,33,54,.25);
  animation:toastIn .18s ease-out;
}
.toast.success{background:var(--green);}
.toast.error{background:var(--maroon);}
@keyframes toastIn{from{transform:translateY(8px);opacity:0;}to{transform:translateY(0);opacity:1;}}