module.exports = (req, res, next) => {
  if (req.path === '/auth/login') {
    if (req.body.password === 'correct') {
      res.status(200).json({jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjI1MjQ2MDgwMDB9.e4O1lT5YF_ZgNO_VW0KEYr4516Dz_ELvINrYFBflu4Y'})
    } else {
      res.status(401).json({})
    }
  } else if (req.path === '/users') {
    res.status(200).json({})
  } else if (req.path.includes('markread')) {
    res.status(200).json({})
  } else {
    next()
  }
}
