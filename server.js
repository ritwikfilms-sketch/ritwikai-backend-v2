 const express = require('express');
const app = express();

app.use(express.json());

// 1. स्लैक वेरिफिकेशन के लिए (Challenge logic)
app.post('/slack/events', (req, res) => {
    if (req.body.challenge) {
        return res.status(200).send(req.body.challenge);
    }
    res.status(200).send('OK');
});

// 2. आपकी वेबसाइट और मैप के लिए
app.get('/', (req, res) => {
    res.send('<h1>Ritwik AI: World Class E-com Dashboard Live!</h1>');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(⁠ Server is running on port ${PORT} ⁠);
});

