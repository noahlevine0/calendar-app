const express = require("express");



const cors = require("cors");
// Initialize express
const app = express();
const PORT = 5000;
// Middleware
app.use(cors());
app.use(express.json());
// Test route
app.get("/api/test", (req, res) => {
res.json({ message: "Backend is running!" });
});
// Calendar routes
app.get("/api/events", (req, res) => {
// This would eventually fetch from a database
res.json([
{ id: 1, title: "Class", start: "2025-05-20T09:00:00", end: "2025-05-20T10:30:00" },
{ id: 2, title: "Study Session", start: "2025-05-20T14:00:00", end: "2025-05-20T16:00:00" }
]);
});
app.post("/api/events", (req, res) => {
// This would eventually save to a database
console.log("Received new event:", req.body);
res.status(201).json({ id: Date.now(), ...req.body });
});
// Start server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`); 
});
