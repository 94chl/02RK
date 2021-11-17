<template>
  <div :class="`bag ${toggleModal.bag ? 'active' : 'hide'}`">
    <div data-modal="initialWeapon" class="bag_initialWeapon">
      <button @click="onToggleModal">Initial Weapon</button>
      <InitialWeapon />
    </div>
    <div class="bag_equip">
      <p class="tabName">equip</p>
      <div>
        <ul>
          <li
            v-for="pocket in Object.keys(equip)"
            :key="pocket"
            :data-bag="pocket"
            :data-item="`${equip[pocket].id ? equip[pocket].id : ''}`"
          >
            <span v-if="equip[pocket].id">
              <div
                @dragstart="onDrag"
                @drop="onDrop"
                @dragover="onDragOver"
                draggable="true"
                class="moveBtn"
              >
                {{ equip[pocket].name }}
              </div>
              <button class="removeBtn" @click="dropItem">X</button>
            </span>
            <span v-else>
              <div
                @dragstart="onDrag"
                @drop="onDrop"
                @dragover="onDragOver"
                draggable="true"
              >
                <span>{{ pocket }}</span>
              </div>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bag_inventory">
      <p class="tabName">inventory</p>
      <div>
        <ul>
          <li
            v-for="pocket in Object.keys(inventory)"
            :key="pocket"
            :data-bag="pocket"
            :data-item="`${inventory[pocket].id ? inventory[pocket].id : ''}`"
            @drop="onDrop"
          >
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
                <span>{{ pocket }}</span>
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
            <button class="assembleBtn" @click="getAssemble">
              {{ assemble.name }}
            </button>
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
      toggleModal() {
        return this.$store.state.toggleModal;
      },
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
      onToggleModal(e) {
        this.$store.dispatch(
          "onToggleModal",
          e.target.closest("div").dataset.modal
        );
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
  .bag {
    border-radius: 5px;
    background: $color5;

    &.active {
      @include active();
    }

    .tabName {
      color: $color2;
    }

    &_equip {
      margin: 5px 0;
      ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 10px;
        background: $color4;
        border-radius: 5px;
        padding: 5px;
        li {
          height: 25px;
          position: relative;
          background: #fff;
          border-radius: 5px;

          .moveBtn {
            @include fasIcon(25px);
            width: 100%;
            overflow: hidden;

            img {
              height: 100%;
              width: fit-content;
            }

            .empty {
              color: #999;
            }
          }

          .removeBtn {
            @include fasIcon(25px);
            position: absolute;
            top: 0;
            right: 0;
            color: #ff0000;
          }
        }
      }
    }

    &_inventory {
      ul {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 5px;
        background: $color4;
        border-radius: 5px;
        padding: 5px;
        li {
          position: relative;
          height: 25px;
          background: #fff;
          border-radius: 5px;

          &.nowClicked {
            background: $color2;
            box-shadow: 0 0 1px 1px $color1 inset;
          }

          .moveBtn {
            height: 25px;
            width: 100%;
            text-align: center;
            position: relative;

            img {
              height: 100%;
              width: fit-content;
            }
            .itemCount {
              color: $color3;
              font-size: 0.5em;
              font-weight: bold;
              position: absolute;
              top: 0;
              left: 0;
              height: fit-content;
              line-height: normal;
            }
            .empty {
              color: #999;
            }
          }
          .removeBtn {
            position: absolute;
            top: 0;
            right: 0;
            color: #ff0000;
            @include fasIcon(15px);
          }
        }
      }
    }

    &_assembles {
      ul {
        display: flex;
        background: $color4;
        flex-wrap: wrap;
        border-radius: 5px;
        margin-bottom: 5px;
        li {
          .assembleBtn {
            width: fit-content;
            margin: 5px;
            height: 25px;
            line-height: 25px;
            padding: 0 5px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 1px 1px 3px 1px #999;
          }
        }
      }
    }
  }
</style>
