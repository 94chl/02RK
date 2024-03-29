import { createStore } from "vuex";
import { disassembleGD, disassembleAllWD } from "~/utils/disassemble";
import { searchById, equippable, weaponSort } from "~/utils/itemTable";
import { pathFinder } from "~/utils/pathFinder";
import { setSessionStorage } from "~/utils/useSessionStorage";
import ampl from "~/utils/amplitude.js";

const store = createStore({
  state() {
    return {
      language: "kr",
      minHeight: 0,
      showItemImg: true,
      targetItems: [],
      matGDs: {
        greenMatObj: {},
        dropMatArr: [],
        dropMatObj: {},
      },
      cart: {},
      selectItem: {},
      greenMatArr: [],
      dropMatArr: [],
      bagSelect: {},
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
          name: { kr: "빵", en: "Bread", ja: "パン", cn: "麵包" },
          img: "https://lh3.google.com/u/0/d/1XUn2lFRhkEaItjBUaW4Efriu7HrOUydi",
          count: 2,
          limit: 6,
          location: "pocket0",
          tobe: [
            "GF003",
            "GF006",
            "GF008",
            "GF013",
            "GF014",
            "GF018",
            "GF021",
            "BF011",
            "BF024",
          ],
        },
        pocket1: {
          id: "WD002",
          sort: "drink",
          name: { kr: "물", en: "Water", ja: "水", cn: "水" },
          img: "https://lh3.google.com/u/0/d/1oBJ2fniH9jpU1gUoI2QD1UY32xdS6GMU",
          count: 2,
          limit: 6,
          location: "pocket1",
          tobe: [
            "GM005",
            "BM002",
            "GD001",
            "GD003",
            "GD005",
            "GD014",
            "GD015",
            "BD011",
            "BF028",
          ],
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
      assemblable: [],
      customRoute: [],
      recommendRoutes: [],
      totalRecommendRoutes: [],
      isActivatedTotalPathFinder: false,
      modal: {
        bag: { show: false, zIndex: 30 },
        totalPathFinder: { show: false, zIndex: 30 },
        status: { show: false, zIndex: 30 },
        craft: { show: false, zIndex: 30 },
        map: { show: false, zIndex: 30 },
        manual: { show: false, zIndex: 30 },
        zIndex: 30,
      },
      dropDown: {
        itemSelect: true,
        initialWeapon: true,
        characterSelect: true,
        status: true,
        unique: true,
      },
      loading: false,
      selectedCharacter: null,
      selectedMastery: null,
      statusEquipKey: "targetItems",
    };
  },
  getters: {},
  mutations: {
    changeMinHeight(state, newMinHeight) {
      state.minHeight = newMinHeight;
    },
    onChangeShowItemImg(state) {
      state.showItemImg = !state.showItemImg;
      state.showItemImg
        ? ampl.log("show item", { to: "img" })
        : ampl.log("show item", { to: "text" });
    },
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
    setEquip(state, newItem) {
      const newBagEquip = { ...state.bagEquip, [newItem.location]: newItem };
      state.bagEquip = newBagEquip;
    },
    dropEquip(state, droppedBag) {
      ampl.log("drop", { target: "equip" });

      const newBagEquip = {
        ...state.bagEquip,
        [droppedBag]: { id: false },
      };
      state.bagEquip = newBagEquip;
    },
    clearEquip(state) {
      ampl.log("clear", { target: "equip" });

      state.bagEquip = {
        weapon: { id: false },
        clothes: { id: false },
        helmet: { id: false },
        bracelet: { id: false },
        shoes: { id: false },
        accessory: { id: false },
      };
    },
    setInventory(state, newItem) {
      const newBagInventory = {
        ...state.bagInventory,
        [newItem.location]: newItem,
      };
      state.bagInventory = newBagInventory;
    },
    dropInventory(state, droppedBag) {
      ampl.log("drop", { target: "inventory" });

      const newBagInventory = {
        ...state.bagInventory,
        [droppedBag]: { id: false },
      };
      state.bagInventory = newBagInventory;
    },
    clearInventory(state) {
      ampl.log("clear", { target: "inventory" });

      state.bagInventory = {
        pocket0: { id: false },
        pocket1: { id: false },
        pocket2: { id: false },
        pocket3: { id: false },
        pocket4: { id: false },
        pocket5: { id: false },
        pocket6: { id: false },
        pocket7: { id: false },
        pocket8: { id: false },
        pocket9: { id: false },
      };
    },
    updateAssemblable(state, newAssemblable) {
      state.assemblable = newAssemblable;
    },
    setInitialWeapon(state, initialWeapon) {
      ampl.log("set initial weapon", initialWeapon);
      state.bagEquip = { ...state.bagEquip, weapon: initialWeapon };
    },
    onToggleModal(state, modalState) {
      ampl.log("toggle modal", {
        name: Object.keys(modalState)[0],
        open: Object.values(modalState)[0],
      });

      state.modal = {
        ...state.modal,
        ...modalState,
        zIndex: state.modal.zIndex + 1,
      };
    },
    onToggleDropDown(state, dropDownState) {
      state.dropDown = { ...state.dropDown, ...dropDownState };
    },
    setRecommendRoutes(state, routesInfo) {
      const { routes, total } = routesInfo;
      if (total) {
        state.totalRecommendRoutes = routes;
        state.isActivatedTotalPathFinder = true;
      } else {
        state.recommendRoutes = routes;
      }
    },
    setSelectedLanguage(state, newLanguage) {
      ampl.log("language change", { from: state.language, to: newLanguage });
      state.language = newLanguage;
    },
    setLoading(state, newLoadingState) {
      state.loading = newLoadingState;
    },
    setSelectedCharacter(state, newSelectedCharacter) {
      state.selectedCharacter = newSelectedCharacter;
    },
    setSelectedMastery(state, newSelectedMastery) {
      state.selectedMastery = newSelectedMastery;
    },
    setStatusEquipKey(state, newStatusEquipKey) {
      state.statusEquipKey = newStatusEquipKey;
    },
  },
  actions: {
    selectLanguage({ commit }, newLanguage) {
      commit("setSelectedLanguage", newLanguage);
    },
    onChangeMinHeight({ commit }, newMinHeight) {
      commit("changeMinHeight", newMinHeight);
    },
    onChangeShowItemImg({ commit }) {
      commit("onChangeShowItemImg");
    },
    setCart({ commit }, item) {
      commit("setCart", item);
    },
    addTargetItems({ commit, state }, newItem) {
      // 녹색, 드랍템 수준의 재료정보 추가(이후 중복재료 체크를 위해)
      const newItemDetails = { ...newItem, ...disassembleGD([newItem.id]) };

      const newTargetItems = [...state.targetItems, newItemDetails];

      ampl.log("add target item", newItem);

      setSessionStorage("02RK_targetItems", newTargetItems);
      commit("setTargetItems", newTargetItems);
      commit("getMatGDs");
    },
    setTargetItems({ commit }, newItems) {
      commit("setTargetItems", newItems);
      commit("getMatGDs");
    },
    removeTargetItems({ commit }, newTargetItems) {
      setSessionStorage("02RK_targetItems", newTargetItems);
      commit("setTargetItems", newTargetItems);
      commit("getMatGDs");
    },
    addRoute({ commit, state }, nextArea) {
      const newRoute = [...state.customRoute, nextArea];
      setSessionStorage("02RK_customRoute", newRoute);
      commit("setRoute", newRoute);
    },
    setRoute({ commit }, newRoute) {
      setSessionStorage("02RK_customRoute", newRoute);
      commit("setRoute", newRoute);
    },
    getItem({ commit, state }, newItemInfo) {
      const newItem = {
        id: newItemInfo.id,
        sort: weaponSort.includes(newItemInfo.sort)
          ? "weapon"
          : newItemInfo.sort,
        sortDetail: newItemInfo.sort,
        name: newItemInfo.name,
        img: newItemInfo.img,
        count: parseInt(newItemInfo.pickup),
        limit: parseInt(newItemInfo.limit),
        tobe: newItemInfo.tobe || false,
      };

      // 장비칸으로
      if (
        equippable.includes(newItem.sort) &&
        !state.bagEquip[newItem.sort].id
      ) {
        newItem.location = newItem.sort;
        commit("setEquip", newItem);

        return;
      }

      // 가방으로
      // 가방에 동일한 아이템을 겹칠 수 있는지 확인
      let bagSpace = Object.keys(state.bagInventory).findIndex(
        (pocket) =>
          state.bagInventory[pocket].id === newItem.id &&
          state.bagInventory[pocket].count < state.bagInventory[pocket].limit
      );

      // 가방에 동일한 아이템을 겹칠 수 없을 때
      if (bagSpace < 0) {
        // 빈 공간 있는지 확인
        bagSpace = Object.keys(state.bagInventory).findIndex(
          (pocket) => !state.bagInventory[pocket].id
        );
        // 가방에 빈 공간이 없을 때
        if (bagSpace < 0) return;

        newItem.location = `pocket${bagSpace}`;
        commit("setInventory", newItem);
      } else {
        const targetPocket = state.bagInventory[`pocket${bagSpace}`];

        // 최대 소지개수 초과 체크
        if (targetPocket.count + newItem.count > targetPocket.limit) {
          const remains = {
            ...newItem,
            count: targetPocket.count + newItem.count - targetPocket.limit,
          };
          targetPocket.count = targetPocket.limit;

          // 빈 공간 있는지 확인
          bagSpace = Object.keys(state.bagInventory).findIndex(
            (pocket) => !state.bagInventory[pocket].id
          );
          // 가방에 빈 공간이 없을 때
          if (bagSpace < 0) return;

          remains.location = `pocket${bagSpace}`;
          commit("setInventory", remains);
        } else {
          targetPocket.count += newItem.count;
        }

        commit("setInventory", targetPocket);
      }
    },
    dropItem({ commit }, dropBag) {
      if (!(parseInt(dropBag[dropBag.length - 1]) + 1)) {
        commit("dropEquip", dropBag);
      } else {
        commit("dropInventory", dropBag);
      }
    },
    clearBag({ commit }, bag) {
      if (bag === "equip") {
        commit("clearEquip");
      } else {
        commit("clearInventory");
      }
    },
    moveItem({ commit, state }, fromTo) {
      const from = equippable.includes(fromTo.from.bag)
        ? state.bagEquip[fromTo.from.bag]
        : state.bagInventory[fromTo.from.bag];
      const to = equippable.includes(fromTo.to.bag)
        ? state.bagEquip[fromTo.to.bag]
        : state.bagInventory[fromTo.to.bag];

      from.location = fromTo.to.bag;
      to.location = fromTo.from.bag;

      // 옮길 아이템 사본
      const newFromTo = [
        JSON.parse(JSON.stringify(from)),
        JSON.parse(JSON.stringify(to)),
      ];

      // 기존 아이템 삭제
      newFromTo.forEach((item) => {
        if (!(parseInt(item.location[item.location.length - 1]) + 1)) {
          commit("dropEquip", item.location);
        } else {
          commit("dropInventory", item.location);
        }
      });
      // 사본을 가방에 배치
      newFromTo.forEach((item) => {
        if (!(parseInt(item.location[item.location.length - 1]) + 1)) {
          commit("setEquip", item);
        } else {
          commit("setInventory", item);
        }
      });
    },
    updateAssemblable({ commit, state }) {
      const bagTotal = Object.values(state.bagEquip)
        .concat(Object.values(state.bagInventory))
        .reduce(
          (acc, bag) => {
            if (bag.id) {
              acc.id.push(bag.id);
              const tobeArr = searchById(bag.id).tobe;
              tobeArr ? (acc.tobe[bag.id] = tobeArr) : null;
            }
            return acc;
          },
          { id: [], tobe: {} }
        );

      const bagTotalId = bagTotal.id;
      const bagTotalToBe = bagTotal.tobe;
      const newAssemblable = {};
      bagTotalId.forEach((matId) => {
        if (bagTotalToBe[matId]) {
          bagTotalToBe[matId].forEach((tobe) => {
            if (!newAssemblable[tobe]) {
              const tobeInfo = searchById(tobe);
              if (
                tobeInfo.material.every((needMat) =>
                  bagTotalId.includes(needMat)
                )
              ) {
                newAssemblable[tobeInfo.id] = tobeInfo;
              }
            }
          });
        }
      });

      ampl.log("update assemblable");
      commit("updateAssemblable", newAssemblable);
    },
    getAssemble({ commit, state }, newAssemble) {
      const bagInfo = {
        Equip: { ...state.bagEquip },
        Inventory: { ...state.bagInventory },
      };

      const needMat = [...newAssemble.material];

      const assembledInfo = {
        id: newAssemble.id,
        sort: weaponSort.includes(newAssemble.sort)
          ? "weapon"
          : newAssemble.sort,
        sortDetail: newAssemble.sort,
        name: newAssemble.name,
        img: newAssemble.img,
        count: parseInt(newAssemble.pickup),
        limit: parseInt(newAssemble.limit),
        tobe: newAssemble.tobe || false,
      };

      // 조합 시 재료 소모 처리
      for (const key of Object.keys(bagInfo)) {
        Object.values(bagInfo[key]).forEach((bagItem) => {
          if (needMat.includes(bagItem.id)) {
            bagItem.count < 2
              ? commit(`drop${key}`, bagItem.location)
              : commit(`set${key}`, {
                  ...bagItem,
                  count: bagItem.count - 1,
                });
            needMat.splice(needMat.indexOf(bagItem.id), 1);
          }
        });
      }

      // if (needMat.length < 1) break;

      // 장비칸으로
      if (
        equippable.includes(assembledInfo.sort) &&
        !state.bagEquip[assembledInfo.sort].id
      ) {
        assembledInfo.location = assembledInfo.sort;

        ampl.log("make assmeble", { to: "Equip", ...assembledInfo });

        commit("setEquip", assembledInfo);

        return;
      }

      // 가방
      // 가방에 동일한 아이템을 겹칠 수 있는지 확인
      let bagSpace = Object.keys(state.bagInventory).findIndex(
        (pocket) =>
          state.bagInventory[pocket].id === assembledInfo.id &&
          state.bagInventory[pocket].count < state.bagInventory[pocket].limit
      );

      // 가방에 동일한 아이템을 겹칠 수 없을 때
      if (bagSpace < 0) {
        // 빈 공간 있는지 확인
        bagSpace = Object.keys(state.bagInventory).findIndex(
          (pocket) => !state.bagInventory[pocket].id
        );
        // 가방에 빈 공간이 없을 때
        if (bagSpace < 0) return;

        assembledInfo.location = `pocket${bagSpace}`;

        ampl.log("make assmeble", { to: "Inventory", ...assembledInfo });

        commit("setInventory", assembledInfo);
      } else {
        const targetPocket = state.bagInventory[`pocket${bagSpace}`];

        if (targetPocket.count + assembledInfo.count > targetPocket.limit) {
          const remains = {
            ...assembledInfo,
            count:
              targetPocket.count + assembledInfo.count - targetPocket.limit,
          };
          targetPocket.count = targetPocket.limit;

          // 빈 공간 있는지 확인
          bagSpace = Object.keys(state.bagInventory).findIndex(
            (pocket) => !state.bagInventory[pocket].id
          );

          // 가방에 빈 공간이 없을 때
          if (bagSpace < 0) return;

          remains.location = `pocket${bagSpace}`;

          commit("setInventory", remains);
        } else {
          targetPocket.count += assembledInfo.count;
        }

        ampl.log("make assmeble", { to: "Inventory", ...assembledInfo });

        commit("setInventory", targetPocket);
      }
    },
    setInitialWeapon({ commit }, initialWeaponId) {
      const initialWeaponInfo = searchById(initialWeaponId);

      const initialWeapon = {
        id: initialWeaponInfo.id,
        sort: "weapon",
        sortDetail: initialWeaponInfo.sort,
        name: initialWeaponInfo.name,
        img: initialWeaponInfo.img,
        count: parseInt(initialWeaponInfo.pickup),
        limit: parseInt(initialWeaponInfo.limit),
        tobe: initialWeaponInfo.tobe || false,
        location: "weapon",
      };

      commit("setInitialWeapon", initialWeapon);
    },
    onToggleModal({ commit, state }, modal) {
      const modalState = {
        [modal]: {
          show: !state.modal[modal].show,
          zIndex: state.modal.zIndex + 1,
        },
      };
      commit("onToggleModal", modalState);
    },
    onToggleDropDown({ commit, state }, dropDown) {
      const dropDownState = { [dropDown]: !state.dropDown[dropDown] };
      commit("onToggleDropDown", dropDownState);
    },
    findRecommendPath({ commit, state }, needDropsInfo) {
      const { needDrops, total } = needDropsInfo;

      if (!needDrops) throw { message: "emptyTargets" };

      const notDroppable = Object.keys(needDrops).filter(
        (dropId) => !searchById(dropId)?.location
      );

      if (notDroppable.length > 0) {
        throw {
          message: "noDropArea",
          items: notDroppable.map((item) => searchById(item).name),
        };
      }

      const bagTotal = {};

      Object.values(state.bagEquip).forEach((item) => {
        if (item.id) bagTotal[item.id] = item.count;
      });
      Object.values(state.bagInventory).forEach((item) => {
        if (item.id) {
          bagTotal[item.id] = bagTotal[item.id]
            ? bagTotal[item.id] + item.count
            : item.count;
        }
      });
      const customRoute = state.customRoute.map((route) => route.id);
      // commit("setLoading", true);
      const routes = pathFinder(customRoute, needDrops, bagTotal);
      // commit("setLoading", false);
      if (routes.length > 0) {
        ampl.log("path finder works", {
          routes: routes.length,
          target: total ? state.targetItems : state.cart,
          total,
        });
        commit("setRecommendRoutes", { routes, total });
      } else {
        ampl.log("path finder cannot find routes");
        throw { message: "cannotFindRoute" };
      }
    },
    selectCharacter({ commit }, newCharacter) {
      commit("setSelectedCharacter", newCharacter);
      commit("setSelectedMastery", newCharacter.mastery[0]);
    },
    selectMastery({ commit }, newMastery) {
      commit("setSelectedMastery", newMastery);
    },
    selectStatusEquipKey({ commit }, newStatusEquipKey) {
      commit("setStatusEquipKey", newStatusEquipKey);
    },
  },
});

export default store;
