const express = require('express')
const path = require('path')
const morgan = require('morgan')
const session = require('express-session')
const errorhandler = require('errorhandler')
const config = require('./config/config')
const router = require('./router/index')
const PORT = process.env.PORT || 3000
const app = express()
    // 设置静态资源
app.use('/public', express.static(path.join(__dirname, './public')))
app.use('/node_modules', express.static(path.join(__dirname, './../../node_modules')))
    // 配置模板引擎
app.engine('html', require('express-art-template')) // 以html文件结尾的用该模板渲染 
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
})
app.set('views', path.join(__dirname, 'views')) // 模板目录
app.set('view engine', 'html') // 可以省略的模板文件后缀
    // 解析请求体中间件
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// 配置session中间件
app.use(session({
    secret: config.session, //签发session秘钥
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure: true
        maxAge: 24 * 60 * 60 * 1000 // 过期时间
    }
}))

app.use((req, res, next) => {
    // 给所有模板添加数据
    app.locals.sessionUser = req.session.user;
    next()
})

// 页面鉴权
app.use((req, res, next) => {
        if (req.method === 'GET') {
            const sessionUser = req.session.user;
            const path = req.path
            if (sessionUser && (path === '/login' || path === '/register')) {
                return res.redirect('/')
            } else {
                return next()
            }
            if (!sessionUser && (path !== '/login' || path !== '/register' || path !== '/')) {
                return res.redirect('/login')
            } else {
                return next()
            }

        }
        console.log('req:', req.path, req.method)
            // const sessionUser = req.session.user;
            // if (sessionUser) {
            //   return next()
            // }
            // res.redirect('/login')
        next()
    })
    // 日志输出中间件
app.use(morgan('dev'))

app.use('/', router)


require('./model')
    // 统一错误处理中间件
if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler())
}
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

// p37
