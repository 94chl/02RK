import { createStore } from "vuex";
import {
  disassembleGD,
  disassembleWD,
  disassembleAllWD,
} from "~/utils/disassemble";
import { searchById, equippable, weaponSort } from "~/utils/itemTable";
import { pathFinder } from "~/utils/pathFinder";
import { setSessionStorage } from "~/utils/useSessionStorage";

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
          name: "빵",
          img: "https://lh3.google.com/u/0/d/1XUn2lFRhkEaItjBUaW4Efriu7HrOUydi",
          count: 2,
          limit: 5,
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
          name: "물",
          img: "https://lh3.google.com/u/0/d/1oBJ2fniH9jpU1gUoI2QD1UY32xdS6GMU",
          count: 2,
          limit: 5,
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
      toggleModal: {
        bag: false,
        totalPathFinder: false,
        initialWeapon: true,
        status: false,
        craft: false,
        map: false,
      },
    };
  },
  getters: {},
  mutations: {
    changeMinHeight(state, newMinHeight) {
      state.minHeight = newMinHeight;
    },
    onChangeShowItemImg(state) {
      state.showItemImg = !state.showItemImg;
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
      const newBagEquip = {
        ...state.bagEquip,
        [droppedBag]: { id: false },
      };
      state.bagEquip = newBagEquip;
    },
    clearEquip(state) {
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
      const newBagInventory = {
        ...state.bagInventory,
        [droppedBag]: { id: false },
      };
      state.bagInventory = newBagInventory;
    },
    clearInventory(state) {
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
      state.bagEquip = { ...state.bagEquip, weapon: initialWeapon };
    },
    onToggleModal(state, modalState) {
      state.toggleModal = { ...state.toggleModal, ...modalState };
    },
    showModal(state, modalState) {
      state.toggleModal = { ...state.toggleModal, ...modalState };
    },
    setRecommendRoutes(state, routesInfo) {
      const { routes, total } = routesInfo;
      total
        ? (state.totalRecommendRoutes = routes)
        : (state.recommendRoutes = routes);
    },
  },
  actions: {
    onChangeMinHeight({ commit }, newMinHeight) {
      commit("changeMinHeight", newMinHeight);
    },
    onChangeShowItemImg({ commit }) {
      commit("onChangeShowItemImg");
    },
    setCart({ commit }, item) {
      const itemInfo = searchById(item.id);
      commit("setCart", itemInfo);
    },
    addTargetItems({ commit, state }, newItem) {
      // 녹색, 드랍템 수준의 재료정보 추가(이후 중복재료 체크를 위해)
      const newItemDetails = { ...newItem, ...disassembleGD([newItem.id]) };

      const newTargetItems = [...state.targetItems, newItemDetails];
      setSessionStorage("02RK_targetItems", newTargetItems);
      commit("setTargetItems", newTargetItems);
      commit("getMatGDs");
    },
    setTargetItems({ commit, state }, newItems) {
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
    getItem({ commit, state }, newItemId) {
      const newItemInfo = searchById(newItemId);
      const newItem = {
        id: newItemInfo.id,
        sort: weaponSort.includes(newItemInfo.sort)
          ? "weapon"
          : newItemInfo.sort,
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
      bag === "equip" ? commit("clearEquip") : commit("clearInventory");
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

        commit("setInventory", targetPocket);
      }
    },
    setInitialWeapon({ commit }, initialWeaponId) {
      const initialWeaponInfo = searchById(initialWeaponId);

      const initialWeapon = {
        id: initialWeaponInfo.id,
        sort: "weapon",
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
      const modalState = { [modal]: !state.toggleModal[modal] };
      commit("onToggleModal", modalState);
    },
    showModal({ commit }, modal) {
      const modalState = { [modal]: true };
      commit("showModal", modalState);
    },
    findRecommendPath({ commit, state }, needDropsInfo) {
      const { needDrops, total } = needDropsInfo;
      const notDroppable = needDrops.filter((drop) => {
        const dropInfo = searchById(drop);
        return !dropInfo.location;
      });
      if (notDroppable.length > 0) {
        throw `${
          searchById(notDroppable[0]).name
        }(은)는 드랍되지 않는 아이템입니다`;
      }
      const bagEquip = Object.values(state.bagEquip).reduce((acc, cur) => {
        if (cur.id) acc.push(cur.id);
        return acc;
      }, []);
      const bagInventory = Object.values(state.bagInventory).reduce(
        (acc, cur) => {
          if (cur.id) acc.push(cur.id);
          return acc;
        },
        []
      );
      const bagTotal = Object.keys(
        disassembleWD(bagEquip.concat(bagInventory)).dropMatId
      );
      const routes = pathFinder(state.customRoute, needDrops, bagTotal);
      if (routes.length > 0) {
        commit("setRecommendRoutes", { routes, total });
      } else {
        throw "최단 루트를 발견하지 못했습니다. 혹은 이미 필요한 재료를 소지하고 있을 수도 있습니다.";
      }
    },
  },
});

export default store;
