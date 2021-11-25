<template>
  <div class="header">
    <div class="header_logo">
      <img src="../img/ER_Logo_White.png" alt="logo" />
    </div>
    <div class="header_title">01RK</div>
    <div class="header_btns" data-modal="bag">
      <button
        :class="`bagBtn ${toggleModal.bag ? 'openedBtn' : ''}`"
        @click="onToggleModal"
      >
        <i class="fas fa-suitcase"></i>
      </button>
      <!-- <button class="header_Btns__allPathFinderBtn">
        <i class="fas fa-map-marked-alt"></i>
        추천루트
      </button> -->
    </div>

    <!-- <div class="header_allPathFinderModal">
      <div class="header_allPathFinderModal__tabName">
        추천 루트
        <button class="rePathFinderBtn">
          <i class="fas fa-redo"></i>
          다시
        </button>
      </div>
      <div class="header_allPathFinderModal__itemPaths"></div>
    </div> -->
    <Bag></Bag>
  </div>
</template>

<script>
  import Bag from "~/components/Bag";

  export default {
    components: { Bag },
    computed: {
      toggleModal() {
        return this.$store.state.toggleModal;
      },
    },
    methods: {
      onToggleModal(e) {
        this.$store.dispatch(
          "onToggleModal",
          e.target.closest("div").dataset.modal
        );
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header {
    height: 70px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    background: $color1;

    &_logo {
      max-width: 120px;
      height: 50px;
      line-height: 50px;
      margin: 10px 0;
      img {
        height: 100%;
      }
    }

    &_title {
      height: 50px;
      min-width: 120px;
      line-height: 50px;
      margin: 10px 0;
      color: $color2;
      font-weight: bold;
      font-size: 2.5em;
      letter-spacing: 0.1em;
      text-align: center;
    }

    &_btns {
      height: 50px;
      min-width: 120px;
      line-height: 50px;
      margin: 10px 0;
      display: flex;
      justify-content: space-around;
      align-items: center;

      button {
        @include fasIcon(30px);
        background: $color1;
        color: $color2;
        border: 1px solid $color2;
        box-shadow: 0 0 1px 1px $color3;
        &.openedBtn {
          background: $color3;
          box-shadow: 0 0 1px 1px $color3 inset;
        }
      }

      .bagBtn {
        transition: all 0.3s linear;
        &.gotDrops {
          background: $color5;
          .fas {
            color: #ffff00;
          }
        }
      }
    }

    #allItemPath {
      display: none;
      height: fit-content;
      background: #fff;
      min-width: 35px;
      max-height: 50%;
      text-align: right;
      border-radius: 5px;
      border: 1px solid $color3;
      box-sizing: border-box;

      overflow-y: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }

      &.active {
        @include active();
        left: 50%;
        margin-left: -180px;
        z-index: 11;
      }

      .tabName {
        height: 30px;
        line-height: 30px;
        text-align: left;
        border-bottom: 1px solid $color3;
        box-sizing: border-box;
        text-indent: 5px;
        .rePathFinderBtn {
          @include fasIcon(30px);
        }
      }

      .itemPaths {
        height: fit-content;
        ul {
          li {
            height: 30px;
            line-height: 30px;
          }
        }
      }
    }
  }
</style>

