<template>
  <div class="itemPreview">
    <p>Preview</p>
    <ul>
      <li v-for="info in Object.keys(cartItem)" :key="`cartItemInfo${info}`">
        <span>
          {{ `${info}:` }}
        </span>
        <div v-if="Array.isArray(cartItem[info]) && info !== 'location'">
          <button
            v-for="item in cartItem[info]"
            :key="`${info}${item.id}`"
            @click="changeItem"
            :data-itemid="item.id"
          >
            {{ item.name }}
          </button>
        </div>
        <div v-else-if="info === 'location'">
          <span v-for="areaId in cartItem[info]" :key="areaId">
            {{ `[${areaData[areaId].name}]` }}
          </span>
        </div>
        <div v-else>
          <span>
            {{ cartItem[info] }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { eng2Kor, searchById, areaData } from "~/utils/itemTable";

  export default {
    data() {
      return {
        areaData: areaData,
      };
    },
    components: {},
    computed: {
      cartItem() {
        const cart = this.$store.state.cart;
        const cartKeys = Object.keys(cart);
        const itemInfo = {};
        cartKeys.forEach((option, index) => {
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

