<template>
  <div class="modals">
    <Bag></Bag>
    <Status></Status>
    <Map></Map>
    <Craft></Craft>
    <TotalPathFinder></TotalPathFinder>
  </div>
</template>

<script>
  import Bag from "~/components/Bag";
  import Status from "~/components/Status";
  import Map from "~/components/Map";
  import Craft from "~/components/Craft";
  import TotalPathFinder from "~/components/TotalPathFinder";

  export default {
    data() {
      return {
        errorMessage: "",
      };
    },
    components: { Bag, Status, Map, Craft, TotalPathFinder },
    computed: {},
    methods: {},
  };
</script>
