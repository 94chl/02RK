import mastery from "~/json/mastery.json";
import modeModifier from "~/json/modeModifier.json";
import { callApi, corsApi } from "./utils";

export const generateCharacterData = async () => {
  const stats = await callApi("data/Character");
  const levelUpStats = await callApi("data/CharacterLevelUpStat");
  return { stats: stats.slice(0, 58), levelUpStats: levelUpStats.slice(0, 58) };
};

const langTest = async () => {
  const { l10Path } = await callApi("l10n/Korean");
  const language = await corsApi(l10Path);
  const result = language.split("\r\n").reduce((acc, cur) => {
    if (!cur.includes("┃")) {
      return acc;
    }
    const [key, value] = cur.split("┃");
    if (
      key.includes("Character/") ||
      key.includes("Skill/") ||
      key.includes("Skills/") ||
      key.includes("Trait")
    ) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export const masteryData = mastery;
export const modeModifierData = modeModifier;

export const statusOptions = {
  atk: {
    kr: "공격력",
    en: "Attack Power",
    ja: "攻撃力",
    cn: "攻擊力",
  },
  atk_spd: {
    kr: "공격 속도",
    en: "Attack Speed",
    ja: "攻撃速度",
    cn: "攻擊速度",
  },
  basic_atk: {
    kr: "기본 공격 증폭",
    en: "Basic Attack Amplification",
    ja: "基本攻撃増幅",
    cn: "普攻增幅",
  },
  basic_atk: {
    kr: "기본 공격 증폭",
    en: "Basic Attack Amplification",
    ja: "基本攻撃増幅",
    cn: "普攻增幅",
  },
  basic_atk_def: {
    kr: "기본 공격 피해 감소",
    en: "Defense from Basic Attacks",
    ja: "基本攻撃ダメージ減少",
    cn: "承受普攻傷害減少",
  },
  basic_atk_def: {
    kr: "기본 공격 피해 감소",
    en: "Defense from Basic Attacks",
    ja: "基本攻撃ダメージ減少",
    cn: "承受普攻傷害減少",
  },
  cool: {
    kr: "쿨다운 감소",
    en: "Cooldown Reduction",
    ja: "クールダウン減少",
    cn: "冷卻縮減",
  },
  cri_atk: {
    kr: "치명타 피해량",
    en: "Critical Strike Damage",
    ja: "致命打ダメージ量",
    cn: "暴擊傷害量",
  },
  cri_def: {
    kr: "치명타 피해량 감소",
    en: "Critical Damage Reduction",
    ja: "致命打ダメージ減少",
    cn: "承受暴擊傷害減少",
  },
  cri_rate: {
    kr: "치명타 확률",
    en: "Critical Strike Chance",
    ja: "致命打確率",
    cn: "暴擊率",
  },
  def: {
    kr: "방어력",
    en: "Defense",
    ja: "防御力",
    cn: "防禦力",
  },
  grow_atk: {
    kr: "레벨 당 공격력",
    en: "Attack Power per level",
    ja: "レベル比例攻撃力",
    cn: "每級別攻擊力",
  },
  grow_atk_spd: {
    kr: "레벨 당 공격 속도",
    en: "Attack speed per level",
    ja: "レベル比例攻撃速度",
    cn: "每級別攻擊速度",
  },
  grow_basic_atk: {
    kr: "레벨 당 기본 공격 증폭",
    en: "Basic Attack Amplification per level",
    ja: "レベル比例基本攻撃増幅",
    cn: "每級別普攻增幅",
  },
  grow_basic_atk: {
    kr: "레벨 당 기본 공격 증폭",
    en: "Basic Attack Amplification per level",
    ja: "レベル比例基本攻撃増幅",
    cn: "每級別普攻增幅",
  },
  grow_defense: {
    kr: "레벨 당 방어력",
    en: "Defense per level",
    ja: "レベル比例防御力",
    cn: "每級別防禦力",
  },
  grow_hp: {
    kr: "레벨 당 최대 체력",
    en: "Max HP per level",
    ja: "レベル比例最大体力",
    cn: "每級別體力上限",
  },
  grow_skill: {
    kr: "레벨 당 스킬 증폭",
    en: "Skill Amplification per level",
    ja: "レベル比例スキル増幅",
    cn: "每級別技能增幅",
  },
  grow_skill: {
    kr: "레벨 당 스킬 증폭",
    en: "Skill Amplification per level",
    ja: "レベル比例スキル増幅",
    cn: "每級別技能增幅",
  },
  heal_up: {
    kr: "주는 회복 증가",
    en: "Healing Power",
    ja: "与える回復増加",
    cn: "給予恢復",
  },
  hp: {
    kr: "최대 체력",
    en: "Max HP",
    ja: "最大体力",
    cn: "體力上限",
  },
  hp_reg: {
    kr: "체력 재생",
    en: "Hp Regen",
    ja: "体力再生",
    cn: "體力值再生",
  },
  hp_reg: {
    kr: "체력 재생",
    en: "Hp Regen",
    ja: "体力再生",
    cn: "體力值再生",
  },
  load: {
    kr: "장탄수",
    en: "Max Charges",
    ja: "最大チャージ数",
    cn: "Max Charges",
  },
  move_spd: {
    kr: "이동 속도",
    en: "Movement Speed",
    ja: "移動速度",
    cn: "移動速度",
  },
  mp: {
    kr: "최대 스태미너",
    en: "Max SP",
    ja: "最大スタミナ",
    cn: "耐力上限",
  },
  mp: {
    kr: "최대 스태미너",
    en: "Max SP",
    ja: "最大スタミナ",
    cn: "耐力上限",
  },
  mp_reg: {
    kr: "스태미너 재생",
    en: "SP Regen",
    ja: "スタミナ再生",
    cn: "耐力值再生",
  },
  mp_reg: {
    kr: "스태미너 재생",
    en: "SP Regen",
    ja: "スタミナ再生",
    cn: "耐力值再生",
  },
  non_combat_move_spd: {
    kr: "비 전투중 이동 속도",
    en: "Out Of Combat Movement Speed",
    ja: "非戦闘中の移動速度",
    cn: "非戰鬥狀態下移動速度",
  },
  penet: {
    kr: "방어 관통",
    en: "Armor penetration",
    ja: "防御貫通",
    cn: "防禦穿透%",
  },
  range: {
    kr: "사거리",
    en: "Attack Range",
    ja: "基本攻撃射程距離",
    cn: "攻擊射程",
  },
  skill: {
    kr: "스킬 증폭",
    en: "Skill Amplification",
    ja: "スキル増幅",
    cn: "技能增幅",
  },
  skill: {
    kr: "스킬 증폭",
    en: "Skill Amplification",
    ja: "スキル増幅",
    cn: "技能增幅",
  },
  skill_def: {
    kr: "스킬 피해 감소",
    en: "Skill Damage Reduction",
    ja: "スキルダメージ減少",
    cn: "承受技能傷害減少",
  },
  skill_def: {
    kr: "스킬 피해 감소",
    en: "Skill Damage Reduction",
    ja: "スキルダメージ減少",
    cn: "承受技能傷害減少",
  },
  trap_def: {
    kr: "트랩 피해 감소",
    en: "Trap Damage Reduction",
    ja: "トラップダメージ減少",
    cn: "陷阱傷害減少",
  },
  vamp: {
    kr: "생명력 흡수",
    en: "Life Steal",
    ja: "吸血",
    cn: "吸血",
  },
  vamp_all: {
    kr: "모든 피해 흡혈",
    en: "Omnisyphon",
    ja: "吸血‐すべてのダメージ",
    cn: "吸血 - 所有伤害",
  },
  vision: {
    kr: "시야",
    en: "Vision Range",
    ja: "視界範囲",
    cn: "視野範圍",
  },
  initExtraPoint: null,
  maxExtraPoint: null,
  influencePoint: null,
  radius: null,
  pathingRadius: null,
  uiHeight: null,
};

export const optionDictionary = {
  maxHp: "hp0",
  maxSp: "mp0",
  attackPower: "atk0",
  defense: "def0",
  criticalStrikeChance: "cri_rate1",
  hpRegen: "hp_reg0",
  spRegen: "hp_reg0",
  attackSpeed: "atk_spd1",
  moveSpeed: "move_spd0",
  sightRange: "vision0",
  AttackSpeedRatio: "atk_spd1",
  IncreaseBasicAttackDamageRatio: "basic_atk1",
  IncreaseSkillDamageRatio: "skill1",
  Defense: "def0",
  LifeSteal: "vamp_all1",
  AttackRange: "range0",
  PenetrationDefenseRatio: "penet1",
  CriticalStrikeDamage: "cri_atk1",
  AttackPower: "atk0",
  CooldownReduction: "cool1",
  SightRange: "vision0",
  MoveSpeed: "move_spd0",
  PreventBasicAttackDamagedRatio: "basic_atk_def1",
  PreventSkillDamagedRatio: "skill_def1",
  MaxSpRatio: "mp1",
  TrapDamageRatio: "trap_def1",
  attackSpeedLimit: null,
  attackSpeedMin: null,
  AmplifierToMonsterRatio: null,
  ItemBonusRatio: null,
  HpRegenRatioOutOfCombat: null,
  SpRegenRatioOutOfCombat: null,
};
