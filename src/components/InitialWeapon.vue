<template>
  <div
    :class="`initialWeapon ${toggleModal.initialWeapon ? 'active' : 'hide'}`"
  >
    <ul>
      <li
        v-for="weapon in initialWeapon"
        :key="`initialWeapon${weapon.id}`"
        :data-item="weapon.id"
      >
        <button @click="setInitialWeapon" class="selectBtn">
          <img
            :src="require(`~/img/WSicon/${weapon.sort}.png`).default"
            :alt="`${weapon.sort}_icon`"
            :class="JSON.stringify(require(`~/img/WSicon/${weapon.sort}.png`))"
          />
        </button>
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
    computed: {
      toggleModal() {
        return this.$store.state.toggleModal;
      },
    },
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
  .initialWeapon {
    background: $color4;
    border-radius: 5px;

    .tabName {
      color: $color2;
      .fas {
        color: $color2;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      gap: 0 5px;
      li {
        height: 30px;
        .selectBtn {
          @include fasIcon(30px);
          img {
            height: 100%;
            width: fit-content;
          }
        }
      }
    }
  }
</style>
