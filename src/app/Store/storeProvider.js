const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const storeDao = require("./storeDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserList = async function (email) {
  if (!email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await storeDao.selectUser(connection);
    connection.release();

    return userListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await storeDao.selectUserEmail(connection, email);
    connection.release();

    return userListResult;
  }
};

exports.retrieveStores = async function (categoryId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const storeResult = await storeDao.selectCategoryId(connection, categoryId);

  connection.release();

  return storeResult[0];
};

exports.detailMenu = async function(menuId){
  const connection = await pool.getConnection(async (conn) => conn);
  const menuListResult = await storeDao.selectDetailMenu(connection, menuId);
  connection.release();
  return menuListResult;

}

exports.userCheck = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await storeDao.selectUserId(connection, userId);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await storeDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await storeDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};