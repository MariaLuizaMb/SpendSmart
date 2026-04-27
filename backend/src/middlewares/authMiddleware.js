import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      erro: "Token não enviado.",
    });
  }

  const partes = authHeader.split(" ");

  if (partes.length !== 2) {
    return res.status(403).json({
      erro: "Formato do token inválido.",
    });
  }

  const [tipo, token] = partes;

  if (tipo !== "Bearer") {
    return res.status(401).json({
      erro: "Tipo de autenticação inválido. Use o formato Bearer token.",
    });
  }

  if (!token || token.trim() === "") {
    return res.status(401).json({
      erro: "Token não enviado.",
    });
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === "") {
    return res.status(500).json({
      erro: "A configuração de autenticação do servidor está ausente.",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = {
      id: payload.sub,
      email: payload.email,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      erro: "Token inválido ou expirado.",
    });
  }
}

export default authMiddleware;
