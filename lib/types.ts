export interface SeatType {
  id: number
  row: number
  number: number
  isOccupied: boolean
  category: "vip" | "premium" | "general"
  price: number
}

export interface CustomerInfo {
  name: string
  phone: string
  email: string
}
