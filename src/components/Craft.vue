<template>
  <div
    :class="`craft ${
      toggleModal.craft ? (minimize ? 'minimize' : 'active') : ''
    }`"
  >
    <div v-if="toggleModal.craft && minimize">
      <button @click="maximizeModal">
        <i class="fas fa-angle-double-down"></i>
      </button>
    </div>
    <div v-else-if="toggleModal.craft && !minimize">
      <div class="craft_select">
        <div class="tabName">
          <h3>{{ $t("modal.craft") }}</h3>
          <div class="buttonBox">
            <div>
              <button
                :class="`changeShowItemImgBtn ${showItemImg ? '' : 'selected'}`"
                @click="onChangeShowItemImg"
              >
                <span>
                  <i class="fas fa-font"></i>
                </span>
              </button>
              <button
                :class="`changeShowItemImgBtn ${showItemImg ? 'selected' : ''}`"
                @click="onChangeShowItemImg"
              >
                <span>
                  <i class="far fa-images"></i>
                </span>
              </button>
            </div>
            <button @click="toggleCraftModal">
              <span>
                <i class="fas fa-times"></i>
              </span>
            </button>
          </div>
        </div>
        <div class="selectBox">
          <div class="selectBox_dept">
            <button
              v-for="dept in deptArr"
              :data-dept="dept"
              :class="`deptButton ${
                dept === selectedOptions.dept && 'selected'
              }`"
              :key="`${dept}_craft`"
              @click="changeCraftDept"
            >
              {{ $t(`selectSection.${dept}`) }}
            </button>
          </div>

          <div class="selectBox_category">
            <select
              class="selectBox_category_select"
              @change="changeCraftCategory"
            >
              <option
                v-for="category in categoryArr"
                :value="category.category"
                :selected="category.category === selectedOptions.category"
                :key="`categoryArr${category.category}_craft`"
              >
                {{ category.nameInfo[language] }}
              </option>
            </select>
          </div>

          <div class="selectBox_grade">
            <select class="selectBox_grade_select" @change="changeGrade">
              <option value="W">{{ $t("common.gradeCommon") }}</option>
              <option value="G">{{ $t("common.gradeUncommon") }}</option>
              <option value="B">{{ $t("common.gradeRare") }}</option>
              <option value="P">{{ $t("common.gradeEpic") }}</option>
              <option value="Y">{{ $t("common.gradeLegend") }}</option>
            </select>
          </div>

          <div class="selectBox_searchItem">
            <button class="selectBox_searchItem_btn" @click="searchItem">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="craft_route">
        <h3 class="tabName">{{ $t("section.customRoute") }}</h3>
        <div class="routesBox">
          <div
            v-for="(area, index) in customRoute"
            :key="`route${index}`"
            class="area"
          >
            <div class="area_name">
              <div>{{ areaInfo[area.id].name[language] }}</div>
            </div>
            <div v-if="areaWithTargetItems[index]" class="area_items">
              <ul>
                <li
                  v-for="item in areaWithTargetItems[index].targetItems"
                  :key="`canMake${item.id}`"
                  :data-itemid="item.id"
                >
                  <button
                    :class="`showItemInfoBtn value${item.id[0]}`"
                    @click="showItemInfo"
                  >
                    <span :class="showItemImg ? 'hide' : ''">{{
                      item.name[language]
                    }}</span>
                    <img
                      :class="showItemImg ? '' : 'hide'"
                      :src="item.img"
                      :alt="`${item.name[language]}_img`"
                    />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    database,
    categoryName,
    areaData,
    searchById,
  } from "~/utils/itemTable";
  import { disassembleWD } from "~/utils/disassemble";
  import ampl from "~/utils/amplitude.js";

  export default {
    data() {
      return {
        minimize: false,
        deptArr: ["weapon", "equip", "item"],
        areaIds: [],
        areaInfo: areaData,
        areaWithTargetItems: [],
        selectedDept: "weapon",
        selectedCategory: "dagger",
        selectedGrade: "W",
        categoryArr: [],
        itemArr: [],
      };
    },
    components: {},
    computed: {
      language() {
        return this.$store.state.language;
      },
      selectedOptions() {
        return {
          dept: this.selectedDept,
          category: this.selectedCategory,
          grade: this.selectedGrade,
        };
      },
      toggleModal() {
        return this.$store.state.toggleModal;
      },
      showItemImg() {
        return this.$store.state.showItemImg;
      },
      customRoute() {
        return this.$store.state.customRoute;
      },
      bagDrops() {
        const bagEquip = Object.values(this.$store.state.bagEquip).reduce(
          (acc, cur) => {
            if (cur.id) acc.push(cur.id);
            return acc;
          },
          []
        );
        const bagInventory = Object.values(this.$store.state.bagInventory).reduce(
          (acc, cur) => {
            if (cur.id) acc.push(cur.id);
            return acc;
          },
          []
        );
        const bagDrops = Object.keys(
          disassembleWD(bagEquip.concat(bagInventory)).dropMatId
        ).reduce((acc, cur) => {
          if (!acc.includes(cur)) acc.push(cur);
          return acc;
        }, []);
        return bagDrops;
      },
      customRouteDrops() {
        const customRouteDrops = [
          {
            id: "A000",
            name: {
              kr: "공통",
              en: "common",
              ja: "共通",
              cn: "共通",
            },
          },
          ...this.$store.state.customRoute,
        ].reduce((acc, cur, index) => {
          const newDrops =
            index > 0
              ? areaData[cur.id].drop.filter(
                  (item) => !acc[acc.length - 1].drops.includes(item)
                )
              : areaData[cur.id].drop;
          acc.push({
            areaId: cur.id,
            name: cur.name,
            drops:
              index > 0 ? [...acc[acc.length - 1].drops, ...newDrops] : newDrops,
          });
          return acc;
        }, []);
        return customRouteDrops;
      },
      targetPool() {
        const selected = { ...this.selectedOptions };

        const targetPool = database[`${selected.dept}Data`]
          .filter((category) => category.category === selected.category)[0]
          .items.filter((item) => item.id[0] === selected.grade)
          .map((item) => {
            const thisDropMatInfo = disassembleWD([item.id]);
            // console.log(item.name);
            const itemInfo = JSON.parse(JSON.stringify(item));
            itemInfo.totalDrops = Object.keys(thisDropMatInfo.dropMatId);
            return itemInfo;
          });
        return targetPool;
      },
    },
    methods: {
      onChangeShowItemImg() {
        this.$store.dispatch("onChangeShowItemImg");
      },
      changeCraftDept(e) {
        this.selectedDept = e.target.closest("button").dataset.dept;
        this.categoryArr = database[`${this.selectedOptions.dept}Data`].map(
          (category) => ({
            ...category,
            nameInfo: categoryName[category.category],
          })
        );
        this.selectedCategory = this.categoryArr[0].category;
        this.itemArr = this.categoryArr.filter(
          (category) => category.category === this.selectedOptions.category
        )[0].items;
      },
      changeCraftCategory(e) {
        this.selectedCategory = e.target.value;
        this.itemArr = this.categoryArr.filter(
          (category) => category.category === this.selectedOptions.category
        )[0].items;
      },
      changeGrade(e) {
        this.selectedGrade = e.target.value;
      },
      searchItem() {
        let targetPool = JSON.parse(JSON.stringify(this.targetPool));
        const areaWithTargetItems = this.customRouteDrops
          .slice(1)
          .map((areaInfo) => {
            this.bagDrops.forEach((drop) => {
              if (!areaInfo.drops.includes(drop)) areaInfo.drops.push(drop);
            });
            areaInfo.targetItems = [];
            const remainTargetItems = [];

            targetPool.forEach((item) => {
              if (
                item.totalDrops.every((dropId) => areaInfo.drops.includes(dropId))
              ) {
                areaInfo.targetItems.push({
                  name: item.name,
                  id: item.id,
                  img: item.img,
                });
              } else {
                remainTargetItems.push(item);
              }
            });
            targetPool = remainTargetItems;

            return areaInfo;
          });
        this.areaWithTargetItems = areaWithTargetItems;
      },
      toggleCraftModal() {
        this.$store.dispatch("onToggleModal", "craft");
        this.minimize = this.$store.state.toggleModal.craft ? false : true;
      },
      showItemInfo(e) {
        const selectedItem = searchById(e.target.closest("li").dataset.itemid);
        ampl.log("select item", { tab: "CRAFT", ...selectedItem });

        this.$store.dispatch("setCart", selectedItem);
        this.minimize = true;
      },
      maximizeModal() {
        this.minimize = false;
      },
    },
    created() {
      const categories = database[`${this.selectedOptions.dept}Data`].map(
        (category) => ({
          ...category,
          nameInfo: categoryName[category.category],
        })
      );
      this.categoryArr = categories;

      const items = this.categoryArr.filter(
        (category) => category.category === this.selectedOptions.category
      )[0].items;
      this.itemArr = items;
    },
  };
</script>

<style lang="scss" scoped>
  .craft {
    transition: min-height 0.5s, max-height 0.5s;

    &.active {
      @include active();
      border-radius: 5px;
      border: 2px solid $color5;
      box-sizing: border-box;
      background: $color2;
      min-height: 300px;
      max-height: 100vh;
    }

    &.minimize {
      @include active();
      border-radius: 5px;
      border: 2px solid $color5;
      box-sizing: border-box;
      background: $color2;
      min-height: 30px;
      max-height: 30px;

      button {
        background: none;
        width: 100%;
        height: 100%;
      }
    }

    .tabName {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      h3 {
        color: $color3;
        height: 25px;
        line-height: 25px;
        margin: 5px 0;
        padding: 0 5px;
      }
      .buttonBox {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
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

    .selectBox {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      padding: 5px;
      overflow: visible;

      .tabName {
        grid-column: 1 / 4;
        text-indent: 0;
      }

      &_dept {
        grid-column: 1 / 4;
        height: 30px;
        display: flex;
        align-items: center;

        .deptButton {
          margin: 2.5px 5px;
          box-shadow: 0 0 1px 1px $color1;
          border-radius: 5px;
          padding: 5px 10px;
          background: none;
          cursor: pointer;

          &.selected {
            background: $color3;
            color: $color2;
            box-shadow: 0 0 1px 1px $color3 inset;
            border: 1px solid $color3;
          }
          &:hover {
            background: $color3;
            color: $color2;
          }
        }
      }

      &_category {
        height: 30px;
        &.hide {
          display: none;
        }

        &_select {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 5px;
        }
      }

      &_grade {
        height: 30px;
        &_select {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 5px;
        }
      }

      &_searchItem {
        height: 30px;
        border-radius: 5px;
        box-shadow: 0 0 1px 1px $color1;
        &_btn {
          width: 100%;
          height: 100%;
          background: $color2;
          color: $color3;

          &:hover {
            background: $color3;
            color: $color2;
          }
        }
      }
    }

    &_route {
      h3.tabName {
        color: $color3;
        height: 25px;
        line-height: 25px;
        margin: 5px 0;
        padding: 0 5px;
      }

      .routesBox {
        display: flex;
        flex-direction: column;
        gap: 5px;
        border-radius: 5px;
        background: $color3;
        padding: 5px 0;

        .area {
          display: grid;
          grid-template-columns: minmax(30%, 100px) auto;

          &:last-child .area_name::after {
            content: "";
            height: 0;
          }

          &_name {
            display: flex;
            flex-direction: column;
            color: $color2;
            align-items: center;

            div {
              height: 100%;
            }

            &::after {
              height: 100%;
              content: "\2193";
            }
          }

          &_items {
            > ul {
              margin-top: 5px;
              display: flex;
              flex-wrap: wrap;
              gap: 5px;

              li {
                width: fit-content;
                border-radius: 5px;

                .showItemInfoBtn {
                  span {
                    display: block;
                    padding: 5px;
                  }

                  img {
                    width: 100%;
                    max-width: 64px;
                  }

                  .hide {
                    display: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
