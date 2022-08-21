<template>
  <div
    :class="`totalPathFinderModal ${
      modal.totalPathFinder.show ? 'active' : ''
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
      <div class="initialMessgae">
        <span><i class="fas fa-map-marked-alt"></i></span>
        <span>{{ $t("modal.recommendFuncInfo") }}</span>
      </div>
      <div
        class="routes"
        v-if="
          isActivatedTotalPathFinder &&
          totalRecommendRoutes.length > 0 &&
          !error.message
        "
      >
        <h4 class="routesResult">
          {{
            $t("modal.recommendRouteResult", {
              routes: totalRecommendRoutes.length,
            })
          }}
        </h4>
        <ul>
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
                {{ area.name[language] }}
              </span>
            </button>
          </li>
        </ul>
      </div>
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
  import ampl from "~/utils/amplitude.js";

  export default {
    data() {
      return {
        error: { message: "" },
        isActivated: false,
      };
    },
    components: {},
    computed: {
      language() {
        return this.$store.state.language;
      },
      modal() {
        return this.$store.state.modal;
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
      isActivatedTotalPathFinder() {
        return this.$store.state.isActivatedTotalPathFinder;
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

        if (window.confirm(this.$t("noti.applyRoute"))) {
          ampl.log("set recommend route", { tab: "TOTAL", target });

          this.$store.dispatch("setRoute", target);
        }
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
    max-height: 50vh;
    text-align: right;
    border-radius: 5px;
    border: 1px solid $color3;
    box-sizing: border-box;
    position: relative;
    padding-top: 50px;
    padding-bottom: 30px;

    &.active {
      @include active();
      z-index: inherit;
    }

    .tabName {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      border-bottom: 1px solid #000;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 10px 0;

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
      max-height: calc(50vh - 80px);
      padding: 10px 5px;
      overflow-y: scroll;

      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }

      .initialMessgae {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 4px;
        .fas {
          color: $color3;
        }
      }

      .routesResult {
        text-align: initial;
      }
      .routes {
        padding: 5px;
        display: flex;
        flex-direction: column;
        gap: 5px;

        .routesResult {
          font-weight: 700;
        }

        > ul {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .route {
          min-width: 100%;
          width: fit-content;
          word-break: keep-all;
          text-align: start;
          margin: 3px 0;
          border-bottom: 1px solid $color3;
          border-right: 1px solid $color3;
          border-bottom-right-radius: 8px;

          .routeButton {
            background: none;
            border-bottom-right-radius: 8px;
            padding: 4px 0;
            width: 100%;
            text-align: start;

            &:hover,
            &:active {
              box-shadow: -3px -3px 8px 0px inset rgba(0, 0, 0, 0.2);
            }
            &_area {
              padding: 4px;
              &::after {
                content: "→";
                margin-left: 4px;
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
