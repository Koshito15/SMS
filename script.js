document.addEventListener('DOMContentLoaded', () => {

    // --- STUDENT DATA MOCKUP ---
    const studentData = {
        personalInfo: {
            name: "Randell Jhon Capanas Pomar",
            studentNumber: "2023-ANT-01234",
            program: "Bachelor of Science in Information Technology",
            yearLevel: "3rd Year",
            email: "randell.pomar@university.edu",
            phone: "+63 912 345 6789",
            address: "123 Rizal Ave, Antipolo City, Philippines",
            // === PROFILE PICTURE UPDATED HERE ===
            avatar: "https://scontent.fmnl11-1.fna.fbcdn.net/v/t39.30808-1/506104068_1922747541888706_6813928038402494403_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFu-X3i-BUUoNfmJtS2ywCNL_UwDgxcSrcv9TAODFxKt0h3-nmvH8Mj3QoPXqNlwGOuSxBSK_l14difU0qqudcz&_nc_ohc=kWd__aCqHWQQ7kNvwGOrAUF&_nc_oc=AdmUIhDUfO6z-0cQ9UkNTX8U4TVnGP9oETP-tnhkpyPnnJvcJZic-tmIc60prNhU8Vw&_nc_zt=24&_nc_ht=scontent.fmnl11-1.fna&_nc_gid=UhrMwEtYkuB1gNRaXPE6Lw&oh=00_AfeWdg7DflvmR8bVU80k11ZA4qyqzTXWvFMr3ajoVYE9qg&oe=68FD889D" // Placeholder for your uploaded image URL
        },
        enrolledSubjects: [
            { id: 1, subjectCode: "IT-PROG1", subjectTitle: "Advanced Web Development", professor: "Mr. Cruz", schedule: "TTH 13:00-14:30", room: "CompLab 5", units: 3, color: "#0d6efd" },
            { id: 2, subjectCode: "CS-DB2", subjectTitle: "Database Administration", professor: "Ms. Reyes", schedule: "MWF 09:00-10:00", room: "CompLab 2", units: 3, color: "#198754" },
            { id: 3, subjectCode: "IT-NET2", subjectTitle: "Network Security", professor: "Mr. Santos", schedule: "TTH 10:00-11:30", room: "CompLab 3", units: 3, color: "#fd7e14" },
            { id: 4, subjectCode: "GEN-ART1", subjectTitle: "Art Appreciation", professor: "Mrs. Garcia", schedule: "MWF 11:00-12:00", room: "Rm 201", units: 3, color: "#6f42c1" },
            { id: 5, subjectCode: "PE-4", subjectTitle: "Physical Education 4", professor: "Mr. David", schedule: "S 08:00-10:00", room: "Gym", units: 2, color: "#dc3545" },
        ],
        grades: [
            { term: "AY 2025-2026, 1st", gpa: null, subjects: [ { code: "IT-PROG1", prelim: 1.75, midterm: 1.50, final: null, units: 3 }, { code: "CS-DB2", prelim: 2.00, midterm: 1.75, final: null, units: 3 }, { code: "IT-NET2", prelim: 1.50, midterm: null, final: null, units: 3 }, { code: "GEN-ART1", prelim: 2.25, midterm: null, final: null, units: 3 }, { code: "PE-4", prelim: 1.00, midterm: null, final: null, units: 2 } ] },
            { term: "AY 2024-2025, 2nd", gpa: 1.50, subjects: [ { code: "IT-WEB", grade: 1.50, units: 3 } ] },
            { term: "AY 2023-2024, 1st", gpa: 1.88, subjects: [ { code: "IT-BASIC", grade: 1.75, units: 3 }, { code: "CS-FUNDA", grade: 2.00, units: 3 } ] }
        ],
        accountInfo: { 
            totalAssessment: 25000.00, 
            balance: 5000.00,
            transactions: [
                { date: "2025-08-15", desc: "Tuition Fee - 1st Term", charge: 25000, payment: 0 },
                { date: "2025-08-15", desc: "Downpayment", charge: 0, payment: 10000 },
                { date: "2025-09-15", desc: "Midterm Payment", charge: 0, payment: 10000 },
            ]
        },
        availableSubjects: [
            { id: 7, subjectCode: "IT-ELEC1", subjectTitle: "IT Elective 1 (Mobile Dev)", schedule: "TTH 08:00-09:30", slots: "12/30", status: "Available", units: 3 },
            { id: 2, subjectCode: "CS-DB2", subjectTitle: "Database Administration", schedule: "MWF 09:00-10:00", slots: "0/30", status: "Full", units: 3 },
            { id: 6, subjectCode: "CS-ALG", subjectTitle: "Algorithms & Complexity", schedule: "MWF 09:00-10:00", slots: "15/30", status: "Available", units: 3 },
            { id: 8, subjectCode: "GEN-PHILO", subjectTitle: "Ethics", schedule: "TTH 14:30-16:00", slots: "25/40", status: "Available", units: 3 }
        ],
        academicCalendarEvents: [
            { date: "2025-11-10", title: "Midterm Exams Start", type: "exam" }, { date: "2025-11-15", title: "Midterm Exams End", type: "exam" },
            { date: "2025-12-01", title: "Enrollment (2nd Term)", type: "enrollment" }, { date: "2025-12-25", title: "Christmas Day", type: "holiday" },
        ]
    };

    // --- GLOBAL STATE & VARIABLES ---
    let countdownInterval = null;
    let selectedSubjects = [];

    // --- DOM ELEMENTS ---
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    const loader = document.getElementById('loader');

    // --- SPA ROUTING & NAVIGATION ---
    const routes = {
        dashboard: showDashboard, offering: showSectionOffering, registration: showRegistration,
        schedule: showSchedule, profile: showProfile, grades: showGrades,
        account: showAccount, calendar: showCalendar,
    };
    
    function navigate(page) {
        if (countdownInterval) clearInterval(countdownInterval);
        loader.classList.remove('hidden');
        mainContent.innerHTML = ''; mainContent.appendChild(loader);
        setTimeout(() => {
            loader.classList.add('hidden');
            const pageContainer = document.createElement('div');
            pageContainer.className = 'page-content'; mainContent.appendChild(pageContainer);
            if (routes[page]) routes[page](pageContainer);
            else pageContainer.innerHTML = '<h1>Page not found</h1>';
        }, 300);
    }
    
    // --- EVENT LISTENERS ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.currentTarget.dataset.page;
            if (page) {
                navLinks.forEach(l => l.classList.remove('active'));
                e.currentTarget.classList.add('active');
                navigate(page);
                if (window.innerWidth <= 992) {
                    sidebar.classList.remove('show');
                    sidebarBackdrop.classList.remove('show');
                }
            }
        });
    });
    menuToggle.addEventListener('click', () => { sidebar.classList.add('show'); sidebarBackdrop.classList.add('show'); });
    sidebarBackdrop.addEventListener('click', () => { sidebar.classList.remove('show'); sidebarBackdrop.classList.remove('show'); });
    
    // --- HELPER FUNCTIONS ---
    const getGreeting = () => { const h=new Date().getHours(); return h<12 ? "Good Morning" : h<18 ? "Good Afternoon" : "Good Evening"; };
    const getNextClass = (subjects) => { /* ... same as previous answer ... */ return subjects.length > 0 ? { subject: subjects[0], date: new Date(new Date().getTime() + 2 * 3600 * 1000) } : null; };

    // --- PAGE RENDERERS ---

    function showDashboard(container) {
        if (countdownInterval) clearInterval(countdownInterval);
        const { personalInfo, accountInfo, grades, enrolledSubjects } = studentData;
        const today = new Date();
        const nextClassInfo = getNextClass(enrolledSubjects);
        const recentGrade = grades[0].subjects[0];
        const totalPaid = accountInfo.totalAssessment - accountInfo.balance;
        const paymentProgress = (totalPaid / accountInfo.totalAssessment) * 100;
        
        container.innerHTML = `
            <div class="dashboard-greeting">
                <h1>${getGreeting()}, ${personalInfo.name.split(' ')[0]}!</h1>
                <p class="date-subtitle">${today.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div class="dashboard-layout">
                <div class="hero-card" id="hero-card"></div>
                <div class="info-column">
                    <div class="info-card financial-summary">
                        <h3><i class="fas fa-wallet"></i>Financials</h3>
                        <p class="balance-label">Current Balance</p>
                        <p class="balance">₱ ${accountInfo.balance.toFixed(2)}</p>
                        <div class="progress-bar-container"><div class="progress-bar" style="width: ${paymentProgress}%;"></div></div>
                        <p class="payment-info">${paymentProgress.toFixed(0)}% of tuition paid.</p>
                    </div>
                    <div class="info-card academic-activity">
                        <h3><i class="fas fa-star"></i>Recent Activity</h3>
                        <p class="grade-subject">Midterm Grade for ${recentGrade.code}</p>
                        <p class="grade-highlight">${recentGrade.midterm ? recentGrade.midterm.toFixed(2) : recentGrade.grade.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div class="card announcements">
                <h2>Announcements</h2>
                <ul class="announcements-list">
                    <li><span class="announcement-date">Starts December 1, 2025</span>Enrollment for the 2nd Term of A.Y. 2025-2026.</li>
                    <li><span class="announcement-date">November 10-15, 2025</span>Midterm examinations are scheduled for all departments.</li>
                </ul>
            </div>`;

        const heroCard = document.getElementById('hero-card');
        if (nextClassInfo) {
            const updateCountdown = () => { /* ... same countdown logic ... */ };
            heroCard.innerHTML = `<div><div class="hero-header">Up Next</div><div class="hero-main-content"><h2 class="subject-title">${nextClassInfo.subject.subjectTitle}</h2><div class="subject-details"><span><i class="fas fa-calendar-day"></i>${nextClassInfo.subject.schedule}</span><span><i class="fas fa-map-marker-alt"></i>${nextClassInfo.subject.room}</span></div></div></div><div class="hero-footer"><div class="countdown">Loading...</div></div>`;
            countdownInterval = setInterval(updateCountdown, 1000);
            updateCountdown();
        } else {
            heroCard.innerHTML = `<div class="hero-main-content"><h2 class="subject-title">No Upcoming Classes</h2><p>Enjoy your break!</p></div>`;
        }
    }

    function showSectionOffering(container) {
        container.innerHTML = `
            <div class="page-header"><h1>Section Offering</h1><p>Select subjects to build your schedule for the next term.</p></div>
            <div class="offering-layout">
                <div>
                    <div class="card">
                        <div class="search-filters"><div class="form-group"><label>Search Subject</label><input type="text" placeholder="e.g., IT-PROG1 or Web Development"></div><button class="btn btn-primary"><i class="fas fa-search"></i> Search</button></div>
                        <div class="table-container"><table id="subjects-table"><thead><tr><th></th><th>Code</th><th>Title</th><th>Schedule</th><th>Slots</th><th>Status</th></tr></thead><tbody></tbody></table></div>
                    </div>
                </div>
                <div class="selected-subjects-card card">
                    <h4>Selected Subjects (<span id="selected-count">0</span>)</h4>
                    <div id="selected-subjects-list"></div><hr style="margin: 20px 0;"><p>Total Units: <strong id="total-units">0</strong></p>
                    <button id="proceed-btn" class="btn btn-success" style="width: 100%; margin-top: 15px;" disabled><i class="fas fa-arrow-right"></i> Proceed to Registration</button>
                </div>
            </div>`;
        
        const render = () => {
            const conflicts = new Set();
            selectedSubjects.forEach(s1 => {
                selectedSubjects.forEach(s2 => {
                    if (s1.id !== s2.id && s1.schedule === s2.schedule) { conflicts.add(s1.id); conflicts.add(s2.id); }
                });
            });

            container.querySelector('#subjects-table tbody').innerHTML = studentData.availableSubjects.map(s => {
                const isSelected = selectedSubjects.find(sel => sel.id === s.id);
                const statusBadge = s.status === 'Available' ? 'badge-success' : 'badge-danger';
                return `<tr>
                    <td><input type="checkbox" data-id="${s.id}" ${isSelected ? 'checked' : ''} ${s.status === 'Full' && !isSelected ? 'disabled' : ''}></td>
                    <td>${s.subjectCode}</td><td>${s.subjectTitle}</td><td>${s.schedule}</td><td>${s.slots}</td><td><span class="badge ${statusBadge}">${s.status}</span></td>
                </tr>`;
            }).join('');

            const selectedList = container.querySelector('#selected-subjects-list');
            selectedList.innerHTML = selectedSubjects.length > 0 ? selectedSubjects.map(s => `
                <div class="subject-item">
                    <span><strong>${s.subjectCode}</strong><br><small style="${conflicts.has(s.id) ? 'color:red' : ''}">${s.schedule}</small></span><button data-id="${s.id}">&times;</button>
                </div>`).join('') : '<p style="text-align:center; color: #6c757d;">No subjects selected.</p>';

            container.querySelector('#selected-count').textContent = selectedSubjects.length;
            container.querySelector('#total-units').textContent = selectedSubjects.reduce((acc, s) => acc + s.units, 0);
            container.querySelector('#proceed-btn').disabled = selectedSubjects.length === 0;
        };

        container.addEventListener('change', e => { if (e.target.type === 'checkbox') {
                const subjectId = parseInt(e.target.dataset.id), subject = studentData.availableSubjects.find(s => s.id === subjectId);
                if (e.target.checked) selectedSubjects.push(subject); else selectedSubjects = selectedSubjects.filter(s => s.id !== subjectId);
                render();
        }});
        container.addEventListener('click', e => { if (e.target.tagName === 'BUTTON' && e.target.dataset.id) {
                selectedSubjects = selectedSubjects.filter(s => s.id !== parseInt(e.target.dataset.id));
                render();
        }});
        render();
    }

    function showRegistration(container) {
        container.innerHTML = `
            <div class="page-header"><h1>Registration</h1><p>Confirm your subjects and finalize your enrollment.</p></div>
            <div class="card">
                <div class="stepper">
                    <div class="step completed"><div class="step-number">1</div><div class="step-title">Select Subjects</div></div>
                    <div class="step active"><div class="step-number">2</div><div class="step-title">Review & Confirm</div></div>
                    <div class="step"><div class="step-number">3</div><div class="step-title">View Assessment</div></div>
                </div>
            </div>
            <div class="card">
                <h3>Review Your Schedule</h3><p>Please review the subjects below. Any schedule conflicts are highlighted.</p>
                <div class="table-container" style="margin-top: 20px;">
                    <table><thead><tr><th>Code</th><th>Title</th><th>Schedule</th><th>Units</th><th>Status</th></tr></thead>
                    <tbody>${studentData.enrolledSubjects.map(s => `<tr><td>${s.subjectCode}</td><td>${s.subjectTitle}</td><td>${s.schedule}</td><td>${s.units}</td><td><span class="badge badge-success">Enrolled</span></td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div style="text-align: right; margin-top: 30px; display:flex; gap: 10px; justify-content: flex-end;">
                    <button class="btn btn-secondary"><i class="fas fa-print"></i> Print COR</button><button class="btn btn-primary"><i class="fas fa-check"></i> Finalize Enrollment</button>
                </div>
            </div>`;
    }

    function showSchedule(container) {
        const dayMap = { 'M': 2, 'T': 3, 'W': 4, 'TH': 5, 'F': 6, 'S': 7, 'SU': 8 };
        let classBlocks = '';
        studentData.enrolledSubjects.forEach(subject => {
            const [dayStr, timeStrFull] = subject.schedule.split(' ');
            const [startTime, endTime] = timeStrFull.split('-');
            const startRow = (parseInt(startTime.split(':')[0]) - 8) * 2 + (parseInt(startTime.split(':')[1]) / 30) + 1;
            const endRow = (parseInt(endTime.split(':')[0]) - 8) * 2 + (parseInt(endTime.split(':')[1]) / 30) + 1;
            (dayStr.match(/TH|M|T|W|F|S/g) || []).forEach(dayKey => {
                classBlocks += `<div class="class-block" style="--grid-col-start:${dayMap[dayKey]};--grid-row-start:${startRow};--grid-row-end:${endRow};--class-color:${subject.color};"><strong>${subject.subjectCode}</strong><span>${subject.room}</span></div>`;
            });
        });
        container.innerHTML = `<div class="page-header"><h1>Class Schedule</h1><p>Your weekly academic timetable.</p></div><div class="card">
            <div class="schedule-grid">
                <div class="day-header"></div>${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => `<div class="day-header">${d}</div>`).join('')}
                ${Array.from({length:12}, (_,i)=>8+i).map(h => `<div class="time-label" style="grid-row:${(h-8)*2+1}/span 2">${h}:00</div>`).join('')}
                ${classBlocks}
            </div></div>`;
    }

    function showProfile(container) {
        const { personalInfo: p } = studentData;
        container.innerHTML = `
            <div class="page-header"><h1>Profile</h1><p>Manage your personal and contact information.</p></div>
            <div class="card">
                <div class="flex-between">
                    <div class="profile-header"><img src="${p.avatar}" alt="Avatar" class="profile-avatar"><div class="profile-info"><h2>${p.name}</h2><p>${p.program}</p></div></div>
                    <button id="edit-profile-btn" class="btn btn-secondary"><i class="fas fa-pencil-alt"></i> Edit Profile</button>
                </div><hr style="margin: 20px 0;">
                <form id="profile-form">
                    <div class="two-column-layout">
                        <div class="form-group"><label>Email Address</label><input name="email" type="email" value="${p.email}" readonly></div>
                        <div class="form-group"><label>Phone Number</label><input name="phone" type="tel" value="${p.phone}" readonly></div>
                        <div class="form-group"><label>Address</label><input name="address" type="text" value="${p.address}" readonly></div>
                        <div class="form-group"><label>Student Number</label><input name="studentNumber" type="text" value="${p.studentNumber}" readonly></div>
                    </div>
                    <div id="form-actions" class="hidden" style="text-align: right; margin-top: 20px; display:flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" id="cancel-btn" class="btn btn-secondary">Cancel</button><button type="submit" class="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>`;
        const form = container.querySelector('#profile-form'), editBtn = container.querySelector('#edit-profile-btn'), actions = container.querySelector('#form-actions'), cancelBtn = container.querySelector('#cancel-btn');
        const toggleEdit = (isEditing) => {
            form.querySelectorAll('input:not([name=studentNumber])').forEach(i => i.readOnly = !isEditing);
            actions.classList.toggle('hidden', !isEditing); editBtn.classList.toggle('hidden', isEditing);
        };
        editBtn.addEventListener('click', () => toggleEdit(true));
        cancelBtn.addEventListener('click', () => { form.reset(); toggleEdit(false); });
        form.addEventListener('submit', (e) => { e.preventDefault(); /* Handle save logic */ alert('Profile Saved!'); toggleEdit(false); });
    }

    function showGrades(container) {
        const cgpa = (studentData.grades.reduce((a, t) => a + (t.gpa || 0), 0) / studentData.grades.filter(t => t.gpa).length).toFixed(2);
        container.innerHTML = `
            <div class="page-header"><h1>Grades</h1><p>An overview of your academic performance.</p></div>
            <div class="card">
                <div class="grades-summary-grid">
                    <div class="summary-card"><div class="value">${cgpa}</div><div class="label">Cumulative GPA</div></div>
                    <div class="summary-card"><div class="value">Passed</div><div class="label">Academic Status</div></div>
                    <div class="summary-card"><div class="value">${studentData.enrolledSubjects.reduce((a,s)=>a+s.units,0)}</div><div class="label">Current Units</div></div>
                </div>
            </div>
            ${studentData.grades.map(term => `
                <div class="card">
                    <div class="flex-between grade-term-header"><h3 style="margin:0;">${term.term}</h3><strong>Term GPA: ${term.gpa ? term.gpa.toFixed(2) : 'N/A'}</strong><i class="fas fa-chevron-down"></i></div>
                    <div class="table-container hidden" style="margin-top: 15px;">
                        <table><thead><tr><th>Code</th><th>Prelim</th><th>Midterm</th><th>Final Grade</th></tr></thead>
                        <tbody>${term.subjects.map(s => `<tr><td>${s.code}</td><td>${s.prelim||'-'}</td><td>${s.midterm||'-'}</td><td>${s.grade||(s.final===null?'TBA':'-')}</td></tr>`).join('')}</tbody>
                        </table>
                    </div>
                </div>`).join('')}`;
        container.querySelectorAll('.grade-term-header').forEach(header => header.addEventListener('click', () => {
            header.classList.toggle('collapsed');
            header.nextElementSibling.classList.toggle('hidden');
        }));
    }

    function showAccount(container) {
        const { accountInfo: acc } = studentData;
        const totalPaid = acc.totalAssessment - acc.balance;
        let runningBalance = 0;
        container.innerHTML = `
            <div class="page-header"><h1>My Account</h1><p>View your financial statement and payment history.</p></div>
            <div class="card">
                <div class="account-summary-grid">
                    <div><div class="value">₱ ${acc.totalAssessment.toFixed(2)}</div><div class="label">Total Assessment</div></div>
                    <div><div class="value">₱ ${totalPaid.toFixed(2)}</div><div class="label">Total Paid</div></div>
                    <div><div class="value balance">₱ ${acc.balance.toFixed(2)}</div><div class="label">Current Balance</div></div>
                </div>
                <div style="text-align: center; margin-top: 30px;"><button class="btn btn-primary"><i class="fas fa-credit-card"></i> Pay Online</button></div>
            </div>
            <div class="card"><h3>Transaction History</h3><div class="table-container"><table><thead><tr><th>Date</th><th>Description</th><th>Charges</th><th>Payments</th><th>Balance</th></tr></thead><tbody>${acc.transactions.map(t => {runningBalance+=t.charge-t.payment; return `<tr><td>${t.date}</td><td>${t.desc}</td><td>${t.charge>0?`₱ ${t.charge.toFixed(2)}`:'-'}</td><td>${t.payment>0?`₱ ${t.payment.toFixed(2)}`:'-'}</td><td>₱ ${runningBalance.toFixed(2)}</td></tr>`}).join('')}</tbody></table></div></div>`;
    }

    function showCalendar(container) {
        const now = new Date();
        const year = now.getFullYear(), month = now.getMonth();
        const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let daysHTML = '';
        for (let i = 0; i < firstDay; i++) daysHTML += '<div class="calendar-day other-month"></div>';
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
            const events = studentData.academicCalendarEvents.filter(e => e.date === dateStr);
            daysHTML += `<div class="calendar-day${day===now.getDate()?' today':''}">
                <div class="day-number">${day}</div>
                ${events.map(e => `<div class="event-marker ${e.type}">${e.title}</div>`).join('')}
            </div>`;
        }
        container.innerHTML = `
            <div class="page-header"><h1>Academic Calendar</h1><p>Key dates for the academic year.</p></div>
            <div class="academic-calendar-layout">
                <div class="card">
                    <div class="flex-between"><h3>${now.toLocaleString('default',{month:'long',year:'numeric'})}</h3><div><button class="btn btn-secondary">&lt;</button><button class="btn btn-secondary">&gt;</button></div></div>
                    <div class="calendar-grid" style="margin-top:20px;">
                        ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div class="calendar-day-name">${d}</div>`).join('')}
                        ${daysHTML}
                    </div>
                </div>
                <div class="card upcoming-events-list">
                    <h3>Upcoming Events</h3>
                    ${studentData.academicCalendarEvents.map(e => `<div class="event-item"><div class="date">${e.date}</div><div>${e.title}</div></div>`).join('')}
                </div>
            </div>`;
    }
    
    // --- INITIAL LOAD ---
    navigate('dashboard');
});