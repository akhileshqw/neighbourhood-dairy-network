import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../context/userContext';
import { toast } from 'react-toastify';

const SubscriptionStatus = () => {
  const { LoginUser } = useContext(userContext);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch subscription status if user is logged in
    if (LoginUser && LoginUser._id) {
      fetchSubscriptionStatus();
    } else {
      setLoading(false);
    }
  }, [LoginUser]);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL || 'http://localhost:3001'}/api/subscription-status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subscription status');
      }

      const data = await response.json();
      if (data.success) {
        setSubscription(data.subscription);
      } else {
        toast.error(data.message || 'Failed to fetch subscription status');
      }
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      toast.error('Failed to fetch subscription status. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Determine badge color based on plan
  const getBadgeColor = (plan) => {
    switch (plan) {
      case 'Basic':
        return 'bg-blue-100 text-blue-800';
      case 'Standard':
        return 'bg-green-100 text-green-800';
      case 'Premium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!LoginUser) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-600">Please log in to view your subscription status.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-center text-gray-600 mt-2">Loading subscription information...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Subscription</h2>
      
      {subscription && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Current Plan:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(subscription.plan)}`}>
              {subscription.plan || 'None'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${subscription.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {subscription.active ? 'Active' : 'Inactive'}
            </span>
          </div>
          
          {subscription.active && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Expires On:</span>
                <span className="text-gray-800 font-medium">{formatDate(subscription.endDate)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Days Remaining:</span>
                <span className="text-gray-800 font-medium">{subscription.daysRemaining}</span>
              </div>
            </>
          )}
          
          {!subscription.active && (
            <div className="mt-6">
              <a 
                href="/premium" 
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
              >
                Upgrade Now
              </a>
            </div>
          )}
        </div>
      )}
      
      {(!subscription || subscription.plan === 'None') && (
        <div className="text-center py-4">
          <p className="text-gray-600 mb-4">You don't have an active subscription yet.</p>
          <a 
            href="/premium" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            View Plans
          </a>
        </div>
      )}
    </div>
  );
};

export default SubscriptionStatus;
