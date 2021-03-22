import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    return res.send("Hello World")
});

app.listen(3000, () => console.log('Server is running'));
