<template>
  <div class="modal-container">
    <div class="background-modal" @click="eventOpenModal"></div>
    <div class="modal" :style="width ? 'width: 740px;' : ''">
      <header>
        <div class="container-icon" close @click="eventOpenModal">
          <i class="svg-icon"></i>
        </div>
        <div class="text-container">
          <h3>{{ title }}</h3>
          <p>
            {{ description }}
          </p>
        </div>
      </header>
      <main>
        <form @submit="checkForm" method="post">
          <slot />
        </form>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    title: String,
    description: String,
    width: String,
    eventOpenModal: { type: Function },
    clickbtnSubmit: { type: Function },
  },
  methods: {
    checkForm(e: any) {
      this.clickbtnSubmit(e, e.target.elements);
    },
  },
})
export default class Modal extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes back {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal {
  from {
    margin-top: -50%;
  }
  to {
    margin-top: 0;
  }
}

.modal-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.2);
  height: calc(100vh);
  animation-name: back;
  animation-duration: 1s;
  transition: all 200ms;
  top: 0;
  left: 0;
  overflow: hidden overlay;
  z-index: 10;

  .modal {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
    max-width: 80%;
    width: min-content;
    min-width: 600px;
    height: auto;
    margin: 40px;
    animation-name: modal;
    animation-duration: 0.4s;
    transition: all 200ms;

    header {
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 24px 24px 0 24px;

      .text-container {
        h3 {
          margin: 0;
          padding: 0;
          text-align: center;
          font-weight: 500;
          font-size: 1.125rem;
          line-height: 1.25rem;
          margin-bottom: 8px;
          color: #202124;
        }

        p {
          margin: 0;
          padding: 0;
          text-align: left;
          font-weight: 400;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: #5f6368;
        }
      }
    }

    main {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 16px 24px 16px 24px;
    }
  }
}

.background-modal {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
}

.modal-container .container-icon {
  /*position: absolute;*/
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  min-width: 40px;
  max-height: 40px;
  min-height: 40px;
  border-radius: 50%;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  transition: all 200ms;
}

.modal-container .container-icon[close] {
  position: absolute;
  right: 16px;
  top: 16px;
  background-color: #f9fafa00;
  min-width: 26px;
  min-height: 26px;
  max-width: 26px;
  cursor: pointer;
  transition: all 200ms;
  z-index: 10;
}

.modal-container .container-icon[close]:hover {
  background-color: #f9fafa;
  transition: all 200ms;
}

.modal-container[isErro] .container-icon:not([close]) {
  background-color: #fde8e8;
  transition: all 200ms;
}

.modal-container[isSuccess] .container-icon:not([close]) {
  align-self: center;
  background-color: #f4f8f7;
  margin-bottom: 16px;
  min-width: 50px;
  min-height: 50px;
  transition: all 200ms;
}

.modal-container[isInfo] .container-icon:not([close]) {
  align-self: center;
  background-color: #dee7ff;
  margin-bottom: 16px;
  min-width: 50px;
  min-height: 50px;
  transition: all 200ms;
}

.modal-container .container-icon .svg-icon {
  height: 100%;
  width: 100%;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  transition: all 0.2s;
}

.modal-container .container-icon[close] .svg-icon {
  mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.279 5.5L11 10.221l-.779.779L5.5 6.279.779 11 0 10.221 4.721 5.5 0 .779.779 0 5.5 4.721 10.221 0 11 .779 6.279 5.5z' fill='%23000'/%3E%3C/svg%3E")
    no-repeat 50% 50%;
  width: 10px;
  height: 10px;
  margin-right: 0px;
  background-color: #202124;
  transition: all 0.2s;
}

.modal-container .container-icon[close]:hover .svg-icon {
  background-color: #e02424;
  transition: all 0.2s;
}
</style>
