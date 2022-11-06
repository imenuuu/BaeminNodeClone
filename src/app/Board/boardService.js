const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const boardProvider = require("./boardProvider");
const boardDao = require("./boardDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createBoard = async function (userId,title,contents) {

        const insertBoardParams = [userId,title,contents];

        const connection = await pool.getConnection(async (conn) => conn);

        const boardIdResult = await boardDao.insertBoard(connection, insertBoardParams);
        connection.release();
        return response(baseResponse.SUCCESS);

};


// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (userId, password) {
    try {
        // 이메일 여부 확인
        const idRows = await userProvider.userCheck(userId);
        if (idRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectId = idRows[0].userId

        // 비밀번호 확인
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const selectUserPasswordParams = [selectId, hashedPassword];
        
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);

        if (passwordRows[0].password !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(email);

        if (userInfoRows[0].status === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].status === "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        console.log(userInfoRows[0].id) // DB의 userId

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userId: userInfoRows[0].id,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].id, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.editBoard = async function (boardId,contents) {
    const connection = await pool.getConnection(async (conn) => conn);

    const editBoardResult = await boardDao.updateBoard(connection, boardId, contents)
    connection.release();

    return response(baseResponse.SUCCESS);

}

exports.deleteBoard = async function (boardId){
    const connection = await pool.getConnection(async (conn) => conn);
    const deleteBoardResult=await boardDao.deleteBoard(connection,boardId)
    connection.release();
    return response(baseResponse.SUCCESS);

}