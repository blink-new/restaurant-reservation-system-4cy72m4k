import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar, Clock, Users, Star, Phone, Mail, User, MessageSquare, CheckCircle, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Reservation } from '../types';

interface ReservationSummaryProps {
  reservation: Reservation;
  onNewReservation: () => void;
}

export function ReservationSummary({ reservation, onNewReservation }: ReservationSummaryProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-pink-200">
      <CardHeader className="text-center bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 p-4 animate-pulse">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Reservierung bestätigt! ✨
        </CardTitle>
        <p className="text-pink-600 text-lg mt-2">
          おめでとうございます！Dein magisches Maid Café Erlebnis erwartet dich! 💕
        </p>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {/* Reservation Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
              <Calendar className="h-5 w-5 text-pink-500" />
              <div>
                <p className="font-medium text-pink-800">Datum</p>
                <p className="text-sm text-pink-600">
                  {format(new Date(reservation.date), 'EEEE, d. MMMM yyyy', { locale: de })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <p className="font-medium text-purple-800">Uhrzeit</p>
                <p className="text-sm text-purple-600">{reservation.timeSlot.time}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium text-blue-800">Gäste</p>
                <p className="text-sm text-blue-600">
                  {reservation.guestCount} {reservation.guestCount === 1 ? 'Gast' : 'Gäste'}
                  {reservation.extraGuests > 0 && ` + ${reservation.extraGuests} zusätzlich`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="h-5 w-5 flex items-center justify-center bg-green-500 text-white rounded text-xs font-bold">
                T
              </div>
              <div>
                <p className="font-medium text-green-800">Tisch</p>
                <p className="text-sm text-green-600">
                  Tisch {reservation.table.number} ({reservation.table.capacity} Plätze)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Maid Information */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border border-pink-200">
          <h3 className="font-medium mb-4 text-pink-800 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Deine Kawaii Maid
          </h3>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-pink-200">
              <AvatarImage src={reservation.waiter.avatar} alt={reservation.waiter.name} />
              <AvatarFallback className="bg-pink-100 text-pink-600">
                {reservation.waiter.name.split('-')[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium text-lg text-pink-800">{reservation.waiter.name}</div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {reservation.waiter.rating} Kawaii Bewertung
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {reservation.waiter.specialties.map((specialty, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs bg-pink-100 text-pink-700 border-pink-200">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="font-medium text-pink-800 flex items-center gap-2">
            <User className="h-4 w-4" />
            Kontaktinformationen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Name</p>
                <p className="text-sm text-gray-600">{reservation.customerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">E-Mail</p>
                <p className="text-sm text-gray-600">{reservation.customerEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Telefon</p>
                <p className="text-sm text-gray-600">{reservation.customerPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        {reservation.specialRequests && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Besondere Wünsche 💝</p>
                <p className="text-sm text-blue-700 mt-1">{reservation.specialRequests}</p>
              </div>
            </div>
          </div>
        )}

        {/* Reservation ID */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-4 text-center border border-pink-200">
          <p className="text-sm text-pink-600 mb-1">Reservierungs-ID</p>
          <p className="font-mono text-lg font-bold text-pink-800">{reservation.id}</p>
          <p className="text-xs text-pink-500 mt-1">Bitte bringe diese ID ins Café mit! 📱</p>
        </div>

        {/* Café Info */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-2">Café Informationen 🏪</h4>
          <div className="space-y-1 text-sm text-yellow-700">
            <p>📍 Standort: Shibuya, Tokyo</p>
            <p>🕐 Täglich geöffnet: 10:00 - 21:00</p>
            <p>💰 Eintritt: ¥500/Stunde + Bestellungen</p>
            <p>📸 Fotoshootings verfügbar (+¥300)</p>
            <p>🎁 Geburtstagsfeiern willkommen!</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            onClick={onNewReservation} 
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Heart className="mr-2 h-4 w-4" />
            Weitere Reservierung
          </Button>
          <Button variant="outline" className="flex-1 border-pink-200 hover:bg-pink-50">
            <Sparkles className="mr-2 h-4 w-4" />
            Erlebnis teilen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}