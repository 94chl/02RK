<template>
  <div class="needDrops">
    <p>Need Drops</p>
    <div>
      <ul>
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

