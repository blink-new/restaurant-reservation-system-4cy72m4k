import { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar, Clock, Users, Star, Phone, Mail, User, MessageSquare, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { toast } from 'react-hot-toast';
import { cn } from '../lib/utils';
import { Reservation, TimeSlot, Table, Waiter, RestaurantConfig } from '../types';

interface ReservationFormProps {
  onReservationComplete: (reservation: Reservation) => void;
  config: RestaurantConfig;
}

export function ReservationForm({ onReservationComplete, config }: ReservationFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>();
  const [selectedTable, setSelectedTable] = useState<Table>();
  const [selectedWaiter, setSelectedWaiter] = useState<Waiter>();
  const [guestCount, setGuestCount] = useState<number>(2);
  const [extraGuests, setExtraGuests] = useState<number>(0);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { timeSlots, tables, waiters } = config;

  const availableTables = tables.filter(table => 
    table.capacity >= guestCount && (!selectedTable || table.id === selectedTable.id)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTimeSlot || !selectedTable || !selectedWaiter) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }

    if (!customerName || !customerEmail || !customerPhone) {
      toast.error('Bitte geben Sie Ihre Kontaktdaten an');
      return;
    }

    setIsSubmitting(true);

    try {
      const reservation: Reservation = {
        id: Date.now().toString(),
        customerName,
        customerEmail,
        customerPhone,
        date: format(selectedDate, 'yyyy-MM-dd'),
        timeSlot: selectedTimeSlot,
        table: selectedTable,
        guestCount,
        extraGuests,
        waiter: selectedWaiter,
        specialRequests,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onReservationComplete(reservation);
      toast.success('Reservierung bestätigt! おめでとう！✨');
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTimeSlot(undefined);
      setSelectedTable(undefined);
      setSelectedWaiter(undefined);
      setGuestCount(2);
      setExtraGuests(0);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setSpecialRequests('');
      
    } catch {
      toast.error('Reservierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-pink-200">
      <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
        <CardTitle className="flex items-center gap-2 text-2xl text-pink-800">
          <Heart className="h-6 w-6 fill-pink-500" />
          Maid Café Reservierung
          <Sparkles className="h-5 w-5 text-purple-500" />
        </CardTitle>
        <p className="text-pink-600">Buche dein magisches Erlebnis mit unseren kawaii Maids! 💕</p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Date Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-pink-800">Datum auswählen 📅</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-pink-200 hover:border-pink-300",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4 text-pink-500" />
                  {selectedDate ? format(selectedDate, "PPP", { locale: de }) : "Datum auswählen"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  initialFocus
                  locale={de}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Slot Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-pink-800">Uhrzeit auswählen ⏰</Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.id}
                  type="button"
                  variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                  className={cn(
                    "h-12 transition-all duration-200",
                    selectedTimeSlot?.id === slot.id 
                      ? "bg-pink-500 hover:bg-pink-600 text-white shadow-lg" 
                      : "border-pink-200 hover:border-pink-300 hover:bg-pink-50"
                  )}
                  onClick={() => setSelectedTimeSlot(slot)}
                  disabled={!slot.available}
                >
                  <Clock className="mr-1 h-4 w-4" />
                  {slot.time}
                </Button>
              ))}
            </div>
          </div>

          {/* Guest Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-base font-medium text-pink-800">Anzahl Gäste 👥</Label>
              <Select value={guestCount.toString()} onValueChange={(value) => setGuestCount(Number(value))}>
                <SelectTrigger className="border-pink-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-pink-500" />
                        {num} {num === 1 ? 'Gast' : 'Gäste'}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium text-pink-800">Zusätzliche Gäste ✨</Label>
              <Select 
                value={extraGuests.toString()} 
                onValueChange={(value) => setExtraGuests(Number(value))}
                disabled={!selectedTable?.allowExtraGuests}
              >
                <SelectTrigger className="border-pink-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: (selectedTable?.maxExtraGuests || 0) + 1 }, (_, i) => i).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Zusätzliche {num === 1 ? 'Person' : 'Personen'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-pink-800">Tisch auswählen 🪑</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {availableTables.map((table) => (
                <Button
                  key={table.id}
                  type="button"
                  variant={selectedTable?.id === table.id ? "default" : "outline"}
                  className={cn(
                    "h-20 flex-col transition-all duration-200",
                    selectedTable?.id === table.id 
                      ? "bg-pink-500 hover:bg-pink-600 text-white shadow-lg scale-105" 
                      : "border-pink-200 hover:border-pink-300 hover:bg-pink-50"
                  )}
                  onClick={() => setSelectedTable(table)}
                >
                  <div className="text-lg font-bold">Tisch {table.number}</div>
                  <div className="text-xs opacity-80">
                    {table.capacity} Plätze
                    {table.allowExtraGuests && (
                      <span className="block">+{table.maxExtraGuests} extra</span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Maid Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-pink-800">Deine Maid auswählen 👸</Label>
            <p className="text-sm text-pink-600 mb-4">Wähle deine bevorzugte Maid für das ultimative kawaii Erlebnis!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {waiters.map((waiter) => (
                <Button
                  key={waiter.id}
                  type="button"
                  variant={selectedWaiter?.id === waiter.id ? "default" : "outline"}
                  className={cn(
                    "h-auto p-4 flex-col space-y-3 transition-all duration-200",
                    selectedWaiter?.id === waiter.id 
                      ? "bg-pink-500 hover:bg-pink-600 text-white shadow-lg scale-105" 
                      : "border-pink-200 hover:border-pink-300 hover:bg-pink-50"
                  )}
                  onClick={() => setSelectedWaiter(waiter)}
                >
                  <Avatar className="h-16 w-16 border-2 border-pink-200">
                    <AvatarImage src={waiter.avatar} alt={waiter.name} />
                    <AvatarFallback className="bg-pink-100 text-pink-600">{waiter.name.split('-')[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <div className="font-medium text-lg">{waiter.name}</div>
                    <div className="flex items-center justify-center gap-1 text-sm opacity-80">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {waiter.rating}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2 justify-center">
                      {waiter.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-pink-100 text-pink-700 border-pink-200">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-pink-800">Kontaktinformationen 📞</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Vollständiger Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-pink-400" />
                  <Input
                    id="name"
                    placeholder="Ihr vollständiger Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="pl-9 border-pink-200 focus:border-pink-300"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-pink-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ihre@email.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="pl-9 border-pink-200 focus:border-pink-300"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-pink-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+49 123 456789"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="pl-9 border-pink-200 focus:border-pink-300"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="requests">Besondere Wünsche 💝</Label>
            <p className="text-sm text-pink-600">Besondere Anlässe, Ernährungseinschränkungen oder kawaii Wünsche?</p>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-pink-400" />
              <Textarea
                id="requests"
                placeholder="Geburtstagsfeier, Allergien, Lieblings-Anime-Charakter, etc..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="pl-9 min-h-[100px] border-pink-200 focus:border-pink-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-14 text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg transform transition-all duration-200 hover:scale-105"
            disabled={isSubmitting || !selectedDate || !selectedTimeSlot || !selectedTable || !selectedWaiter}
          >
            {isSubmitting ? (
              <>
                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                Dein Kawaii Erlebnis wird bestätigt...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-5 w-5" />
                Reservierung bestätigen ✨
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}