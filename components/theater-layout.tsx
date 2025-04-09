"use client"

import type { SeatType } from "@/lib/types"
import Seat from "./seat"

interface TheaterLayoutProps {
  seats: SeatType[]
  selectedSeats: Set<number>
  suggestedSeats: Set<number>
  onSeatSelect: (seatId: number) => void
}

export default function TheaterLayout({ seats, selectedSeats, suggestedSeats, onSeatSelect }: TheaterLayoutProps) {
  // Get unique rows
  const rows = Array.from(new Set(seats.map((seat) => seat.row))).sort((a, b) => a - b)

  // Convert row number to letter (1 -> A, 2 -> B, etc.)
  const getRowLetter = (rowNumber: number) => {
    return String.fromCharCode(64 + rowNumber) // ASCII: A=65, so 1+64=65 which is 'A'
  }

  return (
    <div className="mb-8">
      <div className="bg-gray-950 p-4 mb-8 rounded-lg text-center text-white border border-red-900">
        <div className="w-3/4 h-8 mx-auto bg-gray-800 rounded-t-lg mb-4 flex items-center justify-center text-red-400 font-semibold">
          ESCENARIO
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="flex gap-4 flex-wrap justify-center">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-600 rounded mr-2"></div>
            <span className="text-sm">Disponible</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-800 rounded mr-2"></div>
            <span className="text-sm">Ocupado</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-emerald-500 rounded mr-2"></div>
            <span className="text-sm">Seleccionado</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-amber-400 rounded mr-2"></div>
            <span className="text-sm">Sugerido</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="flex gap-4 flex-wrap justify-center">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-700 rounded mr-2"></div>
            <span className="text-sm">VIP (₡25,000)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-cyan-600 rounded mr-2"></div>
            <span className="text-sm">Premium (₡18,000)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-indigo-600 rounded mr-2"></div>
            <span className="text-sm">General (₡10,000)</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="min-w-max">
          {rows.map((row) => (
            <div key={row} className="flex justify-center mb-2">
              <div className="w-8 flex items-center justify-center font-bold text-red-400">{getRowLetter(row)}</div>
              <div className="flex gap-1">
                {seats
                  .filter((seat) => seat.row === row)
                  .sort((a, b) => a.number - b.number)
                  .map((seat) => (
                    <Seat
                      key={seat.id}
                      seat={seat}
                      isSelected={selectedSeats.has(seat.id)}
                      isSuggested={suggestedSeats.has(seat.id)}
                      onSelect={() => onSeatSelect(seat.id)}
                      rowLetter={getRowLetter(seat.row)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
