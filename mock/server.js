let http = require('http')
let fs = require('fs')
let url = require('url')
let sliders = require('./sliders')

function read (cb) {
  fs.readFile('./book.json', 'utf8', function (err, data) {
    if (err || data.length === 0) {
      cb([])
    } else {
      cb(JSON.parse(data))
    }
  })
}

function write (data, cb) {
  fs.writeFile('./book.json', JSON.stringify(data), cb)
}

let pageSize = 5

http.createServer((req, res) => {
  /***
   * if Cross-Origin, header must be set
   */
  // res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  // res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  // res.setHeader('X-Powered-By', ' 3.2.1')
  if (req.method === 'OPTIONS') return res.end()
  /* return option request immediatelly */
  let {pathname, query} = url.parse(req.url, true)
  /* true can change query to object */
  if (pathname === '/page') {
    let offset = parseInt(query.offset) || 0
    read(function (books) {
      let result = books.reverse().slice(offset, offset + pageSize)
      let hasMore = true
      if (books.length <= offset + pageSize) {
        hasMore = false
      }
      res.setHeader('Content-Type', 'application/json')
      setTimeout(function () {
        res.end(JSON.stringify({hasMore, books: result}))
      }, 3000)
    })
    return
  }
  if (pathname === '/sliders') {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(sliders))
  }
  if (pathname === '/hot') {
    read(function (books) {
      let hot = books.reverse().slice(0, 6)
      res.setHeader('Content-Type', 'application/json')
      setTimeout(() => {
        res.end(JSON.stringify(hot))
      }, 3000)
    })
    return
  }
  if (pathname === '/book') {
    let id = parseInt(query.id)
    switch (req.method) {
      case 'GET':
        if (typeof id !== 'undefined' && !isNaN(id)) {
          read(function (books) {
            let book = books.find(item => item.bookId === id)
            if (!book) book = {}
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(book))
          })
        } else {
          read(function (books) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(books.reverse()))
          })
        }
        break
      case 'POST':
        let str = ''
        req.on('data', chunk => {
          str += chunk
        })
        req.on('end', () => {
          let book = JSON.parse(str)
          read(function (books) {
            book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1
            books.push(book)
            write(books, function () {
              res.end(JSON.stringify(book))
            })
          })
        })
        break
      case 'PUT':
        if (id) {
          let str = ''
          req.on('data', chunk => {
            str += chunk
          })
          req.on('end', () => {
            let book = JSON.parse(str)
            read(function (books) {
              books = books.map(item => {
                if (item.bookId === id) {
                  return book
                }
                return item
              })
              write(books, function () {
                res.end(JSON.stringify(book))
              })
            })
          })
        }
        break
      case 'DELETE':
        read(function (books) {
          books = books.filter(item => item.bookId !== id)
          write(books, function () {
            res.end(JSON.stringify({}))
          })
        })
        break
    }
  }
  fs.stat('./dist/' + pathname, function (err, stats) {
    if (err) {
      res.statusCode = 404
      res.end('NOT FOUND')
    } else {
      if (stats.isDirectory()) {
        let p = require('path').join('./dist/' + pathname, './index.html')
        fs.createReadStream(p).pipe(res)
      } else {
        fs.createReadStream('./dist/' + pathname).pipe(res)
      }
    }
  })
}).listen(3000)
