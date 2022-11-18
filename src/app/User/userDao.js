// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT nickName, id, nickname, password, username, phonenumber, email, profileimgurl, emailagree, smsagree, createdate, updatedate, status, addressid
                FROM User;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

async function checkUserEmail(connection, email){
  const checkEmailQuery =`
    SELECT email from User where email=?; 
  `;
  const checkEmailRow=await connection.query(checkEmailQuery,email);
  return checkEmailRow;
}

// userId 회원 조회
async function selectUserId(connection, email) {
  const selectUserIdQuery = `
                 SELECT id, email FROM User WHERE email = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, email);
  return userRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User(userId,userName, email, password)
        VALUES (?,?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT id, password
        FROM User 
        WHERE id = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, id
        FROM User 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE UserInfo 
  SET nickname = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}


module.exports = {
  selectUser,
  selectUserId,
  checkUserEmail,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
};
