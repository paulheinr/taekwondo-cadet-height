// Create express app
var express = require("express")
var app = express()

// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.get("/player/:id", (req, res, next) => {
    res.json({"message": req.params.id})
});

// Insert here other API endpoints

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});
