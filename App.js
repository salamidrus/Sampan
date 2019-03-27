require('dotenv').config()

const
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan')
    public = require('./routes/public'),
    user = require('./routes/user')

const
    app = express();

app
    .use(morgan('dev'))
    .use(express.json())
    .use(cors())
    .use(bodyParser.urlencoded({extended: false}))
    .use('/api/v1/public', public)
    .use('/api/v1/user', user)
    .listen(process.env.PORT, () => console.log(`Online at Port ${process.env.PORT}`));

mongoose
    .connect(process.env.E_MONGO_DB, {useNewUrlParser: true})
    .then(() => console.log(`MongoDB Connected`))
    .catch((err) => console.log(err));