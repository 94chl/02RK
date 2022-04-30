<template>
  <div class="app">
    <Header></Header>
    <div class="main" ref="main" :style="{ minHeight: `${200 + minHeight}px` }">
      <Select></Select>
      <TargetItem></TargetItem>
      <NeedDrops></NeedDrops>
      <CustomRoute></CustomRoute>
      <Area></Area>
      <Modals></Modals>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "~/components/Header";
  import Select from "~/components/Select";
  import TargetItem from "~/components/TargetItem";
  import Area from "~/components/Area";
  import NeedDrops from "~/components/NeedDrops";
  import CustomRoute from "~/components/CustomRoute";
  import Modals from "~/components/Modals";
  import Footer from "~/components/Footer";

  import {
    getSessionStorage,
    removeSessionStorage,
  } from "~/utils/useSessionStorage";

  export default {
    components: {
      Header,
      Select,
      TargetItem,
      CustomRoute,
      Area,
      NeedDrops,
      Modals,
      Footer,
    },
    computed: {
      minHeight() {
        return this.$store.state.minHeight;
      },
    },
    methods: {},
    mounted() {
      const targetItems = getSessionStorage("02RK_targetItems", []);
      const customRoute = getSessionStorage("02RK_customRoute", []);
      if (
        (targetItems.length || customRoute.length) &&
        window.confirm("진행중이던 기록이 있습니다. 작업을 이어하시겠습니까?")
      ) {
        this.$store.dispatch("setTargetItems", targetItems);
        this.$store.dispatch("setRoute", customRoute);
      } else {
        removeSessionStorage("02RK_targetItems");
        removeSessionStorage("02RK_customRoute");
      }
    },
  };
</script>

<style lang="scss">
  $color1: #0adb96;
  $color2: #ddfdf3;
  $color3: #255f4c;
  $color4: #e9ad7c;
  $color5: #a06536;
  .app {
    font-family: Arial, Helvetica, sans-serif;
  }

  .hide {
    display: none;
  }

  .valueW {
    border: 1px solid #000;
    background: #fff;
    color: #000;
  }
  .valueG {
    border: 1px solid #55dd55;
    background: #55dd55;
    color: #fff;
  }
  .valueB {
    border: 1px solid #4c70d4;
    background: #4c70d4;
    color: #fff;
  }
  .valueP {
    border: 1px solid #ba70f7;
    background: #ba70f7;
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
    min-width: 320px;
    margin: 0 auto;
    background: #ffffff;
    position: relative;
    word-break: keep-all;
    @media screen and (max-width: 720px) {
      width: 100%;
    }
    @media screen and (min-width: 721px) {
      width: 720px;
    }

    .main {
      margin-top: 70px;
      position: relative;
      height: fit-content;

      > div {
        margin-bottom: 10px;
        background: $color2;
        border-radius: 5px;
        box-shadow: 0 1px 1px 0 $color1;
        &.modals {
          margin-bottom: 0;
        }
      }

      .tabName {
        height: 30px;
        line-height: 30px;
        text-indent: 5px;
        font-weight: bold;
        color: $color3;
        font-size: 1.1em;
        letter-spacing: 0.1em;
        .toggleTabContentBtn {
          @include fasIcon(30px);
          .fa-angle-double-down {
            display: none;
          }
          .fa-angle-double-up {
            display: block;
          }
          &.closed {
            .fa-angle-double-down {
              display: block;
            }
            .fa-angle-double-up {
              display: none;
            }
          }
        }
      }
    }
  }
</style>
