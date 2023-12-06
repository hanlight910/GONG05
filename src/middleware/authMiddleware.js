import jwt from 'jsonwebtoken';

const authenticateMiddleware = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    console.error('JWT_SECRET 환경 변수가 설정되지 않았습니다.');
    return res.status(500).json({ error: 'Internal server error' });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '로그인이 필요합니다.' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: '토큰이 유효 기간이 지났습니다.' });
      } else {
        return res.status(401).json({ error: '토큰이 유효하지 않습니다.' });
      }
    }

    req.locals = { user };
    next();
  });
};

export default authenticateMiddleware;
