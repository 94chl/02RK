<template>
  <div class="needDrops">
    <div class="tabName">
      <h3>{{ $t("section.neededDropItem") }}</h3>
    </div>
    <div>
      <ul class="needDrops_list">
        <li
          v-for="matId in Object.keys(needDrops)"
          :key="`dropMats${matId}`"
          :class="!needDrops[matId] && 'hadItem'"
        >
          <span>{{ dropMatsInfo[matId].name[language] }}</span>
          <span :class="dropMatsInfo[matId].count >= 3 && 'danger'">{{
            `(x${dropMatsInfo[matId].count})`
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { areaData } from "~/utils/itemTable";
  import { checkNeedsWithBags } from "~/utils/pathFinder";

  export default {
    components: {},
    computed: {
      language() {
        return this.$store.state.language;
      },
      dropMats() {
        return this.$store.state.matGDs;
      },
      dropMatsInfo() {
        const result = {};
        this.$store.state.matGDs.dropMatArr.forEach((item) => {
          result[item.id] = item;
        });
        return result;
      },
      customRoute() {
        return this.$store.state.customRoute;
      },
      bagDrops() {
        const bagDrops = {};

        Object.values(this.$store.state.bagEquip).forEach((item) => {
          if (item.id) bagDrops[item.id] = item.count;
        });
        Object.values(this.$store.state.bagInventory).forEach((item) => {
          if (item.id) {
            bagDrops[item.id] = bagDrops[item.id]
              ? bagDrops[item.id] + item.count
              : item.count;
          }
        });
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
      totalDrops() {
        const totalDrops = this.customRouteDrops.reduce((acc, cur) => {
          const { drops } = cur;
          drops.forEach((dropId) => !acc.includes(dropId) && acc.push(dropId));
          return acc;
        }, []);
        return totalDrops;
      },
      needDrops() {
        const remains = checkNeedsWithBags(
          this.dropMats?.dropMatObj,
          this.bagDrops
        );
        return remains;
      },
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  .needDrops {
    min-height: fit-content;
    &_list {
      display: flex;
      flex-wrap: wrap;
      gap: 3px 5px;
      padding: 5px;

      li {
        width: fit-content;
        background: #fff;
        border-radius: 5px;
        padding: 5px;

        &.hadItem {
          text-decoration: line-through;
          opacity: 80%;
        }

        .danger {
          color: orange;
          font-weight: 700;
        }
      }
    }
  }
</style>
