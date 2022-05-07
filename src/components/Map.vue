<template>
  <div :class="`mapModal ${toggleModal.map ? 'active' : 'hide'}`">
    <div class="tabName">
      <h3>{{ $t("modal.map") }}</h3>
      <div class="buttonBox">
        <button @click="toggleMapModal">
          <span>
            <i class="fas fa-times"></i>
          </span>
        </button>
      </div>
    </div>
    <div class="map">
      <div class="mapGuideBox">
        <svg class="area a002" @click="setRoute">
          <g>
            <circle class="hyperloop" cx="10" cy="10" r="4" />
            <text x="20" y="15">{{ $t("mapModal.hyperLoop") }}</text>
          </g>
          <g>
            <circle class="lifeTree" cx="10" cy="26" r="4" />
            <text x="20" y="31">{{ $t("mapModal.lifeTree") }}</text>
          </g>
          <g>
            <circle class="meteor" cx="10" cy="42" r="4" />
            <text x="20" y="47">{{ $t("mapModal.meteor") }}</text>
          </g>
          <g>
            <circle class="alphaOmega" cx="10" cy="58" r="4" />
            <text x="20" y="63">{{ $t("mapModal.alphaOmega") }}</text>
          </g>
        </svg>
      </div>
      <div class="mapBox">
        <svg class="area a001">
          <g>
            <polygon points="0,0 48,0 48,48 0,48" />
            <text class="areaName" x="10" y="5">
              {{ $t("mapModal.research") }}
            </text>
          </g>
        </svg>
        <svg class="area a002" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A002') &&
                `selected ${customRoute[0] === 'A002' && 'startPoint'}`
              "
              points="0,0 72,0 72,24 96,24 96,96 72,96 72,48 0,48"
            />
            <circle class="hyperloop" cx="15" cy="10" r="4" />
            <circle class="meteor" cx="15" cy="30" r="4" />
            <circle class="alphaOmega" cx="90" cy="60" r="4" />
            <text class="areaName" x="25" y="-10">
              {{ $t("mapModal.alley") }}
            </text>
          </g>
        </svg>
        <svg class="area a003" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A003') &&
                `selected ${customRoute[0] === 'A003' && 'startPoint'}`
              "
              points="48,0 120,0 120,72 24,72 24,48 0,48 0,24 48,24"
            />
            <circle class="hyperloop" cx="90" cy="50" r="4" />
            <text class="areaName" x="60" y="-40">
              {{ $t("mapModal.avenue") }}
            </text>
          </g>
        </svg>
        <svg class="area a004" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A004') &&
                `selected ${customRoute[0] === 'A004' && 'startPoint'}`
              "
              points="24,0 48,0 48,96 0,96 0,24 24,24"
            />
            <circle class="hyperloop" cx="40" cy="10" r="4" />
            <circle class="meteor" cx="15" cy="75" r="4" />
            <text class="areaName" x="40" y="25">
              {{ $t("mapModal.temple") }}
            </text>
          </g>
        </svg>
        <svg class="area a005" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A005') &&
                `selected ${customRoute[0] === 'A005' && 'startPoint'}`
              "
              points="0,0 72,0 72,72 0,72"
            />
            <circle class="meteor" cx="50" cy="15" r="4" />
            <text class="areaName" x="30" y="5">{{ $t("mapModal.pond") }}</text>
          </g>
        </svg>
        <svg class="area a006" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A006') &&
                `selected ${customRoute[0] === 'A006' && 'startPoint'}`
              "
              points="0,0 72,0 72,48 0,48"
            />
            <circle class="hyperloop" cx="65" cy="22" r="4" />
            <circle class="lifeTree" cx="65" cy="10" r="4" />
            <circle class="alphaOmega" cx="45" cy="15" r="4" />
            <text class="areaName" x="25" y="0">
              {{ $t("mapModal.hospital") }}
            </text>
          </g>
        </svg>
        <svg class="area a007" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A007') &&
                `selected ${customRoute[0] === 'A007' && 'startPoint'}`
              "
              points="0,0 48,0 48,96 0,96"
            />
            <circle class="lifeTree" cx="20" cy="25" r="4" />
            <text class="areaName" x="35" y="25">
              {{ $t("mapModal.cemetery") }}
            </text>
          </g>
        </svg>
        <svg class="area a008" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A008') &&
                `selected ${customRoute[0] === 'A008' && 'startPoint'}`
              "
              points="0,0 96,0 96,48 24,48 24,24 0,24"
            />
            <circle class="hyperloop" cx="70" cy="35" r="4" />
            <circle class="meteor" cx="75" cy="15" r="4" />
            <circle class="alphaOmega" cx="85" cy="20" r="4" />
            <text class="areaName" x="35" y="-15">
              {{ $t("mapModal.factory") }}
            </text>
          </g>
        </svg>
        <svg class="area a009" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A009') &&
                `selected ${customRoute[0] === 'A009' && 'startPoint'}`
              "
              points="0,0 48,0 48,72 0,72"
            />
            <circle class="hyperloop" cx="40" cy="30" r="4" />
            <circle class="meteor" cx="10" cy="60" r="4" />
            <text class="areaName" x="25" y="15">
              {{ $t("mapModal.chapel") }}
            </text>
          </g>
        </svg>
        <svg class="area a010" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A010') &&
                `selected ${customRoute[0] === 'A010' && 'startPoint'}`
              "
              points="0,0 48,0 48,48 72,48 72,72 24,72 24,48 0,48"
            />
            <circle class="alphaOmega" cx="15" cy="40" r="4" />
            <text class="areaName" x="30" y="10">
              {{ $t("mapModal.dock") }}
            </text>
          </g>
        </svg>
        <svg class="area a011" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A011') &&
                `selected ${customRoute[0] === 'A011' && 'startPoint'}`
              "
              points="0,0 48,0 48,72 0,72"
            />
            <circle class="hyperloop" cx="18" cy="13" r="4" />
            <circle class="meteor" cx="10" cy="60" r="4" />
            <circle class="alphaOmega" cx="12" cy="5" r="4" />
            <text class="areaName" x="0" y="-25">
              {{ $t("mapModal.uptown") }}
            </text>
          </g>
        </svg>
        <svg class="area a012" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A012') &&
                `selected ${customRoute[0] === 'A012' && 'startPoint'}`
              "
              points="0,0 72,0 72,24 48,24, 48, 96, 0, 96"
            />
            <circle class="lifeTree" cx="20" cy="65" r="4" />
            <text class="areaName" x="40" y="20">
              {{ $t("mapModal.forest") }}
            </text>
          </g>
        </svg>
        <svg class="area a013" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A013') &&
                `selected ${customRoute[0] === 'A013' && 'startPoint'}`
              "
              points="0,0 48,0 48,72 0,72"
            />
            <circle class="alphaOmega" cx="38" cy="30" r="4" />
            <text class="areaName" x="5" y="-10">
              {{ $t("mapModal.beach") }}
            </text>
          </g>
        </svg>
        <svg class="area a014" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A014') &&
                `selected ${customRoute[0] === 'A014' && 'startPoint'}`
              "
              points="0,0 72,0 72,72 24,72 24,48 0,48"
            />
            <circle class="hyperloop" cx="30" cy="10" r="4" />
            <circle class="lifeTree" cx="40" cy="55" r="4" />
            <circle class="alphaOmega" cx="60" cy="40" r="4" />
            <text class="areaName" x="30" y="5">
              {{ $t("mapModal.hotel") }}
            </text>
          </g>
        </svg>
        <svg class="area a015" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A015') &&
                `selected ${customRoute[0] === 'A015' && 'startPoint'}`
              "
              points="0,0 72,0 72,48 0,48"
            />
            <circle class="meteor" cx="45" cy="15" r="4" />
            <text class="areaName" x="25" y="0">
              {{ $t("mapModal.school") }}
            </text>
          </g>
        </svg>
        <svg class="area a016" @click="setRoute">
          <g>
            <polygon
              :class="
                customRouteId.includes('A016') &&
                `selected ${customRoute[0] === 'A016' && 'startPoint'}`
              "
              points="0,0 72,0 72,24 0,24"
            />
            <circle class="alphaOmega" cx="7" cy="9" r="4" />
            <text class="areaName" x="15" y="18">
              {{ $t("mapModal.archery") }}
            </text>
          </g>
        </svg>
        <svg class="routeLine">
          <g>
            <polyline
              :points="
                customRoute
                  .map(
                    (route) =>
                      `${routePoint[route.id].x},${routePoint[route.id].y}`
                  )
                  .join(' ')
              "
            ></polyline>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  import { areaData } from "~/utils/itemTable.js";

  export default {
    data() {
      return {
        routePoint: {
          A002: {
            x: 220,
            y: 10,
          },
          A003: {
            x: 210,
            y: 70,
          },
          A004: {
            x: 240,
            y: 140,
          },
          A005: {
            x: 180,
            y: 150,
          },
          A006: {
            x: 180,
            y: 220,
          },
          A007: {
            x: 120,
            y: 200,
          },
          A008: {
            x: 140,
            y: 260,
          },
          A009: {
            x: 70,
            y: 200,
          },
          A010: {
            x: 20,
            y: 220,
          },
          A011: {
            x: 20,
            y: 160,
          },
          A012: {
            x: 80,
            y: 120,
          },
          A013: {
            x: 20,
            y: 80,
          },
          A014: {
            x: 60,
            y: 40,
          },
          A015: {
            x: 140,
            y: 35,
          },
          A016: {
            x: 130,
            y: 10,
          },
        },
      };
    },
    components: {},
    computed: {
      toggleModal() {
        return this.$store.state.toggleModal;
      },
      customRoute() {
        return this.$store.state.customRoute;
      },
      customRouteId() {
        const customRouteId = this.$store.state.customRoute.map(
          (routeInfo) => routeInfo.id
        );
        return customRouteId;
      },
    },
    methods: {
      toggleMapModal() {
        this.$store.dispatch("onToggleModal", "map");
      },
      setRoute(e) {
        const pickedAreaId = e.target.closest("svg").classList[1].toUpperCase();
        const pickedArea = {
          id: pickedAreaId,
          name: areaData[pickedAreaId].name,
        };

        const isIncluded = this.customRoute.filter(
          (route) => route.id === pickedAreaId
        );
        if (isIncluded.length) {
          const newRoute = this.customRoute.filter(
            (area) => area !== pickedAreaId
          );
          this.$store.dispatch("setRoute", newRoute);
        } else {
          this.$store.dispatch("addRoute", pickedArea);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @mixin mapObjIcon() {
    &.hyperloop {
      fill: #63edff;
    }

    &.lifeTree {
      fill: #0ea00e;
    }

    &.meteor {
      fill: #3236ff;
    }

    &.alphaOmega {
      fill: #ff38de;
    }
  }

  @mixin mapUnit($width, $height) {
    width: 24px * $width;
    height: 24px * $height;
    overflow: visible;

    g {
      filter: contrast(70%);
      cursor: pointer;
      fill: rgba(153, 153, 153, 0.2);

      &:hover {
        filter: contrast(200%);
      }

      polygon {
        stroke: #000;
        &.selected {
          stroke: $color1;
          stroke-width: 4px;
        }

        &.startPoint {
          stroke: #ff5e00;
        }
      }

      circle {
        @include mapObjIcon();
      }

      .routeOrder {
        stroke: $color1;
        font-size: 0.8em;
        letter-spacing: -1px;
      }

      .areaName {
        fill: #000;
        user-select: none;
        transform: rotate(45deg);
      }
    }
  }

  .mapModal {
    position: fixed;
    top: 0;
    max-width: 720px;
    min-width: fit-content;
    width: 100%;
    z-index: 12;
    background: rgba(256, 256, 256, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid $color3;
    border-radius: 5px;
    box-sizing: border-box;

    &.hide {
      display: none;
    }

    .tabName {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      background: $color2;

      h3 {
        color: $color3;
        height: 25px;
        line-height: 25px;
      }

      .buttonBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 5px;
        button {
          background: none;
          color: $color3;
          border-radius: 5px;
          @include fasIcon(25px);
          margin-right: 5px;
          &:last-child {
            margin: 0;
          }
          &:hover {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.3);
          }
          &.selected {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.3);
          }
        }
      }
    }

    .map {
      min-width: 320px;
      min-height: 380px;
      position: relative;
      background: rgba(256, 256, 256);

      .mapGuideBox {
        position: absolute;
        top: 0;
        left: 0;

        g {
          circle {
            filter: contrast(70%);
            @include mapObjIcon;
          }

          text {
            font-size: 12px;
          }
        }
      }

      .mapBox {
        position: absolute;
        top: 36px;
        left: 48px;
        width: 300px;
        height: 300px;
        transform: rotate(-45deg);

        .routeLine {
          width: 100%;
          height: 100%;
          g {
            polyline {
              fill: transparent;
              stroke: orange;
              stroke-width: 5px;
              stroke-linecap: round;
              stroke-linejoin: round;
            }
          }
        }

        .area {
          position: absolute;
          z-index: 20;

          &.a001 {
            @include mapUnit(2, 2);
            top: 100px;
            left: 100px;
          }

          &.a002 {
            @include mapUnit(4, 4);
            top: 4px;
            left: 172px;
            z-index: 16;
          }

          &.a003 {
            @include mapUnit(5, 3);
            top: 52px;
            left: 124px;
            z-index: 17;
          }

          &.a004 {
            @include mapUnit(2, 4);
            top: 100px;
            left: 220px;
            z-index: 16;
          }

          &.a005 {
            @include mapUnit(3, 3);
            top: 124px;
            left: 148px;
          }

          &.a006 {
            @include mapUnit(3, 2);
            top: 196px;
            left: 148px;
          }

          &.a007 {
            @include mapUnit(2, 4);
            top: 148px;
            left: 100px;
          }

          &.a008 {
            @include mapUnit(4, 2);
            top: 244px;
            left: 76px;
          }

          &.a009 {
            @include mapUnit(2, 3);
            top: 172px;
            left: 52px;
          }

          &.a010 {
            @include mapUnit(3, 3);
            top: 196px;
            left: 4px;
            z-index: 16;
          }

          &.a011 {
            @include mapUnit(2, 3);
            top: 124px;
            left: 4px;
            g > .areaName {
              transform: rotate(90deg);
            }
          }

          &.a012 {
            @include mapUnit(3, 4);
            top: 76px;
            left: 52px;
            z-index: 16;
          }

          &.a013 {
            @include mapUnit(2, 3);
            top: 52px;
            left: 4px;
            g > .areaName {
              transform: rotate(90deg);
            }
          }

          &.a014 {
            @include mapUnit(3, 3);
            top: 4px;
            left: 28px;
            z-index: 16;
          }

          &.a015 {
            @include mapUnit(3, 2);
            top: 28px;
            left: 100px;
          }

          &.a016 {
            @include mapUnit(3, 1);
            top: 4px;
            left: 100px;
            g > .areaName {
              transform: rotate(0);
            }
          }
        }
      }
    }
  }
</style>
