<template>
  <div class="modal" :style="customStyle">
    <div v-if="modal.manual.show" class="manualModal">
      <Manual />
    </div>

    <div v-if="modal.totalPathFinder.show" class="pathFinderModal">
      <TotalPathFinder />
    </div>

    <div v-if="modal.bag.show" class="bagModal">
      <Bag />
    </div>

    <div v-if="modal.craft.show" class="craftModal">
      <Craft />
    </div>

    <div v-if="modal.map.show" class="mapModal">
      <Map />
    </div>
  </div>
</template>

<script>
  import Bag from "~/components/Bag";
  import Map from "~/components/Map";
  import Craft from "~/components/Craft";
  import TotalPathFinder from "~/components/TotalPathFinder";
  import Manual from "~/components/Manual";

  export default {
    components: { Bag, Map, Craft, TotalPathFinder, Manual },
    computed: {
      modal() {
        return this.$store.state.modal;
      },
      loading() {
        return this.$store.state.loading;
      },
      customStyle() {
        return {
          "--z-index": this.modal.zIndex,
          "--z-index-bag": this.modal.bag.zIndex,
          "--z-index-totalPathFinder": this.modal.totalPathFinder.zIndex,
          "--z-index-craft": this.modal.craft.zIndex,
          "--z-index-map": this.modal.map.zIndex,
          "--z-index-manual": this.modal.manual.zIndex,
        };
      },
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  .modal {
    .manualModal {
      z-index: var(--z-index-manual, 30) !important;
    }

    .pathFinderModal {
      z-index: var(--z-index-totalPathFinder, 30) !important;
    }

    .bagModal {
      z-index: var(--z-index-bag, 30) !important;
    }

    .craftModal {
      z-index: var(--z-index-craft, 30) !important;
    }

    .mapModal {
      z-index: var(--z-index-map, 30) !important;
    }

    .loadingModal {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100vw;
      height: 100vh;
      background: rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        height: fit-content;
        width: fit-content;
        color: $color2;
        background: $color3;
        padding: 16px;
      }
    }
  }
</style>