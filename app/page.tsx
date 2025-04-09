"use client"

import { useState } from "react"
import TheaterLayout from "@/components/theater-layout"
import ReservationForm from "@/components/reservation-form"
import Footer from "@/components/footer"
import Header from "@/components/header"
import ConfirmationModal from "@/components/confirmation-modal"
import AboutSection from "@/components/about-section"
import ShowsSection from "@/components/shows-section"
import type { SeatType, CustomerInfo } from "@/lib/types"

export default function Home() {
  const [selectedSeats, setSelectedSeats] = useState<Set<number>>(new Set())
  const [suggestedSeats, setSuggestedSeats] = useState<Set<number>>(new Set())
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
  })

  // Theater configuration
  const rows = 10
  const seatsPerRow = 15

  // Generate theater seats
  const generateTheaterSeats = (): SeatType[] => {
    const seats: SeatType[] = []
    let id = 1

    for (let row = 1; row <= rows; row++) {
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        // Randomly set some seats as occupied (for demo purposes)
        const isOccupied = Math.random() < 0.3

        // Determine seat category based on row
        let category: "vip" | "premium" | "general" = "general"
        if (row <= 3) {
          category = "vip"
        } else if (row <= 6) {
          category = "premium"
        }

        seats.push({
          id,
          row,
          number: seatNum,
          isOccupied,
          category,
          price: category === "vip" ? 25000 : category === "premium" ? 18000 : 10000,
        })

        id++
      }
    }

    return seats
  }

  const theaterSeats = generateTheaterSeats()

  // Calculate total price
  const calculateTotalPrice = () => {
    return Array.from(selectedSeats).reduce((total, seatId) => {
      const seat = theaterSeats.find((s) => s.id === seatId)
      return total + (seat?.price || 0)
    }, 0)
  }

  // Handle seat selection
  const handleSeatSelect = (seatId: number) => {
    const newSelectedSeats = new Set(selectedSeats)

    if (newSelectedSeats.has(seatId)) {
      newSelectedSeats.delete(seatId)
    } else {
      newSelectedSeats.add(seatId)
    }

    setSelectedSeats(newSelectedSeats)
    // Clear suggestions when manually selecting
    setSuggestedSeats(new Set())
  }

  // Suggest seats function
  const suggestSeats = (numSeats: number) => {
    if (numSeats <= 0 || numSeats > seatsPerRow) {
      setSuggestedSeats(new Set())
      return
    }

    // Get rows ordered by distance from center
    const centerRow = Math.ceil(rows / 2)
    const rowsOrderedByCenter = Array.from({ length: rows }, (_, i) => i + 1).sort(
      (a, b) => Math.abs(a - centerRow) - Math.abs(b - centerRow),
    )

    for (const row of rowsOrderedByCenter) {
      // Get all seats in this row
      const seatsInRow = theaterSeats.filter((seat) => seat.row === row && !seat.isOccupied)

      // Find consecutive available seats
      for (let i = 0; i <= seatsInRow.length - numSeats; i++) {
        const consecutive = seatsInRow.slice(i, i + numSeats)

        // Check if these seats are consecutive by number
        const isConsecutive = consecutive.every(
          (seat, index) => index === 0 || seat.number === consecutive[index - 1].number + 1,
        )

        if (isConsecutive) {
          const suggestedIds = new Set(consecutive.map((seat) => seat.id))
          setSuggestedSeats(suggestedIds)
          return
        }
      }
    }

    // If no consecutive seats found
    setSuggestedSeats(new Set())
  }

  // Confirm suggested seats
  const confirmSuggestion = () => {
    setSelectedSeats(suggestedSeats)
    setSuggestedSeats(new Set())
  }

  // Cancel suggestion
  const cancelSuggestion = () => {
    setSuggestedSeats(new Set())
  }

  // Complete reservation
  const completeReservation = (info: CustomerInfo) => {
    if (selectedSeats.size > 0) {
      setCustomerInfo(info)
      setShowConfirmation(true)
    }
  }

  // Close confirmation modal and reset
  const closeConfirmation = () => {
    setShowConfirmation(false)
    setSelectedSeats(new Set())
    setCustomerInfo({
      name: "",
      phone: "",
      email: "",
    })
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-900 text-gray-100 scroll-smooth">
      <Header />

      <div id="home" className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8 text-red-400">TEATRO UNA - Reserva de Asientos</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TheaterLayout
              seats={theaterSeats}
              selectedSeats={selectedSeats}
              suggestedSeats={suggestedSeats}
              onSeatSelect={handleSeatSelect}
            />
          </div>

          <div className="lg:col-span-1">
            <ReservationForm
              onSuggest={suggestSeats}
              selectedSeatsCount={selectedSeats.size}
              suggestedSeatsCount={suggestedSeats.size}
              totalPrice={calculateTotalPrice()}
              onConfirmSuggestion={confirmSuggestion}
              onCancelSuggestion={cancelSuggestion}
              onCompleteReservation={completeReservation}
            />
          </div>
        </div>
      </div>

      <ShowsSection />

      <AboutSection />

      <Footer />

      {showConfirmation && (
        <ConfirmationModal
          seatCount={selectedSeats.size}
          totalPrice={calculateTotalPrice()}
          customerInfo={customerInfo}
          onClose={closeConfirmation}
        />
      )}
    </main>
  )
}
