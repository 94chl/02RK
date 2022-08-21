<template>
  <div :class="`manual ${modal.manual.show ? 'active' : 'hide'}`">
    <div class="tabName">
      <h3>{{ $t("modal.manual") }}</h3>
      <div class="buttonBox">
        <button @click="toggleManualModal">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <div class="manual_info">
      <ul>
        <li>{{ $t("manual.manual1") }}</li>
        <li>{{ $t("manual.manual2") }}</li>
        <li>{{ $t("manual.manual3") }}</li>
        <li>{{ $t("manual.manual4") }}</li>
        <li>{{ $t("manual.manual5") }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    computed: {
      modal() {
        return this.$store.state.modal;
      },
    },
    methods: {
      toggleManualModal() {
        this.$store.dispatch("onToggleModal", "manual");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .manual {
    border-radius: 5px;
    border: 2px solid $color3;
    box-sizing: border-box;
    background: $color2;

    &.active {
      @include active();
      z-index: inherit;
    }

    .tabName {
      color: $color2;
      height: 25px;
      line-height: 25px;
      margin: 5px 0;
      padding: 0 5px;
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      h3 {
        color: $color3;
        height: 25px;
        line-height: 25px;
        padding: 0;
        margin: 0;
      }
      .buttonBox {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        > div {
          display: flex;
        }

        button {
          background: none;
          color: $color3;
          border-radius: 5px;
          @include fasIcon(25px);
          margin-right: 5px;
          &:hover {
            box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.3);
          }
        }
      }
    }

    &_info {
      ul {
        background: $color3;
        padding: 8px;
        list-style: disc inside;
        li {
          color: $color2;
          padding: 4px;
        }
      }
    }
  }
</style>
