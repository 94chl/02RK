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
  $color1: #0adb96;
  $color2: #ddfdf3;
  $color3: #255f4c;
  $color4: #e9ad7c;
  $color5: #a06536;

  .hide {
    display: none;
  }

  .valueW {
    border: 1px solid #000;
    background: #fff;
    color: #000;
  }
  .valueG {
    border: 1px solid #0e970e;
    background: #0e970e;
    color: #fff;
  }
  .valueB {
    border: 1px solid #0e3cb9;
    background: #0e3cb9;
    color: #fff;
  }
  .valueP {
    border: 1px solid #7513c5;
    background: #7513c5;
    color: #ffee00;
  }
  .valueY {
    border: 1px solid #ffee00;
    background: #ffee00;
    color: #ff0000;
  }

  div,
  li,
  label {
    overflow: hidden;
  }

  img {
    width: 100%;
  }

  button {
    border: none;
    cursor: pointer;
  }

  .app {
    min-width: 360px;
    margin: 0 auto;
    background: #ffffff;
    position: relative;
    @media screen and (max-width: 720px) {
      width: 360px;
    }
    @media screen and (min-width: 721px) {
      width: 720px;
    }
  }
</style>
