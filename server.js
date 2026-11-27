const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// 1. PERSISTENT JSON DATABASE LAYER
// ==========================================
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  const [salt, key] = storedHash.split(':');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(derivedKey, 'hex'));
}

const ALL_CLASSES = ['5A', '5B', '12A'];

function createInitialData() {
  const demoPass = hashPassword('demo123');
  return {
    users: [
      { id: 'student5a', name: 'Aarav Sharma', email: 'aarav.5a@classsphere.demo', role: 'student', classes: ['5A'], label: 'Class 5A Student', passwordHash: demoPass, createdAt: '2026-11-01T08:00:00Z' },
      { id: 'student5b', name: 'Ananya Verma', email: 'ananya.5b@classsphere.demo', role: 'student', classes: ['5B'], label: 'Class 5B Student', passwordHash: demoPass, createdAt: '2026-11-01T08:05:00Z' },
      { id: 'student12a', name: 'Rohan Kumar', email: 'rohan.12a@classsphere.demo', role: 'student', classes: ['12A'], label: 'Class 12A Student', passwordHash: demoPass, createdAt: '2026-11-01T08:10:00Z' },
      { id: 'teacher5a', name: 'Priya Sharma', email: 'priya.sharma@classsphere.demo', role: 'teacher', classes: ['5A'], label: 'Class Teacher (5A)', passwordHash: demoPass, createdAt: '2026-11-01T07:30:00Z' },
      { id: 'teacher', name: 'Rahul Mehta', email: 'rahul.mehta@classsphere.demo', role: 'teacher', classes: ['5B', '12A'], label: 'Subject Teacher (5B, 12A)', passwordHash: demoPass, createdAt: '2026-11-01T07:35:00Z' }
    ],
    notices: [
      { id: 101, classId: '5A', title: 'Mathematics Unit Test', desc: 'Unit test covering Fractions and Decimals is scheduled for 12 November during Period 2.', teacher: 'Priya Sharma', category: 'Examination', priority: 'Important', date: '10 Nov' },
      { id: 102, classId: '5A', title: 'Science Project Deadline', desc: 'Submit your illustrated "Our Environment" scrapbook project in class by 15 November.', teacher: 'Priya Sharma', category: 'Academic Update', priority: 'Normal', date: '09 Nov' },
      { id: 103, classId: '5A', title: 'Parent-Teacher Meeting', desc: 'Term 1 PTM will be held in Room 204 on 18 November from 9:00 AM to 12:30 PM.', teacher: 'Priya Sharma', category: 'Important Notice', priority: 'Important', date: '08 Nov' },
      { id: 201, classId: '5B', title: 'English Reading Activity', desc: 'Bring your literature reader for the group reading and comprehension session on 13 November.', teacher: 'Rahul Mehta', category: 'General', priority: 'Normal', date: '10 Nov' },
      { id: 202, classId: '5B', title: 'Science Lab Practical', desc: 'Plant Life Cycle observation activity in the Junior Science Lab on 19 November.', teacher: 'Rahul Mehta', category: 'Academic Update', priority: 'Important', date: '09 Nov' },
      { id: 301, classId: '12A', title: 'Physics Practical Record Submission', desc: 'All Electrostatics and Ray Optics lab manuals must be signed and submitted by 14 November.', teacher: 'Rahul Mehta', category: 'Important Notice', priority: 'Important', date: '10 Nov' },
      { id: 302, classId: '12A', title: 'Computer Science Practical Assessment', desc: 'Python File Handling, CSV processing, and Functions practical assessment on 21 November.', teacher: 'Rahul Mehta', category: 'Examination', priority: 'Important', date: '08 Nov' },
      { id: 303, classId: '12A', title: 'Mathematics Revision Test', desc: 'Timed 1-hour revision quiz on Matrices and Determinants on 17 November.', teacher: 'Rahul Mehta', category: 'Examination', priority: 'Normal', date: '07 Nov' }
    ],
    assignments: [
      { id: 1001, classId: '5A', subject: 'Mathematics', title: 'Fractions Practice Worksheet', instructions: 'Complete questions 1–15 from Exercise 4.2 in your maths notebook. Show step-by-step LCM working.', teacher: 'Priya Sharma', deadline: '12 Nov', maxMarks: 20, completedBy: [] },
      { id: 1002, classId: '5A', subject: 'Science', title: 'Our Environment Project', instructions: 'Prepare a 4-page illustrated project on water conservation and waste segregation.', teacher: 'Priya Sharma', deadline: '15 Nov', maxMarks: 25, completedBy: ['student5a'] },
      { id: 1003, classId: '5A', subject: 'English', title: 'Reading Comprehension Passage', instructions: 'Read Chapter 6 passage and answer inference questions 1–8 cleanly.', teacher: 'Priya Sharma', deadline: '17 Nov', maxMarks: 15, completedBy: [] },
      { id: 2001, classId: '5B', subject: 'Mathematics', title: 'Multiplication & Division Drill', instructions: 'Solve worksheet sections A and B on multi-digit long division.', teacher: 'Rahul Mehta', deadline: '13 Nov', maxMarks: 20, completedBy: [] },
      { id: 2002, classId: '5B', subject: 'Science', title: 'Plant Life Cycle Diagram', instructions: 'Draw and neatly label germination, growth, pollination, and seed dispersal stages.', teacher: 'Rahul Mehta', deadline: '18 Nov', maxMarks: 20, completedBy: ['student5b'] },
      { id: 3001, classId: '12A', subject: 'Physics', title: 'Electrostatics Numerical Set', instructions: 'Solve NCERT numericals 1.1 to 1.18 covering Coulomb Law and Electric Dipole torque.', teacher: 'Rahul Mehta', deadline: '14 Nov', maxMarks: 30, completedBy: [] },
      { id: 3002, classId: '12A', subject: 'Computer Science', title: 'Python File Handling Practical', instructions: 'Write modular Python programs using text and binary file read/write functions with exception handling.', teacher: 'Rahul Mehta', deadline: '19 Nov', maxMarks: 25, completedBy: ['student12a'] },
      { id: 3003, classId: '12A', subject: 'Mathematics', title: 'Matrices & Determinants Sheet', instructions: 'Solve the 12 board-level inverse matrix and system of linear equations problems.', teacher: 'Rahul Mehta', deadline: '17 Nov', maxMarks: 25, completedBy: [] }
    ],
    doubts: [
      { id: 501, classId: '5A', subject: 'Mathematics', author: 'Aarav Sharma', authorId: 'student5a', question: 'Why does the denominator remain the same when adding fractions with like denominators?', reply: 'Because both fractions represent pieces of the same-sized whole. We only count the total number of equal pieces (numerator), not change the size of each piece.', repliedBy: 'Priya Sharma', resolved: true, createdAt: '10 Nov, 4:15 PM' },
      { id: 502, classId: '5B', subject: 'Science', author: 'Ananya Verma', authorId: 'student5b', question: 'Why do plants need sunlight for photosynthesis?', reply: 'Chlorophyll absorbs sunlight energy, which drives the chemical reaction turning water and carbon dioxide into glucose and oxygen.', repliedBy: 'Rahul Mehta', resolved: true, createdAt: '09 Nov, 6:05 PM' },
      { id: 503, classId: '12A', subject: 'Physics', author: 'Rohan Kumar', authorId: 'student12a', question: 'What is the physical significance of the electric field?', reply: 'The electric field defines the electrostatic force experienced per unit positive test charge at a point, allowing us to describe electrical interactions across space without direct contact.', repliedBy: 'Rahul Mehta', resolved: true, createdAt: '10 Nov, 5:40 PM' },
      { id: 504, classId: '12A', subject: 'Computer Science', author: 'Rohan Kumar', authorId: 'student12a', question: 'When should we use "with open()" instead of manually calling file.close() in Python?', reply: '', repliedBy: '', resolved: false, createdAt: '11 Nov, 9:20 AM' }
    ]
  };
}

function loadDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const seed = createInitialData();
      fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2));
      return seed;
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (err) {
    console.error('Failed loading DB, reseeding:', err);
    const seed = createInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2));
    return seed;
  }
}

let db = loadDB();

function saveDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// ==========================================
// 2. SESSION STORE & AUTH MIDDLEWARE
// ==========================================
const sessions = new Map(); // token -> userId

function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Unauthorized: Please log in to access this resource.' });
  }
  const userId = sessions.get(token);
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    sessions.delete(token);
    return res.status(401).json({ error: 'Session expired. Please log in again.' });
  }
  req.user = user;
  req.token = token;
  next();
}

function requireClassAccess(req, res, next) {
  const { classId } = req.params;
  if (!ALL_CLASSES.includes(classId)) {
    return res.status(404).json({ error: `Classroom ${classId} does not exist.` });
  }
  if (!req.user.classes.includes(classId)) {
    return res.status(403).json({
      error: `HTTP 403 Forbidden: ${req.user.name} (${req.user.role}) is not authorized to access Class ${classId}.`
    });
  }
  next();
}

function requireTeacher(req, res, next) {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ error: 'HTTP 403 Forbidden: Only teachers can perform this action.' });
  }
  next();
}

// ==========================================
// 3. PUBLIC & AUTH ROUTES
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ClassSphere Backend API', classes: ALL_CLASSES });
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalUsers: db.users.length,
    totalStudents: db.users.filter(u => u.role === 'student').length,
    totalTeachers: db.users.filter(u => u.role === 'teacher').length,
    totalNotices: db.notices.length,
    totalAssignments: db.assignments.length,
    totalDoubts: db.doubts.length,
    classes: ALL_CLASSES
  });
});

app.post('/api/auth/login', (req, res) => {
  const { userId, password } = req.body || {};
  if (!userId || !password) {
    return res.status(400).json({ error: 'User ID and password are required.' });
  }
  const normalized = userId.trim().toLowerCase();
  const user = db.users.find(
    u => u.id.toLowerCase() === normalized || u.email.toLowerCase() === normalized
  );
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid User ID/Email or password. (Demo password: demo123)' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, user.id);
  res.json({ token, user: sanitizeUser(user) });
});

app.post('/api/auth/register', (req, res) => {
  const { name, userId, email, password, role, assignedClass } = req.body || {};
  if (!name || !userId || !email || !password) {
    return res.status(400).json({ error: 'Name, User ID, Email, and Password are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }
  const cleanId = userId.trim().toLowerCase().replace(/[^a-z0-9_.-]/g, '');
  if (!cleanId) {
    return res.status(400).json({ error: 'User ID must contain letters or numbers.' });
  }
  const exists = db.users.some(
    u => u.id.toLowerCase() === cleanId || u.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (exists) {
    return res.status(409).json({ error: 'An account with this User ID or Email already exists.' });
  }

  const safeRole = role === 'teacher' ? 'teacher' : 'student';
  const targetClass = ALL_CLASSES.includes(assignedClass) ? assignedClass : '5A';
  const classes = safeRole === 'teacher' ? [targetClass] : [targetClass];

  const newUser = {
    id: cleanId,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: safeRole,
    classes,
    label: safeRole === 'teacher' ? `Teacher (${classes.join(', ')})` : `Class ${targetClass} Student`,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDB();

  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, newUser.id);
  res.status(201).json({ token, user: sanitizeUser(newUser) });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  sessions.delete(req.token);
  res.json({ message: 'Logged out successfully.' });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});

// ==========================================
// 4. PROTECTED CLASSROOM DATA ROUTES (RBAC)
// ==========================================
app.get('/api/classes/:classId/dashboard', requireAuth, requireClassAccess, (req, res) => {
  const { classId } = req.params;
  const notices = db.notices.filter(n => n.classId === classId);
  const assignments = db.assignments.filter(a => a.classId === classId);
  const doubts = db.doubts.filter(d => d.classId === classId);
  const students = db.users
    .filter(u => u.role === 'student' && u.classes.includes(classId))
    .map(sanitizeUser);
  const teachers = db.users
    .filter(u => u.role === 'teacher' && u.classes.includes(classId))
    .map(sanitizeUser);

  res.json({
    classId,
    notices,
    assignments,
    doubts,
    roster: { students, teachers }
  });
});

// Publish Notice (Teacher Only)
app.post('/api/classes/:classId/notices', requireAuth, requireClassAccess, requireTeacher, (req, res) => {
  const { classId } = req.params;
  const { title, desc, category, priority } = req.body || {};
  if (!title?.trim() || !desc?.trim()) {
    return res.status(400).json({ error: 'Notice title and description are required.' });
  }
  const notice = {
    id: Date.now(),
    classId,
    title: title.trim(),
    desc: desc.trim(),
    category: category || 'Academic Update',
    priority: priority === 'Important' ? 'Important' : 'Normal',
    teacher: req.user.name,
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
  };
  db.notices.unshift(notice);
  saveDB();
  res.status(201).json({ notice });
});

// Delete Notice (Teacher Only)
app.delete('/api/classes/:classId/notices/:id', requireAuth, requireClassAccess, requireTeacher, (req, res) => {
  const { classId, id } = req.params;
  const idx = db.notices.findIndex(n => n.id === Number(id) && n.classId === classId);
  if (idx === -1) return res.status(404).json({ error: 'Notice not found.' });
  db.notices.splice(idx, 1);
  saveDB();
  res.json({ deletedId: Number(id) });
});

// Create Assignment (Teacher Only)
app.post('/api/classes/:classId/assignments', requireAuth, requireClassAccess, requireTeacher, (req, res) => {
  const { classId } = req.params;
  const { subject, title, instructions, deadline, maxMarks } = req.body || {};
  if (!subject?.trim() || !title?.trim() || !instructions?.trim()) {
    return res.status(400).json({ error: 'Subject, title, and instructions are required.' });
  }
  const assignment = {
    id: Date.now(),
    classId,
    subject: subject.trim(),
    title: title.trim(),
    instructions: instructions.trim(),
    deadline: deadline?.trim() || 'Upcoming',
    maxMarks: Number(maxMarks) || 20,
    teacher: req.user.name,
    completedBy: []
  };
  db.assignments.unshift(assignment);
  saveDB();
  res.status(201).json({ assignment });
});

// Delete Assignment (Teacher Only)
app.delete('/api/classes/:classId/assignments/:id', requireAuth, requireClassAccess, requireTeacher, (req, res) => {
  const { classId, id } = req.params;
  const idx = db.assignments.findIndex(a => a.id === Number(id) && a.classId === classId);
  if (idx === -1) return res.status(404).json({ error: 'Assignment not found.' });
  db.assignments.splice(idx, 1);
  saveDB();
  res.json({ deletedId: Number(id) });
});

// Toggle Assignment Completion (Student Only)
app.post('/api/classes/:classId/assignments/:id/toggle', requireAuth, requireClassAccess, (req, res) => {
  const { classId, id } = req.params;
  if (req.user.role !== 'student') {
    return res.status(403).json({ error: 'Only students can mark assignments as completed.' });
  }
  const assignment = db.assignments.find(a => a.id === Number(id) && a.classId === classId);
  if (!assignment) return res.status(404).json({ error: 'Assignment not found.' });

  const exists = assignment.completedBy.includes(req.user.id);
  if (exists) {
    assignment.completedBy = assignment.completedBy.filter(uid => uid !== req.user.id);
  } else {
    assignment.completedBy.push(req.user.id);
  }
  saveDB();
  res.json({ assignment });
});

// Post a Doubt (Student or Teacher inside class)
app.post('/api/classes/:classId/doubts', requireAuth, requireClassAccess, (req, res) => {
  const { classId } = req.params;
  const { subject, question } = req.body || {};
  if (!subject?.trim() || !question?.trim()) {
    return res.status(400).json({ error: 'Subject and question are required.' });
  }
  const doubt = {
    id: Date.now(),
    classId,
    subject: subject.trim(),
    author: req.user.name,
    authorId: req.user.id,
    question: question.trim(),
    reply: '',
    repliedBy: '',
    resolved: false,
    createdAt: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
  };
  db.doubts.unshift(doubt);
  saveDB();
  res.status(201).json({ doubt });
});

// Reply to Doubt (Teacher Only)
app.post('/api/classes/:classId/doubts/:id/reply', requireAuth, requireClassAccess, requireTeacher, (req, res) => {
  const { classId, id } = req.params;
  const { reply } = req.body || {};
  if (!reply?.trim()) {
    return res.status(400).json({ error: 'Reply text cannot be empty.' });
  }
  const doubt = db.doubts.find(d => d.id === Number(id) && d.classId === classId);
  if (!doubt) return res.status(404).json({ error: 'Doubt not found.' });

  doubt.reply = reply.trim();
  doubt.repliedBy = req.user.name;
  doubt.resolved = true;
  saveDB();
  res.json({ doubt });
});

// SPA Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ClassSphere Full-Stack Server running on http://localhost:${PORT}`);
});
