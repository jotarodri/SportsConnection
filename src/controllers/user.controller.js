const userCtrl = {};

userCtrl.renderUserProfile = (req, res, next) => {
    res.render('app');
}

module.exports = userCtrl;