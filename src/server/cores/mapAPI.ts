import { PrismaClient, in_charge_MAP, SEAT_MAP_INFO, GROUP_TO_MAP } from '@prisma/client';

const prisma = new PrismaClient()

export async function getAllMap () {
  const allOrgMaps = await prisma.sEAT_MAP_INFO.findMany()
  console.log(JSON.stringify(allOrgMaps, null, 2))
}

export async function createMap(map_only_Data: SEAT_MAP_INFO, map_inCharges_Data: in_charge_MAP[], map_groups_Data: GROUP_TO_MAP[] ) {
  // (1) (Create One) - Map
  const createdMapInfo = await prisma.sEAT_MAP_INFO.create({
    data: map_only_Data
  });
  const createdMapID = createdMapInfo.map_id

  // (2) (Create Many) (Relationship) - Map <-> User(=in charge)
  // ** edge case --> 비어있는채로 보내면 불허용? 그러면 나중에 수정할 때 관리자 몽땅 삭제해버리는거 막아야되나? 그냥 전부 허용하자 일단.
  map_inCharges_Data.map((item: in_charge_MAP) => item.mapId = createdMapID)
  await prisma.in_charge_MAP.createMany({
    data: map_inCharges_Data // 얘는 프론트에서 보낼 때 in_charge_MAP[]를 보내는데 mapID는 모두 -1로 해서 보내면됨
  })

  // (3) (Create Many) (Relationship) - Map <-> Group
  // ** edge case --> 마찬가지. 자유도 최대로.
  map_groups_Data.map((item: GROUP_TO_MAP) => item.mapId = createdMapID)
  await prisma.gROUP_TO_MAP.createMany({
    data: map_groups_Data // 얘는 프론트에서 보낼 때 GROUP_TO_MAP[]를 보내는데 mapID는 모두 -1로 해서 보내면됨
  })
  
}

export async function updateMapInfo(data: JSON) {
  
}

export async function updateMapScreen(data: JSON) {
  
}

getAllMap()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })