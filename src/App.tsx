import { useState } from 'react';
import { Calendar, Settings, List, Heart, Sparkles } from 'lucide-react';
import { RestaurantHeader } from './components/RestaurantHeader';
import { ReservationForm } from './components/ReservationForm';
import { ReservationSummary } from './components/ReservationSummary';
import { ReservationOverview } from './components/ReservationOverview';
import { AdminSettings } from './components/AdminSettings';
import { PinProtection } from './components/PinProtection';
import { ReservationPinProtection } from './components/ReservationPinProtection';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Reservation, ViewMode, RestaurantSettings, Waiter, Table, TimeSlot } from './types';
import { 
  mockRestaurantConfig, 
  mockRestaurantSettings, 
  mockReservations 
} from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('reservation');
  const [currentReservation, setCurrentReservation] = useState<Reservation | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [settings, setSettings] = useState<RestaurantSettings>(mockRestaurantSettings);
  const [waiters, setWaiters] = useState<Waiter[]>(mockRestaurantConfig.waiters);
  const [tables, setTables] = useState<Table[]>(mockRestaurantConfig.tables);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockRestaurantConfig.timeSlots);
  const [adminPin, setAdminPin] = useState('1234');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [overviewPin, setOverviewPin] = useState('5678');
  const [isOverviewUnlocked, setIsOverviewUnlocked] = useState(false);

  const handleReservationComplete = (reservation: Reservation) => {
    setReservations(prev => [...prev, reservation]);
    setCurrentReservation(reservation);
  };

  const handleNewReservation = () => {
    setCurrentReservation(null);
  };

  const handleUpdateReservation = (updatedReservation: Reservation) => {
    setReservations(prev => 
      prev.map(r => r.id === updatedReservation.id ? updatedReservation : r)
    );
  };

  const handleDeleteReservation = (id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  const handleUpdateSettings = (newSettings: RestaurantSettings) => {
    setSettings(newSettings);
  };

  const handleUpdateWaiters = (newWaiters: Waiter[]) => {
    setWaiters(newWaiters);
  };

  const handleUpdateTables = (newTables: Table[]) => {
    setTables(newTables);
  };

  const handleUpdateTimeSlots = (newTimeSlots: TimeSlot[]) => {
    setTimeSlots(newTimeSlots);
  };

  const currentConfig = {
    timeSlots,
    tables,
    waiters
  };

  const handleOverviewPinChange = (newPin: string) => {
    setOverviewPin(newPin);
  };

  const handleUnlockOverview = () => {
    setIsOverviewUnlocked(true);
  };

  const handleLockOverview = () => {
    setIsOverviewUnlocked(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <RestaurantHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <Card className="mb-8 border-pink-200 shadow-lg">
          <CardContent className="p-6">
            <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as ViewMode)}>
              <TabsList className="grid w-full grid-cols-3 bg-pink-50">
                <TabsTrigger 
                  value="reservation" 
                  className="flex items-center gap-2 data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                >
                  <Calendar className="h-4 w-4" />
                  Reservierung
                </TabsTrigger>
                <TabsTrigger 
                  value="overview" 
                  className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                >
                  <List className="h-4 w-4" />
                  Übersicht
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  <Settings className="h-4 w-4" />
                  Einstellungen
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="reservation" className="mt-6">
                {currentReservation ? (
                  <div className="space-y-6">
                    <ReservationSummary 
                      reservation={currentReservation} 
                      onNewReservation={handleNewReservation}
                    />
                    <div className="text-center">
                      <Button 
                        onClick={() => setCurrentView('overview')}
                        variant="outline"
                        className="border-pink-200 hover:bg-pink-50"
                      >
                        <List className="mr-2 h-4 w-4" />
                        Alle Reservierungen anzeigen
                      </Button>
                    </div>
                  </div>
                ) : (
                  <ReservationForm 
                    onReservationComplete={handleReservationComplete}
                    config={currentConfig}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="overview" className="mt-6">
                {isOverviewUnlocked ? (
                  <div className="space-y-4">
                    <ReservationOverview
                      reservations={reservations}
                      waiters={waiters}
                      tables={tables}
                      timeSlots={timeSlots}
                      onUpdateReservation={handleUpdateReservation}
                      onDeleteReservation={handleDeleteReservation}
                      onLock={handleLockOverview}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ReservationPinProtection
                      onUnlock={handleUnlockOverview}
                      onLock={handleLockOverview}
                      adminPin={overviewPin}
                      onPinChange={handleOverviewPinChange}
                    />
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6">
                {!isAdminUnlocked ? (
                  <PinProtection
                    onUnlock={() => setIsAdminUnlocked(true)}
                    adminPin={adminPin}
                    onPinChange={setAdminPin}
                  />
                ) : (
                  <div className="space-y-4">
                    <PinProtection
                      onUnlock={() => setIsAdminUnlocked(true)}
                      adminPin={adminPin}
                      onPinChange={setAdminPin}
                    />
                    <AdminSettings
                      settings={settings}
                      waiters={waiters}
                      tables={tables}
                      timeSlots={timeSlots}
                      onUpdateSettings={handleUpdateSettings}
                      onUpdateWaiters={handleUpdateWaiters}
                      onUpdateTables={handleUpdateTables}
                      onUpdateTimeSlots={handleUpdateTimeSlots}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        {currentView === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Bestätigte Reservierungen</p>
                    <p className="text-2xl font-bold text-green-800">
                      {reservations.filter(r => r.status === 'confirmed').length}
                    </p>
                  </div>
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-green-600 fill-current" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Ausstehende Reservierungen</p>
                    <p className="text-2xl font-bold text-yellow-800">
                      {reservations.filter(r => r.status === 'pending').length}
                    </p>
                  </div>
                  <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Gesamt Reservierungen</p>
                    <p className="text-2xl font-bold text-blue-800">{reservations.length}</p>
                  </div>
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;