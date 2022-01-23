<template>
  <div :class="`craft ${toggleModal.craft ? 'active' : 'hide'}`">
    <div class="craft_select">
      <div class="tabName">
        <h3>제작 가능 아이템</h3>
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
          <form @change="changeDept">
            <input
              v-for="dept in deptArr"
              type="radio"
              :value="dept"
              :id="`select${dept}_craft`"
              class="deptRadio"
              :name="dept"
              :key="dept"
              :checked="dept === selectDept"
            />
            <label
              :for="`select${dept}_craft`"
              v-for="dept in deptArr"
              :key="`deptArr${dept}`"
              :class="`select${dept} ${dept == selectDept ? 'selected' : ''}`"
            >
              {{ deptKor[dept] }}
            </label>
          </form>
        </div>

        <div class="selectBox_category">
          <select class="selectBox_category_select" @change="changeCategory">
            <option
              v-for="category in categoryArr"
              :value="category.category"
              :selected="category.category === selectCategory"
              :key="`categoryArr${category.category}`"
            >
              {{ category.kor }}
            </option>
          </select>
        </div>

        <div class="selectBox_grade">
          <select class="selectBox_grade_select" @change="changeGrade">
            <option value="W">일반</option>
            <option value="G">고급</option>
            <option value="B">희귀</option>
            <option value="P">영웅</option>
            <option value="Y">전설</option>
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
      <h3 class="tabName">사용자 루트</h3>
      <div class="routesBox">
        <div
          v-for="(area, index) in customRoute"
          :key="`route${index}`"
          class="area"
        >
          <div class="area_name">
            <div>{{ areaInfo[area].name }}</div>
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
                    item.name
                  }}</span>
                  <img
                    :class="showItemImg ? '' : 'hide'"
                    :src="item.img"
                    :alt="`${item.name}_img`"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { database, eng2Kor, areaData, searchById } from "~/utils/itemTable";
  import { disassembleWD } from "~/utils/disassemble";

  export default {
    data() {
      return {
        deptArr: ["weapon", "equip", "item"],
        deptKor: { weapon: "무기", equip: "장비", item: "기타" },
        categoryArr: [],
        itemArr: [],
        areaIds: [],
        areaInfo: areaData,
        areaWithTargetItems: [],
      };
    },
    components: {},
    computed: {
      selectDept() {
        return "";
      },
      selectCategory() {
        return "";
      },
      selectGrade() {
        return "";
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
        const customRouteDrops = ["A000", ...this.customRoute].reduce(
          (acc, areaId, index) => {
            const newDrops =
              index > 0
                ? areaData[areaId].drop.filter(
                    (item) => !acc[acc.length - 1].drops.includes(item)
                  )
                : areaData[areaId].drop;
            acc.push({
              area: areaId,
              drops:
                index > 0
                  ? [...acc[acc.length - 1].drops, ...newDrops]
                  : newDrops,
            });
            return acc;
          },
          []
        );
        return customRouteDrops;
      },
      targetPool() {
        const selected = {
          dept: this.selectDept,
          category: this.selectCategory,
          grade: this.selectGrade,
        };
        console.log(selected);
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
      changeDept(e) {
        this.selectDept = e.target.value;
        console.log(this.selectDept);
        this.categoryArr = database[`${this.selectDept}Data`].map((category) => ({
          ...category,
          kor: eng2Kor[category.category],
        }));
        console.log(this.categoryArr);
        this.selectCategory = this.categoryArr[0].category;
        this.itemArr = this.categoryArr.filter(
          (category) => category.category === this.selectCategory
        )[0].items;
      },
      changeCategory(e) {
        this.selectCategory = e.target.value;
        this.itemArr = this.categoryArr.filter(
          (category) => category.category === this.selectCategory
        )[0].items;
      },
      changeGrade(e) {
        this.selectGrade = e.target.value;
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
      },
      showItemInfo(e) {
        const selectedItem = searchById(e.target.closest("li").dataset.itemid);
        this.$store.dispatch("setCart", selectedItem);
      },
    },
    created() {
      this.selectDept = "weapon";
      this.categoryArr = database[`${this.selectDept}Data`].map((category) => ({
        ...category,
        kor: eng2Kor[category.category],
      }));
      this.selectCategory = this.categoryArr[0].category;
      this.selectGrade = "W";
      this.itemArr = this.categoryArr.filter(
        (category) => category.category === this.selectCategory
      )[0].items;
    },
  };
</script>

<style lang="scss" scoped>
  .craft {
    border-radius: 5px;
    border: 2px solid $color5;
    box-sizing: border-box;
    background: $color2;

    &.active {
      @include active();
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

        .deptRadio {
          display: none;
        }

        label {
          margin: 2.5px 5px;
          box-shadow: 0 0 1px 1px $color1;
          border-radius: 5px;
          padding: 0 5px;
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
