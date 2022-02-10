<template>
  <div :class="`mapModal ${toggleModal.map ? 'active' : 'hide'}`">
    <div class="tabName">
      <h3>지도</h3>
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
            <text x="22" y="16">하이퍼루프</text>
          </g>
          <g>
            <circle class="lifeTree" cx="10" cy="26" r="4" />
            <text x="22" y="32">생명의 나무</text>
          </g>
          <g>
            <circle class="alphaOmega" cx="10" cy="42" r="4" />
            <text x="22" y="48">알파, 오메가</text>
          </g>
        </svg>
      </div>
      <div class="mapBox">
        <svg class="area a001">
          <g>
            <polygon points="0,0 48,0 48,48 0,48" />
            <text class="areaName" x="10" y="5">연구소</text>
          </g>
        </svg>
        <svg class="area a002" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A002') && 'selected'"
              points="0,0 72,0 72,24 96,24 96,96 72,96 72,48 0,48"
            />
            <circle class="hyperloop" cx="15" cy="10" r="4" />
            <circle class="alphaOmega" cx="90" cy="60" r="4" />
            <text class="areaName" x="25" y="-10">골목길</text>
          </g>
        </svg>
        <svg class="area a003" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A003') && 'selected'"
              points="48,0 120,0 120,72 24,72 24,48 0,48 0,24 48,24"
            />
            <circle class="hyperloop" cx="90" cy="50" r="4" />
            <text class="areaName" x="60" y="-40">번화가</text>
          </g>
        </svg>
        <svg class="area a004" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A004') && 'selected'"
              points="24,0 48,0 48,72 0,72 0,24 24,24"
            />
            <circle class="hyperloop" cx="40" cy="10" r="4" />
            <text class="areaName" x="40" y="25">절</text>
          </g>
        </svg>
        <svg class="area a005" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A005') && 'selected'"
              points="0,0 72,0 72,72 0,72"
            />
            <text class="areaName" x="30" y="5">연못</text>
          </g>
        </svg>
        <svg class="area a006" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A006') && 'selected'"
              points="0,0 72,0 72,48 0,48"
            />
            <circle class="hyperloop" cx="65" cy="22" r="4" />
            <circle class="lifeTree" cx="65" cy="10" r="4" />
            <text class="areaName" x="25" y="-5">병원</text>
          </g>
        </svg>
        <svg class="area a007" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A007') && 'selected'"
              points="0,0 48,0 48,96 0,96"
            />
            <circle class="lifeTree" cx="20" cy="25" r="4" />
            <text class="areaName" x="35" y="25">묘지</text>
          </g>
        </svg>
        <svg class="area a008" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A008') && 'selected'"
              points="0,0 96,0 96,48 24,48 24,24 0,24"
            />
            <circle class="hyperloop" cx="70" cy="35" r="4" />
            <circle class="alphaOmega" cx="85" cy="20" r="4" />
            <text class="areaName" x="35" y="-15">공장</text>
          </g>
        </svg>
        <svg class="area a009" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A009') && 'selected'"
              points="0,0 48,0 48,72 0,72"
            />
            <circle class="hyperloop" cx="40" cy="30" r="4" />
            <text class="areaName" x="25" y="15">성당</text>
          </g>
        </svg>
        <svg class="area a010" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A010') && 'selected'"
              points="0,0 48,0 48,48 72,48 72,72 24,72 24,48 0,48"
            />
            <circle class="alphaOmega" cx="15" cy="40" r="4" />
            <text class="areaName" x="20" y="5">항구</text>
          </g>
        </svg>
        <svg class="area a011" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A011') && 'selected'"
              points="0,0 48,0 48,72 0,72"
            />
            <circle class="hyperloop" cx="18" cy="13" r="4" />
            <circle class="alphaOmega" cx="12" cy="5" r="4" />
            <text class="areaName" x="25" y="5">고급</text>
            <text class="areaName" x="20" y="20">주택가</text>
          </g>
        </svg>
        <svg class="area a012" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A012') && 'selected'"
              points="0,0 72,0 72,24 48,24, 48, 96, 0, 96"
            />
            <circle class="lifeTree" cx="20" cy="65" r="4" />
            <text class="areaName" x="40" y="20">숲</text>
          </g>
        </svg>
        <svg class="area a013" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A013') && 'selected'"
              points="0,0 48,0 48,72 0,72"
            />
            <circle class="alphaOmega" cx="38" cy="30" r="4" />
            <text class="areaName" x="10" y="8">모래</text>
            <text class="areaName" x="35" y="25">사장</text>
          </g>
        </svg>
        <svg class="area a014" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A014') && 'selected'"
              points="0,0 72,0 72,72 24,72 24,48 0,48"
            />
            <circle class="hyperloop" cx="30" cy="10" r="4" />
            <circle class="lifeTree" cx="40" cy="55" r="4" />
            <circle class="alphaOmega" cx="60" cy="40" r="4" />
            <text class="areaName" x="30" y="5">호텔</text>
          </g>
        </svg>
        <svg class="area a015" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A015') && 'selected'"
              points="0,0 72,0 72,48 0,48"
            />
            <text class="areaName" x="25" y="0">학교</text>
          </g>
        </svg>
        <svg class="area a016" @click="setRoute">
          <g>
            <polygon
              :class="customRoute.includes('A016') && 'selected'"
              points="0,0 72,0 72,24 0,24"
            />
            <circle class="alphaOmega" cx="7" cy="9" r="4" />
            <text class="areaName" x="15" y="18">양궁장</text>
          </g>
        </svg>
        <svg class="routeLine">
          <g>
            <polyline
              :points="
                customRoute
                  .map(
                    (route) => `${routePoint[route].x},${routePoint[route].y}`
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
    },
    methods: {
      toggleMapModal() {
        this.$store.dispatch("onToggleModal", "map");
      },
      setRoute(e) {
        const pickedArea = e.target.closest("svg").classList[1].toUpperCase();
        if (this.customRoute.includes(pickedArea)) {
          const newRoute = this.customRoute.filter((area) => area !== pickedArea);
          this.$store.dispatch("removeRoute", newRoute);
        } else {
          this.$store.dispatch("addRoute", pickedArea);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @mixin mapObjIcon() {
    stroke-width: 2;

    &.hyperloop {
      fill: #1b38db;
      stroke: #63edff;
    }

    &.lifeTree {
      fill: #f33f3f;
      stroke: #0ea00e;
    }

    &.alphaOmega {
      fill: #535353;
      stroke: #ec44fc;
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
            top: 96px;
            left: 96px;
          }

          &.a002 {
            @include mapUnit(4, 4);
            top: 0px;
            left: 168px;
            z-index: 16;
          }

          &.a003 {
            @include mapUnit(5, 3);
            top: 48px;
            left: 120px;
            z-index: 17;
          }

          &.a004 {
            @include mapUnit(2, 4);
            top: 96px;
            left: 216px;
            z-index: 16;
          }

          &.a005 {
            @include mapUnit(3, 3);
            top: 120px;
            left: 144px;
          }

          &.a006 {
            @include mapUnit(3, 2);
            top: 192px;
            left: 144px;
          }

          &.a007 {
            @include mapUnit(2, 4);
            top: 144px;
            left: 96px;
          }

          &.a008 {
            @include mapUnit(4, 2);
            top: 240px;
            left: 72px;
          }

          &.a009 {
            @include mapUnit(2, 3);
            top: 168px;
            left: 48px;
          }

          &.a010 {
            @include mapUnit(3, 3);
            top: 192px;
            left: 0px;
            z-index: 16;
          }

          &.a011 {
            @include mapUnit(2, 3);
            top: 120px;
            left: 0px;
          }

          &.a012 {
            @include mapUnit(3, 4);
            top: 72px;
            left: 48px;
            z-index: 16;
          }

          &.a013 {
            @include mapUnit(2, 3);
            top: 48px;
            left: 0px;
          }

          &.a014 {
            @include mapUnit(3, 3);
            top: 0px;
            left: 24px;
            z-index: 16;
          }

          &.a015 {
            @include mapUnit(3, 2);
            top: 24px;
            left: 96px;
          }

          &.a016 {
            @include mapUnit(3, 1);
            top: 0px;
            left: 96px;
            g > .areaName {
              transform: rotate(0);
            }
          }
        }
      }
    }
  }
</style>
