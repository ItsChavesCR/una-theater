"use client"

import type { SeatType } from "@/lib/types"

interface SeatProps {
  seat: SeatType
  isSelected: boolean
  isSuggested: boolean
  onSelect: () => void
  rowLetter: string
}

export default function Seat({ seat, isSelected, isSuggested, onSelect, rowLetter }: SeatProps) {
  // Determine seat status color
  const getStatusColor = () => {
    if (isSelected) return "bg-emerald-500"
    if (isSuggested) return "bg-amber-400"
    if (seat.isOccupied) return "bg-gray-800"
    return "bg-gray-600"
  }

  // Determine border color based on category
  const getBorderColor = () => {
    switch (seat.category) {
      case "vip":
        return "border-red-500"
      case "premium":
        return "border-cyan-400"
      default:
        return "border-indigo-400"
    }
  }

  // Format price with colones symbol
  const formatPrice = (price: number) => {
    return `₡${price.toLocaleString()}`
  }

  return (
    <button
      className={`
        w-8 h-8 rounded flex items-center justify-center text-xs font-medium
        ${getStatusColor()}
        ${!seat.isOccupied ? "hover:opacity-80" : "cursor-not-allowed"}
        border-2 ${getBorderColor()}
        transition-colors duration-200
        text-white
      `}
      onClick={seat.isOccupied ? undefined : onSelect}
      disabled={seat.isOccupied}
      title={`Fila ${rowLetter}, Asiento ${seat.number} - ${seat.category.toUpperCase()} (${formatPrice(seat.price)})`}
    >
      {seat.number}
    </button>
  )
}
