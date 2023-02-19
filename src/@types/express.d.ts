declare  namespace Express {
  export interface Request {
    userIdOfShoppingCartRequest: string;
    userId: string;
    userIsAdmin: boolean;
    tokenRequesting: string;
    image: {
      imageName: string;
      imageUrl: string;
      key: string;
    };
  }

}
