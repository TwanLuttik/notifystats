import DB from '../database/index';


export default async (req: any, res: any, next: any) => {
  const key = req.headers.authorization;

  if (!DB.ALL.AUTH_KEY_VALID(key)) {
    return res.status(401).json({
      success: false,
      message: 'Auth key is not valid'
    })
  }

  next();
}