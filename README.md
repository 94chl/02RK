# 02RK

**배포 링크** : https://94chl.github.io/02RK/  
01RK (https://github.com/94chl/01RK) 의 Vue 리팩토링

## 사용방법

1. **아이템 선택**  
   분류별, 종류별로 정리된 목록에서 원하는 아이템을 선택가능  
   추가 버튼 클릭시 현재 정보가 보여지는 아이템을 Target Items에 추가

2. **아이템 정보**  
   선택된 아이템의 정보를 표시

- 해당 아이템의 상위/하위 아이템 버튼 클릭시, 선택된 상위/하위 아이템 정보로 이동
- 해당 아이템의 최소 루트를 선택된 루트를 참조하고 탐색하여 추천
  - 토글 버튼을 통해 탐색한 루트의 상세 정보 확인 가능

3. **필요 드랍템 표시**  
   Target Items에 담긴 아이템을 만들기 위해서 필요한 재료들을 드랍템 수준으로 나열

4. **지역 정보**  
   해당 지역의 정보를 표시

- 해당 지역의 특수 기능 표시(하이퍼루프, 부활)
- 해당 지역에서 드랍되는 아이템을 표시
  - 기본적으로 숨겨져있으며, 토글을 통해 표시가능
  - Target Items의 필요 드랍템은 바로 드러나며 붉은색으로 표시
- 지역명 탭 클릭 시, 사용자 지정 루트로써 담음
  - 해당 사용자 지정 루트는 최단 루트 추천 기능에서 참조

5. **가방**  
   지역탭에서 선택한 재료를 습득, 관리하여 실제 파밍 경험을 제공

- 기본적으로 이미지로 아이템을 표시하지만, 텍스트로 표시하는 기능도 제공
  - 이미지가 작거나, 이미지로 아이템 정보를 식별하지 못하는 경우를 고려
- 가방은 6칸의 장비칸과 10칸의 가방칸이 제공(인게임과 동일)
- 최초 무기
  - 실제로 게임에서 최초 지급되는 무기를 선택하여 장비탭의 무기칸에 장비
  - 무기칸에 이미 무기가 장비되어있다면 confirm을 통해 교체함
- 아이템 습득
  - 아이템을 가방에 보관하는 기능
  - 지역탭에서 재료를 클릭하여 습득
  - 시작무기탭에서 각 무기 버튼을 클릭하여 습득
  - assembles탭에서 조합기능을 통해 습득
- 아이템 이동
  - 가방 내부의 자리 이동 기능
  - 드래그&드롭 기능으로 구현(이동이 불가능한 경우에는 기능 비활성)
  - 장비칸 <-> 가방칸의 이동은, 가방칸의 아이템이 해당 장비칸에 장비가능할 경우만 가능
  - 모바일에서는 구동x -> 터치이벤트라 draggable 속성이 적용되지 않는다.
- 아이템 버리기
  - 가방 내부의 아이템을 버리는 기능
  - 해당 아이템 우측의 붉은 X 버튼을 통해 구현
  - 각 이름탭 옆의 휴지통 버튼을 통해, 해당 칸의 모든 아이템 버리기 가능
- 아이템 조합
  - 가방 내부의 아이템을 통해 상위 아이템을 만드는 기능
  - 조합 가능한 아이템이 있을 시, 하단의 assembles에 상위 아이템을 제시
  - 조합 가능한 상위 아이템을 클릭 시, 가방 내부의 재료를 소모하여 상위 아이템을 제작
    - 가방 내부에 상위 아이템을 보관할 자리가 부족할 시, 재료는 정상적으로 소모되며 조합된 아이템은 가능한 수량만 추가되고 나머지는 버려진다
    - 가방 내부에 상위 아이템을 보관할 자리가 없을 시, 재료만 소모되고 조합된 아이템을 전부 버려진다

6. **최단 루트 추천**

Target Items, 가방, 사용자 지정 루트를 참조하여 최단 루트를 탐색하여 제시

- Target Items을 참조하여 아이템들을 조합하기 위해서 필요한 드랍템을 취합
- 가방을 참조하여 앞서 취합한 필요한 드랍템에서 이미 가지고 있는 아이템을 제외
  - 드랍템만 참조하기에, 중간 과정의 아이템을 가진 경우에는 참조하지 않음
- 추려진 드랍템을 참조하여 지역 정보에서 해당 드랍템들을 습득할 수 있는 지역을 가려냄
- 가장 많은 드랍템을 얻을 수 있는 지역을 우선시하여 탐색 시작
  - 사용자가 지역탭에서 미리 선택한 지역이 있다면, 해당 지역을 우선 탐색
- DFS로 탐색하기 때문에 계산 시간이 길다

## 리팩토링 차이점

1. 전역 상태 관리  
   `vuex`를 통해 전역 상태 관리  
   리팩토링 전에는 하위 컴포넌트 내에서 처리했던 상태들을 전역적으로 관리하여 재사용성이 오름  
   -> 상태 관리도 용이해짐  
   ex) 이전에는 가방에서 선택 아이템 정보를 받아오려면,  
   최상위 컴포넌트까지 올라간 뒤 아이템 선택 컴포넌트까지 내려가서 데이터를 참조하는 복잡한 데이터 흐름이었다.

2. 가방 드래그&드랍 구현  
   사용자 경험적인 측면에서 드래그&드랍을 구현하지 않았는데, 재고해본 결과 이는 조합기능에만 한정된 단점이라고 판단.  
   단순한 위치 이동이라면 드래그&드랍이 더 직관적이다.  
   (이전에는 클릭하여 아이템을 선택한뒤 이동가능한 위치를 선택하면 두 대상의 위치가 뒤바뀌는 형식)  
   또한, 전역 상태 관리가 가능해진 덕에 로직의 구현도 간편했다.  
   -> 모바일에서는 구동x -> 터치이벤트라 draggable 속성이 적용되지 않는다.

3. 가방 아이템 이미지/텍스트 변경 기능 추가  
   가방에서 아이템을 이미지로만 표시했으나, 이미지로 아이템을 식별하지 못하는 경우를 상정하여 텍스트로도 표시할 수 있는 기능을 추가

4. 로컬 이미지 제거  
   프로젝트 무게를 가볍게 하기 위해 로컬 이미지 파일을 전부 제거  
   -> 이미지 로딩이 눈에 밟힌다  (-> 로고는 로컬이미지 사용하기로 변경 22.01.10)
   -> `webpack url-loader` 채용했는데 큰 효과는 안 보임
   
5. 장착 장비 스테이터스 표시 기능 추가
   장착한 장비의 스테이터스를 종합적으로 표시하는 기능을 추가
      -> 사용자가 원하는 장비들의 수치정보를 한눈에 파악가능할 것으로 예상
   스테이터스 참조를 타겟 아이템 or 가방의 장착장비 중 어떤 것으로 할지도 고민
      => 가방의 장착장비로 결정
      (1) 타겟 아이템은 갯수와 중복부위에 대한 제한을 없애고, 자유롭게 선택하는 일종의 장바구니라고 기획을 잡았기에 제외
      (2) 장착 장비를 참조하면 중간 과정에서의 스테이터스도 체크할 수 있기에, 도움이 될 것이라고 판단
   아이템 정보 미리보기 탭에서 해당 아이템을 바로 가방에 담을 수 있는 버튼을 추가
      -> 장착 장비의 스테이터스 참조의 원활성을 위함

## 메모

- Vue에서 Scss 전역 변수 적용  
  Vue는 컴포넌트 별로 스타일을 하기 때문에, 매 컴포넌트마다 변수를 선언하거나 `@import` 해줘야 함  
  -> 최상위 컴포넌트에서 `@import`해주면 하위 컴포넌트에서 사용할 수 있다고 생각  
  -> 실패  
  -> 관련 라이브러리(`vue-cli`) 등이 있었으나, 의존성을 줄이기 위해 `webpack` 설정을 바꿈  
  -> `webpack.config.js`에서 사용 중이던 `sass-loader`에서 변수를 미리 `@import`  
  -> 빌드 과정에서 변수가 전역적으로 적용
