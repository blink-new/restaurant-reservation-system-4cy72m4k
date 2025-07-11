import { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Phone, 
  Mail, 
  User, 
  MessageSquare, 
  Edit, 
  Trash2, 
  Save,
  X,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'react-hot-toast';
import { Reservation, Waiter, Table, TimeSlot } from '../types';

interface ReservationOverviewProps {
  reservations: Reservation[];
  waiters: Waiter[];
  tables: Table[];
  timeSlots: TimeSlot[];
  onUpdateReservation: (reservation: Reservation) => void;
  onDeleteReservation: (id: string) => void;
  onLock?: () => void;
}

export function ReservationOverview({ 
  reservations, 
  waiters, 
  tables, 
  timeSlots, 
  onUpdateReservation, 
  onDeleteReservation, 
  onLock 
}: ReservationOverviewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.customerPhone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === 'today' && reservation.date === format(new Date(), 'yyyy-MM-dd')) ||
      (dateFilter === 'upcoming' && new Date(reservation.date) > new Date());
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleEditReservation = (reservation: Reservation) => {
    setEditingReservation({ ...reservation });
    setIsDialogOpen(true);
  };

  const handleSaveReservation = () => {
    if (editingReservation) {
      onUpdateReservation(editingReservation);
      setEditingReservation(null);
      setIsDialogOpen(false);
      toast.success('Reservierung aktualisiert! ✨');
    }
  };

  const handleDeleteReservation = (id: string) => {
    if (confirm('Sind Sie sicher, dass Sie diese Reservierung löschen möchten?')) {
      onDeleteReservation(id);
      toast.success('Reservierung gelöscht!');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Bestätigt';
      case 'pending':
        return 'Ausstehend';
      case 'cancelled':
        return 'Storniert';
      default:
        return 'Unbekannt';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Card className="border-pink-200">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
          <CardTitle className="text-2xl text-pink-800">Reservierungsübersicht 📋</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Lock Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Reservierungsübersicht</h2>
            <Button variant="outline" size="sm" onClick={onLock} className="border-gray-200 hover:bg-gray-50">
              <Lock className="h-4 w-4" />
              <span className="ml-2">Sperren</span>
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-60">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Suche nach Name, E-Mail oder Telefon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle</SelectItem>
                  <SelectItem value="confirmed">Bestätigt</SelectItem>
                  <SelectItem value="pending">Ausstehend</SelectItem>
                  <SelectItem value="cancelled">Storniert</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Datum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle</SelectItem>
                  <SelectItem value="today">Heute</SelectItem>
                  <SelectItem value="upcoming">Kommende</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reservation Cards */}
          <div className="grid gap-4">
            {filteredReservations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Keine Reservierungen gefunden.</p>
              </div>
            ) : (
              filteredReservations.map((reservation) => (
                <Card key={reservation.id} className="border-l-4 border-l-pink-400">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-pink-500" />
                            <span className="font-medium text-lg">{reservation.customerName}</span>
                          </div>
                          <Badge className={`${getStatusColor(reservation.status)} border`}>
                            {getStatusIcon(reservation.status)}
                            <span className="ml-1">{getStatusLabel(reservation.status)}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span>{format(new Date(reservation.date), 'dd.MM.yyyy', { locale: de })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-purple-500" />
                            <span>{reservation.timeSlot.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-green-500" />
                            <span>
                              {reservation.guestCount} Gäste
                              {reservation.extraGuests > 0 && ` +${reservation.extraGuests}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 flex items-center justify-center bg-orange-500 text-white rounded text-xs font-bold">
                              T
                            </div>
                            <span>Tisch {reservation.table.number}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span>{reservation.customerEmail}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{reservation.customerPhone}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reservation.waiter.avatar} alt={reservation.waiter.name} />
                            <AvatarFallback className="text-xs">
                              {reservation.waiter.name.split('-')[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{reservation.waiter.name}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{reservation.waiter.rating}</span>
                          </div>
                        </div>
                        
                        {reservation.specialRequests && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                            <strong>Besondere Wünsche:</strong> {reservation.specialRequests}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditReservation(reservation)}
                          className="border-pink-200 hover:bg-pink-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteReservation(reservation.id)}
                          className="border-red-200 hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reservierung bearbeiten</DialogTitle>
          </DialogHeader>
          {editingReservation && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={editingReservation.customerName}
                    onChange={(e) => setEditingReservation({
                      ...editingReservation,
                      customerName: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-Mail</Label>
                  <Input
                    value={editingReservation.customerEmail}
                    onChange={(e) => setEditingReservation({
                      ...editingReservation,
                      customerEmail: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefon</Label>
                  <Input
                    value={editingReservation.customerPhone}
                    onChange={(e) => setEditingReservation({
                      ...editingReservation,
                      customerPhone: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={editingReservation.status} 
                    onValueChange={(value: 'confirmed' | 'pending' | 'cancelled') => setEditingReservation({
                      ...editingReservation,
                      status: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Bestätigt</SelectItem>
                      <SelectItem value="pending">Ausstehend</SelectItem>
                      <SelectItem value="cancelled">Storniert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Datum</Label>
                  <Input
                    type="date"
                    value={editingReservation.date}
                    onChange={(e) => setEditingReservation({
                      ...editingReservation,
                      date: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Uhrzeit</Label>
                  <Select 
                    value={editingReservation.timeSlot.id} 
                    onValueChange={(value) => {
                      const timeSlot = timeSlots.find(t => t.id === value);
                      if (timeSlot) {
                        setEditingReservation({
                          ...editingReservation,
                          timeSlot
                        });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot.id} value={slot.id}>{slot.time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tisch</Label>
                  <Select 
                    value={editingReservation.table.id} 
                    onValueChange={(value) => {
                      const table = tables.find(t => t.id === value);
                      if (table) {
                        setEditingReservation({
                          ...editingReservation,
                          table
                        });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tables.map(table => (
                        <SelectItem key={table.id} value={table.id}>
                          Tisch {table.number} ({table.capacity} Plätze)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Maid</Label>
                  <Select 
                    value={editingReservation.waiter.id} 
                    onValueChange={(value) => {
                      const waiter = waiters.find(w => w.id === value);
                      if (waiter) {
                        setEditingReservation({
                          ...editingReservation,
                          waiter
                        });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {waiters.map(waiter => (
                        <SelectItem key={waiter.id} value={waiter.id}>{waiter.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Besondere Wünsche</Label>
                <Textarea
                  value={editingReservation.specialRequests}
                  onChange={(e) => setEditingReservation({
                    ...editingReservation,
                    specialRequests: e.target.value
                  })}
                  placeholder="Besondere Wünsche oder Anmerkungen..."
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="mr-2 h-4 w-4" />
                  Abbrechen
                </Button>
                <Button onClick={handleSaveReservation} className="bg-pink-500 hover:bg-pink-600">
                  <Save className="mr-2 h-4 w-4" />
                  Speichern
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}