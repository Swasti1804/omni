
import { useState } from 'react';
import { Eye, EyeOff, Gavel, Mic, Users, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface SignupPageProps {
  onSignup: (userData: any) => void;
  onSwitchToLogin: () => void;
}

const SignupPage = ({ onSignup, onSwitchToLogin }: SignupPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Simulate signup
    onSignup({
      name: formData.name,
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
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-50 to-blue-100 p-12 items-center justify-center relative overflow-hidden">
          <div className="relative z-10 text-center text-gray-700">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                  <Gavel className="w-12 h-12 text-white" />
                </div>
                <Mic className="w-12 h-12 absolute -bottom-2 -right-2 bg-cyan-400 rounded-full p-2 animate-bounce shadow-lg" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Join AuctionVoice</h1>
            <p className="text-xl text-gray-600 mb-8">Start your smart auction journey</p>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="bg-white/60 rounded-lg p-4 backdrop-blur-sm shadow-sm border border-white/50 flex items-center space-x-3">
                <Users className="w-6 h-6 text-cyan-500" />
                <div className="text-left">
                  <div className="font-semibold text-gray-800">Join 10,000+ Users</div>
                  <div className="text-gray-600">Active auction community</div>
                </div>
              </div>
              <div className="bg-white/60 rounded-lg p-4 backdrop-blur-sm shadow-sm border border-white/50 flex items-center space-x-3">
                <Shield className="w-6 h-6 text-green-500" />
                <div className="text-left">
                  <div className="font-semibold text-gray-800">Secure Platform</div>
                  <div className="text-gray-600">Bank-level security</div>
                </div>
              </div>
              <div className="bg-white/60 rounded-lg p-4 backdrop-blur-sm shadow-sm border border-white/50 flex items-center space-x-3">
                <Zap className="w-6 h-6 text-yellow-500" />
                <div className="text-left">
                  <div className="font-semibold text-gray-800">AI-Powered</div>
                  <div className="text-gray-600">Smart bidding assistant</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 p-12 bg-gray-50/50">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-600">Get started with your auction journey</p>
            </div>

            <Card className="p-8 bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/80 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

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
                      placeholder="Create a password"
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="bg-white/80 border-gray-300 text-gray-800 placeholder-gray-500 pr-12 focus:border-indigo-500"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Create Account
                </Button>
              </form>
            </Card>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button 
                  onClick={onSwitchToLogin}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
