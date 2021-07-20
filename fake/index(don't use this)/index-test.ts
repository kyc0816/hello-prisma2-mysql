import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const allAssignments = await prisma.projectUser.findMany();
  console.log(JSON.stringify(allAssignments))

  // // 일회성 실험용 파일. user를 만들고 바로 그 user가 엮여있는 projectUser 릴레이션 만드는거.. 어케하지? 생각했는데,
  // // 생각해보니 어차피 릴레이션 만드는거는 실제 만들어지는 user 객체를 가지고 릴레이션 만드는게 아니라 그냥 userId라는 속성으로
  // // 들어가는거라 상관이 없다. 읽어오는게 아닌 이상!
  // await prisma.user.create({
  //   data: {
  //     name: "Fake",
  //     email: "fake@fake.com",
  //     password: "sdjnfjdn",
  //   },
  // });
  
  // await prisma.projectUser.create({
  //   data: {
  //       projectId: 1,
  //       userId: 3
  //   },
  // });

  // // 위에꺼 실험 결과 --> 당연히 성공. 애초에 user가 꼭 저장이 되어야만 릴레이션을 만들 수 있는게 아니니까 당연히 성공이지.
  // // 근데 그러고나니까 좀 궁금해짐. 그러면 저장한다음에 그 저장한거 바로 불러오는거는? 그거야말로 저장이 아직 안됐으면
  // // 불러올 수가 없잖아? --> 그래서 아래와 같이 실험... 결과 : 성공. 사실 얘도 당연함. await니깐...

  // await prisma.user.create({
  //   data: {
  //     name: "Fourth",
  //     email: "fourth@fourth.com",
  //     password: "dfkjvnkjsdnbd",
  //   },
  // });

  // const fourth_user = await prisma.user.findUnique({ // https://www.prisma.io/docs/concepts/components/prisma-client/crud
  //   where: {
  //     id: 4,
  //   },
  // })
  // console.log(JSON.stringify(fourth_user))

  // // 실험 (3) --> 아래처럼 하면? create 함수는 생성한 뒤에 방금 생성한 값을 리턴한다.
  // // 그걸 요렇게 아래처럼 받으면 '방금 생성된 것'의 id를 받아올 수 있다.
  // const createdUserID = await prisma.user.create({
  //   data: {
  //     name: "Sixth",
  //     email: "sixth@sixth.com",
  //     password: "ffgkbk",
  //   },
  // });
  // console.log(createdUserID.id)
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
