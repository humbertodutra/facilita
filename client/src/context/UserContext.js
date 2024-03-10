import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
	const [ user, setUser ] = useState(null);
	const [ isLogged, setIsLogged ] = useState(false);

	const verifyToken = async () => {
		const storedUser = localStorage.getItem('user');

		if (storedUser) {
			const { token } = JSON.parse(storedUser);

			try {
				const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/users/verifyToken`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						authorization: token
					}
				});

				setIsLogged(true);

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				// If the token is still valid, update the user state
				setUser(JSON.parse(storedUser));
			} catch (error) {
				console.error('Error verifying token:', error);
				logout(); // Logout the user if token verification fails
			}
		}
	};

	useEffect(() => {
		verifyToken();
	}, []);

	const login = (userData) => {
		const { email, token } = userData;
		const userInfo = { email, token, isLogged: true };
		setUser(userInfo);
		localStorage.setItem('user', JSON.stringify(userInfo));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<UserContext.Provider value={{ user, login, logout, isLogged, setIsLogged }}>{children}</UserContext.Provider>
	);
}

export function useUser() {
	return useContext(UserContext);
}
