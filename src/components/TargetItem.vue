<template>
  <div class="targetItems">
    <div class="tabName">
      <span>Target Items</span>
      <button class="reamoveAllBtn" @click="removeAllTargetItem">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <div>
      <ul class="targetItem">
        <li
          class="itemInfo"
          v-for="(item, index) in targetItems"
          :key="`target${item.id}`"
          :data-index="index"
          :data-itemid="item.id"
        >
          <button class="showItemInfoBtn" @click="showItemInfo">
            <img :src="item.img" :alt="item.name" class="itemInfo_img" />
          </button>
          <button @click="removeTargetItem" class="removeBtn">X</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { searchById } from "~/utils/itemTable";

  export default {
    components: {},
    computed: {
      targetItems() {
        return this.$store.state.targetItems;
      },
    },
    methods: {
      removeTargetItem(e) {
        if (window.confirm("삭제하시겠습니까?")) {
          const newTargetItems = this.targetItems.filter(
            (_, index) => index != e.target.closest("li").dataset.index
          );
          console.log("newTargetItems", newTargetItems);
          this.$store.dispatch("removeTargetItems", newTargetItems);
        }
      },
      removeAllTargetItem() {
        if (window.confirm("전부 삭제하시겠습니까?")) {
          this.$store.dispatch("removeTargetItems", []);
        }
      },
      showItemInfo(e) {
        const selectedItem = searchById(e.target.closest("li").dataset.itemid);
        this.$store.dispatch("setCart", selectedItem);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .targetItems {
    position: relative;

    .targetItem {
      display: grid;
      grid-template-columns: repeat(6, 1fr);

      .itemInfo {
        background: #fff;
        border-radius: 5px;
        margin: 5px;

        .showItemInfoBtn {
          background: none;
        }

        .removeBtn {
          text-align: center;
          color: #ff0000;
          background: none;
          width: 100%;
          &:hover {
            font-weight: 700;
          }
        }
      }
    }

    .reamoveAllBtn {
      @include fasIcon(30px);
      background: none;
      .fas {
        color: $color3;
      }
    }
  }
</style>


