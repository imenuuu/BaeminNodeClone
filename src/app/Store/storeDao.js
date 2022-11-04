// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT userId , name
                FROM User;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}


// userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                 SELECT id, email, nickname 
                 FROM UserInfo 
                 WHERE id = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

async function selectDetailMenu(connection,menuId){
  const menuQuery=`
  select menu,imgUrl from StoreMenu where id=?
  `;
  const selectDetailMenuQuery = `
    select SMO.id,
           SMO.oName,
           IF(SMO.multiple, 'true', 'false')'multipleCheck',maximum
    from StoreMenuOption SMO
           join StoreMenu SM on SM.id = SMO.menuId
    where SM.id =?`;

  const selectMenuDetailQuery= `
  select SMO.id'mainOption',
       SMOP.id 'optionId',
       SMOP.oName,
       SMOP.price
from StoreMenuOptionPlus SMOP
join StoreMenuOption SMO on SMO.id=SMOP.optionId
where SMO.menuId=?;
  `;

  //메뉴 리스트
  const [menuList] = await connection.query(selectDetailMenuQuery, menuId);
  //메뉴 선택사항 리스트
  const [menuDetail]=await connection.query(selectMenuDetailQuery,menuId);

  let menuDetailList=[];

  for (let i=0;i<menuList.length;i++){

    for(let j=0;j<menuDetail.length;j++){
      if(menuList[i].id == menuDetail[j].mainOption){
        menuDetailList.push(menuDetail[j])
      }

    }
    menuList[i].menuOption=menuDetailList;
    menuDetailList=[]
  }
  return menuList;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO UserInfo(email, password, nickname)
        VALUES (?, ?, ?);
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
  selectDetailMenu,
  selectUserId,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
};
