<template>
  <div class="button-container">
    <button
      :id="id"
      :title="title"
      :type="type"
      :icon="icon"
      :theme="theme"
      :name="name"
      @click="clickbtn"
      :disabled="disabled"
    >
      <slot />
      <div class="icon-container" :icon="icon" v-if="icon">
        <i></i>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    id: [String, Number],
    name: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "default",
    },
    clickbtn: { type: Function },
    disabled: { type: Boolean, default: false },
  },
})
export default class Button extends Vue {}
</script>

<style scoped lang="scss">
.button-container {
  width: auto;
  min-width: auto;
  height: 36px;
  position: relative;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 100%;
    height: 36px;
    padding: 0 10px;
    font-size: var(--size-normal);
    line-height: var(--size-normal);
    font-weight: 500;
    line-height: 1.5;
    outline: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button:active {
    transform: translateY(4px);
    box-shadow: 0px 0px 2px rgba(26, 141, 95, 0.8);
    transition: all 0.2s;
  }
}

.icon-container {
  display: flex;
  width: 18px;
  height: 18px;
  margin: 0 auto;
  i {
    height: 100%;
    width: 100%;
    background-color: var(--th-text-df);
    opacity: 0.8;
  }
}

.icon-container[icon="edit"] {
  margin-right: -4px;
}

button[theme="default"] {
  color: var(--th-text-df);
  background-color: var(--th-body-bg);
  border: 1px solid;
  border-color: var(--th-border);
  opacity: 0.85;
  transition: all 0.2s ease;

  &:hover {
    color: var(--green);
    border-color: var(--green-active);
    box-shadow: var(--box-shadow-green);
    opacity: 1;
    transition: all 0.2s ease;

    .icon-container {
      i {
        background-color: var(--green);
        opacity: 1;
      }
    }
  }
}

button[theme="green"] {
  color: var(--white);
  background-color: var(--green-active);
  border: 1px solid;
  border-color: var(--green);
  opacity: 0.95;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: var(--box-shadow-green);
    opacity: 1;
    transition: all 0.2s ease;

    .icon-container {
      i {
        background-color: var(--white);
        opacity: 1;
      }
    }
  }
}

button[theme="blue"] {
  color: var(--blue);
  background-color: var(--blue-light);
  border: 1px solid;
  border-color: var(--blue);
  opacity: 0.95;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: var(--box-shadow-blue);
    opacity: 1;
    transition: all 0.2s ease;

    .icon-container {
      i {
        background-color: var(--blue);
        opacity: 1;
      }
    }
  }
}

button[theme="line-blue"] {
  color: var(--th-text-df);
  background-color: var(--th-body-bg);
  border: 1px solid;
  border-color: var(--th-border);
  opacity: 0.85;
  transition: all 0.2s ease;

  &:hover {
    color: var(--blue);
    border-color: var(--blue);
    box-shadow: var(--box-shadow-blue);
    opacity: 1;
    .icon-container {
      i {
        background-color: var(--blue);
        opacity: 1;
      }
    }
  }
}

button[theme="red"] {
  color: var(--red);
  background-color: var(--red-light);
  border: 1px solid;
  border-color: var(--red);
  opacity: 0.95;
  transition: all 0.2s ease;

  .icon-container {
    i {
      background-color: var(--red);
    }
  }

  &:hover {
    box-shadow: var(--box-shadow-red);
    opacity: 1;
    transition: all 0.2s ease;

    .icon-container {
      i {
        opacity: 1;
      }
    }
  }
}

button[theme="line-red"] {
  color: var(--th-text-df);
  background-color: var(--th-body-bg);
  border: 1px solid;
  border-color: var(--th-border);
  opacity: 0.85;
  transition: all 0.2s ease;

  &:hover {
    color: var(--red);
    border-color: var(--red);
    box-shadow: var(--box-shadow-red);
    opacity: 1;
    transition: all 0.2s ease;

    .icon-container {
      i {
        background-color: var(--red);
        opacity: 1;
      }
    }
  }
}

button:disabled {
  opacity: 0.8;
  pointer-events: none;
  transition: all 0.2s ease;
}
</style>
