<template>
  <div class="app">
    <Header />
    <div class="main" ref="main" :style="{ minHeight: `${200 + minHeight}px` }">
      <Character />
      <Status />
      <TargetItem />
      <Select />
      <NeedDrops />
      <CustomRoute />
      <Area />
    </div>
    <Footer />
    <Modals />
  </div>
</template>

<script>
  import Header from "~/components/Header";
  import Character from "~/components/Character";
  import Status from "~/components/Status";
  import Select from "~/components/Select";
  import TargetItem from "~/components/TargetItem";
  import Area from "~/components/Area";
  import NeedDrops from "~/components/NeedDrops";
  import CustomRoute from "~/components/CustomRoute";
  import Modals from "~/components/Modals";
  import Footer from "~/components/Footer";
  import ampl from "~/utils/amplitude.js";

  export default {
    components: {
      Header,
      Character,
      Select,
      Status,
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
      this.$store.dispatch("selectLanguage", this.$i18n.locale);
      // const targetItems = getSessionStorage("02RK_targetItems", []);
      // const customRoute = getSessionStorage("02RK_customRoute", []);
      // if (
      //   (targetItems.length || customRoute.length) &&
      //   window.confirm(this.$t("noti.loadPreviousData"))
      // ) {
      //   this.$store.dispatch("setTargetItems", targetItems);
      //   this.$store.dispatch("setRoute", customRoute);
      //   ampl.log("load previous data");
      //   ampl.log("start app");
      // } else {
      //   removeSessionStorage("02RK_targetItems");
      //   removeSessionStorage("02RK_customRoute");
      //   ampl.log("reset previous data");
      // }
      ampl.log("start app");
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
    display: none !important;
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
  .valueR {
    border: 1px solid #ffee00;
    background: #ff0000;
    color: #fff;
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
    font-size: 1rem;
    @media screen and (max-width: 720px) {
      width: 100%;
    }
    @media screen and (min-width: 721px) {
      width: 720px;
      font-size: 0.8rem;
    }

    .tabName {
      height: 30px;
      line-height: 30px;
      text-indent: 5px;
      font-weight: bold;
      color: $color3;
      font-size: 1.2rem;
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
    }
  }
</style>
