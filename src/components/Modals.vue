<template>
  <div class="modals">
    <div v-if="modals.manual" class="mapManual">
      <Manual />
    </div>

    <div v-if="modals.totalPathFinder" class="pathFinderModal">
      <TotalPathFinder />
    </div>

    <div v-if="modals.bag" class="bagModal">
      <Bag />
    </div>

    <div v-if="modals.status" class="statusModal">
      <Status />
    </div>

    <div v-if="modals.craft" class="craftModal">
      <Craft />
    </div>

    <div v-if="modals.map" class="mapModal">
      <Map />
    </div>
    <div v-if="loading" class="loadingModal">
      <div>로딩 중</div>
    </div>
  </div>
</template>

<script>
  import Bag from "~/components/Bag";
  import Status from "~/components/Status";
  import Map from "~/components/Map";
  import Craft from "~/components/Craft";
  import TotalPathFinder from "~/components/TotalPathFinder";
  import Manual from "~/components/Manual";

  export default {
    components: { Bag, Status, Map, Craft, TotalPathFinder, Manual },
    computed: {
      modals() {
        return this.$store.state.toggleModal;
      },
      loading() {
        return this.$store.state.loading;
      },
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
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
</style>