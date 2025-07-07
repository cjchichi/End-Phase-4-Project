  const express = require('express');
const cors = require('cors');
const app = express();

// Use CORS middleware
app.use(cors({
    origin: ['https://study-group-app.netlify.app', 'https://study-group-app.netlify.app/'], // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed methods
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Enable preflight for all routes
app.options('*', cors()); // This line enables preflight requests for all routes

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/api/groups', (req, res) => {
    res.json([{ id: 1, name: 'Group 1' }, { id: 2, name: 'Group 2' }]);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  