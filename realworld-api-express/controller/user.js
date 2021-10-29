// 用户登陆
exports.login = async (req, res, next) => {
  try {
    res.send('post / users/login')
  } catch (err) {
    next(err)
  }
}

// 用户注册
exports.register = async (req, res, next) => {
  try {
    res.send('post / users')
  } catch (err) {
    next(err)
  }
}

// 获取当前用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.send('get / user')
  } catch (err) {
    next(err)
  }
}

// 更新当前用户
exports.updateCurrentUser = async (req, res, next) => {
  try {
    res.send('put / user')
  } catch (err) {
    next(err)
  }
}
