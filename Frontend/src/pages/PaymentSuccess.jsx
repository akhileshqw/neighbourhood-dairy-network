import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const confettiCount = 40;
    const container = document.getElementById("confetti-container");
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < confettiCount; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti";
      piece.style.left = Math.random() * 100 + "%";
      piece.style.backgroundColor = ["#28a745", "#0d6efd", "#ffc107", "#dc3545"][
        Math.floor(Math.random() * 4)
      ];
      piece.style.animationDelay = Math.random() * 2 + "s";
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(piece);
    }
  }, []);

  const planName = state?.planName || "Premium";
  const amount = state?.amount || 1499;
  const paymentId = state?.paymentId || "";
  const message = state?.message || "Payment successful! Your subscription is now active.";

  return (
    <div className="container py-5">
      <div id="confetti-container" style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }} />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center p-5">
              <div className="success-check mb-4">
                <div className="checkmark">
                  <div className="checkmark-circle" />
                  <div className="checkmark-stem" />
                  <div className="checkmark-kick" />
                </div>
              </div>
              <h2 className="mb-2">Payment Successful</h2>
              <p className="text-muted mb-4">{message}</p>
              <div className="mb-3">
                <h5 className="mb-1">{planName} Plan</h5>
                <p className="mb-0">Amount Paid: ₹{amount}</p>
                {paymentId && <small className="text-muted d-block">Payment ID: {paymentId}</small>}
              </div>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <button className="btn btn-primary" onClick={() => navigate("/account")}>
                  View Subscription
                </button>
                <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        .success-check .checkmark {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          position: relative;
        }
        .checkmark-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(13,110,253,0.1);
          border: 4px solid #0d6efd;
          box-sizing: border-box;
          animation: pop 400ms ease-out;
        }
        .checkmark-stem {
          position: absolute;
          width: 6px;
          height: 28px;
          background-color: #28a745;
          left: 34px;
          top: 36px;
          transform: rotate(45deg);
          border-radius: 3px;
          animation: draw 600ms ease-out 200ms both;
        }
        .checkmark-kick {
          position: absolute;
          width: 6px;
          height: 16px;
          background-color: #28a745;
          left: 24px;
          top: 48px;
          transform: rotate(-45deg);
          border-radius: 3px;
          animation: draw 600ms ease-out 200ms both;
        }
        @keyframes pop {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes draw {
          from { width: 0; opacity: 0; }
          to { opacity: 1; }
        }
        .confetti {
          position: absolute;
          width: 10px;
          height: 16px;
          top: -20px;
          opacity: 0.9;
          animation: fall 3s linear infinite;
        }
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        `}
      </style>
    </div>
  );
}

export default PaymentSuccess;
