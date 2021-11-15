<template>
  <div class="targetItem">
    <div>Target Items</div>
    <div>
      <ul>
        <li
          v-for="(item, index) in targetItems"
          :key="`target${item.id}`"
          :data-index="index"
          :data-itemid="item.id"
        >
          <button @click="changeItem">{{ item.name }}</button>
          <button @click="removeTargetItem">X</button>
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
        if (window.confirm("remove?")) {
          const newTargetItems = this.targetItems.filter(
            (_, index) => index != e.target.closest("li").dataset.index
          );
          console.log("newTargetItems", newTargetItems);
          this.$store.dispatch("removeTargetItems", newTargetItems);
        }
      },
      changeItem(e) {
        const selectedItem = searchById(e.target.closest("li").dataset.itemid);
        this.$store.dispatch("setCart", selectedItem);
      },
    },
  };
</script>

