
const express = require("express");
const app = express();

app.get("/api/:date?", (req, res) => {
  let dateInput = req.params.date;

  let date;
  if (!dateInput) {
    // No date provided – use current time
    date = new Date();
  } else {
    // If input is a number (Unix timestamp), parse as integer
    if (!isNaN(dateInput)) {
      dateInput = parseInt(dateInput);
    }
    date = new Date(dateInput);
  }

  // Check for invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respond with valid format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
