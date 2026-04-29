require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./Config/db');
const invokeGeminiAi = require('./Services/ai.service').invokeGeminiAi;

connectDB();
invokeGeminiAi();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
