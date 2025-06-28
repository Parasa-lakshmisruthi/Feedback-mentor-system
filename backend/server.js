const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// Read Excel and return parsed student data
function getStudentData() {
  const workbook = XLSX.readFile(path.join(__dirname, "data/students.xlsx"));
  const sheet = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
  return data;
}

app.post("/api/login", (req, res) => {
  const { username, pin, password } = req.body;
  const students = getStudentData();

  const user = students.find(
    (s) =>
      s.Name?.toString().trim().toLowerCase() === username.trim().toLowerCase() &&
      s.PIN?.toString().trim() === pin &&
      s.Password?.toString().trim() === password
  );

  if (user) {
    res.json({ success: true, name: user.Name });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
