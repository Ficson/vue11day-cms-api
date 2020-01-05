// const express = require('express')
// const router = require('./router')
// // const bodyParser = require('body-parser')
// // const session = require('express-session')

// const app = express()
// /**
//  * 配置解析表单请求体
//  */
// // app.use(bodyParser.urlencoded({ extended: false}))
// // app.use(bodyParser.json())

// /**
//  * 配置使用 Session
//  */
// // app.use(session({
// //   secret: 'itcast',
// //   resave: false,
// //   saveUninitialized: false
// // }))

// // 把路由应用到app中
// app.use(router)

// // app.get('/', (req, res, next) => {
// //   res.status(200).send('api server is running...')
// // })

// app.listen(3000, () => {
//   console.log('App is running at port 3000')
//   console.log('Please visit http://127.0.0.1:3000/')
// })

const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

/**
 * 配置解析表单请求体
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * 配置使用 Session
 */
app.use(session({
  secret: 'itcast',
  resave: false,
  saveUninitialized: false
}))

// 把路由应用到 app 中
app.use(router)

// 统一处理 500 错误
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  })
})

app.listen(3000, () => {
  console.log('App is running at port 3000.')
  console.log('  Please visit http://127.0.0.1:3000/')
})
