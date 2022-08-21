<template>
  <div class="header">
    <div class="header_logo">
      <img src="../img/ER_Logo_White.webp" alt="logo" />
    </div>
    <div class="header_title">02RK</div>
    <div class="header_btns" data-modal="bag">
      <button
        :class="`bagBtn ${modal.bag.show ? 'openedBtn' : ''}`"
        @click="onToggleModal"
        data-modal="bag"
      >
        <i class="fas fa-suitcase"></i>
      </button>
      <button
        :class="`statusBtn ${modal.status.show ? 'openedBtn' : ''}`"
        @click="onToggleModal"
        data-modal="status"
      >
        <i class="fa-solid fa-user"></i>
        <!-- <i class="fas fa-tshirt"></i> -->
      </button>
      <button
        @click="onToggleModal"
        :class="`totalPathFinderBtn ${
          modal.totalPathFinder.show ? 'openedBtn' : ''
        }`"
        data-modal="totalPathFinder"
      >
        <i class="fas fa-map-marked-alt"></i>
      </button>
      <button
        :class="`manualBtn ${modal.manual.show ? 'openedBtn' : ''}`"
        data-modal="manual"
        @click="onToggleModal"
      >
        <i class="fas fa-solid fa-circle-info"></i>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        errorMessage: "",
      };
    },
    components: {},
    computed: {
      modal() {
        return this.$store.state.modal;
      },
    },
    methods: {
      onToggleModal(e) {
        this.$store.dispatch(
          "onToggleModal",
          e.target.closest("button").dataset.modal
        );
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header {
    height: 70px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: grid;
    grid-template-columns: auto 1fr auto;
    justify-content: space-between;
    background: $color1;

    &_logo {
      max-width: 120px;
      padding: 0 4px;
      img {
        height: 100%;
      }
    }

    &_title {
      height: 50px;
      min-width: 120px;
      line-height: 50px;
      margin: 10px 0;
      color: $color2;
      font-weight: bold;
      font-size: 2.5rem;
      letter-spacing: 0.1rem;
      text-align: center;
    }

    &_btns {
      height: 50px;
      min-width: 120px;
      line-height: 50px;
      margin: 10px 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 4px;
      padding: 0 4px;

      button {
        @include fasIcon(30px);
        background: $color1;
        color: $color2;
        border: 1px solid $color2;
        &.openedBtn {
          box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
        }
        &:hover {
          box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.2);
        }
      }

      .bagBtn {
        transition: background-color 0.3s linear;
        &.gotDrops {
          background: $color5;
        }
      }
    }
  }
</style>

