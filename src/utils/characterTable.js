import character from "~/json/character.json";
import mastery from "~/json/mastery.json";
import modeModifier from "~/json/modeModifier.json";

export const characterData = character;
export const masteryData = mastery;
export const modeModifierData = modeModifier;

export const statusOptions = {
  maxHp: {
    kr: "최대 체력",
    en: "Max HP",
    ja: "最大体力",
    cn: "體力上限",
  },
  maxSp: {
    kr: "최대 스태미너",
    en: "Max SP",
    ja: "最大スタミナ",
    cn: "耐力上限",
  },
  initExtraPoint: null,
  maxExtraPoint: null,
  attackPower: {
    kr: "공격력",
    en: "Attack Power",
    ja: "攻撃力",
    cn: "攻擊力",
  },
  defense: {
    kr: "방어력",
    en: "Defense",
    ja: "防御力",
    cn: "防禦力",
  },
  influencePoint: null,
  criticalStrikeChance: {
    kr: "치명타 확률",
    en: "Critical Strike Chance",
    ja: "致命打確率",
    cn: "暴擊率",
  },
  hpRegen: {
    kr: "체력 재생",
    en: "Hp Regen",
    ja: "体力再生",
    cn: "體力值再生",
  },
  spRegen: {
    kr: "스태미너 재생",
    en: "SP Regen",
    ja: "スタミナ再生",
    cn: "耐力值再生",
  },
  attackSpeed: {
    kr: "공격 속도",
    en: "Attack Speed",
    ja: "攻撃速度",
    cn: "攻擊速度",
  },
  attackSpeedLimit: {
    kr: "공격 속도 제한",
    en: "Attack Speed Limit",
    ja: "攻撃速度限界",
    cn: "攻擊速度上限",
  },
  attackSpeedMin: {
    kr: "최소 공격 속도",
    en: "Minimum Attack Speed",
    ja: "最小攻撃速度",
    cn: "攻擊速度下限",
  },
  moveSpeed: {
    kr: "이동 속도",
    en: "Movement Speed",
    ja: "移動速度",
    cn: "移動速度",
  },
  sightRange: {
    kr: "시야",
    en: "Vision Range",
    ja: "視界範囲",
    cn: "視野範圍",
  },
  radius: null,
  pathingRadius: null,
  uiHeight: null,
};
