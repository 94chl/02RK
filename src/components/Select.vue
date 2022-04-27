<template>
  <div class="select">
    <div class="tabName">
      <h3>아이템 선택</h3>
    </div>

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
          {{ depts[dept][language] }}
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
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <!-- <div v-if="!itemOptionSearchModal" class="itemOptionSearchModal">
      아이템 옵션 검색 테스트
    </div> -->
    <ItemPreview></ItemPreview>
  </div>
</template>

<script>
  import { database, categoryName, itemOptions } from "~/utils/itemTable";
  import ItemPreview from "~/components/ItemPreview";

  export default {
    data() {
      return {
        deptArr: ["weapon", "equip", "item"],
        depts: {
          weapon: { kr: "무기", en: "Weapon", ja: "武器", cn: "武器" },
          equip: { kr: "방어구", en: "Armor", ja: "防具", cn: "防具" },
          item: { kr: "기타", en: "Miscellaneous", ja: "その他", cn: "其他" },
        },
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
      selectItem() {
        return this.$store.state.cart;
      },
      db() {
        const { weaponData, itemData, equipData } = database;
        const options = {};

        weaponData.forEach((category) => {
          category.items.forEach((item) => {
            Object.keys(item).forEach((opt) => {
              options[opt] = options[opt] ? options[opt] + 1 : 1;
            });
          });
        });

        itemData.forEach((category) => {
          category.items.forEach((item) => {
            Object.keys(item).forEach((opt) => {
              options[opt] = options[opt] ? options[opt] + 1 : 1;
            });
          });
        });
        equipData.forEach((category) => {
          category.items.forEach((item) => {
            Object.keys(item).forEach((opt) => {
              options[opt] = options[opt] ? options[opt] + 1 : 1;
            });
          });
        });

        return options;
      },
    },
    methods: {
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
        this.$store.dispatch("setCart", selectedItem);
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
      console.log(this.db);
    },
  };
</script>

<style lang="scss" scoped>
  .select {
    display: grid;
    grid-template-columns: 25% auto minmax(70px, 25%);
    gap: 5px;
    padding: 0 5px;
    overflow: visible;

    .tabName {
      grid-column: 1 / 4;
      text-indent: 0;
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
        margin: 2.5px 5px;
        box-shadow: 0 0 1px 1px $color1;
        border-radius: 5px;
        padding: 0 5px;
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
        border-radius: 5px;
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
        border-radius: 5px;
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
        border-radius: 5px;
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
