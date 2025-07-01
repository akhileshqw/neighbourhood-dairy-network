import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/chatbot.css';
import { userContext } from '../context/userContext';
import { v4 as uuidv4 } from 'uuid';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { LoginUser } = useContext(userContext);

  // Predefined responses for common queries
  const botResponses = {
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
      options: ['Milk', 'Ghee', 'Curd']
    },
    'milk': {
      response: 'Check out our fresh milk products!',
      action: () => navigate('/milk')
    },
    'ghee': {
      response: 'Explore our pure ghee products!',
      action: () => navigate('/ghee')
    },
    'curd': {
      response: 'Discover our delicious curd and yogurt products!',
      action: () => navigate('/curd')
    },
    'premium': {
      response: 'Learn about our premium subscription plans for regular milk delivery.',
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
      response: 'We offer daily milk delivery services. Premium subscribers get priority delivery slots and can customize their delivery schedule.'
    },
    'payment': {
      response: 'We accept various payment methods including credit/debit cards, UPI, and cash on delivery.'
    },
    'subscription': {
      response: 'We offer different subscription plans for regular milk delivery. Would you like to check our premium plans?',
      action: () => navigate('/premium')
    },
    'cancel': {
      response: 'You can pause or cancel your subscription anytime from your account settings.'
    },
    'quality': {
      response: 'We ensure the highest quality of milk by sourcing from certified vendors and conducting regular quality checks.'
    },
    'help': {
      response: 'I can help you with navigation, account creation, finding vendors, and answering common questions. What would you like to know?'
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
          options: ['Products', 'Create Account', 'Best Vendors', 'Help']
        }
      ]);
    }
  }, [isOpen, messages.length]);
  
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
          action: () => navigate('/vendor')
        }]);
      } else {
        setMessages(prev => [...prev, {
          text: `Sorry, we couldn't find any vendors for ${category} at the moment.`,
          sender: 'bot'
        }]);
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setIsLoading(false);
      setMessages(prev => [...prev, {
        text: 'Sorry, there was an error finding vendors. Please try again later.',
        sender: 'bot'
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
          action: () => navigate('/register')
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
        action: () => navigate('/register')
      }]);
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
      
      // Special handling for complex queries
      if (userInput.includes('best vendor') || userInput.includes('top vendor') || 
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
      else {
        // Check for keyword matches in predefined responses
        for (const [key, value] of Object.entries(botResponses)) {
          if (userInput.includes(key)) {
            const response = { text: value.response, sender: 'bot' };
            
            // Add options if available
            if (value.options) {
              response.options = value.options;
            }
            
            // Add steps if available
            if (value.steps) {
              response.steps = value.steps;
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
      
      // Default response if no match found
      if (!responded) {
        const defaultResponse = {
          text: "I'm not sure I understand. Would you like to know about our products, creating an account, or finding the best vendors?",
          sender: 'bot',
          options: ['Products', 'Create Account', 'Best Vendors']
        };
        
        setMessages(prev => [...prev, defaultResponse]);
        
        // Save default response to backend
        await saveConversation(defaultResponse);
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

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {/* Chat toggle button */}
      <button 
        className="chat-toggle-btn" 
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <span className="close-icon">×</span>
        ) : (
          <span className="chat-icon">💬</span>
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
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
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
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="message bot">
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
              {isLoading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;