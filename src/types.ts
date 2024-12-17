export type ProductType = {
  productId: number,
  quantity: number
}

export type OrderType = {
  orderId: string,
  orderWorth: number,
  products: ProductType[]
}
