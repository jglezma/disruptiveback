import User from '../models/User.model.js'

export const login = async (req, res) => {
  const { user, password } = req.body
  console.log(req.body);
  const userFound = await User.findOne({ user: user })

  if (!userFound)
    return res.status(400).json({ message: 'Usuario no encontrado' })

  if (userFound.password === password) {
    res.json({ user: userFound.user })
  } else {
    return res.status(400).json({ message: 'Password invalido' })
  }
}

export const signup = async (req, res) => {
  try {
    const { alias, email, password, role, contentPermissions } = req.body;

    // Validar que el alias no esté repetido
    const existingUserWithAlias = await User.findOne({ alias });
    if (existingUserWithAlias) {
      return res.status(400).json({ message: 'El alias ya está en uso.' });
    }

    // Validar que el correo electrónico no esté repetido
    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
    }

    // Validar el rol de usuario
    if (!['admin', 'creator', 'reader'].includes(role)) {
      return res.status(400).json({ message: 'Rol de usuario no válido.' });
    }

    // Validar los permisos de contenido
    if (role !== 'admin') {
      for (const permission in contentPermissions) {
        if (typeof contentPermissions[permission] !== 'boolean') {
          return res.status(400).json({ message: 'Permisos de contenido no válidos.' });
        }
      }
    }

    // Encriptar la contraseña
    const encryptedPassword = await User.encryptPassword(password);

    // Crear y guardar el nuevo usuario
    const newUser = new User({
      alias,
      email,
      password: encryptedPassword,
      role,
      contentPermissions,
    });
    await newUser.save();

    res.json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

