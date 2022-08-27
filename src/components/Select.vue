<template>
  <div>
    <div class="tabName">
      <h3>{{ $t("section.selectItem") }}</h3>
      <div class="buttonBox" data-dropDown="itemSelect">
        <button
          @click="onToggleDropDown"
          :class="`toggleSelectBtn ${
            dropDown.itemSelect ? 'opened' : 'closed'
          }`"
        >
          <i class="fas fa-angle-double-down"></i>
          <i class="fas fa-angle-double-up"></i>
        </button>
      </div>
    </div>

    <div :class="`select ${dropDown.itemSelect ? '' : 'hide'}`">
      <div class="select_dept">
        <form @change="changeDept">
          <input
            type="radio"
            :value="dept"
            :id="`select${dept}`"
            class="deptRadio"
            :name="dept"
            v-for="dept in deptArr"
            :key="dept"
            :checked="dept === selectDept"
          />
          <label
            :for="`select${dept}`"
            v-for="dept in deptArr"
            :key="`deptArr${dept}`"
            :class="`select${dept} ${dept == selectDept ? 'selected' : ''}`"
          >
            {{ $t(`selectSection.${dept}`) }}
          </label>
        </form>
      </div>

      <div class="select_category">
        <select class="select_category_select" @change="changeCategory">
          <option
            v-for="category in categoryArr"
            :value="category.category"
            :selected="category.category === selectCategory"
            :key="`categoryArr${category.category}`"
          >
            {{ category.nameInfo[language] }}
          </option>
        </select>
      </div>

      <div class="select_item">
        <select class="select_item_select" @change="changeItem">
          <option
            v-for="item in itemArr"
            :value="item.id"
            :selected="item.id === selectItem.id"
            :key="`itemArr${item.id}`"
          >
            {{ item.name[language] }}
          </option>
        </select>
      </div>

      <div class="select_btns">
        <!-- <button
        :class="`search_btn ${itemOptionSearchModal && 'active'}`"
        @click="openItemOptionSearchModal"
      >
        <i class="fas fa-search"></i>
      </button> -->
        <button class="add_btn" @click="addItem">
          <i class="fa-solid fa-crosshairs"></i>
        </button>
      </div>

      <!-- <div v-if="!itemOptionSearchModal" class="itemOptionSearchModal">
      아이템 옵션 검색 테스트
    </div> -->
      <ItemPreview></ItemPreview>
    </div>
  </div>
</template>

<script>
  import { searchById, database, categoryName } from "~/utils/itemTable";
  import ItemPreview from "~/components/ItemPreview";
  import ampl from "~/utils/amplitude.js";

  export default {
    data() {
      return {
        deptArr: ["weapon", "equip", "item"],
        categoryArr: [],
        itemArr: [],
        selectDept: "",
        selectCategory: "",
        itemOptionSearchModal: false,
      };
    },
    components: { ItemPreview },
    computed: {
      language() {
        return this.$store.state.language;
      },
      dropDown() {
        return this.$store.state.dropDown;
      },
      selectItem() {
        return this.$store.state.cart;
      },
      testImages() {
        const test = Object.values(database).reduce((acc, cur) => {
          cur.forEach((data) => {
            if (data.items) {
              data.items.forEach((item) => {
                if (item.name.en.includes("'s")) {
                  acc.push({
                    ...item,
                    name: { ...item.name, en: item.name.en.replace("'s", "_s") },
                  });
                } else {
                  acc.push(item);
                }
              });
            }
          });
          return acc;
        }, []);

        return test;
      },
    },
    methods: {
      onToggleDropDown(e) {
        this.$store.dispatch(
          "onToggleDropDown",
          e.target.closest("div").dataset.dropdown
        );
      },
      changeDept(e) {
        this.selectDept = e.target.value;
        this.categoryArr = database[`${this.selectDept}Data`].map((category) => ({
          ...category,
          nameInfo: categoryName[category.category],
        }));
        this.selectCategory = this.categoryArr[0].category;
        this.itemArr = this.categoryArr.filter(
          (category) => category.category === this.selectCategory
        )[0].items;
        this.$store.dispatch("setCart", this.itemArr[0]);
      },
      changeCategory(e) {
        this.selectCategory = e.target.value;
        this.itemArr = this.categoryArr.filter(
          (category) => category.category === this.selectCategory
        )[0].items;
        this.$store.dispatch("setCart", this.itemArr[0]);
      },
      changeItem(e) {
        const selectedItem = this.itemArr.filter(
          (item) => item.id === e.target.value
        )[0];
        const selectedItemInfo = searchById(selectedItem.id);
        ampl.log("select item", { tab: "SELECT", ...selectedItemInfo });
        this.$store.dispatch("setCart", selectedItemInfo);
      },
      addItem() {
        this.$store.dispatch("addTargetItems", this.$store.state.cart);
      },
      openItemOptionSearchModal() {
        this.itemOptionSearchModal = !this.itemOptionSearchModal;
      },
    },
    created() {
      this.selectDept = "weapon";
      this.categoryArr = database[`${this.selectDept}Data`].map((category) => ({
        ...category,
        nameInfo: categoryName[category.category],
      }));
      this.selectCategory = this.categoryArr[0].category;
      this.itemArr = this.categoryArr.filter(
        (category) => category.category === this.selectCategory
      )[0].items;
      this.$store.dispatch("setCart", this.itemArr[0]);
      // console.log(itemOptions);
    },
  };
</script>

<style lang="scss" scoped>
  .tabName {
    grid-column: 1 / 4;
    text-indent: 0;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    .buttonBox {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      > div {
        display: flex;
      }

      button {
        background: none;
        color: $color3;
        border-radius: 4px;
        @include fasIcon(25px);
        margin-right: 4px;
        &.toggleSelectBtn {
          margin: 0;

          &.opened {
            .fa-angle-double-down {
              display: none;
            }
            .fa-angle-double-up {
              display: block;
            }
          }
          &.closed {
            .fa-angle-double-down {
              display: block;
            }
            .fa-angle-double-up {
              display: none;
            }
          }
        }

        &:hover,
        &.selected {
          box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.3);
        }
      }
    }
  }

  .select {
    display: grid;
    grid-template-columns: 25% auto minmax(70px, 25%);
    gap: 4px;
    padding: 0 4px;
    overflow: visible;

    &.hide {
      display: none;
    }

    &_dept {
      grid-column: 1 / 4;
      height: 30px;
      display: flex;
      align-items: center;

      .deptRadio {
        display: none;
      }

      label {
        margin: 2.5px 4px;
        box-shadow: 0 0 1px 1px $color1;
        border-radius: 4px;
        padding: 0 4px;
        cursor: pointer;

        &.selected {
          background: $color3;
          color: $color2;
          box-shadow: 0 0 1px 1px $color3 inset;
          border: 1px solid $color3;
        }
        &:hover {
          background: $color3;
          color: $color2;
        }
      }
    }

    &_category {
      height: 30px;
      &.hide {
        display: none;
      }

      &_select {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 4px;
      }
    }

    &_item {
      height: 30px;

      &.hide {
        display: none;
      }

      &_select {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 4px;
      }
    }

    &_btns {
      height: 30px;
      display: flex;
      position: relative;

      button {
        width: 100%;
        height: 100%;
        background: $color2;
        color: $color3;
        border-radius: 4px;
        box-shadow: 0 0 1px 1px $color1 inset;

        &:hover,
        &.active {
          background: $color3;
          color: $color2;
        }
      }

      .itemOptionSearchModal {
        position: absolute;
        top: 30px;
      }
    }
  }
</style>
