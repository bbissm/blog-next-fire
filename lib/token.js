import jwt from 'jsonwebtoken';

const secretKey = 'martin-skills1997';

export const generateToken = () => {
    const payload = {
        title: 'test'
    };

    const token = jwt.sign(payload, secretKey);
    console.log(token);
    return token;
}

