<template>
  <div class="detail">
    <MHeader :back="true">Detail Page</MHeader>
    <div>
      <ul>
        <li>
          <label for="bookName">Book Name</label>
          <input type="text" v-model="book.bookName" id="bookName">
        </li>
        <li>
          <label for="bookInfo">Book Info</label>
          <input type="text" v-model="book.bookInfo" id="bookInfo">
        </li>
        <li>
          <label for="bookPrice">Book Price</label>
          <input type="text" v-model.number="book.bookPrice" id="bookPrice">
        </li>
        <li>
          <button @click="update">Confirm</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MHeader from '../base/MHeader.vue'
import { findOneBook, updateBook } from '../api'

export default {
  components: {MHeader},
  data () {
    return {book: {}}
  },
  created () {
    this.getBook()
  },
  watch () {
    this.$route()
    {
      this.getBook()
    }
  },
  methods: {
    async getBook () {
      this.book = await findOneBook(this.bid)
      Object.keys(this.book).length > 0 ? void 0 : this.$router.push('./list')
    },
    async update () {
      await updateBook(this.bid, this.book)
      this.$router.push('./list')
    }
  },
  computed: {
    bid () {
      return this.$route.params.bid
    }
  }
}
</script>

<style scoped lang="less">
  .detail {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 100;
    ul {
      margin: 50px 10px 0 10px;
      li {
        label {
          display: block;
          font-size: 25px;
        }
        input {
          height: 25px;
          width: 100%;
          margin: 10px 0;
        }
        button {
          display: block;
          width: 85px;
          height: 35px;
          background: #2aadd2;
          color: #fff;
          border: none;
          border-radius: 5px;
          outline: none;
        }
      }
    }
  }
</style>
