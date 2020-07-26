const express = require('express')
const app = express()
const port = 5000

//의존성 주입
const bodyParser = require('body-parser');

//entity 주입
const { User } =require("./models/User");

const mongoose = require('mongoose')

//가져온 의존성의 설정
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://cimyjh:developermongo@dmc-init.5g37d.mongodb.net/DMC-init?retryWrites=true&w=majority',
    {useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}
    ).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/register', (req, res) => {

    //Entity를 초기화
    const user = new User(req.body)

    //go와 비슷한 방식의 객체 및 파라미터 처리 err
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))