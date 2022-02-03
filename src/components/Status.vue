<template>
  <div :class="`status ${toggleModal.status ? 'active' : 'hide'}`">
    <div class="status_equip">
      <div class="tabName">
        <h3>장비</h3>
        <div class="buttonBox">
          <div>
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
          <button @click="toggleStatusModal">
            <span>
              <i class="fas fa-times"></i>
            </span>
          </button>
        </div>
      </div>
      <div>
        <ul>
          <li
            v-for="pocket in Object.keys(equip)"
            :key="pocket"
            :data-bag="pocket"
            :data-item="`${equip[pocket].id ? equip[pocket].id : ''}`"
          >
            <span v-if="equip[pocket].id">
              <div :class="`itemInfo value${equip[pocket].id[0]}`">
                <img
                  :src="equip[pocket].img"
                  :alt="`${equip[pocket].name}_img`"
                  :title="`${equip[pocket].name}_img`"
                  v-if="showItemImg"
                />
                <span v-else>{{ equip[pocket].name }}</span>
              </div>
              <button class="removeBtn" @click="dropItem">
                <i class="fas fa-times"></i>
              </button>
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
      <h3 class="tabName">스테이터스</h3>
      <div class="optionBox">
        <ul>
          <li
            v-for="[optionName, optionValue] in Object.entries(
              equipOptions
            ).sort()"
            :key="optionName"
            class="option"
          >
            <div
              v-if="!optionName.match(/([고유])|([버프])|([액티브])/g)"
              class="optionInfo"
            >
              <div class="optionInfo_name">
                {{ `${optionName.replace(/[(%)]/g, "")}:` }}
              </div>
              <div class="optionInfo_value">
                <span>{{
                  optionName.match(/[%]/g)
                    ? `${parseInt(optionValue * 100)}%`
                    : optionValue
                }}</span>
              </div>
            </div>
          </li>
          <li
            v-for="[optionName, optionValue] in Object.entries(equipOptions)"
            :key="optionName"
            class="option"
          >
            <div
              v-if="optionName.match(/([고유])|([버프])|([액티브])/g)"
              class="optionInfo unique"
            >
              <div class="optionInfo_name">
                {{ optionName.replace(/[(%)]/g, "") }}
              </div>
              <div class="optionInfo_values">
                <ul class="uniqueOptions">
                  <li
                    v-for="uniqueOption in optionValue.detail"
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
  import { searchById } from "~/utils/itemTable";

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
      };
    },
    components: {},
    computed: {
      toggleModal() {
        return this.$store.state.toggleModal;
      },
      showItemImg() {
        return this.$store.state.showItemImg;
      },
      equip() {
        return this.$store.state.bagEquip;
      },
      equipOptions() {
        const equipOptions = Object.values(this.$store.state.bagEquip).reduce(
          (itemOptions, item) => {
            if (item.id) {
              const itemInfo = searchById(item.id);
              Object.entries(itemInfo).forEach(([optionName, optionValue]) => {
                if (!this.commonOptions.includes(optionName)) {
                  if (optionName.match(/([고유])|([버프])|([액티브])/g)) {
                    itemOptions[optionName] = !itemOptions[optionName]
                      ? optionValue
                      : optionValue > itemOptions[optionName]
                      ? optionValue
                      : itemOptions[optionName];
                  } else {
                    itemOptions[optionName] = !itemOptions[optionName]
                      ? optionValue
                      : itemOptions[optionName] + optionValue;
                  }
                }
              });
            }
            return itemOptions;
          },
          {}
        );
        return equipOptions;
      },
    },
    methods: {
      onChangeShowItemImg() {
        this.$store.dispatch("onChangeShowItemImg");
      },
      dropItem(e) {
        if (!window.confirm("버리시겠습니까?")) return;

        this.$store.dispatch("dropItem", e.target.closest("li").dataset.bag);
        this.$store.dispatch("updateAssemblable");
      },
      toggleStatusModal() {
        this.$store.dispatch("onToggleModal", "status");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .status {
    border-radius: 5px;
    border: 2px solid $color3;
    box-sizing: border-box;
    background: $color2;

    &.active {
      @include active();
    }

    .tabName {
      color: $color2;
      height: 25px;
      line-height: 25px;
      margin: 5px 0;
      padding: 0 5px;
    }

    &_equip {
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
      ul {
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
            overflow: hidden;
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
          .removeBtn {
            background: none;
            @include fasIcon(25px);
            position: absolute;
            top: 0;
            right: 0;
            color: #ff0000;
            &:hover {
              font-weight: 700;
            }
          }
        }
      }
    }

    &_info {
      .optionBox {
        border-radius: 5px;
        .option {
          .optionInfo {
            display: flex;
            background: $color3;
            color: $color2;
            padding: 5px;
            &.unique {
              display: block;
            }
            &_name {
              font-weight: 700;
            }
            &_value {
              margin-left: 4px;
            }
            &_values {
              word-break: keep-all;

              .uniqueOptions {
                list-style: "\2981"inside;
              }
            }
          }
        }
      }
    }
  }
</style>
