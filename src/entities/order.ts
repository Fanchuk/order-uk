// src/entities/order.ts

export type OrderStatus = 
    | 'PENDING' 
    | 'PAID' 
    | 'PREPARING' 
    | 'READY' 
    | 'ON_THE_WAY' 
    | 'DELIVERED' 
    | 'CANCELLED' 
    | 'REFUNDED';

// Кроки для візуального степера на сторінці відстеження
export const ORDER_STATUS_STEPS: OrderStatus[] = [
    'PAID', 
    'PREPARING', 
    'READY', 
    'ON_THE_WAY', 
    'DELIVERED'
];

// Зручні підписи для UI
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    PENDING: 'Pending Payment',
    PAID: 'Order Received',
    PREPARING: 'Preparing',
    READY: 'Ready',
    ON_THE_WAY: 'On the Way',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
    REFUNDED: 'Refunded',
};