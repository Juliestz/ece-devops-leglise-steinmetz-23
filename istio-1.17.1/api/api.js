const express = require('express');
const app = express();
const yaml = require('js-yaml');

let appState = {
    status: 'running',
    uptime: process.uptime()
};

app.get('/', (req, res) => {
    res.type('yaml').send(yaml.dump(appState));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
