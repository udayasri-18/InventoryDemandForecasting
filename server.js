const express = require('express');
const bp = require('body-parser');
const path = require('path');
const cors = require('cors');
const mr = require('./routes/movieRoutes');
const app = express();
const port = 3000;

app.use(cors());
app.use(bp.json());
app.use('/api', mr);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
