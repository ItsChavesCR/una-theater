"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { CustomerInfo } from "@/lib/types"

interface ConfirmationModalProps {
  seatCount: number
  totalPrice: number
  customerInfo: CustomerInfo
  onClose: () => void
}

export default function ConfirmationModal({ seatCount, totalPrice, customerInfo, onClose }: ConfirmationModalProps) {
  // Format price with colones symbol and thousands separator
  const formatPrice = (price: number) => {
    return `₡${price.toLocaleString()}`
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-800 text-white border border-red-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-400">
            <span className="text-emerald-500">✓</span>
            ¡Reserva Exitosa!
          </DialogTitle>
          <DialogDescription className="text-gray-300">Tu reserva ha sido confirmada.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Número de asientos:</span>
              <span className="font-bold text-white">{seatCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Total pagado:</span>
              <span className="font-bold text-emerald-400">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
            <h4 className="font-medium text-red-400 mb-3">Información del Cliente</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Nombre:</span>
                <span className="font-medium text-white">{customerInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Teléfono:</span>
                <span className="font-medium text-white">{customerInfo.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Correo:</span>
                <span className="font-medium text-white">{customerInfo.email}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Recibirás un correo electrónico con los detalles de tu reserva. Por favor, llega 30 minutos antes del
            espectáculo para recoger tus entradas.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="w-full bg-red-700 hover:bg-red-800 text-white">
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
