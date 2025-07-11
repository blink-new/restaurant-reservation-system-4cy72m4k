import { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, List, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'react-hot-toast';

interface ReservationPinProtectionProps {
  onUnlock: () => void;
  adminPin: string;
  onPinChange: (newPin: string) => void;
  onLock?: () => void;
}

export function ReservationPinProtection({ onUnlock, adminPin, onPinChange, onLock }: ReservationPinProtectionProps) {
  const [enteredPin, setEnteredPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isUnlockedState, setIsUnlockedState] = useState(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (enteredPin === adminPin) {
      setIsUnlockedState(true);
      toast.success('Reservierungsübersicht entsperrt! 📋✨');
      onUnlock();
    } else {
      toast.error('Falscher PIN! 🚫');
      setEnteredPin('');
    }
  };

  const handlePinChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPin.length !== 4) {
      toast.error('PIN muss 4 Ziffern haben!');
      return;
    }
    
    if (newPin !== confirmPin) {
      toast.error('PIN-Bestätigung stimmt nicht überein!');
      return;
    }
    
    onPinChange(newPin);
    setIsChangingPin(false);
    setNewPin('');
    setConfirmPin('');
    toast.success('Übersicht-PIN erfolgreich geändert! 🔑');
  };

  const handlePinInput = (value: string) => {
    // Nur Zahlen erlauben und auf 4 Stellen begrenzen
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);
    setEnteredPin(numericValue);
  };

  const handleNewPinInput = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);
    setNewPin(numericValue);
  };

  const handleConfirmPinInput = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);
    setConfirmPin(numericValue);
  };

  if (isUnlockedState) {
    return (
      <div className="mb-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <List className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">
                  Reservierungsübersicht entsperrt
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsChangingPin(true)}
                  className="border-green-300 hover:bg-green-100"
                >
                  PIN ändern
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsUnlockedState(false);
                    onLock?.();
                    setEnteredPin('');
                  }}
                  className="border-red-300 hover:bg-red-100"
                >
                  Sperren
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PIN Change Modal */}
        {isChangingPin && (
          <Card className="mt-4 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="h-5 w-5 text-yellow-600" />
                Übersicht-PIN ändern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePinChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPin">Neuer PIN (4 Ziffern)</Label>
                  <div className="relative">
                    <Input
                      id="newPin"
                      type={showPin ? 'text' : 'password'}
                      value={newPin}
                      onChange={(e) => handleNewPinInput(e.target.value)}
                      placeholder="0000"
                      className="text-center text-xl letter-spacing-widest font-mono"
                      maxLength={4}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPin(!showPin)}
                    >
                      {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPin">PIN bestätigen</Label>
                  <Input
                    id="confirmPin"
                    type={showPin ? 'text' : 'password'}
                    value={confirmPin}
                    onChange={(e) => handleConfirmPinInput(e.target.value)}
                    placeholder="0000"
                    className="text-center text-xl letter-spacing-widest font-mono"
                    maxLength={4}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600"
                    disabled={newPin.length !== 4 || confirmPin.length !== 4}
                  >
                    PIN ändern
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsChangingPin(false);
                      setNewPin('');
                      setConfirmPin('');
                    }}
                  >
                    Abbrechen
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2 text-purple-800">
          <Shield className="h-6 w-6" />
          Reservierungsübersicht gesperrt
        </CardTitle>
        <p className="text-purple-600 mt-2">
          Gib den 4-stelligen PIN ein, um die Reservierungen zu sehen
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 flex justify-center space-x-4">
          <div className="flex items-center gap-2 text-purple-600">
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Reservierungen</span>
          </div>
          <div className="flex items-center gap-2 text-purple-600">
            <Users className="h-5 w-5" />
            <span className="text-sm">Kundendaten</span>
          </div>
        </div>

        <form onSubmit={handlePinSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pin" className="text-center block">
              PIN eingeben
            </Label>
            <div className="relative">
              <Input
                id="pin"
                type={showPin ? 'text' : 'password'}
                value={enteredPin}
                onChange={(e) => handlePinInput(e.target.value)}
                placeholder="0000"
                className="text-center text-2xl letter-spacing-widest font-mono h-14 border-2 border-purple-200 focus:border-purple-400"
                maxLength={4}
                required
                autoComplete="off"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPin(!showPin)}
              >
                {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex justify-center space-x-2 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 ${
                    i < enteredPin.length
                      ? 'bg-purple-500 border-purple-500'
                      : 'border-purple-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-medium"
            disabled={enteredPin.length !== 4}
          >
            <Lock className="mr-2 h-5 w-5" />
            Entsperren
          </Button>
          
          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2 mt-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                type="button"
                variant="outline"
                className="h-12 text-lg font-medium hover:bg-purple-50"
                onClick={() => {
                  if (enteredPin.length < 4) {
                    setEnteredPin(enteredPin + num.toString());
                  }
                }}
                disabled={enteredPin.length >= 4}
              >
                {num}
              </Button>
            ))}
            <Button
              type="button"
              variant="outline"
              className="h-12 text-lg font-medium hover:bg-purple-50"
              onClick={() => setEnteredPin('')}
            >
              C
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 text-lg font-medium hover:bg-purple-50"
              onClick={() => {
                if (enteredPin.length < 4) {
                  setEnteredPin(enteredPin + '0');
                }
              }}
              disabled={enteredPin.length >= 4}
            >
              0
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 text-lg font-medium hover:bg-purple-50"
              onClick={() => setEnteredPin(enteredPin.slice(0, -1))}
              disabled={enteredPin.length === 0}
            >
              ⌫
            </Button>
          </div>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            <Lock className="inline h-4 w-4 mr-1" />
            Übersicht-PIN: <span className="font-mono font-bold">5678</span>
          </p>
          <p className="text-xs text-blue-600 text-center mt-1">
            Schützt sensible Kundendaten vor unbefugtem Zugriff
          </p>
        </div>
      </CardContent>
    </Card>
  );
}