<template>
  <div class="app">
    <Header></Header>
    <Select></Select>
    <TargetItem></TargetItem>
    <NeedDrops></NeedDrops>
    <Bag></Bag>
    <Area></Area>
  </div>
</template>

<script>
  import Header from "~/components/Header";
  import Select from "~/components/Select";
  import TargetItem from "~/components/TargetItem";
  import Bag from "~/components/Bag";
  import Area from "~/components/Area";
  import NeedDrops from "~/components/NeedDrops";

  export default {
    components: { Header, Select, TargetItem, Bag, Area, NeedDrops },
    computed: {},
    methods: {},
  };
</script>

<style lang="scss">
  .hide {
    display: none;
  }
</style>
