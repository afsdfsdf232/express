exports.showIndex = async (req, res, next) => {
  try {
    res.render('index')
  } catch (err) {
    next(err)
  }
}

exports.showEditor = async (req, res, next) => {
  try {
    res.render('editor')
  } catch (err) {
    next(err)
  }
}

exports.showArticle = async (req, res, next) => {
  try {
    res.render('article')
  } catch (err) {
    next(err)
  }
}
