const store = require("./storeController");
const user = require("../User/userController");
module.exports = function(app){
    const store = require('./storeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    app.get('/stores/test', user.getTest)


    // 2. 유저 조회 API (+ 검색)
    app.get('/stores',store.getStores);

    //메뉴 조회
    app.get('/stores/menu/:menuId', store.getMenuById);

    // 3. 특정 유저 조회 API
    app.get('/stores/:storeId', store.getStoresById);



    // TODO: After 로그인 인증 방법 (JWT)
    // 로그인 하기 API (JWT 생성)
    app.post('/login', store.login);

    // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    app.patch('/users/:userId', jwtMiddleware, store.patchUsers)

    //jwt 검증
    app.get('/auto-login', jwtMiddleware, store.check);


};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API