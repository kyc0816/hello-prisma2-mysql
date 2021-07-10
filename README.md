1. 아래 링크에서 prisma 부분은 빼고 docker-compose.yml 만들고 docker-compose up 해줘버림ㅋ

https://github.com/prisma/benching_setup/blob/master/setup_scripts/prisma-server/docker-compose.mysql.yml

2. HELLO-PRISMA 프로젝트의 readme와 https://daphne-dev.github.io/2020/11/11/prisma-001/ 링크를 참고하여
아래와 같이 초기 세팅 해줬다: (링크는 오래된게 좀 있어서 좀 바꿔줬음)

npm init -y
npm install prisma typescript ts-node @types/node --save-dev
## npm install @prisma/cli --save-dev   -->   @prisma/cli는 renamed to prisma. 이제 안쓴다.
npx prisma
npx prisma init

이까지 해줬으면 (1) .env (2) prisma > schema.prisma 이렇게 두 파일이 생겼을 것이다.

(링크 우선 참고..)
먼저 schema.prisma는 첫문단 보면 postgres로 설정돼있으니 아래와 같이 mysql로 바꿔준다.

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

이번엔 .env 파일 간다. export DATABASE_URL = "mysql://justinkim:prisma@localhost:3306/mydb" 이렇게
하고 싶겠지만, 저렇게 하면 나중에 source .env 하면 bad assignment라고 안해준다.

export DATABASE_URL="mysql://${DB_USERNAME}:${DB_PW}@localhost:3306/${DB_NAME}" 일케 해야됨.
(경고 - 제~일 처음에 docker-compose up 할 때 yml에 MYSQL_USER이 root이라고 돼있었다. 그 후 justinkim으로 
고쳤다. 근데 적용이 안된 모양이다. .env에서 이렇게 저렇게 고쳐봐도 안됐다. 그러다가 혹시나해서 DB_USERNAME을 root으로
바꿔봤더니 바로 됐다. 후..ㅋ 도커 함부로 돌리지 말자. 그리고 일단 돌렸으면 기억을 하고 책임을 지자.)

3. 꼭 필요한건진 모르겠으나.. 헬로 프리즈마 보면 시작부분에 tsconfig랑 gitignore 해줬었다. 찜찜하니 똑같이 만들어준다.

tsconfig 만들고, 베껴오고, git init 하고나서 .gitignore 만들고, 베껴왔다.
그리고 git init 한 김에 git add & commit 해준다.

4. HELLO-PRISMA에서 베껴와서 schema.prisma 안에 내용(스키마) 채워줄건데 postgres랑 mysql이랑 스키마 좀 달라서
좀 바꿔줘야한다. 뭐냐면 mysql은 uuid가 없다. 그래서 User의 id를 uuid가 아니라 그냥 autoincrement하는 Int로 바꿔줌.

그러고나면 relations table인 ProjectUser의 id에 에러가 난다. 아마 아래에 @@id가 있으니 맨 윗줄에 id를 불허하나봄.
걍 id 지워주면 됨 ㅋ

5. 이제 source .env 한 뒤 npx prisma migrate dev --name ${name} 돌려줌. (mysqlInitial이라고 했음 ㅋ)
근데... HELLO-PRISMA readme 보면 npx prisma migrate dev 하면 Table plus에 잡힌다고 하는데.. 안잡힘 ㅠ
npx prisma generate까지 해줘야 잡히는건가?? --> 아. 애초에 자동으로 잡히는게 아니라 create a new connection으로
잡아줘야 하는거임,, 암튼 Tableplus까지 일단 완성. (여기서 잠깐! prisma의 장점은? --> include.)

6. 자 이제 node_modules/.prisma/client/index.d.ts(변동 가능) 가면 쿼리문이 만들어져있음

7. HELLO-PRISMA의 README.md가 이 뒤로 전부 한글로 돼있어서.. 일단 복붙해서 넣겠다. 그래도 되지.. 않을까??

8. 이제 실제 테스트를 위한 준비 파일을 만들자. src 폴더 만들고 db.ts라는 파일 만들자. 그 안에 뭐 이러쿵 저러쿵 코드 써준다. (HELLO-PRISMA 할 당시에 기준으로 삼았던 강의에 코드가 나오는 듯. 걍 복붙해줬음)
(주의: 맨 첫줄 import에서 강의대로 '@prisma/client'하니까 에러나서 '.prisma/client'라고 바꿔줌... --> 걍 yarn add @prisma/client를 해줬음) --> (수정: 엥 왜 여기서는 에러 안나지 ㅋ)

<1>
실제로 넣어줄 데이터를 위해 최상위 디렉토리에 data 폴더를 만들고 그 아래에 data.ts 파일을 만들고
코드를 채울건데, HELLO-PRISMA에서는 그냥 강의 내용대로 그대로 써줬지만 HELLO-PRISMA2-MYSQL에서는 달라진게 있었다.
뭐였지? user에서 uuid 빼버리고 그냥 id로 해줬다.
그러니 여기서도 맨 첫줄에 uuid import 해주는거 지웠고, user에서 id= 그냥 빼버렸고 assignments에서 userId를
'일단 user추가한 뒤 db 확인해서 생성된 길고 복잡한 uuid 복붙해서 넣어줬던 방식'을 버리고, 그냥 1이랑 2 넣어줌 ㅋ
그리고 최상위에 index.ts도 만들건데,
<!-- (엥: data.ts 첫줄 'uuid' 왜 빨간줄?... -> yarn add uuid 해줬음) -->
일단은 data.ts에 users 데이터를 채우고 index.ts에서 user들을 push하고 그런식으로 users, projects, ProjectUser(=assignments)를 차례차례 올려줄건가보다. (db.ts 빨간색 뜨는데 무시해도 되는 듯..)

암튼 원래대로라면.. 이제 웹사이트(https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/querying-the-database-typescript-postgres)에 써있는대로, data.ts 안에는 올려줄 데이터들을 넣어줄거고, index.ts 안에서 그 데이터들을 db에 실제로 올려주는 코드를 짜서 index.ts를 실행시켜서 데이터들을 
올려줄건데, 근데 HELLO-PRISMA에서는 일단 user를 올리고 그 담에 비로소  project와 projectuser(=assignment)를 
올려줬는데, 그 이유는 HELLO-PRISMA에서는 user의 id가 uuid라서 랜덤으로 자동생성되는거였어서 그랬다.
즉 index.ts에 일단 user만 올리는 코드를 넣고 돌리고, 이제 올리면 비로소 user의 id가 uuid로 생성되면
그걸 수동으로 복붙해서 data.ts의 projectuser(=assignment) 필드가 가지고있어야하는 userID에 넣어줬다.
근데 여기 HELLO-PRISMA2-MYSQL에서는 그럴 필요 없다. uuid 안쓰고 그냥 autoincrement로 user의 id 만들기땜에, user 올리기 전에도 그냥 userID를 1, 2 이렇게 넣어줘도 된다.
그리고, 따라서 index.ts에 user와 project와 projectuser(=assignment)를 따로따로 올리지 않고 이 셋을
한꺼번에 올리는 식으로 코드를 써줘도 된다... 썼다. 잘 될까? 모르겠다.

암튼 그래서 npx ts-node index.ts 돌려주면 db에 user, project, projectuser(=assignment) 데이터들이 모두 올라갔다. 흠 근데 올려주고 바로 findMany로 잘 올라갔는지 받아와서 콘솔 로그 뿌려주는거 있는데, 딴거는 괜찮은데
projectuser(=assignment)는 콘솔로그 보면 projectId랑 userId밖에 안나오네. 원래 이랬나.. reltionTable인데 ㅋ
--> HELLO-PRISMA 가서 지랄 좀 했는데 결과적으로 projectId랑 userId밖에 안나오는거 괜찮음. HELLO-PRISMA도
tableplus 가보면 딱 하나 더있다. id. @relations 표시된 column은 걍 원래 실제 db에 물리적으로는 안올라가는 듯.

열려있는 터미널들은..
(1) git
(2) docker (docker compose up)
(3) others (npx ts-node index.ts)

-----------------------------------------------210703-----------------------------------------------
-----------------------------------------------210703-----------------------------------------------

9. 실제 자리배치도 DB 스키마에 맞게 sqldbm에서 DB diagram을 그려봤다 --> https://app.sqldbm.com/MySQL/Edit/p175427/#

10. 실제 자리배치도 DB 스키마에 맞게 schema.prisma에 테이블들을 추가했다.

DB diagram는 시각적 이해를 위한 것으로, 실제 스키마와는 차이가 있다. 예를들어, 저 사이트에는 prisma의 relationship table이 없어서
그냥 model을 하나 더 만들어준걸로하고 composite primary key(@@id)도 없어서 그냥 연결하려는 두 model의 key들을 저렇게 각각 적어줌

그리고 prisma에서는 relationship table이 두 table을 이어주면, 그 두 table들 각각의 안쪽에 그 relationship table을 
넣어줘야한다. 즉, 예를들어 GROUP_TO_MAP 테이블이 ORG_GROUP_INFO 테이블과 SEAT_MAP_INFO 테이블을 이어주니까, 그 두 테이블들 안에 
GROUP_TO_MAP 테이블을 각각 maps, groups라는 이름으로 넣었다. 이 때 maps, groups라고 이름 지은 것은 이전의 예시였던 Project,
User, ProjectUser의 경우에 그런 식으로 하길래 나도 그렇게 맞춰준 것이다. 그리고 마찬가지로 relationship table 안에서, 즉
예를들어 GROUP_TO_MAP 테이블 안에서 둘을 이어줄 때 둘 안의 group_id, map_id를 그대로 가져오지 않고 groupId, mapId로 가져온 것도
마찬가지로 원래 Project, User, ProjectUser에서 그렇게 해서 그런 것이다.


-----------------------------------------------210710-----------------------------------------------
-----------------------------------------------210710-----------------------------------------------

11. 지난번에 schema.prisma에 추가한 것들을 db에 반영하기위해 npx prisma migrate dev --name ${name} 새로 해줌 ( ${name}에는 넣고 싶은 이름 넣는거 알지? )
그리고 tableplus 확인해보니 제대로 올라간거 확인함. 그러나 스키마만 있고 실제 데이터는 없지. 이제 데이터를 넣어주자. 다원에서 보내준 예시 데이터들을 참고하여 fake 데이터들 들어있는 data2.ts를 만들 것이다.
(https://docs.google.com/presentation/d/1Go6ZWakCjObu4OXlwRBYMnDkUVYob5BQ/edit#slide=id.p26 참고)

12. 대강의 structure를 그려보았다. --> './src/img/etc/reference/data2_structure.jpg'

13. 만든 data2.ts를 올려주기위해 index2.ts 만들었고 그걸 읽어오는 index3.ts까지 만들어서 해봤고.. 잘돌아간다.

14. 앞으로 할 일  : 파일명 바꾸고 폴더 따로 만들어서 얘네 fake 데이터들은 따로 빼주자.