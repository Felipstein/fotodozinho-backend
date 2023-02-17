declare  namespace Express {
  export interface Request {
    userIdOfShoppingCartRequest: string;
    userId: string;
    image: {
      imageName: string;
      imageUrl: string;
      key: string;
    };
  }

}
