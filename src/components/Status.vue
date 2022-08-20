<template>
  <div :class="`status ${toggleModal.status ? 'active' : 'hide'}`">
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
    <div class="status_equip">
      <div class="tabName">
        <h3>{{ $t("modal.equip") }}</h3>
        <div class="buttonBox">
          <div>
            <div>
              <button
                :class="`changeStatusDataBtn ${
                  statusData === 'targetItems' ? 'selected' : ''
                }`"
                @click="onChangeStatusData"
              >
                <span> <i class="fa-solid fa-crosshairs"></i> </span>
              </button>
              <button
                :class="`changeStatusDataBtn ${
                  statusData === 'bagItems' ? 'selected' : ''
                }`"
                @click="onChangeStatusData"
              >
                <span> <i class="fas fa-suitcase"></i> </span>
              </button>
            </div>
            <div v-if="statusData === 'bagItems'">
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
        <ul v-if="statusData === 'targetItems'" class="targetItems">
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

        <ul v-if="statusData === 'bagItems'" class="bagItems">
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

    <div class="status_info">
      <div class="optionBox total" v-if="selectedCharacter">
        <ul>
          <li
            v-for="optionKey in totalOption.optionKeys"
            :key="optionKey"
            class="option"
          >
            <div class="optionInfo">
              <span class="optionInfo_name">
                {{
                  `${statusOptions?.[optionKey]?.[language]}${
                    optionKey === "atk_spd1"
                      ? `(${selectedCharacter?.attackSpeedMin} ~ ${selectedCharacter?.attackSpeedLimit})`
                      : ""
                  } :`
                }}</span
              >
              <div class="optionInfo_extra">
                <span> {{ totalOption.character?.[optionKey] || 0 }}</span>
                <span>{{
                  totalOption.level?.[optionKey]
                    ? totalOption.level?.[optionKey] < 0
                      ? totalOption.level?.[optionKey]
                      : `+${totalOption.level?.[optionKey]}`
                    : "+0"
                }}</span>
                <span>{{
                  totalOption.mastery?.[optionKey]
                    ? totalOption.mastery?.[optionKey] < 0
                      ? totalOption.mastery?.[optionKey]
                      : `+${totalOption.mastery?.[optionKey]}`
                    : "+0"
                }}</span>
                <span>{{
                  totalOption.equip?.[optionKey]
                    ? totalOption.equip?.[optionKey] < 0
                      ? totalOption.equip?.[optionKey]
                      : `+${totalOption.equip?.[optionKey]}`
                    : "+0"
                }}</span>
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
            v-if="showItemImg"
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

    <div class="status_info">
      <h3 class="tabName">
        {{ $t("modal.equip") }}
      </h3>
      <div class="optionBox" v-if="equipOption.uniq">
        <ul>
          <li
            v-for="[optionId, optionValue] in Object.entries(
              equipOption.uniq
            ).sort()"
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
              <span class="optionInfo_values">
                <ul class="uniqueOptions">
                  <li
                    v-for="uniqueOption in optionValue.detail[language]"
                    :key="optionValue + uniqueOption"
                    class="uniqueOption"
                  >
                    {{ uniqueOption }}
                  </li>
                </ul>
              </span>
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
        commonOptions: [
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
        statusData: "targetItems",
        statusKey: [
          "atk0",
          "atk_spd1",
          "basic_atk0",
          "basic_atk_def0",
          "basic_atk_def1",
          "cool1",
          "cri_atk1",
          "cri_def1",
          "cri_rate1",
          "def0",
          "grow_atk0",
          "grow_atk_spd1",
          "grow_basic_atk0",
          "grow_basic_atk1",
          "grow_defense0",
          "grow_hp0",
          "grow_skill0",
          "grow_skill1",
          "heal_up1",
          "hp0",
          "hp_reg0",
          "hp_reg1",
          "load0",
          "move_spd0",
          "mp0",
          "mp_reg0",
          "mp_reg1",
          "non_combat_move_spd0",
          "penet1",
          "range0",
          "skill0",
          "skill1",
          "skill_def0",
          "skill_def1",
          "trap_def1",
          "vamp1",
          "vamp_all1",
          "vision0",
        ],
        // [
        //   "maxHp",
        //   "maxSp",
        //   "attackPower",
        //   "defense",
        //   "criticalStrikeChance",
        //   "hpRegen",
        //   "spRegen",
        //   "attackSpeed",
        //   // "attackSpeedLimit",
        //   // "attackSpeedMin",
        //   "moveSpeed",
        //   "sightRange",
        // ],
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
      toggleModal() {
        return this.$store.state.toggleModal;
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
      equipOption() {
        const equipData =
          this.statusData === "targetItems" ? this.targetItems : this.bagItems;
        const equipOption = {};
        const uniqOption = {};
        const commonOptions = Object.values(equipData).reduce(
          (itemOptions, item) => {
            if (item.id) {
              const itemInfo = searchById(item.id);
              Object.entries(itemInfo).forEach(([optionId, optionValue]) => {
                if (!this.commonOptions.includes(optionId)) {
                  if (optionId.match(/(active)|(buff)|(uniq)|(only)/g)) {
                    uniqOption[optionId] =
                      Math.max(uniqOption[optionId], optionValue) || optionValue;
                  } else {
                    itemOptions[optionId] = !itemOptions[optionId]
                      ? optionValue
                      : itemOptions[optionId] + optionValue;
                  }
                }
              });
            }
            return itemOptions;
          },
          {}
        );
        equipOption.uniq = uniqOption;
        equipOption.common = commonOptions;
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
        };
        const optionKeys = new Set();
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
              totalOption.character[optionKey] + fixedValue || fixedValue;
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
                  totalOption.level[optionKey] + fixedValue || fixedValue;
              } else {
                const percentValue = toPercent(fixedValue);
                const prevValue = totalOption.level[optionKey] || "0%";
                const nextValue = `${
                  parseFloat(prevValue.slice(0, prevValue.length - 1)) +
                  percentValue
                }%`;

                totalOption.level[optionKey] = nextValue;
              }
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
                totalOption.mastery[optionKey] + fixedValue || fixedValue;
            } else {
              const percentValue = toPercent(fixedValue);
              const prevValue = totalOption.mastery[optionKey] || "0%";
              const nextValue = `${
                parseFloat(prevValue.slice(0, prevValue.length - 1)) +
                percentValue
              }%`;
              totalOption.mastery[optionKey] = nextValue;
            }
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
              totalOption.equip[key] + fixedValue || fixedValue;
          }
        });
        totalOption.optionKeys = Array.from(optionKeys);

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
      onChangeStatusData() {
        const nextStatusData = ["targetItems", "bagItems"].filter(
          (dataType) => this.statusData !== dataType
        )[0];
        this.statusData = nextStatusData;
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
      color: $color2;
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
            display: flex;
            justify-content: center;
            .removeBtn {
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
            font-size: 0.8em;
            border: none;

            img {
              height: 100%;
              width: fit-content;
            }
          }

          .empty {
            color: #999;
            font-size: 0.7em;
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
            gap: 8px;
            color: $color2;
            padding: 4px;

            &.unique {
              display: block;
            }
            &_name {
              font-weight: 700;
            }
            &_extra {
              text-align: end;
            }
            &_value {
              margin-left: 4px;
            }
            &_values {
              word-break: keep-all;

              .uniqueOptions {
                list-style: disc inside;
                padding: 4px;

                li {
                  margin: 4px 0;
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
