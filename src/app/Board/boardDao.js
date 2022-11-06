// 모든 유저 조회
async function selectBoard(connection) {
  const selectBoardListQuery = `
                SELECT Board.id,title , createdAt,User.userName
                FROM Board
                join User on User.id=Board.userId;
                `;
  const [boardRows] = await connection.query(selectBoardListQuery);
  return boardRows;
}


// boardId 게시판 조회
async function selectBoardId(connection, boardId) {
  const selectBoardIdQuery = `
                 SELECT B.id'boardId',title,userName,contents,createdAt
                 from Board B join User on User.id=B.userId 
                 where B.id=?
                 `;
  const [boardRow] = await connection.query(selectBoardIdQuery, boardId);
  return boardRow;
}


// 게시판 생성
async function insertBoard(connection, insertBoardParams) {
  const insertBoardQuery = `
        INSERT INTO Board(userId, title, contents)
        VALUES (?, ?, ?);
    `;

  const insertBoardRow = await connection.query(
    insertBoardQuery,
      insertBoardParams
  );

  return insertBoardRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, nickname, password
        FROM UserInfo 
        WHERE email = ? AND password = ?;`;
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
        FROM UserInfo 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

async function updateBoard(connection, boardId, contents) {
  const updateUserQuery = `
  UPDATE Board 
  SET contents = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [contents, boardId]);
  return updateUserRow[0];
}

async function deleteBoard(connection,boardId){
  const deleteBoardQuery= `
  DELETE FROM Board where id=?`
  const deleteBoardRow=await connection.query(deleteBoardQuery,boardId)
}
module.exports = {
  selectBoard,
  selectBoardId,
  insertBoard,
  selectUserPassword,
  selectUserAccount,
  updateBoard,
  deleteBoard
};
