<template>
  <div class="needDrops">
    <div class="tabName">
      <h3>필요한 드랍템</h3>
    </div>
    <div>
      <ul class="needDrops_list">
        <li
          v-for="mat in dropMats.dropMatArr"
          :key="`dropMats${mat.id}`"
          :class="totalDrops.includes(mat.id) && 'hadItem'"
        >
          <span>{{ mat.name }}</span>
          <span :class="mat.count >= 3 && 'danger'">{{
            `(x${mat.count})`
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { areaData } from "~/utils/itemTable";
  import { disassembleWD } from "~/utils/disassemble";

  export default {
    components: {},
    computed: {
      dropMats() {
        return this.$store.state.matGDs;
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
      totalDrops() {
        const customRouteDrops = JSON.parse(
          JSON.stringify(this.customRouteDrops)
        );
        const totalDrops = customRouteDrops.map((areaInfo) => {
          this.bagDrops.forEach((drop) => {
            if (!areaInfo.drops.includes(drop)) areaInfo.drops.push(drop);
          });
          return areaInfo;
        });
        return totalDrops[totalDrops.length - 1].drops;
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
          color: red;
          font-weight: 700;
        }
      }
    }
  }
</style>
