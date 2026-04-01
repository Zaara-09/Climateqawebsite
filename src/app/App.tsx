import { useState } from 'react';
import { ChatInterface } from '@/app/components/ChatInterface';
import { ResearchPaper } from '@/app/components/ResearchPaper';
import { AboutPage } from '@/app/components/AboutPage';
import { Cloud, FileText, MessageSquare, Wind, Info, Menu, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'paper' | 'about'>('chat');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Massachusetts Climate & Air Quality Research
                </h1>
                <p className="text-gray-600 mt-1">
                  AI-powered insights on PM2.5 and climate patterns in Massachusetts
                </p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-2">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Climate AI
              </button>
              <button
                onClick={() => setActiveTab('paper')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'paper'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Research Paper
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'about'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                About
              </button>
            </nav>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-2">
              <button
                onClick={() => {
                  setActiveTab('chat');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'chat'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                Climate AI
              </button>
              <button
                onClick={() => {
                  setActiveTab('paper');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'paper'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-5 h-5" />
                Research Paper
              </button>
              <button
                onClick={() => {
                  setActiveTab('about');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'about'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Info className="w-5 h-5" />
                About
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - Only show on chat page */}
        {activeTab === 'chat' && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Wind className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Air Quality Analysis</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Comprehensive PM2.5 monitoring and analysis across Massachusetts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Cloud className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Climate Research</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Understanding climate patterns and their environmental impact
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Ask questions and get instant answers about our research
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation - Removed, now using header navigation */}

        {/* Content Area */}
        <div className="mb-8">
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'paper' && <ResearchPaper />}
          {activeTab === 'about' && <AboutPage />}
        </div>

        {/* Footer Info - Only show on chat page */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">About This Research</h3>
            <p className="text-gray-700 leading-relaxed">
              This platform presents research on PM2.5 particulate matter and climate patterns in
              Massachusetts. The AI assistant is trained on our research data to answer questions
              about air quality, climate trends, and environmental impacts specific to the
              Massachusetts region. Access the full research paper to learn more about our
              methodology, findings, and conclusions.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              Massachusetts Climate & Air Quality Research • {new Date().getFullYear()}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Data-driven insights for environmental policy and public health
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
