const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend Server is running smoothly!' });
});

// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    console.log(`[NEW MESSAGE] From: ${name} (${email}) | Message: ${message}`);

    // Simulate saving or sending email
    return res.status(200).json({
        success: true,
        message: 'Thank you for reaching out! Your message has been received successfully.'
    });
});

// Projects API Endpoint
app.get('/api/projects', (req, res) => {
    const projects = [
        {
            id: 1,
            title: "YouTube Clone",
            category: "Full Stack / React",
            description: "Responsive React.js UI with Express.js & MongoDB backend, Cloudinary integration, and RapidAPI integration.",
            tech: ["React.js", "Express.js", "MongoDB", "RapidAPI", "Material UI"],
            link: "#"
        },
        {
            id: 2,
            title: "Live Weather App",
            category: "Web Application",
            description: "Real-time weather application fetching data via Weather API with unit toggling and multi-day forecast UI.",
            tech: ["React", "JavaScript", "HTML/CSS", "Weather API"],
            link: "#"
        },
        {
            id: 3,
            title: "Live News Web App",
            category: "Frontend Web",
            description: "Dynamic news platform categorizing live news articles using News API and fully responsive layout.",
            tech: ["React", "Bootstrap", "News API", "CSS3"],
            link: "#"
        },
        {
            id: 4,
            title: "Energy Consumption ML Model",
            category: "Machine Learning",
            description: "Predictive ML models using Logistic Regression, Random Forest, KNN, and LSTM for early energy forecast.",
            tech: ["Python", "LSTM", "Random Forest", "Scikit-Learn"],
            link: "#"
        }
    ];
    res.json({ success: true, projects });
});

// Fallback to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});