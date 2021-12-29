<template>
  <div class="itemPreview">
    <div class="itemPreview_info">
      <div class="imgInfo">
        <img
          :src="cartItem.img"
          :alt="`${cartItem.name}_img`"
          :title="`${cartItem.name}_img`"
        />
      </div>
      <ul>
        <li class="itemOption nameInfo">
          <div>
            <span class="attrKey">이름 : </span>
            <span :class="`attrValue value${cartItemId[0]}`">{{
              cartItem.name
            }}</span>
          </div>
        </li>
        <li class="itemOption sortInfo">
          <div>
            <span class="attrKey">종류 : </span>
            <span class="attrValue">{{ cartItem.sort }}</span>
          </div>
        </li>
        <li
          v-for="option in cartItemOptions"
          :key="`cartItemInfo${option}`"
          :class="`itemOption ${option}Info`"
        >
          <div>
            <span class="attrKey">
              {{
                `${
                  korOption[option]
                    ? korOption[option]
                    : option.replace(/[(%)]/g, "")
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
                <span> {{ item.name }}</span>
              </button>
            </span>
            <span class="attrValue" v-else-if="option === 'location'">
              <span
                v-for="areaId in cartItem[option]"
                :key="areaId"
                class="dropArea"
              >
                {{ areaData[areaId].name }}
              </span>
            </span>
            <span v-else class="attrValue">
              <span v-if="option.match(/([고유])|([버프])/g)">
                <ul>
                  <li
                    v-for="uniqueOption in cartItem[option]"
                    :key="cartItem[option] + uniqueOption"
                    class="uniqueOption"
                  >
                    {{ ` ${uniqueOption}` }}
                  </li>
                </ul>
              </span>
              <span v-else>
                {{
                  option.match(/[%]/g)
                    ? `${parseInt(cartItem[option] * 100)}%`
                    : cartItem[option]
                }}
              </span>
            </span>
          </div>
        </li>
      </ul>
      <div class="pathFinder">
        <div class="btns">
          <button @click="pathFinder" class="pathFinderBtn">
            <i class="fas fa-map-marked-alt"></i>
          </button>
          <button @click="togglePath" class="togglePathBtn">
            <i class="fas fa-toggle-on" v-if="isShowPath"></i>
            <i class="fas fa-toggle-off" v-else></i>
          </button>
        </div>
        <div v-if="isInitial" class="beforeRecommend">
          <p>
            <span><i class="fas fa-map-marked-alt"></i></span> 클릭시 최단루트를
            탐색합니다
          </p>
        </div>
        <div v-else class="recommends">
          <ul
            v-if="isShowPath"
            :class="`recommends_list ${isShowPath ? 'open' : ''}`"
          >
            <li
              v-for="(route, index) in recommendRoutes"
              :key="`itemRoute${index}`"
              class="recommends_list__route"
            >
              <span class="recommends_list__route__index">
                {{ `(${index + 1}) ` }}
              </span>
              <span
                v-for="(area, areaIndex) in route"
                :key="route + areaIndex"
                class="recommends_list__route__area"
              >
                {{ area }}
              </span>
            </li>
          </ul>
          <div v-else class="recommendsCover">
            <p>{{ routeItem }}</p>
            <div v-if="recommendRoutes.length > 0" class="routeCount">
              <p>{{ recommendRoutes.length }}</p>
              <p>shortest route</p>
            </div>
            <p v-else class="noRouteCount">
              드랍되지 않는 시작무기가 재료로 들어갈 경우, 가방에서 시작무기를
              추가해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { eng2Kor, searchById, areaData } from "~/utils/itemTable";
  import { disassembleWD } from "~/utils/disassemble";

  export default {
    data() {
      return {
        areaData: areaData,
        korOption: {
          img: "이미지",
          name: "이름",
          sort: "종류",
          material: "재료",
          location: "드랍위치",
          tobe: "상위",
        },
        necessaryOptions: ["img", "name", "sort"],
        isInitial: true,
        isShowPath: false,
      };
    },
    components: {},
    computed: {
      cartItemId() {
        return this.$store.state.cart.id;
      },
      cartItem() {
        const cart = this.$store.state.cart;
        const cartKeys = Object.keys(cart);
        const itemInfo = {};
        cartKeys.forEach((option, index) => {
          if (option === "img") itemInfo.img = cart[option];
          if (option === "name") itemInfo.name = cart[option];
          if (option === "sort") itemInfo.sort = eng2Kor[cart[option]];
          if (cart[option]) {
            if (option === "material")
              itemInfo.material = cart[option].map((id) => searchById(id));
            if (option === "location") itemInfo.location = cart[option];
            if (option === "tobe")
              itemInfo.tobe = cart[option].map((id) => searchById(id));
          }
          if (index > 9) {
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
    },
    methods: {
      changeItem(e) {
        const selectedItem = searchById(
          e.target.closest(".matInfoBtn").dataset.itemid
        );
        this.$store.dispatch("setCart", selectedItem);
      },
      pathFinder() {
        const needDropsInfo = {
          needDrops: Object.keys(disassembleWD([this.cartItemId]).dropMatId),
          total: false,
        };
        this.$store.dispatch("pathFinder", needDropsInfo);
        this.isInitial = false;
      },
      togglePath() {
        this.isShowPath = !this.isShowPath;
      },
    },
    watch: {
      cartItemId() {
        this.isInitial = true;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .itemPreview {
    grid-column: 1 / 4;
    position: relative;

    &_info {
      display: grid;
      grid-template-columns: minmax(70px, 25%) auto 100px;
      gap: 5px;
      position: relative;

      .imgInfo {
        background: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        img {
          height: fit-content;
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
        > div {
          display: flex;
          column-gap: 5px;
          text-indent: 0;
          align-items: center;
          padding: 3px;
          .attrKey {
            display: block;
            min-width: max-content;
          }

          .attrValue {
            .uniqueOption {
              display: block;
              word-break: keep-all;
            }
          }
        }

        &.nameInfo {
          .attrValue {
            padding: 0 5px;
            border-radius: 5px;
            border: none;
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

            &:hover {
              margin-top: -1px;
            }
          }
        }

        .dropArea {
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

    .pathFinder {
      border-radius: 5px;
      background: #fff;
      .btns {
        display: flex;
        justify-content: space-between;
        .pathFinderBtn {
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
          font-size: 0.8rem;
          padding: 0;
          margin: 0;

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
          overflow: hidden;
          width: fit-content;
          background: #fff;
          border: 1px solid $color1;
          padding: 3px;
          border-radius: 5px;
          &.open {
            max-height: calc(100% - 30px);
            position: absolute;
            right: 0;
            top: 25px;
            overflow-y: scroll;
          }
          &__route {
            width: max-content;
            &__area {
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
            word-break: keep-all;
            &.routeCount {
              font-weight: 700;
              color: $color3;
            }
            &.noRouteCount {
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
</style>
