import { useState } from 'react';
import '../Components-css/AuthModal.css';

const loginInitial = {
  email: '',
  password: '',
  role: 'buyer',
};

const registerInitial = {
  name: '',
  email: '',
  password: '',
  role: 'buyer',
};

function AuthModal({ isOpen, mode, pending, error, onClose, onModeChange, onSubmit }) {
  const [loginForm, setLoginForm] = useState(loginInitial);
  const [registerForm, setRegisterForm] = useState(registerInitial);

  if (!isOpen) {
    return null;
  }

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((current) => ({ ...current, [name]: value }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((current) => ({ ...current, [name]: value }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    await onSubmit('login', loginForm);
    setLoginForm(loginInitial);
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    await onSubmit('register', registerForm);
    setRegisterForm(registerInitial);
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="auth-close" onClick={onClose} aria-label="Close form">
          x
        </button>

        <div className="auth-switch">
          <button
            type="button"
            className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => onModeChange('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => onModeChange('register')}
          >
            Register
          </button>
        </div>

        {mode === 'login' ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <h3>Login to EstateMind</h3>
            <p>Select your access type and enter your account details.</p>

            <label className="field-group">
              <span>Email</span>
              <input name="email" type="email" value={loginForm.email} onChange={handleLoginChange} placeholder="buyer@example.com" />
            </label>

            <label className="field-group">
              <span>Password</span>
              <input name="password" type="password" value={loginForm.password} onChange={handleLoginChange} placeholder="Enter password" />
            </label>

            <label className="field-group">
              <span>Login as</span>
              <select name="role" value={loginForm.role} onChange={handleLoginChange} className="auth-select">
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            {error ? <p className="auth-error">{error}</p> : null}

            <button type="submit" className="primary-action" disabled={pending}>
              {pending ? 'Logging In...' : 'Login'}
            </button>

            <p className="auth-footnote">
              No account yet?{' '}
              <button type="button" className="inline-switch" onClick={() => onModeChange('register')}>
                Register here
              </button>
            </p>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <h3>Create your account</h3>
            <p>Register as a buyer or seller to use the correct platform tools.</p>

            <label className="field-group">
              <span>Full name</span>
              <input name="name" type="text" value={registerForm.name} onChange={handleRegisterChange} placeholder="Your name" />
            </label>

            <label className="field-group">
              <span>Email</span>
              <input name="email" type="email" value={registerForm.email} onChange={handleRegisterChange} placeholder="seller@example.com" />
            </label>

            <label className="field-group">
              <span>Password</span>
              <input name="password" type="password" value={registerForm.password} onChange={handleRegisterChange} placeholder="Create password" />
            </label>

            <label className="field-group">
              <span>Register as</span>
              <select name="role" value={registerForm.role} onChange={handleRegisterChange} className="auth-select">
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </label>

            {error ? <p className="auth-error">{error}</p> : null}

            <button type="submit" className="primary-action" disabled={pending}>
              {pending ? 'Registering...' : 'Register'}
            </button>

            <p className="auth-footnote">
              Already have an account?{' '}
              <button type="button" className="inline-switch" onClick={() => onModeChange('login')}>
                Login here
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
