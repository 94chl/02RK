<template>
  <div class="itemPreview">
    <div class="itemPreview_info">
      <div class="imgInfo">
        <img
          :src="
            require(`~/img/item/${cartItem.sort}/${(
              cartItem.name.en || ''
            ).replace('\'', '_')}.webp`)
          "
          :alt="`${cartItem.name[language]}_img`"
          :title="`${cartItem.name[language]}_img`"
        />
        <button @click="setEquip" class="setEquipBtn">
          <i class="fas fa-suitcase"></i>
        </button>
      </div>
      <div class="itemInfo">
        <ul>
          <li class="itemOption nameInfo">
            <div>
              <span class="attrKey">
                {{ $t("itemPreviewSection.name") }} :
              </span>
              <span :class="`matInfoBtn attrValue value${cartItemId[0]}`">{{
                cartItem.name[language]
              }}</span>
            </div>
          </li>
          <li class="itemOption sortInfo">
            <div>
              <span class="attrKey">
                {{ $t("itemPreviewSection.sort") }} :
              </span>
              <span class="attrValue">{{
                categoryName?.[cartItem?.sort]?.[language]
              }}</span>
            </div>
          </li>
          <li
            v-for="option in cartItemOptions"
            :key="`cartItemInfo${option}`"
            :class="`itemOption ${option}Info ${
              option.match(/(active)|(buff)|(uniq)/g) && 'uniqueOption'
            }`"
          >
            <div>
              <span
                v-if="option.match(/(active)|(buff)|(uniq)/g)"
                class="attrKey"
              >
                {{
                  `[${
                    option.match(/(uniq)/g)
                      ? $t("itemPreviewSection.optionUniq")
                      : option.match(/(buff)/g)
                      ? $t("itemPreviewSection.optionbuff")
                      : option.match(/(active)/g)
                      ? $t("itemPreviewSection.optionActive")
                      : ""
                  }] ${itemOptions[option][language]}`
                }}
              </span>
              <span v-else-if="option.match(/(only)/g)" class="attrKey">
                {{ `[${itemOptions[option][language]}] : ` }}
              </span>
              <span v-else class="attrKey">
                {{
                  `${
                    optionName[option]
                      ? optionName[option]
                      : itemOptions[option][language]
                  } : `
                }}
              </span>
              <span
                class="attrValue itemMaterial"
                v-if="['material', 'tobe'].includes(option)"
              >
                <button
                  v-for="item in cartItem[option]"
                  :key="`${option}${item.id}`"
                  @click="changeItem"
                  :data-itemid="item.id"
                  :class="`matInfoBtn value${item.id[0]}`"
                >
                  <span> {{ item.name[language] }}</span>
                </button>
              </span>
              <span class="attrValue" v-else-if="option === 'location'">
                <span
                  v-for="areaId in cartItem[option]"
                  :key="areaId"
                  class="dropArea"
                >
                  {{ areaData[areaId].name[language] }}
                </span>
              </span>
              <div v-else class="attrValue">
                <ul v-if="option.match(/(active)|(buff)|(uniq)/g)">
                  <li
                    v-for="uniqueOption in cartItem[option].detail[language]"
                    :key="cartItem[option] + uniqueOption"
                    class="optionDetail"
                  >
                    {{ ` ${uniqueOption}` }}
                  </li>
                </ul>

                <span v-else-if="option.match(/(only)/g)" class="attrKey">
                  {{ cartItem[option][language] }}
                </span>
                <span v-else>
                  {{
                    option.match(/[1]/g)
                      ? `${Math.round(cartItem[option] * 1000) / 10}%`
                      : cartItem[option]
                  }}
                </span>
              </div>
            </div>
          </li>
        </ul>
        <div class="findRecommendPath">
          <div :class="`btns ${isShowPath ? 'open' : ''}`">
            <button
              v-if="isShowPath"
              class="closeBtn"
              @click="closeRecommendsModal"
            >
              <i class="fas fa-times"></i>
            </button>
            <button
              v-else
              @click="findRecommendPath"
              class="findRecommendPathBtn"
            >
              <i class="fas fa-map-marked-alt"></i>
            </button>
          </div>
          <div v-if="isShowPath" class="recommends">
            <div class="recommendsCover">
              <div
                v-if="recommendRoutes.length > 0 && !error.message"
                class="routeCount"
              >
                <p>
                  {{
                    $t("itemPreviewSection.foundRecommendsInfo", {
                      number: recommendRoutes.length,
                    })
                  }}
                </p>
              </div>
              <p v-else class="noRouteCount">
                {{ $t(`noti.${error.message}`) }}
              </p>
            </div>
            <ul
              :class="`recommends_list ${isShowPath ? 'open' : ''}`"
              ref="recommendsModal"
            >
              <li
                v-for="(route, index) in recommendRoutes"
                :key="`itemRoute${index}`"
                class="recommends_list__route"
                :data-route-index="index"
              >
                <button class="routeButton" @click="setCustomRoute">
                  <span class="routeButton_index">
                    {{ `(${index + 1}) ` }}
                  </span>
                  <span
                    v-for="(area, areaIndex) in route"
                    :key="route + areaIndex"
                    class="routeButton_area"
                  >
                    {{ area.name[language] }}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { onUpdated, ref } from "vue";
  import { useStore } from "vuex";
  import {
    categoryName,
    searchById,
    areaData,
    itemOptions,
  } from "~/utils/itemTable";
  import { disassembleWD } from "~/utils/disassemble";
  import ampl from "~/utils/amplitude.js";

  export default {
    setup() {
      const recommendsModal = ref(null);
      const store = useStore();
      onUpdated(() => {
        recommendsModal.value &&
          store.dispatch("onChangeMinHeight", recommendsModal.value.offsetHeight);
      });
      return { recommendsModal };
    },
    data() {
      return {
        areaData: areaData,
        itemOptions,
        necessaryOptions: ["img", "name", "sort"],
        isInitial: true,
        isShowPath: false,
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
        error: { message: "" },
        categoryName: categoryName,
      };
    },
    components: {},
    computed: {
      optionName() {
        const translation = {
          img: this.$t("itemPreviewSection.img"),
          name: this.$t("itemPreviewSection.name"),
          sort: this.$t("itemPreviewSection.sort"),
          material: this.$t("itemPreviewSection.material"),
          location: this.$t("itemPreviewSection.location"),
          tobe: this.$t("itemPreviewSection.tobe"),
        };
        return translation;
      },
      language() {
        return this.$store.state.language;
      },
      cartItemId() {
        return this.$store.state.cart.id;
      },
      cartItem() {
        const cart = this.$store.state.cart;
        const cartKeys = Object.keys(cart);
        const itemInfo = {};
        cartKeys.forEach((option, _) => {
          if (option === "img") itemInfo.img = cart[option];
          if (option === "name") itemInfo.name = cart[option];
          if (option === "sort") itemInfo.sort = cart[option];
          // if (option === "sort") itemInfo.sort = categoryName[cart[option]];
          if (cart[option]) {
            if (option === "material")
              itemInfo.material = cart[option].map((id) => searchById(id));
            if (option === "location") itemInfo.location = cart[option];
            if (option === "tobe")
              itemInfo.tobe = cart[option].map((id) => searchById(id));
          }
          if (!this.commonOptions.includes(option)) {
            itemInfo[option] = cart[option];
          }
        });

        // 배열정보를 객체배열로 정리하는 김에 cart도 업데이트
        this.$store.dispatch("setCart", { ...cart, ...itemInfo });
        return itemInfo;
      },
      cartItemOptions() {
        const cartItemOptions = Object.keys(this.cartItem).filter(
          (option) => !this.necessaryOptions.includes(option)
        );
        return cartItemOptions;
      },
      recommendRoutes() {
        return this.$store.state.recommendRoutes;
      },
      areaName2Id() {
        const areaInfo = {};
        Object.entries(areaData).forEach(([id, data]) => {
          areaInfo[data.name] = id;
        });
        return areaInfo;
      },
    },
    methods: {
      changeItem(e) {
        const selectedItem = searchById(
          e.target.closest(".matInfoBtn").dataset.itemid
        );
        ampl.log("select item", { tab: "Preview", ...selectedItem });
        this.$store.dispatch("setCart", selectedItem);
      },
      findRecommendPath() {
        const needDropsInfo = {
          needDrops: disassembleWD([this.cartItemId]).dropMatId,
          total: false,
        };
        try {
          this.$store.dispatch("findRecommendPath", needDropsInfo);
          this.error = { message: "" };
          this.isShowPath = true;
        } catch (e) {
          this.error = e;
        }
        this.isInitial = false;
      },
      togglePath() {
        this.isShowPath = !this.isShowPath;
      },
      setEquip() {
        const itemInfo = searchById(this.cartItemId);
        this.$store.dispatch("getItem", itemInfo);
        this.$store.dispatch("updateAssemblable");
        document.querySelector(".bagBtn").classList.toggle("gotDrops");
        setTimeout(
          () => document.querySelector(".bagBtn").classList.toggle("gotDrops"),
          1000
        );
      },
      closeRecommendsModal() {
        this.isShowPath = false;
      },
      setCustomRoute(e) {
        const target =
          this.recommendRoutes[e.target.closest("li").dataset.routeIndex];

        if (window.confirm(this.$t("noti.applyRoute"))) {
          ampl.log("set recommend route", { tab: "PREVIEW", target });

          this.$store.dispatch("setRoute", target);
        }
      },
    },
    watch: {
      cartItemId() {
        this.isInitial = true;
        this.isShowPath = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .itemPreview {
    grid-column: 1 / 4;
    position: relative;
    overflow: visible;

    &_info {
      display: grid;
      grid-template-columns: 25% auto;
      gap: 4px;
      position: relative;
      overflow: visible;

      .imgInfo {
        background: #fff;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          height: fit-content;
        }

        .setEquipBtn {
          @include fasIcon(30px);
          border: none;
          color: $color2;
          background: $color5;
          width: 100%;
          &:hover {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
            color: $color1;
          }
        }
      }

      .itemInfo {
        position: relative;
        .itemOption {
          min-height: 25px;
          text-indent: 4px;
          background: #fff;
          border-bottom: 2px solid $color2;
          display: flex;
          align-items: center;
          border-radius: 4px;

          &.uniqueOption {
            > div {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 4px;

              .attrKey {
                max-width: 100%;
                word-break: break-all;
              }

              .attrValue {
                max-width: 100%;
                ul {
                  list-style: disc inside;
                  padding: 0 4px;
                  display: flex;
                  flex-direction: column;
                  gap: 4px;

                  .optionDetail {
                    word-break: break-all;
                    line-height: 1rem;
                  }
                }
              }
            }
          }

          > div {
            width: 100%;
            display: grid;
            grid-template-columns: auto 1fr;
            column-gap: 4px;
            text-indent: 0;
            align-items: center;
            padding: 3px;
            .attrKey {
              display: block;
            }
          }

          &.nameInfo {
            .attrValue {
              padding: 0 4px;
              border-radius: 4px;
              height: 20px;
              line-height: 20px;
              border: none;
              font-size: 0.9rem;
              width: fit-content;
            }
          }

          .itemMaterial {
            display: flex;
            flex-wrap: wrap;
            gap: 3px 4px;

            .matInfoBtn {
              padding: 0 4px;
              box-shadow: 1px 0 1px 0 #999;
              box-sizing: border-box;
              border-radius: 4px;
              height: 20px;
              line-height: 20px;
              font-size: 0.8rem;

              &:hover {
                margin-top: -1px;
              }
            }
          }

          .dropArea {
            word-break: keep-all;
            &::after {
              content: ",";
              margin-right: 3px;
            }
            &:last-child {
              &::after {
                content: none;
                margin-right: 0;
              }
            }
          }
        }
      }

      .findRecommendPath {
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 4px;
        background: #fff;
        border: 1px solid $color1;
        border-radius: 4px;

        .btns {
          display: flex;
          justify-content: space-between;

          &.open {
            background: $color1;
            justify-content: flex-end;
          }

          button {
            @include fasIcon(25px);
          }

          .findRecommendPathBtn {
            background: none;
            border: none;
            &:hover {
              box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
            }
            .fas {
              color: $color3;
            }
          }

          .closeBtn {
            background: $color1;
            color: $color2;
            &:hover {
              box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
            }
          }
        }

        .beforeRecommend {
          min-height: calc(100% - 30px);
          text-align: center;
          padding: 2px;
          margin: 0;

          p {
            word-break: keep-all;
            padding: 8px 0;
            margin: 0;
            white-space: pre-line;

            span .fas {
              color: $color3;
            }
          }
        }

        .recommends {
          min-height: calc(100% - 30px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 4px;

          &.open {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 5;
          }
          &_list {
            width: fit-content;
            display: flex;
            flex-direction: column;

            .routeButton {
              background: none;
              border-radius: 4px;
              padding: 4px;

              &:hover,
              &:active {
                box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
              }
              &_area {
                padding: 3px;
                &::after {
                  content: "-";
                  margin: 0 3px;
                }
                &:last-child {
                  &::after {
                    content: none;
                    margin: 0;
                  }
                }
              }
            }
          }
          .recommendsCover {
            text-align: center;
            width: 100%;
            p {
              word-break: break-word;
              display: block;
              padding: 8px 0;
              white-space: pre-line;

              &.routeCount {
                font-weight: 700;
                color: $color3;
              }
              &.noRouteCount {
              }
            }
            i {
              color: $color3;
            }
          }
        }
      }
    }
  }
</style>
