<template>
  <div :class="`status ${modal.status.show ? 'active' : 'hide'}`">
    <div class="header">
      <h2 class="tabName">{{ $t("modal.status") }}</h2>
      <div class="buttonBox">
        <button @click="toggleStatusModal">
          <span>
            <i class="fas fa-times"></i>
          </span>
        </button>
      </div>
    </div>
    <Character />

    <div class="status_info">
      <div class="optionBox total" v-if="selectedCharacter">
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
                :class="mastery?.code === selectedMastery?.code && 'selected'"
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
    </div>

    <div class="status_equip">
      <div class="tabName">
        <h3>{{ $t("modal.equip") }}</h3>
        <div class="buttonBox">
          <div>
            <div>
              <button
                :class="`changeStatusEquipKeyBtn ${
                  statusEquipKey === 'targetItems' ? 'selected' : ''
                }`"
                @click="onChangeStatusEquipKey"
              >
                <span> <i class="fa-solid fa-crosshairs"></i> </span>
              </button>
              <button
                :class="`changeStatusEquipKeyBtn ${
                  statusEquipKey === 'bagItems' ? 'selected' : ''
                }`"
                @click="onChangeStatusEquipKey"
              >
                <span> <i class="fas fa-suitcase"></i> </span>
              </button>
            </div>
            <div v-if="statusEquipKey === 'bagItems'">
              <button
                :class="`changeShowItemImgBtn ${showItemImg ? '' : 'selected'}`"
                @click="onChangeShowItemImg"
              >
                <span>
                  <i class="fas fa-font"></i>
                </span>
              </button>
              <button
                :class="`changeShowItemImgBtn ${showItemImg ? 'selected' : ''}`"
                @click="onChangeShowItemImg"
              >
                <span>
                  <i class="far fa-images"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ul v-if="statusEquipKey === 'targetItems'" class="targetItems">
          <li
            class="itemInfo"
            v-for="(item, index) in targetItems"
            :key="`target${item.id}`"
            :data-index="index"
            :data-itemid="item.id"
          >
            <button
              :class="`showItemInfoBtn value${item.id[0]}`"
              @click="showItemInfo"
            >
              <img
                :src="item.img"
                :alt="item.name[language]"
                class="itemInfo_img"
              />
            </button>
            <div class="itemTextBox">
              <span>{{ item.name[language] }}</span>
              <button @click="removeTargetItem" class="removeBtn">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </li>
        </ul>

        <ul v-if="statusEquipKey === 'bagItems'" class="bagItems">
          <li
            v-for="pocket in Object.keys(bagItems)"
            :key="pocket"
            :data-bag="pocket"
            :data-item="`${bagItems[pocket].id ? bagItems[pocket].id : ''}`"
          >
            <span v-if="bagItems[pocket].id">
              <div :class="`itemInfo value${bagItems[pocket].id[0]}`">
                <img
                  :src="bagItems[pocket].img"
                  :alt="`${bagItems[pocket].name[language]}_img`"
                  :title="`${bagItems[pocket].name[language]}_img`"
                  v-if="showItemImg"
                />
                <span v-else>{{ bagItems[pocket].name[language] }}</span>
              </div>
            </span>
            <span v-else>
              <div class="empty">
                <span>{{ pocket }}</span>
              </div>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="status_info" v-if="Object.keys(equipOption.uniq).length > 0">
      <div class="optionBox">
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
      modal() {
        return this.$store.state.modal;
      },
      showItemImg() {
        return this.$store.state.showItemImg;
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
          //
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
            //
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
          //
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

            //
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
      onChangeShowItemImg() {
        this.$store.dispatch("onChangeShowItemImg");
      },
      toggleStatusModal() {
        this.$store.dispatch("onToggleModal", "status");
      },
      onChangeStatusEquipKey() {
        const nextStatusEquipKey = ["targetItems", "bagItems"].filter(
          (dataType) => this.statusEquipKey !== dataType
        )[0];
        this.$store.dispatch("selectStatusEquipKey", nextStatusEquipKey);
      },
      showItemInfo(e) {
        const selectedItem = searchById(e.target.closest("li").dataset.itemid);
        this.$store.dispatch("setCart", selectedItem);
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
    border: 2px solid $color3;
    box-sizing: border-box;
    background: $color2;

    &.active {
      @include active();
      z-index: inherit;
    }

    .header {
      display: flex;
      justify-content: space-between;
      padding: 4px;

      .buttonBox {
        display: flex;
        align-items: center;

        button {
          background: none;
          color: $color3;
          border-radius: 5px;
          @include fasIcon(25px);
          margin-right: 5px;
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

    .tabName {
      color: $color3;
      margin: 5px 0;
      padding: 0 5px;
    }

    &_equip {
      border-radius: 12px;
      border: none;
      border-top: 2px solid $color3;
      border-bottom: 2px solid $color3;
      margin-top: 8px;
      .tabName {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        h3 {
          color: $color3;
          height: 25px;
          line-height: 25px;
          padding: 0;
          margin: 0;
        }
        .buttonBox {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          > div {
            display: flex;
          }

          button {
            background: none;
            color: $color3;
            border-radius: 5px;
            @include fasIcon(25px);
            margin-right: 5px;
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

      .targetItems {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        max-height: 96px;
        overflow-y: hidden;

        @media screen and (max-width: 720px) {
          grid-template-columns: repeat(3, 1fr);
        }

        .itemInfo {
          background: #fff;
          border-radius: 5px;
          margin: 5px;

          .showItemInfoBtn {
            border-radius: 5px;
            &:hover {
              box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
            }
          }

          div {
            padding: 5px;
            text-align: center;
          }
          .itemTextBox {
            position: relative;
            .removeBtn {
              position: absolute;
              top: 4px;
              right: 4px;
              text-align: center;
              color: #ff0000;
              background: none;
              &:hover {
                font-weight: 700;
                background: rgba(0, 0, 0, 0.1);
              }
            }
          }
        }
      }

      .bagItems {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 10px;
        background: $color3;
        border-radius: 5px;
        padding: 5px;
        li {
          height: 25px;
          line-height: 25px;
          position: relative;
          background: #fff;
          border-radius: 5px;

          .itemInfo {
            @include fasIcon(25px);
            width: 100%;
            font-size: 0.8rem;
            border: none;

            img {
              height: 100%;
              width: fit-content;
            }
          }

          .empty {
            color: #999;
            font-size: 0.7rem;
            padding: 5px;
          }
        }
      }
    }

    &_info {
      border-radius: 12px;
      border: none;
      border-top: 2px solid $color3;
      border-bottom: 2px solid $color3;
      margin-top: 8px;

      .optionBox.total {
        display: grid;
        grid-template-columns: 2fr 1fr;
        > ul {
          grid-template-columns: 1fr 1fr;
        }
      }
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
      .optionBox {
        border-radius: 5px;
        > ul {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 4px;
          background: $color3;
          border-radius: 5px;
          padding: 4px;
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

                li {
                  height: fit-content;
                  padding: 4px;
                }
              }
            }
          }
        }

        .characterImage {
          position: relative;
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
