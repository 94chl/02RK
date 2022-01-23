<template>
  <div class="area">
    <div class="tabName">
      <h3>지역</h3>
      <div class="buttonBox">
        <button class="mapModalButton" @click="toggleMapModal">
          <i class="fas fa-map"></i>
        </button>
      </div>
    </div>
    <div>
      <ul class="areaList">
        <li v-for="area in areaIds" :key="area" :data-areaid="area">
          <div>
            <button class="areaBtn" @click="setRoute">
              <span v-if="customRoute.includes(area)" class="pickedArea">
                {{ customRoute.indexOf(area) + 1 }}
              </span>
              <span class="areaName">{{ areaInfo[area].name }}</span>
              <div class="areaInfoIcon">
                <span v-if="areaInfo[area].resurrection" class="resurrection">
                  <i class="fas fa-cross"></i>
                </span>
                <span v-if="areaInfo[area].hyperloop" class="hyperloop">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <button
                  @click="toggleArea"
                  :class="`toggleDropsBtn ${
                    !areaInfo[area].show ? '' : 'closed'
                  }`"
                >
                  <i class="fas fa-angle-double-down"></i>
                  <i class="fas fa-angle-double-up"></i>
                </button>
              </div>
            </button>
          </div>
          <div class="areaNeedDrops">
            <ul>
              <li
                v-for="drop in areaInfo[area].drop"
                :key="`${area}${drop.id}`"
                :class="`${
                  !dropMats.dropMatObj[drop.id] && !areaInfo[area].show
                    ? 'hide'
                    : dropMats.dropMatObj[drop.id]
                    ? 'neededDrops'
                    : 'noNeededDrops'
                }`"
                :data-itemid="drop.id"
              >
                <button class="getDropBtn" @click="getItem">
                  {{ drop.name }}
                </button>
                <span v-if="dropMats.dropMatObj[drop.id]">
                  {{
                    dropMats.dropMatObj[drop.id] &&
                    `(x${dropMats.dropMatObj[drop.id]})`
                  }}
                </span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { areaData, searchById } from "~/utils/itemTable.js";
  export default {
    data() {
      return {
        areaIds: [],
        areaInfo: areaData,
      };
    },
    created() {
      const keys = Object.keys(areaData);
      this.areaIds = keys.slice(2).concat(keys[0]);

      const newAreaData = JSON.parse(JSON.stringify(areaData));
      this.areaIds.forEach((areaId) => {
        newAreaData[areaId].drop = areaData[areaId].drop.map((dropId) =>
          searchById(dropId)
        );
        newAreaData[areaId].show = false;
      });

      this.areaInfo = newAreaData;
    },
    components: {},
    computed: {
      dropMats() {
        return this.$store.state.matGDs;
      },
      customRoute() {
        return this.$store.state.customRoute;
      },
    },
    methods: {
      toggleArea(e) {
        this.areaInfo[e.target.closest("li").dataset.areaid].show =
          !this.areaInfo[e.target.closest("li").dataset.areaid].show;
      },
      setRoute(e) {
        const pickedArea = e.target.closest("li").dataset.areaid;
        if (
          pickedArea === "A000" ||
          e.target.closest("button").className.includes("toggleDropsBtn")
        )
          return;
        if (this.customRoute.includes(pickedArea)) {
          const newRoute = this.customRoute.filter((area) => area !== pickedArea);
          this.$store.dispatch("removeRoute", newRoute);
        } else {
          this.$store.dispatch("addRoute", pickedArea);
        }
      },
      getItem(e) {
        this.$store.dispatch("getItem", e.target.closest("li").dataset.itemid);
        this.$store.dispatch("updateAssemblable");
        document.querySelector(".bagBtn").classList.toggle("gotDrops");
        setTimeout(
          () => document.querySelector(".bagBtn").classList.toggle("gotDrops"),
          1000
        );
      },
      toggleMapModal() {
        this.$store.dispatch("onToggleModal", "map");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .area {
    position: relative;

    .tabName {
      display: flex;
      .buttonBox {
        display: flex;
        button {
          background: none;
          border-radius: 5px;
          width: fit-content;
          padding: 0;

          .fas {
            color: $color3;
            @include fasIcon(30px);
          }
          &:hover {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
          }
        }
      }
    }

    .areaList {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 5px;
      > li {
        position: relative;
        border-radius: 5px;
        min-height: 50px;

        &:last-child .areaBtn {
          cursor: default;
        }

        .areaBtn {
          background: #fff;
          width: 100%;
          display: flex;
          height: 25px;
          line-height: 25px;
          align-items: center;
          position: relative;

          .pickedArea {
            color: #fff;
            background: $color3;
            border-radius: 50%;
            width: 15px;
            height: 15px;
            line-height: 15px;
          }

          .areaInfoIcon {
            position: absolute;
            top: 0;
            right: 0;
            .resurrection {
              @include fasIcon(25px);
              color: rgb(60, 202, 190);
              background: #fff;
            }
            .hyperloop {
              @include fasIcon(25px);
              color: rgb(31, 119, 252);
              background: #fff;
            }
            .toggleDropsBtn {
              background: #fff;
              border-radius: 0;
              align-self: flex-end;
              @include fasIcon(25px);

              &:hover {
                box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
              }
              .fa-angle-double-down {
                display: block;
              }
              .fa-angle-double-up {
                display: none;
              }
              &.closed {
                .fa-angle-double-down {
                  display: none;
                }
                .fa-angle-double-up {
                  display: block;
                }
              }
            }
          }
        }

        .areaNeedDrops {
          border-top: 1px solid $color1;
          background: #fff;
          ul {
            li {
              overflow: hidden;
              .getDropBtn {
                padding: 5px;
                background: none;
                border-radius: 5px;
                &:active {
                  box-shadow: 0px 0px 2px 1px #999 inset;
                }
                &:hover {
                  box-shadow: 0px 0px 2px 1px #999 inset;
                  margin-left: 1px;
                }
              }
              &.neededDrops {
                .getDropBtn {
                  font-weight: 700;
                  color: red;
                }
                span {
                  font-size: 0.8em;
                }
              }
              &.noNeededDrops {
                .getDropBtn {
                  color: #999;
                }
              }
            }
          }
        }

        &:last-child {
          grid-column: 1/4;
          .toggleDropsBtn {
            position: absolute;
            top: 0;
            right: 5px;
            @include fasIcon(25px);
            .fa-angle-double-down {
              display: block;
            }
            .fa-angle-double-up {
              display: none;
            }
            &.closed {
              .fa-angle-double-down {
                display: none;
              }
              .fa-angle-double-up {
                display: block;
              }
            }
          }
          .areaNeedDrops {
            ul {
              display: grid;
              gap: 0 10px;
              grid-template-columns: repeat(3, 1fr);
            }
          }
        }
      }
    }
  }
</style>
