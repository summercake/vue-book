<template>
  <div class="footer">
    <router-link to="/home">
        <i class="iconfont icon-shouye"></i>
        Home
    </router-link>
    <router-link to="/list">
        <i class="iconfont icon-liebiao"></i>
        List
    </router-link>
    <router-link to="/add">
        <i class="iconfont icon-tianjia"></i>
        Add
    </router-link>
    <router-link to="/collect">
        <i class="iconfont icon-shoucang"></i>
        Collect
    </router-link>
  </div>
</template>
<style scoped lang="less">
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  color: yellowgreen;
  display: flex;
  border-top: 1px solid #ccc;
  a {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  a.router-link-active {
    color: red;
  }
}
</style>
