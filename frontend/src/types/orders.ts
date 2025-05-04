export interface CustomerOrders {
  orderId: string;
  customerId: string;
  paymentId: string;
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  orderItemsId: string;
  mainImage: string;
  productName: string;
  quantity: number;
  price: number;
  status: 'pending' | 'shipped' | 'delivered';
}