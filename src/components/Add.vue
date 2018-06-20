<template>
  <div class="content">
    <MHeader :back="true">Add Book</MHeader>
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
        <label for="bookPrice">Book Cover</label>
        <input type="text" v-model ="book.bookCover" id="bookCover">
      </li>
      <li>
        <button @click="add">Add</button>
      </li>
    </ul>
  </div>
</template>

<script>
import MHeader from '../base/MHeader.vue'
import { addBook } from '../api'

export default {
  data () {
    return {book: {}}
  },
  components: {
    MHeader
  },
  created () {

  },
  methods: {
    async add () {
      await addBook(this.book)
      this.$router.push('/list')
    }
  }
}
</script>

<style scoped lang="less">
  .content {
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
