import { createStore } from "vuex";
import { disassembleGD, disassembleAllWD } from "~/utils/disassemble";

const store = createStore({
  state() {
    return {
      targetItems: [],
      matGDs: {
        greenMatObj: {},
        dropMatArr: [],
        dropMatObj: {},
      },
      // targetItem: {},
      cart: {},
      selectItem: {},
      greenMatArr: [],
      dropMatArr: [],
      bagSelect: {},
      bagTotal: [],
      bagEquip: {
        weapon: { id: false },
        clothes: { id: false },
        helmet: { id: false },
        bracelet: { id: false },
        shoes: { id: false },
        accessory: { id: false },
      },
      bagInventory: {
        pocket0: {
          id: "WF007",
          sort: "food",
          name: "빵",
          img:
            "https://lh3.google.com/u/0/d/180oAkY10VN8i1hjNW_O8BXo5A1R3d0-2=w1402-h253-iv1",
          count: 2,
          limit: 5,
          location: "pocket0",
        },
        pocket1: {
          id: "WD002",
          sort: "drink",
          name: "물",
          img:
            "https://lh3.google.com/u/0/d/1PbX7TO3Fa0M11FB-aYqxNvoi_XStkvRF=w1402-h684-iv2",
          count: 2,
          limit: 5,
          location: "pocket1",
        },
        pocket2: { id: false },
        pocket3: { id: false },
        pocket4: { id: false },
        pocket5: { id: false },
        pocket6: { id: false },
        pocket7: { id: false },
        pocket8: { id: false },
        pocket9: { id: false },
      },
      customRoute: [],
    };
  },
  getters: {},
  mutations: {
    setCart(state, item) {
      state.cart = item;
    },
    setTargetItems(state, newTargetItems) {
      state.targetItems = newTargetItems;
    },
    getMatGDs(state) {
      state.matGDs = disassembleAllWD(state.targetItems);
    },
    setRoute(state, newRoute) {
      state.customRoute = newRoute;
    },
  },
  actions: {
    setCart({ commit }, item) {
      commit("setCart", item);
    },
    addTargetItems({ commit, state }, newItem) {
      // 녹색, 흰색템 수준의 재료정보 추가(이후 중복재료 체크를 위해)
      const newItemDetails = { ...newItem, ...disassembleGD([newItem.id]) };
      const newTargetItems = [...state.targetItems, newItemDetails];
      commit("setTargetItems", newTargetItems);
      commit("getMatGDs");
    },
    removeTargetItems({ commit }, newTargetItems) {
      commit("setTargetItems", newTargetItems);
      commit("getMatGDs");
    },
    addRoute({ commit, state }, nextArea) {
      const newRoute = [...state.customRoute, nextArea];
      commit("setRoute", newRoute);
    },
    removeRoute({ commit }, newRoute) {
      commit("setRoute", newRoute);
    },
  },
});

export default store;
