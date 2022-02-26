const http = require('http')
const { v4: uuidv4 } = require('uuid');
const resHandle = require('./resHandle')
// 暫存在 node.js 記憶體
const todos = []

const requestListener = (req, res) => {
  /* 接收資料封包並組裝 */
  let body = ""
  req.on('data', chunk => {
    body += chunk
  })


  if (req.url == '/todos' && req.method == 'GET') {
    resHandle.successHandle(res)
  } else if (req.url === '/todos' && req.method === 'POST') {
    req.on('end', () => {
      try {
        const title = JSON.parse(body).title

        if (title !== undefined) {
          const todo = {
            "title": title,
            "id": uuidv4()
          }

          todos.push(todo)
          resHandle.successHandle(res)
        } else {
          resHandle.errorHandle(res)
        }
      } catch (error) {
        resHandle.errorHandle(res)
      }
    })

  } else if (req.url === '/todos' && req.method === 'DELETE') {
    todos.length = 0
    resHandle.successHandle(res)

  } else if (req.url.startsWith('/todos/') && req.method === 'DELETE') {
    const id = req.url.split('/').pop()
    const index = todos.findIndex(el => el.id === id)

    if (index !== -1) {
      todos.splice(index, 1)
      resHandle.successHandle(res)
    } else {
      resHandle.errorHandle(res)
    }
  } else if (req.url.startsWith('/todos/') && req.method === 'PATCH') {
    req.on('end', () => {
      try {
        const title = JSON.parse(body).title
        const id = req.url.split('/').pop()
        const index = todos.findIndex(el => el.id === id)
        if (title !== undefined && index !== -1) {
          todos[index].title = title
          resHandle.successHandle(res)
        } else {
          resHandle.errorHandle(res)
        }
      } catch (error) {
        resHandle.errorHandle(res)
      }
    })
  } else if (req.method == 'OPTIONS') {
    // preflight 設定
    resHandle.optionsHandle(res)
  } else {
    resHandle.noPathHandle(res)
  }
}

const server = http.createServer(requestListener)

server.listen(process.env.PORT || 3005)
