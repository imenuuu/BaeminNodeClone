const board = require("./boardController");
const user = require("../User/userController");
module.exports = function(app){
    const board = require('./boardController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.get('/boards', board.getBoards)

    app.get('/boards/:boardId',board.getBoardsById)

    app.post('/boards',board.postBoard)

    app.patch('/boards/:boardId',board.patchBoard)

    app.delete('/boards/:boardId',board.deleteBoard)
};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API