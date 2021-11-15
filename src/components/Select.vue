<template>
  <div class="select">
    <div class="tabName">
      아이템 선택
      <!-- <button class="toggleTabContentBtn">
        <i class="fas fa-angle-double-down"></i>
        <i class="fas fa-angle-double-up"></i>
      </button> -->
    </div>

    <div class="select_dept">
      <form @change="changeDept">
        <input
          type="radio"
          :value="dept"
          :id="`select${dept}`"
          class="dept"
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
          [{{ dept }}]
        </label>
      </form>
    </div>

    <div class="select_category">
      <select
        data-name="selectCategory"
        id="categoryList"
        @change="changeCategory"
      >
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
      <select data-name="selectItem" id="categoryList" @change="changeItem">
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
      <button class="addItemBtn" @click="addItem">add</button>
    </div>

    <div class="select_preview">
      <ItemPreview></ItemPreview>
    </div>
  </div>
</template>

<script>
  import { database, eng2Kor } from "~/utils/itemTable";
  import ItemPreview from "~/components/ItemPreview";

  export default {
    data() {
      return {
        deptArr: ["weapon", "equip", "item"],
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

