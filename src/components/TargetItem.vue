<template>
  <div class="targetItems">
    <div class="tabName">
      <h3>{{ $t("section.targetItem") }}</h3>
      <div class="buttonBox">
        <button class="reamoveAllBtn" @click="clearTargetItem">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button @click="togglePathFinderModal" class="pathFinderBtn">
          <i class="fas fa-map-marked-alt"></i>
        </button>
      </div>
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
          <button @click="removeTargetItem" class="removeBtn">
            <i class="fas fa-times"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { searchById } from "~/utils/itemTable";
  import ampl from "~/utils/amplitude.js";

  export default {
    components: {},
    computed: {
      language() {
        return this.$store.state.language;
      },
      targetItems() {
        return this.$store.state.targetItems;
      },
    },
    methods: {
      removeTargetItem(e) {
        if (window.confirm(this.$t("noti.removeTargetItem"))) {
          const newTargetItems = this.targetItems.filter(
            (_, index) => index != e.target.closest("li").dataset.index
          );
          ampl.log("remove", { target: "target item" });

          this.$store.dispatch("removeTargetItems", newTargetItems);
        }
      },
      clearTargetItem() {
        if (window.confirm(this.$t("noti.clearTargetItems"))) {
          ampl.log("clear", { target: "target item" });

          this.$store.dispatch("removeTargetItems", []);
        }
      },
      showItemInfo(e) {
        const selectedItem = searchById(e.target.closest("li").dataset.itemid);
        ampl.log("select item", { tab: "Target", ...selectedItem });

        this.$store.dispatch("setCart", selectedItem);
      },
      togglePathFinderModal() {
        this.$store.dispatch("onToggleModal", "totalPathFinder");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .targetItems {
    position: relative;

    .tabName {
      display: flex;
      .buttonBox {
        display: flex;
        button {
          background: none;
          border-radius: 5px;
          width: fit-content;
          padding: 0;

          .fas {
            color: $color3;
            @include fasIcon(30px);
          }
          &:hover {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
          }
        }
      }
    }

    .targetItem {
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

        .removeBtn {
          text-align: center;
          color: #ff0000;
          background: none;
          width: 100%;
          &:hover {
            font-weight: 700;
            background: rgba(0, 0, 0, 0.1);
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
      &:hover {
        box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
      }
    }
  }
</style>


