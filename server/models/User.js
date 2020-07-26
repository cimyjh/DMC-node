const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jsw = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//유저 정보 저장하기 전 작업
//bcrypt를 사용한 암호화 과정
userSchema.pre('save', function(next){

    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else{
        next()
    }
})

//입력받은 plainPassword를 암호화 해서 이미 암호화된 비밀번호와 비교하는 메소드
userSchema.methods.comparePassword = function(plainPassword, callback){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch)
    })
}


userSchema.methods.generateToken = function(callback){
    var user = this;

    var token = jsw.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return callback(err)
        callback(null, user)
    })
}


userSchema.statics.findByToken = function(token, callback){

    var user = this;



    //토큰을 decode한다
    jsw.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일지하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function(err, user){
            if (err) return callback(err);
            callback(null, user)
        })

    })
}


const User = mongoose.model('User', userSchema)

module.exports = { User }