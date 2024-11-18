
export interface CartTotalProps {
  total: string;
}

export interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}