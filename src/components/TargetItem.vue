<template>
  <div class="targetItems">
    <div class="tabName">
      <h3>{{ $t("section.targetItem") }}</h3>
      <div class="buttonBox">
        <div>
          <button
            :class="`changeStatusEquipKeyBtn ${
              statusEquipKey === 'targetItems' ? 'selected' : ''
            }`"
            @click="onChangeStatusEquipKey('targetItems')"
          >
            <i class="fa-solid fa-crosshairs"></i>
          </button>
          <button
            :class="`changeStatusEquipKeyBtn ${
              statusEquipKey === 'bagItems' ? 'selected' : ''
            }`"
            @click="onChangeStatusEquipKey('bagItems')"
          >
            <i class="fas fa-suitcase"></i>
          </button>
          <button
            class="reamoveAllBtn"
            @click="clearTargetItem"
            v-if="statusEquipKey === 'targetItems'"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <div>
      <ul
        :class="`targetItem ${statusEquipKey === 'targetItems' ? '' : 'hide'}`"
      >
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
              :src="require(`~/img/item/${item.sort}/${item.name.en}.webp`)"
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

      <ul :class="`bagItems ${statusEquipKey === 'bagItems' ? '' : 'hide'}`">
        <li
          v-for="pocket in Object.keys(bagItems)"
          :key="pocket"
          :data-bag="pocket"
          :data-item="`${bagItems[pocket].id ? bagItems[pocket].id : ''}`"
        >
          <span v-if="bagItems[pocket].id">
            <div :class="`itemInfo value${bagItems[pocket].id[0]}`">
              <img
                :src="
                  require(`~/img/item/${
                    bagItems[pocket].sort === 'weapon'
                      ? bagItems[pocket].sortDetail
                      : bagItems[pocket].sort
                  }/${bagItems[pocket].name.en}.webp`)
                "
                :alt="`${bagItems[pocket].name[language]}_img`"
                :title="`${bagItems[pocket].name[language]}_img`"
              />
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
</template>

<script>
  import { searchById } from "~/utils/itemTable";
  import ampl from "~/utils/amplitude.js";

  export default {
    data() {
      return {
        statusEquipKey: "targetItems",
      };
    },
    components: {},
    computed: {
      language() {
        return this.$store.state.language;
      },
      targetItems() {
        return this.$store.state.targetItems;
      },
      bagItems() {
        return this.$store.state.bagEquip;
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
      onChangeStatusEquipKey(target) {
        this.statusEquipKey = target;
      },
      showItemInfo(e) {
        const selectedItem = searchById(e.target.closest("li").dataset.itemid);
        ampl.log("select item", { tab: "Target", ...selectedItem });

        this.$store.dispatch("setCart", selectedItem);
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
          border-radius: 4px;
          width: fit-content;
          padding: 0;

          &.changeStatusEquipKeyBtn,
          &.removeAllBtn {
            @include fasIcon(25px);
            background: none;
            .fas,
            i {
              color: $color3;
            }
            &:hover {
              box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
            }
          }
          &.selected {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.3);
          }
          .fas {
            color: $color3;
            @include fasIcon(25px);
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
      gap: 4px;
      padding: 0 4px;
      max-height: 96px;
      overflow-y: scroll;

      @media screen and (max-width: 720px) {
        grid-template-columns: repeat(auto-fit, minmax(68px, 1fr));
      }

      .itemInfo {
        background: #fff;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        height: 96px;

        .showItemInfoBtn {
          border-radius: 6px;
          height: calc(100% - 24px);
          padding: 0;
          display: flex;
          justify-content: center;
          overflow: hidden;
          &:hover {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
          }

          img {
            max-height: 100%;
            width: fit-content;
          }
        }
        .itemTextBox {
          height: 24px;
          padding: 4px;
          text-align: center;
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
      border-radius: 4px;
      padding: 4px;
      li {
        height: 25px;
        line-height: 25px;
        position: relative;
        background: #fff;
        border-radius: 4px;

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
          padding: 4px;
        }
      }
    }
  }
</style>


