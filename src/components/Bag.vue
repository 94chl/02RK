<template>
  <div :class="`bag ${modal.bag.show ? 'active' : 'hide'}`">
    <div class="tabName">
      <h3>{{ $t("modal.bag") }}</h3>
      <div class="buttonBox">
        <div>
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
        </div>
        <button @click="toggleBagModal">
          <span>
            <i class="fas fa-times"></i>
          </span>
        </button>
      </div>
    </div>
    <div data-modal="initialWeapon" class="bag_initialWeapon">
      <div class="tabName">
        <h3>{{ $t("modal.initialWeapon") }}</h3>
        <div class="buttonBox" data-dropDown="initialWeapon">
          <button @click="onToggleDropDown">
            <i
              :class="`fas fa-angle-double-down ${
                dropDown.initialWeapon ? 'hide' : ''
              }`"
            ></i>
            <i
              :class="`fas fa-angle-double-up ${
                dropDown.initialWeapon ? '' : 'hide'
              }`"
            ></i>
          </button>
        </div>
      </div>
      <InitialWeapon />
    </div>
    <div class="bag_equip">
      <div class="tabName">
        <h3>{{ $t("modal.equip") }}</h3>
        <div class="buttonBox">
          <button class="clearBtn" @click="clearBag" data-bag="equip">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
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
                  :alt="`${equip[pocket].name[language]}_img`"
                  :title="`${equip[pocket].name[language]}_img`"
                  v-if="showItemImg"
                />
                <span v-else>{{ equip[pocket].name[language] }}</span>
              </div>
              <button class="removeBtn" @click="dropItem">
                <i class="fas fa-times"></i>
              </button>
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
      <div class="tabName">
        <h3>{{ $t("modal.bag") }}</h3>
        <div class="buttonBox">
          <button class="clearBtn" @click="clearBag" data-bag="inventory">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
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
                  :alt="`${inventory[pocket].name[language]}_img`"
                  :title="`${inventory[pocket].name[language]}_img`"
                  v-if="showItemImg"
                />
                <span v-else>{{ inventory[pocket].name[language] }}</span>
                <span class="itemCount">{{
                  `(x${inventory[pocket].count})`
                }}</span>
              </div>
              <button @click="dropItem" class="removeBtn">
                <i class="fas fa-times"></i>
              </button>
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
      <div class="tabName">
        <h3>{{ $t("modal.bagMakable") }}</h3>
      </div>
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
                :alt="`${assemble.name[language]}_img`"
                :title="`${assemble.name[language]}_img`"
                v-if="showItemImg"
              />
              <span v-else>{{ assemble.name[language] }}</span>
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
      language() {
        return this.$store.state.language;
      },
      showItemImg() {
        return this.$store.state.showItemImg;
      },
      modal() {
        return this.$store.state.modal;
      },
      dropDown() {
        return this.$store.state.dropDown;
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
        if (!window.confirm(this.$t("noti.dropItem"))) return;

        this.$store.dispatch("dropItem", e.target.closest("li").dataset.bag);
        this.$store.dispatch("updateAssemblable");
      },
      clearBag(e) {
        if (!window.confirm(this.$t("noti.dropAllItems"))) return;

        this.$store.dispatch("clearBag", e.target.closest("button").dataset.bag);
        this.$store.dispatch("updateAssemblable");
      },
      getAssemble(e) {
        if (!window.confirm(this.$t("noti.craftItem"))) return;
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
      onToggleDropDown(e) {
        this.$store.dispatch(
          "onToggleDropDown",
          e.target.closest("div").dataset.dropdown
        );
      },
      toggleBagModal() {
        this.$store.dispatch("onToggleModal", "bag");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .bag {
    border-radius: 4px;
    background: $color5;
    border: 2px solid $color5;
    box-sizing: border-box;

    &.active {
      @include active();
      z-index: inherit;
    }

    .tabName {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;

      h3 {
        color: $color2;
        height: 25px;
        line-height: 25px;
        padding: 0;
        margin: 0;
      }
      .buttonBox {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        button {
          background: none;
          color: $color2;
          border-radius: 4px;
          @include fasIcon(25px);
          margin-right: 4px;
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
        border-radius: 4px;
        padding: 4px;
        li {
          height: 25px;
          line-height: 25px;
          position: relative;
          background: #fff;
          border-radius: 4px;

          .itemInfo {
            @include fasIcon(25px);
            width: 100%;
            overflow: hidden;
            font-size: 0.8rem;
            border: none;

            img {
              height: 100%;
              width: fit-content;
            }
          }

          .empty {
            color: #999;
            font-size: 0.7rem;
            padding: 4px;
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
        gap: 4px;
        background: $color4;
        border-radius: 4px;
        padding: 4px;
        li {
          position: relative;
          height: 25px;
          line-height: 25px;
          background: #fff;
          border-radius: 4px;

          .itemInfo {
            height: 25px;
            width: 100%;
            text-align: center;
            position: relative;
            font-size: 0.8rem;
            border: none;

            img {
              height: 100%;
              width: fit-content;
            }
          }

          .empty {
            color: #999;
            font-size: 0.7rem;
            padding: 4px;
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
            font-size: 0.5rem;
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
        gap: 4px;
        background: $color4;
        border-radius: 4px;
        padding: 4px;

        li {
          .assembleBtn {
            width: 100%;
            height: 25px;
            line-height: 25px;
            padding: 0 4px;
            border-radius: 4px;
            box-shadow: 1px 1px 3px 1px #999;
            position: relative;
            overflow: hidden;

            img {
              height: 100%;
              width: fit-content;
            }
            .itemCount {
              font-size: 0.5rem;
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
