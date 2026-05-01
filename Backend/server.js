require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./Config/db')
const { generateInterviewReport } = require('./Services/ai.service');

connectDB();
generateInterviewReport("resume", "selfDescription", "jobDescription");


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
