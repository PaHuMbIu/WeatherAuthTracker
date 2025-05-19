import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import WeatherPage from "@/pages/weather";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/hooks/useAuth";
import { AuthProvider } from "@/context/AuthContext";
import HashRouter from "./components/HashRouter";

// Маршрутизация, которая использует AuthProvider
function AppRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        <HashRouter>
            <Switch>
                <Route path="/login">
                    { isAuthenticated ? <WeatherPage/> : <LoginPage/> }
                </Route>
                <Route path="/">
                    { isAuthenticated ? <WeatherPage/> : <LoginPage/> }
                </Route>
                <Route path="/weather">
                    <PrivateRoute>
                        <WeatherPage/>
                    </PrivateRoute>
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </HashRouter>
    );
}

function App() {
    return (
        <QueryClientProvider client={ queryClient }>
            <TooltipProvider>
                <Toaster/>
                <AuthProvider>
                    <AppRoutes/>
                </AuthProvider>
            </TooltipProvider>
        </QueryClientProvider>
    );
}

export default App;