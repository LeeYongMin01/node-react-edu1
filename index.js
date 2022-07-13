const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/key');

const {User} = require('./models/user');

//MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;
mongoose.connect(config.mongoURI).then(() => {
    console.log('MongoDB Connected...');
}).catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!!!!!!!');
});

app.post('/register', (req, res) => {
    
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) {
            return res.json({success: false, error: err});
        } else {
            return res.status(200).json({success: true});
        }
    });
});

app.listen(port, (req, res) => {
    console.log(`start server on port ${port}!`);
});
