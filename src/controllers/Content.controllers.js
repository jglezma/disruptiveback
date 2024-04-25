
import Content from '../models/Content.model.js'
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const fs = require('fs');
const path = require('path');

export const getContents = async (req, res) => {
    try {
      const { contentType, themeId } = req.query;
      const query = {};
  
      if (contentType) {
        query.contentType = contentType;
      }
  
      if (themeId) {
        query.theme = themeId;
      }
  
      const contents = await Content.find(query).populate('theme creator');
      res.json(contents);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const getContentById = async (req, res) => {
    try {
      const { id } = req.params;
      const content = await Content.findById(id).populate('theme creator');
  
      if (!content) {
        return res.status(404).json({ message: 'Contenido no encontrado.' });
      }
  
      if (!req.user || req.user.role !== 'reader') {
        if (content.contentType !== 'document') {
          return res.status(403).json({ message: 'No tienes acceso a este contenido.' });
        }
      }
  
      res.json(content);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  


export const createContent = async (req, res) => {
  try {
    const { title, description, contentType, themeId } = req.body;

    // Validar que el usuario esté autenticado y sea creador
    if (!req.user || req.user.role !== 'creator') {
      return res.status(403).json({ message: 'No tienes permisos para crear contenido.' });
    }

    // Validar los datos del contenido
    if (!title || !description || !contentType || !themeId) {
      return res.status(400).json({ message: 'Datos del contenido incompletos.' });
    }

    // Validar el tipo de contenido
    if (!['image', 'video', 'document'].includes(contentType)) {
      return res.status(400).json({ message: 'Tipo de contenido no válido.' });
    }

    // Validar el tema
    const theme = await Theme.findById(themeId);
    if (!theme) {
      return res.status(400).json({ message: 'Tema no encontrado.' });
    }

    // Subir el archivo (si es necesario)
    let url = '';
    if (contentType !== 'document') {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: 'Falta el archivo de contenido.' });
      }

      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(__dirname, '../uploads/', fileName);
      await file.mv(filePath);

      url = `/${fileName}`;
    }

    // Crear y guardar el nuevo contenido
    const newContent = new Content({
      title,
      description,
      contentType,
      url,
      theme: theme._id,
      creator: req.user._id,
      credits: req.user.alias,
    });
    await newContent.save();

    res.json({ message: 'Contenido creado exitosamente.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Función auxiliar para mover el archivo subido
async function moveUploadedFile(filePath, newFilePath) {
  return new Promise((resolve, reject) => {
    fs.rename(filePath, newFilePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
