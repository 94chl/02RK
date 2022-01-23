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
    <!-- <div class="footer">
      <a href="https://hits.seeyoufarm.com">
        <img
          src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F94chl.github.io%2F02RK%2F&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"
        />
      </a>
    </div> -->
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

  export default {
    components: {
      Header,
      Select,
      TargetItem,
      CustomRoute,
      Area,
      NeedDrops,
      Modals,
    },
    computed: {
      minHeight() {
        return this.$store.state.minHeight;
      },
    },
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

    .footer {
      height: 25px;
      img {
        max-width: 100%;
        height: 100%;
        width: fit-content;
      }
    }
  }
</style>
