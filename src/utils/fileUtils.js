export const getFileUrl = (req, fileName) => {
    return `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
  };