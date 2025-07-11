import { useState } from 'react';
import { Clock, MapPin, Phone, Mail, Globe, Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'react-hot-toast';
import { RestaurantSettings, Waiter, Table, TimeSlot } from '../types';

interface AdminSettingsProps {
  settings: RestaurantSettings;
  waiters: Waiter[];
  tables: Table[];
  timeSlots: TimeSlot[];
  onUpdateSettings: (settings: RestaurantSettings) => void;
  onUpdateWaiters: (waiters: Waiter[]) => void;
  onUpdateTables: (tables: Table[]) => void;
  onUpdateTimeSlots: (timeSlots: TimeSlot[]) => void;
}

export function AdminSettings({ 
  settings, 
  waiters, 
  tables, 
  timeSlots, 
  onUpdateSettings,
  onUpdateWaiters,
  onUpdateTables,
  onUpdateTimeSlots 
}: AdminSettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [localWaiters, setLocalWaiters] = useState(waiters);
  const [localTables, setLocalTables] = useState(tables);
  const [localTimeSlots, setLocalTimeSlots] = useState(timeSlots);
  const [editingWaiter, setEditingWaiter] = useState<string | null>(null);
  const [editingTable, setEditingTable] = useState<string | null>(null);

  const handleSaveSettings = () => {
    onUpdateSettings(localSettings);
    toast.success('Einstellungen gespeichert! ✨');
  };

  const handleSaveWaiters = () => {
    onUpdateWaiters(localWaiters);
    setEditingWaiter(null);
    toast.success('Maid-Einstellungen gespeichert! 👸');
  };

  const handleSaveTables = () => {
    onUpdateTables(localTables);
    setEditingTable(null);
    toast.success('Tisch-Einstellungen gespeichert! 🪑');
  };

  const handleSaveTimeSlots = () => {
    onUpdateTimeSlots(localTimeSlots);
    toast.success('Uhrzeiten gespeichert! ⏰');
  };

  const addWaiter = () => {
    const newWaiter: Waiter = {
      id: Date.now().toString(),
      name: 'Neue Maid-chan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      rating: 4.5,
      specialties: ['Kawaii Service']
    };
    setLocalWaiters([...localWaiters, newWaiter]);
    setEditingWaiter(newWaiter.id);
  };

  const removeWaiter = (id: string) => {
    setLocalWaiters(localWaiters.filter(w => w.id !== id));
  };

  const updateWaiter = (id: string, updates: Partial<Waiter>) => {
    setLocalWaiters(localWaiters.map(w => 
      w.id === id ? { ...w, ...updates } : w
    ));
  };

  const addTable = () => {
    const newTable: Table = {
      id: Date.now().toString(),
      number: Math.max(...localTables.map(t => t.number)) + 1,
      capacity: 2,
      allowExtraGuests: true,
      maxExtraGuests: 1
    };
    setLocalTables([...localTables, newTable]);
    setEditingTable(newTable.id);
  };

  const removeTable = (id: string) => {
    setLocalTables(localTables.filter(t => t.id !== id));
  };

  const updateTable = (id: string, updates: Partial<Table>) => {
    setLocalTables(localTables.map(t => 
      t.id === id ? { ...t, ...updates } : t
    ));
  };

  const addTimeSlot = () => {
    const newTimeSlot: TimeSlot = {
      id: Date.now().toString(),
      time: '21:00',
      available: true
    };
    setLocalTimeSlots([...localTimeSlots, newTimeSlot]);
  };

  const removeTimeSlot = (id: string) => {
    setLocalTimeSlots(localTimeSlots.filter(t => t.id !== id));
  };

  const updateTimeSlot = (id: string, updates: Partial<TimeSlot>) => {
    setLocalTimeSlots(localTimeSlots.map(t => 
      t.id === id ? { ...t, ...updates } : t
    ));
  };

  const dayNames = {
    monday: 'Montag',
    tuesday: 'Dienstag',
    wednesday: 'Mittwoch',
    thursday: 'Donnerstag',
    friday: 'Freitag',
    saturday: 'Samstag',
    sunday: 'Sonntag'
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="border-pink-200">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
          <CardTitle className="text-2xl text-pink-800">Admin Einstellungen ⚙️</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Allgemein</TabsTrigger>
              <TabsTrigger value="maids">Maids</TabsTrigger>
              <TabsTrigger value="tables">Tische</TabsTrigger>
              <TabsTrigger value="times">Uhrzeiten</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-pink-500" />
                      Standort & Kontakt
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Café Name</Label>
                      <Input
                        value={localSettings.name}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          name: e.target.value
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Beschreibung</Label>
                      <Textarea
                        value={localSettings.description}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          description: e.target.value
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Adresse</Label>
                      <Input
                        value={localSettings.location.address}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          location: {
                            ...localSettings.location,
                            address: e.target.value
                          }
                        })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Stadt</Label>
                        <Input
                          value={localSettings.location.city}
                          onChange={(e) => setLocalSettings({
                            ...localSettings,
                            location: {
                              ...localSettings.location,
                              city: e.target.value
                            }
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Land</Label>
                        <Input
                          value={localSettings.location.country}
                          onChange={(e) => setLocalSettings({
                            ...localSettings,
                            location: {
                              ...localSettings.location,
                              country: e.target.value
                            }
                          })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Telefon</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          className="pl-9"
                          value={localSettings.contact.phone}
                          onChange={(e) => setLocalSettings({
                            ...localSettings,
                            contact: {
                              ...localSettings.contact,
                              phone: e.target.value
                            }
                          })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>E-Mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          className="pl-9"
                          value={localSettings.contact.email}
                          onChange={(e) => setLocalSettings({
                            ...localSettings,
                            contact: {
                              ...localSettings.contact,
                              email: e.target.value
                            }
                          })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          className="pl-9"
                          value={localSettings.contact.website}
                          onChange={(e) => setLocalSettings({
                            ...localSettings,
                            contact: {
                              ...localSettings.contact,
                              website: e.target.value
                            }
                          })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-purple-500" />
                      Öffnungszeiten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(dayNames).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-3">
                        <div className="w-20 text-sm font-medium">{label}</div>
                        <Switch
                          checked={!localSettings.openingHours[key].closed}
                          onCheckedChange={(checked) => setLocalSettings({
                            ...localSettings,
                            openingHours: {
                              ...localSettings.openingHours,
                              [key]: {
                                ...localSettings.openingHours[key],
                                closed: !checked
                              }
                            }
                          })}
                        />
                        {!localSettings.openingHours[key].closed && (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="time"
                              className="w-24"
                              value={localSettings.openingHours[key].open}
                              onChange={(e) => setLocalSettings({
                                ...localSettings,
                                openingHours: {
                                  ...localSettings.openingHours,
                                  [key]: {
                                    ...localSettings.openingHours[key],
                                    open: e.target.value
                                  }
                                }
                              })}
                            />
                            <span className="text-sm text-gray-500">bis</span>
                            <Input
                              type="time"
                              className="w-24"
                              value={localSettings.openingHours[key].close}
                              onChange={(e) => setLocalSettings({
                                ...localSettings,
                                openingHours: {
                                  ...localSettings.openingHours,
                                  [key]: {
                                    ...localSettings.openingHours[key],
                                    close: e.target.value
                                  }
                                }
                              })}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <Label className="text-sm font-medium">Preise</Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="space-y-1">
                          <Label className="text-xs">Eintritt/Stunde</Label>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{localSettings.pricing.currency}</span>
                            <Input
                              type="number"
                              value={localSettings.pricing.entryFee}
                              onChange={(e) => setLocalSettings({
                                ...localSettings,
                                pricing: {
                                  ...localSettings.pricing,
                                  entryFee: Number(e.target.value)
                                }
                              })}
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Fotoshooting</Label>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{localSettings.pricing.currency}</span>
                            <Input
                              type="number"
                              value={localSettings.pricing.photoSession}
                              onChange={(e) => setLocalSettings({
                                ...localSettings,
                                pricing: {
                                  ...localSettings.pricing,
                                  photoSession: Number(e.target.value)
                                }
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-pink-500 hover:bg-pink-600">
                  <Save className="mr-2 h-4 w-4" />
                  Einstellungen speichern
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="maids" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Maid Verwaltung 👸</h3>
                <Button onClick={addWaiter} className="bg-pink-500 hover:bg-pink-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Maid hinzufügen
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {localWaiters.map((waiter) => (
                  <Card key={waiter.id} className="border-pink-200">
                    <CardContent className="p-4">
                      {editingWaiter === waiter.id ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={waiter.avatar} />
                              <AvatarFallback>{waiter.name.split('-')[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setEditingWaiter(null);
                                  handleSaveWaiters();
                                }}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingWaiter(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Input
                              value={waiter.name}
                              onChange={(e) => updateWaiter(waiter.id, { name: e.target.value })}
                              placeholder="Name"
                            />
                            <Input
                              value={waiter.avatar}
                              onChange={(e) => updateWaiter(waiter.id, { avatar: e.target.value })}
                              placeholder="Avatar URL"
                            />
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              max="5"
                              value={waiter.rating}
                              onChange={(e) => updateWaiter(waiter.id, { rating: Number(e.target.value) })}
                              placeholder="Bewertung"
                            />
                            <Input
                              value={waiter.specialties.join(', ')}
                              onChange={(e) => updateWaiter(waiter.id, { 
                                specialties: e.target.value.split(',').map(s => s.trim()) 
                              })}
                              placeholder="Spezialitäten (kommagetrennt)"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={waiter.avatar} />
                                <AvatarFallback>{waiter.name.split('-')[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{waiter.name}</h4>
                                <p className="text-sm text-gray-600">⭐ {waiter.rating}</p>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingWaiter(waiter.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeWaiter(waiter.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {waiter.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tables" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Tisch Verwaltung 🪑</h3>
                <Button onClick={addTable} className="bg-purple-500 hover:bg-purple-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Tisch hinzufügen
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {localTables.map((table) => (
                  <Card key={table.id} className="border-purple-200">
                    <CardContent className="p-4">
                      {editingTable === table.id ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Tisch bearbeiten</h4>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setEditingTable(null);
                                  handleSaveTables();
                                }}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingTable(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Input
                              type="number"
                              value={table.number}
                              onChange={(e) => updateTable(table.id, { number: Number(e.target.value) })}
                              placeholder="Tisch Nummer"
                            />
                            <Input
                              type="number"
                              value={table.capacity}
                              onChange={(e) => updateTable(table.id, { capacity: Number(e.target.value) })}
                              placeholder="Kapazität"
                            />
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={table.allowExtraGuests}
                                onCheckedChange={(checked) => updateTable(table.id, { allowExtraGuests: checked })}
                              />
                              <Label className="text-sm">Extra Gäste erlauben</Label>
                            </div>
                            {table.allowExtraGuests && (
                              <Input
                                type="number"
                                value={table.maxExtraGuests}
                                onChange={(e) => updateTable(table.id, { maxExtraGuests: Number(e.target.value) })}
                                placeholder="Max. Extra Gäste"
                              />
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-lg">Tisch {table.number}</h4>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingTable(table.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeTable(table.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>{table.capacity} Plätze</p>
                            {table.allowExtraGuests && (
                              <p>+{table.maxExtraGuests} extra möglich</p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="times" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Uhrzeiten Verwaltung ⏰</h3>
                <Button onClick={addTimeSlot} className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Uhrzeit hinzufügen
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {localTimeSlots.map((timeSlot) => (
                  <Card key={timeSlot.id} className="border-blue-200">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Input
                            type="time"
                            value={timeSlot.time}
                            onChange={(e) => updateTimeSlot(timeSlot.id, { time: e.target.value })}
                            className="w-20 text-sm"
                          />
                          <Switch
                            checked={timeSlot.available}
                            onCheckedChange={(checked) => updateTimeSlot(timeSlot.id, { available: checked })}
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeTimeSlot(timeSlot.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveTimeSlots} className="bg-blue-500 hover:bg-blue-600">
                  <Save className="mr-2 h-4 w-4" />
                  Uhrzeiten speichern
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}