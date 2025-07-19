const API_BASE_URL = "http://localhost:5000/api"; // Change if hosted elsewhere

export async function registerUser({ email, password }) {
    const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data;
}

export async function loginUser(userData) {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");
        return data;
    } catch (error) {
        throw error;
    }
}

export async function updateProfile({ name, phone, token }) {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Profile update failed");
    return data;
}
