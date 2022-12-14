module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    app.get('/test', user.getTest)

    // 1. 유저 생성 (회원가입) API
    app.post('/users', user.postUsers);

    // 2. 유저 조회 API (+ 검색)
    app.get('/users',user.getUsers);

    // 3. 특정 유저 조회 API
    app.get('/users/:userId', user.getUserById);


    // TODO: After 로그인 인증 방법 (JWT)
    // 로그인 하기 API (JWT 생성)
    app.post('/login', user.login);

    // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    app.patch('/users/:userId', jwtMiddleware, user.patchUsers)

    //jwt 검증
    app.get('/auto-login', jwtMiddleware, user.check);

    app.post('/users/address/:userId',jwtMiddleware,user.addUserAddress);
};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API