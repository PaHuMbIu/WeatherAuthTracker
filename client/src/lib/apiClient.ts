interface LoginResponse {
  token: string;
}

export async function loginUser(email: string, password: string): Promise<string> {
  try {
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Ошибка авторизации");
    }

    const data: LoginResponse = await response.json();
    return data.token;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
