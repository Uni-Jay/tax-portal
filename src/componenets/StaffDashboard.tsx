import { useState } from 'react';
import { 
  Home, 
  BarChart3, 
  Users, 
  Building2, 
  GitMerge, 
  FileText, 
  DollarSign, 
  CreditCard, 
  Shield, 
  TrendingUp, 
  UserCheck, 
  Eye,
  ClipboardList,
  Calculator,
  Banknote,
  Receipt,
  ArrowRightLeft,
  UserX,
  TrendingDown,
  FileQuestion,
  Globe,
  Clock,
  MessageSquare,
  Download,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  CheckCircle,
} from 'lucide-react';

const ETaxAdminDashboard = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const menuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard'
    },
    {
      key: 'etax-statistics',
      label: 'eTax Statistics',
      icon: BarChart3,
      path: '/statistics'
    },
    {
      key: 'tax-payers',
      label: 'Tax Payers',
      icon: Users,
      hasSubmenu: true,
      submenu: [
        { key: 'individual-payers', label: 'Individual Payers', path: '/taxpayers/individual' },
        { key: 'individual-inactive', label: 'Individual Payers (Inactive)', path: '/taxpayers/individual-inactive' },
        { key: 'bulk-registration', label: 'Bulk Individual Registration', path: '/taxpayers/bulk-registration' },
        { key: 'corporate-payers', label: 'Corporate Payers', path: '/taxpayers/corporate' }
      ]
    },
    {
      key: 'tax-verification',
      label: 'Tax Payer Verification',
      icon: UserCheck,
      path: '/verification'
    },
    {
      key: 'tax-services',
      label: 'Tax Services',
      icon: FileText,
      path: '/services'
    },
    {
      key: 'tax-offices',
      label: 'Tax Offices',
      icon: Building2,
      path: '/offices'
    },
    {
      key: 'merge-requests',
      label: 'Merge Requests',
      icon: GitMerge,
      path: '/merge-requests'
    },
    {
      key: 'tama-registration',
      label: 'Tama Registration',
      icon: Shield,
      path: '/tama-registration'
    },
    {
      key: 'rmu',
      label: 'RMU',
      icon: TrendingUp,
      hasSubmenu: true,
      submenu: [
        { key: 'rmu-revenue', label: 'RMU Revenue', path: '/rmu/revenue' }
      ]
    },
    {
      key: 'payments',
      label: 'Payments',
      icon: CreditCard,
      path: '/payments'
    },
    {
      key: 'laspppa',
      label: 'LASPPPA',
      icon: Shield,
      path: '/laspppa'
    },
    {
      key: 'reports',
      label: 'Reports',
      icon: BarChart3,
      hasSubmenu: true,
      submenu: [
        { key: 'directors', label: 'Directors', path: '/reports/directors' }
      ]
    },
    {
      key: 'debts',
      label: 'Debts',
      icon: DollarSign,
      path: '/debts'
    },
    {
      key: 'returns',
      label: 'Returns',
      icon: FileText,
      hasSubmenu: true,
      submenu: [
        { key: 'individual-returns', label: 'Individual', path: '/returns/individual' },
        { key: 'corporate-returns', label: 'Corporate', path: '/returns/corporate' },
        { key: 'adequacy-checks', label: 'Adequacy Checks', path: '/returns/adequacy-checks' }
      ]
    },
    {
      key: 'assessments',
      label: 'Assessments',
      icon: ClipboardList,
      hasSubmenu: true,
      submenu: [
        { key: 'individual-assessments', label: 'Individual', path: '/assessments/individual' },
        { key: 'corporate-assessments', label: 'Corporate', path: '/assessments/corporate' }
      ]
    },
    {
      key: 'tax-audit',
      label: 'Tax Audit',
      icon: Calculator,
      path: '/tax-audit'
    },
    {
      key: 'revenue',
      label: 'Revenue',
      icon: Banknote,
      path: '/revenue'
    },
    {
      key: 'bills',
      label: 'Bills',
      icon: Receipt,
      path: '/bills'
    },
    {
      key: 'ebs-reports',
      label: 'EBS Reports',
      icon: BarChart3,
      hasSubmenu: true,
      submenu: [
        { key: 'transactions', label: 'Transactions', path: '/ebs-reports/transactions' },
        { key: 'expatriates', label: 'Expatriates', path: '/ebs-reports/expatriates' },
        { key: 'trend-collection', label: 'Trend Collection', path: '/ebs-reports/trend-collection' }
      ]
    },
    {
      key: 'transactions',
      label: 'Transactions',
      icon: ArrowRightLeft,
      path: '/transactions'
    },
    {
      key: 'expatriates',
      label: 'Expatriates',
      icon: UserX,
      path: '/expatriates'
    },
    {
      key: 'trend-collection',
      label: 'Trend Collection',
      icon: TrendingDown,
      path: '/trend-collection'
    },
    {
      key: 'assessment-requests',
      label: 'Assessment Requests',
      icon: FileQuestion,
      path: '/assessment-requests'
    },
    {
      key: 'egis',
      label: 'EGIS',
      icon: Globe,
      path: '/egis'
    },
    {
      key: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      hasSubmenu: true,
      submenu: [
        { key: 'direct-messages', label: 'Direct Messages', path: '/messages/direct' }
      ]
    },
    {
      key: 'download-manual',
      label: 'Download Manual',
      icon: Download,
      path: '/download-manual'
    }
  ];

  type MenuItemType = {
    key: string;
    label: string;
    icon: React.ElementType;
    path?: string;
    hasSubmenu?: boolean;
    submenu?: Array<{
      key: string;
      label: string;
      path: string;
    }>;
  };

  const MenuItem = ({ item, level = 0 }: { item: MenuItemType; level?: number }) => {
    const Icon = item.icon;
    const isExpanded = expandedItems[item.key];
    const isActive = activeItem === item.key;

    const handleClick = () => {
      if (item.hasSubmenu) {
        toggleExpanded(item.key);
      } else {
        setActiveItem(item.key);
      }
    };

    return (
      <div>
        <div
          onClick={handleClick}
          className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-200 ${
            isActive ? 'bg-blue-50 border-r-4 border-blue-500' : 'hover:bg-gray-50'
          } ${level > 0 ? 'pl-12' : ''}`}
          style={{ 
            color: isActive ? '#102e4a' : '#6c757d' 
          }}
          onMouseEnter={(e) => !isActive && ((e.target as HTMLElement).style.color = '#102e4a')}
          onMouseLeave={(e) => !isActive && ((e.target as HTMLElement).style.color = '#6c757d')}
        >
          <div className="flex items-center space-x-3">
            {!sidebarCollapsed && <Icon size={20} />}
            {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
          </div>
          {item.hasSubmenu && !sidebarCollapsed && (
            <div className="text-sm">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
        </div>
        
        {item.hasSubmenu && isExpanded && !sidebarCollapsed && (
          <div className="ml-8 mt-2 space-y-1">
            {item.submenu?.map((subItem) => (
              <div
                key={subItem.key}
                onClick={() => setActiveItem(subItem.key)}
                className={`flex items-center px-4 py-2 cursor-pointer transition-all duration-200 rounded mx-2 ${
                  activeItem === subItem.key ? 'text-white' : 'hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: activeItem === subItem.key ? '#102e4a' : 'transparent',
                  color: activeItem === subItem.key ? 'white' : '#6c757d'
                }}
                onMouseEnter={(e) => {
                  if (activeItem !== subItem.key) {
                    (e.target as HTMLElement).style.color = '#102e4a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeItem !== subItem.key) {
                    (e.target as HTMLElement).style.color = '#6c757d';
                  }
                }}
              >
                <span className="text-sm">{subItem.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Content Components
  const DashboardContent = () => {
    const stats = [
      { title: 'Total Tax Payers', value: '24,567', change: '+12%', color: 'text-green-400', icon: Users },
      { title: 'Monthly Revenue', value: '₦2.4B', change: '+8%', color: 'text-green-400', icon: DollarSign },
      { title: 'Pending Returns', value: '1,234', change: '-5%', color: 'text-red-400', icon: FileText },
      { title: 'Active Directors', value: '89', change: '+3%', color: 'text-green-400', icon: UserCheck }
    ];

    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#102e4a' }}>Staff Admin Dashboard</h1>
          <p style={{ color: '#6c757d' }}>Welcome to the E-TAX Staff Administration Portal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                    <StatIcon size={24} style={{ color: '#102e4a' }} />
                  </div>
                  <div className={`text-sm font-semibold ${stat.color}`}>
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: '#6c757d' }}>{stat.title}</p>
                  <p className="text-2xl font-bold" style={{ color: '#102e4a' }}>{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#102e4a' }}>Recent Activities</h3>
            <div className="space-y-4">
              {[
                { text: 'New tax payer registered', time: '2 minutes ago', color: 'bg-green-400' },
                { text: 'Payment processed', time: '15 minutes ago', color: 'bg-blue-400' },
                { text: 'Return filed', time: '1 hour ago', color: 'bg-yellow-400' },
                { text: 'Assessment completed', time: '2 hours ago', color: 'bg-purple-400' },
                { text: 'Tax audit scheduled', time: '3 hours ago', color: 'bg-red-400' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: '#102e4a' }}>{activity.text}</p>
                    <p className="text-xs" style={{ color: '#6c757d' }}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#102e4a' }}>Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: UserCheck, label: 'Verify Tax Payer', onClick: () => setActiveItem('tax-verification') },
                { icon: FileText, label: 'Generate Report', onClick: () => setActiveItem('reports') },
                { icon: CreditCard, label: 'Process Payment', onClick: () => setActiveItem('payments') },
                { icon: Eye, label: 'View Analytics', onClick: () => setActiveItem('etax-statistics') }
              ].map((action, index) => {
                const ActionIcon = action.icon;
                return (
                  <button 
                    key={index}
                    onClick={action.onClick}
                    className="p-4 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex flex-col items-center"
                    style={{ backgroundColor: '#102e4a' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a682ff'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#102e4a'}
                  >
                    <ActionIcon className="mb-2" size={24} />
                    <span className="text-sm font-medium text-center">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ETaxStatisticsContent = () => (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#102e4a' }}>eTax Statistics</h1>
        <p style={{ color: '#6c757d' }}>Comprehensive tax collection and compliance analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Collection Rate', value: '87.3%', trend: '+2.1%', icon: TrendingUp },
          { title: 'Compliance Score', value: '92.1%', trend: '+1.8%', icon: CheckCircle },
          { title: 'Processing Time', value: '3.2 days', trend: '-0.5 days', icon: Clock }
        ].map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <StatIcon size={32} style={{ color: '#102e4a' }} />
                <span className="text-green-500 text-sm font-semibold">{stat.trend}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#6c757d' }}>{stat.title}</h3>
              <p className="text-3xl font-bold" style={{ color: '#102e4a' }}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4" style={{ color: '#102e4a' }}>Monthly Revenue Trends</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {[65, 78, 82, 91, 76, 89, 94, 87, 92, 96, 88, 94].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80"
                style={{ 
                  height: `${height}%`, 
                  backgroundColor: index === 11 ? '#a682ff' : '#102e4a' 
                }}
              ></div>
              <span className="text-xs mt-2" style={{ color: '#6c757d' }}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  interface GenericContentProps {
    title: string;
    description: string;
    icon: React.ElementType;
  }

  const GenericContent = ({ title, description, icon: IconComponent }: GenericContentProps) => (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#102e4a' }}>{title}</h1>
        <p style={{ color: '#6c757d' }}>{description}</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <IconComponent size={64} style={{ color: '#102e4a' }} className="mx-auto" />
        </div>
        <h3 className="text-xl font-semibold mb-2" style={{ color: '#102e4a' }}>
          {title} Module
        </h3>
        <p className="mb-6" style={{ color: '#6c757d' }}>
          This section is under development. Advanced features and functionality will be available soon.
        </p>
        <button 
          className="px-6 py-2 text-white rounded-lg hover:shadow-lg transition-all"
          style={{ backgroundColor: '#102e4a' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a682ff'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#102e4a'}
        >
          Coming Soon
        </button>
      </div>
    </div>
  );

  // Main content renderer
  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <DashboardContent />;
      case 'etax-statistics':
        return <ETaxStatisticsContent />;
      case 'individual-payers':
      case 'individual-inactive':
      case 'bulk-registration':
      case 'corporate-payers':
        return <GenericContent title="Tax Payers" description="Manage individual and corporate tax payers" icon={Users} />;
      case 'tax-verification':
        return <GenericContent title="Tax Payer Verification" description="Verify and validate taxpayer information" icon={UserCheck} />;
      case 'payments':
        return <GenericContent title="Payments" description="Track and manage tax payments" icon={CreditCard} />;
      case 'tax-services':
        return <GenericContent title="Tax Services" description="Manage and configure available tax services" icon={FileText} />;
      case 'tax-offices':
        return <GenericContent title="Tax Offices" description="Manage tax office locations and staff assignments" icon={Building2} />;
      case 'merge-requests':
        return <GenericContent title="Merge Requests" description="Handle taxpayer profile merge requests" icon={GitMerge} />;
      case 'tama-registration':
        return <GenericContent title="TAMA Registration" description="Tax Agent and Multiplier Agent registration system" icon={Shield} />;
      case 'rmu-revenue':
        return <GenericContent title="RMU Revenue" description="Revenue Mobilization Unit tracking and reports" icon={TrendingUp} />;
      case 'laspppa':
        return <GenericContent title="LASPPPA" description="Lagos State Pension Protection Agency integration" icon={Shield} />;
      case 'directors':
        return <GenericContent title="Directors Report" description="Corporate directors and compliance reporting" icon={BarChart3} />;
      case 'debts':
        return <GenericContent title="Debts Management" description="Track and manage outstanding tax debts" icon={DollarSign} />;
      case 'individual-returns':
      case 'corporate-returns':
      case 'adequacy-checks':
        return <GenericContent title="Tax Returns" description="Process and review individual and corporate tax returns" icon={FileText} />;
      case 'individual-assessments':
      case 'corporate-assessments':
        return <GenericContent title="Tax Assessments" description="Create and manage tax assessments" icon={ClipboardList} />;
      case 'tax-audit':
        return <GenericContent title="Tax Audit" description="Conduct and manage tax audits" icon={Calculator} />;
      case 'revenue':
        return <GenericContent title="Revenue Management" description="Monitor and analyze revenue collections" icon={Banknote} />;
      case 'bills':
        return <GenericContent title="Bills Management" description="Generate and track tax bills" icon={Receipt} />;
      case 'transactions':
        return <GenericContent title="Transactions" description="View and manage all tax transactions" icon={ArrowRightLeft} />;
      case 'expatriates':
        return <GenericContent title="Expatriates Management" description="Manage expatriate tax obligations" icon={UserX} />;
      case 'trend-collection':
        return <GenericContent title="Trend Collection" description="Analyze tax collection trends and patterns" icon={TrendingDown} />;
      case 'assessment-requests':
        return <GenericContent title="Assessment Requests" description="Handle taxpayer assessment requests" icon={FileQuestion} />;
      case 'egis':
        return <GenericContent title="EGIS Integration" description="Electronic Government Information System" icon={Globe} />;
      case 'direct-messages':
        return <GenericContent title="Direct Messages" description="Internal communication system" icon={MessageSquare} />;
      case 'download-manual':
        return <GenericContent title="Download Manual" description="Access system manuals and documentation" icon={Download} />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div 
        className={`${sidebarCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 flex flex-col shadow-lg bg-white border-r border-gray-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#102e4a' }}>
                <Shield style={{ color: 'white' }} size={24} />
              </div>
              <div>
                <h1 className="font-bold text-lg" style={{ color: '#102e4a' }}>E-TAX</h1>
                <p className="text-xs" style={{ color: '#6c757d' }}>Staff Portal</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            style={{ color: '#102e4a' }}
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* User Profile */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
                <Users style={{ color: '#102e4a' }} size={24} />
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: '#102e4a' }}>Admin User</h3>
                <p className="text-sm" style={{ color: '#6c757d' }}>Staff Administrator</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => (
            <MenuItem key={item.key} item={item} />
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {renderContent()}
      </div>
    </div>
  );
};

export default ETaxAdminDashboard;