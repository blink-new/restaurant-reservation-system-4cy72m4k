import { Heart, Star, MapPin, Clock, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

export function RestaurantHeader() {
  return (
    <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-pink-500 text-white py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 animate-pulse">
              <Heart className="h-10 w-10 fill-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
            Meido Chi
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 mb-2 font-medium">
            メイド喫茶
          </p>
          <p className="text-lg text-white/90 mb-8">
            Dein magisches Maid Café Erlebnis erwartet dich! ✨
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
              <span>4.9 Kawaii Bewertung</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <MapPin className="h-4 w-4" />
              <span>Shibuya, Tokyo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Clock className="h-4 w-4" />
              <span>10:00 - 21:00</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="bg-pink-200 text-pink-800 border-pink-300 hover:bg-pink-300 transition-colors">
              <Sparkles className="h-3 w-3 mr-1" />
              Kawaii Service
            </Badge>
            <Badge variant="secondary" className="bg-purple-200 text-purple-800 border-purple-300 hover:bg-purple-300 transition-colors">
              🎯 Otaku Freundlich
            </Badge>
            <Badge variant="secondary" className="bg-blue-200 text-blue-800 border-blue-300 hover:bg-blue-300 transition-colors">
              📸 Fotozeit
            </Badge>
            <Badge variant="secondary" className="bg-green-200 text-green-800 border-green-300 hover:bg-green-300 transition-colors">
              🎮 Gaming Ecke
            </Badge>
            <Badge variant="secondary" className="bg-yellow-200 text-yellow-800 border-yellow-300 hover:bg-yellow-300 transition-colors">
              🍰 Themen Desserts
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}