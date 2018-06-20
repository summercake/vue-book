<template>
  <div class="header">
    <router-link to="/home">
        <slot></slot>
        <i class="iconfont icon-ziyuan" v-if="back" @click="goBack"></i>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    back: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="less">
.header {
  background: #afd9ee;
  top: 0;
  left: 0;
  height: 40px;
  text-align: center;
  font-weight: bold;
  line-height: 40px;
  i {
    position: absolute;
    left: 10px;
    font-size: 20px;
  }
}
</style>
