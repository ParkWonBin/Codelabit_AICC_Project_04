저는 app.js를 구동시켰을 때 routes의 index.js에서 get방식에 index.ejs를 렌더하는 코드 하나만을 구현하였는데요. 코드를 작성하는 개발자 입장에서 바로 다음 화면을 직관적으로 그려볼 수 있어 굉장히 유용했던 것 같습니다.

userCreate.js에서 가입 시 비밀번호를 두 번 입력하도록하여 비밀번호가 일치하지 않을 시 ‘비밀번호가 일치하지 않습니다.’라는 메시지를 출력하도록 구현하였고 마찬가지로 get방식에 userCreate.ejs로 render하는 방식 하나만을 두어 직관적 화면 구성이 가능하도록 하였습니다.

다음으로는 session 기능을 활용한 userLogin.js에 대한 설명입니다.

userLogin.ejs 화면에서 username과 password를 req.body로 입력받아 왔습니다. sql문을 통해 DB(users table)에 존재하는 데이터가 입력받은  username, password와 일치한다면 그 행의 값을 result에 넣어달라 했고, 그 결과가 null값이 아니라면 입력받은  username을 req.session.username에 저장하라고 했습니다. 이렇게 함으로써 페이지 이동 시 로그인 정보를 저장토록 구현하였습니다.

다음음  postMain.ejs 페이지입니다.

postMain 페이지에는 글쓰기 기능과 게시글 조회, 마이페이지를 통한 암호변경과 회원탈퇴, 그리고 로그아웃 기능을 넣었습니다.

이 화면에서는 로그아웃 기능을 눈여겨봐야 하는데, 로그아웃 버튼을 눌렀을 때 req.session.username의 값이 null로 돌아가고, 화면이 index.js를 가리켜 결국 index.ejs로 돌아가도록 설계하였습니다.

다음은 postCreate.js와 postCreate.ejs의 페이지입니다.

postCreate.ejs 페이지에서 postid와 title, content를 입력받아왔습니다. posts테이블에 author열을 두고 req.session.username을 author에 넣어 현재 접속한 이가 글을 생성한 이가 되도록 구현하였습니다.

