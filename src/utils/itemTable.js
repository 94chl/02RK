import area from "~/json/area.json";
import equipData from "~/json/equip.json";
import itemData from "~/json/item.json";
import weaponData from "~/json/weapon.json";

export const categoryName = {
  dagger: { kr: "단검", en: "Dagger", ja: "短剣", cn: "短劍" },
  twoHand: { kr: "양손검", en: "Two-handed Sword", ja: "両手剣", cn: "雙手劍" },
  axe: { kr: "도끼", en: "Axe", ja: "斧", cn: "斧" },
  dual: { kr: "쌍검", en: "Dual Swords", ja: "双剣", cn: "雙劍" },
  pistol: { kr: "권총", en: "Pistol", ja: "拳銃", cn: "手槍" },
  rifle: {
    kr: "돌격 소총",
    en: "Assault Rifle",
    ja: "突撃小銃",
    cn: "突擊步槍",
  },
  sniper: { kr: "저격총", en: "Sniper Rifle", ja: "狙撃銃", cn: "狙擊槍" },
  rapier: { kr: "레이피어", en: "Rapier", ja: "レイピア", cn: "西洋劍" },
  spear: { kr: "창", en: "Spear", ja: "槍", cn: "槍" },
  hammer: { kr: "망치", en: "Hammer", ja: "金槌", cn: "錘子" },
  bat: { kr: "방망이", en: "Bat", ja: "バット", cn: "棍棒" },
  throw: { kr: "투척", en: "Throw", ja: "投げ", cn: "投擲" },
  shuriken: { kr: "암기", en: "Shuriken", ja: "暗器", cn: "暗器" },
  bow: { kr: "활", en: "Bow", ja: "弓", cn: "弓" },
  crossbow: { kr: "석궁", en: "Crossbow", ja: "石弓", cn: "弩" },
  glove: { kr: "글러브", en: "Glove", ja: "グローブ", cn: "拳套" },
  tonfa: { kr: "톤파", en: "Tonfa", ja: "トンファー", cn: "雙拐" },
  guitar: { kr: "기타", en: "Guitar", ja: "ギター", cn: "吉他" },
  nunchaku: { kr: "쌍절곤", en: "Nunchaku", ja: "双節棍", cn: "雙節棍" },
  whip: { kr: "채찍", en: "Whip", ja: "鞭", cn: "鞭子" },
  camera: { kr: "카메라", en: "Camera", ja: "カメラ", cn: "相機" },
  arcana: { kr: "아르카나", en: "Arcana", ja: "アルカナ", cn: "聖器" },
  VFProsthetic: {
    kr: "VF의수",
    en: "VF Prosthetic",
    ja: "VF義手",
    cn: "VF機械臂",
  },
  clothes: { kr: "옷", en: "Chest", ja: "服", cn: "胸部" },
  helmet: { kr: "머리", en: "Head", ja: "頭", cn: "頭部" },
  bracelet: { kr: "팔", en: "Arm", ja: "腕", cn: "手臂" },
  shoes: { kr: "다리", en: "Leg", ja: "脚", cn: "腿部" },
  accessory: { kr: "장식", en: "Accessory", ja: "装具", cn: "裝飾" },
  material: { kr: "재료", en: "Material", ja: "材料", cn: "材料" },
  food: { kr: "음식", en: "Food", ja: "食べ物", cn: "食物" },
  drink: { kr: "음료", en: "Beverage", ja: "飲み物", cn: "飲品" },
  trap: { kr: "설치", en: "Summon", ja: "設置", cn: "設置" },
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
    name: {
      kr: "식칼",
      en: "Kitchen Knife",
      ja: "包丁",
      cn: "菜刀",
    },
    img: "https://lh3.google.com/u/0/d/1CWaccytlbfcaGI2f-cJMvKRo6rFKbCUg",
  },
  {
    id: "WWB001",
    sort: "twoHand",
    name: {
      kr: "녹슨 검",
      en: "Rusty Sword",
      ja: "錆びついた剣",
      cn: "鐵銹劍",
    },
    img: "https://lh3.google.com/u/0/d/184pMLP8ifWj4u2z7keDXlF9ICs5DbdFe",
  },
  {
    id: "WWD001",
    sort: "dual",
    name: {
      kr: "쌍칼",
      en: "Twin Blades",
      ja: "双刀",
      cn: "雙刀",
    },
    img: "https://lh3.google.com/u/0/d/1TBX-_ItMXoDdDfb5gM7Ge9-B4AU0QSbH",
  },
  {
    id: "WWC002",
    sort: "axe",
    name: {
      kr: "손도끼",
      en: "Hatchet",
      ja: "ハチェット",
      cn: "短柄斧",
    },
    img: "https://lh3.google.com/u/0/d/14UTwa9WFFDP_SraCiu5QZR9fvrTCIpsf",
  },
  {
    id: "WWE002",
    sort: "glove",
    name: {
      kr: "목장갑",
      en: "Cotton Gloves",
      ja: "軍手",
      cn: "作業用手套",
    },
    img: "https://lh3.google.com/u/0/d/1YR4c1dfLr7cjT2KQU1AHJgpvMSFuarWy",
  },
  {
    id: "WWF001",
    sort: "tonfa",
    name: { kr: "대나무", en: "Bamboo", ja: "竹", cn: "竹子" },
    img: "https://lh3.google.com/u/0/d/1s6m0maK_BwB9zGw1ysQqPxNT0Zvzhh-5",
  },
  {
    id: "WWG001",
    sort: "bat",
    name: { kr: "단봉", en: "Short Rod", ja: "短棒", cn: "短棍" },
    img: "https://lh3.google.com/u/0/d/1RmFMZXhcOt4kztW_aog3DnsjrO2XGo7b",
  },
  {
    id: "WWH001",
    sort: "whip",
    name: { kr: "채찍", en: "Whip", ja: "鞭", cn: "鞭子" },
    img: "https://lh3.google.com/u/0/d/1i_ymAx_uG9-eUksydRg2A65bprBjjIOH",
  },
  {
    id: "WWI002",
    sort: "throw",
    name: {
      kr: "야구공",
      en: "Baseball",
      ja: "野球ボール",
      cn: "棒球",
    },
    img: "https://lh3.google.com/u/0/d/1ckbALtOvVxQCi6DbdOljwua1GFIysaWA",
  },
  {
    id: "WWJ001",
    sort: "shuriken",
    name: { kr: "면도칼", en: "Razor", ja: "剃刀", cn: "剃刀" },
    img: "https://lh3.google.com/u/0/d/1wcrgMHcIinyorzVxD5M1elLhuqqM9Vo2",
  },
  {
    id: "WWK001",
    sort: "bow",
    name: { kr: "양궁", en: "Bow", ja: "洋弓", cn: "弓" },
    img: "https://lh3.google.com/u/0/d/1QnSKQBHvhPxcqyh62m14ARMph2LIsYOV",
  },
  {
    id: "WWL001",
    sort: "crossbow",
    name: {
      kr: "석궁",
      en: "Short Crossbow",
      ja: "石弓",
      cn: "短弩",
    },
    img: "https://lh3.google.com/u/0/d/1SEUXSvOXZrPG9Nfs528zWt_qGY8QFH2y",
  },
  {
    id: "WWM001",
    sort: "pistol",
    name: {
      kr: "발터 PPK",
      en: "Walther PPK",
      ja: "ワルサーPPK",
      cn: "瓦爾特PPK",
    },
    img: "https://lh3.google.com/u/0/d/107vs8WvSntW3RmcTXi92Y-RAzVaYNN6F",
  },
  {
    id: "WWN001",
    sort: "rifle",
    name: {
      kr: "페도로프 자동소총",
      en: "Fedorova",
      ja: "フェドロバ自動小銃",
      cn: "費德洛夫自動步槍",
    },
    img: "https://lh3.google.com/u/0/d/1Y1Xxj3ngmnnGMq0kGPLzBcuz8Ueho1N0",
  },
  {
    id: "WWO001",
    sort: "sniper",
    name: {
      kr: "화승총",
      en: "Long Rifle",
      ja: "火縄銃",
      cn: "長步槍",
    },
    img: "https://lh3.google.com/u/0/d/1IiPweycJ2wNLDUmPGE0J5VMbyuUsL-x1",
  },
  {
    id: "WWP001",
    sort: "hammer",
    name: { kr: "망치", en: "Hammer", ja: "金槌", cn: "錘子" },
    img: "https://lh3.google.com/u/0/d/10kdpexMw-FbGqyHd5i8Sfdi7P9NwJ7WW",
  },
  {
    id: "WWQ001",
    sort: "spear",
    name: {
      kr: "단창",
      en: "Short Spear",
      ja: "短槍",
      cn: "短矛",
    },
    img: "https://lh3.google.com/u/0/d/1P0KDBo_HXA9fMzDc9d_s-WC0LONE8ohD",
  },
  {
    id: "WWR001",
    sort: "nunchaku",
    name: {
      kr: "쇠사슬",
      en: "Steel Chain",
      ja: "鎖",
      cn: "鐵鍊",
    },
    img: "https://lh3.google.com/u/0/d/1ZQYBu8_2ukSPAhwExlZ4M4b4mTKdyrbK",
  },
  {
    id: "WWS001",
    sort: "rapier",
    name: { kr: "바늘", en: "Needle", ja: "針", cn: "針" },
    img: "https://lh3.google.com/u/0/d/1bLU4Ruwotxkx1N9iRRY-gt6262fYdyhD",
  },
  {
    id: "WWT001",
    sort: "guitar",
    name: {
      kr: "보급형 기타",
      en: "Starter Guitar",
      ja: "普及型ギター",
      cn: "紅心",
    },
    img: "https://lh3.google.com/u/0/d/1v-BtYL8BFwcqfWjP_msyWoAA8vtuW3Gn",
  },
  {
    id: "WWU001",
    sort: "camera",
    name: { kr: "렌즈", en: "Lens", ja: "レンズ", cn: "鏡頭" },
    img: "https://lh3.google.com/u/0/d/1JLju5XQm8NDqJGvN-6f2btE716mz7lEO",
  },
  {
    id: "WWV001",
    sort: "arcana",
    name: {
      kr: "유리구슬",
      en: "Glass Bead",
      ja: "ガラス玉",
      cn: "琉璃球",
    },
    img: "https://lh3.google.com/u/0/d/1o4oaZrzvPAVKAXxoo5bEjcLSrqojv6oU",
  },
  {
    id: "GWW001",
    sort: "VFProsthetic",
    name: {
      kr: "바이퍼",
      en: "Viper",
      ja: "ヴァイパー",
      cn: "毒蛇",
    },
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
    en: "Attack Power",
    ja: "攻撃力",
    cn: "攻擊力",
  },
  atk_spd1: {
    kr: "공격 속도",
    en: "Attack Speed",
    ja: "攻撃速度",
    cn: "攻擊速度",
  },
  basic_atk0: {
    kr: "기본 공격 추가 피해",
    en: "Extra Basic Attack Damage",
    ja: "基本攻撃追加ダメージ",
    cn: "普攻額外傷害",
  },
  basic_atk_def0: {
    kr: "기본 공격 피해 감소",
    en: "Defense from Basic Attacks",
    ja: "基本攻撃ダメージ減少",
    cn: "承受普攻傷害減少",
  },
  cool1: {
    kr: "쿨다운 감소",
    en: "Cooldown Reduction",
    ja: "クールダウン減少",
    cn: "冷卻縮減",
  },
  cri_atk1: {
    kr: "치명타 피해량",
    en: "Critical Strike Damage",
    ja: "致命打ダメージ量",
    cn: "暴擊傷害量",
  },
  cri_def1: {
    kr: "치명타 피해량 감소",
    en: "Critical Damage Reduction",
    ja: "致命打ダメージ減少",
    cn: "承受暴擊傷害減少",
  },
  cri_rate1: {
    kr: "치명타 확률",
    en: "Critical Strike Chance",
    ja: "致命打確率",
    cn: "暴擊率",
  },
  def0: {
    kr: "방어력",
    en: "Defense",
    ja: "防御力",
    cn: "防禦力",
  },
  grow_atk0: {
    kr: "레벨 당 공격력",
    en: "Attack Power per level",
    ja: "レベル比例攻撃力",
    cn: "每級別攻擊力",
  },
  grow_atk_spd1: {
    kr: "레벨 당 공격 속도",
    en: "Attack speed per level",
    ja: "レベル比例攻撃速度",
    cn: "每級別攻擊速度",
  },
  grow_basic_atk0: {
    kr: "레벨 당 기본 공격 추가 피해",
    en: "Extra Basic Attack Damage per level",
    ja: "レベル比例基本攻撃追加ダメージ",
    cn: "每級別普攻額外傷害",
  },
  grow_basic_atk1: {
    kr: "레벨 당 기본 공격 증폭",
    en: "Basic Attack Amplification per level",
    ja: "レベル比例基本攻撃増幅",
    cn: "每級別普攻增幅",
  },
  grow_defense0: {
    kr: "레벨 당 방어력",
    en: "Defense per level",
    ja: "レベル比例防御力",
    cn: "每級別防禦力",
  },
  grow_hp0: {
    kr: "레벨 당 최대 체력",
    en: "Max HP per level",
    ja: "レベル比例最大体力",
    cn: "每級別體力上限",
  },
  grow_skill0: {
    kr: "레벨 당 스킬 공격 추가 피해",
    en: "Extra Skill Damage per level",
    ja: "レベル比例スキル攻撃追加ダメージ",
    cn: "每級別技能額外傷害",
  },
  grow_skill1: {
    kr: "레벨 당 스킬 증폭",
    en: "Skill Amplification per level",
    ja: "レベル比例スキル増幅",
    cn: "每級別技能增幅",
  },
  heal_up1: {
    kr: "주는 회복 증가",
    en: "Healing Power",
    ja: "与える回復増加",
    cn: "給予恢復",
  },
  hp0: {
    kr: "최대 체력",
    en: "Max HP",
    ja: "最大体力",
    cn: "體力上限",
  },
  hp_reg0: {
    kr: "체력 재생",
    en: "Hp Regen",
    ja: "体力再生",
    cn: "體力值再生",
  },
  hp_reg1: {
    kr: "체력 재생",
    en: "Hp Regen",
    ja: "体力再生",
    cn: "體力值再生",
  },
  load0: {
    kr: "장탄수",
    en: "Max Charges",
    ja: "最大チャージ数",
    cn: "",
  },
  move_spd0: {
    kr: "이동 속도",
    en: "Movement Speed",
    ja: "移動速度",
    cn: "移動速度",
  },
  mp0: {
    kr: "최대 스태미너",
    en: "Max SP",
    ja: "最大スタミナ",
    cn: "耐力上限",
  },
  mp_reg0: {
    kr: "스태미너 재생",
    en: "SP Regen",
    ja: "スタミナ再生",
    cn: "耐力值再生",
  },
  mp_reg1: {
    kr: "스태미너 재생",
    en: "SP Regen",
    ja: "スタミナ再生",
    cn: "耐力值再生",
  },
  non_combat_move_spd0: {
    kr: "비 전투중 이동 속도",
    en: "Out Of Combat Movement Speed",
    ja: "非戦闘中の移動速度",
    cn: "非戰鬥狀態下移動速度",
  },
  penet1: {
    kr: "방어 관통",
    en: "Armor penetration",
    ja: "防御貫通",
    cn: "防禦穿透%",
  },
  range0: {
    kr: "사거리",
    en: "Attack Range",
    ja: "基本攻撃射程距離",
    cn: "攻擊射程",
  },
  skill0: {
    kr: "스킬 공격 추가 피해",
    en: "Extra Skill Damage",
    ja: "スキル攻撃追加ダメージ",
    cn: "技能額外傷害",
  },
  skill1: {
    kr: "스킬 증폭",
    en: "Skill Amplification",
    ja: "スキル増幅",
    cn: "技能增幅",
  },
  skill_def0: {
    kr: "스킬 피해 감소",
    en: "Skill Damage Reduction",
    ja: "スキルダメージ減少",
    cn: "承受技能傷害減少",
  },
  skill_def1: {
    kr: "스킬 피해 감소",
    en: "Skill Damage Reduction",
    ja: "スキルダメージ減少",
    cn: "承受技能傷害減少",
  },
  trap_def1: {
    kr: "트랩 피해 감소",
    en: "Trap Damage Reduction",
    ja: "トラップダメージ減少",
    cn: "陷阱傷害減少",
  },
  vamp1: {
    kr: "생명력 흡수",
    en: "Life Steal",
    ja: "吸血",
    cn: "吸血",
  },
  vamp_all1: {
    kr: "모든 피해 흡혈",
    en: "Omnisyphon",
    ja: "吸血‐すべてのダメージ",
    cn: "吸血 - 所有伤害",
  },
  vision0: {
    kr: "시야",
    en: "Vision Range",
    ja: "視界範囲",
    cn: "視野範圍",
  },
  only: {
    kr: "조건",
    en: "Only",
    ja: "専用",
    cn: "專用",
  },
  transferDrone: {
    kr: "원격 전송 드론",
    en: "Transfer Drone",
    ja: "遠隔転送ドローン",
    cn: "無人機配送",
  },
  transferConsole: {
    kr: "전송 콘솔",
    en: "Transfer Console",
    ja: "転送コンソール",
    cn: "傳送裝置",
  },
  uniq001: {
    kr: "의념",
    en: "Biotic Infusion",
    ja: "意念",
    cn: "意念",
  },
  uniq002: {
    kr: "열정",
    en: "Vigor",
    ja: "情熱",
    cn: "熱情",
  },
  uniq003: {
    kr: "가벼운 발걸음",
    en: "Swift Strides",
    ja: "軽い足取り",
    cn: "微步",
  },
  uniq004: {
    kr: "굴절",
    en: "Temporal Refraction",
    ja: "屈折",
    cn: "折射",
  },
  uniq005: {
    kr: "리플렉션",
    en: "Reflection",
    ja: "リフレクション",
    cn: "荊棘",
  },
  uniq006: {
    kr: "저주",
    en: "Primordial Hex",
    ja: "呪い",
    cn: "詛咒",
  },
  uniq007: {
    kr: "쿨다운 감소 최대치",
    en: "Cooldown Reduction Cap",
    ja: "最大クールダウン減少",
    cn: "冷卻上限減少",
  },
  uniq008: {
    kr: "사거리",
    en: "Attack Range",
    ja: "基本攻撃射程距離",
    cn: "攻擊射程",
  },
  uniq009: {
    kr: "이동 속도",
    en: "Movement Speed",
    ja: "移動速度",
    cn: "移動速度",
  },
  uniq010: {
    kr: "받는 회복 증가",
    en: "Healing Received",
    ja: "受ける回復増加",
    cn: "所受恢復增加",
  },
  uniq011: {
    kr: "방해 효과 저항",
    en: "Tenacity",
    ja: "行動妨害耐性",
    cn: "負面效果抵禦",
  },
  uniq013: {
    kr: "치유방해(기본공격)",
    en: "Healing Reduction: Basic Attack",
    ja: "治癒妨害 - 基本攻撃",
    cn: "減少治癒-普攻",
  },
  uniq014: {
    kr: "치유방해(스킬)",
    en: "Healing Reduction: Skill",
    ja: "治癒妨害 - スキル",
    cn: "減少治癒-技能",
  },
  uniq015: {
    kr: "세컨드 윈드-성전",
    en: "Second Wind: Crusade",
    ja: "セカンドウインド - 聖伝",
    cn: "逆流 - 聖戰",
  },
  uniq016: {
    kr: "세컨드 윈드-핏빛 갈증",
    en: "Second Wind: Panic Button",
    ja: "セカンドウインド - 血の渇き",
    cn: "逆流 - 渴血症",
  },
  uniq017: {
    kr: "세컨드 윈드-핏빛 계약",
    en: "Second Wind: Blood Pact",
    ja: "セカンドウインド - 血の契約",
    cn: "逆流 - 血之契約",
  },
  uniq018: {
    kr: "세컨드 윈드-공방일체",
    en: "Second Wind: Quick Guard",
    ja: "セカンドウインド - 攻防一体",
    cn: "逆流 - 攻防一體",
  },
  uniq019: {
    kr: "신속 - 플라즈마",
    en: "Streamlined: Charge Carrier",
    ja: "迅速 - プラズマ",
    cn: "神速 - 等離子",
  },
  uniq020: {
    kr: "신속 - 루드라의 단검",
    en: "Streamlined: Rudra Embodied",
    ja: "迅速 - ルドラの短剣",
    cn: "神速 - 魯德拉的短劍",
  },
  uniq021: {
    kr: "신속 - 산들바람",
    en: "Streamlined: Zephyr",
    ja: "迅速 - そよ風",
    cn: "神速 - 微風",
  },
  uniq022: {
    kr: "최후의 한발 - 더블 탭",
    en: "Conclusion: Double Tap",
    ja: "最後の一発 - ダブルタップ",
    cn: "最後一發 - 煞尾",
  },
  uniq023: {
    kr: "최후의 한발 - 마탄",
    en: "Conclusion: Last Word",
    ja: "最後の一発 - 魔弾",
    cn: "最後一發 - 魔彈",
  },
  uniq025: {
    kr: "차지드 스트라이크",
    en: "Focused Impact",
    ja: "チャージドストライク",
    cn: "致命",
  },
  uniq026: {
    kr: "충전 - 철환",
    en: "Burden: Lead Shell",
    ja: "チャージ - 鉄丸",
    cn: "充能 - 铁环",
  },
  uniq027: {
    kr: "충전 - 섬광",
    en: "Burden: Magnetic Midnight",
    ja: "チャージ - 閃光",
    cn: "充能 - 闪光",
  },
  uniq030: {
    kr: "불꽃 결계",
    en: "Flame Barrier",
    ja: "炎の結界",
    cn: "熾焰",
  },
  uniq031: {
    kr: "발화",
    en: "Smolder",
    ja: "発火",
    cn: "起火",
  },
  uniq033: {
    kr: "토납",
    en: "Tranquility",
    ja: "吐納",
    cn: "吐息",
  },
  uniq034: {
    kr: "한파",
    en: "Lich's Grasp",
    ja: "寒波",
    cn: "寒波",
  },
  uniq035: {
    kr: "연날리기",
    en: "Smooth Walker",
    ja: "スムース·ウォーカー",
    cn: "風箏",
  },
  uniq040: {
    kr: "독사의 맹독",
    en: "Necrosis",
    ja: "毒蛇の猛毒",
    cn: "猛毒",
  },
  uniq041: {
    kr: "VF제어 강화",
    en: "VF Control Enhancement",
    ja: "VF制御強化",
    cn: "VF支配 強化",
  },
  buff001: {
    kr: "신속 - 루드라의 단검",
    en: "Streamlined: Rudra Embodied",
    ja: "迅速 - ルドラの短剣",
    cn: "神速 - 魯德拉的短劍",
  },
  buff002: {
    kr: "신속 - 플라즈마",
    en: "Streamlined: Charge Carrier",
    ja: "迅速 - プラズマ",
    cn: "神速 - 等離子",
  },
  buff003: {
    kr: "신속 - 산들바람",
    en: "Streamlined: Zephyr",
    ja: "迅速 - そよ風",
    cn: "神速 - 微風",
  },
  buff004: {
    kr: "열정",
    en: "Vigor",
    ja: "情熱",
    cn: "热情",
  },
  buff005: {
    kr: "블레싱:코스믹파워",
    en: "Blessing: Cosmic Efflux",
    ja: "祝福 : コスモパワー",
    cn: "祝福:蒼穹之力",
  },
  buff006: {
    kr: "저주",
    en: "Primordial Hex",
    ja: "呪い",
    cn: "詛咒",
  },
  buff015: {
    kr: "롤링썬더",
    en: "",
    ja: "",
    cn: "",
  },
  active001: {
    kr: "가속",
    en: "Sprint",
    ja: "加速",
    cn: "加速",
  },
  active002: {
    kr: "무효화",
    en: "Nullification",
    ja: "無効化",
    cn: "淨化",
  },
  active003: {
    kr: "블레싱:명상",
    en: "Blessing: Calm Mind",
    ja: "祝福 : 瞑想",
    cn: "祝福:冥想",
  },
  active004: {
    kr: "블레싱:코스믹파워",
    en: "Blessing: Cosmic Efflux",
    ja: "祝福 : コスモパワー",
    cn: "祝福:蒼穹之力",
  },
  active005: {
    kr: "정지",
    en: "Respite",
    ja: "停止",
    cn: "靜止",
  },
  active015: {
    kr: "롤링썬더",
    en: "Rolling Thunder",
    ja: "ローリング·サンダー",
    cn: "滾雷",
  },
  active016: {
    kr: "중력장",
    en: "Gravitational Field",
    ja: "重力場",
    cn: "重力場",
  },
};

export const database = {
  weaponData,
  equipData,
  itemData,
};
