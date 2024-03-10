import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SingupForm/SingupForm';
import { useUser } from '../../context/UserContext';
import './AuthStyle.css';

function AuthPage() {
	const [ isLoginMode, setIsLoginMode ] = useState(true);
	const { isLogged } = useUser();

	const toggleMode = () => {
		setIsLoginMode(!isLoginMode);
	};

	const onSignupSuccess = () => {
		setIsLoginMode(true);
	};

	return (
		<div className="auth-container">
			
			{isLoginMode ? <LoginForm /> : <SignupForm onSignupSuccess={onSignupSuccess} />}
			<button onClick={toggleMode} className="auth-toggle-mode-btn">
				{isLoginMode ? 'Create Account' : 'I already have an account'}
			</button>
		</div>
	);
}

export default AuthPage;
