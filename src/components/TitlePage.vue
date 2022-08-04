<template>
  <div class="title-container">
    <span>{{ namePage || this.$route.name }}</span>
  </div>
</template>

<script>
export default {
  name: "TitlePage",
  props: {
    namePage: String,
  },
};
</script>

<style lang="scss" scoped>
.title-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: auto;
  height: 44px;
  border-bottom: 1px solid;
  border-color: #e1e4e8;
  margin: 0 20px;
  padding: 12px 0 12px 0;
  position: relative;

  span {
    font-size: var(--size-normal);
    font-weight: bold;
    color: #000000f2;
    padding: 0;
  }
}
</style>
