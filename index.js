const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/openai', async (req, res) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', req.body, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error proxying to OpenAI:', error);
        res.status(error.response ? error.response.status : 500).json({ message: 'Error processing your request' });
    }
});

app.get('/', (req, res) => {
  res.send('Kuiti API is running!');
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
