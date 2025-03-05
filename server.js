const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve files from public/

// User database
let users = [];
const USERS_FILE = path.join(__dirname, 'users.json');

// Load existing users
try {
    users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
} catch (error) {
    users = [];
}

// Save users to file
function saveUsers() {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Utility function to generate referral code
function generateReferralCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Authentication Routes
app.post('/api/auth/signup', (req, res) => { // Adjusted path to match auth.html
    const { email, password, name, referralCode } = req.body;

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        id: Date.now().toString(),
        email,
        name,
        password: hashedPassword,
        referralCode: generateReferralCode(),
        balance: 0,
        referrals: [],
        referredBy: referralCode || null // Track who referred this user
    };

    // If referred by someone, update referrer's referrals
    if (referralCode) {
        const referrer = users.find(u => u.referralCode === referralCode);
        if (referrer) {
            referrer.referrals.push(newUser.id);
        }
    }

    users.push(newUser);
    saveUsers();

    res.status(201).json({
        message: 'Signup successful',
        user: { id: newUser.id, name, email, referralCode: newUser.referralCode }
    });
});

app.post('/api/auth/login', (req, res) => { // Adjusted path to match auth.html
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
        message: 'Login successful',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            referralCode: user.referralCode,
            balance: user.balance
        }
    });
});

// Dashboard Data Route
app.get('/api/dashboard-data', (req, res) => {
    const { email } = req.query;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const referralCount = user.referrals.length;
    const totalEarnings = user.balance; // Placeholder; add logic if needed
    const monthEarnings = user.balance * 0.3; // Placeholder; adjust as needed
    const networkSize = user.referrals.length; // Direct referrals only for now

    res.json({
        name: user.name,
        email: user.email,
        referralLink: `http://localhost:${PORT}/auth.html?ref=${user.referralCode}`,
        balance: user.balance,
        totalReferrals: referralCount,
        monthEarnings,
        networkSize,
        recentActivity: [
            { type: 'referral', message: 'New referral joined', date: new Date().toISOString() }
        ]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});