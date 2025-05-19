import React, { useState, useEffect } from "react";
import { Router } from "wouter";

// Кастомный хук для работы с hash location
function useHashLocation(): [string, (to: string) => void] {
    const getHashPath = () => window.location.hash.replace(/^#/, '') || '/';

    const [loc, setLoc] = useState(getHashPath);

    useEffect(() => {
        const handler = () => setLoc(getHashPath());
        window.addEventListener("hashchange", handler);
        return () => window.removeEventListener("hashchange", handler);
    }, []);

    const navigate = (to: string) => {
        window.location.hash = to;
    };

    return [loc, navigate];
}

// Обертка Router с поддержкой hash-роутинга
function HashRouter({ children }: { children: React.ReactNode }) {
    return <Router hook={useHashLocation}>{children}</Router>;
}

export default HashRouter;

