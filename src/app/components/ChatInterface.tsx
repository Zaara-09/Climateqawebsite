import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageSquare, Plus } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Conversation {
  id: string;
  messages: Message[];
  preview: string;
  timestamp: number;
}

const STORAGE_KEY = 'climate_ai_conversations';
const CURRENT_CONV_KEY = 'climate_ai_current_conversation';

const STARTER_PROMPTS = [
  "What is PM2.5?",
  "How to decrease PM2.5 levels?",
  "What's the relationship between PM2.5 and heart disease?",
  "What were the main findings of your research?"
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to answer your questions about PM2.5 and climate-related topics in Massachusetts. What would you like to know?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string>(Date.now().toString());
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const savedConversations = localStorage.getItem(STORAGE_KEY);
    const savedCurrentId = localStorage.getItem(CURRENT_CONV_KEY);

    if (savedConversations) {
      const parsed = JSON.parse(savedConversations);
      setConversations(parsed);

      if (savedCurrentId) {
        const currentConv = parsed.find((c: Conversation) => c.id === savedCurrentId);
        if (currentConv) {
          setCurrentConversationId(savedCurrentId);
          setMessages(currentConv.messages.map((m: Message) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          })));
        }
      }
    }
  }, []);

  // Save current conversation to localStorage whenever messages change
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === '1') return; // Don't save initial state

    const currentConv: Conversation = {
      id: currentConversationId,
      messages: messages,
      preview: messages.find(m => m.sender === 'user')?.text.slice(0, 50) || 'New conversation',
      timestamp: Date.now()
    };

    const existingConvs = conversations.filter(c => c.id !== currentConversationId);
    const updatedConvs = [currentConv, ...existingConvs].slice(0, 20); // Keep last 20 conversations

    setConversations(updatedConvs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConvs));
    localStorage.setItem(CURRENT_CONV_KEY, currentConversationId);
  }, [messages, currentConversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startNewChat = () => {
    const newId = Date.now().toString();
    setCurrentConversationId(newId);
    setMessages([
      {
        id: '1',
        text: 'Hello! I\'m here to answer your questions about PM2.5 and climate-related topics in Massachusetts. What would you like to know?',
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
    setShowHistory(false);
  };

  const loadConversation = (conversation: Conversation) => {
    setCurrentConversationId(conversation.id);
    setMessages(conversation.messages.map(m => ({
      ...m,
      timestamp: new Date(m.timestamp)
    })));
    setShowHistory(false);
    localStorage.setItem(CURRENT_CONV_KEY, conversation.id);
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI thinking delay for realistic experience
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getMockResponse(textToSend),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800); // Realistic response delay
  };

  const getMockResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('pm2.5') || lowerQuestion.includes('particulate')) {
      return 'PM2.5 refers to fine particulate matter with a diameter of 2.5 micrometers or less. According to the research, Massachusetts experiences modest PM2.5 variation with summer peaks in some years due to atmospheric conditions favoring secondary particle formation. The state maintains relatively clean air nationally, with limited year-to-year and county-to-county PM2.5 variation. County-level PM2.5 exposure is typically approximated using the average of the three nearest monitoring stations.';
    }
    
    if (lowerQuestion.includes('heart disease') || lowerQuestion.includes('cardiovascular') || lowerQuestion.includes('mortality')) {
      return 'The research examined the relationship between PM2.5 levels and heart disease mortality at the county level in Massachusetts from 2018-2022. While established literature from large-scale studies shows chronic PM2.5 exposure raises cardiovascular risks, the study found no detectable short-term association in this relatively clean-air state. This was likely due to limited PM2.5 variability, ecological design limitations, and unmeasured confounding factors like age distribution, smoking rates, and healthcare access.';
    }

    if (lowerQuestion.includes('correlation') || lowerQuestion.includes('relationship') || lowerQuestion.includes('association')) {
      return 'The research found consistently weak correlations (|r| < 0.25) between PM2.5 and heart disease mortality with high p-values indicating no statistical significance. The OLS regression model explained less than 1% of variation in mortality (R² ≈ 0.009). However, this doesn\'t contradict broader evidence from larger studies - it demonstrates challenges in detecting subtle effects with short-term, aggregated public datasets in a low-variation setting.';
    }

    if (lowerQuestion.includes('method') || lowerQuestion.includes('data') || lowerQuestion.includes('research')) {
      return 'The research used air quality data from the EPA and heart disease mortality data from CDC datasets and Massachusetts state health reports (2018-2022). Statistical analyses included Pearson and Spearman correlations along with ordinary least squares regression controlling for year effects. Visualizations were created using Plotly Express and Folium. Processing was done in Python with pandas in Google Colab notebooks.';
    }

    if (lowerQuestion.includes('covid') || lowerQuestion.includes('2020') || lowerQuestion.includes('pandemic')) {
      return 'The 2020 COVID-19 pandemic represented a major exogenous shock to cardiovascular mortality trends. The research found that the COVID-19 surge dominated mortality fluctuations more than pollution differences during this period, likely overwhelming any modest pollution-related signal.';
    }

    if (lowerQuestion.includes('limitation') || lowerQuestion.includes('challenge')) {
      return 'Key limitations included: (1) Massachusetts\' relatively clean air resulting in narrow PM2.5 exposure range, (2) Heart disease typically involves long-term cumulative exposure over decades, not just annual averages, (3) County aggregation can misclassify individual exposures, (4) Many confounding factors like age, smoking rates, income, and healthcare access were unavailable for adjustment, (5) The short study period (2018-2022) limited statistical power.';
    }
    
    if (lowerQuestion.includes('climate') || lowerQuestion.includes('temperature') || lowerQuestion.includes('warming')) {
      return 'The research focused on PM2.5 and heart disease mortality in Massachusetts. While climate factors affect air quality, Massachusetts maintains relatively clean air nationally. The study found summer peaks in PM2.5 in some years due to atmospheric conditions. Understanding these relationships is crucial for developing effective environmental health policies.';
    }
    
    if (lowerQuestion.includes('air quality') || lowerQuestion.includes('pollution')) {
      return 'Air quality data in the research came from EPA monitoring stations across Massachusetts. The study found modest PM2.5 variation statewide with limited year-to-year and county-to-county differences. Massachusetts maintains relatively clean air compared to national standards, which actually made it challenging to detect associations between pollution and health outcomes in this short-term study.';
    }

    if (lowerQuestion.includes('future') || lowerQuestion.includes('next') || lowerQuestion.includes('improve')) {
      return 'Future research directions include: expanding to national datasets for more variation, incorporating demographic adjustments if available, testing multivariable models, building interactive dashboards integrating visualizations, and using longer time series or individual-level studies to better detect subtle health effects.';
    }
    
    return 'That\'s an interesting question about PM2.5 and heart disease in Massachusetts. The research examined county-level associations from 2018-2022 using EPA air quality data and CDC mortality data. While no short-term association was detected, this highlights methodological challenges rather than contradicting established evidence. Could you be more specific about what aspect you\'d like to explore?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasUserMessages = messages.some(m => m.sender === 'user');

  return (
    <div className="flex gap-4">
      {/* History Sidebar - Desktop */}
      <div className={`hidden md:block w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all ${showHistory ? 'opacity-100' : 'w-0 opacity-0 hidden'}`}>
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Conversation History</h3>
        </div>
        <div className="overflow-y-auto h-[540px]">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => loadConversation(conv)}
              className={`w-full text-left p-3 border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                conv.id === currentConversationId ? 'bg-blue-100' : ''
              }`}
            >
              <p className="text-sm text-gray-900 truncate">{conv.preview}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(conv.timestamp).toLocaleDateString()}
              </p>
            </button>
          ))}
          {conversations.length === 0 && (
            <p className="text-center text-gray-500 text-sm p-4">No history yet</p>
          )}
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col h-[600px] bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-white">Climate & PM2.5 AI Assistant</h3>
            <p className="text-sm text-blue-100">Ask questions about Massachusetts climate and air quality</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="hidden md:block px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              History
            </button>
            <button
              onClick={startNewChat}
              className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Prompt Chips - Show only before first user message */}
          {!hasUserMessages && !isLoading && (
            <div className="flex flex-wrap gap-2 mb-4">
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors border border-blue-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question about PM2.5 or climate in Massachusetts..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}