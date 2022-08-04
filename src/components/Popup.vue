<!--eslint-disable-->
<template>
  <div
    class="container-Popup"
    :isErro="isErro"
    :isInfo="isInfo"
    :isSuccess="isSuccess"
  >
    <div class="background-Popup" @click="eventOpenPopup"></div>
    <div class="container-msg">
      <div class="container-itens">
        <div class="container-icon" close @click="eventOpenPopup">
          <div class="svg-icon"></div>
        </div>
        <div class="container-icon">
          <div class="svg-icon"></div>
        </div>
        <div class="container-text">
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </div>
      </div>
      <div class="container-button">
        <button
          @click="eventOpenPopup"
          isDefault
          :style="isDefault ? '' : 'display:none'"
        >
          Cancelar
        </button>
        <button v-on:click="eventOpenAction">{{ textButton }}</button>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: "Popup",
  props: {
    eventOpenPopup: { type: Function },
    eventOpenAction: { type: Function },
    isErro: Boolean,
    isInfo: Boolean,
    isSuccess: Boolean,
    isDefault: Boolean,
    title: String,
    description: String,
    textButton: String,
  },
};
</script>

<style scoped>
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

.container-Popup {
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
}

.background-Popup {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.2);
}

.container-Popup .container-msg {
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
  z-index: 99;
}

.container-Popup .container-msg .container-itens {
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 24px 24px 16px;
}

.container-Popup[isSuccess="true"] .container-msg .container-itens {
  flex-direction: column;
}

.container-Popup[isInfo="true"] .container-msg .container-itens {
  flex-direction: column;
}

.container-Popup .container-msg .container-itens h3 {
  margin: 0;
  padding: 0;
  text-align: left;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.25rem;
  margin-bottom: 8px;
  color: #202124;
}
.container-Popup[isSuccess="true"] .container-msg .container-itens h3 {
  text-align: center;
}

.container-Popup[isInfo="true"] .container-msg .container-itens h3 {
  text-align: center;
}

.container-Popup .container-msg .container-itens p {
  margin: 0;
  padding: 0;
  text-align: left;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;
  /*word-break: break-all;*/
  color: #5f6368;
}

.container-Popup .container-msg .container-itens .container-text {
  padding-left: 16px;
}

.container-Popup[isSuccess="True"]
  .container-msg
  .container-itens
  .container-text {
  padding-left: 0px;
}

.container-Popup[isInfo="True"]
  .container-msg
  .container-itens
  .container-text {
  padding-left: 0px;
}

.container-Popup .container-msg .container-button {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 24px;
  background-color: #f9fafa;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.container-Popup .container-msg .container-button button:last-child {
  margin-right: 0px;
}

.container-Popup .container-msg .container-button button {
  margin-right: 10px;
}

.container-Popup .container-msg .container-button button {
  display: flex;
  align-items: center;
  width: auto;
  height: 100%;
  padding: 8px 16px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  line-height: 1.5;
  outline: none;
  border: 1px solid;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.container-Popup[isSuccess="true"] .container-msg .container-button button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.container-Popup[isInfo="true"] .container-msg .container-button button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.container-Popup .container-msg .container-button button[isDefault="true"] {
  color: #202124;
  background-color: #ffffff;
  border-color: #dadce0;
  transition: all 0.2s ease;
}

.container-Popup
  .container-msg
  .container-button
  button[isDefault="true"]:hover {
  background-color: #f4f8f7;
  box-shadow: 0px 0px 5px rgb(26, 141, 95, 0.4);
  color: #1a8d5f;
  border-color: #1a8d5f;
  transition: all 0.2s;
}

.container-Popup[isErro="true"]
  .container-msg
  .container-button
  button:not([isDefault="true"]) {
  color: #fff;
  background-color: #e02424;
  border-color: #e02424;
  transition: all 0.2s ease;
}

.container-Popup[isErro="true"]
  .container-msg
  .container-button
  button:not([isDefault="true"]):hover {
  box-shadow: 0px 0px 5px rgba(224, 36, 36, 0.5);
  background-color: rgb(224, 36, 36, 0.8);
  transition: all 0.2s;
}

.container-Popup[isSuccess="true"]
  .container-msg
  .container-button
  button:not([isDefault="true"]) {
  color: #fff;
  background-color: #1a8d5f;
  border-color: #1a8d5f;
  transition: all 0.2s ease;
}

.container-Popup[isSuccess="true"]
  .container-msg
  .container-button
  button:not([isDefault="true"]):hover {
  box-shadow: 0px 0px 5px rgba(26, 141, 95, 0.5);
  background-color: rgba(26, 141, 95, 0.8);
  transition: all 0.2s;
}

.container-Popup[isInfo="true"]
  .container-msg
  .container-button
  button:not([isDefault="true"]) {
  color: #fff;
  background-color: #2b5be9;
  border-color: #2b99ea;
  transition: all 0.2s ease;
}

.container-Popup[isInfo="true"]
  .container-msg
  .container-button
  button:not([isDefault="true"]):hover {
  box-shadow: 0px 0px 5px rgba(43, 91, 233, 0.5);
  background-color: rgba(43, 91, 233, 0.8);
  transition: all 0.2s;
}

.container-Popup .container-icon {
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

.container-Popup .container-icon[close] {
  position: absolute;
  right: 16px;
  top: 16px;
  background-color: #f9fafa00;
  min-width: 26px;
  min-height: 26px;
  max-width: 26px;
  cursor: pointer;
  transition: all 200ms;
  z-index: 99;
}

.container-Popup .container-icon[close]:hover {
  background-color: #f9fafa;
  transition: all 200ms;
}

.container-Popup[isErro="true"] .container-icon:not([close]) {
  background-color: #fde8e8;
  transition: all 200ms;
}

.container-Popup[isSuccess="true"] .container-icon:not([close]) {
  align-self: center;
  background-color: #f4f8f7;
  margin-bottom: 16px;
  min-width: 50px;
  min-height: 50px;
  transition: all 200ms;
}

.container-Popup[isInfo="true"] .container-icon:not([close]) {
  align-self: center;
  background-color: #dee7ff;
  margin-bottom: 16px;
  min-width: 50px;
  min-height: 50px;
  transition: all 200ms;
}

.container-Popup .container-icon .svg-icon {
  height: 100%;
  width: 100%;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  transition: all 0.2s;
}

.container-Popup .container-icon[close] .svg-icon {
  mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.279 5.5L11 10.221l-.779.779L5.5 6.279.779 11 0 10.221 4.721 5.5 0 .779.779 0 5.5 4.721 10.221 0 11 .779 6.279 5.5z' fill='%23000'/%3E%3C/svg%3E")
    no-repeat 50% 50%;
  width: 10px;
  height: 10px;
  margin-right: 0px;
  background-color: #202124;
  transition: all 0.2s;
}

.container-Popup .container-icon[close]:hover .svg-icon {
  background-color: #e02424;
  transition: all 0.2s;
}

.container-Popup[isErro="true"] .container-icon:not([close]) .svg-icon {
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat 50% 50%;
  width: 22px;
  margin-right: 0px;
  background-color: #e02424;
  transition: all 0.2s;
}

.container-Popup[isSuccess="true"] .container-icon:not([close]) .svg-icon {
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'/%3E%3C/svg%3E")
    no-repeat 50% 50%;
  width: 22px;
  height: 22px;
  background-color: #1a8d5f;
  transition: all 0.2s;
}

.container-Popup[isInfo="true"] .container-icon:not([close]) .svg-icon {
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 512'%3E%3Cpath d='M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z'/%3E%3C/svg%3E")
    no-repeat 50% 50%;
  width: 22px;
  height: 22px;
  background-color: #2b5be9;
  transition: all 0.2s;
}
</style>