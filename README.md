1. 아래 링크에서 prisma 부분은 빼고 docker-compose.yml 만든다

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

이번엔 .env 파일 간다. DATABASE_URL = "mysql://justinkim:prisma@localhost:3306/mydb" 요로케 바꿔준다.

3. 꼭 핋요한건진 모르겠으나.. 헬로 프리즈마 보면 시작부분에 tsconfig랑 gitignore 해줬었다. 찜찜하니 똑같이 만들어준다.

tsconfig 만들고, 베껴오고, git init 하고나서 .gitignore 만들고, 베껴왔다.
그리고 git init 한 김에 git add & commit 해준다.

4. 