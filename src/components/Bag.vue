<template>
  <div class="bag">
    <div class="bag_equip">
      <p>equip</p>
      <div>
        <ul>
          <li
            v-for="pocket in Object.keys(equip)"
            :key="pocket"
            :data-bag="pocket"
          >
            <span>{{ `${pocket}: ` }}</span>
            <span v-if="equip[pocket].id">
              <button>{{ equip[pocket].name }}</button>
              <button @click="dropItem">X</button>
            </span>
            <span v-else>
              <button>NONE</button>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bag_inventory">
      <p>inventory</p>
      <div>
        <ul>
          <li
            v-for="pocket in Object.keys(inventory)"
            :key="pocket"
            :data-bag="pocket"
          >
            <span>{{ `${pocket}: ` }}</span>
            <span v-if="inventory[pocket].id">
              <button>{{ inventory[pocket].name }}</button>
              <span>{{ `(x${inventory[pocket].count})` }}</span>
              <button @click="dropItem">X</button>
            </span>
            <span v-else>
              <button>NONE</button>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bag_assembles">
      <p>assembles</p>
      <div>
        <ul>
          <li
            v-for="assemble in Object.values(assembles)"
            :key="assemble.id"
            :data-assemble="assemble.id"
          >
            <button @click="getAssemble">{{ assemble.name }}</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    computed: {
      equip() {
        return this.$store.state.bagEquip;
      },
      inventory() {
        return this.$store.state.bagInventory;
      },
      assembles() {
        return this.$store.state.assemblable;
      },
    },
    methods: {
      dropItem(e) {
        this.$store.dispatch("dropItem", e.target.closest("li").dataset.bag);
        this.$store.dispatch("updateAssemblable");
      },
      getAssemble(e) {
        this.$store.dispatch(
          "getAssemble",
          this.assembles[e.target.closest("li").dataset.assemble]
        );
        this.$store.dispatch("updateAssemblable");
      },
    },
    watch: {
      equip() {
        console.log("EQUIP", this.equip);
      },
      inventory() {
        console.log("INVENTORY", this.inventory);
      },
      assembles() {
        console.log("ASSEMBLES", this.assembles);
      },
    },
  };
</script>

