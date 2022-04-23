import area from "~/json/area.json";
import equipData from "~/json/equip.json";
import itemData from "~/json/item.json";
import weaponData from "~/json/weapon.json";

export const eng2Kor = {
  dagger: "단검",
  twoHand: "양손검",
  axe: "도끼",
  dual: "쌍검",
  pistol: "권총",
  rifle: "돌격소총",
  sniper: "저격총",
  rapier: "레이피어",
  spear: "창",
  hammer: "망치",
  bat: "방망이",
  throw: "투척",
  shuriken: "암기",
  bow: "활",
  crossbow: "석궁",
  glove: "글러브",
  tonfa: "톤파",
  guitar: "기타",
  nunchaku: "쌍절곤",
  whip: "채찍",
  camera: "카메라",
  arcana: "아르카나",
  VFProsthetic: "VF의수",
  clothes: "옷",
  helmet: "머리",
  bracelet: "팔",
  shoes: "다리",
  accessory: "장신구",
  material: "재료",
  food: "음식",
  drink: "음료",
  trap: "함정",
};

export const idToCategory = {
  weapon: {
    A: "dagger",
    B: "twoHand",
    C: "axe",
    D: "dual",
    E: "glove",
    F: "tonfa",
    G: "bat",
    H: "whip",
    I: "throw",
    J: "shuriken",
    K: "bow",
    L: "crossbow",
    M: "pistol",
    N: "rifle",
    O: "sniper",
    P: "hammer",
    Q: "spear",
    R: "nunchaku",
    S: "rapier",
    T: "guitar",
    U: "camera",
    V: "arcana",
    W: "VFProsthetic",
  },
  equip: {
    C: "clothes",
    H: "helmet",
    B: "bracelet",
    S: "shoes",
    A: "accessory",
  },
  item: {
    M: "material",
    T: "trap",
    F: "food",
    D: "drink",
  },
};

export const initialWeapon = [
  {
    id: "WWA003",
    sort: "dagger",
    name: "식칼",
    img: "https://lh3.google.com/u/0/d/1CWaccytlbfcaGI2f-cJMvKRo6rFKbCUg",
  },
  {
    id: "WWB001",
    sort: "twoHand",
    name: "녹슨 검",
    img: "https://lh3.google.com/u/0/d/184pMLP8ifWj4u2z7keDXlF9ICs5DbdFe",
  },
  {
    id: "WWD001",
    sort: "dual",
    name: "쌍칼",
    img: "https://lh3.google.com/u/0/d/1TBX-_ItMXoDdDfb5gM7Ge9-B4AU0QSbH",
  },
  {
    id: "WWC002",
    sort: "axe",
    name: "손도끼",
    img: "https://lh3.google.com/u/0/d/14UTwa9WFFDP_SraCiu5QZR9fvrTCIpsf",
  },
  {
    id: "WWE002",
    sort: "glove",
    name: "목장갑",
    img: "https://lh3.google.com/u/0/d/1YR4c1dfLr7cjT2KQU1AHJgpvMSFuarWy",
  },
  {
    id: "WWF001",
    sort: "tonfa",
    name: "대나무",
    img: "https://lh3.google.com/u/0/d/1s6m0maK_BwB9zGw1ysQqPxNT0Zvzhh-5",
  },
  {
    id: "WWG001",
    sort: "bat",
    name: "단봉",
    img: "https://lh3.google.com/u/0/d/1RmFMZXhcOt4kztW_aog3DnsjrO2XGo7b",
  },
  {
    id: "WWH001",
    sort: "whip",
    name: "채찍",
    img: "https://lh3.google.com/u/0/d/1i_ymAx_uG9-eUksydRg2A65bprBjjIOH",
  },
  {
    id: "WWI002",
    sort: "throw",
    name: "야구공",
    img: "https://lh3.google.com/u/0/d/1ckbALtOvVxQCi6DbdOljwua1GFIysaWA",
  },
  {
    id: "WWJ001",
    sort: "shuriken",
    name: "면도칼",
    img: "https://lh3.google.com/u/0/d/1wcrgMHcIinyorzVxD5M1elLhuqqM9Vo2",
  },
  {
    id: "WWK001",
    sort: "bow",
    name: "양궁",
    img: "https://lh3.google.com/u/0/d/1QnSKQBHvhPxcqyh62m14ARMph2LIsYOV",
  },
  {
    id: "WWL001",
    sort: "crossbow",
    name: "석궁",
    img: "https://lh3.google.com/u/0/d/1SEUXSvOXZrPG9Nfs528zWt_qGY8QFH2y",
  },
  {
    id: "WWM001",
    sort: "pistol",
    name: "발터 PPK",
    img: "https://lh3.google.com/u/0/d/107vs8WvSntW3RmcTXi92Y-RAzVaYNN6F",
  },
  {
    id: "WWN001",
    sort: "rifle",
    name: "페도로프 자동소총",
    img: "https://lh3.google.com/u/0/d/1Y1Xxj3ngmnnGMq0kGPLzBcuz8Ueho1N0",
  },
  {
    id: "WWO001",
    sort: "sniper",
    name: "화승총",
    img: "https://lh3.google.com/u/0/d/1IiPweycJ2wNLDUmPGE0J5VMbyuUsL-x1",
  },
  {
    id: "WWP001",
    sort: "hammer",
    name: "망치",
    img: "https://lh3.google.com/u/0/d/10kdpexMw-FbGqyHd5i8Sfdi7P9NwJ7WW",
  },
  {
    id: "WWQ001",
    sort: "spear",
    name: "단창",
    img: "https://lh3.google.com/u/0/d/1P0KDBo_HXA9fMzDc9d_s-WC0LONE8ohD",
  },
  {
    id: "WWR001",
    sort: "nunchaku",
    name: "쇠사슬",
    img: "https://lh3.google.com/u/0/d/1ZQYBu8_2ukSPAhwExlZ4M4b4mTKdyrbK",
  },
  {
    id: "WWS001",
    sort: "rapier",
    name: "바늘",
    img: "https://lh3.google.com/u/0/d/1bLU4Ruwotxkx1N9iRRY-gt6262fYdyhD",
  },
  {
    id: "WWT001",
    sort: "guitar",
    name: "보급형 기타",
    img: "https://lh3.google.com/u/0/d/1v-BtYL8BFwcqfWjP_msyWoAA8vtuW3Gn",
  },
  {
    id: "WWU001",
    sort: "camera",
    name: "렌즈",
    img: "https://lh3.google.com/u/0/d/1JLju5XQm8NDqJGvN-6f2btE716mz7lEO",
  },
  {
    id: "WWV001",
    sort: "arcana",
    name: "유리구슬",
    img: "https://lh3.google.com/u/0/d/1o4oaZrzvPAVKAXxoo5bEjcLSrqojv6oU",
  },
  {
    id: "GWW001",
    sort: "VFProsthetic",
    name: "바이퍼",
    img: "https://lh3.google.com/u/0/d/1zBbUzno7McwGadyHDX8oZJJSyJW6QzBU",
  },
];

export const equippable = [
  "clothes",
  "helmet",
  "bracelet",
  "shoes",
  "accessory",
  "weapon",
];

export const weaponSort = [
  "dagger",
  "twoHand",
  "axe",
  "dual",
  "glove",
  "tonfa",
  "bat",
  "whip",
  "throw",
  "shuriken",
  "bow",
  "crossbow",
  "pistol",
  "rifle",
  "sniper",
  "hammer",
  "spear",
  "nunchaku",
  "rapier",
  "guitar",
  "camera",
  "arcana",
  "VFProsthetic",
];

export const categoryById = (itemId) => {
  const category =
    itemId[1] === "W"
      ? "weapon"
      : idToCategory.equip[itemId[1]]
      ? idToCategory.equip[itemId[1]]
      : idToCategory.item[itemId[1]]
      ? idToCategory.item[itemId[1]]
      : null;
  return category;
};

export const areaData = area;

export const database = { weaponData, equipData, itemData };

export const searchById = (itemId) => {
  const itemInfo = { id: itemId, dept: "", category: "", details: {} };
  if (itemId[1] == "W") {
    itemInfo.dept = "weapon";
    itemInfo.category = idToCategory[itemInfo.dept][itemId[2]];
  } else if (["C", "H", "B", "S", "A"].includes(itemId[1])) {
    itemInfo.dept = "equip";
    itemInfo.category = idToCategory[itemInfo.dept][itemId[1]];
  } else if (["M", "T", "F", "D"].includes(itemId[1])) {
    itemInfo.dept = "item";
    itemInfo.category = idToCategory[itemInfo.dept][itemId[1]];
  }
  itemInfo.details = database[`${itemInfo.dept}Data`]
    .filter((dept) => dept.category == itemInfo.category)[0]
    .items.filter((list) => list.id == itemInfo.id)[0];
  return itemInfo.details;
};

export const itemOptions = {
  atk0: {
    kr: "공격력",
    en: "",
    ja: "",
    cn: "",
  },
  atk_spd1: {
    kr: "공격 속도",
    en: "",
    ja: "",
    cn: "",
  },
  basic_atk0: {
    kr: "기본 공격 추가 피해",
    en: "",
    ja: "",
    cn: "",
  },
  basic_atk_def0: {
    kr: "기본 공격 피해 감소",
    en: "",
    ja: "",
    cn: "",
  },
  cool1: {
    kr: "쿨다운 감소",
    en: "",
    ja: "",
    cn: "",
  },
  cri_atk1: {
    kr: "치명타 피해량",
    en: "",
    ja: "",
    cn: "",
  },
  cri_def1: {
    kr: "치명타 피해량 감소",
    en: "",
    ja: "",
    cn: "",
  },
  cri_rate1: {
    kr: "치명타 확률",
    en: "",
    ja: "",
    cn: "",
  },
  def0: {
    kr: "방어력",
    en: "",
    ja: "",
    cn: "",
  },
  description0: {
    kr: "상세 설명",
    en: "",
    ja: "",
    cn: "",
  },
  grow_atk0: {
    kr: "레벨 당 공격력",
    en: "",
    ja: "",
    cn: "",
  },
  grow_atk_spd1: {
    kr: "레벨 당 공격 속도",
    en: "",
    ja: "",
    cn: "",
  },
  grow_basic_atk0: {
    kr: "레벨 당 기본 공격 추가 피해",
    en: "",
    ja: "",
    cn: "",
  },
  grow_basic_atk1: {
    kr: "레벨 당 기본 공격 증폭",
    en: "",
    ja: "",
    cn: "",
  },
  grow_hp0: {
    kr: "레벨 당 최대 체력",
    en: "",
    ja: "",
    cn: "",
  },
  grow_skill0: {
    kr: "레벨 당 스킬 공격 추가 피해",
    en: "",
    ja: "",
    cn: "",
  },
  grow_skill1: {
    kr: "레벨 당 스킬 증폭",
    en: "",
    ja: "",
    cn: "",
  },
  heal_up1: {
    kr: "주는 회복 증가",
    en: "",
    ja: "",
    cn: "",
  },
  hp0: {
    kr: "최대 체력",
    en: "",
    ja: "",
    cn: "",
  },
  hp_reg1: {
    kr: "체력 재생",
    en: "",
    ja: "",
    cn: "",
  },
  load0: {
    kr: "장탄수",
    en: "",
    ja: "",
    cn: "",
  },
  move_spd0: {
    kr: "이동 속도",
    en: "",
    ja: "",
    cn: "",
  },
  mp0: {
    kr: "최대 스태미너",
    en: "",
    ja: "",
    cn: "",
  },
  mp_reg0: {
    kr: "스태미너 재생",
    en: "",
    ja: "",
    cn: "",
  },
  mp_reg1: {
    kr: "스태미너 재생",
    en: "",
    ja: "",
    cn: "",
  },
  non_combat_move_spd0: {
    kr: "비 전투중 이동 속도",
    en: "",
    ja: "",
    cn: "",
  },
  only0: {
    kr: "[조건]",
    en: "",
    ja: "",
    cn: "",
  },
  penet1: {
    kr: "방어 관통",
    en: "",
    ja: "",
    cn: "",
  },
  range0: {
    kr: "사거리",
    en: "",
    ja: "",
    cn: "",
  },
  skill0: {
    kr: "스킬 공격 추가 피해",
    en: "",
    ja: "",
    cn: "",
  },
  skill1: {
    kr: "스킬 증폭",
    en: "",
    ja: "",
    cn: "",
  },
  skill_def0: {
    kr: "스킬 피해 감소",
    en: "",
    ja: "",
    cn: "",
  },
  skill_def1: {
    kr: "스킬 피해 감소",
    en: "",
    ja: "",
    cn: "",
  },
  trap_def1: {
    kr: "트랩 피해 감소",
    en: "",
    ja: "",
    cn: "",
  },
  vamp1: {
    kr: "생명력 흡수",
    en: "",
    ja: "",
    cn: "",
  },
  vamp_all1: {
    kr: "모든 피해 흡혈",
    en: "",
    ja: "",
    cn: "",
  },
  vision0: {
    kr: "시야",
    en: "",
    ja: "",
    cn: "",
  },
  uniq001: {
    kr: "의념",
    en: "",
    ja: "",
    cn: "",
  },
  uniq002: {
    kr: "VF제어 강화",
    en: "",
    ja: "",
    cn: "",
  },
  uniq003: {
    kr: "가벼운 발걸음",
    en: "",
    ja: "",
    cn: "",
  },
  uniq004: {
    kr: "굴절",
    en: "",
    ja: "",
    cn: "",
  },
  uniq005: {
    kr: "더블 탭",
    en: "",
    ja: "",
    cn: "",
  },
  uniq006: {
    kr: "독사의 맹독",
    en: "",
    ja: "",
    cn: "",
  },
  uniq007: {
    kr: "루드라의 단검",
    en: "",
    ja: "",
    cn: "",
  },
  uniq008: {
    kr: "리플렉션",
    en: "",
    ja: "",
    cn: "",
  },
  uniq009: {
    kr: "마탄",
    en: "",
    ja: "",
    cn: "",
  },
  uniq010: {
    kr: "받는 회복 증가",
    en: "",
    ja: "",
    cn: "",
  },
  uniq011: {
    kr: "방해 효과 저항",
    en: "",
    ja: "",
    cn: "",
  },
  uniq012: {
    kr: "불꽃 결계",
    en: "",
    ja: "",
    cn: "",
  },
  uniq013: {
    kr: "사거리",
    en: "",
    ja: "",
    cn: "",
  },
  uniq014: {
    kr: "섬광",
    en: "",
    ja: "",
    cn: "",
  },
  uniq015: {
    kr: "세컨드 윈드-성전",
    en: "",
    ja: "",
    cn: "",
  },
  uniq016: {
    kr: "세컨드 윈드-핏빛 갈증",
    en: "",
    ja: "",
    cn: "",
  },
  uniq017: {
    kr: "세컨드 윈드-핏빛 계약",
    en: "",
    ja: "",
    cn: "",
  },
  uniq018: {
    kr: "신속:산들바람",
    en: "",
    ja: "",
    cn: "",
  },
  uniq019: {
    kr: "신속:플라즈마",
    en: "",
    ja: "",
    cn: "",
  },
  uniq020: {
    kr: "열정",
    en: "",
    ja: "",
    cn: "",
  },
  uniq021: {
    kr: "이동속도",
    en: "",
    ja: "",
    cn: "",
  },
  uniq022: {
    kr: "저주",
    en: "",
    ja: "",
    cn: "",
  },
  uniq023: {
    kr: "조금 가벼운 발걸음",
    en: "",
    ja: "",
    cn: "",
  },
  uniq024: {
    kr: "주는 회복 증가",
    en: "",
    ja: "",
    cn: "",
  },
  uniq025: {
    kr: "차지드 스트라이크",
    en: "",
    ja: "",
    cn: "",
  },
  uniq026: {
    kr: "철환",
    en: "",
    ja: "",
    cn: "",
  },
  uniq027: {
    kr: "충전-섬광",
    en: "",
    ja: "",
    cn: "",
  },
  uniq028: {
    kr: "치유방해(기본공격)",
    en: "",
    ja: "",
    cn: "",
  },
  uniq029: {
    kr: "치유방해(스킬)",
    en: "",
    ja: "",
    cn: "",
  },
  uniq030: {
    kr: "쿨다운 감소 최대치",
    en: "",
    ja: "",
    cn: "",
  },
  uniq031: {
    kr: "토납",
    en: "",
    ja: "",
    cn: "",
  },
  uniq032: {
    kr: "한파",
    en: "",
    ja: "",
    cn: "",
  },
  buff001: {
    kr: "루드라의 단검",
    en: "",
    ja: "",
    cn: "",
  },
  buff002: {
    kr: "블레싱:코스믹파워",
    en: "",
    ja: "",
    cn: "",
  },
  buff003: {
    kr: "산들바람",
    en: "",
    ja: "",
    cn: "",
  },
  buff004: {
    kr: "열정",
    en: "",
    ja: "",
    cn: "",
  },
  active001: {
    kr: "가속",
    en: "",
    ja: "",
    cn: "",
  },
  active002: {
    kr: "무효화",
    en: "",
    ja: "",
    cn: "",
  },
  active003: {
    kr: "블레싱:명상",
    en: "",
    ja: "",
    cn: "",
  },
  active004: {
    kr: "블레싱:코스믹파워",
    en: "",
    ja: "",
    cn: "",
  },
  active005: {
    kr: "정지",
    en: "",
    ja: "",
    cn: "",
  },
};
