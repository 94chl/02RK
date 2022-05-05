<template>
  <div class="footer">
    <div class="footer_container">
      <div class="language_select">
        <select name="language" id="language" @change="selectLanguage">
          <option
            v-for="language in Object.keys(languages)"
            :value="languages[language]"
            :selected="languages[language] === selectedLanguage"
            :key="languages[language]"
          >
            {{ language }}
          </option>
        </select>
      </div>
    </div>
    <div class="footer_contact">
      <address>
        contact: <a href="mailto:94chl@naver.com">94chl@naver.com</a>
      </address>
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
          Japanese: "ja",
          Chinese: "cn",
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
        this.$store.dispatch("selectLanguage", e.target.value);
        this.$i18n.locale = this.selectedLanguage;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .footer {
    &_container {
      background: $color1;
      width: 100%;
      display: flex;
      justify-content: flex-end;

      .language_select {
        min-width: 120px;
        margin: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        select {
          height: 30px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }

    &_contact {
      text-align: center;
      padding: 4px;
      margin-top: 20px;
      address {
        opacity: 0.5;
        font-size: 0.8rem;
        a {
          text-decoration: none;
          color: #000;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>

