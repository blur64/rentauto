<template>
  <header class="header">
    <!-- <header
    class="header"
    :class="{
      'dark-mode__for-layout': globalState.isDarkMode,
    }"
  > -->
    <div class="container">
      <div class="header__content-wrapper">
        <div class="logo" @click="$router.pushPath('/')">
          <img
            :src="require(`@/assets/imgs/logo_white.png`)"
            alt="Logo"
            class="logo__img"
          />
          <!-- <img
            :src="
              require(`@/assets/imgs/${
                globalState.isDarkMode ? 'logo_white.png' : 'logo.png'
              }`)
            "
            alt="Logo"
            class="logo__img"
          /> -->
          <div class="logo__text">RentAvto SPB</div>
        </div>
        <nav class="navigation__wrapper">
          <div
            class="burger-menu"
            @click="isBurgerMenuOpened = !isBurgerMenuOpened"
          >
            <div
              class="burder-menu__body"
              :class="{ 'burger-rotate': isBurgerMenuOpened }"
            ></div>
            <!-- <div
              class="burder-menu__body"
              :class="{
                'burger-rotate': isBurgerMenuOpened,
                'dark-mode__for-items': globalState.isDarkMode,
              }"
            ></div> -->
          </div>
          <ul
            class="navigation"
            :class="{ 'navigation__side-opened': isBurgerMenuOpened }"
          >
            <!-- <ul
            class="navigation"
            :class="{
              'navigation__side-opened': isBurgerMenuOpened,
              'dark-mode__for-layout': globalState.isDarkMode,
            }"
          > -->
            <li v-for="(navDataItem, idx) of navigationData" :key="idx">
              <a
                class="navigation__link"
                :class="{
                  navigation__link__active: currentPath === navDataItem.path,
                }"
                @click="$router.pushPath(navDataItem.path)"
                >{{ navDataItem.title }}</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
// import globalState from "../globalState.js";

export default {
  props: {
    currentPath: {
      type: String,
      required: true,
      default: "/",
    },
    navigationData: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
      isBurgerMenuOpened: false,

      // globalState,
    };
  },

  watch: {
    currentPath() {
      this.isBurgerMenuOpened = false;
    },
  },
};
</script>

<style>
/* Header */

.header {
  background-color: var(--main-white);
  border-bottom: 1px solid var(--border-secondary);
}

.header.dark-mode__for-layout {
  border-bottom-color: var(--main-white-light);
}

.header__content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 86px;
}

/* Header Logo */

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo__img {
  width: 48px;
}

.logo__text {
  margin-left: 12px;

  font-size: var(--fs-medium);
  font-weight: var(--w-bold);
}

/* Header Navigation */

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 524px;
}

.navigation__link {
  padding: 33px 16px 33px 16px;

  font-size: var(--fs-small);
  font-weight: var(--w-medium);

  color: inherit;
  cursor: pointer;
}

.navigation__link__active {
  border-bottom: 1px solid var(--secondary);
}

.navigation__link:hover {
  color: var(--secondary);
  transition: color 0.4s;
}

/* Burger Big Mack */

.burger-menu {
  cursor: pointer;
  padding: 16px 10px;
  display: none;
}

.burder-menu__body {
  width: 34px;
  height: 4px;
  background-color: var(--main-black);
  border-radius: 8px;
  transition: background-color 0.45s;
}

.burder-menu__body::after,
.burder-menu__body::before {
  content: "";
  display: block;
  position: relative;
  width: 34px;
  height: 4px;
  background-color: var(--main-black);
  border-radius: 8px;
  transition: transform 0.5s;
}

.burder-menu__body::after {
  top: 6px;
  transform-origin: top left;
}

.burder-menu__body::before {
  top: -10px;
  transform-origin: bottom left;
}

.burger-rotate {
  background-color: transparent !important;
}

.burger-rotate::after {
  background-color: var(--main-black);
  transform: rotate(-35deg);
}

.burger-rotate::before {
  background-color: var(--main-black);
  transform: rotate(35deg);
}

/* Media Rules */

@media (max-width: 1000px) {
  .navigation {
    width: 440px;
  }

  .navigation__link {
    padding: 33px 12px 33px 12px;
  }
}

@media (max-width: 800px) {
  .logo img {
    width: 38px;
  }

  .navigation {
    width: 420px;
  }

  .navigation__link {
    padding: 29px 12px 28px 12px;
  }
}

@media (max-width: 748px) {
  .header {
    position: sticky;
    z-index: 2;
    top: 0;
  }

  .burger-menu {
    display: block;
  }

  .navigation {
    display: block;
    position: fixed;
    top: 87px;
    right: 0;
    height: calc(100% - 86px);
    background-color: var(--main-white);
    transform: translateX(100%);
    transition: transform 0.5s ease-out;
    border-left: 1px solid var(--border-secondary);
    width: 300px;
  }

  .navigation.dark-mode__for-layout {
    border-left: 1px solid var(--main-white-light);
  }

  .navigation__side-opened {
    transform: translateX(0%);
  }

  .navigation__link {
    font-size: var(--fs-small);
    text-align: center;
    display: block;
    padding: 16px;
  }
}

@media (max-width: 550px) {
  .navigation {
    width: 100%;
  }

  .logo__text {
    font-size: var(--fs-small);
  }
}
</style>