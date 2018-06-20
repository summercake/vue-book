<template>
  <div>
    <MHeader>List Page</MHeader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <ul>
        <router-link v-for="(book, index) in books" :to="{name:'detail', params:{bid: book.bookId}}" :key="index"
                     tag="li">
          <img v-lazy="book.bookCover" alt="">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <button @click.stop="remove(book.bookId)">Delete</button>
          </div>
        </router-link>
      </ul>
      <div @click="more" class="more">More Books</div>
    </div>
  </div>
</template>

<script>
import MHeader from '../base/MHeader.vue'
import { pagination, removeBook } from '../api'

export default {
  data () {
    return {books: [], offset: 0, hasMore: true, isLoading: false}
  },
  created () {
    this.getData()
  },
  mounted () {
    let scroll = this.$refs.scroll
    let top = scroll.offsetTop
    let distance = 0
    scroll.addEventListener('touchstart', (e) => {
      if (scroll.scrollTop !== 0 && scroll.offsetTop === top) return
      let start = e.touches[0].pageY
      let move = (e) => {
        let current = e.touches[0].pageY
        distance = current - start
        if (distance > 0) {
          if (distance <= 50) {
            scroll.style.top = distance + top + 'px'
          } else {
            distance = 50
            scroll.style.top = top + 50 + 'px'
          }
        } else {
          scroll.removeEventListener('touchmove', move)
          scroll.removeEventListener('touchend', end)
        }
      }
      let end = (e) => {
        clearInterval(this.timer1)
        this.timer1 = setInterval(() => {
          if (distance <= 0) {
            clearInterval(this.timer1)
            distance = 0
            scroll.style.top = 40 + 'px'
            scroll.removeEventListener('touchmove', move)
            scroll.removeEventListener('touchend', end)
            this.books = []
            this.offset = 0
            this.hasMore = true
            this.getData()
            return
          }
          distance -= 1
          scroll.style.top = top + distance + 'px'
        }, 1)
      }
      scroll.addEventListener('touchmove', move)
      scroll.addEventListener('touchend', end)
    }, false)
  },
  methods: {
    loadMore () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.getData()
        }
      }, 60)
    },
    more () {
      this.getData()
    },
    async getData () {
      this.isLoading = true // start to loading
      if (this.hasMore && this.isLoading) {
        let {hasMore, books} = await pagination(this.offset)
        this.books = [...this.books, ...books]
        this.hasMore = hasMore
        this.isLoading = false // end loading
        this.offset = this.books.length // **************** this is a bug
      }
    },
    async remove (id) {
      await removeBook(id)
      this.books = this.books.filter(item => item.bookId !== id)
    }
  },
  computed: {},
  components: {MHeader}
}
</script>

<style scoped lang="less">
  .content {
    ul {
      padding: 10px;
      li {
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #f1f1f1;
        img {
          width: 130px;
          height: 150px;
        }
        h4 {
          font-size: 20px;
          line-height: 25px;
        }
        p {
          color: #2a2a2a;
          line-height: 25px;
        }
        b {
          color: red;
        }
        button {
          display: block;
          width: 60px;
          height: 20px;
          background: orangered;
          color: #fff;
          border: none;
          border-radius: 15px;
          outline: none;
        }
      }
    }
    .more {
      margin: 10px;
      background: #2afedd;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 25px;
    }
  }
</style>
