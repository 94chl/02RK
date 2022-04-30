<template>
  <div class="itemPreview">
    <div class="itemPreview_info">
      <div class="imgInfo">
        <img
          :src="cartItem.img"
          :alt="`${cartItem.name[language]}_img`"
          :title="`${cartItem.name[language]}_img`"
        />
        <button @click="setEquip" class="setEquipBtn">
          <i class="fas fa-suitcase"></i>
        </button>
      </div>
      <ul>
        <li class="itemOption nameInfo">
          <div>
            <span class="attrKey"> {{ $t("itemPreviewSection.name") }} : </span>
            <span :class="`attrValue value${cartItemId[0]}`">{{
              cartItem.name[language]
            }}</span>
          </div>
        </li>
        <li class="itemOption sortInfo">
          <div>
            <span class="attrKey"> {{ $t("itemPreviewSection.sort") }} : </span>
            <span class="attrValue">{{ cartItem.sort[language] }}</span>
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
                  option.match(/(active)/g)
                    ? $t("itemPreviewSection.optionUniq")
                    : option.match(/(buff)/g)
                    ? $t("itemPreviewSection.optionbuff")
                    : option.match(/(uniq)/g)
                    ? $t("itemPreviewSection.optionActive")
                    : ""
                }]${itemOptions[option][language]}`
              }}
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
            <span v-else class="attrValue">
              <ul v-if="option.match(/(active)|(buff)|(uniq)/g)">
                <li
                  v-for="uniqueOption in cartItem[option].detail[language]"
                  :key="cartItem[option] + uniqueOption"
                  class="optionDetail"
                >
                  {{ ` ${uniqueOption}` }}
                </li>
              </ul>
              <span v-else>
                {{
                  option.match(/[1]/g)
                    ? `${Math.round(cartItem[option] * 1000) / 10}%`
                    : cartItem[option]
                }}
              </span>
            </span>
          </div>
        </li>
      </ul>
      <div class="findRecommendPath">
        <div class="btns">
          <button @click="findRecommendPath" class="findRecommendPathBtn">
            <i class="fas fa-map-marked-alt"></i>
          </button>
          <button @click="togglePath" class="togglePathBtn">
            <i v-if="!isShowPath" class="fas fa-toggle-off"></i>
            <i v-else class="fas fa-toggle-on"></i>
          </button>
        </div>
        <div v-if="isInitial" class="beforeRecommend">
          <p>
            <span><i class="fas fa-map-marked-alt"></i></span>
            {{ $t("itemPreviewSection.recommendFuncInfo") }}
          </p>
        </div>
        <div v-else class="recommends">
          <ul
            v-if="isShowPath"
            :class="`recommends_list ${isShowPath ? 'open' : ''}`"
            ref="recommendsModal"
          >
            <li class="recommends_list__buttonBox">
              <button class="closeBtn" @click="closeRecommendsModal">
                <i class="fas fa-times"></i>
              </button>
            </li>
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
                  {{ area[language] }}
                </span>
              </button>
            </li>
          </ul>
          <div v-else class="recommendsCover">
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
              <p>
                <i class="fas fa-toggle-off"></i
                >{{ $t("itemPreviewSection.showRecommendsInfo") }}
              </p>
            </div>
            <p v-else class="noRouteCount">
              {{ $t(`noti.${error.message}`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    categoryName,
    searchById,
    areaData,
    itemOptions,
  } from "~/utils/itemTable";
  import { disassembleWD } from "~/utils/disassemble";
  import { onUpdated, ref } from "vue";
  import { useStore } from "vuex";

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
          if (option === "sort") itemInfo.sort = categoryName[cart[option]];
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
        return Object.keys(this.cartItem).filter(
          (option) => !this.necessaryOptions.includes(option)
        );
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
        } catch (e) {
          this.error = e;
        }
        this.isInitial = false;
      },
      togglePath() {
        this.isShowPath = !this.isShowPath;
      },
      setEquip() {
        this.$store.dispatch("getItem", this.cartItemId);
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
        const newRoute = target.map((area) => this.areaName2Id[area]);
        if (window.confirm(this.$t("noti.applyRoute")))
          this.$store.dispatch("setRoute", newRoute);
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
      grid-template-columns: 25% auto 25%;
      @media screen and (max-width: 720px) {
        grid-template-columns: 1fr;
      }
      gap: 5px;
      position: relative;
      overflow: visible;

      .imgInfo {
        background: #fff;
        border-radius: 5px;
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

      .itemOption {
        min-height: 25px;
        text-indent: 5px;
        background: #fff;
        border-bottom: 2px solid $color2;
        display: flex;
        align-items: center;
        border-radius: 5px;

        &.uniqueOption > div {
          flex-direction: column;
          align-items: flex-start;

          .attrValue {
            ul {
              list-style: disc outside;
              padding: 0 4px;

              .optionDetail {
                margin: 4px 0;
                word-break: keep-all;
              }
            }
          }
        }

        > div {
          width: 100%;
          display: flex;
          column-gap: 5px;
          text-indent: 0;
          align-items: center;
          padding: 3px;
          .attrKey {
            display: block;
            min-width: max-content;
          }
        }

        &.nameInfo {
          .attrValue {
            padding: 0 5px;
            border-radius: 5px;
            height: 20px;
            line-height: 20px;
            border: none;
            font-size: 0.9em;
          }
        }

        .itemMaterial {
          display: flex;
          flex-wrap: wrap;
          gap: 3px 5px;

          .matInfoBtn {
            padding: 0 5px;
            box-shadow: 1px 0 1px 0 #999;
            box-sizing: border-box;
            border-radius: 5px;
            height: 20px;
            line-height: 20px;
            font-size: 0.8em;

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
      border-radius: 5px;
      background: #fff;

      .btns {
        display: flex;
        justify-content: space-between;
        .findRecommendPathBtn {
          background: none;
          @include fasIcon(25px);
          &:hover {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
          }
          .fas {
            color: $color3;
          }
        }
        .togglePathBtn {
          background: none;
          @include fasIcon(25px);
          .fas {
            color: $color3;
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
        align-items: center;

        &_list {
          width: fit-content;
          background: #fff;
          border: 1px solid $color1;
          border-radius: 5px;

          &.open {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 5;
          }

          li {
            padding: 3px;
          }

          &__buttonBox {
            display: flex;
            justify-content: flex-end;
            background: $color1;
            .closeBtn {
              background: none;
              color: $color2;
            }
          }
          .routeButton {
            background: none;
            border-radius: 5px;

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
</style>
