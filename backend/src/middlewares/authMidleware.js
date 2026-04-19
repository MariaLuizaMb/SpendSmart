import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ erro: "Token não enviado." });
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({ erro: "Formato do token inválido." });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado." });
  }
}

export default authMiddleware;
