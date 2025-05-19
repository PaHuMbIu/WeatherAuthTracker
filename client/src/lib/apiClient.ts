interface LoginResponse {
  token: string;
}

// Функция авторизации, принимающая любые данные
export async function loginUser(email: string, password: string): Promise<string> {
  try {
    // Для учебного проекта принимаем любые данные
    // Проверяем только что email похож на email и пароль не пустой
    if (email && email.includes('@') && password) {
      return "demo-token-12345";
    } else {
      throw new Error("Пожалуйста, введите корректный email и пароль");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
