<template>
  <div class="initialWeapon">
    <p>Initial Weapon</p>
    <ul>
      <li
        v-for="weapon in initialWeapon"
        :key="`initialWeapon${weapon.id}`"
        :data-item="weapon.id"
      >
        <button @click="setInitialWeapon">{{ weapon.name }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { initialWeapon } from "~/utils/itemTable";

  export default {
    data() {
      return {
        initialWeapon,
      };
    },
    components: {},
    computed: {},
    methods: {
      setInitialWeapon(e) {
        const target = e.target.closest("li").dataset.item;
        if (this.$store.state.bagEquip.weapon.id === target) return;

        if (this.$store.state.bagEquip.weapon.id) {
          if (!window.confirm("현재 무기가 교체됩니다")) return;
        }

        this.$store.dispatch("setInitialWeapon", target);
        this.$store.dispatch("updateAssemblable");
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
