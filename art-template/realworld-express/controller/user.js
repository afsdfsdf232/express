const { User } = require('../model')
exports.showLogin = async(req, res, next) => {
    try {
        res.render('login', {
            isLogin: true
        })
    } catch (err) {
        next(err)
    }
}

exports.showRegister = async(req, res) => {
    try {
        res.render('login', {
            isLogin: false
        })
    } catch (err) {
        next(err)
    }
}
exports.register = async(req, res, next) => {
    try {
        const user = new User(req.body.user)
        await user.save()
            // 保存登陆状态
        req.session.user = user
        res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
}
exports.login = async(req, res, next) => {
    try {
        const user = req.user
            // 保存登陆状态
        req.session.user = user
        res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
}
exports.showSettings = async(req, res) => {
    try {
        res.render('settings')
    } catch (err) {
        next(err)
    }
}

exports.showProfile = async(req, res) => {
    try {
        res.render('profile')
    } catch (err) {
        next(err)
    }
}
exports.logOut = async(req, res, next) => {
    try {
        // 清除登陆信息
        req.session.user = null
        res.render('login', {
            isLogin: true
        })
    } catch (err) {
        next(err)
    }
}