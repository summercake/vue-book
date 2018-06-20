<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, key) in swiperSliders" :key="key">
      <img :src="slide" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
export default {
  name: 'carousel',
  props: ['swiperSliders'],
  data () {
    return {
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        observeControl: true
      }
    }
  }
}
</script>
<style>
  img {
    width: 100%;
  }
</style>
