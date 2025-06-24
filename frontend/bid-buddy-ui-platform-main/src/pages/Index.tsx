
import { useState } from 'react';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginPage 
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentPage('signup')}
          />
        );
      case 'signup':
        return (
          <SignupPage 
            onSignup={handleLogin}
            onSwitchToLogin={() => setCurrentPage('login')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard 
            user={user}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {currentPage !== 'dashboard' && <Header />}
      <main className={currentPage !== 'dashboard' ? 'pt-16' : ''}>
        {renderPage()}
      </main>
      {currentPage !== 'dashboard' && <Footer />}
    </div>
  );
};

export default Index;
