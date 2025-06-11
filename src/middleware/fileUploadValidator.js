export const fileUploadValidator = (req, res, next) => {
    const file = req.file;
  
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const allowedTypes = [
      'image/jpeg', // jpg
      'image/png',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
      'text/plain', // txt
    ];
  
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Unsupported file type' });
    }
  
    if (file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'File too large (max 10MB)' });
    }
  
    next();
  };