import jwt from "jsonwebtoken"
export const auth = (req, res, next) => {

  const { token } = req.cookies;

  console.log(token)
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    // Verificar el token
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
      if(err)  return res.status(401).json({ msg: 'Token no válido' });
    });
    console.log(user)
    req.user = user.id; // Almacenar el ID del usuario en el objeto de solicitud
    next(); // Continuar con la siguiente función de middleware o ruta
  } catch (err) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};
