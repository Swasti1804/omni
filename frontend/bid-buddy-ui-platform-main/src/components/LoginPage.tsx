
import { useState } from 'react';
import { Eye, EyeOff, Gavel, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface LoginPageProps {
  onLogin: (userData: any) => void;
  onSwitchToSignup: () => void;
}

const LoginPage = ({ onLogin, onSwitchToSignup }: LoginPageProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin({
      name: 'John Doe',
      email: formData.email
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 p-12 items-center justify-center relative overflow-hidden">
          <div className="relative z-10 text-center text-gray-700">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                  <Gavel className="w-12 h-12 text-white" />
                </div>
                <Mic className="w-12 h-12 absolute -bottom-2 -right-2 bg-cyan-400 rounded-full p-2 animate-bounce shadow-lg" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to AuctionVoice</h1>
            <p className="text-xl text-gray-600 mb-8">Your AI-powered auction assistant</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/60 rounded-lg p-4 backdrop-blur-sm shadow-sm border border-white/50">
                <div className="font-semibold text-gray-800">Smart Bidding</div>
                <div className="text-gray-600">AI-powered assistance</div>
              </div>
              <div className="bg-white/60 rounded-lg p-4 backdrop-blur-sm shadow-sm border border-white/50">
                <div className="font-semibold text-gray-800">Voice Control</div>
                <div className="text-gray-600">Hands-free bidding</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-12 bg-gray-50/50">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <Card className="p-8 bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/80 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-white/80 border-gray-300 text-gray-800 placeholder-gray-500 pr-12 focus:border-indigo-500"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Sign In
                </Button>
              </form>
            </Card>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button 
                  onClick={onSwitchToSignup}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
