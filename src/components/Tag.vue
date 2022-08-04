<template>
  <div class="container-tags">
    <span>
      {{ name }}
    </span>
    <div
      class="container-icon"
      close
      @click="
        () => {
          this.event(this.id);
        }
      "
    >
      <div class="svg-icon"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: { type: Function },
    name: {
      type: String,
      default: "",
    },
    id: String,
  },
};
</script>

<style scoped>
.container-tags {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 4px 10px 4px 0px;
  width: auto;
  height: 30px;
  padding: 0px 6px 0px 8px;
  border: 1px solid;
  border-color: transparent;
  border-radius: 4px;
  background-color: #efefef;
  cursor: pointer;
  transition: all 0.2s ease;
}

.container-tags:hover {
  color: #1a8d5f;
  background-color: #e2f1ed;
  transition: all 0.2s ease;
}

.container-tags span {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #1b1e3d;
  font-weight: 500;
  line-height: 1.5;
  padding-bottom: 2px;
  transition: all 0.2s ease;
}

.container-tags:hover span {
  color: #1a8d5f;
  transition: all 0.2s ease;
}

.container-icon {
  margin-left: 4px;
  border: 0px solid;
  border-color: #1b1e3d;
  padding: 2px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.container-icon .svg-icon {
  display: flex;
  height: 100%;
  width: 100%;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  transition: all 0.2s ease;
}

.container-icon[close] .svg-icon {
  width: 8px;
  height: 8px;
  background-color: #1b1e3d;
  cursor: pointer;
  transition: all 0.2s ease;
}

.container-tags:hover .container-icon[close] {
  border-color: #1a8d5f;
  transition: all 0.2s ease;
}

.container-tags:hover .container-icon[close] .svg-icon {
  border-color: #1a8d5f;
  background-color: #1a8d5f;
  transition: all 0.2s ease;
}

.container-icon[close] .svg-icon {
  mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='10' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.279 5.5L11 10.221l-.779.779L5.5 6.279.779 11 0 10.221 4.721 5.5 0 .779.779 0 5.5 4.721 10.221 0 11 .779 6.279 5.5z' fill='%23000'/%3E%3C/svg%3E")
    no-repeat 50% 50%;
  align-self: center;
  justify-self: center;
  opacity: 1;
  transition: all 0.2s;
}
</style>
