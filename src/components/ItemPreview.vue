<template>
  <div class="itemPreview">
    <div class="itemPreview_info">
      <div class="imgInfo">
        <img :src="cartItem.img" :alt="`${cartItem.name}_img`" />
      </div>
      <ul>
        <li class="itemOption nameInfo">
          <div>
            <span class="attrKey">이름 : </span>
            <span class="attrValue">{{ cartItem.name }}</span>
          </div>
        </li>
        <li class="itemOption sortInfo">
          <div>
            <span class="attrKey">종류 : </span>
            <span class="attrValue">{{ cartItem.sort }}</span>
          </div>
        </li>
        <li
          v-for="option in Object.keys(cartItem)"
          :class="`itemOption ${option}Info`"
          :key="`cartItemInfo${option}`"
        >
          <div v-if="!necessaryOptions.includes(option)">
            <span v-if="korOption[option]" class="attrKey">
              {{ `${korOption[option]} :` }}
            </span>
            <span
              class="attrValue"
              v-if="['material', 'tobe'].includes(option)"
            >
              <button
                v-for="item in cartItem[option]"
                :key="`${option}${item.id}`"
                @click="changeItem"
                :data-itemid="item.id"
              >
                {{ item.name }}
              </button>
            </span>
            <span class="attrValue" v-else-if="option === 'location'">
              <span v-for="areaId in cartItem[option]" :key="areaId">
                {{ areaData[areaId].name }}
              </span>
            </span>
            <span v-else class="attrValue">
              <span>
                {{ cartItem[option] }}
              </span>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { eng2Kor, searchById, areaData } from "~/utils/itemTable";

  export default {
    data() {
      return {
        areaData: areaData,
        korOption: {
          img: "이미지",
          name: "이름",
          sort: "종류",
          material: "하위 재료",
          location: "드랍위치",
          tobe: "조합가능",
        },
        necessaryOptions: ["img", "name", "sort"],
      };
    },
    components: {},
    computed: {
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

        console.log("cartItem", itemInfo);

        return itemInfo;
      },
    },
    methods: {
      changeItem(e) {
        const selectedItem = searchById(e.target.dataset.itemid);
        this.$store.dispatch("setCart", selectedItem);
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
      grid-template-columns: minmax(70px, 25%) auto;
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
        line-height: 25px;
        text-indent: 5px;
        background: #fff;
        border-bottom: 2px solid $color2;

        &.nameInfo {
          .attrValue {
            border: none;
            padding: 0 5px;
          }
        }

        &#itemMaterial {
          .matInfoBtn {
            padding: 0 5px;
            background: #fff;
            color: #000;
            box-shadow: 1px 0 1px 0 #999;
            box-sizing: border-box;
            border-radius: 5px;
          }
        }
      }
    }

    #itemPreviewBtnBox {
      position: absolute;
      top: 0;
      right: 0;
      height: 25px;

      .undoInfoBtn,
      .pathFinderBtn {
        @include fasIcon(25px);
      }
    }

    #itemPathModal {
      border: 1px solid $color3;
      border-radius: 5px;
      background: #fff;

      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 5;
      background: #fff;
      min-width: 50px;
      text-align: right;

      overflow-y: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }

      &.hide {
        display: none;
      }
      #itemPathModalBtnBox {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 0;
        width: 100%;
        .removePathBtn,
        .rePathFinderBtn {
          @include fasIcon(25px);
        }
      }
      .itemPaths {
        margin-top: 25px;
        ul {
          li {
          }
        }
      }
    }
  }
</style>
