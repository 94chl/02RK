<template>
  <div class="needDrops">
    <p class="tabName">Need Drops</p>
    <div>
      <ul class="needDrops_list">
        <li v-for="mat in dropMats.dropMatArr" :key="`dropMats${mat.id}`">
          <span>{{ mat.name }}</span>
          <span>{{ `(x${mat.count})` }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    computed: {
      dropMats() {
        return this.$store.state.matGDs;
      },
    },
    methods: {},
    watch: {
      dropMats() {
        console.log("dropMats", this.dropMats);
      },
    },
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
      }
    }
  }
</style>
