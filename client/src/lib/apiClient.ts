interface LoginResponse {
  token: string;
}

// Эмуляция ответа API для демонстрационной версии
export async function loginUser(email: string, password: string): Promise<string> {
  try {
    // Проверка демо-данных (для учебного проекта)
    if (email === "eve.holt@reqres.in" && password === "cityslicka") {
      // Вернуть демо-токен для учебного проекта
      return "demo-token-12345";
    } else {
      // Если данные не соответствуют демо-данным, выбросить ошибку
      throw new Error("Неверный email или пароль");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
