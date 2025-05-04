export interface CustomerOrders {
  orderId: string;
  customerId: string;
  paymentId: string;
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: string;
  updatedAt: string;
}