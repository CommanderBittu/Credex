import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';

type Message = {
  content: string;
  isUser: boolean;
  timestamp: Date;
};

const DEMO_MODE = true; 
const DEBUG_MODE = true; 

const exampleQuestions = [
  "How do I sell my license?",
  "What types of licenses do you buy?",
  "How much can I get for my unused licenses?",
  "How long does the process take?",
  "Do you offer license transfers for businesses?"
];

const fallbackResponses: Record<string, string> = {
  'sell': "To sell your unused licenses, fill out our form with your license details. Our team will evaluate them and get back to you within 24 hours with an offer.",
  'buy': "We offer a wide range of software licenses at discounted prices. Let us know what you're looking for in the contact form.",
  'price': "License values vary based on software type, version, and remaining term. We provide free valuations after you submit your details.",
  'process': "Our process is quick and straightforward. We respond within 24 hours, and the entire process typically takes 3-5 business days.",
  'transfer': "License transfers are handled securely by our compliance team. We handle all paperwork and ensure the process follows vendor terms.",
  'type': "We handle a wide range of software licenses including Microsoft, Adobe, AutoCAD, Windows Server, Oracle, SAP, Salesforce, and many others.",
  'secure': "We take security and legal compliance very seriously. All transfers are fully compliant with vendor terms and conditions.",
  'contact': "Please fill out our contact form, and a license specialist will get back to you within 24 hours.",
  'payment': "We offer various payment methods including bank transfer, PayPal, and major credit cards. Payment is released once the license transfer is verified.",
  'business': "Yes, we specialize in business license transfers. Our team has experience with enterprise-level software agreements and volume licensing.",
  'microsoft': "Yes, we handle Microsoft licenses including Windows, Office, and server products. Our specialists can help determine the value of your Microsoft licenses.",
  'adobe': "We purchase Adobe licenses including Creative Cloud and legacy products. Our team is familiar with Adobe's licensing policies.",
  'default': "I'd be happy to help with your license buying or selling needs. Please ask about our process, pricing, or supported software types.",
  'autocad': "We handle AutoCAD licenses including older perpetual licenses and newer subscription models. Our team can evaluate your AutoCAD license based on version, usage rights, and term left.",
  'windows server': "Yes, we handle licenses for all versions of Windows Server including Standard, Datacenter, and Essentials. We ensure compliance with Microsoft's licensing terms during transfer.",
  'oracle': "We accept Oracle Database licenses including standard and enterprise editions. Licensing terms vary by product and metrics, and our team will guide you through Oracle’s policies.",
  'sap': "SAP licenses are complex and often tied to enterprise agreements. We have experience transferring SAP licenses in compliance with vendor contracts.",
  'salesforce': "Salesforce licenses are subscription-based and require coordination with the vendor. We assist in evaluating eligibility for transfer and facilitate a smooth handover.",
  'microsoft office': "We handle Microsoft Office licenses, including perpetual and volume licenses. Our specialists assess value based on version, activation status, and term remaining.",
  'other': "We deal with a wide range of software licenses beyond those listed. Let us know what software you have, and we’ll evaluate its eligibility and value for resale or purchase."
};


const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi there! I'm your license marketplace assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getFallbackResponse = (message: string): string => {
    const lowercaseMessage = message.toLowerCase();
    
    for (const [keyword, response] of Object.entries(fallbackResponses)) {
      if (keyword !== 'default' && lowercaseMessage.includes(keyword)) {
        return response;
      }
    }
    
    if (lowercaseMessage.includes('how') || lowercaseMessage.includes('what')) {
      return "To learn more about our license marketplace services, please visit our FAQ section or contact our support team directly. We're happy to answer any specific questions you might have.";
    } else if (lowercaseMessage.includes('help') || lowercaseMessage.includes('need')) {
      return "I'd be happy to help you with your license needs. To get started, please tell me what type of software license you're interested in buying or selling.";
    } else if (lowercaseMessage.length < 15) {
      return "Could you please provide more details about your question? I'd like to give you the most helpful response possible.";
    }
    
    return fallbackResponses.default;
  };

  const callGeminiAPI = async (conversationHistory: any[], retryCount = 0): Promise<string> => {
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDebugInfo("Using demo mode (DEMO_MODE is true)");
      return getFallbackResponse(conversationHistory[conversationHistory.length - 1].content);
    }
    
    try {
      setDebugInfo("Attempting to call Gemini API...");
      
      let apiKey;
      try {
        apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        setDebugInfo(`API key ${apiKey ? 'found' : 'not found'}`);
      } catch (e) {
        setDebugInfo(`Error accessing env vars: ${e instanceof Error ? e.message : String(e)}`);
        console.error("Error accessing environment variables:", e);
      }
      
      if (!apiKey) {
        setDebugInfo("❌ No API key found! Check your .env file");
        throw new Error("API key not configured");
      }

      const formattedMessages = conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
      
      formattedMessages.unshift({
        role: 'model',
        parts: [{ 
          text: `You are a helpful assistant for a software license marketplace. 
          Your company helps people buy and sell unused software licenses. 
          Be concise, informative, and helpful. Focus on license selling/buying processes, 
          valuations, transfer procedures, supported software types, and security/legal aspects.
          Your responses should be professional but friendly, and under 150 words.`
        }]
      });
      
      setDebugInfo(`Sending request to Gemini API with ${conversationHistory.length} messages...`);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            maxOutputTokens: 250,
            temperature: 0.7
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = `API error: ${response.status} - ${JSON.stringify(errorData)}`;
        setDebugInfo(`❌ ${errorMessage}`);
        console.error('Gemini API error:', response.status, errorData);
        
        if (response.status === 429 && retryCount < MAX_RETRIES) {
          setDebugInfo(`⚠️ Rate limited. Retrying in ${RETRY_DELAY_MS}ms... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (retryCount + 1)));
          return callGeminiAPI(conversationHistory, retryCount + 1);
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      setDebugInfo("✅ Gemini API call successful!");
      return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
      const errorMessage = `Error in API call: ${error instanceof Error ? error.message : String(error)}`;
      setDebugInfo(`❌ ${errorMessage}`);
      console.error(errorMessage);

      if (retryCount < MAX_RETRIES) {
        setDebugInfo(`⚠️ Error occurred. Retrying in ${RETRY_DELAY_MS}ms... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (retryCount + 1)));
        return callGeminiAPI(conversationHistory, retryCount + 1);
      }

      setDebugInfo("🔄 Falling back to pre-written responses");
      return getFallbackResponse(conversationHistory[conversationHistory.length - 1].content);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (DEBUG_MODE) setDebugInfo(null);

    const userMessage: Message = {
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };
    
    const userMessageContent = inputMessage;
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      }));
      
      conversationHistory.push({
        role: 'user',
        content: userMessageContent
      });
      
      const responseContent = await callGeminiAPI(conversationHistory);

      const botMessage: Message = {
        content: responseContent,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error handling message:', error);

      const errorMessage: Message = {
        content: "Sorry, I'm having trouble responding right now. Please try again later or contact our support team.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-200 z-50"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
          <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">License Assistant {DEMO_MODE && "(Demo Mode)"}</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          
          {DEBUG_MODE && debugInfo && (
            <div className="p-2 bg-yellow-50 border-b border-yellow-200 text-xs text-gray-800">
              <p className="font-semibold">Debug Info:</p>
              <p>{debugInfo}</p>
            </div>
          )}
          
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.isUser ? 'flex justify-end' : 'flex justify-start'
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                    message.isUser
                      ? 'bg-blue-700 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none max-w-xs md:max-w-md px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 bg-gray-100 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="text-sm bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none transition-colors"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;