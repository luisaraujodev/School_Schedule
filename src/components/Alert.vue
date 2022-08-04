<template>
  <div class="container-alert">
    <div class="background-alert" @click="eventOpenAlert"></div>
    <div class="alert">
      <header>
        <div class="icon-container" icon="close" @click="eventOpenAlert">
          <i class="svg-icon"></i>
        </div>
      </header>
      <main>
        <div class="icon-container" :icon="icon">
          <i class="svg-icon"></i>
        </div>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </main>
      <footer>
        <slot />
      </footer>
    </div>
  </div>
</template>

<script>

export default {
  name: "Alert",
  props: {
    title: String,
    description: String,
    icon: String,
    eventOpenAlert: { type: Function },
  },
};
</script>

<style scoped lang="scss">
/*eslint-disable*/
@keyframes back {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes Popup {
  from {
    margin-top: -50%;
  }
  to {
    margin-top: 0;
  }
}

.container-alert {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  animation-name: back;
  animation-duration: 1s;
  transition: all 200ms;
  z-index: 98;

  .background-alert {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.2);
  }
}

.container-alert .alert {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  max-width: 400px;
  min-width: 240px;
  animation-name: Popup;
  animation-duration: 0.4s;
  transition: all 200ms;
  z-index: 1;

  header {
    display: flex;
    position: relative;

    .icon-container[icon="close"] {
      position: absolute;
      right: 16px;
      top: 16px;
      background-color: #f9fafa00;
      min-width: 26px;
      min-height: 26px;
      max-width: 26px;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.2s;
    }

    .icon-container[icon="close"]:hover {
      background-color: #f9fafa;
      transition: background 0.2s;
      i {
        background-color: #e02424;
        transition: background 0.2s;
      }
    }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 16px;

    .icon-container {
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-bottom: 16px;
      transition: background 0.2s;
      i {
        width: 22px;
        height: 22px;
      }
    }

    .icon-container[icon="info"] {
      background-color: var(--blue-light);
      i {
        background-color: var(--blue);
      }
    }

    .icon-container[icon="succes"] {
      background-color: var(--green-light);
      i {
        background-color: var(--green);
      }
    }

    .icon-container[icon="error"] {
      background-color: var(--red-light);
      i {
        background-color: var(--red);
      }
    }

    h3 {
      margin: 0;
      padding: 0;
      text-align: left;
      font-weight: 500;
      font-size: var(--size-normal);
      margin-bottom: 8px;
      color: var(--th-text-df);
    }

    p {
      margin: 0;
      padding: 0;
      text-align: left;
      font-weight: 400;
      font-size: var(--size-medium);
      line-height: var(--size-normal);
      color: var(--th-text-desc);
    }
  }

  footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    align-items: center;
    padding: 12px 24px;
    background-color: #f9fafa;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
}

.icon-container {
  display: flex;
  width: 18px;
  height: 18px;

  i {
    height: 100%;
    width: 100%;
    background-color: var(--th-text-desc);
  }
}
</style>
