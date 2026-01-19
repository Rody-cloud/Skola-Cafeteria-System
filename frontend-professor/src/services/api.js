const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000`;

export const checkBackendHealth = async () => {
    try {
        const response = await fetch(`${API_URL}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const message = await response.text();
        return message;
    } catch (error) {
        console.error("Backend health check failed:", error);
        throw error;
    }
};

export const register = async (userData) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
    }
    return response.json();
};

export const login = async (credentials) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }
    return response.json();
};
