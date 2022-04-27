<template>
  <div class="footer">
    <div class="footer_container">
      <select name="language" id="language" @change="selectLanguage">
        <option
          v-for="(language, index) in Object.keys(languages)"
          :value="languages[language]"
          :selected="index === 0"
          :key="languages[language]"
        >
          {{ language }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        languages: {
          Korean: "kr",
          English: "en",
          Chinese: "cn",
          Japanese: "ja",
        },
      };
    },
    components: {},
    computed: {
      selectedLanguage() {
        return this.$store.state.language;
      },
    },
    methods: {
      selectLanguage(e) {
        console.log(this.selectedLanguage);
        this.$store.dispatch("selectLanguage", e.target.value);
        console.log(this.selectedLanguage);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .footer {
    background: $color1;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    &_container {
      min-width: 120px;
      margin: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      select {
        height: 30px;
        border: none;
        border-radius: 5px;
      }
    }
  }
</style>

