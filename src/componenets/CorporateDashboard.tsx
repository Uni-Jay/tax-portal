import React, { useState } from 'react';
import { 
  User, Bell, FileText, CreditCard, History, 
  Calculator, MessageSquare, Settings, Menu,
  X, ChevronDown, ChevronRight, Home,
  Receipt, TrendingUp, AlertCircle, CheckCircle,
  Clock,
} from 'lucide-react';

interface UserProfile {
  name: string;
  taxpayerType: 'Individual' | 'Corporate';
  taxpayerId: string;
  lastLogin: string;
  profileImage?: string;
}

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

interface SummaryCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

const ETaxDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['dashboard']);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Payment Due',
      message: 'Your PAYE tax payment is due in 3 days',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Assessment Update',
      message: 'New assessment available for review',
      timestamp: '1 day ago',
      read: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Payment Confirmed',
      message: 'Your WHT payment has been processed',
      timestamp: '3 days ago',
      read: true
    }
  ]);

  const userProfile: UserProfile = {
    name: 'John Doe Enterprises',
    taxpayerType: 'Corporate',
    taxpayerId: 'TIN-123456789',
    lastLogin: 'July 21, 2025 - 09:30 AM'
  };

  const quickActions: QuickAction[] = [
    {
      id: 'generate-bill',
      title: 'Generate Bill',
      icon: <Receipt className="w-6 h-6" />,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => setActiveSection('generate-bill')
    },
    {
      id: 'file-returns',
      title: 'File Returns',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => setActiveSection('returns')
    },
    {
      id: 'make-payment',
      title: 'Make Payment',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => setActiveSection('payment')
    },
    {
      id: 'payment-history',
      title: 'Payment History',
      icon: <History className="w-6 h-6" />,
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => setActiveSection('payment-history')
    },
    {
      id: 'tax-details',
      title: 'Tax Details',
      icon: <Calculator className="w-6 h-6" />,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      onClick: () => setActiveSection('tax-details')
    },
    {
      id: 'return-status',
      title: 'Return Status',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-teal-500 hover:bg-teal-600',
      onClick: () => setActiveSection('return-status')
    }
  ];

  const summaryCards: SummaryCard[] = [
    {
      title: 'Outstanding Bills',
      value: '₦2,450,000',
      icon: <AlertCircle className="w-8 h-8" />,
      color: 'border-red-200 bg-red-50',
      trend: '2 pending'
    },
    {
      title: 'Recent Payments',
      value: '₦1,200,000',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'border-green-200 bg-green-50',
      trend: 'This month'
    },
    {
      title: 'Unread Messages',
      value: notifications.filter(n => !n.read).length,
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'border-blue-200 bg-blue-50',
      trend: '2 new'
    },
    {
      title: 'Upcoming Deadlines',
      value: 3,
      icon: <Clock className="w-8 h-8" />,
      color: 'border-yellow-200 bg-yellow-50',
      trend: 'Next 30 days'
    }
  ];

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      items: []
    },
    {
      id: 'profile',
      title: 'Profile Management',
      icon: <User className="w-5 h-5" />,
      items: [
        { id: 'view-profile', title: 'View Profile' },
        { id: 'update-info', title: 'Update Information' },
        { id: 'manage-staff', title: 'Manage Staff' }
      ]
    },
    {
      id: 'assessment',
      title: 'Assessment',
      icon: <Calculator className="w-5 h-5" />,
      items: [
        { id: 'view-assessments', title: 'View Assessments' },
        { id: 'object-assessment', title: 'Object to Assessment' },
        { id: 'corporate-assessment', title: 'Corporate Assessment' }
      ]
    },
    {
      id: 'payment',
      title: 'Payment Module',
      icon: <CreditCard className="w-5 h-5" />,
      items: [
        { id: 'generate-bill', title: 'Generate Bill' },
        { id: 'make-payment', title: 'Make Payment' },
        { id: 'payment-history', title: 'Payment History' },
        { id: 'tax-details', title: 'Tax Details' }
      ]
    },
    {
      id: 'returns',
      title: 'Returns',
      icon: <FileText className="w-5 h-5" />,
      items: [
        { id: 'file-returns', title: 'File Returns' },
        { id: 'view-returns', title: 'View Returns' },
        { id: 'horc-module', title: 'HORC Module' }
      ]
    },
    {
      id: 'messages',
      title: 'Messages',
      icon: <MessageSquare className="w-5 h-5" />,
      items: [
        { id: 'inbox', title: 'Inbox' },
        { id: 'search-messages', title: 'Search Messages' }
      ]
    }
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 overflow-hidden`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className={`${sidebarOpen ? 'block' : 'hidden'}`}>
              <h1 className="text-xl font-bold text-gray-800">E-Tax Portal</h1>
              <p className="text-sm text-gray-600">Lagos State</p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.items.length > 0) {
                    toggleMenu(item.id);
                  } else {
                    setActiveSection(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                  activeSection === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  {sidebarOpen && <span className="font-medium">{item.title}</span>}
                </div>
                {sidebarOpen && item.items.length > 0 && (
                  expandedMenus.includes(item.id) ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              {/* Submenu */}
              {sidebarOpen && expandedMenus.includes(item.id) && item.items.length > 0 && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.items.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => setActiveSection(subItem.id)}
                      className={`w-full text-left p-2 rounded hover:bg-gray-50 text-sm transition-colors ${
                        activeSection === subItem.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                      }`}
                    >
                      {subItem.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
              <p className="text-gray-600">Welcome back, {userProfile.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-800">{userProfile.name}</p>
                  <p className="text-sm text-gray-600">{userProfile.taxpayerType}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Profile Snapshot */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Profile Snapshot</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{userProfile.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Settings className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Taxpayer Type</p>
                  <p className="font-medium">{userProfile.taxpayerType}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Taxpayer ID</p>
                  <p className="font-medium">{userProfile.taxpayerId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Last Login</p>
                  <p className="font-medium text-sm">{userProfile.lastLogin}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Tiles */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className={`${action.color} text-white p-4 rounded-lg transition-all hover:scale-105 shadow-md`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    {action.icon}
                    <span className="text-sm font-medium text-center">{action.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Summary Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {summaryCards.map((card, index) => (
              <div key={index} className={`p-6 rounded-lg border-2 ${card.color}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    {card.trend && <p className="text-sm text-gray-500 mt-1">{card.trend}</p>}
                  </div>
                  <div className="text-gray-600">
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notifications/Message Feed */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Notifications</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg border ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    notification.type === 'success' ? 'bg-green-100 text-green-600' :
                    notification.type === 'error' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {notification.type === 'warning' ? <AlertCircle className="w-5 h-5" /> :
                     notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
                     notification.type === 'error' ? <X className="w-5 h-5" /> :
                     <Bell className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{notification.title}</p>
                        <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                        <p className="text-gray-400 text-xs mt-2">{notification.timestamp}</p>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => markNotificationAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ETaxDashboard;