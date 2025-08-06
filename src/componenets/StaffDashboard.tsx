import { useEffect, useState } from 'react';
import { 
  Home, 
  RotateCcw,
  Bell,
  BarChart3, 
  Users, 
  Building2,
  GitMerge, 
  FileText, 
  DollarSign,
  MessageCircle, 
  CreditCard, 
  Shield, 
  TrendingUp, 
  UserCheck, 
  Eye,
  Calendar,
  ClipboardList,
  Calculator,
  Banknote,
  Receipt,
  ArrowRightLeft,
  UserX,
  TrendingDown,
  FileQuestion,
  Globe,
  MessageSquare,
  Download,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  CheckCircle,
  ArrowLeft,
  Filter,
  Search,
  RefreshCw,
} from 'lucide-react';

const ETaxAdminDashboard = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [notification, setNotification] = useState('');

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

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
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#2f363dff' }}>Staff Admin Dashboard</h1>
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

  const ETaxStatisticsContent = () => {
    const statisticsData = [
      // Row 1
      { title: 'Daily Volume', value: '', icon: 'N', color: 'bg-orange-500', textColor: 'text-white' },
      { title: 'Monthly Volume', value: '', icon: 'N', color: 'bg-orange-500', textColor: 'text-white' },
      { title: 'Annual Volume', value: '', icon: 'N', color: 'bg-orange-500', textColor: 'text-white' },
      
      // Row 2
      { title: 'Daily Count', value: '', icon: '↻', color: 'bg-green-500', textColor: 'text-white' },
      { title: 'Monthly Count', value: '', icon: '↻', color: 'bg-green-500', textColor: 'text-white' },
      { title: 'Annual Count', value: '', icon: '↻', color: 'bg-green-500', textColor: 'text-white' },
      
      // Row 3
      { title: 'Total Revenue(This Year)', value: '₦ 0.00', icon: 'N', color: 'bg-orange-500', textColor: 'text-white' },
      { title: 'Total Number of individual Tax Payers', value: '0', icon: '🏛️', color: 'bg-orange-500', textColor: 'text-white' },
      { title: 'Total number of Individual Tax Payers employed', value: '0', icon: '🏛️', color: 'bg-orange-500', textColor: 'text-white' },
      
      // Row 4
      { title: 'Total number of self- employed Individual Tax Payers', value: '0', icon: '🏛️', color: 'bg-orange-500', textColor: 'text-white' },
      { title: 'Total number of Individual Tax Payers with BVN', value: '0', icon: '👥', color: 'bg-green-500', textColor: 'text-white' },
      { title: 'Total number of Individual Tax Payers employed with BVN', value: '0', icon: '📅', color: 'bg-green-500', textColor: 'text-white' },
      
      // Row 5
      { title: 'Total number of self- employed Individual Tax Payers with BVN', value: '0', icon: '👥', color: 'bg-green-500', textColor: 'text-white' }
    ];

    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#102e4a' }}>eTax Statistics</h1>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statisticsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex items-center p-6">
                {/* Icon Section */}
                <div className={`w-20 h-20 ${stat.color} rounded-lg flex items-center justify-center mr-6 flex-shrink-0`}>
                  {stat.icon === 'N' ? (
                    <span className="text-3xl font-bold text-white">N</span>
                  ) : stat.icon === '↻' ? (
                    <div className="text-3xl text-white">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12H4A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
                      </svg>
                    </div>
                  ) : stat.icon === '🏛️' ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M6.5,10C7.3,10 8,9.3 8,8.5C8,7.7 7.3,7 6.5,7C5.7,7 5,7.7 5,8.5C5,9.3 5.7,10 6.5,10M9,13H4V20H2V22H20V20H18V13H13L11.5,7.5C11.4,7.1 11,6.8 10.6,6.8H7.4C7,6.8 6.6,7.1 6.5,7.5L5,13H2V11H4.7L6.4,5.5C6.7,4.6 7.6,4 8.5,4H11.5C12.4,4 13.3,4.6 13.6,5.5L15.3,11H18V13H16V20H11V18H13V15H11V13H9V15H7V20H9V22H2V20H0V18H2V15H4V13H2V11H4.7"/>
                    </svg>
                  ) : stat.icon === '👥' ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M16,4C18.2,4 20,5.8 20,8A4,4 0 0,1 16,12C13.8,12 12,10.2 12,8A4,4 0 0,1 16,4M16,14C16.5,14 17,14.1 17.5,14.2C19.9,14.7 21.7,16.5 22.2,18.9C22.4,19.9 21.6,20.8 20.6,20.8H11.4C10.4,20.8 9.6,19.9 9.8,18.9C10.3,16.5 12.1,14.7 14.5,14.2C15,14.1 15.5,14 16,14M8,6A3,3 0 0,1 11,9A3,3 0 0,1 8,12A3,3 0 0,1 5,9A3,3 0 0,1 8,6M8,13C10.7,13 16,14.3 16,17V20H0V17C0,14.3 5.3,13 8,13Z"/>
                    </svg>
                  ) : stat.icon === '📅' ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"/>
                    </svg>
                  ) : (
                    <span className="text-2xl">{stat.icon}</span>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-2" style={{ color: '#6c757d' }}>
                    {stat.title}
                  </h3>
                  {stat.value && (
                    <p className="text-2xl font-bold" style={{ color: '#102e4a' }}>
                      {stat.value}
                    </p>
                  )}
                  {/* Red trend indicator */}
                  <div className="flex justify-end mt-2">
                    <div className="text-red-500 text-sm">
                      📈
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: '#6c757d' }}>© 2025 e-Tax. All Rights Reserved.</p>
        </div>
      </div>
    );
  };

  // Tax Payer Profile Detail Content
type TaxpayerData = {
  id: string;
  tin?: string;
  fullName?: string;
  age?: string;
  email?: string;
  address?: string;
  stateLgaLcda?: string;
  phoneNumber?: string;
  gender?: string;
  maritalStatus?: string;
  nationality?: string;
  dateOfBirth?: string;
  lassraNo?: string;
  taxStation?: string;
  identificationType?: string;
  identificationNumber?: string;
};

type AuditEntry = {
  id?: string | number;
  date: string;
  action: string;
  user?: string;
  details?: string;
  [key: string]: any;
};

type Props = {
  taxpayerId: string;
  onBack: () => void;
  showNotification?: (msg: string, level?: "info" | "success" | "error") => void;
};

const TaxPayerProfileDetailContent: React.FC<Props> = ({ taxpayerId, onBack, showNotification }) => {
  const [activeTab, setActiveTab] = useState<string>("family-relations");
  const [taxpayerData, setTaxpayerData] = useState<TaxpayerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state for family add actions
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"add-child" | "add-spouse" | null>(null);

  // Audit trail state
  const [auditData, setAuditData] = useState<AuditEntry[]>([]);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);
  const [auditLoading, setAuditLoading] = useState<boolean>(false);
  const [auditError, setAuditError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(`/api/taxpayers/${encodeURIComponent(taxpayerId)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then((data: TaxpayerData) => {
        if (!isMounted) return;
        setTaxpayerData(data);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Fetch taxpayer data error:", err);
        setError("Failed to load taxpayer data.");
        showNotification?.("Failed to load taxpayer data.", "error");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [taxpayerId, showNotification]);

  const tabs = [
    { key: "family-relations", label: "FAMILY RELATIONS", icon: "👥", color: "bg-green-500" },
    { key: "support-staff", label: "SUPPORT STAFF", icon: "🛠️", color: "bg-orange-500" },
    { key: "employer", label: "EMPLOYER", icon: "🏢", color: "bg-teal-500" },
    { key: "companies", label: "COMPANIES", icon: "🏭", color: "bg-blue-500" },
    { key: "returns", label: "RETURNS", icon: "📋", color: "bg-green-600" },
    { key: "over-filed", label: "OVER-FILED RETURNS", icon: "📄", color: "bg-purple-500" },
    { key: "assets", label: "ASSETS", icon: "🏠", color: "bg-indigo-500" },
    { key: "cases", label: "CASES", icon: "⚖️", color: "bg-red-500" },
    { key: "bills", label: "BILLS", icon: "💰", color: "bg-yellow-500" },
    { key: "assessment", label: "ASSESSMENT", icon: "📊", color: "bg-teal-600" },
    { key: "payments", label: "PAYMENTS", icon: "💳", color: "bg-blue-600" },
  ];

  // Fallback data while loading or if backend doesn't include fields
  const fallback: TaxpayerData = {
    id: taxpayerId,
    tin: "—",
    fullName: "—",
    age: "—",
    email: "—",
    address: "—",
    stateLgaLcda: "—",
    phoneNumber: "—",
    gender: "—",
    maritalStatus: "—",
    nationality: "—",
    dateOfBirth: "—",
    lassraNo: "—",
    taxStation: "—",
    identificationType: "—",
    identificationNumber: "—",
  };

  const dataToShow = taxpayerData ?? fallback;

  // ===== Audit trail functions =====
  const fetchAuditTrail = async () => {
    setAuditLoading(true);
    setAuditError(null);
    try {
      const res = await fetch(`/api/taxpayers/${encodeURIComponent(taxpayerId)}/audit`);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      // Expecting array of audit entries; adapt if your API returns different shape
      setAuditData(Array.isArray(data) ? data : []);
      setShowAuditModal(true);
    } catch (err) {
      console.error("fetchAuditTrail error:", err);
      setAuditError("Failed to load audit trail.");
      showNotification?.("Failed to load audit trail.", "error");
    } finally {
      setAuditLoading(false);
    }
  };

  // Convert audit data to CSV and trigger download
  const downloadAuditCsv = () => {
    if (!auditData || auditData.length === 0) {
      showNotification?.("No audit entries to download.", "info");
      return;
    }

    const keys = Array.from(
      auditData.reduce((acc, row) => {
        Object.keys(row).forEach(k => acc.add(k));
        return acc;
      }, new Set<string>())
    );

    const csvRows = [
      keys.join(","),
      ...auditData.map(entry =>
        keys
          .map(k => {
            const raw = entry[k] ?? "";
            const safe = String(raw).replace(/"/g, '""'); // escape quotes
            // Wrap in quotes if contains comma/newline/quote
            return /[",\n]/.test(safe) ? `"${safe}"` : safe;
          })
          .join(",")
      ),
    ];

    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    const filename = `audit_${taxpayerId}_${new Date().toISOString().slice(0,19).replace(/[:T]/g, "-")}.csv`;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    showNotification?.("Audit CSV downloaded.", "success");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 px-3 py-2 hover:bg-gray-100 rounded-lg transition-all flex items-center space-x-2 border border-gray-300"
            style={{ color: "#102e4a" }}
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-2xl font-semibold" style={{ color: "#102e4a" }}>
            Tax Payer Profile Detail
          </h1>
        </div>

        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#f8f9fa" }}>
          <Users style={{ color: "#102e4a" }} size={20} />
        </div>
      </div>

      {/* Loading / Error */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">Loading taxpayer data...</div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center text-red-600">{error}</div>
      ) : null}

      {/* Profile Card */}
      {!loading && (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Picture and Audit Trail */}
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                <Users size={60} style={{ color: "#6c757d" }} />
              </div>

              {/* AUDIT TRAIL button now fetches the audit */}
              <button
                onClick={fetchAuditTrail}
                className="px-6 py-2 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                style={{ backgroundColor: "#28a745" }}
                disabled={auditLoading}
                aria-disabled={auditLoading}
              >
                {auditLoading ? "Loading..." : "AUDIT TRAIL"}
              </button>
            </div>

            {/* Personal Information - Left Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Payer Id:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.id}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  TIN:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.tin}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Full Name:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.fullName}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Age:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.age}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Email Address:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.email}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Address:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.address}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  State / LGA / LCDA:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.stateLgaLcda}
                </p>
              </div>
            </div>

            {/* Personal Information - Right Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Phone Number:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.phoneNumber}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Gender:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.gender}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Marital Status:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.maritalStatus}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Nationality:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.nationality}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Date of Birth:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.dateOfBirth}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  LASSRA No:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.lassraNo || "-"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Tax Station:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.taxStation}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Identification Type:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.identificationType}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>
                  Identification Number:
                </label>
                <p className="text-lg" style={{ color: "#102e4a" }}>
                  {dataToShow.identificationNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 px-4 py-4 text-white font-medium text-sm hover:opacity-90 transition-all ${tab.color} ${
                activeTab === tab.key ? "opacity-100" : "opacity-75"
              }`}
              style={{ minWidth: "120px" }}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-lg">{tab.icon}</span>
                <span className="text-xs">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {activeTab === "family-relations" && (
          <div>
            <div className="flex justify-end space-x-4 mb-6">
              <button
                onClick={() => {
                  setModalType("add-child");
                  setShowModal(true);
                }}
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all font-medium"
              >
                ADD CHILD
              </button>
              <button
                onClick={() => {
                  setModalType("add-spouse");
                  setShowModal(true);
                }}
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all font-medium"
              >
                ADD SPOUSE
              </button>
            </div>
            <div className="text-center py-8">
              <p style={{ color: "#6c757d" }}>There are currently no known family relations.</p>
            </div>
          </div>
        )}

        {activeTab !== "family-relations" && (
          <div className="text-center py-8">
            <p style={{ color: "#6c757d" }}>{tabs.find((t) => t.key === activeTab)?.label} section is under development.</p>
          </div>
        )}
      </div>

      {/* Audit Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Audit Trail</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={downloadAuditCsv}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  Download CSV
                </button>
                <button
                  onClick={() => {
                    setShowAuditModal(false);
                    setAuditData([]);
                  }}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>

            {auditLoading ? (
              <div>Loading audit...</div>
            ) : auditError ? (
              <div className="text-red-600">{auditError}</div>
            ) : auditData.length === 0 ? (
              <div>No audit trail found for this taxpayer.</div>
            ) : (
              <div className="max-h-72 overflow-auto">
                <table className="w-full text-sm table-fixed border-collapse">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-2">Date</th>
                      <th className="p-2">Action</th>
                      <th className="p-2">User</th>
                      <th className="p-2">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditData.map((entry, idx) => (
                      <tr key={entry.id ?? idx} className="border-b odd:bg-white even:bg-gray-50">
                        <td className="p-2 align-top">{entry.date}</td>
                        <td className="p-2 align-top">{entry.action}</td>
                        <td className="p-2 align-top">{entry.user ?? "-"}</td>
                        <td className="p-2 align-top">{entry.details ?? JSON.stringify(entry, null, 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Example modal placeholder (add child/spouse) */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
            <h3 className="text-lg font-semibold mb-4">{modalType === "add-child" ? "Add Child" : "Add Spouse"}</h3>
            <p className="text-sm text-gray-600 mb-6">Modal content goes here. Implement your form or component.</p>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">
                Close
              </button>
              <button
                onClick={() => {
                  // perform save action...
                  showNotification?.(`${modalType === "add-child" ? "Child" : "Spouse"} added (mock).`, "success");
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm" style={{ color: "#6c757d" }}>
          © 2025 e-Tax. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

  // Corporate Tax Payer Profile Detail Content
 type CorporateData = {
  id: string;
  tin?: string;
  companyName?: string;
  registrationNumber?: string;
  businessType?: string;
  email?: string;
  address?: string;
  stateLgaLcda?: string;
  phoneNumber?: string;
  dateOfIncorporation?: string;
  cacNumber?: string;
  taxStation?: string;
  businessNature?: string;
  directorsCounts?: string;
  authorizedCapital?: string;
  paidUpCapital?: string;
};

type Profileprops = {
  taxpayerId: string;
  onBack: () => void;
  showNotification?: (msg: string) => void;
};

const CorporateTaxPayerProfileDetailContent: React.FC<Profileprops> = ({
  taxpayerId,
  onBack,
  showNotification,
}) => {
  const [activeTab, setActiveTab] = useState<string>("family-relations");
  const [corporateData, setCorporateData] = useState<CorporateData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // Replace this URL with your real API endpoint.
    fetch(`/api/corporate-taxpayers/${encodeURIComponent(taxpayerId)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then((data: CorporateData) => {
        if (!isMounted) return;
        setCorporateData(data);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Fetch corporate data error:", err);
        setError("Failed to load corporate data.");
        // optionally show a notification if provided
        showNotification?.("Failed to load corporate data.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [taxpayerId, showNotification]);

  const tabs = [
    { key: "family-relations", label: "COMPANY INFO", icon: "🏢", color: "bg-green-500" },
    { key: "support-staff", label: "DIRECTORS", icon: "👥", color: "bg-orange-500" },
    { key: "employer", label: "SHAREHOLDERS", icon: "📊", color: "bg-teal-500" },
    { key: "companies", label: "SUBSIDIARIES", icon: "🏭", color: "bg-blue-500" },
    { key: "returns", label: "RETURNS", icon: "📋", color: "bg-green-600" },
    { key: "over-filed", label: "OVER-FILED RETURNS", icon: "📄", color: "bg-purple-500" },
    { key: "assets", label: "ASSETS", icon: "🏠", color: "bg-indigo-500" },
    { key: "cases", label: "CASES", icon: "⚖️", color: "bg-red-500" },
    { key: "bills", label: "BILLS", icon: "💰", color: "bg-yellow-500" },
    { key: "assessment", label: "ASSESSMENT", icon: "📊", color: "bg-teal-600" },
    { key: "payments", label: "PAYMENTS", icon: "💳", color: "bg-blue-600" },
  ];

  // Temporary fallback while fetching / if missing fields
  const fallback: CorporateData = {
    id: taxpayerId,
    tin: "—",
    companyName: "—",
    registrationNumber: "—",
    businessType: "—",
    email: "—",
    address: "—",
    stateLgaLcda: "—",
    phoneNumber: "—",
    dateOfIncorporation: "—",
    cacNumber: "—",
    taxStation: "—",
    businessNature: "—",
    directorsCounts: "—",
    authorizedCapital: "—",
    paidUpCapital: "—",
  };

  const dataToShow = corporateData ?? fallback;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 px-3 py-2 hover:bg-gray-100 rounded-lg transition-all flex items-center space-x-2 border border-gray-300"
            style={{ color: "#102e4a" }}
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-2xl font-semibold" style={{ color: "#102e4a" }}>
            Corporate Tax Payer Profile Detail
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#f8f9fa" }}>
          <Building2 style={{ color: "#102e4a" }} size={20} />
        </div>
      </div>

      {/* Loading / Error */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">Loading corporate data...</div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center text-red-600">{error}</div>
      ) : null}

      {/* Profile Card */}
      {!loading && (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Company Logo and Audit Trail */}
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-lg bg-gray-300 flex items-center justify-center mb-4">
                <Building2 size={60} style={{ color: "#6c757d" }} />
              </div>
              <button
                onClick={() => showNotification?.("Corporate audit trail report generated successfully")}
                className="px-6 py-2 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                style={{ backgroundColor: "#28a745" }}
              >
                AUDIT TRAIL
              </button>
            </div>

            {/* Company Information - Left Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Company Id:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>TIN:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.tin}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Company Name:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.companyName}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Registration Number:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.registrationNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Business Type:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.businessType}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Email Address:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Address:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>State / LGA / LCDA:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.stateLgaLcda}</p>
              </div>
            </div>

            {/* Company Information - Right Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Phone Number:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.phoneNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Date of Incorporation:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.dateOfIncorporation}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>CAC Number:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.cacNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Business Nature:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.businessNature}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Tax Station:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.taxStation}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Number of Directors:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.directorsCounts}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Authorized Capital:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.authorizedCapital}</p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#6c757d" }}>Paid-Up Capital:</label>
                <p className="text-lg" style={{ color: "#102e4a" }}>{dataToShow.paidUpCapital}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 px-4 py-4 text-white font-medium text-sm hover:opacity-90 transition-all ${tab.color} ${
                activeTab === tab.key ? "opacity-100" : "opacity-75"
              }`}
              style={{ minWidth: "120px" }}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-lg">{tab.icon}</span>
                <span className="text-xs">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {activeTab === "family-relations" && (
          <div>
            <div className="flex justify-end space-x-4 mb-6">
              <button
                onClick={() => showNotification?.("Branch office functionality coming soon")}
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all font-medium"
              >
                ADD BRANCH
              </button>
              <button
                onClick={() => showNotification?.("Company information updated successfully")}
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all font-medium"
              >
                UPDATE INFO
              </button>
            </div>
            <div className="text-center py-8">
              <p style={{ color: "#6c757d" }}>Company information is up to date.</p>
            </div>
          </div>
        )}

        {activeTab !== "family-relations" && (
          <div className="text-center py-8">
            <p style={{ color: "#6c757d" }}>{tabs.find((t) => t.key === activeTab)?.label} section is under development.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm" style={{ color: "#6c757d" }}>© 2025 e-Tax. All Rights Reserved.</p>
      </div>
    </div>
  );
};



  const TaxServicesInterface = () => {
  const [taxPayerNumber, setTaxPayerNumber] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!taxPayerNumber.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setShowActions(true);
  };

  const handleBack = () => {
    setShowActions(false);
    setTaxPayerNumber('');
  };

  const handleRevalidateId = () => {
    alert('Revalidating ID...');
  };

  const handleResetPassword = () => {
    alert('Resetting password...');
  };

  const handleSendNotification = () => {
    alert('Sending notification...');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Tax Services</h1>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Tax Services For</h2>
                </div>
              </div>
              {showActions && (
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>

            {!showActions ? (
              /* Initial Form */
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Tax Payer Number
                  </label>
                  <input
                    type="text"
                    value={taxPayerNumber}
                    onChange={(e) => setTaxPayerNumber(e.target.value)}
                    placeholder="Enter Tax Payer Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleContinue}
                    disabled={!taxPayerNumber.trim() || isLoading}
                    className="px-8 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <span>CONTINUE</span>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* Action Buttons */
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Tax Payer Number
                  </label>
                  <div className="text-lg font-semibold text-gray-800 py-2">
                    {taxPayerNumber}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <button
                    onClick={handleRevalidateId}
                    className="flex items-center justify-center space-x-2 px-6 py-4 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>REVALIDATE ID</span>
                  </button>
                  
                  <button
                    onClick={handleResetPassword}
                    className="flex items-center justify-center space-x-2 px-6 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>RESET PASSWORD</span>
                  </button>
                  
                  <button
                    onClick={handleSendNotification}
                    className="flex items-center justify-center space-x-2 px-6 py-4 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    <span>SEND NOTIFICATION</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-500 text-sm">© 2025 e-Tax. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
  }

  // Individual Tax Payers (Inactive) Content
  const IndividualTaxPayersInactiveContent = () => {
  const [filters, setFilters] = useState({
    taxId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const [inactiveTaxpayers, setInactiveTaxpayers] = useState([
    {
      id: 'TEMP-VUU2T7QX7Q',
      fullName: 'Mrs. Abigail Davou Emmanuel',
      email: 'davouabigailb@gmail.com',
      phoneNumber: '08137626502',
      bvn: 'N/A',
      sector: '',
      address: '1 PINEWOOD COURT, LEKKI PH 1\nState: Lagos\nLGA: Eti Osa\nLCDA: Iru Victoria Island',
      isActivated: false
    },
    {
      id: 'TEMP-FHSMQCSSH1',
      fullName: 'Mr. Femi Muideen Balogun',
      email: 'muideen@outlook.com',
      phoneNumber: '02045678412',
      bvn: 'N/A',
      sector: '',
      address: 'AVIATION TANK FARM DEPOT ALONG MURITALA INTERNATIONAL AIRPORT WAY, NACHO BUSSTOP\nState: Lagos\nLGA: Ikeja\nLCDA: Ikeja',
      isActivated: false
    },
    {
      id: 'TEMP-X6BTILSUMD',
      fullName: 'Miss. Anerobi Ogochukwu',
      email: 'finance@finceptive.co',
      phoneNumber: '07032418150',
      bvn: 'N/A',
      sector: '',
      address: '4 VICTOR OKWODU STREET, BADORE\nState: Lagos\nLGA: Ibeju/Lekki\nLCDA: Ibeju',
      isActivated: false
    }
  ]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({
      taxId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    });
    showNotification('Filters cleared');
  };

  const handleFilter = () => {
    const hasFilters = Object.values(filters).some(value => value.trim() !== '');
    if (!hasFilters) {
      showNotification('Please enter at least one filter criteria');
      return;
    }
    showNotification('Filtering inactive taxpayers...');
  };

  const handleActivate = (taxpayerId: string) => {
    setInactiveTaxpayers(prev => 
      prev.map(taxpayer => 
        taxpayer.id === taxpayerId 
          ? { ...taxpayer, isActivated: true }
          : taxpayer
      )
    );
    showNotification(`Taxpayer ${taxpayerId} activated successfully`);
  };

  const handleAddInactiveTaxpayer = () => {
    setModalType('add-taxpayer');
    setShowModal(true);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#102e4a' }}>
          Individual Tax Payers(Unactivated)
        </h1>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
          <Users style={{ color: '#102e4a' }} size={20} />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded bg-green-500 flex items-center justify-center mr-4">
              <Users style={{ color: 'white' }} size={24} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: '#102e4a' }}>
              Individual Tax Payers (Unactivated)
            </h2>
          </div>
          <button 
            onClick={handleAddInactiveTaxpayer}
            className="w-12 h-12 bg-green-500 text-white rounded hover:bg-green-600 transition-all flex items-center justify-center text-xl font-bold"
            title="Add Inactive Taxpayer"
          >
            +
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="mb-4">
            <span className="text-sm font-medium" style={{ color: '#6c757d' }}>Filters:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <input type="text" placeholder="Tax ID" value={filters.taxId} onChange={(e) => handleFilterChange('taxId', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
            <input type="text" placeholder="First Name" value={filters.firstName} onChange={(e) => handleFilterChange('firstName', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
            <input type="text" placeholder="Middle Name" value={filters.middleName} onChange={(e) => handleFilterChange('middleName', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
            <input type="text" placeholder="Last Name" value={filters.lastName} onChange={(e) => handleFilterChange('lastName', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
            <input type="email" placeholder="Email" value={filters.email} onChange={(e) => handleFilterChange('email', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
            <input type="text" placeholder="Phone Number" value={filters.phoneNumber} onChange={(e) => handleFilterChange('phoneNumber', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
          </div>

          <div className="flex justify-end gap-4">
            <button onClick={handleReset} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium">
              RESET
            </button>
            <button 
              onClick={handleFilter}
              className="px-6 py-2 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              style={{ backgroundColor: '#102e4a' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a682ff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#102e4a'}
            >
              FILTER
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Tax Payer ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Full Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Phone Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>BVN</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Sector</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Address</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {inactiveTaxpayers.map((taxpayer) => (
                <tr key={taxpayer.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="text-blue-600 hover:underline cursor-pointer">{taxpayer.id}</span>
                  </td>
                  <td className="px-6 py-4" style={{ color: '#102e4a' }}>{taxpayer.fullName}</td>
                  <td className="px-6 py-4" style={{ color: '#6c757d' }}>{taxpayer.email}</td>
                  <td className="px-6 py-4" style={{ color: '#6c757d' }}>{taxpayer.phoneNumber}</td>
                  <td className="px-6 py-4" style={{ color: '#6c757d' }}>{taxpayer.bvn}</td>
                  <td className="px-6 py-4" style={{ color: '#6c757d' }}>{taxpayer.sector}</td>
                  <td className="px-6 py-4" style={{ color: '#6c757d' }}>
                    <div className="text-sm whitespace-pre-line max-w-xs">
                      {taxpayer.address}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {taxpayer.isActivated ? (
                      <span className="px-4 py-2 bg-gray-400 text-white rounded font-medium cursor-not-allowed">
                        ACTIVATED
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleActivate(taxpayer.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all font-medium"
                      >
                        ACTIVATE
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm" style={{ color: '#6c757d' }}>
            Showing 1 to 20 of 3411 entries
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">
              1
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-sm font-medium" style={{ color: '#6c757d' }}>
              2
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-sm font-medium" style={{ color: '#6c757d' }}>
              3
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-sm font-medium" style={{ color: '#6c757d' }}>
              4
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-sm font-medium" style={{ color: '#6c757d' }}>
              5
            </button>
            <button className="px-2 py-1 hover:bg-gray-100 rounded text-sm font-medium" style={{ color: '#6c757d' }}>
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm" style={{ color: '#6c757d' }}>© 2025 e-Tax. All Rights Reserved.</p>
      </div>
    </div>
  );
};

  const CorporateTaxPayersContent = () => {
  const [searchType, setSearchType] = useState('Company ID');
  const [searchValue, setSearchValue] = useState('');
  const [showProfileDetail, setShowProfileDetail] = useState(false);
  const [selectedTaxpayerId, setSelectedTaxpayerId] = useState('');
  const [filters, setFilters] = useState({
    companyId: '',
    tinNumber: '',
    companyName: '',
    registrationNumber: '',
    businessType: '',
    email: '',
    phoneNumber: '',
    cacNumber: ''
  });

  // <-- removed the unused setter (setCorporateTaxpayers) to avoid ts(6133)
  const [corporateTaxpayers] = useState([
    {
      id: 'C-7789123',
      tinNumber: '2098765432',
      companyName: 'NEXUS TECHNOLOGY SOLUTIONS LIMITED',
      email: 'info@nexustech.ng',
      phoneNumber: '08033445566',
      registrationNumber: 'RC-1234567',
      businessType: 'Information Technology'
    },
    {
      id: 'C-8890234',
      tinNumber: '2109876543',
      companyName: 'LAGOS MANUFACTURING COMPANY LTD',
      email: 'contact@lagosmanufacturing.com',
      phoneNumber: '08044556677',
      registrationNumber: 'RC-2345678',
      businessType: 'Manufacturing'
    }
  ]);

  const [showResults, setShowResults] = useState(false);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleAdvancedSearch = () => {
    setShowResults(true);
  };

  const handleFilter = () => {
    // Filter logic would go here (if you plan to mutate corporateTaxpayers you would use setCorporateTaxpayers)
    setShowResults(true);
  };

  const handleReset = () => {
    setFilters({
      companyId: '',
      tinNumber: '',
      companyName: '',
      registrationNumber: '',
      businessType: '',
      email: '',
      phoneNumber: '',
      cacNumber: ''
    });
    setSearchValue('');
    setShowResults(false);
  };

  const handleTaxIdClick = (taxpayerId: string) => {
    setSelectedTaxpayerId(taxpayerId);
    setShowProfileDetail(true);
  };

  const handleBackFromProfile = () => {
    setShowProfileDetail(false);
    setSelectedTaxpayerId('');
  };

  const handleAddCompany = () => {
    // setModalType('add-company'); setShowModal(true);
    // ensure setModalType and setShowModal are available in your scope
  };

  // If showing profile detail, render that component
  if (showProfileDetail) {
    return (
      <CorporateTaxPayerProfileDetailContent 
        taxpayerId={selectedTaxpayerId} 
        onBack={handleBackFromProfile} 
      />
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#102e4a' }}>Corporate Tax Payers</h1>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
          <Building2 style={{ color: '#102e4a' }} size={20} />
        </div>
      </div>

      {/* Advanced Search Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded flex items-center justify-center mr-3" style={{ backgroundColor: '#102e4a' }}>
            <Building2 style={{ color: 'white' }} size={16} />
          </div>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#102e4a' }}>Corporate Tax Payers</h2>
            <p className="text-sm" style={{ color: '#6c757d' }}>Advanced Search Type</p>
          </div>
        </div>

        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <select 
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ color: '#102e4a' }}
            >
              <option>Company ID</option>
              <option>TIN Number</option>
              <option>Company Name</option>
              <option>Registration Number</option>
              <option>Email</option>
            </select>
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Company ID"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ color: '#102e4a' }}
            />
          </div>
          <button 
            onClick={handleAdvancedSearch}
            className="px-6 py-3 text-white rounded-lg hover:shadow-lg transition-all font-medium"
            style={{ backgroundColor: '#102e4a' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a682ff')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#102e4a')}
          >
            ADVANCED SEARCH
          </button>
          <button 
            onClick={handleAddCompany}
            className="w-12 h-12 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center"
            style={{ backgroundColor: '#102e4a' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a682ff')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#102e4a')}
            title="Add New Company"
          >
            +
          </button>
        </div>
      </div>

      {/* Search Results Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold" style={{ color: '#102e4a' }}>Search Results (CBSRCM)</h3>
      </div>

      {/* Search Existing Companies */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#102e4a' }}>Search Existing Companies</h3>
        
        <div className="mb-4">
          <span className="text-sm font-medium" style={{ color: '#6c757d' }}>Filters:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Company ID"
            value={filters.companyId}
            onChange={(e) => handleFilterChange('companyId', e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ color: '#102e4a' }}
          />
          <input
            type="text"
            placeholder="TIN Number"
            value={filters.tinNumber}
            onChange={(e) => handleFilterChange('tinNumber', e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ color: '#102e4a' }}
          />
          <input
            type="text"
            placeholder="Company Name"
            value={filters.companyName}
            onChange={(e) => handleFilterChange('companyName', e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ color: '#102e4a' }}
          />
          <input
            type="text"
            placeholder="Registration Number"
            value={filters.registrationNumber}
            onChange={(e) => handleFilterChange('registrationNumber', e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ color: '#102e4a' }}
          />
          <input
            type="text"
            placeholder="Business Type"
            value={filters.businessType}
            onChange={(e) => handleFilterChange('businessType', e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ color: '#102e4a' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={filters.email}
            onChange={(e) => handleFilterChange('email', e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ color: '#102e4a' }}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={filters.phoneNumber}
            onChange={(e) => handleFilterChange('phoneNumber', e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ color: '#102e4a' }}
          />
          <input
            type="text"
            placeholder="CAC Number"
            value={filters.cacNumber}
            onChange={(e) => handleFilterChange('cacNumber', e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ color: '#102e4a' }}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button 
            onClick={handleReset}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium"
          >
            RESET
          </button>
          <button 
            onClick={handleFilter}
            className="px-6 py-2 text-white rounded-lg hover:shadow-lg transition-all font-medium"
            style={{ backgroundColor: '#102e4a' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a682ff')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#102e4a')}
          >
            FILTER
          </button>
        </div>
      </div>

      {/* Results Table */}
      {showResults ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#f8f9fa' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Company ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>TIN Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Company Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Phone Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Registration No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Business Type</th>
                </tr>
              </thead>
              <tbody>
                {(showResults ? corporateTaxpayers : []).map((company) => (
                  <tr key={company.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span 
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => handleTaxIdClick(company.id)}
                      >
                        {company.id}
                      </span>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#102e4a' }}>{company.tinNumber}</td>
                    <td className="px-6 py-4" style={{ color: '#102e4a' }}>{company.companyName}</td>
                    <td className="px-6 py-4" style={{ color: '#6c757d' }}>{company.email}</td>
                    <td className="px-6 py-4" style={{ color: '#6c757d' }}>{company.phoneNumber}</td>
                    <td className="px-6 py-4" style={{ color: '#6c757d' }}>{company.registrationNumber}</td>
                    <td className="px-6 py-4" style={{ color: '#6c757d' }}>{company.businessType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm" style={{ color: '#6c757d' }}>
              Showing 1 to {corporateTaxpayers.length} of {corporateTaxpayers.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-medium"
                style={{ backgroundColor: '#102e4a' }}
              >
                1
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p style={{ color: '#6c757d' }}>There are currently no entries to display at the moment.</p>
          <div className="mt-4 text-sm" style={{ color: '#6c757d' }}>
            Showing 1 to 0 of 0 entries
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm" style={{ color: '#6c757d' }}>© 2025 e-Tax. All Rights Reserved.</p>
      </div>
    </div>
  );
};




  type Taxpayer = {
  id: string;
  tinNumber?: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  idNumber?: string;
  idType?: string;
  };

// ORIGINAL / UNFILTERED DATA (used as source-of-truth for filtering & reset)
const initialTaxpayersData: Taxpayer[] = [
  {
    id: 'N-4401681',
    tinNumber: '1061131973',
    fullName: 'Mr. Moshood Olalekan Bello',
    email: 'belloalalekan@gmail.com',
    phoneNumber: '08023129633',
    idNumber: '222*******9',
    idType: 'BVN'
  }
  // add more seed data here if needed
];

const IndividualTaxPayersContent: React.FC = () => {
  const [searchType, setSearchType] = useState('Taxpayer ID');
  const [searchValue, setSearchValue] = useState('');
  const [showProfileDetail, setShowProfileDetail] = useState(false);
  const [selectedTaxpayerId, setSelectedTaxpayerId] = useState('');
  const [filters, setFilters] = useState({
    taxId: '',
    tinNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    idNumber: ''
  });

  // This state will hold the currently displayed (possibly filtered) list
  const [taxpayers, setTaxpayers] = useState<Taxpayer[]>(initialTaxpayersData);
  const [showResults, setShowResults] = useState(false);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleAdvancedSearch = () => {
    handleFilter(); // reuse the same filter logic
  };

  const handleFilter = () => {
    const search = searchValue.trim().toLowerCase();

    const filtered = initialTaxpayersData.filter(tp => {
      // 1) If searchValue exists, it must match searchType
      if (search) {
        let matchesSearchType = false;
        switch (searchType) {
          case 'Taxpayer ID':
            matchesSearchType = tp.id.toLowerCase().includes(search);
            break;
          case 'TIN Number':
            matchesSearchType = (tp.tinNumber ?? '').toLowerCase().includes(search);
            break;
          case 'Full Name':
            matchesSearchType = tp.fullName.toLowerCase().includes(search);
            break;
          case 'Email':
            matchesSearchType = (tp.email ?? '').toLowerCase().includes(search);
            break;
          default:
            matchesSearchType = false;
        }
        if (!matchesSearchType) return false;
      }

      // 2) Apply each non-empty filter field (AND behavior)
      if (filters.taxId && !tp.id.toLowerCase().includes(filters.taxId.trim().toLowerCase())) return false;
      if (filters.tinNumber && !((tp.tinNumber ?? '').toLowerCase().includes(filters.tinNumber.trim().toLowerCase()))) return false;
      if (filters.firstName && !tp.fullName.toLowerCase().includes(filters.firstName.trim().toLowerCase())) return false;
      if (filters.middleName && !tp.fullName.toLowerCase().includes(filters.middleName.trim().toLowerCase())) return false;
      if (filters.lastName && !tp.fullName.toLowerCase().includes(filters.lastName.trim().toLowerCase())) return false;
      if (filters.email && !((tp.email ?? '').toLowerCase().includes(filters.email.trim().toLowerCase()))) return false;
      if (filters.phoneNumber && !((tp.phoneNumber ?? '').toLowerCase().includes(filters.phoneNumber.trim().toLowerCase()))) return false;
      if (filters.idNumber && !((tp.idNumber ?? '').toLowerCase().includes(filters.idNumber.trim().toLowerCase()))) return false;

      return true;
    });

    setTaxpayers(filtered); // now setTaxpayers is used (no ts(6133) warning)
    setShowResults(true);
  };

  const handleReset = () => {
    setFilters({
      taxId: '',
      tinNumber: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      idNumber: ''
    });
    setSearchValue('');
    setTaxpayers(initialTaxpayersData); // restore original list
    setShowResults(false);
  };

  const handleTaxIdClick = (taxpayerId: string) => {
    setSelectedTaxpayerId(taxpayerId);
    setShowProfileDetail(true);
  };

  const handleBackFromProfile = () => {
    setShowProfileDetail(false);
    setSelectedTaxpayerId('');
  };

  if (showProfileDetail) {
    return (
      // Ensure TaxPayerProfileDetailContent is imported in your file
      <TaxPayerProfileDetailContent taxpayerId={selectedTaxpayerId} onBack={handleBackFromProfile} />
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#102e4a' }}>Individual Tax Payers</h1>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
          {/* <Users style={{ color: '#102e4a' }} size={20} /> */}
        </div>
      </div>

      {/* Advanced Search Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded flex items-center justify-center mr-3" style={{ backgroundColor: '#102e4a' }}>
            {/* <Users style={{ color: 'white' }} size={16} /> */}
          </div>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#102e4a' }}>Individual Tax Payers</h2>
            <p className="text-sm" style={{ color: '#6c757d' }}>Advanced Search Type</p>
          </div>
        </div>

        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ color: '#102e4a' }}
            >
              <option>Taxpayer ID</option>
              <option>TIN Number</option>
              <option>Full Name</option>
              <option>Email</option>
            </select>
          </div>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Taxpayer ID"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ color: '#102e4a' }}
            />
          </div>

          <button
            onClick={handleAdvancedSearch}
            className="px-6 py-3 text-white rounded-lg hover:shadow-lg transition-all font-medium"
            style={{ backgroundColor: '#102e4a' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a682ff')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#102e4a')}
          >
            ADVANCED SEARCH
          </button>

          <button
            className="w-12 h-12 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center"
            style={{ backgroundColor: '#102e4a' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a682ff')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#102e4a')}
          >
            +
          </button>
        </div>
      </div>

      {/* Search Results Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold" style={{ color: '#102e4a' }}>Search Results (EBSRCM)</h3>
      </div>

      {/* Filters card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#102e4a' }}>Search Existing users</h3>

        <div className="mb-4">
          <span className="text-sm font-medium" style={{ color: '#6c757d' }}>Filters:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input type="text" placeholder="Tax ID" value={filters.taxId} onChange={(e) => handleFilterChange('taxId', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
          <input type="text" placeholder="TIN Number" value={filters.tinNumber} onChange={(e) => handleFilterChange('tinNumber', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
          <input type="text" placeholder="First Name" value={filters.firstName} onChange={(e) => handleFilterChange('firstName', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
          <input type="text" placeholder="Middle Name" value={filters.middleName} onChange={(e) => handleFilterChange('middleName', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
          <input type="text" placeholder="Last Name" value={filters.lastName} onChange={(e) => handleFilterChange('lastName', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
          <input type="email" placeholder="Email" value={filters.email} onChange={(e) => handleFilterChange('email', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
          <input type="text" placeholder="Phone Number" value={filters.phoneNumber} onChange={(e) => handleFilterChange('phoneNumber', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
          <input type="text" placeholder="ID Number" value={filters.idNumber} onChange={(e) => handleFilterChange('idNumber', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ color: '#102e4a' }} />
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={handleReset} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium">RESET</button>
          <button onClick={handleFilter} className="px-6 py-2 text-white rounded-lg hover:shadow-lg transition-all font-medium" style={{ backgroundColor: '#102e4a' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a682ff')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#102e4a')}>FILTER</button>
        </div>
      </div>

      {/* Results Table */}
      {showResults ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#f8f9fa' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Tax Payer ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>TIN Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Full Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>Phone Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>ID Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#102e4a' }}>ID Type</th>
                </tr>
              </thead>
              <tbody>
                {taxpayers.map((taxpayer) => (
                  <tr key={taxpayer.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => handleTaxIdClick(taxpayer.id)}>{taxpayer.id}</span>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#102e4a' }}>{taxpayer.tinNumber}</td>
                    <td className="px-6 py-4" style={{ color: '#102e4a' }}>{taxpayer.fullName}</td>
                    <td className="px-6 py-4" style={{ color: '#6c757d' }}>{taxpayer.email}</td>
                    <td className="px-6 py-4" style={{ color: '#6c757d' }}>{taxpayer.phoneNumber}</td>
                    <td className="px-6 py-4" style={{ color: '#6c757d' }}>{taxpayer.idNumber}</td>
                    <td className="px-6 py-4" style={{ color: '#6c757d' }}>{taxpayer.idType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm" style={{ color: '#6c757d' }}>Showing 1 to {taxpayers.length} of {taxpayers.length} entries</div>
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-medium" style={{ backgroundColor: '#102e4a' }}>1</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p style={{ color: '#6c757d' }}>There are currently no entries to display at the moment.</p>
          <div className="mt-4 text-sm" style={{ color: '#6c757d' }}>Showing 1 to 0 of 0 entries</div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm" style={{ color: '#6c757d' }}>© 2025 e-Tax. All Rights Reserved.</p>
      </div>
    </div>
  );
  };



  // Tax Payer Verification Content
  const TaxPayerVerificationContent = () => {
    const [taxIdSearchEnabled, setTaxIdSearchEnabled] = useState(true);
    const [taxId, setTaxId] = useState('');
    const [verificationResult, setVerificationResult] = useState({
      taxId: '',
      name: 'N/A',
      lastPayment: ''
    });
    const [hasSearched, setHasSearched] = useState(false);

    // Use showNotification from the parent scope
    const handleSearch = () => {
      if (!taxId.trim()) {
        Notification({ message: 'Please enter a Tax ID to search' });
        return;
      }

      // Simulate verification search
      const mockResults = [
        {
          taxId: 'N-4401681',
          name: 'Mr. Moshood Olalekan Bello',
          lastPayment: '₦15,000 - Jan 2025'
        },
        {
          taxId: 'C-7789123',
          name: 'NEXUS TECHNOLOGY SOLUTIONS LIMITED',
          lastPayment: '₦250,000 - Dec 2024'
        },
        {
          taxId: 'N-4401682',
          name: 'Mrs. Sarah Ahmed Johnson',
          lastPayment: '₦8,500 - Feb 2025'
        }
      ];

      const result = mockResults.find(r => 
        r.taxId.toLowerCase().includes(taxId.toLowerCase()) ||
        taxId.toLowerCase().includes(r.taxId.toLowerCase())
      );

      if (result) {
        setVerificationResult(result);
        Notification({ message: 'Taxpayer found and verified' });
      } else {
        setVerificationResult({
          taxId: taxId,
          name: 'N/A',
          lastPayment: 'No payment records found'
        });
         Notification({ message: 'Taxpayer not found in records' });
      }

      setHasSearched(true);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg">
          {/* Main Verification Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            {/* Header */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded bg-green-500 flex items-center justify-center mr-4">
                <UserCheck style={{ color: 'white' }} size={32} />
              </div>
              <h2 className="text-2xl font-semibold" style={{ color: '#102e4a' }}>
                Tax Payer Verification
              </h2>
            </div>

            {/* Tax ID Search Toggle */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setTaxIdSearchEnabled(!taxIdSearchEnabled)}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                    taxIdSearchEnabled ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      taxIdSearchEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-lg font-medium" style={{ color: '#6c757d' }}>
                  Tax Id Search
                </span>
              </div>
            </div>

            {/* Search Form */}
            {taxIdSearchEnabled && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: '#102e4a' }}>
                  Tax ID *
                </label>
                <input
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter Tax ID (e.g., N-4401681 or C-7789123)"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  style={{ color: '#102e4a' }}
                  required
                />
                
                <div className="flex justify-center mt-6">
                  <button 
                    onClick={handleSearch}
                    className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium text-lg"
                  >
                    SEARCH
                  </button>
                </div>
              </div>
            )}

            {!taxIdSearchEnabled && (
              <div className="text-center py-8">
                <p style={{ color: '#6c757d' }}>Enable Tax ID Search to verify taxpayers</p>
              </div>
            )}
          </div>

          {/* Results Card */}
          {taxIdSearchEnabled && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium" style={{ color: '#102e4a' }}>Tax ID:</span>
                  <span className="text-lg" style={{ color: '#6c757d' }}>
                    {verificationResult.taxId || ''}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium" style={{ color: '#102e4a' }}>Name:</span>
                  <span className="text-lg" style={{ color: '#6c757d' }}>
                    {verificationResult.name}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium" style={{ color: '#102e4a' }}>Last Payment:</span>
                  <span className="text-lg" style={{ color: '#6c757d' }}>
                    {verificationResult.lastPayment || ''}
                  </span>
                </div>

                {hasSearched && verificationResult.name !== 'N/A' && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={20} className="text-green-500" />
                      <span className="text-green-700 font-medium">Taxpayer Verified Successfully</span>
                    </div>
                  </div>
                )}

                {hasSearched && verificationResult.name === 'N/A' && (
                  <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-2">
                      <X size={20} className="text-red-500" />
                      <span className="text-red-700 font-medium">Taxpayer Not Found</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
const BulkIndividualRegistrationContent = () => {
  const [filters, setFilters] = useState({
    label: '',
    reference: ''
  });

  const [registrationTasks, setRegistrationTasks] = useState<any[]>([]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({
      label: '',
      reference: ''
    });
    setRegistrationTasks([]);

    Notification({ message: 'Filters cleared' });
  };

  const handleDownloadTemplate = (templateType: string) => {
    const csvContent = templateType === 'BVN'
      ? 'First Name,Last Name,Email,Phone,BVN,Address\nJohn,Doe,john@email.com,08012345678,12345678901,Lagos'
      : 'First Name,Last Name,Email,Phone,NIN,Address\nJane,Smith,jane@email.com,08087654321,12345678901,Abuja';

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateType}_Registration_Template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    Notification({ message: `${templateType} template downloaded successfully` });
  };

  const handleUploadCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        Notification({ message: `CSV file "${file.name}" uploaded successfully` });
        // Here you would typically process the file
      }
    };
    input.click();
  };

  const handleFilter = () => {
    const hasFilters = Object.values(filters).some(value => value.trim() !== '');

    if (!hasFilters) {
      Notification({ message: 'Please enter at least one filter criteria' });
      return;
    }

    // Simulate filtering results
    Notification({ message: 'Filtering registration tasks...' });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#102e4a' }}>Bulk Individual Registrations</h1>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
          <Users style={{ color: '#102e4a' }} size={20} />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded bg-green-500 flex items-center justify-center mr-4">
            <Users style={{ color: 'white' }} size={32} />
          </div>
          <h2 className="text-xl font-semibold" style={{ color: '#102e4a' }}>
            Bulk Individual Tasks Report
          </h2>
        </div>

        {/* Template Download Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => handleDownloadTemplate('BVN')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium flex items-center space-x-2"
          >
            <span>BVN BULK REGISTRATION TEMPLATE</span>
            <Download size={16} />
          </button>
          <button
            onClick={() => handleDownloadTemplate('NIN')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium flex items-center space-x-2"
          >
            <span>NIN BULK REGISTRATION TEMPLATE</span>
            <Download size={16} />
          </button>
          <button
            onClick={handleUploadCSV}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium flex items-center space-x-2"
          >
            <span>UPLOAD CSV</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
          </button>
        </div>

        {/* Note */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm" style={{ color: '#102e4a' }}>
            Kindly ensure to upload the updated template in CSV format
          </p>
        </div>
      </div>

      {/* Registrations Tasks Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: '#102e4a' }}>Registrations Tasks</h3>

        {/* Filters */}
        <div className="mb-6">
          <div className="mb-4">
            <span className="text-sm font-medium" style={{ color: '#6c757d' }}>Filters:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Label"
              value={filters.label}
              onChange={(e) => handleFilterChange('label', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ color: '#102e4a' }}
            />
            <input
              type="text"
              placeholder="Reference"
              value={filters.reference}
              onChange={(e) => handleFilterChange('reference', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ color: '#102e4a' }}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium"
            >
              RESET
            </button>
            <button
              onClick={handleFilter}
              className="px-6 py-2 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              style={{ backgroundColor: '#102e4a' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a682ff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#102e4a'}
            >
              FILTER
            </button>
          </div>
        </div>

        {/* Show tasks count */}
        <div className="mb-6" style={{ color: '#102e4a' }}>
          <p>{registrationTasks.length} registration task{registrationTasks.length !== 1 ? 's' : ''} loaded.</p>
        </div>

        {/* No Data Message */}
        {registrationTasks.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: '#6c757d' }}>There are currently no entries to display at the moment.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm" style={{ color: '#6c757d' }}>© 2025 e-Tax. All Rights Reserved.</p>
      </div>
    </div>
  );
};

  const MergeRequestsInterface = () => {
  const [taxId, setTaxId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('');
  const [officer, setOfficer] = useState('Search Officer');

  const handleMakeNewRequest = () => {
    alert('Creating new merge request...');
  };

  const handleFilter = () => {
    alert('Applying filters...');
  };

  const handleReset = () => {
    setTaxId('');
    setFromDate('');
    setToDate('');
    setStatus('');
    setOfficer('Search Officer');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Merge Requests</h1>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Stats Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-orange-500 rounded-lg flex items-center justify-center">
                <div className="text-white">
                  <div className="w-8 h-1 bg-white mb-1"></div>
                  <div className="w-6 h-1 bg-white mb-1"></div>
                  <div className="w-8 h-1 bg-white"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">All Requests</div>
                  <div className="text-4xl font-bold text-gray-800">0</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Card */}
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Merge Requests</h2>
                  </div>
                </div>
                <button
                  onClick={handleMakeNewRequest}
                  className="px-6 py-3 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  MAKE NEW REQUEST
                </button>
              </div>
            </div>

            {/* Filters Section */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                {/* Tax ID Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filters: Tax ID
                  </label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="Tax ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* From Date */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    From
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* To Date */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    To
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Status Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                    >
                      <option value="">Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
                  >
                    RESET
                  </button>
                  <button
                    onClick={handleFilter}
                    className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    FILTER
                  </button>
                </div>
              </div>

              {/* Officer Search */}
              <div className="mt-4">
                <div className="relative max-w-xs">
                  <select
                    value={officer}
                    onChange={(e) => setOfficer(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white text-gray-600"
                  >
                    <option value="Search Officer">Search Officer</option>
                    <option value="officer1">Officer Smith</option>
                    <option value="officer2">Officer Johnson</option>
                    <option value="officer3">Officer Williams</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8">
              <div className="text-center py-16">
                <div className="text-gray-500 text-lg">
                  There are currently no requests.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">© 2025 e-Tax. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};


 interface DirectorData {
  taxId: string;
  corporateId: string;
  companyName: string;
  state: string;
  lga: string;
  lcda: string;
  startDate: string;
  endDate: string;
}

const DirectorsReport: React.FC = () => {
  const [filteredDirectors, setFilteredDirectors] = useState<DirectorData[]>([]);
  const [filters, setFilters] = useState({
    state: '',
    lga: '',
    lcda: '',
    startDate: '',
    endDate: '',
    perPage: 20
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for dropdowns and mock data
  const states = ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Ogun'];
  const lgas = ['Ikorodu', 'Ikeja', 'Lagos Island', 'Lagos Mainland', 'Surulere'];
  const lcdas = ['Ikorodu North', 'Ikorodu South', 'Ikorodu West', 'Ikorodu Central'];

  // Mock director data
  const mockDirectors: DirectorData[] = [
    {
      taxId: 'TX001234567',
      corporateId: 'RC123456',
      companyName: 'ABC Limited',
      state: 'Lagos',
      lga: 'Ikorodu',
      lcda: 'Ikorodu North',
      startDate: '2023-01-15',
      endDate: '2025-12-31'
    },
    {
      taxId: 'TX001234568',
      corporateId: 'RC123457',
      companyName: 'XYZ Nigeria Ltd',
      state: 'Lagos',
      lga: 'Ikeja',
      lcda: 'Ikorodu South',
      startDate: '2022-03-20',
      endDate: '2024-12-31'
    },
    {
      taxId: 'TX001234569',
      corporateId: 'RC123458',
      companyName: 'Global Tech Solutions',
      state: 'Abuja',
      lga: 'Lagos Island',
      lcda: 'Ikorodu West',
      startDate: '2023-06-10',
      endDate: '2026-12-31'
    },
    {
      taxId: 'TX001234570',
      corporateId: 'RC123459',
      companyName: 'Prime Industries',
      state: 'Lagos',
      lga: 'Ikorodu',
      lcda: 'Ikorodu Central',
      startDate: '2021-09-05',
      endDate: '2024-12-31'
    },
    {
      taxId: 'TX001234571',
      corporateId: 'RC123460',
      companyName: 'Stellar Enterprises',
      state: 'Rivers',
      lga: 'Surulere',
      lcda: 'Ikorodu North',
      startDate: '2022-11-12',
      endDate: '2025-12-31'
    }
  ];

  const handleFilterChange = (field: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFilter = () => {
    setIsLoading(true);

    setTimeout(() => {
      let filtered = [...mockDirectors];

      if (filters.state) {
        filtered = filtered.filter(director => director.state === filters.state);
      }
      if (filters.lga) {
        filtered = filtered.filter(director => director.lga === filters.lga);
      }
      if (filters.lcda) {
        filtered = filtered.filter(director => director.lcda === filters.lcda);
      }
      if (filters.startDate) {
        filtered = filtered.filter(director => new Date(director.startDate) >= new Date(filters.startDate));
      }
      if (filters.endDate) {
        filtered = filtered.filter(director => new Date(director.endDate) <= new Date(filters.endDate));
      }

      setFilteredDirectors(filtered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setFilters({
      state: '',
      lga: '',
      lcda: '',
      startDate: '',
      endDate: '',
      perPage: 20
    });
    setFilteredDirectors([]);
    setCurrentPage(1);
  };

  const handleLoadSampleData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setFilteredDirectors(mockDirectors);
      setCurrentPage(1);
      setIsLoading(false);
    }, 800);
  };

  const handleExport = () => {
    if (filteredDirectors.length === 0) {
      alert('No data to export. Please filter data first.');
      return;
    }

    // Create CSV content
    const headers = ['Tax ID', 'Corporate ID', 'Company Name', 'State', 'LGA', 'LCDA', 'Start Date', 'End Date'];
    const csvContent = [
      headers.join(','),
      ...filteredDirectors.map(director => [
        director.taxId,
        director.corporateId,
        director.companyName,
        director.state,
        director.lga,
        director.lcda,
        director.startDate,
        director.endDate
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `directors_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredDirectors.length / filters.perPage);
  const startIndex = (currentPage - 1) * filters.perPage;
  const endIndex = startIndex + filters.perPage;
  const currentDirectors = filteredDirectors.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b" style={{ backgroundColor: 'rgb(16,46,74)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-medium text-white">Directors Report</h1>
          <div className="flex space-x-3">
            <button
              onClick={handleLoadSampleData}
              disabled={isLoading}
              className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>{isLoading ? 'Loading...' : 'Load Sample Data'}</span>
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgb(16,46,74)' }}>
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Directors</p>
                <p className="text-3xl font-bold" style={{ color: 'rgb(16,46,74)' }}>{filteredDirectors.length}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Filtered Results</p>
              <p className="text-xl font-semibold text-gray-700">{currentDirectors.length} of {filteredDirectors.length}</p>
            </div>
          </div>
        </div>

        {/* Directors Report Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgb(16,46,74)' }}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-medium text-gray-800">Directors Report</h2>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                style={{
                  backgroundColor: showFilters ? 'rgb(16,46,74)' : 'transparent',
                  color: showFilters ? 'white' : 'rgb(16,46,74)',
                  border: '1px solid rgb(16,46,74)'
                }}
              >
                <Filter className="w-4 h-4" />
                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Controls Row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Per page</span>
                  <select
                    value={filters.perPage}
                    onChange={(e) => handleFilterChange('perPage', parseInt(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">IKORODU TAX OFFICE</span>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Table Headers */}
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="text-sm font-medium text-gray-600">Tax ID</div>
              <div className="text-sm font-medium text-gray-600">Corporate Id</div>
              <div className="text-sm font-medium text-gray-600">Company Name</div>
              <div className="text-sm font-medium text-gray-600">State</div>
              <div className="text-sm font-medium text-gray-600">LGA</div>
            </div>

            {/* Filter Section */}
            {showFilters && (
              <div className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <select
                    value={filters.state}
                    onChange={(e) => handleFilterChange('state', e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>

                  <select
                    value={filters.lga}
                    onChange={(e) => handleFilterChange('lga', e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select LGA</option>
                    {lgas.map(lga => (
                      <option key={lga} value={lga}>{lga}</option>
                    ))}
                  </select>

                  <select
                    value={filters.lcda}
                    onChange={(e) => handleFilterChange('lcda', e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select LCDA</option>
                    {lcdas.map(lcda => (
                      <option key={lcda} value={lcda}>{lcda}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => handleFilterChange('startDate', e.target.value)}
                      placeholder="Start Date"
                      className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => handleFilterChange('endDate', e.target.value)}
                      placeholder="End Date"
                      className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleReset}
                    disabled={isLoading}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>RESET</span>
                  </button>
                  <button
                    onClick={handleFilter}
                    disabled={isLoading}
                    className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2 disabled:opacity-50"
                    style={{ backgroundColor: 'rgb(16,46,74)' }}
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Filter className="w-4 h-4" />}
                    <span>{isLoading ? 'FILTERING...' : 'FILTER'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Data Table or Empty State */}
            {filteredDirectors.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                </div>
                <p className="text-gray-500 text-lg mb-2">No directors data found</p>
                <p className="text-gray-400 text-sm">
                  Click "Load Sample Data" to see example data or use the filters to search for directors
                </p>
                <p className="text-gray-400 text-sm mt-4">
                  Showing 0 to 0 of 0 entries
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Enhanced Table Headers */}
                <div className="grid grid-cols-5 gap-4 py-3 px-4 rounded-lg" style={{ backgroundColor: 'rgba(16,46,74,0.1)' }}>
                  <div className="text-sm font-semibold" style={{ color: 'rgb(16,46,74)' }}>Tax ID</div>
                  <div className="text-sm font-semibold" style={{ color: 'rgb(16,46,74)' }}>Corporate Id</div>
                  <div className="text-sm font-semibold" style={{ color: 'rgb(16,46,74)' }}>Company Name</div>
                  <div className="text-sm font-semibold" style={{ color: 'rgb(16,46,74)' }}>State</div>
                  <div className="text-sm font-semibold" style={{ color: 'rgb(16,46,74)' }}>LGA</div>
                </div>

                {/* Data Rows */}
                {currentDirectors.map((director, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 py-3 px-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                    <div className="text-sm text-gray-900 font-medium">{director.taxId}</div>
                    <div className="text-sm text-gray-700">{director.corporateId}</div>
                    <div className="text-sm text-gray-700">{director.companyName}</div>
                    <div className="text-sm text-gray-700">{director.state}</div>
                    <div className="text-sm text-gray-700">{director.lga}</div>
                  </div>
                ))}

                {/* Pagination */}
                <div className="flex justify-end mt-6 space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

  // Modal Component
  const Modal = ({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: string }) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      Notification({message: `${type.replace('-', ' ')} action completed successfully`});

      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold" style={{ color: '#102e4a' }}>
              {type === 'add-taxpayer' && 'Add New Taxpayer'}
              {type === 'add-child' && 'Add Child'}
              {type === 'add-spouse' && 'Add Spouse'}
              {type === 'add-company' && 'Add New Company'}
            </h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {type === 'add-taxpayer' && (
              <>
                <input className="w-full p-3 border rounded mb-3" placeholder="Full Name" required />
                <input className="w-full p-3 border rounded mb-3" placeholder="Email" type="email" required />
                <input className="w-full p-3 border rounded mb-3" placeholder="Phone Number" required />
                <input className="w-full p-3 border rounded mb-3" placeholder="TIN Number" required />
              </>
            )}
            
            {type === 'add-child' && (
              <>
                <input className="w-full p-3 border rounded mb-3" placeholder="Child's Name" required />
                <input className="w-full p-3 border rounded mb-3" placeholder="Date of Birth" type="date" required />
                <select className="w-full p-3 border rounded mb-3" required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </>
            )}
            
            {type === 'add-spouse' && (
              <>
                <input className="w-full p-3 border rounded mb-3" placeholder="Spouse's Name" required />
                <input className="w-full p-3 border rounded mb-3" placeholder="TIN Number" />
                <input className="w-full p-3 border rounded mb-3" placeholder="Phone Number" required />
              </>
            )}

            {type === 'add-company' && (
              <>
                <input className="w-full p-3 border rounded mb-3" placeholder="Company Name" required />
                <input className="w-full p-3 border rounded mb-3" placeholder="Registration Number" required />
                <input className="w-full p-3 border rounded mb-3" placeholder="Email" type="email" required />
                <input className="w-full p-3 border rounded mb-3" placeholder="Phone Number" required />
              </>
            )}
            
            <div className="flex gap-3 mt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Notification Component
  const Notification = ({ message }: { message: string }) => {
    if (!message) return null;

    return (
      <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
        <div className="flex items-center space-x-2">
          <CheckCircle size={20} />
          <span>{message}</span>
        </div>
      </div>
    );
  };

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

  const GenerateNewBillInterface = () => {
  const [taxPayerNumber, setTaxPayerNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!taxPayerNumber.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Bill generation process started...');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Generate A New Bill</h1>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            {/* Card Header */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Generate A New Bill</h2>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  value={taxPayerNumber}
                  onChange={(e) => setTaxPayerNumber(e.target.value)}
                  placeholder="Tax Payer Number"
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-green-500 outline-none transition-colors bg-transparent text-gray-700 placeholder-gray-400"
                />
              </div>
              
              <div className="flex justify-end pt-6">
                <button
                  onClick={handleContinue}
                  disabled={!taxPayerNumber.trim() || isLoading}
                  className="px-8 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 min-w-[120px] justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>CONTINUE</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Support Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg hover:bg-cyan-600 transition-colors">
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Footer */}
      <div className="pb-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-500 text-sm">© 2025 e-Tax. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
  };

  const LASPPPARequestsInterface = () => {
  const [taxPayerId, setTaxPayerId] = useState('');
  const [status, setStatus] = useState('');
  const [year, setYear] = useState('');
  const [selectLevel, setSelectLevel] = useState('Select Level');
  const [applicationType, setApplicationType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCreateNewRequest = () => {
    alert('Creating new LASPPPA request...');
  };

  const handleFilter = () => {
    alert('Applying filters...');
  };

  const handleClear = () => {
    setTaxPayerId('');
    setStatus('');
    setYear('');
    setSelectLevel('Select Level');
    setApplicationType('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-800">LASPPPA Requests</h1>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Stats Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-orange-500 rounded-lg flex items-center justify-center">
                  <div className="text-white">
                    <div className="w-8 h-1 bg-white mb-1"></div>
                    <div className="w-6 h-1 bg-white mb-1"></div>
                    <div className="w-8 h-1 bg-white"></div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Total Count</div>
                <div className="text-4xl font-bold text-gray-800">0</div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Card */}
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">LASPPPA Requests</h2>
                  </div>
                </div>
                <button
                  onClick={handleCreateNewRequest}
                  className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  CREATE NEW REQUEST
                </button>
              </div>
            </div>

            {/* Filters Section */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Tax Payer ID Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filters: Tax Payer ID
                  </label>
                  <input
                    type="text"
                    value={taxPayerId}
                    onChange={(e) => setTaxPayerId(e.target.value)}
                    placeholder="Tax Payer ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Status Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                    >
                      <option value="">Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Year Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <div className="relative">
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                    >
                      <option value="">Year</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Select Level Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level
                  </label>
                  <div className="relative">
                    <select
                      value={selectLevel}
                      onChange={(e) => setSelectLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                    >
                      <option value="Select Level">Select Level</option>
                      <option value="level1">Level 1</option>
                      <option value="level2">Level 2</option>
                      <option value="level3">Level 3</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                {/* Start Date */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Application Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Type
                  </label>
                  <div className="relative">
                    <select
                      value={applicationType}
                      onChange={(e) => setApplicationType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                    >
                      <option value="">Application Type</option>
                      <option value="new">New Application</option>
                      <option value="renewal">Renewal</option>
                      <option value="modification">Modification</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={handleClear}
                  className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
                >
                  CLEAR
                </button>
                <button
                  onClick={handleFilter}
                  className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                >
                  FILTER
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600">
                  Showing 1 to 0 of 0 entries
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Support Button */}
      <div className="fixed bottom-6 right-6">
        <div className="relative">
          <button className="w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg hover:bg-cyan-600 transition-colors">
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">1</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">© 2025 e-Tax. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};


  // Main content renderer
  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <DashboardContent />;
      case 'etax-statistics':
        return <ETaxStatisticsContent />;
      case 'individual-payers':
        return <IndividualTaxPayersContent />;
      case 'corporate-payers':
        return <CorporateTaxPayersContent />;
      case 'individual-inactive':
        return <IndividualTaxPayersInactiveContent />;
      case 'bulk-registration':
        return <BulkIndividualRegistrationContent />;
      case 'tax-verification':
        return <TaxPayerVerificationContent />;
      case 'payments':
        return <GenerateNewBillInterface />;
      case 'tax-services':
        return <TaxServicesInterface/>;
      case 'tax-offices':
        return <GenericContent title="Tax Offices" description="Manage tax office locations and staff assignments" icon={Building2} />;
      case 'merge-requests':
        return <MergeRequestsInterface/>;
      case 'tama-registration':
        return <GenericContent title="TAMA Registration" description="Tax Agent and Multiplier Agent registration system" icon={Shield} />;
      case 'rmu-revenue':
        return <GenericContent title="RMU Revenue" description="Revenue Mobilization Unit tracking and reports" icon={TrendingUp} />;
      case 'laspppa':
        return <LASPPPARequestsInterface />;
      case 'directors':
        return <DirectorsReport/>;
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

      {/* Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        type={modalType} 
      />

      {/* Notification */}
      <Notification message={notification} />

      {/* CSS for animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default ETaxAdminDashboard;