"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { CustomerInfo } from "@/lib/types"

interface ReservationFormProps {
  onSuggest: (numSeats: number) => void
  selectedSeatsCount: number
  suggestedSeatsCount: number
  totalPrice: number
  onConfirmSuggestion: () => void
  onCancelSuggestion: () => void
  onCompleteReservation: (customerInfo: CustomerInfo) => void
}

export default function ReservationForm({
  onSuggest,
  selectedSeatsCount,
  suggestedSeatsCount,
  totalPrice,
  onConfirmSuggestion,
  onCancelSuggestion,
  onCompleteReservation,
}: ReservationFormProps) {
  const [numSeats, setNumSeats] = useState(1)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
  })
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSuggest(numSeats)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name as keyof CustomerInfo]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {}

    if (!customerInfo.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = "El número de teléfono es obligatorio"
    } else if (!/^\+?[0-9\s\-()]{8,20}$/.test(customerInfo.phone)) {
      newErrors.phone = "Por favor ingresa un número de teléfono válido"
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = "Por favor ingresa un correo electrónico válido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCompleteReservation = () => {
    if (validateForm()) {
      onCompleteReservation(customerInfo)
    }
  }

  // Format price with colones symbol and thousands separator
  const formatPrice = (price: number) => {
    return `₡${price.toLocaleString()}`
  }

  return (
    <Card className="bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-red-400">Reserva de Asientos</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numSeats" className="text-gray-300">
              Número de asientos
            </Label>
            <Input
              id="numSeats"
              type="number"
              min="1"
              max="15"
              value={numSeats}
              onChange={(e) => setNumSeats(Number.parseInt(e.target.value) || 1)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <Button type="submit" className="w-full bg-red-700 hover:bg-red-800 text-white">
            Sugerir asientos
          </Button>
        </form>

        {suggestedSeatsCount > 0 && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-amber-500">
            <p className="font-medium text-amber-300">Se encontraron {suggestedSeatsCount} asientos adyacentes</p>
            <div className="flex gap-2 mt-2">
              <Button
                onClick={onConfirmSuggestion}
                className="border border-amber-400 text-amber-300 hover:bg-gray-600 bg-transparent"
              >
                Confirmar
              </Button>
              <Button
                onClick={onCancelSuggestion}
                className="border border-gray-500 text-gray-300 hover:bg-gray-600 bg-transparent"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-300">Asientos seleccionados:</span>
            <span className="font-bold text-white">{selectedSeatsCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Precio total:</span>
            <span className="font-bold text-emerald-400">{formatPrice(totalPrice)}</span>
          </div>
        </div>

        {selectedSeatsCount > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-medium text-red-400 mb-4">Tu Información</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Nombre Completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Ingrese su nombre"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">
                  Número de Teléfono
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Ingrese su teléfono"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Ingrese su correo electrónico"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-gray-700 pt-4">
        <Button
          onClick={handleCompleteReservation}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={selectedSeatsCount === 0}
        >
          Confirmar reserva
        </Button>
      </CardFooter>
    </Card>
  )
}
