<template>
  <div>
    <MHeader>Home</MHeader>
    <div class="content">
      <Loading v-if="loading"></Loading>
      <template v-else>
        <Swiper :swiperSliders="sliders"></Swiper>
        <div class="container">
          <h3>Hot Books</h3>
          <ul>
            <li v-for="hot in hotBooks">
              <img :src="hot.bookCover" alt="">
              <b>{{hot.bookName}}</b>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import MHeader from '../base/MHeader.vue'
import Swiper from '../base/Swiper.vue'
import Loading from '../base/Loading.vue'
// import { getSliders, getHotBook } from '../api'
import { getAll } from '../api'

export default {
  name: 'home',
  created () {
    // this.getSlider()
    // this.getHot()
    this.getData()
  },
  data: function () {
    return {sliders: [], hotBooks: [], loading: true}
  },
  components: {
    MHeader, Swiper, Loading
  },
  methods: {
    // async getSlider () {
    //   this.sliders = await getSliders()
    // },
    // async getHot () {
    //   this.hotBooks = await getHotBook()
    // }
    async getData () {
      let [sliders, hotBooks] = await getAll()
      this.sliders = sliders
      this.hotBooks = hotBooks
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
  h3 {
    color: #999;
    padding: 5px 0;
  }

  .container {
    width: 90%;
    margin: 0 auto;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 10px;
      li {
        width: 50%;
        text-align: center;
        margin: 5px 0;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
