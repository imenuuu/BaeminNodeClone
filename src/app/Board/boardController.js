const jwtMiddleware = require("../../../config/jwtMiddleware");
const boardProvider = require("../../app/Board/boardProvider");
const boardService = require("../../app/Board/boardService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const {logger} = require("../../../config/winston");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS))
}



/**
 * [GET] /boards
 */
exports.getBoards = async function (req, res) {

    /**
     * Query String: email
     */
    // 보드 전체 조회
    const boardList = await boardProvider.getBoardList();
    return res.send(response(baseResponse.SUCCESS, boardList));

};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getBoardsById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const boardId = req.params.boardId;


    const userByUserId = await boardProvider.retrieveBoard(boardId);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};

exports.getMenuById = async function (req, res) {

    /**
     * Path Variable: menuId
     */
    const menuId = req.params.menuId;

    const menuByMenuId = await storeProvider.detailMenu(menuId);
    return res.send(response(baseResponse.SUCCESS, menuByMenuId));
};

exports.postBoard=async function(req,res){
    const {userId,title,contents} = req.body;

    const boardResponse= await boardService.createBoard(
        userId,title,contents
    );
    return res.send(boardResponse);
}
// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {userId, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await storeService.postSignIn(userId, password);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchBoard = async function (req, res) {

    // jwt - userId, path variable :userId

    const boardId = req.params.boardId;

    const contents = req.body.contents;


    const editBoard = await boardService.editBoard(boardId,contents)
    return res.send(editBoard);
};

exports.deleteBoard=async function(req,res){

    const boardId=req.params.boardId;
    const deleteBoard=await boardService.deleteBoard(boardId)
    return res.send(boardId)
}











/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {

    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
