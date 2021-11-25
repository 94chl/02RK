<template>
  <div class="select">
    <div class="tabName">아이템 선택</div>

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
          {{ deptKor[dept] }}
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
          {{ category.kor }}
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
          {{ item.name }}
        </option>
      </select>
    </div>

    <div class="select_addItem">
      <button class="select_addItem_btn" @click="addItem">
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <ItemPreview></ItemPreview>
  </div>
</template>

<script>
  import { database, eng2Kor } from "~/utils/itemTable";
  import ItemPreview from "~/components/ItemPreview";

  export default {
    data() {
      return {
        deptArr: ["weapon", "equip", "item"],
        deptKor: { weapon: "무기", equip: "장비", item: "기타" },
        categoryArr: [],
        itemArr: [],
        selectDept: "",
        selectCategory: "",
      };
    },
    components: { ItemPreview },
    computed: {
      selectItem() {
        return this.$store.state.cart;
      },
    },
    methods: {
      changeDept(e) {
        this.selectDept = e.target.value;
        this.categoryArr = database[`${this.selectDept}Data`].map((category) => ({
          ...category,
          kor: eng2Kor[category.category],
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
        console.log("targetItems", this.$store.state.targetItems);
      },
    },
    created() {
      this.selectDept = "weapon";
      this.categoryArr = database[`${this.selectDept}Data`].map((category) => ({
        ...category,
        kor: eng2Kor[category.category],
      }));
      this.selectCategory = this.categoryArr[0].category;
      this.itemArr = this.categoryArr.filter(
        (category) => category.category === this.selectCategory
      )[0].items;
      this.$store.dispatch("setCart", this.itemArr[0]);
    },
  };
</script>

<style lang="scss" scoped>
  .select {
    display: grid;
    grid-template-columns: 25% auto 70px;
    grid-template-rows: repeat(4, fit-content);
    gap: 5px;
    padding: 0 5px;

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

    &_addItem {
      height: 30px;
      border-radius: 5px;
      box-shadow: 0 0 1px 1px $color1;
      &_btn {
        width: 100%;
        height: 100%;
        background: $color2;
        color: $color3;

        &:hover {
          background: $color3;
          color: $color2;
        }
      }
    }
  }
</style>
