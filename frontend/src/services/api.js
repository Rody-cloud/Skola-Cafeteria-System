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

export const getProducts = async () => {
    const response = await fetch(`${API_URL}/api/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

export const createOrder = async (orderData) => {
    const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Order placement failed');
    }
    return response.json();
};

export const getAllOrders = async () => {
    const response = await fetch(`${API_URL}/api/orders/all`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
};

export const updateOrderStatus = async (orderId, statusData) => {
    const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(statusData)
    });
    if (!response.ok) throw new Error('Failed to update status');
    return response.json();
};
