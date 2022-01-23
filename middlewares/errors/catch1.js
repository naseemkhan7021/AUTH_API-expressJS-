module.exports = func => (error, result, next) =>
     Promise.resolve(func(error, error, next))
          .catch(next)