<template>
  <div :class="`status ${toggleModal.status ? 'active' : 'hide'}`">
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

          <button @click="toggleStatusModal">
            <span>
              <i class="fas fa-times"></i>
            </span>
          </button>
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
            <div>{{ item.name[language] }}</div>
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
      <h3 class="tabName">{{ $t("modal.status") }}</h3>
      <div class="optionBox">
        <ul>
          <li
            v-for="[optionId, optionValue] in Object.entries(
              equipOptions
            ).sort()"
            :key="optionId"
            class="option"
          >
            <div v-if="optionId.match(/(only)/g)" class="optionInfo">
              <div class="optionInfo_name">
                {{ `[${itemOptions[optionId][language]}] : ` }}
              </div>
              <div class="optionInfo_value">
                <span>{{ optionValue[language] }}</span>
              </div>
            </div>
            <div
              v-else-if="!optionId.match(/(active)|(buff)|(uniq)/g)"
              class="optionInfo"
            >
              <div class="optionInfo_name">
                {{ `${itemOptions[optionId][language]} : ` }}
              </div>
              <div class="optionInfo_value">
                <span>{{
                  optionId.match(/[1]/g)
                    ? `${Math.round(optionValue * 1000) / 10}%`
                    : optionValue
                }}</span>
              </div>
            </div>
          </li>
          <li
            v-for="[optionId, optionValue] in Object.entries(equipOptions)"
            :key="optionId"
            class="option"
          >
            <div
              v-if="optionId.match(/(active)|(buff)|(uniq)/g)"
              class="optionInfo unique"
            >
              <div class="optionInfo_name">
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
              </div>
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
  import { searchById, itemOptions } from "~/utils/itemTable";

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
      };
    },
    components: {},
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
      equipOptions() {
        const equipData =
          this.statusData === "targetItems" ? this.targetItems : this.bagItems;
        const equipOptions = Object.values(equipData).reduce(
          (itemOptions, item) => {
            if (item.id) {
              const itemInfo = searchById(item.id);
              Object.entries(itemInfo).forEach(([optionId, optionValue]) => {
                if (!this.commonOptions.includes(optionId)) {
                  if (optionId.match(/(active)|(buff)|(uniq)/g)) {
                    itemOptions[optionId] = !itemOptions[optionId]
                      ? optionValue
                      : optionValue > itemOptions[optionId]
                      ? optionValue
                      : itemOptions[optionId];
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

        return equipOptions;
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
                list-style: disc inside;
                padding: 4px;

                li {
                  margin: 4px 0;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
