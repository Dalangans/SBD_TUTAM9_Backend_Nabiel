const express = require('express');
const cors = require("cors"); // Import CORS middleware

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', require(`./src/routes/contact.route.js`));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});