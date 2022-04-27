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
        <li
          v-for="area in areaIds"
          :key="area"
          :data-areaid="area"
          :class="`area${area}`"
        >
          <div>
            <button class="areaBtn" @click="setRoute">
              <span class="areaName">{{ areaInfo[area].name[language] }}</span>
              <div class="areaInfoIcon">
                <span v-if="customRoute.includes(area)" class="pickedArea">
                  {{ customRoute.indexOf(area) + 1 }}
                </span>
                <span v-if="areaInfo[area].resurrection" class="resurrection">
                  <i class="fas fa-cross"></i>
                </span>
                <span v-if="areaInfo[area].hyperloop" class="hyperloop">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <button
                  v-if="area === 'A000'"
                  @click="toggleCommonDropsInfo"
                  class="toggleCommonDropsInfoBtn"
                >
                  <i class="fa-solid fa-circle-info"></i>
                </button>
              </div>
              <button
                @click="toggleArea"
                :class="`toggleDropsBtn ${
                  !areaInfo[area].show ? '' : 'closed'
                }`"
              >
                <i class="fas fa-angle-double-down"></i>
                <i class="fas fa-angle-double-up"></i>
              </button>
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
                  {{ drop.name[language] }}
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
          <div
            :class="`commonDropsInfoBox ${!commonDropsInfo && 'closed'}`"
            v-if="area === 'A000'"
          >
            <ul>
              <li>고기: 닭, 멧돼지, 늑대, 곰</li>
              <li>가죽: 닭, 들개, 늑대, 곰</li>
              <li>구급상자, VF 혈액샘플: 위클라인</li>
              <li>나뭇가지, 돌멩이: 채집</li>
              <li>카드모스의 부름: 에키온 패시브 스킬</li>
            </ul>
            <button type="button" @click="toggleCommonDropsInfo">
              <i class="fas fa-times"></i>
            </button>
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
        commonDropsInfo: false,
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
      language() {
        return this.$store.state.language;
      },
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
          this.$store.dispatch("setRoute", newRoute);
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
      toggleCommonDropsInfo() {
        this.commonDropsInfo = !this.commonDropsInfo;
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

        &.areaA000 {
          .areaBtn {
            cursor: default;

            .toggleCommonDropsInfoBtn {
              cursor: pointer;
              background: #fff;
              border-radius: 0;
              @include fasIcon(25px);
              color: $color1;

              &:hover {
                box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
              }

              &.closed {
                color: $color3;
              }
            }
          }
          .commonDropsInfoBox {
            position: absolute;
            top: 0;
            right: 25px;
            background: $color4;
            padding: 4px;
            border-radius: 5px;

            &.closed {
              display: none;
            }

            li {
              font-size: 14px;
              margin: 4px 0;
            }

            button {
              position: absolute;
              top: 5px;
              right: 5px;
              background: none;
              border-radius: 5px;
              &:active,
              &:hover {
                box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
              }
            }
          }
        }

        .areaBtn {
          background: #fff;
          width: 100%;
          display: grid;
          grid-template-columns: auto minmax(50px, 1fr) 25px;
          align-items: center;
          height: 25px;
          padding: 0;

          .areaName {
            text-align: start;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            height: 25px;
          }

          .areaInfoIcon {
            display: flex;
            align-items: center;

            span {
              @include fasIcon(25px);
              background: #fff;

              &.pickedArea {
                color: #fff;
                background: $color3;
                border-radius: 50%;
                width: 15px;
                height: 15px;
                margin: 5px;
                line-height: 15px;
              }
              &.resurrection {
                color: rgb(60, 202, 190);
              }

              &.hyperloop {
                color: rgb(31, 119, 252);
              }
            }
          }

          .toggleDropsBtn {
            position: absolute;
            top: 0;
            right: 0;
            background: #fff;
            border-radius: 0;
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
            background: #fff;
            border-radius: 0;
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
