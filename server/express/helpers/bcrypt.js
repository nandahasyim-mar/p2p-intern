const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(20);
    const hash = bcrypt.hashSync(password, salt);
    console.log(password)

    return hash;
};

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashPassword,
    comparePassword
}