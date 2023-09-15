<template>
  <header
    :class="{
      light_mode: !isDarkMode,
      dark_mode: isDarkMode,
    }"
  >
    <div class="container">
      <div class="header__wrapper">
        <div class="logo" @click="pushPath('/')">
          <img
            :src="
              require(`@/assets/imgs/${
                isDarkMode ? 'logo_white.png' : 'logo.png'
              }`)
            "
            alt="Logo"
            class="logo__img"
          />
          <div class="logo__text">RentAvto SPB</div>
        </div>
        <nav>
          <ul class="navigation">
            <li>
              <a
                class="navigation__link"
                :class="{
                  navigation__link__active: currentPath === '/',
                }"
                @click="pushPath('/')"
                >Главная</a
              >
            </li>
            <li>
              <a
                class="navigation__link"
                :class="{ navigation__link__active: currentPath === '/car' }"
                @click="pushPath('/car')"
                >Автомобили</a
              >
            </li>
            <li>
              <a
                class="navigation__link"
                :class="{
                  navigation__link__active: currentPath === '/request',
                }"
                @click="pushPath('/request')"
                >Форма заявки</a
              >
            </li>
            <li>
              <a
                class="navigation__link"
                :class="{ navigation__link__active: currentPath === '/about' }"
                @click="pushPath('/about')"
                >О нас</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
// [] pushPath in pushPath
// [] think how to remove hardcoded path names from the template
//

import { pushPath } from "@/routing.js";

export default {
  props: {
    isDarkMode: {
      type: Boolean,
      required: false,
      default: false,
    },
    currentPath: {
      type: String,
      required: true,
      default: "/",
    },
  },

  methods: {
    pushPath(path) {
      pushPath(path);
    },
  },
};
</script>

<style>
/* Header */

.dark_mode {
  background-color: var(--main-black);
  color: var(--main-white);
}

.light_mode {
  color: var(--main-black);
}

.dark_mode::after,
.light_mode::after {
  content: " ";
  display: block;
  width: 100%;
  height: 1px;
  opacity: 15%;
}

.light_mode::after {
  background-color: var(--main-black);
}

.dark_mode::after {
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
  /* border-bottom: 1px solid rgba(249, 219, 61, 0.7); */
  border-bottom: 1px solid var(--secondary);
}

.navigation__link:hover {
  color: var(--secondary);
  transition: color 0.4s;
}

/* Media Rules */

@media (max-width: 800px) {
  .logo img {
    width: 48px;
  }

  .logo__text {
    font-size: var(--fs-medium);
  }

  .navigation {
    width: 450px;
  }
}

@media (max-width: 550px) {
  .navigation {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: auto;
  }

  .navigation__link {
    display: block;
    padding: 4px;
    margin-bottom: 4px;
  }
}
</style>