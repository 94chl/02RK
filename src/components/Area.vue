<template>
  <div class="area">
    <p>area</p>
    <p>{{ customRoute }}</p>
    <div>
      <ul>
        <li v-for="area in areaIds" :key="area" :data-areaid="area">
          <div>
            <span>{{ `[${areaInfo[area].name}]` }}</span>
            <button @click="toggleArea">toggle</button>
            <button @click="setRoute">pick</button>
          </div>
          <div>
            <ul>
              <li
                v-for="drop in areaInfo[area].drop"
                :key="`${area}${drop.id}`"
                :class="`${
                  !dropMats.dropMatObj[drop.id] && !areaInfo[area].show
                    ? 'hide'
                    : null
                }`"
              >
                <button>{{ drop.name }}</button>
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
      console.log(this.dropMats);
      const keys = Object.keys(areaData);
      this.areaIds = keys.slice(2).concat(keys[0]);

      const newAreaData = JSON.parse(JSON.stringify(areaData));
      this.areaIds.forEach((areaId) => {
        newAreaData[areaId].drop = areaData[areaId].drop.map((dropId) =>
          searchById(dropId)
        );
        newAreaData[areaId].show = false;
      });
      console.log("newAreaData", newAreaData);

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
        console.log(e.target.closest("li").dataset.areaid);
        this.areaInfo[e.target.closest("li").dataset.areaid].show =
          !this.areaInfo[e.target.closest("li").dataset.areaid].show;
      },
      setRoute(e) {
        const pickedArea = e.target.closest("li").dataset.areaid;
        if (this.customRoute.includes(this.areaInfo[pickedArea].name)) {
          const newRoute = this.customRoute.filter(
            (area) => area !== this.areaInfo[pickedArea].name
          );
          this.$store.dispatch("removeRoute", newRoute);
        } else {
          this.$store.dispatch("addRoute", this.areaInfo[pickedArea].name);
        }
        console.log("customRoute", this.$store.state.customRoute);
      },
    },
  };
</script>

