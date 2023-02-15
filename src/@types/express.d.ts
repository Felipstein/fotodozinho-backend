declare  namespace Express {
  export interface Request {
    userId: string;
    image: {
      imageName: string;
      imageUrl: string;
      key: string;
    };
  }

}
