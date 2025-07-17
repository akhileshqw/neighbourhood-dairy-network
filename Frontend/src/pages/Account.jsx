import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../context/userContext';
import { Navigate } from 'react-router-dom';
import SubscriptionStatus from '../components/SubscriptionStatus';
import { toast } from 'react-toastify';

const Account = () => {
  const { LoginUser } = useContext(userContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (LoginUser && LoginUser._id) {
      setUserData(LoginUser);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [LoginUser]);

  if (!LoginUser && !loading) {
    toast.error('Please login to view your account');
    return <Navigate to="/login-customer" />;
  }

  return (
    <div className="container mx-auto py-8 mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">My Account</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Name</p>
                  <p className="font-medium text-gray-800">{userData?.firstname} {userData?.lastname}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 mb-1">Email</p>
                  <p className="font-medium text-gray-800">{userData?.email}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 mb-1">Phone</p>
                  <p className="font-medium text-gray-800">{userData?.phone || 'Not provided'}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 mb-1">Address</p>
                  <p className="font-medium text-gray-800">{userData?.address || 'Not provided'}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 mb-1">Account Type</p>
                  <p className="font-medium text-gray-800">
                    {userData?.isVendor ? (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        Vendor {userData?.isCertified && '(Certified)'}
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Customer</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subscription Status */}
          <div className="md:col-span-1">
            <SubscriptionStatus />
          </div>
          
          {/* Additional Information for Vendors */}
          {userData?.isVendor && (
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vendor Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Certification Status</p>
                    <p className="font-medium">
                      {userData?.isCertified ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Certified</span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Not Certified</span>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-1">Products</p>
                    <div className="flex flex-wrap gap-2">
                      {userData?.milk && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Milk</span>
                      )}
                      {userData?.curd && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Curd</span>
                      )}
                      {userData?.ghee && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Ghee</span>
                      )}
                      {!userData?.milk && !userData?.curd && !userData?.ghee && (
                        <span className="text-gray-500">No products selected</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-1">Rating</p>
                    <p className="font-medium text-gray-800">
                      {userData?.rating ? (
                        <span className="flex items-center">
                          {userData.rating.toFixed(1)}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </span>
                      ) : (
                        'Not rated yet'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Account;