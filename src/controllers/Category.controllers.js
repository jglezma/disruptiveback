import Category from '../models/Category.model.js'

export const createCategory = async (req, res) => {
    try {
      const { name, contentTypes, permissions, themes } = req.body;
  
      // Validar que el nombre de la categoría no esté repetido
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: 'El nombre de la categoría ya está en uso.' });
      }
  
      // Validar el tipo de contenido
      if (!['images', 'videos', 'documents'].includes(contentTypes)) {
        return res.status(400).json({ message: 'Tipo de contenido no válido.' });
      }
  
      // Validar los permisos
      for (const permission in permissions) {
        if (typeof permissions[permission] !== 'boolean') {
          return res.status(400).json({ message: 'Permisos no válidos.' });
        }
      }
  
      // Validar los temas
      if (themes && themes.length > 0) {
        const validThemes = await Theme.find({ _id: { $in: themes } });
        if (validThemes.length !== themes.length) {
          return res.status(400).json({ message: 'Los temas no son válidos.' });
        }
      }
  
      // Crear y guardar la nueva categoría
      const newCategory = new Category({
        name,
        contentTypes,
        permissions,
        themes,
      });
      await newCategory.save();
  
      res.json({ message: 'Categoría creada exitosamente.' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  