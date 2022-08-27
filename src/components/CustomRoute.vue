<template>
  <div class="customRoute">
    <div class="tabName">
      <h3>{{ $t("section.customRoute") }}</h3>
      <div class="buttonBox">
        <button class="removeAllBtn" @click="removeAllRoute">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button class="craftBtn" @click="toggleCraftModal">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
    <div class="routesBox">
      <div
        v-for="(area, index) in Object.values(areaWithTargetItems)"
        :key="`route${index}`"
      >
        <div>
          <div>{{ areaData[area.areaId].name[language] }}</div>
          <ul v-if="area.targetItems.length">
            <li
              v-for="item in area.targetItems"
              :key="`complete${item.id}`"
              :class="`value${item.id[0]}`"
            >
              <img
                :src="require(`~/img/item/${item.sort}/${item.name.en}.webp`)"
                :alt="`${item.name[language]}_img`"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { areaData, searchById } from "~/utils/itemTable.js";
  import { disassembleWD } from "~/utils/disassemble";
  import ampl from "~/utils/amplitude.js";

  export default {
    data() {
      return {
        areaIds: [],
        areaData,
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

      this.areaData = newAreaData;
    },
    components: {},
    computed: {
      language() {
        return this.$store.state.language;
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
      areaWithTargetItems() {
        let targetItems = JSON.parse(
          JSON.stringify(this.$store.state.targetItems)
        );
        const customRouteDrops = JSON.parse(
          JSON.stringify(this.customRouteDrops)
        );

        const areaWithTargetItems = {};

        customRouteDrops.slice(1).forEach((areaInfo) => {
          this.bagDrops.forEach((drop) => {
            if (!areaInfo.drops.includes(drop)) areaInfo.drops.push(drop);
          });

          areaInfo.targetItems = [];
          const remainTargetItems = [];

          targetItems.forEach((item) => {
            const totalDrops = Object.keys(disassembleWD([item.id]).dropMatId);

            if (totalDrops.every((dropId) => areaInfo.drops.includes(dropId))) {
              areaInfo.targetItems.push({
                name: item.name,
                id: item.id,
                img: item.img,
                sort: item.sort,
              });
            } else {
              remainTargetItems.push(item);
            }
          });
          targetItems = remainTargetItems;

          areaWithTargetItems[areaInfo.areaId] = areaInfo;
        });

        return areaWithTargetItems;
      },
    },
    methods: {
      removeAllRoute() {
        if (window.confirm(this.$t("noti.clearRoute"))) {
          ampl.log("clear", { target: "custom route" });
          this.$store.dispatch("setRoute", []);
        }
      },
      toggleCraftModal() {
        this.$store.dispatch("onToggleModal", "craft");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .customRoute {
    .tabName {
      display: flex;
      .buttonBox {
        display: flex;
        button {
          background: none;
          border-radius: 4px;
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

    .routesBox {
      display: grid;
      grid-template-columns: repeat(5, minmax(min-content, 1fr));
      border-radius: 4px;
      background: $color3;
      @media screen and (max-width: 720px) {
        grid-template-columns: repeat(3, minmax(min-content, 1fr));
      }
      > div {
        display: flex;
        justify-content: space-around;
        padding: 4px 0;
        color: $color2;

        &::after {
          height: 100%;
          content: "\2192";
        }
        &:last-child {
          &::after {
            content: "";
          }
        }
        > div {
          width: fit-content;
          > div {
            width: fit-content;
          }
          > ul {
            max-width: 90px;
            margin-top: 4px;
            display: flex;
            flex-wrap: wrap;
            gap: 4px;

            li {
              width: fit-content;
              border-radius: 4px;
              img {
                width: 64px;
              }
            }
          }
        }
      }
    }
  }
</style>
