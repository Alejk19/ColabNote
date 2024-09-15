import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

export const generateToken = user => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
    return token;
}

export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[process.env.JWT_COOKIE_NAME] : null
}