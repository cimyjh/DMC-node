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


const config = require('./config/key');
const { request } = require('express');
const cookieParser = require('cookie-parser')


app.use(cookieParser());

mongoose.connect(config.mongoURI,
    {useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}
    ).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))


//User.js에서 pre 전처리 작업 진행됨(save)
//회원가입
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

//로그인
app.post('/login', (req, res) => {

    User.findOne({ email: req.body.email}, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        user.comparePassword(req.body.password, (err, isMatch ) => {
            if(!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            })
        })
    })
})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))