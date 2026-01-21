import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../context/userContext";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { LoginUser } = useContext(userContext);

  const initialData = location.state || {};
  const [planName, setPlanName] = useState(initialData.planName || "Basic");
  const [amount, setAmount] = useState(initialData.amount || 499);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const p = params.get("plan");
    const a = params.get("amount");
    if (p && a) {
      setPlanName(p);
      setAmount(Number(a));
    }
  }, [location.search]);

  useEffect(() => {
    const loadScript = () =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    loadScript().then((ok) => {
      if (!ok) toast.error("Failed to load payment gateway script");
    });
  }, []);

  const handlePay = async () => {
    if (!LoginUser) {
      toast.error("Please login to continue");
      navigate("/login-customer");
      return;
    }
    if (!paymentMethod) {
      toast.info("Please select a payment method");
      return;
    }
    setLoading(true);
    try {
      const base =
        import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL || "http://localhost:3002";

      const resp = await fetch(`${base}/api/create-subscription-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount,
          planName,
          userId: LoginUser._id,
        }),
      });
      if (!resp.ok) throw new Error("Failed to create order");
      const orderData = await resp.json();
      if (!orderData.success) throw new Error(orderData.message || "Order error");

      const options = {
        key: orderData.key_id,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Neighbourhood Diary Network",
        description: `${planName} Subscription`,
        order_id: orderData.order.id,
        image: "/logo.png",
        handler: async function (response) {
          try {
            const verifyResp = await fetch(`${base}/api/verify-subscription-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planName,
                userId: LoginUser._id,
              }),
            });
            const verifyData = await verifyResp.json();
            if (verifyData.success) {
              navigate("/payment-success", {
                state: {
                  planName,
                  amount,
                  paymentId: response.razorpay_payment_id,
                  method: paymentMethod,
                  message: verifyData.message,
                },
              });
            } else {
              toast.error(verifyData.message || "Payment verification failed");
            }
          } catch (e) {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name:
            LoginUser?.firstname
              ? `${LoginUser.firstname} ${LoginUser.lastname}`
              : "",
          email: LoginUser?.email || "",
          contact: LoginUser?.phone || "",
        },
        notes: {
          address: "Neighbourhood Diary Network Corporate Office",
          plan: planName,
          method: paymentMethod,
        },
        theme: { color: "#0d6efd" },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled. You can try again anytime.");
          },
        },
      };

      const rz = new window.Razorpay(options);
      rz.on("payment.failed", function () {
        toast.error("Payment failed. Please try again.");
      });
      rz.open();
    } catch (err) {
      toast.error("Failed to initiate payment. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const planPriceMap = {
    Basic: 499,
    Standard: 899,
    Premium: 1499,
  };

  const handlePlanChange = (p) => {
    setPlanName(p);
    setAmount(planPriceMap[p]);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Checkout</h4>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h5 className="mb-3">Select Plan</h5>
                <div className="d-flex gap-3 flex-wrap">
                  {["Basic", "Standard", "Premium"].map((p) => (
                    <button
                      key={p}
                      className={`btn ${
                        planName === p ? "btn-primary" : "btn-outline-primary"
                      }`}
                      onClick={() => handlePlanChange(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h5 className="mb-3">Payment Method</h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="pm-upi"
                        name="paymentMethod"
                        value="UPI"
                        checked={paymentMethod === "UPI"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="pm-upi">
                        UPI (GPay/PhonePe/Paytm)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="pm-card"
                        name="paymentMethod"
                        value="Card"
                        checked={paymentMethod === "Card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="pm-card">
                        Credit/Debit Card
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="pm-netbanking"
                        name="paymentMethod"
                        value="NetBanking"
                        checked={paymentMethod === "NetBanking"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="pm-netbanking">
                        NetBanking
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="pm-wallet"
                        name="paymentMethod"
                        value="Wallet"
                        checked={paymentMethod === "Wallet"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="pm-wallet">
                        Wallets (Paytm, Mobikwik)
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">
                    {planName} Plan • ₹{amount}/mo
                  </h5>
                  <small className="text-muted">
                    Secure payment powered by Razorpay
                  </small>
                </div>
                <button
                  className="btn btn-success btn-lg"
                  onClick={handlePay}
                  disabled={loading || !paymentMethod}
                >
                  {loading ? "Processing..." : `Pay ₹${amount}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

