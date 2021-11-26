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
        data-modal="bag"
      >
        <i class="fas fa-suitcase"></i>
      </button>
      <button
        :class="`totalPathFinderBtn ${
          toggleModal.totalPathFinder ? 'openedBtn' : ''
        }`"
        @click="onToggleModal"
        data-modal="totalPathFinder"
      >
        <i class="fas fa-map-marked-alt"></i>
      </button>
    </div>

    <Bag></Bag>
    <div
      :class="`totalPathFinderModal ${
        toggleModal.totalPathFinder ? 'active' : ''
      }`"
    >
      <div class="tabName">
        추천 루트
        <button class="pathFinderBtn" @click="pathFinder">
          <i class="fas fa-map-marked-alt"></i>
        </button>
      </div>
      <div class="routesInfo">
        <ul class="routes" v-if="totalRecommendRoutes.length > 0">
          <li
            class="route"
            v-for="(route, index) in totalRecommendRoutes"
            :key="`totalRoute${index}`"
          >
            <span class="route_index">
              {{ `(${index + 1}) ` }}
            </span>
            <span
              v-for="(area, areaIndex) in route"
              :key="route + areaIndex"
              class="route_area"
            >
              {{ area }}
            </span>
          </li>
        </ul>
        <div class="noRoutes" v-else>No Short Routes</div>
      </div>
    </div>
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
      dropMats() {
        return this.$store.state.matGDs.dropMatArr.map((mat) => mat.id);
      },
      totalRecommendRoutes() {
        return this.$store.state.totalRecommendRoutes;
      },
    },
    methods: {
      onToggleModal(e) {
        this.$store.dispatch(
          "onToggleModal",
          e.target.closest("button").dataset.modal
        );
      },
      pathFinder() {
        const needDropsInfo = {
          needDrops: this.dropMats,
          total: true,
        };
        this.$store.dispatch("pathFinder", needDropsInfo);
        console.log(this.$store.state);
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
        &.openedBtn {
          box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
        }
        &:hover {
          box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
        }
      }

      .bagBtn {
        transition: background-color 0.3s linear;
        &.gotDrops {
          background: $color5;
          .fas {
            color: #ffff00;
          }
        }
      }
    }

    .totalPathFinderModal {
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
        left: calc(50% - 180px);
        z-index: 11;
      }

      .tabName {
        height: 30px;
        line-height: 30px;
        text-align: left;
        border-bottom: 1px solid $color3;
        box-sizing: border-box;
        text-indent: 5px;
        .pathFinderBtn {
          background: none;
          @include fasIcon(30px);
          &:hover {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
          }
        }
      }

      .routesInfo {
        height: fit-content;
        .routes {
          padding: 5px;
          .route {
            width: fit-content;
            word-break: keep-all;
            text-align: start;
            margin: 3px 0;
            &_index {
            }
            &_area {
              padding: 3px;
              &::after {
                content: "-";
                margin: 0 3px;
              }
              &:last-child {
                &::after {
                  content: none;
                  margin: 0;
                }
              }
            }
          }
        }
        .noRoutes {
          padding: 5px;
        }
      }
    }
  }
</style>

