const getForgotPassword = ((req, res) => {
    res.render('auth/forgot-password')
})

const getLogin = ((req, res) => {
    res.render('auth/login')
})
const getRegister = ((req, res) => {
    res.render('auth/register')
})

module.exports = {
    getForgotPassword,
    getLogin,
    getRegister
}