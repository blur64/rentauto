<template>
  <header
    class="header"
    :class="{ 'header__underline_dark-mode': globalState.isDarkMode }"
  >
    <div class="container">
      <div class="header__wrapper">
        <div class="logo" @click="$router.pushPath('/')">
          <img
            :src="
              require(`@/assets/imgs/${
                globalState.isDarkMode ? 'logo_white.png' : 'logo.png'
              }`)
            "
            alt="Logo"
            class="logo__img"
          />
          <div class="logo__text">RentAvto SPB</div>
        </div>
        <nav>
          <ul class="navigation">
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
import globalState from "../globalState.js";

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
      globalState,
    };
  },
};
</script>

<style>
/* Header */

.header::after {
  content: " ";
  display: block;
  width: 100%;
  height: 1px;
  opacity: 15%;
  background-color: var(--main-black);
}

.header__underline_dark-mode::after {
  background-color: var(--main-white);
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  padding: 24px 0 24px 0;
  align-items: center;
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
  /* margin-bottom: 8px; */

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

@media (max-width: 550px) {
  .navigation {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: auto;
  }

  .logo__text {
    font-size: var(--fs-small);
  }

  .navigation__link {
    display: block;
    padding: 4px;
    margin-bottom: 4px;
  }
}
</style>