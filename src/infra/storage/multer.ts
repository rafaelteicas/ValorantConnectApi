import multer from 'multer'

export const storage = multer({ storage: multer.memoryStorage() })
