import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { AlertCircle, Wind, Droplets, Compass, Eye, LogOut } from "lucide-react";
import { WeatherData } from "@/types/weather";
import { useLocation } from "wouter";

export default function WeatherPage() {
  const { logout } = useAuth();
  const [_, navigate] = useLocation();
  const [updateTime, setUpdateTime] = useState<string>("");

  const { data: weatherData, isLoading, error } = useQuery<WeatherData>({
    queryKey: ["weather-data"],
    queryFn: async () => {
      const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=0e1b5102e5171050a365607832781aa9&units=metric");
      if (!response.ok) {
        throw new Error("Ошибка при получении данных о погоде");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (!isLoading && !error) {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      };
      setUpdateTime(now.toLocaleString('ru-RU', options));
    }
  }, [isLoading, error]);

  return (
    <div className="min-h-[80vh] pt-8 max-w-md mx-auto px-4 py-8">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Погода в Москве</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="text-gray-500 hover:text-secondary transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="py-8 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-500">Загрузка данных о погоде...</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="bg-red-50 border-l-4 border-secondary my-4">
              <div className="flex">
                <AlertCircle className="h-4 w-4 text-secondary" />
                <AlertDescription className="ml-2 text-sm text-secondary">
                  Не удалось загрузить данные о погоде. Пожалуйста, попробуйте позже.
                </AlertDescription>
              </div>
            </Alert>
          )}

          {!isLoading && !error && weatherData && (
            <div className="space-y-6">
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <div className="text-5xl font-bold text-dark mb-2">
                  {Math.round(weatherData.main.temp)}°C
                </div>
                <div className="text-lg text-gray-600 capitalize">
                  {weatherData.weather[0].description}
                </div>
                <img 
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                  alt="Иконка погоды" 
                  className="w-20 h-20 mt-2"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Wind className="text-2xl text-primary mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-500">Скорость ветра</h3>
                      <p className="text-lg font-medium text-dark">{weatherData.wind.speed} м/с</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Droplets className="text-2xl text-primary mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-500">Влажность</h3>
                      <p className="text-lg font-medium text-dark">{weatherData.main.humidity}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Compass className="text-2xl text-primary mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-500">Давление</h3>
                      <p className="text-lg font-medium text-dark">{weatherData.main.pressure} гПа</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Eye className="text-2xl text-primary mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-500">Видимость</h3>
                      <p className="text-lg font-medium text-dark">{weatherData.visibility} м</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center text-xs text-gray-500">
                <p>Данные обновлены: <span>{updateTime}</span></p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
