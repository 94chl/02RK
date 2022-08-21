<template>
  <div class="character">
    <div class="character_header">
      <div class="tabName">
        <h3>
          {{ $t("modal.character") }}
        </h3>
        <div class="buttonBox" data-dropDown="characterSelect">
          <div class="imgTextButtonBox">
            <button
              :class="`${!showItemImg && 'selected'}`"
              @click="onChangeShowItemImg"
            >
              <span>
                <i class="fas fa-font"></i>
              </span>
            </button>
            <button
              :class="`${showItemImg && 'selected'}`"
              @click="onChangeShowItemImg"
            >
              <span>
                <i class="far fa-images"></i>
              </span>
            </button>
          </div>
          <button
            @click="onToggleDropDown"
            :class="`toggleSelectBtn ${
              characterSelectOpen ? 'opened' : 'closed'
            }`"
          >
            <i class="fas fa-angle-double-down"></i>
            <i class="fas fa-angle-double-up"></i>
          </button>
        </div>
      </div>
    </div>

    <div :class="`character_select ${characterSelectOpen ? 'active' : 'hide'}`">
      <div class="optionBox">
        <ul>
          <li
            v-for="(character, index) in characterData.stats"
            :key="`${character.code}-${index}`"
            :class="`option ${
              selectedCharacter?.code === character.code && 'selected'
            }`"
          >
            <button class="optionInfo" @click="selectCharacter(index)">
              <img
                :src="require(`~/img/character/mini/${character.code}.webp`)"
                :alt="`${character.name}_img`"
                :title="`${character.name}_img`"
                v-if="showItemImg"
              />
              <span
                :class="`optionInfo_name ${showItemImg && 'show'}`"
                v-else
                >{{ character.name }}</span
              >
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { characterData, masteryData } from "~/utils/characterTable";

  export default {
    components: {},
    computed: {
      language() {
        return this.$store.state.language;
      },
      characterSelectOpen() {
        return this.$store.state.dropDown.characterSelect;
      },
      showItemImg() {
        return this.$store.state.showItemImg;
      },
      characterData() {
        return characterData;
      },
      selectedCharacter() {
        return this.$store.state.selectedCharacter;
      },
    },
    methods: {
      onChangeShowItemImg() {
        this.$store.dispatch("onChangeShowItemImg");
      },
      onToggleDropDown(e) {
        this.$store.dispatch(
          "onToggleDropDown",
          e.target.closest("div").dataset.dropdown
        );
      },
      selectCharacter(e) {
        const characterIndex = e;
        const selectedCharacter = characterData.stats[characterIndex];
        const levelUpStats = characterData.levelUpStats[characterIndex];
        const characterMastery = masteryData.filter(
          (mastery) => mastery.characterCode === selectedCharacter.code
        );
        selectedCharacter.mastery = characterMastery;
        selectedCharacter.levelUpStats = levelUpStats;
        // levelUp.criticalChance === stats.criticalStrikeChance
        // 일단 유효한 값을 가진 캐릭이 없으니 넘어가자

        this.$store.dispatch("selectCharacter", selectedCharacter);
      },
    },
    mounted() {
      if (!this.selectedCharacter) this.selectCharacter(0);
    },
  };
</script>

<style lang="scss" scoped>
  .character {
    border-radius: 12px;
    border: none;
    background: $color2;
    overflow: hidden;

    .tabName {
      color: $color2;
      height: 25px;
      line-height: 25px;
      padding: 4px;
      padding-right: 0;
    }

    &_header {
      .tabName {
        display: flex;
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
          justify-content: space-between;

          > div {
            display: flex;
          }

          button {
            background: none;
            color: $color3;
            border-radius: 5px;
            @include fasIcon(25px);
            margin-right: 5px;
            &.toggleSelectBtn {
              margin: 0;

              &.opened {
                .fa-angle-double-down {
                  display: none;
                }
                .fa-angle-double-up {
                  display: block;
                }
              }
              &.closed {
                .fa-angle-double-down {
                  display: block;
                }
                .fa-angle-double-up {
                  display: none;
                }
              }
            }

            &:hover,
            &.selected {
              box-shadow: 0 0 12px 2px inset rgba(0, 0, 0, 0.3);
            }
          }
        }
      }
    }

    .character_select {
      .optionBox {
        border-radius: 5px;
        > ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 4px;
          max-height: 196px;
          overflow-y: scroll;
          .option {
            border-radius: 12px;
            width: fit-content;

            &:hover,
            &.selected {
              background: $color3;
            }

            .optionInfo {
              display: flex;
              justify-content: center;
              align-items: center;
              background: none;
              height: 94px;
              min-width: 72px;
              padding: 0;

              > img {
                border-radius: 12px;
              }
              &_name {
                font-weight: 700;
                text-align: center;
                color: $color3;
                background: $color2;
                padding: 8px;
                border-radius: 8px;
              }
            }
          }
        }
      }
    }
  }
</style>
