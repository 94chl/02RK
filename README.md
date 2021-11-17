# 02RK
01RK (https://github.com/94chl/01RK) 의 Vue 리팩토링
**현재 진행 중**

## 리팩토링 차이점

1. 전역 상태 관리
`vuex`를 통해 전역 상태 관리
리팩토링 전에는 하위 컴포넌트 내에서 처리했던 상태들을 전역적으로 관리하여 재사용성이 오름
-> 상태 관리도 용이해짐
ex) 이전에는 가방에서 선택 아이템 정보를 받아오려면,
최상위 컴포넌트까지 올라간 뒤 아이템 선택 컴포넌트까지 내려가서 데이터를 참조하는 복잡한 데이터 흐름이었다.

2. 드래그&드랍 구현
사용자 경험적인 측면에서 드래그&드랍을 구현하지 않았는데, 재고해본 결과 이는 조합기능에만 한정된 단점이라고 판단.
단순한 위치 이동이라면 드래그&드랍이 더 직관적이다.
(이전에는 클릭하여 아이템을 선택한뒤 이동가능한 위치를 선택하면 두 대상의 위치가 뒤바뀌는 형식)
또한, 전역 상태 관리가 가능해진 덕에 로직의 구현도 간편했다.

### 메모
- Vue에서 Scss 전역 변수 적용
Vue는 컴포넌트 별로 스타일을 하기 때문에, 매 컴포넌트마다 변수를 선언하거나 `@import` 해줘야 함
-> 최상위 컴포넌트에서 `@import`해주면 하위 컴포넌트에서 사용할 수 있다고 생각
-> 실패
-> 관련 라이브러리(`vue-cli`) 등이 있었으나, 의존성을 줄이기 위해 `webpack` 설정을 바꿈
-> `webpack.config.js`에서 사용 중이던 `sass-loader`에서 변수를 미리 `@import`
-> 빌드 과정에서 변수가 전역적으로 적용
