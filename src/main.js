// import * as Vue from 'vue'
import { createApp } from "vue";
import App from "~/App";

import store from "~/store/index"; // NOTE "/index.js" 생략 가능
import { createI18n } from "vue-i18n";
import { kr, en, ja, cn } from "./language";

const language = navigator.language;
const browserLanguage = language.includes("ko")
  ? "kr"
  : language.includes("ja")
  ? "ja"
  : language.includes("cn") || language.includes("zh")
  ? "cn"
  : "en";

console.log(browserLanguage);

const i18n = createI18n({
  locale: "kr",
  fallbackLocale: "en",
  messages: { kr, en, ja, cn },
});

// import '~/routes/guard'

// Vue.createApp(App).mount('#app')
const app = createApp(App);

// NOTE app애플리케이션에 store플러그인을 등록

app.use(store);
app.use(i18n);

// NOTE 컴포넌트 전역등록
// app.component("Posts", Posts);
// app.component("GoMainBtn", GoMainBtn);

// NOTE index.html의 #app에 연결
app.mount("#App");
