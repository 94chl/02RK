import { areaData } from "./itemTable.js";

// 지역 드랍테이블, 남은 드랍 갯수를 포인트로 변환
function setAreaPoint(area, needs) {
  const result = {};
  Object.keys(area).forEach((areaId) => {
    const areaDrop = area[areaId].drop.filter((dropId) => needs[dropId]);

    if (areaDrop.length > 0) {
      result[areaId] = {
        id: areaId,
        name: area[areaId].name,
        adjacent: area[areaId].adjacent,
        drop: areaDrop,
        point: areaDrop.length,
      };
    }
  });
  return result;
}

// 필요 재료중 소지템, 공통드랍템 제거
export function checkNeedsWithBags(needs, bag, checkCommon) {
  const result = JSON.parse(JSON.stringify(needs));

  if (checkCommon) {
    Object.keys(result).forEach((itemId) => {
      if (areaData.A000.drop.includes(itemId)) result[itemId] = 0;
    });
  }

  Object.keys(bag).forEach((itemId) => {
    if (result[itemId])
      result[itemId] =
        result[itemId] < bag[itemId] ? 0 : result[itemId] - bag[itemId];
  });

  return result;
}

//파라미터 = 아이템 아이디
export function pathFinder(route, needsNow, bagNow) {
  // 맵(이동가능 여부)
  // 맵(드랍테이블)
  let mapInfo = JSON.parse(JSON.stringify(areaData));

  // 선점 지역 체크
  const routeStack = [...route];

  const needsObj = checkNeedsWithBags(needsNow, bagNow, true);
  const needs = Object.keys(needsObj).reduce((newObj, itemId) => {
    newObj[itemId] = needsObj[itemId] ? true : false;
    return newObj;
  }, {});

  // 선점지역이 있으면, 해당지역 드랍템을 필요한 드랍템 목록에서 제거
  if (routeStack.length > 0) {
    routeStack.forEach((area) => {
      mapInfo[area].drop.forEach((drop) => {
        if (needs[drop]) needs[drop] = false;
      });
    });
  }

  // 맵(드랍테이블)에서 필요한 드랍템만 필터링
  mapInfo = setAreaPoint(mapInfo, needs);

  // 시작점 고르기 : 필요한 드랍템이 많이 나오는 지역순(1개 이상)
  const startPoint = Object.keys(mapInfo)
    .reduce((acc, areaId) => {
      if (routeStack.length > 0) {
        if (
          areaData[routeStack[routeStack.length - 1]].adjacent.includes(areaId)
        ) {
          acc.push({ ...mapInfo[areaId], id: areaId });
        }
      } else {
        acc.push({ ...mapInfo[areaId], id: areaId });
      }
      return acc;
    }, [])
    .sort((a, b) => b.point - a.point);

  // 최단 경로 탐색
  let shortestRoute = 10;
  let foundRoutes = [];

  function dfs(needs, start, route) {
    const routeT = [...route, start.id];
    if (routeT.length > shortestRoute) return;

    const needsT = { ...needs };
    start.drop.forEach((dropId) => (needsT[dropId] = false));

    const needsNow = Object.values(needsT).filter((isNeeded) => isNeeded);

    if (!needsNow.length && routeT.length <= shortestRoute) {
      const foundRoute = routeT.map((routeId) => areaData[routeId]);
      if (foundRoute.length < shortestRoute) {
        const newFoundRoutes = [];
        newFoundRoutes.push(foundRoute);
        foundRoutes = newFoundRoutes;
        shortestRoute = foundRoute.length;
      } else {
        foundRoutes.push(foundRoute);
      }
      return;
    }

    for (let i = 0; i < start.adjacent.length; i++) {
      const nextArea = start.adjacent[i];
      if (mapInfo[nextArea] && !routeT.includes(nextArea)) {
        dfs(needsT, mapInfo[nextArea], routeT);
      }
    }
  }

  startPoint.forEach((area) => {
    dfs(needs, area, routeStack);
  });

  return foundRoutes;
}
