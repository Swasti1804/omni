import { useState, useEffect } from 'react';
import {
  Gavel, Mic, History, Settings, LogOut, Search, Bell, Menu, X,
  Clock, TrendingUp, Users, Sun, Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import AuctionCard from './AuctionCard';
import VoiceAssistant from './VoiceAssistant';
import Header from './Header';
import Footer from './Footer';

interface Auction {
  id: number;
  name: string;
  description: string;
  currentBid: number;
  timeLeft: number;
}

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('auctions');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [auctionItems, setAuctionItems] = useState<Auction[]>([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('http://localhost:3000/products'); // Replace with ngrok URL if hosted
        const data = await response.json();
        setAuctionItems(data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };
    fetchAuctions();
  }, []);

  const filteredAuctions = auctionItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuItems = [
    { id: 'auctions', label: 'Live Auctions', icon: Gavel },
    { id: 'history', label: 'Bid History', icon: History },
    { id: 'voice', label: 'Voice Assistant', icon: Mic },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-colors duration-300">
      <Header />

      <div className="flex pt-16">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar & Navigation - (same as your original code) */}
        {/* [Keep your Sidebar code here unchanged] */}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Dashboard Header */}
          <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-lavender-200/50 dark:border-gray-700/50 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-700 dark:text-gray-300 hover:bg-lavender-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Welcome back, {user?.name?.split(' ')[0]}!
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">Ready to place some winning bids?</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search auctions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/80 dark:bg-gray-700/80 border-lavender-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 w-64 focus:border-purple-500 dark:focus:border-purple-400"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-400 hover:bg-lavender-100 dark:hover:bg-gray-700"
                >
                  <Bell className="w-5 h-5" />
                </Button>
                <VoiceAssistant />
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            {activeSection === 'auctions' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-6 shadow-lg"> {/* Active Auctions */}</Card>
                  <Card className="p-6 shadow-lg"> {/* My Bids */}</Card>
                  <Card className="p-6 shadow-lg"> {/* Total Bidders */}</Card>
                </div>

                {/* Auctions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAuctions.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))}
                </div>

                {filteredAuctions.length === 0 && (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    No auctions found matching your search.
                  </div>
                )}
              </div>
            )}

            {activeSection === 'history' && (
              <Card className="p-6 shadow-lg">Your bid history will appear here.</Card>
            )}

            {activeSection === 'voice' && (
              <Card className="p-6 shadow-lg text-center">
                <VoiceAssistant />
                <p className="text-gray-500 mt-4">Use voice commands to interact with live auctions.</p>
              </Card>
            )}

            {activeSection === 'settings' && (
              <Card className="p-6 shadow-lg">Settings section coming soon.</Card>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
