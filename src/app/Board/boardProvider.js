const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const boardDao = require("./boardDao");

// Provider: Read 비즈니스 로직 처리

//게시판 crud
exports.getBoardList = async function (email) {
  if (!email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const boardList = await boardDao.selectBoard(connection);
    connection.release();

    return boardList;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return userListResult;
  }
};

exports.retrieveBoard = async function (boardId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const boardResult = await boardDao.selectBoardId(connection, boardId);

  connection.release();

  return boardResult[0];
};

exports.detailMenu = async function(menuId){
  const connection = await pool.getConnection(async (conn) => conn);
  const menuListResult = await userDao.selectDetailMenu(connection, menuId);
  connection.release();
  return menuListResult;

}

exports.userCheck = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserId(connection, userId);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};