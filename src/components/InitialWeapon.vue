<template>
  <div
    :class="`initialWeapon ${toggleModal.initialWeapon ? 'active' : 'hide'}`"
  >
    <ul>
      <li
        v-for="weapon in initialWeapon"
        :key="`initialWeapon${weapon.id}`"
        :data-item="weapon.id"
        :class="`${showItemImg ? 'showItemImg' : ''}`"
      >
        <button @click="setInitialWeapon" class="selectBtn">
          <img
            :src="weapon.img"
            :alt="`${weapon.name}_icon`"
            :title="`${weapon.name}_icon`"
            v-if="showItemImg"
          />
          <span v-else>{{ weapon.name }}</span>
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
      showItemImg() {
        return this.$store.state.showItemImg;
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
      gap: 3px 5px;
      padding: 5px;
      li {
        height: 30px;
        width: 15%;
        font-size: 0.8em;

        &.showItemImg {
          width: fit-content;
        }
        .selectBtn {
          @include fasIcon(30px);
          width: 100%;
          overflow: hidden;
          background: #fff;
          &:hover {
            box-shadow: 0 0 7px 2px inset rgba(0, 0, 0, 0.2);
          }

          img {
            height: 100%;
            width: fit-content;
            border-radius: 5px;
          }
        }
      }
    }
  }
</style>
