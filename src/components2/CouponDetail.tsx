import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Calendar, Tag } from 'lucide-react';
import { coupons } from '@/data/coupons';
import { toast } from '@/components/ui/use-toast';

const CouponDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const couponId = parseInt(id || '0');
  
  const coupon = coupons.find(c => c.id === couponId);
  
  if (!coupon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Coupon Not Found</h1>
          <p className="text-gray-600 mb-4">The coupon you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-virgin-red text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  const getCompanyColor = () => {
    switch (coupon.company) {
      case 'Virgin Atlantic':
        return 'bg-blue-500';
      case 'Virgin Voyages':
        return 'bg-cyan-500';
      case 'Virgin Media O2':
        return 'bg-purple-500';
      default:
        return 'bg-virgin-red';
    }
  };
  
  const handleCopyCode = () => {
    if (coupon.code) {
      navigator.clipboard.writeText(coupon.code);
      toast({
        title: "Code copied!",
        description: `${coupon.code} has been copied to your clipboard.`,
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`${getCompanyColor()} text-white p-6 animate-fade-in`}>
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white/20 rounded-full mb-4 hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <h1 className="text-3xl font-bold mb-2">{coupon.discount}</h1>
        <p className="text-white/90 mb-1">{coupon.company}</p>
        <div className="flex items-center mt-4">
          <Calendar className="w-4 h-4 mr-2 opacity-70" />
          <span className="text-sm opacity-70">Expires: {coupon.expiry}</span>
        </div>
      </div>
      
      <div className="max-w-lg mx-auto px-6 py-8 -mt-6 bg-white rounded-t-3xl soft-shadow animate-fade-up">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Tag className="w-5 h-5 mr-2 text-gray-500" />
            <h2 className="text-xl font-semibold">Coupon Details</h2>
          </div>
          <p className="text-gray-700">{coupon.description}</p>
        </div>
        
        {coupon.code && (
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-2">Coupon Code</p>
            <div className="flex items-center">
              <div className="flex-grow py-4 px-6 bg-gray-100 rounded-l-lg border-dashed border-y border-l border-gray-300">
                <p className="font-mono font-medium text-lg tracking-wider">{coupon.code}</p>
              </div>
              <button 
                onClick={handleCopyCode}
                className="p-4 bg-virgin-red text-white rounded-r-lg hover:bg-red-700 transition-all"
              >
                <Copy className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-12">
          <button className="w-full py-4 bg-virgin-red text-white rounded-xl font-semibold hover:bg-red-700 transition-all">
            Use Coupon
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            This coupon can be used once per customer.
            <br />Terms and conditions apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CouponDetail;