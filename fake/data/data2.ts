// fake data of '자리 배치도' schema

export const org_groups = [
    {
        group_id: '0010001',
        group_name: '행정안전국',
        par_group_id: '0010000',
        group_path: '파주시>행정안전국',
        cocd: 0,
    },
    {
        group_id: '0010002',
        group_name: '정보통신과',
        par_group_id: '0010001',
        group_path: '파주시>행정안전국>정보통신과',
        cocd: 0,
    },
    {
        group_id: '001000201',
        group_name: '통신팀',
        par_group_id: '0010002',
        group_path: '파주시>행정안전국>정보통신과',
        cocd: 1,
    },
    {
        group_id: '0010003',
        group_name: '미디어홍보과',
        par_group_id: '0010001',
        group_path: '파주시>행정안전국>미디어홍보과',
        cocd: 0,
    },
]

export const org_groups_to_maps = [
    {
        groupId: '0010001',
        mapId: 2,
    },
    {
        groupId: '0010002',
        mapId: 1,
    },
    {
        groupId: '001000201',
        mapId: 2,
    },
    {
        groupId: '0010003',
        mapId: 3,
    },
]

export const org_maps = [
    {
        map_name: '본관 정보통신실',
        status: '완료',
        revision_date: new Date(),
        is_in_use: 1,
        screen_elements: { 'mode': 'default' },
    },
    {
        map_name: '본관 2층',
        status: '생성중',
        revision_date: new Date(),
        is_in_use: 0,
        screen_elements: { 'mode': 'default' },
    },
    {
        map_name: '별관 3층',
        status: '대기',
        revision_date: new Date(),
        is_in_use: 0,
        screen_elements: { 'mode': 'default' },
    },
]

export const org_maps_to_users = [
    {
        loginId: 'hk_east',
        mapId: 1,
    },
    {
        loginId: 'sleepy_lee',
        mapId: 2,
    },
    {
        loginId: 'cool_hat_kim',
        mapId: 2,
    },
    {
        loginId: 'diver_sim',
        mapId: 3,
    },
]

export const org_users = [
    {
        login_id: 'hk_east',
        user_name: '홍길동',
        group_name: '정보통신과',
        par_group_id: '0010001',
        position_id: '002',
        position_name: '과장',
        office_tel: '02-581-0891',
        email: 'hk@korea.kr',
        node_type: 1,
        user_level: 20,
        gubun: 0,
        group_id: '0010002',
    },
    {
        login_id: 'castle_girl',
        user_name: '성춘향',
        group_name: '미디어홍보과',
        par_group_id: '0010001',
        position_id: '002',
        position_name: '과장',
        office_tel: '02-581-0892',
        email: 'castle@korea.kr',
        node_type: 1,
        user_level: 20,
        gubun: 0,
        group_id: '0010003',
    },
    {
        login_id: 'sleepy_lee',
        user_name: '이몽룡',
        group_name: '행정안전국',
        par_group_id: '0010000',
        position_id: '001',
        position_name: '국장',
        office_tel: '02-581-0893',
        email: 'sleepy@korea.kr',
        node_type: 2,
        user_level: 10,
        gubun: 0,
        group_id: '0010001',
    },
    {
        login_id: 'diver_sim',
        user_name: '심청이',
        group_name: '미디어홍보과',
        par_group_id: '0010001',
        position_id: '004',
        position_name: '주무관',
        office_tel: '02-581-0894',
        email: 'diver@korea.kr',
        node_type: 1,
        user_level: 40,
        gubun: 1,
        group_id: '0010003',
    },
    {
        login_id: 'cool_hat_kim',
        user_name: '김삿갓',
        group_name: '통신팀',
        par_group_id: '0010002',
        position_id: '003',
        position_name: '팀장',
        office_tel: '02-581-0895',
        email: 'cool_hat@korea.kr',
        node_type: 2,
        user_level: 30,
        gubun: 2,
        group_id: '001000201',
    },
]