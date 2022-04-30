<template>
  <div
    :class="`totalPathFinderModal ${
      toggleModal.totalPathFinder ? 'active' : ''
    }`"
  >
    <div class="tabName">
      <h3>{{ $t("modal.recommendRoute") }}</h3>
      <div class="buttonBox">
        <button class="findRecommendPathBtn" @click="findRecommendPath">
          <i class="fas fa-map-marked-alt"></i>
        </button>
        <button @click="toggleTotalPathFindertModal">
          <span>
            <i class="fas fa-times"></i>
          </span>
        </button>
      </div>
    </div>
    <div class="routesInfo">
      <ul
        class="routes"
        v-if="totalRecommendRoutes.length > 0 && !error.message"
      >
        <li
          class="route"
          v-for="(route, index) in totalRecommendRoutes"
          :key="`totalRoute${index}`"
          :data-route-index="index"
        >
          <button class="routeButton" @click="setCustomRoute">
            <span class="routeButton_index">
              {{ `(${index + 1}) ` }}
            </span>
            <span
              v-for="(area, areaIndex) in route"
              :key="route + areaIndex"
              class="routeButton_area"
            >
              {{ area[language] }}
            </span>
          </button>
        </li>
      </ul>
      <div class="noRoutes" v-if="error.message">
        {{
          error.items
            ? $t(`noti.${error.message}`, { items: error.items })
            : $t(`noti.${error.message}`)
        }}
      </div>
    </div>
  </div>
</template>

<script>
  import { areaData } from "~/utils/itemTable.js";

  export default {
    data() {
      return {
        error: { message: "" },
      };
    },
    components: {},
    computed: {
      language() {
        return this.$store.state.language;
      },
      toggleModal() {
        return this.$store.state.toggleModal;
      },
      dropMats() {
        return this.$store.state.matGDs.dropMatObj;
      },
      totalRecommendRoutes() {
        return this.$store.state.totalRecommendRoutes;
      },
      areaName2Id() {
        const areaInfo = {};
        Object.entries(areaData).forEach(([id, data]) => {
          areaInfo[data.name] = id;
        });
        return areaInfo;
      },
    },
    methods: {
      toggleTotalPathFindertModal() {
        this.$store.dispatch("onToggleModal", "totalPathFinder");
      },
      findRecommendPath() {
        const needDropsInfo = {
          needDrops: this.dropMats,
          total: true,
        };
        try {
          this.$store.dispatch("findRecommendPath", needDropsInfo);
        } catch (e) {
          this.error = e;
        }
      },
      setCustomRoute(e) {
        const target =
          this.totalRecommendRoutes[e.target.closest("li").dataset.routeIndex];
        const newRoute = target.map((area) => this.areaName2Id[area]);
        if (window.confirm(this.$t("not.applyRoute")))
          this.$store.dispatch("setRoute", newRoute);
      },
    },
  };
</script>

<style lang="scss" scoped>
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
      z-index: 11;
    }

    .tabName {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      border-bottom: 1px solid #000;

      h3 {
        width: fit-content;
      }
      .buttonBox {
        width: 100%;
        display: flex;
        justify-content: space-between;
        button {
          background: none;
          border-radius: 5px;
          width: fit-content;
          padding: 0;

          .fas {
            color: $color3;
            @include fasIcon(30px);
          }
          &:hover,
          &.active {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
          }
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

          .routeButton {
            background: none;
            border-radius: 5px;

            &:hover,
            &:active {
              box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
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
      }
      .noRoutes {
        padding: 5px;
        white-space: pre-line;
      }
    }
  }
</style>
