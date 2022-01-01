<template>
  <div :class="`status ${toggleModal.status ? 'active' : 'hide'}`">
    <h2 class="tabName">스테이터스(개발중)</h2>
    <div data-modal="initialWeapon" class="status_initialWeapon"></div>
  </div>
</template>

<script>
  export default {
    data() {},
    components: {},
    computed: {
      showItemImg() {
        return this.$store.state.showItemImg;
      },
      toggleModal() {
        return this.$store.state.toggleModal;
      },
      equip() {
        return this.$store.state.statusEquip;
      },
      inventory() {
        return this.$store.state.statusInventory;
      },
      assembles() {
        return this.$store.state.assemblable;
      },
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  .status {
    border-radius: 5px;
    background: $color5;

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

          &.nowClicked {
            background: $color2;
            box-shadow: 0 0 1px 1px $color1 inset;
          }

          .itemInfo {
            height: 25px;
            width: 100%;
            text-align: center;
            position: relative;
            font-size: 0.8em;

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
            color: $color3;
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
            background: #fff;
            border-radius: 5px;
            box-shadow: 1px 1px 3px 1px #999;
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
              cursor: default;
            }
          }
        }
      }
    }
  }
</style>
