<template>
  <header class="header">
    <div class="container">
      <div class="header__content-wrapper">
        <div class="logo" @click="$router.push('/')">
          <div class="logo__img-container"></div>
          <div class="logo__text">RentAuto SPB</div>
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
          </div>
          <ul
            class="navigation"
            :class="{ 'navigation__side-opened': isBurgerMenuOpened }"
          >
            <li
              v-for="(navDataItem, idx) of require('../api').navigationData"
              :key="idx"
            >
              <a
                class="navigation__link"
                :class="{
                  navigation__link__active: $route.path === navDataItem.path,
                }"
                @click="$router.push(navDataItem.path)"
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
export default {
  data() {
    return {
      isBurgerMenuOpened: false,
    };
  },
  watch: {
    "$route.path"() {
      this.isBurgerMenuOpened = false;
    },
  },
};
</script>

<style>
/* Header */

.header {
  border-bottom: 1px solid var(--border-secondary);
  background-color: var(--background-primary);
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
  align-self: stretch;
}

.logo__img-container {
  width: 48px;
  height: 38px;
  background-image: var(--logo-img-url);
  background-size: contain;
  background-repeat: no-repeat;
}

.logo__text {
  margin-left: 12px;

  font-size: var(--fs-medium);
  font-weight: var(--w-bold);
}

/* Header Navigation */

.navigation__wrapper {
  /* align-self: stretch; */
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 524px;
  align-content: stretch;
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
  background-color: var(--background-primary-inverse);
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
  background-color: var(--background-primary-inverse);
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
  background-color: var(--background-primary-inverse);
  transform: rotate(-35deg);
}

.burger-rotate::before {
  background-color: var(--background-primary-inverse);
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
    background-color: var(--background-primary);
    transform: translateX(100%);
    transition: transform 0.5s ease-out;
    border-left: 1px solid var(--border-secondary);
    width: 300px;
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