<template>
  <div class="bag">
    <div class="bag_equip">
      <p>equip</p>
      <InitialWeapon />
      <div>
        <ul>
          <li
            v-for="pocket in Object.keys(equip)"
            :key="pocket"
            :data-bag="pocket"
            :data-item="`${equip[pocket].id ? equip[pocket].id : ''}`"
          >
            <span>{{ `${pocket}: ` }}</span>
            <span v-if="equip[pocket].id">
              <div
                @dragstart="onDrag"
                @drop="onDrop"
                @dragover="onDragOver"
                draggable="true"
              >
                {{ equip[pocket].name }}
              </div>
              <button @click="dropItem">X</button>
            </span>
            <span v-else>
              <div
                @dragstart="onDrag"
                @drop="onDrop"
                @dragover="onDragOver"
                draggable="true"
              >
                NONE
              </div>
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
            :data-item="`${inventory[pocket].id ? inventory[pocket].id : ''}`"
            @drop="onDrop"
          >
            <span>{{ `${pocket}: ` }}</span>
            <span v-if="inventory[pocket].id">
              <div
                @dragstart="onDrag"
                @drop="onDrop"
                @dragover="onDragOver"
                draggable="true"
              >
                {{ inventory[pocket].name }}
              </div>
              <span>{{ `(x${inventory[pocket].count})` }}</span>
              <button @click="dropItem">X</button>
            </span>
            <span v-else>
              <div
                @dragstart="onDrag"
                @drop="onDrop"
                @dragover="onDragOver"
                draggable="true"
              >
                NONE
              </div>
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
  import { equippable, categoryById } from "~/utils/itemTable";
  import InitialWeapon from "~/components/InitialWeapon";

  export default {
    data() {
      return {
        moveItem: { from: { item: false }, to: { item: false }, able: false },
      };
    },

    components: { InitialWeapon },
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
        if (!window.confirm("버리시겠습니까?")) return;

        this.$store.dispatch("dropItem", e.target.closest("li").dataset.bag);
        this.$store.dispatch("updateAssemblable");
      },
      getAssemble(e) {
        if (!window.confirm("조합하시겠습니까?")) return;
        this.$store.dispatch(
          "getAssemble",
          this.assembles[e.target.closest("li").dataset.assemble]
        );
        this.$store.dispatch("updateAssemblable");
      },
      onDrag(e) {
        const target = e.target.closest("li");
        this.moveItem.from = {
          item: target.dataset.item,
          bag: target.dataset.bag,
        };
      },
      onDrop(e) {
        e.preventDefault();

        if (
          this.moveItem.to.bag === this.moveItem.from.bag ||
          !this.moveItem.able ||
          (!this.moveItem.to.item && !this.moveItem.from.item)
        ) {
          console.log("CANT MOVE");
          this.moveItem = {
            from: { item: false },
            to: { item: false },
            able: false,
          };
          return;
        }
        if (this.moveItem.able) {
          this.$store.dispatch("moveItem", this.moveItem);
          this.moveItem = {
            from: { item: false },
            to: { item: false },
            able: false,
          };
        }
      },
      onDragOver(e) {
        e.preventDefault();
        const target = e.target.closest("li");
        const dropZone = { item: target.dataset.item, bag: target.dataset.bag };
        if (
          !equippable.includes(this.moveItem.from.bag) &&
          !equippable.includes(dropZone.bag)
        ) {
          this.moveItem.to = dropZone;
          this.moveItem.able = true;
        } else if (
          equippable.includes(this.moveItem.from.bag) &&
          equippable.includes(dropZone.bag)
        ) {
          this.moveItem = {
            ...this.moveItem,
            to: { item: false },
            able: false,
          };
          return;
        } else {
          const fromSort = !this.moveItem.from.item
            ? false
            : categoryById(this.moveItem.from.item);
          const toSort = !dropZone.item ? false : categoryById(dropZone.item);

          if (fromSort === toSort || (equippable.includes(fromSort) && !toSort)) {
            this.moveItem.to = dropZone;
            this.moveItem.able = true;
          } else {
            this.moveItem = {
              ...this.moveItem,
              to: { item: false },
              able: false,
            };
          }
        }
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

<style lang="scss" scoped>
</style>
