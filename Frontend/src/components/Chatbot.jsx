import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/chatbot.css';
import { userContext } from '../context/userContext';
import { v4 as uuidv4 } from 'uuid';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false); // New state for animation
  const [botAvatar, setBotAvatar] = useState('/logo.png'); // Bot avatar
  const [suggestions, setSuggestions] = useState([]); // Quick suggestions
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { LoginUser } = useContext(userContext);

  // Predefined responses for common queries
  const botResponses = {
    'milk on the way': {
      response: "Milk on the Way is a neighbourhood dairy network that connects nearby milk vendors with customers for fresh milk, ghee and curd delivery at your doorstep."
    },
    'who are you': {
      response: "I am your Milk on the Way dairy assistant. I can help you understand our services, products, vendors and subscriptions."
    },
    'what do you do': {
      response: "We help customers find trusted local milk vendors and get fresh milk, ghee and curd delivered regularly."
    },
    'service': {
      response: "Our service connects nearby certified vendors to you, offers different dairy products and supports subscriptions for regular delivery."
    },
    // Navigation related responses
    'home': {
      response: 'You can visit our home page to see our latest offerings.',
      action: () => navigate('/')
    },
    'about': {
      response: 'You can learn more about us on our About page.',
      action: () => navigate('/about')
    },
    'contact': {
      response: 'You can reach out to us through our Contact page.',
      action: () => navigate('/contact')
    },
    'products': {
      response: 'We offer various dairy products. Would you like to see our milk, ghee, or curd products?',
      options: ['Milk', 'Ghee', 'Curd'],
      animation: 'product' // New animation trigger
    },
    'milk': {
      response: 'Check out our fresh milk products!',
      action: () => navigate('/milk'),
      animation: 'milk' // New animation trigger
    },
    'ghee': {
      response: 'Explore our pure ghee products!',
      action: () => navigate('/ghee'),
      animation: 'ghee' // New animation trigger
    },
    'curd': {
      response: 'Discover our delicious curd and yogurt products!',
      action: () => navigate('/curd'),
      animation: 'curd' // New animation trigger
    },
    'premium': {
      response: 'Our premium subscription offers exclusive benefits like priority delivery, special discounts, and access to limited edition products. We have three plans: Basic (₹499/month), Standard (₹899/month), and Premium (₹1499/month).',
      options: ['View Plans', 'Plan Benefits', 'Subscribe Now'],
      action: () => navigate('/premium')
    },
    'subscription': {
      response: 'We offer three subscription plans: Basic (₹499/month), Standard (₹899/month), and Premium (₹1499/month). Each plan includes different benefits like milk delivery, ghee delivery, curd delivery, and exclusive products.',
      options: ['View Plans', 'Plan Comparison', 'Subscribe Now'],
      action: () => navigate('/premium'),
      animation: 'subscription'
    },
    'plan': {
      response: 'Our subscription plans are designed to meet different needs. Basic (₹499/month) includes daily milk delivery, Standard (₹899/month) adds ghee and curd delivery, and Premium (₹1499/month) includes all products plus exclusive benefits.',
      options: ['View All Plans', 'Subscribe Now'],
      action: () => navigate('/premium')
    },
    'vendors': {
      response: 'Find the best milk vendors in your area.',
      action: () => navigate('/vendor')
    },

    // Account creation steps
    'create account': {
      response: 'Here are the steps to create a new account:',
      steps: [
        '1. Click on Register in the navigation menu',
        '2. Fill in your personal details',
        '3. Create a strong password',
        '4. Verify your email address',
        '5. Complete your profile information'
      ],
      action: () => navigate('/register')
    },
    'register': {
      response: 'You can register for a new account here.',
      action: () => navigate('/register')
    },
    'login': {
      response: 'Are you a customer or a vendor?',
      options: ['Customer', 'Vendor']
    },

    // Vendor related responses
    'best vendors': {
      response: 'We can help you find the best vendors based on ratings and location. Would you like to see our top-rated vendors?',
      action: () => navigate('/vendor')
    },
    'become vendor': {
      response: 'Interested in becoming a certified vendor? Learn about our verification process.',
      action: () => navigate('/verify')
    },

    // General FAQs
    'delivery': {
      response: 'We offer daily milk delivery services. Premium subscribers get priority delivery slots and can customize their delivery schedule.',
      animation: 'delivery' // New animation trigger
    },
    'payment': {
      response: 'We accept various payment methods through Razorpay including credit/debit cards, UPI, net banking, and wallets. All transactions are secure and encrypted.',
      options: ['Online Payment', 'Payment Security', 'Subscription Payment']
    },
    'payment method': {
      response: 'We use Razorpay as our payment gateway. It supports credit/debit cards, UPI, net banking, and wallets. All transactions are secure and encrypted.',
      options: ['Payment Security', 'How to Pay', 'Refund Policy']
    },
    'razorpay': {
      response: 'We use Razorpay as our payment gateway. It \'s secure, reliable, and supports multiple payment methods including cards, UPI, and net banking.',
      options: ['Payment Security', 'How to Pay', 'Payment Issues']
    },
    'cancel': {
      response: 'You can pause or cancel your subscription anytime from your account settings.'
    },
    'quality': {
      response: 'We ensure the highest quality of milk by sourcing from certified vendors and conducting regular quality checks.',
      animation: 'quality' // New animation trigger
    },
    'help': {
      response: 'I can help you with navigation, account creation, finding vendors, and answering common questions. What would you like to know?',
      suggestions: ['Products', 'Delivery', 'Payment', 'Quality'] // New suggestions
    },
    // New responses for enhanced functionality
    'nutrition': {
      response: 'Our dairy products are rich in calcium, protein, and essential vitamins. A glass of milk contains approximately 300mg of calcium and 8g of protein.',
      animation: 'nutrition' // New animation trigger
    },
    'organic': {
      response: 'Yes, we offer organic milk options sourced from farms that follow organic farming practices without the use of antibiotics or hormones.',
      animation: 'organic' // New animation trigger
    },
    'feedback': {
      response: 'We value your feedback! Please share your experience with our products or service.',
      feedback: true // New feedback feature
    }
  };

  // Generate a session ID when component mounts
  useEffect(() => {
    if (!sessionId) {
      setSessionId(uuidv4());
    }
  }, [sessionId]);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: 'Hello! I\'m your dairy assistant. How can I help you today?',
          sender: 'bot',
          options: ['Products', 'Create Account', 'Best Vendors', 'Help'],
          avatar: botAvatar // New avatar property
        }
      ]);
      
      // Set initial suggestions
      setSuggestions(['Products', 'Delivery', 'Quality', 'Feedback']);
    }
  }, [isOpen, messages.length, botAvatar]);
  
  // Save conversation to backend
  const saveConversation = async (message) => {
    try {
      const userId = LoginUser?.email || 'anonymous';
      
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/chatbot/save-conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          sessionId,
          message
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error saving conversation:', error);
      return false;
    }
  };
  
  // Fetch best vendors from backend
  const fetchBestVendors = async (category) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/chatbot/best-vendors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: category.toLowerCase()
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      setIsLoading(false);
      
      if (data.success && data.vendors.length > 0) {
        // Format vendors data for display
        const vendorsList = data.vendors.map((vendor, index) => 
          `${index + 1}. ${vendor.name} (${vendor.rating}★)${vendor.isCertified ? ' ✓ Certified' : ''}`
        );
        
        setMessages(prev => [...prev, {
          text: `Here are the top vendors for ${category}:`,
          sender: 'bot',
          vendorsList: vendorsList,
          action: () => navigate('/vendor'),
          avatar: botAvatar // New avatar property
        }]);
      } else {
        setMessages(prev => [...prev, {
          text: `Sorry, we couldn't find any vendors for ${category} at the moment.`,
          sender: 'bot',
          avatar: botAvatar // New avatar property
        }]);
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setIsLoading(false);
      setMessages(prev => [...prev, {
        text: 'Sorry, there was an error finding vendors. Please try again later.',
        sender: 'bot',
        avatar: botAvatar // New avatar property
      }]);
    }
  };
  
  // Fetch account creation steps from backend
  const fetchAccountSteps = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/chatbot/account-steps`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      const data = await response.json();
      setIsLoading(false);
      
      if (data.success) {
        const steps = data.steps.map(step => 
          `${step.step}. ${step.title}: ${step.description}`
        );
        
        setMessages(prev => [...prev, {
          text: 'Here are the steps to create a new account:',
          sender: 'bot',
          steps: steps,
          action: () => navigate('/register'),
          avatar: botAvatar // New avatar property
        }]);
      }
    } catch (error) {
      console.error('Error fetching account steps:', error);
      setIsLoading(false);
      
      // Fallback to predefined steps if API fails
      const fallbackSteps = [
        '1. Click on Register in the navigation menu',
        '2. Fill in your personal details',
        '3. Create a strong password',
        '4. Verify your email address',
        '5. Complete your profile information'
      ];
      
      setMessages(prev => [...prev, {
        text: 'Here are the steps to create a new account:',
        sender: 'bot',
        steps: fallbackSteps,
        action: () => navigate('/register'),
        avatar: botAvatar // New avatar property
      }]);
    }
  };

  // Handle animation display
  const handleAnimation = (animationType) => {
    setShowAnimation(animationType);
    setTimeout(() => setShowAnimation(false), 3000); // Hide animation after 3 seconds
  };

  // Fetch AI response from backend
  const fetchAIResponse = async (userMessage) => {
    try {
      const controller = new AbortController();
      // const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/chatbot/ai-response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          message: userMessage, 
          sessionId,
          userId: LoginUser?._id || 'anonymous'
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({}));
      if (data.success && data.response) return data.response;

      const clientSide = await fetchClientAIResponse(userMessage);
      if (clientSide) return clientSide;

      return data.fallbackResponse || "I'm not sure I understand. Would you like to know about our products, creating an account, or finding the best vendors?";
    } catch (error) {
      console.error('Error fetching AI response:', error);

      const clientSide = await fetchClientAIResponse(userMessage);
      if (clientSide) return clientSide;

      return "I can help you with information about our dairy products, finding vendors, delivery options, and more. What would you like to know?";
    }
  };

  const fetchClientAIResponse = async (userMessage) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return null;

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const modelCandidates = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-pro'];

      for (const modelName of modelCandidates) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(userMessage);
          const response = await result.response;
          const text = await response.text();
          if (text && text.trim()) return text.trim();
        } catch (e) {
          continue;
        }
      }

      return null;
    } catch (e) {
      return null;
    }
  };

  // Process user input and generate response
  const processMessage = async (text) => {
    const userInput = text.toLowerCase();
    
    // Add user message to UI
    const userMessage = { text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    // Save user message to backend
    await saveConversation(userMessage);
    
    // Show typing indicator
    setIsLoading(true);
    
    // Process response after a short delay to simulate thinking
    setTimeout(async () => {
      let responded = false;
      
      // Handle premium subscription queries
      if (userInput.includes('premium') || userInput.includes('subscription') || 
          userInput.includes('subscribe') || userInput.includes('plan')) {
        const response = {
          text: "We offer three subscription plans: Basic (₹499/month), Standard (₹899/month), and Premium (₹1499/month). Each plan includes different benefits like milk delivery, ghee delivery, curd delivery, and exclusive products. Would you like to view our premium page?",
          sender: 'bot',
          options: ['View Premium Plans', 'Plan Benefits', 'Payment Options'],
          avatar: botAvatar
        };
        
        setMessages(prev => [...prev, response]);
        await saveConversation(response);
        
        // Navigate to premium page if requested
        if (userInput.includes('view') || userInput.includes('show me')) {
          setTimeout(() => navigate('/premium'), 1500);
        }
        responded = true;
      }
      
      // Handle payment related queries
      else if (userInput.includes('payment') || userInput.includes('pay') || 
               userInput.includes('razorpay')) {
        const response = {
          text: "We accept payments through Razorpay, which supports credit/debit cards, UPI, net banking, and wallets. All transactions are secure and encrypted. Would you like to know more about our payment process?",
          sender: 'bot',
          options: ['Payment Methods', 'Subscription Payment', 'Payment Security'],
          avatar: botAvatar
        };
        
        setMessages(prev => [...prev, response]);
        await saveConversation(response);
        responded = true;
      }
      
      // Special handling for complex queries
      else if (userInput.includes('best vendor') || userInput.includes('top vendor') || 
          userInput.includes('recommended vendor') || userInput.includes('good vendor')) {
        // Determine product category
        let category = 'milk'; // Default
        if (userInput.includes('milk')) category = 'milk';
        else if (userInput.includes('ghee')) category = 'ghee';
        else if (userInput.includes('curd') || userInput.includes('yogurt')) category = 'curd';
        
        // Fetch vendors from backend
        await fetchBestVendors(category);
        responded = true;
      } 
      else if (userInput.includes('create account') || userInput.includes('sign up') || 
               userInput.includes('register') || userInput.includes('new account')) {
        // Fetch account creation steps from backend
        await fetchAccountSteps();
        responded = true;
      }
      // New handling for nutrition information
      else if (userInput.includes('nutrition') || userInput.includes('nutritional') || 
               userInput.includes('healthy') || userInput.includes('health benefits')) {
        const response = { 
          text: botResponses.nutrition.response, 
          sender: 'bot',
          avatar: botAvatar
        };
        setMessages(prev => [...prev, response]);
        await saveConversation(response);
        handleAnimation('nutrition');
        responded = true;
      }
      // New handling for organic products
      else if (userInput.includes('organic') || userInput.includes('natural') || 
               userInput.includes('chemical free')) {
        const response = { 
          text: botResponses.organic.response, 
          sender: 'bot',
          avatar: botAvatar
        };
        setMessages(prev => [...prev, response]);
        await saveConversation(response);
        handleAnimation('organic');
        responded = true;
      }
      // New handling for feedback
  else if (userInput.includes('feedback') || userInput.includes('review') || 
               userInput.includes('suggestion') || userInput.includes('complain')) {
        const response = { 
          text: botResponses.feedback.response, 
          sender: 'bot',
          feedback: true,
          avatar: botAvatar
        };
        setMessages(prev => [...prev, response]);
        await saveConversation(response);
        responded = true;
      }
      else {
        // Check for keyword matches in predefined responses
        for (const [key, value] of Object.entries(botResponses)) {
          if (userInput.includes(key)) {
            const response = { 
              text: value.response, 
              sender: 'bot',
              avatar: botAvatar // New avatar property
            };
            
            // Add options if available
            if (value.options) {
              response.options = value.options;
            }
            
            // Add steps if available
            if (value.steps) {
              response.steps = value.steps;
            }

            // Add suggestions if available
            if (value.suggestions) {
              response.suggestions = value.suggestions;
              setSuggestions(value.suggestions);
            }

            // Add animation if available
            if (value.animation) {
              handleAnimation(value.animation);
            }

            // Add feedback form if available
            if (value.feedback) {
              response.feedback = true;
            }
            
            setMessages(prev => [...prev, response]);
            
            // Save bot response to backend
            await saveConversation(response);
            
            // Execute action if available (with slight delay)
            if (value.action) {
              setTimeout(() => {
                value.action();
              }, 1000);
            }
            
            responded = true;
            break;
          }
        }
      }
      
      // If no predefined response matched, use AI-powered response
      if (!responded) {
        try {
          // Get AI response using the fetchAIResponse function
          const aiResponseText = await fetchAIResponse(text);
          
          // Use the AI-generated response
          const botResponse = {
            text: aiResponseText,
            sender: 'bot',
            avatar: botAvatar
          };
          
          setMessages(prev => [...prev, botResponse]);
          
          // Save AI response to backend
          await saveConversation(botResponse);
        } catch (error) {
          console.error('Error getting AI response:', error);
          
          // Fallback response in case of error
          const errorResponse = {
            text: "I'm having trouble connecting right now. Would you like to know about our products, creating an account, or finding the best vendors?",
            sender: 'bot',
            options: ['Products', 'Create Account', 'Best Vendors'],
            avatar: botAvatar
          };
          
          setMessages(prev => [...prev, errorResponse]);
          
          // Save error response to backend
          await saveConversation(errorResponse);
        }
      }
      
      setIsLoading(false);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      processMessage(inputValue);
      setInputValue('');
    }
  };

  const handleOptionClick = (option) => {
    processMessage(option);
  };

  const handleSuggestionClick = (suggestion) => {
    processMessage(suggestion);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // New function to handle feedback submission
  const handleFeedbackSubmit = (rating, comment) => {
    setMessages(prev => [...prev, {
      text: `Thank you for your feedback! You rated us ${rating}/5 stars.`,
      sender: 'bot',
      avatar: botAvatar
    }]);
  };

  return (
    <div className="chatbot-container">
      {/* Chat toggle button with animation */}
      <button 
        className={`chat-toggle-btn ${!isOpen && 'pulse-animation'}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <span className="close-icon">×</span>
        ) : (
          <img 
            src="/robot.svg" 
            alt="Robot chat icon" 
            className="robot-icon"
            style={{ width: '30px', height: '30px', animation: 'bounce 2s infinite' }}
          />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Dairy Assistant</h3>
            {LoginUser && (
              <div className="user-info">
                <small>Logged in as: {LoginUser.username}</small>
              </div>
            )}
          </div>
          
          <div className="messages-container">
            {/* Animation container */}
            {showAnimation && (
              <div className={`animation-container ${showAnimation}-animation`}>
                <img 
                  src={`/${showAnimation}.png`} 
                  alt={`${showAnimation} animation`} 
                  className="animation-image"
                />
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.sender === 'bot' && message.avatar && (
                  <div className="avatar-container">
                    <img src={message.avatar} alt="Bot" className="bot-avatar" />
                  </div>
                )}
                <div className="message-content">
                  {message.text}
                  
                  {/* Display steps if available */}
                  {message.steps && (
                    <ul className="steps-list">
                      {message.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Display vendor list if available */}
                  {message.vendorsList && (
                    <ul className="vendors-list">
                      {message.vendorsList.map((vendor, vendorIndex) => (
                        <li key={vendorIndex}>{vendor}</li>
                      ))}
                      <button 
                        className="view-all-btn"
                        onClick={() => navigate('/vendor')}
                      >
                        View All Vendors
                      </button>
                    </ul>
                  )}
                  
                  {/* Display options if available */}
                  {message.options && (
                    <div className="options-container">
                      {message.options.map((option, optionIndex) => (
                        <button 
                          key={optionIndex} 
                          className="option-btn"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Display feedback form if available */}
                  {message.feedback && (
                    <div className="feedback-container">
                      <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span 
                            key={star} 
                            className="star"
                            onClick={() => handleFeedbackSubmit(star, '')}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="message bot">
                <div className="avatar-container">
                  <img src={botAvatar} alt="Bot" className="bot-avatar" />
                </div>
                <div className="message-content loading">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick suggestions */}
          {suggestions.length > 0 && (
            <div className="suggestions-container">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-chip"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
              disabled={isLoading}
            />
            <button type="submit" className="send-btn" disabled={isLoading || !inputValue.trim()}>
              {isLoading ? '...' : '➤'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
