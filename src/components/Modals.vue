<template>
  <div class="modals">
    <TotalPathFinder></TotalPathFinder>
    <Bag></Bag>
    <Status></Status>
    <Craft></Craft>
    <Map></Map>
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
