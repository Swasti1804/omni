import { useState } from 'react';
import { Clock, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AuctionCardProps {
  auction: {
    id: number;
    name: string;
    currentBid: number;
    timeLeft: string;
    imageUrl: string;
    bidders: number;
    category: string;
  };
}

const AuctionCard = ({ auction }: AuctionCardProps) => {
  const [currentBid, setCurrentBid] = useState(auction.currentBid);
  const [userBid, setUserBid] = useState('');
  const [showBidForm, setShowBidForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceBid = async () => {
    const bidAmount = parseInt(userBid);
    if (!bidAmount || bidAmount <= currentBid) {
      alert('Bid must be higher than the current bid.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: auction.name,
          bid_amount: bidAmount,
        }),
      });

      if (res.ok) {
        setCurrentBid(bidAmount);
        setUserBid('');
        setShowBidForm(false);
        alert('✅ Bid placed successfully!');
      } else {
        const data = await res.json();
        alert(`❌ Failed to place bid: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Bid error:', error);
      alert('❌ Error placing bid.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);

  const getTimeLeftColor = (timeLeft: string) => {
    if (timeLeft.includes('h') && !timeLeft.includes('d')) {
      const hours = parseInt(timeLeft);
      if (hours < 2) return 'text-red-400';
      if (hours < 6) return 'text-yellow-400';
    }
    return 'text-green-400';
  };

  return (
    <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={auction.imageUrl}
          alt={auction.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-purple-600/80 text-white border-0">
            {auction.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <div
            className={`bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1 ${getTimeLeftColor(auction.timeLeft)}`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">{auction.timeLeft}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
          {auction.name}
        </h3>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Current Bid</span>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xl font-bold text-white">
                {formatCurrency(currentBid)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-gray-300">
              <Users className="w-4 h-4" />
              <span>{auction.bidders} bidders</span>
            </div>
            <span className="text-cyan-400 font-semibold">
              Next: {formatCurrency(currentBid + 100)}
            </span>
          </div>
        </div>

        {!showBidForm ? (
          <Button
            onClick={() => setShowBidForm(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300"
          >
            Place Bid
          </Button>
        ) : (
          <div className="space-y-3">
            <input
              type="number"
              value={userBid}
              onChange={(e) => setUserBid(e.target.value)}
              placeholder={`Min: ${formatCurrency(currentBid + 100)}`}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isSubmitting}
            />
            <div className="flex space-x-2">
              <Button
                onClick={handlePlaceBid}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                {isSubmitting ? 'Bidding...' : 'Confirm Bid'}
              </Button>
              <Button
                onClick={() => {
                  setShowBidForm(false);
                  setUserBid('');
                }}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AuctionCard;
