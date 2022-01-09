<template>
  <div :class="`bag ${toggleModal.bag ? 'active' : 'hide'}`">
    <h2 class="tabName">
      가방
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
    </h2>
    <div data-modal="initialWeapon" class="bag_initialWeapon">
      <button @click="onToggleModal" class="tabName">
        시작무기
        <i
          :class="`fas fa-angle-double-down ${
            toggleModal.initialWeapon ? 'hide' : ''
          }`"
        ></i>
        <i
          :class="`fas fa-angle-double-up ${
            toggleModal.initialWeapon ? '' : 'hide'
          }`"
        ></i>
      </button>
      <InitialWeapon />
    </div>
    <div class="bag_equip">
      <p class="tabName">
        장비
        <button class="clearBtn" @click="clearBag" data-bag="equip">
          <i class="fas fa-trash-alt"></i>
        </button>
      </p>
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
                :class="`itemInfo value${equip[pocket].id[0]}`"
              >
                <img
                  :src="equip[pocket].img"
                  :alt="`${equip[pocket].name}_img`"
                  :title="`${equip[pocket].name}_img`"
                  v-if="showItemImg"
                />
                <span v-else>{{ equip[pocket].name }}</span>
              </div>
              <button class="removeBtn" @click="dropItem">X</button>
            </span>
            <span v-else>
              <div
                @dragstart="onDrag"
                @drop="onDrop"
                @dragover="onDragOver"
                draggable="true"
                class="empty"
              >
                <span>{{ pocket }}</span>
              </div>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bag_inventory">
      <p class="tabName">
        가방
        <button class="clearBtn" @click="clearBag" data-bag="inventory">
          <i class="fas fa-trash-alt"></i>
        </button>
      </p>
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
                :class="`itemInfo value${inventory[pocket].id[0]}`"
              >
                <img
                  :src="inventory[pocket].img"
                  :alt="`${inventory[pocket].name}_img`"
                  :title="`${inventory[pocket].name}_img`"
                  v-if="showItemImg"
                />
                <span v-else>{{ inventory[pocket].name }}</span>
                <span class="itemCount">{{
                  `(x${inventory[pocket].count})`
                }}</span>
              </div>
              <button @click="dropItem" class="removeBtn">X</button>
            </span>
            <span v-else>
              <div
                @dragstart="onDrag"
                @drop="onDrop"
                @dragover="onDragOver"
                draggable="true"
                class="empty"
              >
                <span>{{ pocket }}</span>
              </div>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bag_assembles">
      <p class="tabName">조합가능</p>
      <div v-if="Object.values(assembles).length > 0">
        <ul>
          <li
            v-for="assemble in Object.values(assembles)"
            :key="assemble.id"
            :data-assemble="assemble.id"
          >
            <button
              :class="`assembleBtn value${assemble.id[0]}`"
              @click="getAssemble"
            >
              <img
                :src="assemble.img"
                :alt="`${assemble.name}_img`"
                :title="`${assemble.name}_img`"
                v-if="showItemImg"
              />
              <span v-else>{{ assemble.name }}</span>
              <span class="itemCount">
                {{ `(x${assemble.pickup})` }}
              </span>
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
      showItemImg() {
        return this.$store.state.showItemImg;
      },
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
      onChangeShowItemImg() {
        this.$store.dispatch("onChangeShowItemImg");
      },
      dropItem(e) {
        if (!window.confirm("버리시겠습니까?")) return;

        this.$store.dispatch("dropItem", e.target.closest("li").dataset.bag);
        this.$store.dispatch("updateAssemblable");
      },
      clearBag(e) {
        if (!window.confirm("전부 버리시겠습니까?")) return;

        this.$store.dispatch("clearBag", e.target.closest("button").dataset.bag);
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
  };
</script>

<style lang="scss" scoped>
  .bag {
    border-radius: 5px;
    background: $color5;
    border: 2px solid $color5;
    box-sizing: border-box;

    &.active {
      @include active();
      left: calc(50% - 160px);
    }

    .tabName {
      color: $color2;
      height: 25px;
      line-height: 25px;
      margin: 5px 0;
      padding: 0 5px;
      .changeShowItemImgBtn {
        background: none;
        color: $color2;
        border-radius: 5px;
        @include fasIcon(25px);
        margin-right: 5px;
        &:last-child {
          margin: 0;
        }
        &:hover {
          box-shadow: 0 0 12px 2px inset rgba(255, 255, 255, 0.3);
        }
        &.selected {
          box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.3);
        }
      }
      .clearBtn {
        background: none;
        color: $color2;
        height: 25px;
        border-radius: 5px;
        &:hover {
          box-shadow: 0 0 12px 2px inset rgba(255, 255, 255, 0.3);
        }
      }
    }

    &_initialWeapon {
      button {
        background: none;
        .fas {
          @include fasIcon(25px);
        }
        &:hover {
          .fas {
            box-shadow: 0 0 12px 2px inset rgba(255, 255, 255, 0.3);
          }
        }
      }
    }

    &_equip {
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
          line-height: 25px;
          position: relative;
          background: #fff;
          border-radius: 5px;

          .itemInfo {
            @include fasIcon(25px);
            width: 100%;
            overflow: hidden;
            font-size: 0.8em;
            border: none;

            img {
              height: 100%;
              width: fit-content;
            }
          }

          .empty {
            color: #999;
            font-size: 0.7em;
            padding: 5px;
          }
          .removeBtn {
            background: none;
            @include fasIcon(25px);
            position: absolute;
            top: 0;
            right: 0;
            color: #ff0000;
            &:hover {
              font-weight: 700;
            }
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
          line-height: 25px;
          background: #fff;
          border-radius: 5px;

          .itemInfo {
            height: 25px;
            width: 100%;
            text-align: center;
            position: relative;
            font-size: 0.8em;
            border: none;

            img {
              height: 100%;
              width: fit-content;
            }
          }

          .empty {
            color: #999;
            font-size: 0.7em;
            padding: 5px;
          }
          .removeBtn {
            background: none;
            position: absolute;
            top: 0;
            right: 0;
            color: #ff0000;
            @include fasIcon(15px);
            &:hover {
              font-weight: 700;
            }
          }
          .itemCount {
            font-size: 0.5em;
            font-weight: bold;
            position: absolute;
            top: 0;
            left: 0;
            height: fit-content;
            line-height: normal;
            cursor: default;
          }
        }
      }
    }

    &_assembles {
      ul {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 5px;
        background: $color4;
        border-radius: 5px;
        padding: 5px;

        li {
          .assembleBtn {
            width: 100%;
            height: 25px;
            line-height: 25px;
            padding: 0 5px;
            border-radius: 5px;
            box-shadow: 1px 1px 3px 1px #999;
            position: relative;

            img {
              height: 100%;
              width: fit-content;
            }
            .itemCount {
              font-size: 0.5em;
              font-weight: bold;
              position: absolute;
              top: 0;
              left: 0;
              height: fit-content;
              line-height: normal;
              cursor: default;
            }
          }
        }
      }
    }
  }
</style>
