<template>
  <div class="status">
    <div class="tabName">
      <h2>{{ $t("modal.status") }}</h2>
      <div class="buttonBox" data-dropDown="status">
        <div class="equipButtonBox">
          <button
            :class="`changeStatusEquipKeyBtn ${
              statusEquipKey === 'targetItems' ? 'selected' : ''
            }`"
            @click="onChangeStatusEquipKey"
          >
            <i class="fa-solid fa-crosshairs"></i>
          </button>
          <button
            :class="`changeStatusEquipKeyBtn ${
              statusEquipKey === 'bagItems' ? 'selected' : ''
            }`"
            @click="onChangeStatusEquipKey"
          >
            <i class="fas fa-suitcase"></i>
          </button>
        </div>
        <button
          @click="onToggleDropDown"
          :class="`toggleSelectBtn ${dropDown.status ? 'opened' : 'closed'}`"
        >
          <i class="fas fa-angle-double-down"></i>
          <i class="fas fa-angle-double-up"></i>
        </button>
      </div>
    </div>
    <div :class="`${dropDown.status ? '' : 'hide'}`">
      <div class="status_info">
        <div class="optionBox total" v-if="selectedCharacter">
          <div class="characterImage">
            <div class="header">
              <div v-if="selectedCharacter" class="inputBox">
                <div class="level">
                  <span>Level</span>
                  <div>
                    <button @click="changeLevel(-1, 'characterLevel')">
                      <i class="fas fa-minus"></i>
                    </button>
                    <input
                      type="text"
                      name="characterLevel"
                      id="characterLevel"
                      :value="characterLevel"
                      @input="changeLevel($event, 'characterLevel')"
                    />
                    <button @click="changeLevel(1, 'characterLevel')">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div class="level">
                  <span>Mastery</span>
                  <div>
                    <button @click="changeLevel(-1, 'masteryLevel')">
                      <i class="fas fa-minus"></i>
                    </button>
                    <input
                      type="text"
                      name="masteryLevel"
                      id="masteryLevel"
                      :value="masteryLevel"
                      @input="changeLevel($event, 'masteryLevel')"
                    />
                    <button @click="changeLevel(1, 'masteryLevel')">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                :src="
                  require(`~/img/character/half/${selectedCharacter?.code}.webp`)
                "
                :alt="`${selectedCharacter.name}_img`"
                :title="`${selectedCharacter.name}_img`"
              />
              <div class="weaponGroup">
                <div class="imageBox">
                  <button
                    v-for="(mastery, index) in selectedCharacter?.mastery || []"
                    :key="mastery?.code"
                    :class="
                      mastery?.code === selectedMastery?.code && 'selected'
                    "
                    :data-index="index"
                    @click="changeWeaponGroup"
                  >
                    <img
                      :src="require(`~/img/weaponGroup/${mastery.type}.webp`)"
                      :alt="`${mastery.type}_img`"
                      :title="`${mastery.type}_img`"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ul>
            <li
              v-for="optionKey in totalOption.totalKeys"
              :key="optionKey"
              class="option"
            >
              <div class="optionInfo">
                <span class="optionInfo_name">
                  {{
                    `${statusOptions?.[optionKey]?.[language]}${
                      optionKey === "atk_spd"
                        ? `(${selectedCharacter?.attackSpeedMin} ~ ${selectedCharacter?.attackSpeedLimit})`
                        : ""
                    } :`
                  }}</span
                >
                <div
                  class="optionInfo_total fixed"
                  v-if="totalOption.total?.[optionKey]?.[0]"
                >
                  <div class="total">
                    {{ totalOption.total?.[optionKey]?.[0] || 0 }}
                  </div>
                  <div class="extra">
                    <span>
                      {{
                        `(${totalOption.character?.[`${optionKey}0`] || 0}`
                      }}</span
                    >
                    <span>{{
                      totalOption.level?.[`${optionKey}0`]
                        ? totalOption.level?.[`${optionKey}0`] < 0
                          ? totalOption.level?.[`${optionKey}0`]
                          : `+${totalOption.level?.[`${optionKey}0`]}`
                        : "+0"
                    }}</span>
                    <span>{{
                      totalOption.mastery?.[`${optionKey}0`]
                        ? totalOption.mastery?.[`${optionKey}0`] < 0
                          ? totalOption.mastery?.[`${optionKey}0`]
                          : `+${totalOption.mastery?.[`${optionKey}0`]}`
                        : "+0"
                    }}</span>
                    <span>{{
                      `${
                        totalOption.equip?.[`${optionKey}0`]
                          ? totalOption.equip?.[`${optionKey}0`] < 0
                            ? totalOption.equip?.[`${optionKey}0`]
                            : `+${totalOption.equip?.[`${optionKey}0`]}`
                          : "+0"
                      })`
                    }}</span>
                  </div>
                </div>

                <div
                  class="optionInfo_total ratio"
                  v-if="totalOption.total?.[optionKey]?.[1]"
                >
                  <div class="total">
                    {{ `${totalOption.total?.[optionKey]?.[1] || 0}%` }}
                  </div>
                  <div class="extra">
                    <span>
                      {{
                        `(${totalOption.character?.[`${optionKey}1`] || 0}`
                      }}</span
                    >
                    <span>{{
                      totalOption.level?.[`${optionKey}1`]
                        ? totalOption.level?.[`${optionKey}1`] < 0
                          ? totalOption.level?.[`${optionKey}1`]
                          : `+${totalOption.level?.[`${optionKey}1`]}`
                        : "+0"
                    }}</span>
                    <span>{{
                      totalOption.mastery?.[`${optionKey}1`]
                        ? totalOption.mastery?.[`${optionKey}1`] < 0
                          ? totalOption.mastery?.[`${optionKey}1`]
                          : `+${totalOption.mastery?.[`${optionKey}1`]}`
                        : "+0"
                    }}</span>
                    <span>{{
                      `${
                        totalOption.equip?.[`${optionKey}1`]
                          ? totalOption.equip?.[`${optionKey}1`] < 0
                            ? totalOption.equip?.[`${optionKey}1`]
                            : `+${totalOption.equip?.[`${optionKey}1`]}`
                          : "+0"
                      })`
                    }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="status_info" v-if="Object.keys(equipOption.uniq).length > 0">
        <div class="tabName">
          <h3>
            {{
              `${$t("itemPreviewSection.optionUniq")}/${$t(
                "itemPreviewSection.optionbuff"
              )}/${$t("itemPreviewSection.optionActive")}`
            }}
          </h3>
          <div class="buttonBox" data-dropDown="unique">
            <button
              @click="onToggleDropDown"
              :class="`toggleSelectBtn ${
                dropDown.unique ? 'opened' : 'closed'
              }`"
            >
              <i class="fas fa-angle-double-down"></i>
              <i class="fas fa-angle-double-up"></i>
            </button>
          </div>
        </div>

        <div class="optionBox" v-if="dropDown.unique">
          <ul>
            <li
              v-for="[optionId, optionValue] in Object.entries(
                equipOption.uniq
              ).sort((a, b) => b > a)"
              :key="optionId"
              class="option"
            >
              <div v-if="optionId.match(/(only)/g)" class="optionInfo">
                <span class="optionInfo_name">
                  {{ `[${itemOptions[optionId][language]}] : ` }}
                </span>
                <span class="optionInfo_value">
                  <span>{{ optionValue[language] }}</span>
                </span>
              </div>
              <div
                v-else-if="optionId.match(/(active)|(buff)|(uniq)/g)"
                class="optionInfo unique"
              >
                <span class="optionInfo_name">
                  {{
                    `[${
                      optionId.match(/(uniq)/g)
                        ? $t("itemPreviewSection.optionUniq")
                        : optionId.match(/(buff)/g)
                        ? $t("itemPreviewSection.optionbuff")
                        : optionId.match(/(active)/g)
                        ? $t("itemPreviewSection.optionActive")
                        : ""
                    }] ${itemOptions[optionId][language]}`
                  }}
                </span>
                <div class="optionInfo_values">
                  <ul class="uniqueOptions">
                    <li
                      v-for="uniqueOption in optionValue.detail[language]"
                      :key="optionValue + uniqueOption"
                      class="uniqueOption"
                    >
                      {{ uniqueOption }}
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { toFloat, toPercent } from "~/utils/utils";
  import { searchById, itemOptions } from "~/utils/itemTable";
  import { statusOptions, optionDictionary } from "~/utils/characterTable";
  import Character from "./Character.vue";

  export default {
    data() {
      return {
        systemOption: [
          "id",
          "sort",
          "img",
          "location",
          "tobe",
          "material",
          "pickup",
          "limit",
          "stack",
          "name",
          "reload",
        ],
        itemOptions,
        statusOptions,
        selectedMasteryIndex: 0,
        characterLevel: 1,
        masteryLevel: 1,
      };
    },
    components: { Character },
    computed: {
      language() {
        return this.$store.state.language;
      },
      dropDown() {
        return this.$store.state.dropDown;
      },
      targetItems() {
        return this.$store.state.targetItems;
      },
      bagItems() {
        return this.$store.state.bagEquip;
      },
      statusEquipKey() {
        return this.$store.state.statusEquipKey;
      },
      equipOption() {
        const equipData =
          this.statusEquipKey === "targetItems"
            ? this.targetItems
            : Object.values(this.bagItems);

        const equipOption = {};
        const uniqOption = {};
        const commonOption = {};

        Object.values(equipData).forEach((item) => {
          if (!item.id) return;
          if (this.statusEquipKey === "bagItems") item = searchById(item.id);
          Object.entries(item).forEach(([key, value]) => {
            if (!this.systemOption.includes(key) && itemOptions[key]) {
              if (key.match(/(active)|(buff)|(uniq)|(only)/g)) {
                uniqOption[key] = Math.max(uniqOption[key], value) || value;
              } else {
                commonOption[key] = !commonOption[key]
                  ? value
                  : toFloat(commonOption[key] + value);
              }
            }
          });
        }, {});
        equipOption.uniq = uniqOption;
        equipOption.common = commonOption;
        return equipOption;
      },
      selectedCharacter() {
        return this.$store.state.selectedCharacter;
      },
      selectedMastery() {
        const {
          characterCode,
          code,
          option1,
          option2,
          option3,
          optionValue1,
          optionValue2,
          optionValue3,
          type,
        } = this.$store.state.selectedMastery;
        const mastery = {
          code,
          characterCode,
          type,
          [option1]: optionValue1,
          [option2]: optionValue2,
          [option3]: optionValue3,
        };
        return mastery;
      },
      totalOption() {
        const totalOption = {
          character: {},
          level: {},
          mastery: {},
          equip: {},
          optionKeys: [],
          total: {},
        };
        const optionKeys = new Set();
        const totalKeys = new Set();

        Object.entries(this.selectedCharacter).forEach((option) => {
          const [key, value] = option;
          const optionKey = optionDictionary?.[key];
          if (optionKey) {
            if (!optionKeys.has(optionKey)) {
              optionKeys.add(optionKey);
            }
            const fixedValue =
              optionKey[optionKey.length - 1] === "0"
                ? toFloat(value)
                : toPercent(value);
            totalOption.character[optionKey] =
              toFloat(totalOption.character[optionKey] + fixedValue) ||
              fixedValue;
          }

          const totalKey = optionDictionary?.[key];
          if (totalKey) {
            const convertedKey = totalKey.slice(0, totalKey.length - 1);
            if (!totalKeys.has(convertedKey)) {
              totalKeys.add(convertedKey);
            }
            const category = totalKey[totalKey.length - 1];
            let fixedValue = 0;
            const nextValue = {
              0: totalOption.total?.[convertedKey]?.[0] || 0,
              1: totalOption.total?.[convertedKey]?.[1] || 0,
            };

            if (category === "0") {
              fixedValue = toFloat(value);
            } else {
              fixedValue = toPercent(value);
            }
            nextValue[category] = toFloat(nextValue[category] + fixedValue);
            totalOption.total[convertedKey] = nextValue;
          }
        });

        Object.entries(this.selectedCharacter?.levelUpStats || []).forEach(
          (option) => {
            const [key, value] = option;
            const optionKey = optionDictionary?.[key];
            if (optionKey) {
              if (!optionKeys.has(optionKey)) {
                optionKeys.add(optionKey);
              }
              const fixedValue = toFloat(toFloat(value) * this.characterLevel);

              if (optionKey[optionKey.length - 1] === "0") {
                totalOption.level[optionKey] =
                  toFloat(totalOption.level[optionKey] + fixedValue) ||
                  fixedValue;
              } else {
                const percentValue = toPercent(fixedValue);
                const prevValue = totalOption.level[optionKey] || 0;
                const nextValue = parseInt(prevValue) + percentValue;
                totalOption.level[optionKey] = nextValue;
              }
            }

            const totalKey = optionDictionary?.[key];
            if (totalKey) {
              const convertedKey = totalKey.slice(0, totalKey.length - 1);
              if (!totalKeys.has(convertedKey)) {
                totalKeys.add(convertedKey);
              }
              const category = totalKey[totalKey.length - 1];
              let fixedValue = 0;
              const nextValue = {
                0: totalOption.total?.[convertedKey]?.[0] || 0,
                1: totalOption.total?.[convertedKey]?.[1] || 0,
              };

              if (category === "0") {
                fixedValue = toFloat(toFloat(value) * this.characterLevel);
              } else {
                fixedValue = toPercent(
                  toFloat(toFloat(value) * this.characterLevel)
                );
              }
              nextValue[category] = toFloat(nextValue[category] + fixedValue);
              totalOption.total[convertedKey] = nextValue;
            }
          }
        );

        Object.entries(this.selectedMastery).forEach((option) => {
          const [key, value] = option;
          const optionKey = optionDictionary?.[key];
          if (optionKey) {
            if (!optionKeys.has(optionKey)) {
              optionKeys.add(optionKey);
            }
            const fixedValue = toFloat(toFloat(value) * this.masteryLevel);

            if (optionKey[optionKey.length - 1] === "0") {
              totalOption.mastery[optionKey] =
                toFloat(totalOption.mastery[optionKey] + fixedValue) ||
                fixedValue;
            } else {
              const percentValue = toPercent(fixedValue);
              const prevValue = totalOption.mastery[optionKey] || 0;
              const nextValue = parseInt(prevValue) + percentValue;
              totalOption.mastery[optionKey] = nextValue;
            }
          }

          const totalKey = optionDictionary?.[key];
          if (totalKey) {
            const convertedKey = totalKey.slice(0, totalKey.length - 1);
            if (!totalKeys.has(convertedKey)) {
              totalKeys.add(convertedKey);
            }
            const category = totalKey[totalKey.length - 1];
            let fixedValue = 0;
            const nextValue = {
              0: totalOption.total?.[convertedKey]?.[0] || 0,
              1: totalOption.total?.[convertedKey]?.[1] || 0,
            };

            if (category === "0") {
              fixedValue = toFloat(toFloat(value) * this.masteryLevel);
            } else {
              fixedValue = toPercent(toFloat(toFloat(value) * this.masteryLevel));
            }
            nextValue[category] = toFloat(nextValue[category] + fixedValue);
            totalOption.total[convertedKey] = nextValue;
          }
        });

        Object.entries(this.equipOption.common).forEach((option) => {
          const [key, value] = option;
          if (typeof value === "number") {
            if (!optionKeys.has(key)) {
              optionKeys.add(key);
            }
            const fixedValue =
              key[key.length - 1] === "0" ? toFloat(value) : toPercent(value);
            totalOption.equip[key] =
              toFloat(totalOption.equip[key] + fixedValue) || fixedValue;

            const totalKey = key;
            if (totalKey) {
              const convertedKey = totalKey.slice(0, totalKey.length - 1);
              if (!totalKeys.has(convertedKey)) {
                totalKeys.add(convertedKey);
              }
              const category = totalKey[totalKey.length - 1];
              let fixedValue = 0;
              const nextValue = {
                0: totalOption.total?.[convertedKey]?.[0] || 0,
                1: totalOption.total?.[convertedKey]?.[1] || 0,
              };

              if (category === "0") {
                fixedValue = toFloat(value);
              } else {
                fixedValue = toPercent(value);
              }
              nextValue[category] = toFloat(nextValue[category] + fixedValue);
              totalOption.total[convertedKey] = nextValue;
            }
          }
        });

        Object.entries(totalOption.total).forEach(([key, value]) => {
          const fixed = value[0];
          const ratio = value[1];
          if (!(fixed + ratio)) totalKeys.delete(key);
        });

        totalOption.optionKeys = Array.from(optionKeys);
        totalOption.totalKeys = Array.from(totalKeys);

        return totalOption;
      },
    },
    methods: {
      onToggleDropDown(e) {
        this.$store.dispatch(
          "onToggleDropDown",
          e.target.closest("div").dataset.dropdown
        );
      },
      onChangeStatusEquipKey() {
        const nextStatusEquipKey = ["targetItems", "bagItems"].filter(
          (dataType) => this.statusEquipKey !== dataType
        )[0];
        this.$store.dispatch("selectStatusEquipKey", nextStatusEquipKey);
      },
      removeTargetItem(e) {
        if (window.confirm(this.$t("noti.removeTargetItem"))) {
          const newTargetItems = this.targetItems.filter(
            (_, index) => index != e.target.closest("li").dataset.index
          );

          this.$store.dispatch("removeTargetItems", newTargetItems);
        }
      },
      changeWeaponGroup(e) {
        const selectedIndex = e.target.closest("button").dataset.index;
        const newMastery = this.selectedCharacter.mastery[selectedIndex];
        this.$store.dispatch("selectMastery", newMastery);
      },
      changeLevel(value, category) {
        switch (typeof value) {
          case "number":
            const calculated = this[category] + value;
            const nextLevel =
              calculated > 20 ? 20 : calculated < 1 ? 1 : calculated;
            this[category] = nextLevel;
            return;
          default:
            if (typeof Number(value.target.value) !== "number") {
              value.target.value = this[category];
            } else {
              const calculated = Number(value.target.value);
              const nextLevel =
                calculated > 20 ? 20 : calculated < 1 ? 1 : calculated;
              this[category] = nextLevel;
              value.target.value = nextLevel;
            }
            return;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .status {
    border-radius: 16px;
    background: $color2;

    &.active {
      @include active();
      z-index: inherit;
    }

    .tabName {
      display: flex;
      justify-content: space-between;
      color: $color3;
      margin: 4px;

      .buttonBox {
        display: flex;
        align-items: center;

        button {
          background: none;
          color: $color3;
          border-radius: 4px;
          @include fasIcon(25px);
          margin-right: 4px;
          &.toggleSelectBtn {
            margin: 0;

            &.opened {
              .fa-angle-double-down {
                display: none;
              }
              .fa-angle-double-up {
                display: block;
              }
            }
            &.closed {
              .fa-angle-double-down {
                display: block;
              }
              .fa-angle-double-up {
                display: none;
              }
            }
          }
          &:last-child {
            margin: 0;
          }
          &:hover {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.3);
          }
          &.selected {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.3);
          }
        }
      }
    }

    &_info {
      border-radius: 12px;
      border: none;

      .optionBox.total {
        display: flex;
        flex-direction: row-reverse;
        @media screen and (max-width: 720px) {
          flex-direction: column;
        }
        > ul {
          grid-template-columns: 1fr 1fr;
          width: 100%;
        }
        .characterImage {
          .header {
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .tabName {
              width: fit-content;
            }

            .inputBox {
              display: flex;
              flex-direction: column;
              gap: 8px;
              .level {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                color: $color3;
                input,
                button {
                  border: none;
                  background: none;
                  padding: 0;
                }

                input {
                  width: 24px;
                  text-align: center;
                }

                button {
                  border-radius: 4px;
                  padding: 2px;
                  &:hover {
                    box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
                  }
                }
              }
            }
          }
        }
      }

      .optionBox {
        > ul {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 4px;
          background: $color3;
          border-bottom-right-radius: 12px;
          border-bottom-left-radius: 12px;
          padding: 4px;

          @media screen and (max-width: 720px) {
            grid-template-columns: 1fr;
          }
        }

        .option {
          .optionInfo {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 4px;
            color: $color2;

            &.unique {
              display: flex;
              flex-direction: column;
              height: fit-content;
            }
            &_name {
              font-weight: 700;
              padding: 4px;
            }
            &_total {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              gap: 4px;
              .total {
                letter-spacing: 0.05rem;
                font-size: 1rem;
              }
              .extra {
                text-align: end;
                line-height: 0.8rem;
              }
            }
            &_value {
              margin-left: 4px;
            }
            &_values {
              word-break: keep-all;

              .uniqueOptions {
                list-style: disc inside;
                display: flex;
                flex-direction: column;
                padding: 4px;

                .uniqueOption {
                  height: fit-content;
                  line-height: 1rem;
                  padding: 4px;
                }
              }
            }
          }
        }

        .characterImage {
          position: relative;
          @media screen and (max-width: 720px) {
            display: flex;
            flex-direction: row-reverse;
            align-items: flex-start;
            justify-content: space-between;
          }
          > div {
            img {
              height: 240px;
              width: fit-content;
              object-fit: contain;
            }
          }

          .weaponGroup {
            position: absolute;
            bottom: 4px;
            right: 4px;
            .imageBox {
              display: flex;
              flex-direction: column;
              gap: 4px;
              button {
                padding: 4px;
                background: $color2;
                border: 1px solid $color1;
                border-radius: 50%;
                width: 40px;
                height: 40px;

                &.selected {
                  background: $color1;
                }
                &:hover {
                  box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
                }

                img {
                  height: 32px;
                  width: fit-content;
                  object-fit: contain;
                }
              }
            }
            .inputBox {
              display: none;
            }
          }
        }
      }
    }
  }
</style>
