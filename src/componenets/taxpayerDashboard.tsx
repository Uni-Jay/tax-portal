import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  CreditCard, 
  Bell, 
  Menu, 
  X, 
  AlertCircle, 
  CheckCircle, 
  Receipt,
  History,
  MessageSquare,
  Settings,
  Home,
  BarChart3,
  LogOut,
  ChevronDown,
  Upload,
  Users,
  Eye,
  Edit,
  Send,
  Inbox,
  Plus,
  Save,
  Trash2,
  Download,
  Calendar,
  Clock,
  Filter,
  Search,
  TrendingUp,
  DollarSign,
  ChevronRight,
  AlertTriangle,
  Info
} from 'lucide-react';

interface QuickAccessItem {
    id: string;
    label: string;
    icon: React.ElementType;
    color: string;
}

interface SummaryData {
    title: string;
    value: string;
    status: 'warning' | 'success' | 'info' | 'error';
    count: number;
}

interface Assessment {
  id: string;
  type: string;
  taxYear: string;
  amount: number;
  status: 'pending' | 'approved' | 'disputed' | 'overdue';
  dueDate: string;
  issueDate: string;
  description: string;
  reference: string;
}

interface ObjectionForm {
  assessmentId: string;
  reason: string;
  supportingEvidence: string;
  requestedAmount: number;
  additionalComments: string;
}

interface SidebarProps {
  sidebarOpen: boolean;
  activeSection: string;
  activeSubsection: string | null;
  onSectionClick: (sectionId: string) => void;
  onSubsectionClick: (subsectionId: string) => void;
}

interface MainContentProps {
  activeSection: string;
  activeSubsection: string | null;
  onQuickAccess: (actionId: string) => void;
  onSubsectionClick: (subsectionId: string) => void;
  userProfile: any;
  notifications: any[];
  quickAccessItems: QuickAccessItem[];
  summaryData: SummaryData[];
  unreadNotifications: number[];
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  openMessage: (message: any) => void;
  viewPaymentHistory: () => void;
  downloadReceipt: (paymentRef?: string) => void;
  viewAssessment: () => void;
  makePayment: () => void;
  fileReturns: () => void;
}

// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ 
  sidebarOpen, 
  activeSection, 
  activeSubsection, 
  onSectionClick, 
  onSubsectionClick 
}) => {
  const sidebarSections = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      subsections: [],
      path: '/taxpayer-dashboard'
    },
    { 
      id: 'profile', 
      label: 'Profile Management', 
      icon: User, 
      subsections: [
        { id: 'view-profile', label: 'View Profile', icon: Eye, path: '/taxpayer-dashboard/view-profile' },
        { id: 'update-info', label: 'Update Info', icon: Edit, path: '/taxpayer-dashboard/update-info' },
        { id: 'upload-documents', label: 'Upload Documents', icon: Upload, path: '/taxpayer-dashboard/upload-documents' },
        { id: 'family-relations', label: 'Family Relations', icon: Users, path: '/taxpayer-dashboard/family-relations' }
      ] 
    },
    { 
      id: 'assessment', 
      label: 'Assessment', 
      icon: BarChart3, 
      subsections: [
        { id: 'view-assessments', label: 'View Assessments', icon: Eye },
        { id: 'object-assessment', label: 'Object to Assessment', icon: AlertCircle },
        { id: 'assessment-history', label: 'Assessment History', icon: History }
      ] 
    },
    { 
      id: 'payment', 
      label: 'Payment Module', 
      icon: CreditCard, 
      subsections: [
        { id: 'generate-bill', label: 'Generate Bill', icon: Receipt },
        { id: 'make-payment', label: 'Make Payment', icon: CreditCard },
        { id: 'payment-history', label: 'Payment History', icon: History },
        { id: 'tax-details', label: 'Tax Details', icon: BarChart3 }
      ] 
    },
    { 
      id: 'returns', 
      label: 'Returns', 
      icon: FileText, 
      subsections: [
        { id: 'file-returns', label: 'File Returns', icon: Plus },
        { id: 'view-returns', label: 'View Returns', icon: Eye },
        { id: 'return-status', label: 'Return Status', icon: CheckCircle },
        { id: 'return-history', label: 'Return History', icon: History }
      ] 
    },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: MessageSquare, 
      subsections: [
        { id: 'inbox', label: 'Inbox', icon: Inbox },
        { id: 'sent-messages', label: 'Sent Messages', icon: Send },
        { id: 'notifications', label: 'Notifications', icon: Bell }
      ] 
    }
  ];

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden`}>
      <nav className="p-4 space-y-2" id="main-navigation">
        {sidebarSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id}>
              <button
                onClick={() => onSectionClick(section.id)}
                className={`w-full flex items-center ${sidebarOpen ? 'space-x-3' : 'justify-center'} px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeSection === section.id 
                    ? 'border border-gray-200' 
                    : 'hover:bg-gray-50'
                }`}
                style={{ 
                  backgroundColor: activeSection === section.id ? '#f8f9ff' : 'transparent',
                  color: activeSection === section.id ? '#102e4a' : '#6c757d'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.color = '#a682ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.color = '#6c757d';
                  }
                }}
                id={`menu-${section.id}`}
                aria-label={section.label}
                title={!sidebarOpen ? section.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{section.label}</span>}
              </button>
              
              {section.subsections.length > 0 && activeSection === section.id && sidebarOpen && (
                <div className="ml-8 mt-2 space-y-1">
                  {section.subsections.map((subsection: any, index) => {
                    const SubIcon = subsection.icon;
                    return (
                      <button
                        key={index}
                        className={`w-full text-left px-4 py-2 text-sm rounded transition-all duration-200 flex items-center space-x-2 ${
                          activeSubsection === subsection.id 
                            ? 'text-white' 
                            : 'hover:bg-gray-50'
                        }`}
                        style={{
                          backgroundColor: activeSubsection === subsection.id ? '#a682ff' : 'transparent',
                          color: activeSubsection === subsection.id ? 'white' : '#6c757d'
                        }}
                        onMouseEnter={(e) => {
                          if (activeSubsection !== subsection.id) {
                            e.currentTarget.style.color = '#102e4a';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeSubsection !== subsection.id) {
                            e.currentTarget.style.color = '#6c757d';
                          }
                        }}
                        onClick={() => onSubsectionClick(subsection.id)}
                        id={`menu-${section.id}-${subsection.id}`}
                      >
                        <SubIcon className="w-4 h-4" />
                        <span>{subsection.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

// Main Content Component
const MainContent: React.FC<MainContentProps> = ({ 
  activeSection, 
  activeSubsection, 
  onQuickAccess, 
  onSubsectionClick,
  userProfile,
  notifications,
  quickAccessItems,
  summaryData,
  unreadNotifications,
  markAsRead,
  markAllAsRead,
  openMessage,
  // viewPaymentHistory,
  // downloadReceipt,
  // viewAssessment,
  // fileReturns
}) => {
  // Profile Management State
  const [profileData, setProfileData] = useState({
    name: 'John Adebayo',
    taxpayerId: 'TP001234567',
    email: 'john.adebayo@email.com',
    phone: '+234 801 234 5678',
    address: '123 Victoria Island, Lagos',
    status: 'Active',
    dateOfBirth: '1985-06-15',
    occupation: 'Software Engineer',
    maritalStatus: 'Married'
  });

  const [documents, setDocuments] = useState([
    { id: 1, name: 'National ID Card', type: 'ID', uploadDate: '2024-01-15', status: 'verified', size: '2.4 MB' },
    { id: 2, name: 'Passport Photograph', type: 'Photo', uploadDate: '2024-01-15', status: 'verified', size: '1.2 MB' },
    { id: 3, name: 'Bank Statement', type: 'Financial', uploadDate: '2024-02-10', status: 'pending', size: '3.1 MB' }
  ]);

  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: 'Sarah Adebayo', relationship: 'Spouse', taxpayerId: 'TP001234568', status: 'Active' },
    { id: 2, name: 'Michael Adebayo', relationship: 'Child', taxpayerId: 'TP001234569', status: 'Dependent' },
    { id: 3, name: 'Grace Adebayo', relationship: 'Child', taxpayerId: 'TP001234570', status: 'Dependent' }
  ]);

  // Assessment State
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: 'ASS-2025-001',
      type: 'Personal Income Tax',
      taxYear: '2024',
      amount: 450000,
      status: 'pending',
      dueDate: '2025-08-15',
      issueDate: '2025-07-01',
      description: 'Annual income tax assessment for 2024 tax year',
      reference: 'PIT-2024-JA-001'
    },
    {
      id: 'ASS-2025-002',
      type: 'Withholding Tax',
      taxYear: '2024',
      amount: 75000,
      status: 'overdue',
      dueDate: '2025-06-30',
      issueDate: '2025-06-01',
      description: 'Withholding tax on professional services',
      reference: 'WHT-2024-JA-002'
    },
    {
      id: 'ASS-2024-003',
      type: 'Capital Gains Tax',
      taxYear: '2024',
      amount: 120000,
      status: 'approved',
      dueDate: '2025-05-15',
      issueDate: '2025-04-01',
      description: 'Capital gains from property sale',
      reference: 'CGT-2024-JA-003'
    },
    {
      id: 'ASS-2024-004',
      type: 'Personal Income Tax',
      taxYear: '2023',
      amount: 380000,
      status: 'disputed',
      dueDate: '2024-08-15',
      issueDate: '2024-07-01',
      description: 'Annual income tax assessment for 2023 tax year - Under Review',
      reference: 'PIT-2023-JA-004'
    }
  ]);

  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [objectionForm, setObjectionForm] = useState<ObjectionForm>({
    assessmentId: '',
    reason: '',
    supportingEvidence: '',
    requestedAmount: 0,
    additionalComments: ''
  });

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  
  // Bill generation
  const [billForm, setBillForm] = useState({
    agency: '',
    revenueType: '',
    taxYear: '2025',
    amount: '',
    description: ''
  });
  const [generatedBill, setGeneratedBill] = useState<any>(null);
  const [showBillPreview, setShowBillPreview] = useState(false);
  
  // Payment form
  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: '',
    assessmentId: '',
    amount: '',
    description: ''
  });
  
  // File upload
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Profile update state
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);

  const openModal = (type: string, data = {}) => {
    setModalType(type);
    setFormData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setFormData({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleObjectionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setObjectionForm(prev => ({ 
      ...prev, 
      [name]: name === 'requestedAmount' ? parseFloat(value) || 0 : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modalType === 'update-info') {
      setProfileData(prev => ({ ...prev, ...formData }));
    } else if (modalType === 'add-family') {
      const newMember = {
        id: familyMembers.length + 1,
        ...formData,
        status: (formData as any).relationship === 'Spouse' ? 'Active' : 'Dependent'
      };
      setFamilyMembers(prev => [...prev, newMember as any]);
    }
    
    closeModal();
  };

  const submitObjection = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update assessment status to disputed
    setAssessments(prev => prev.map(assessment => 
      assessment.id === objectionForm.assessmentId 
        ? { ...assessment, status: 'disputed' }
        : assessment
    ));

    // Reset form
    setObjectionForm({
      assessmentId: '',
      reason: '',
      supportingEvidence: '',
      requestedAmount: 0,
      additionalComments: ''
    });

    alert('Objection submitted successfully! You will receive a confirmation email shortly.');
  };

  const deleteDocument = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const deleteFamilyMember = (id: number) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  // Bill generation functions
  const handleBillFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBillForm(prev => ({ ...prev, [name]: value }));
  };

  const generateBill = () => {
    if (!billForm.agency || !billForm.revenueType || !billForm.amount) {
      alert('Please fill in all required fields');
      return;
    }

    const newBill = {
      id: 'BILL-' + Date.now(),
      ...billForm,
      amount: parseFloat(billForm.amount),
      dateGenerated: new Date().toISOString(),
      status: 'generated',
      reference: 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    setGeneratedBill(newBill);
    alert('Bill generated successfully!');
    
    // Reset form
    setBillForm({
      agency: '',
      revenueType: '',
      taxYear: '2025',
      amount: '',
      description: ''
    });
  };

  const previewBill = () => {
    if (!billForm.agency || !billForm.revenueType || !billForm.amount) {
      alert('Please fill in all required fields to preview');
      return;
    }
    setShowBillPreview(true);
  };

  // Payment functions
  const handlePaymentFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({ ...prev, [name]: value }));
  };

  const processPayment = () => {
    if (!paymentForm.paymentMethod || !paymentForm.assessmentId || !paymentForm.amount) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate payment processing
    alert('Payment processed successfully! You will receive a confirmation email shortly.');
    
    // Reset form
    setPaymentForm({
      paymentMethod: '',
      assessmentId: '',
      amount: '',
      description: ''
    });
  };

  // File upload simulation
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          
          // Add new document to list
          const newDoc = {
            id: documents.length + 1,
            name: files[0].name,
            type: files[0].type.includes('image') ? 'Photo' : 'Document',
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'pending',
            size: (files[0].size / 1024 / 1024).toFixed(1) + ' MB'
          };
          
          setDocuments(prev => [...prev, newDoc]);
          alert('File uploaded successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Search and filter functions
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
  };

  // Export functions
  const exportToPDF = () => {
    alert('Exporting to PDF... This would generate a PDF in a real application.');
  };

  const downloadDocument = (docId: number) => {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      alert(`Downloading ${doc.name}... This would download the file in a real application.`);
    }
  };

  // Filter assessments based on status and search term
  const filteredAssessments = assessments.filter(assessment => {
    const matchesStatus = filterStatus === 'all' || assessment.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      assessment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.taxYear.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'disputed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'disputed':
        return <AlertTriangle className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const sidebarSections = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      subsections: [],
      path: '/taxpayer-dashboard' 
    },
    { 
      id: 'profile', 
      label: 'Profile Management', 
      icon: User, 
      subsections: [
        { id: 'view-profile', label: 'View Profile', icon: Eye, path: '/taxpayer-dashboard/view-profile' },
        { id: 'update-info', label: 'Update Info', icon: Edit, path: '/taxpayer-dashboard/update-info' },
        { id: 'upload-documents', label: 'Upload Documents', icon: Upload, path: '/taxpayer-dashboard/upload-documents' },
        { id: 'family-relations', label: 'Family Relations', icon: Users, path: '/taxpayer-dashboard/family-relations'}
      ] 
    },
    { 
      id: 'assessment', 
      label: 'Assessment', 
      icon: BarChart3, 
      subsections: [
        { id: 'view-assessments', label: 'View Assessments', icon: Eye },
        { id: 'object-assessment', label: 'Object to Assessment', icon: AlertCircle },
        { id: 'assessment-history', label: 'Assessment History', icon: History }
      ] 
    },
    { 
      id: 'payment', 
      label: 'Payment Module', 
      icon: CreditCard, 
      subsections: [
        { id: 'generate-bill', label: 'Generate Bill', icon: Receipt },
        { id: 'make-payment', label: 'Make Payment', icon: CreditCard },
        { id: 'payment-history', label: 'Payment History', icon: History },
        { id: 'tax-details', label: 'Tax Details', icon: BarChart3 }
      ] 
    },
    { 
      id: 'returns', 
      label: 'Returns', 
      icon: FileText, 
      subsections: [
        { id: 'file-returns', label: 'File Returns', icon: Plus },
        { id: 'view-returns', label: 'View Returns', icon: Eye },
        { id: 'return-status', label: 'Return Status', icon: CheckCircle },
        { id: 'return-history', label: 'Return History', icon: History }
      ] 
    },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: MessageSquare, 
      subsections: [
        { id: 'inbox', label: 'Inbox', icon: Inbox },
        { id: 'sent-messages', label: 'Sent Messages', icon: Send },
        { id: 'notifications', label: 'Notifications', icon: Bell }
      ] 
    }
  ];

  const NotificationBadge: React.FC<{ type: 'warning' | 'success' | 'info' | 'error'; children: React.ReactNode }> = ({ type, children }) => {
    const colors = {
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      success: 'bg-green-100 text-green-800 border-green-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200',
      error: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <div className={`px-3 py-2 rounded-lg border ${colors[type]}`}>
        {children}
      </div>
    );
  };

  const QuickAccessTile: React.FC<{ item: QuickAccessItem; onClick: (id: string) => void }> = ({ item, onClick }) => {
    const Icon = item.icon;
    return (
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-gray-300"
        onClick={() => onClick(item.id)}
        role="button"
        tabIndex={0}
        aria-label={item.label}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#a682ff'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg" style={{ backgroundColor: item.color }}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#102e4a' }}>{item.label}</h3>
            <p className="text-sm" style={{ color: '#6c757d' }}>Quick access</p>
          </div>
        </div>
      </div>
    );
  };

  const SummaryPanel: React.FC<{ data: SummaryData }> = ({ data }) => {
    const getStatusColor = (status: SummaryData["status"]) => {
      const colors = {
        warning: 'text-yellow-600',
        success: 'text-green-600',
        info: 'text-blue-600',
        error: 'text-red-600'
      };
      return colors[status] || 'text-gray-600';
    };

    const getStatusIcon = (status: SummaryData["status"]) => {
      switch (status) {
        case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
        case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
        case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
        default: return <Bell className="w-5 h-5 text-blue-500" />;
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {getStatusIcon(data.status)}
            <h3 className="text-lg font-semibold text-gray-900">{data.title}</h3>
          </div>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {data.count}
          </span>
        </div>
        <div className={`text-2xl font-bold ${getStatusColor(data.status)}`}>
          {data.value}
        </div>
      </div>
    );
  };

  const renderSubsectionContent = () => {
    if (!activeSubsection) return null;

    const currentSection = sidebarSections.find(s => s.id === activeSection);
    const currentSubsection = currentSection?.subsections.find((sub: any) => sub.id === activeSubsection);
    
    if (!currentSubsection) return null;

    const SubsectionIcon = currentSubsection.icon;

    // Define content for each subsection
    const subsectionContent: { [key: string]: React.ReactNode } = {
      // Profile Management subsections
      'view-profile': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#102e4a' }}>
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: '#102e4a' }}>{profileData.name}</h3>
                  <p style={{ color: '#6c757d' }}>Individual Taxpayer</p>
                  <p className="text-sm" style={{ color: '#6c757d' }}>ID: {profileData.taxpayerId}</p>
                </div>
              </div>
              <button
                onClick={() => openModal('update-info', profileData)}
                className="inline-flex items-center px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#102e4a' }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Email</label>
                <p style={{ color: '#102e4a' }}>{profileData.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Phone</label>
                <p style={{ color: '#102e4a' }}>{profileData.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Address</label>
                <p style={{ color: '#102e4a' }}>{profileData.address}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Status</label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {profileData.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Date of Birth</label>
                <p style={{ color: '#102e4a' }}>{profileData.dateOfBirth}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Occupation</label>
                <p style={{ color: '#102e4a' }}>{profileData.occupation}</p>
              </div>
            </div>
          </div>
        </div>
      ),
      'update-info': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold mb-6" style={{ color: '#102e4a' }}>Update Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Date of Birth</label>
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Address</label>
                <textarea
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Occupation</label>
                <input
                  type="text"
                  value={profileData.occupation}
                  onChange={(e) => setProfileData(prev => ({ ...prev, occupation: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Marital Status</label>
                <select
                  value={profileData.maritalStatus}
                  onChange={(e) => setProfileData(prev => ({ ...prev, maritalStatus: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  console.log('Profile updated successfully:', profileData);
                  setProfileUpdateSuccess(true);
                  setTimeout(() => setProfileUpdateSuccess(false), 3000);
                }}
                className="inline-flex items-center px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#102e4a' }}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>

            {/* Success Message */}
            {profileUpdateSuccess && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-medium text-green-800">Profile updated successfully!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
      'upload-documents': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold" style={{ color: '#102e4a' }}>Document Management</h3>
              <label className="inline-flex items-center px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
                style={{ backgroundColor: '#102e4a' }}>
                <Upload className="w-4 h-4 mr-2" />
                Upload New Document
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  multiple
                />
              </label>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center hover:border-gray-400 transition-colors">
              <label className="cursor-pointer block">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  multiple
                />
                <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: '#6c757d' }} />
                <p className="text-lg font-medium mb-2" style={{ color: '#102e4a' }}>Drop files here or click to upload</p>
                <p className="text-sm" style={{ color: '#6c757d' }}>Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)</p>
              </label>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-800">Uploading...</p>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-blue-800">{uploadProgress}%</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="font-medium" style={{ color: '#102e4a' }}>Uploaded Documents</h4>
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#102e4a' }}>
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: '#102e4a' }}>{doc.name}</p>
                      <p className="text-sm" style={{ color: '#6c757d' }}>
                        {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      doc.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status === 'verified' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Pending
                        </>
                      )}
                    </span>
                    <button
                      onClick={() => downloadDocument(doc.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      'family-relations': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold" style={{ color: '#102e4a' }}>Family Relations</h3>
              <button
                onClick={() => openModal('add-family')}
                className="inline-flex items-center px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#102e4a' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Family Member
              </button>
            </div>

            <div className="space-y-4">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#102e4a' }}>
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: '#102e4a' }}>{member.name}</p>
                      <p className="text-sm" style={{ color: '#6c757d' }}>
                        {member.relationship} • ID: {member.taxpayerId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {member.status}
                    </span>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      style={{ color: '#102e4a' }}
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteFamilyMember(member.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),

      // Assessment subsections
      'view-assessments': (
        <div className="space-y-6">
          {/* Assessment Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {assessments.filter(a => a.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">
                    {assessments.filter(a => a.status === 'overdue').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Disputed</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {assessments.filter(a => a.status === 'disputed').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(assessments.reduce((sum, a) => sum + a.amount, 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter and Search */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by reference, type, or year..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="disputed">Disputed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>

            {/* Assessments List */}
            <div className="space-y-4">
              {filteredAssessments.map((assessment) => (
                <div key={assessment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold" style={{ color: '#102e4a' }}>{assessment.type}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(assessment.status)}`}>
                          {getStatusIcon(assessment.status)}
                          <span className="ml-1 capitalize">{assessment.status}</span>
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Reference</label>
                          <p className="text-sm" style={{ color: '#102e4a' }}>{assessment.reference}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Tax Year</label>
                          <p className="text-sm" style={{ color: '#102e4a' }}>{assessment.taxYear}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Issue Date</label>
                          <p className="text-sm" style={{ color: '#102e4a' }}>{formatDate(assessment.issueDate)}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{assessment.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Amount Due</label>
                          <p className="text-xl font-bold" style={{ color: '#102e4a' }}>
                            {formatCurrency(assessment.amount)}
                          </p>
                        </div>
                        <div className="text-right">
                          <label className="text-sm font-medium text-gray-600">Due Date</label>
                          <p className={`text-sm font-medium ${
                            new Date(assessment.dueDate) < new Date() ? 'text-red-600' : 'text-gray-900'
                          }`}>
                            {formatDate(assessment.dueDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-6">
                      <button
                        onClick={() => setSelectedAssessment(assessment)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                      {(assessment.status === 'pending' || assessment.status === 'overdue') && (
                        <button
                          onClick={() => {
                            setObjectionForm(prev => ({ ...prev, assessmentId: assessment.id }));
                            onSubsectionClick('object-assessment');
                          }}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Object
                        </button>
                      )}
                      {assessment.status !== 'disputed' && (
                        <button
                          onClick={() => onQuickAccess('make-payment')}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: '#102e4a' }}
                        >
                          <CreditCard className="w-4 h-4 mr-1" />
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredAssessments.length === 0 && (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ),

      'object-assessment': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-orange-100">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: '#102e4a' }}>Object to Assessment</h3>
                <p className="text-sm text-gray-600">Submit a formal objection to a tax assessment</p>
              </div>
            </div>

            {/* Assessment Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3" style={{ color: '#6c757d' }}>Select Assessment to Object</label>
              <div className="space-y-3">
                {assessments
                  .filter(a => a.status === 'pending' || a.status === 'overdue')
                  .map(assessment => (
                    <div 
                      key={assessment.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        objectionForm.assessmentId === assessment.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setObjectionForm(prev => ({ 
                        ...prev, 
                        assessmentId: assessment.id,
                        requestedAmount: assessment.amount 
                      }))}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium" style={{ color: '#102e4a' }}>{assessment.type}</h4>
                          <p className="text-sm text-gray-600">{assessment.reference} • {assessment.taxYear}</p>
                          <p className="text-sm text-gray-600">{assessment.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold" style={{ color: '#102e4a' }}>{formatCurrency(assessment.amount)}</p>
                          <p className="text-sm text-gray-600">Due: {formatDate(assessment.dueDate)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Objection Form */}
            {objectionForm.assessmentId && (
              <form onSubmit={submitObjection} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>
                      Reason for Objection *
                    </label>
                    <select
                      name="reason"
                      value={objectionForm.reason}
                      onChange={handleObjectionInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select reason</option>
                      <option value="incorrect_calculation">Incorrect Calculation</option>
                      <option value="double_taxation">Double Taxation</option>
                      <option value="exemption_not_applied">Exemption Not Applied</option>
                      <option value="wrong_tax_year">Wrong Tax Year</option>
                      <option value="incorrect_income">Incorrect Income Assessment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>
                      Requested Amount (₦)
                    </label>
                    <input
                      type="number"
                      name="requestedAmount"
                      value={objectionForm.requestedAmount}
                      onChange={handleObjectionInputChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter corrected amount"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>
                    Supporting Evidence/Documentation
                  </label>
                  <textarea
                    name="supportingEvidence"
                    value={objectionForm.supportingEvidence}
                    onChange={handleObjectionInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Describe the evidence supporting your objection (receipts, bank statements, etc.)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>
                    Additional Comments
                  </label>
                  <textarea
                    name="additionalComments"
                    value={objectionForm.additionalComments}
                    onChange={handleObjectionInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Any additional information or comments"
                  />
                </div>

                {/* File Upload Area */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>
                    Upload Supporting Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, JPG, PNG (Max 5MB each)</p>
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-start space-x-3 mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I declare that the information provided is true and accurate to the best of my knowledge. 
                      I understand that providing false information may result in penalties.
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setObjectionForm({
                        assessmentId: '',
                        reason: '',
                        supportingEvidence: '',
                        requestedAmount: 0,
                        additionalComments: ''
                      })}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#102e4a' }}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Objection
                    </button>
                  </div>
                </div>
              </form>
            )}

            {!objectionForm.assessmentId && (
              <div className="text-center py-8">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Assessment</h3>
                <p className="text-gray-600">Choose an assessment from the list above to begin your objection.</p>
              </div>
            )}
          </div>
        </div>
      ),

      'assessment-history': (
        <div className="space-y-6">
          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Assessments</p>
                  <p className="text-2xl font-bold" style={{ color: '#102e4a' }}>
                    {assessments.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(assessments.reduce((sum, a) => sum + a.amount, 0))}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">This Year</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {assessments.filter(a => a.taxYear === '2024').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Processing</p>
                  <p className="text-2xl font-bold text-red-600">
                    15 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline View */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold" style={{ color: '#102e4a' }}>Assessment Timeline</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={exportToPDF}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Export PDF
                </button>
                <select 
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <option value="all">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {assessments
                .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
                .map((assessment, index) => (
                  <div key={assessment.id} className="relative">
                    {/* Timeline Line */}
                    {index < assessments.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    
                    <div className="flex items-start space-x-4">
                      {/* Timeline Dot */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg ${
                        assessment.status === 'approved' ? 'bg-green-500' :
                        assessment.status === 'pending' ? 'bg-yellow-500' :
                        assessment.status === 'disputed' ? 'bg-blue-500' :
                        assessment.status === 'overdue' ? 'bg-red-500' :
                        'bg-gray-500'
                      }`}>
                        {getStatusIcon(assessment.status)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold" style={{ color: '#102e4a' }}>{assessment.type}</h4>
                              <p className="text-sm text-gray-600">{assessment.reference}</p>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                              {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-600">Tax Year:</span>
                              <p style={{ color: '#102e4a' }}>{assessment.taxYear}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Amount:</span>
                              <p className="font-semibold" style={{ color: '#102e4a' }}>{formatCurrency(assessment.amount)}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Issue Date:</span>
                              <p style={{ color: '#102e4a' }}>{formatDate(assessment.issueDate)}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Due Date:</span>
                              <p className={new Date(assessment.dueDate) < new Date() ? 'text-red-600 font-medium' : 'text-gray-900'}>
                                {formatDate(assessment.dueDate)}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mt-3">{assessment.description}</p>

                          <div className="flex justify-end mt-4 space-x-2">
                            <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                              <Eye className="w-3 h-3 mr-1" />
                              View Details
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {assessments.length === 0 && (
              <div className="text-center py-12">
                <History className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No assessment history</h3>
                <p className="text-gray-600">Your assessment history will appear here once assessments are issued.</p>
              </div>
            )}
          </div>

          {/* Yearly Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold mb-6" style={{ color: '#102e4a' }}>Yearly Summary</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tax Year</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Assessments</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Total Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {['2024', '2023', '2022'].map(year => {
                    const yearAssessments = assessments.filter(a => a.taxYear === year);
                    const totalAmount = yearAssessments.reduce((sum, a) => sum + a.amount, 0);
                    const hasOverdue = yearAssessments.some(a => a.status === 'overdue');
                    const hasPending = yearAssessments.some(a => a.status === 'pending');
                    
                    return (
                      <tr key={year} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium" style={{ color: '#102e4a' }}>{year}</td>
                        <td className="py-4 px-4">{yearAssessments.length}</td>
                        <td className="py-4 px-4 font-semibold">{formatCurrency(totalAmount)}</td>
                        <td className="py-4 px-4">
                          {hasOverdue ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Has Overdue
                            </span>
                          ) : hasPending ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),

      // Payment subsections
      'generate-bill': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#102e4a' }}>Generate New Bill</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Agency *</label>
                <select 
                  name="agency"
                  value={billForm.agency}
                  onChange={handleBillFormChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Agency</option>
                  <option value="Tax Internal Revenue Service">Tax Internal Revenue Service</option>
                  <option value="Federal Inland Revenue Service">Federal Inland Revenue Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Revenue Type *</label>
                <select 
                  name="revenueType"
                  value={billForm.revenueType}
                  onChange={handleBillFormChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Revenue Type</option>
                  <option value="Personal Income Tax">Personal Income Tax</option>
                  <option value="Withholding Tax">Withholding Tax</option>
                  <option value="Capital Gains Tax">Capital Gains Tax</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Tax Year</label>
                <select 
                  name="taxYear"
                  value={billForm.taxYear}
                  onChange={handleBillFormChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Amount (₦) *</label>
                <input 
                  type="number" 
                  name="amount"
                  value={billForm.amount}
                  onChange={handleBillFormChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="Enter amount" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Description</label>
                <textarea 
                  name="description"
                  value={billForm.description}
                  onChange={handleBillFormChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter bill description (optional)"
                />
              </div>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <button 
                onClick={generateBill}
                className="px-6 py-2 text-white rounded-md transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#102e4a' }}
              >
                Generate Bill
              </button>
              <button 
                onClick={previewBill}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Preview
              </button>
            </div>

            {/* Generated Bill Success */}
            {generatedBill && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Bill Generated Successfully!</h4>
                </div>
                <div className="mt-2 text-sm text-green-700">
                  <p>Reference: {generatedBill.reference}</p>
                  <p>Amount: {formatCurrency(generatedBill.amount)}</p>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="text-xs bg-green-600 text-white px-3 py-1 rounded">
                    Download PDF
                  </button>
                  <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded">
                    Send via Email
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bill Preview Modal */}
          {showBillPreview && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#102e4a' }}>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">Bill Preview</h2>
                    <button 
                      onClick={() => setShowBillPreview(false)} 
                      className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="border-2 border-gray-300 rounded-lg p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold" style={{ color: '#102e4a' }}>TAX BILL</h3>
                      <p className="text-gray-600">Tax Internal Revenue Service</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Bill To:</p>
                        <p className="font-semibold">{profileData.name}</p>
                        <p className="text-sm text-gray-600">{profileData.taxpayerId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Bill Date:</p>
                        <p>{new Date().toLocaleDateString()}</p>
                        <p className="text-sm font-medium text-gray-600 mt-2">Due Date:</p>
                        <p>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-3 gap-4 font-semibold text-gray-700 mb-2">
                        <div>Description</div>
                        <div>Tax Year</div>
                        <div className="text-right">Amount</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 py-2">
                        <div>{billForm.revenueType}</div>
                        <div>{billForm.taxYear}</div>
                        <div className="text-right font-semibold">{formatCurrency(parseFloat(billForm.amount) || 0)}</div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total Amount Due:</span>
                        <span className="text-2xl font-bold" style={{ color: '#102e4a' }}>
                          {formatCurrency(parseFloat(billForm.amount) || 0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      onClick={() => setShowBillPreview(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowBillPreview(false);
                        generateBill();
                      }}
                      className="px-4 py-2 rounded-lg text-white hover:opacity-90"
                      style={{ backgroundColor: '#102e4a' }}
                    >
                      Generate Bill
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ),

      'make-payment': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#102e4a' }}>Make Payment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Payment Method *</label>
                <select 
                  name="paymentMethod"
                  value={paymentForm.paymentMethod}
                  onChange={handlePaymentFormChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Payment Method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Online Banking">Online Banking</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="USSD">USSD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Assessment ID *</label>
                <select 
                  name="assessmentId"
                  value={paymentForm.assessmentId}
                  onChange={handlePaymentFormChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Assessment</option>
                  {assessments.filter(a => a.status === 'pending' || a.status === 'overdue').map(assessment => (
                    <option key={assessment.id} value={assessment.id}>
                      {assessment.reference} - {formatCurrency(assessment.amount)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Amount (₦) *</label>
                <input 
                  type="number" 
                  name="amount"
                  value={paymentForm.amount}
                  onChange={handlePaymentFormChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="Enter payment amount" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Payment Description</label>
                <textarea 
                  name="description"
                  value={paymentForm.description}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter payment description (optional)"
                />
              </div>
            </div>
            <div className="mt-6">
              <button 
                onClick={processPayment}
                className="w-full md:w-auto px-8 py-3 text-white rounded-md transition-all duration-200 hover:opacity-90 font-medium"
                style={{ backgroundColor: '#102e4a' }}
              >
                Proceed to Payment
              </button>
            </div>

            {/* Payment Information */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Payment Information</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Payments are processed securely through encrypted channels</li>
                <li>• You will receive a confirmation email after successful payment</li>
                <li>• Payment reference will be generated for your records</li>
                <li>• For support, contact: support@tirs.gov.ng</li>
              </ul>
            </div>
          </div>
        </div>
      ),

      'payment-history': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#102e4a' }}>Payment History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium" style={{ color: '#6c757d' }}>Date</th>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: '#6c757d' }}>Reference</th>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: '#6c757d' }}>Tax Type</th>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: '#6c757d' }}>Amount</th>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: '#6c757d' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">July 15, 2025</td>
                    <td className="py-3 px-4">PAY-001234</td>
                    <td className="py-3 px-4">Personal Income Tax</td>
                    <td className="py-3 px-4 font-semibold text-green-600">₦150,000</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">June 30, 2025</td>
                    <td className="py-3 px-4">PAY-001235</td>
                    <td className="py-3 px-4">Withholding Tax</td>
                    <td className="py-3 px-4 font-semibold text-green-600">₦45,000</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">May 20, 2025</td>
                    <td className="py-3 px-4">PAY-001236</td>
                    <td className="py-3 px-4">Capital Gains Tax</td>
                    <td className="py-3 px-4 font-semibold text-yellow-600">₦25,000</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),

      'tax-details': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#102e4a' }}>Tax Details Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Total Tax Liability</h4>
                <p className="text-2xl font-bold" style={{ color: '#102e4a' }}>₦1,025,000</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Tax Paid</h4>
                <p className="text-2xl font-bold text-green-600">₦500,000</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Outstanding</h4>
                <p className="text-2xl font-bold text-red-600">₦525,000</p>
              </div>
            </div>
          </div>
        </div>
      ),

      // Returns subsections
      'file-returns': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#102e4a' }}>File Tax Returns</h3>
            <div className="text-center py-8">
              <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: '#a682ff' }} />
              <h4 className="text-xl font-semibold mb-2" style={{ color: '#102e4a' }}>File Your Tax Returns</h4>
              <p className="text-gray-600 mb-6">Submit your annual tax returns online</p>
              <button 
                className="px-6 py-3 text-white rounded-md transition-all duration-200 hover:opacity-90 font-medium"
                style={{ backgroundColor: '#102e4a' }}
              >
                Start Filing
              </button>
            </div>
          </div>
        </div>
      ),

      'view-returns': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#102e4a' }}>View Returns</h3>
            <div className="text-center py-8">
              <Eye className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No returns found</h4>
              <p className="text-gray-600">Your filed tax returns will appear here</p>
            </div>
          </div>
        </div>
      ),

      'return-status': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#102e4a' }}>Return Status</h3>
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No returns to track</h4>
              <p className="text-gray-600">Status updates for your returns will appear here</p>
            </div>
          </div>
        </div>
      ),

      'return-history': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#102e4a' }}>Return History</h3>
            <div className="text-center py-8">
              <History className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No return history</h4>
              <p className="text-gray-600">Your historical tax returns will appear here</p>
            </div>
          </div>
        </div>
      ),

      // Messages subsections
      'inbox': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold" style={{ color: '#102e4a' }}>Inbox Messages</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm" style={{ color: '#6c757d' }}>{unreadNotifications.length} unread</span>
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    unreadNotifications.includes(notification.id) 
                      ? 'border-blue-200 bg-blue-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => openMessage(notification)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium" style={{ color: '#102e4a' }}>System Administrator</span>
                        <span className={`w-2 h-2 rounded-full ${
                          notification.type === 'warning' ? 'bg-yellow-500' : 
                          notification.type === 'success' ? 'bg-green-500' : 
                          notification.type === 'error' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`}></span>
                        {unreadNotifications.includes(notification.id) && (
                          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">New</span>
                        )}
                      </div>
                      <p className="text-sm" style={{ color: '#6c757d' }}>{notification.message}</p>
                      <p className="text-xs mt-2" style={{ color: '#6c757d' }}>{notification.time}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                      className={`text-xs hover:text-gray-700 px-2 py-1 rounded ${
                        unreadNotifications.includes(notification.id)
                          ? 'text-blue-600 bg-blue-100 hover:bg-blue-200'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {unreadNotifications.includes(notification.id) ? 'Mark as read' : 'Read'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),

      'sent-messages': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#102e4a' }}>Sent Messages</h3>
            <div className="text-center py-8">
              <Send className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No sent messages</h4>
              <p className="text-gray-600">Messages you send will appear here</p>
            </div>
          </div>
        </div>
      ),

      'notifications': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#102e4a' }}>All Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <NotificationBadge key={notification.id} type={notification.type}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-xs mt-1 opacity-75">{notification.time}</p>
                    </div>
                    <button className="ml-4 text-xs opacity-75 hover:opacity-100">
                      Mark as read
                    </button>
                  </div>
                </NotificationBadge>
              ))}
            </div>
          </div>
        </div>
      )
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <SubsectionIcon className="w-6 h-6" style={{ color: '#a682ff' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#102e4a' }}>{currentSubsection.label}</h2>
        </div>
        {subsectionContent[activeSubsection] || (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <SubsectionIcon className="w-16 h-16 mx-auto mb-4" style={{ color: '#a682ff' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#102e4a' }}>{currentSubsection.label}</h3>
              <p style={{ color: '#6c757d' }}>This feature is under development</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <main className="flex-1 p-6">
        {/* Show subsection content if active */}
        {activeSubsection ? (
          renderSubsectionContent()
        ) : activeSection === 'dashboard' ? (
          <div className="space-y-8">
            {/* Profile Snapshot */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#102e4a' }}>Profile Snapshot</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: '#6c757d' }}>Name</label>
                  <p className="text-lg" style={{ color: '#102e4a' }}>{userProfile.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: '#6c757d' }}>Taxpayer Type</label>
                  <p className="text-lg" style={{ color: '#102e4a' }}>{userProfile.taxpayerType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: '#6c757d' }}>Taxpayer ID</label>
                  <p className="text-lg" style={{ color: '#102e4a' }}>{userProfile.taxpayerId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: '#6c757d' }}>Last Login</label>
                  <p className="text-lg" style={{ color: '#102e4a' }}>{userProfile.lastLogin}</p>
                </div>
              </div>
            </section>

            {/* Quick Access Tiles */}
            <section>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#102e4a' }}>Quick Access</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickAccessItems.map((item) => (
                  <QuickAccessTile 
                    key={item.id} 
                    item={item} 
                    onClick={onQuickAccess} 
                  />
                ))}
              </div>
            </section>

            {/* Summary Panels */}
            <section>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#102e4a' }}>Summary Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryData.map((data, index) => (
                  <SummaryPanel key={index} data={data} />
                ))}
              </div>
            </section>

            {/* Notifications Feed */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold" style={{ color: '#102e4a' }}>Recent Notifications</h2>
                <span className="text-sm" style={{ color: '#6c757d' }} id="message-count">
                  {unreadNotifications.length} unread
                </span>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <NotificationBadge key={notification.id} type={notification.type}>
                    <div className="flex items-start justify-between">
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => openMessage(notification)}
                      >
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-xs mt-1 opacity-75">{notification.time}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        className={`ml-4 text-xs opacity-75 hover:opacity-100 px-2 py-1 rounded ${
                          unreadNotifications.includes(notification.id)
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {unreadNotifications.includes(notification.id) ? 'Mark as read' : 'Read'}
                      </button>
                    </div>
                  </NotificationBadge>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button 
                  className="transition-colors duration-200 text-sm font-medium hover:opacity-75"
                  style={{ color: '#a682ff' }}
                  onClick={() => onSubsectionClick('inbox')}
                >
                  View all messages →
                </button>
              </div>
            </section>
          </div>
        ) : activeSection === 'assessment' && !activeSubsection ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: '#102e4a' }}>Assessment Overview</h2>
            
            {/* Assessment Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {assessments.filter(a => a.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-red-100">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overdue</p>
                    <p className="text-2xl font-bold text-red-600">
                      {assessments.filter(a => a.status === 'overdue').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Disputed</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {assessments.filter(a => a.status === 'disputed').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(assessments.reduce((sum, a) => sum + a.amount, 0))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Assessments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold" style={{ color: '#102e4a' }}>Recent Assessments</h3>
                <button 
                  className="text-sm transition-colors duration-200 hover:opacity-75"
                  style={{ color: '#a682ff' }}
                  onClick={() => onSubsectionClick('view-assessments')}
                >
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {assessments.slice(0, 3).map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#102e4a' }}>
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: '#102e4a' }}>{assessment.type}</p>
                        <p className="text-sm" style={{ color: '#6c757d' }}>
                          {assessment.reference} • Due: {formatDate(assessment.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold" style={{ color: '#102e4a' }}>{formatCurrency(assessment.amount)}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                        {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeSection === 'payment' && !activeSubsection ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: '#102e4a' }}>Payment Module</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#102e4a' }}>Generate Bill</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agency</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option>Select Agency</option>
                      <option>Tax Internal Revenue Service</option>
                      <option>Federal Inland Revenue Service</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Revenue Type</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option>Select Revenue Type</option>
                      <option>Personal Income Tax</option>
                      <option>Withholding Tax</option>
                      <option>Capital Gains Tax</option>
                    </select>
                  </div>
                  <button 
                    className="w-full text-white py-2 px-4 rounded-md transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: '#102e4a' }}
                    onClick={() => onSubsectionClick('generate-bill')}
                  >
                    Generate Bill
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#102e4a' }}>Recent Payments</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium" style={{ color: '#102e4a' }}>Personal Income Tax</p>
                      <p className="text-sm text-gray-600">July 15, 2025</p>
                    </div>
                    <p className="font-bold text-green-600">₦150,000</p>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium" style={{ color: '#102e4a' }}>Withholding Tax</p>
                      <p className="text-sm text-gray-600">June 30, 2025</p>
                    </div>
                    <p className="font-bold text-green-600">₦45,000</p>
                  </div>
                </div>
                <button 
                  className="w-full mt-4 text-sm transition-colors duration-200 hover:opacity-75"
                  style={{ color: '#a682ff' }}
                  onClick={() => onSubsectionClick('payment-history')}
                >
                  View Payment History →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold capitalize" style={{ color: '#102e4a' }}>{activeSection}</h2>
              <p className="mt-2" style={{ color: '#6c757d' }}>
                Select a subsection from the sidebar to get started
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sidebarSections.find(s => s.id === activeSection)?.subsections.map((subsection: any, index) => {
                  const SubIcon = subsection.icon;
                  return (
                    <button
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg transition-all duration-200 hover:border-gray-300"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#a682ff';
                        e.currentTarget.style.backgroundColor = '#f8f9ff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      onClick={() => onSubsectionClick(subsection.id)}
                    >
                      <SubIcon className="w-8 h-8 mx-auto mb-2" style={{ color: '#a682ff' }} />
                      <p className="font-medium" style={{ color: '#102e4a' }}>{subsection.label}</p>
                      <p className="text-sm mt-1" style={{ color: '#6c757d' }}>Click to access</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#102e4a' }}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  {modalType === 'add-family' ? 'Add Family Member' : 'Update Information'}
                </h2>
                <button onClick={closeModal} className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {modalType === 'add-family' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={(formData as any).name || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Relationship</label>
                    <select
                      name="relationship"
                      value={(formData as any).relationship || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select relationship</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Child">Child</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Taxpayer ID</label>
                    <input
                      type="text"
                      name="taxpayerId"
                      value={(formData as any).taxpayerId || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Enter taxpayer ID"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  style={{ color: '#6c757d' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-white hover:opacity-90"
                  style={{ backgroundColor: '#102e4a' }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Detail Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#102e4a' }}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Assessment Details</h2>
                <button 
                  onClick={() => setSelectedAssessment(null)} 
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Assessment Header */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold" style={{ color: '#102e4a' }}>{selectedAssessment.type}</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAssessment.status)}`}>
                    {getStatusIcon(selectedAssessment.status)}
                    <span className="ml-2 capitalize">{selectedAssessment.status}</span>
                  </span>
                </div>
                <p className="text-gray-600">{selectedAssessment.description}</p>
              </div>

              {/* Assessment Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Reference Number</label>
                  <p className="text-lg font-semibold" style={{ color: '#102e4a' }}>{selectedAssessment.reference}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Tax Year</label>
                  <p className="text-lg font-semibold" style={{ color: '#102e4a' }}>{selectedAssessment.taxYear}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Issue Date</label>
                  <p className="text-lg font-semibold" style={{ color: '#102e4a' }}>{formatDate(selectedAssessment.issueDate)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Due Date</label>
                  <p className={`text-lg font-semibold ${
                    new Date(selectedAssessment.dueDate) < new Date() ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {formatDate(selectedAssessment.dueDate)}
                  </p>
                </div>
              </div>

              {/* Amount Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Assessment Amount</label>
                  <p className="text-3xl font-bold" style={{ color: '#102e4a' }}>
                    {formatCurrency(selectedAssessment.amount)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedAssessment(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {(selectedAssessment.status === 'pending' || selectedAssessment.status === 'overdue') && (
                  <>
                    <button
                      onClick={() => {
                        setObjectionForm(prev => ({ ...prev, assessmentId: selectedAssessment.id }));
                        setSelectedAssessment(null);
                        onSubsectionClick('object-assessment');
                      }}
                      className="inline-flex items-center px-4 py-2 text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Object to Assessment
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAssessment(null);
                        onQuickAccess('make-payment');
                      }}
                      className="inline-flex items-center px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#102e4a' }}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main Dashboard Component
const TaxpayerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState<number[]>([1, 2, 3]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [notifications] = useState<
    { id: number; type: 'warning' | 'success' | 'info' | 'error'; message: string; time: string; }[]
  >([
    { id: 1, type: 'warning', message: 'Annual return filing due in 15 days', time: '2 hours ago' },
    { id: 2, type: 'success', message: 'Payment of ₦150,000 processed successfully', time: '1 day ago' },
    { id: 3, type: 'info', message: 'New assessment available for review', time: '3 days ago' }
  ]);
  const userProfile = {
    name: 'John Adebayo',
    taxpayerType: 'Individual',
    taxpayerId: 'IND-001234567',
    lastLogin: '2025-07-20 14:30:00',
    status: 'Active'
  };

  const quickAccessItems = [
    { id: 'generate-bill', label: 'Generate Bill', icon: Receipt, color: '#102e4a' },
    { id: 'file-returns', label: 'File Returns', icon: FileText, color: '#a682ff' },
    { id: 'make-payment', label: 'Make Payment', icon: CreditCard, color: '#102e4a' },
    { id: 'payment-history', label: 'Payment History', icon: History, color: '#a682ff' },
    { id: 'tax-details', label: 'Tax Details', icon: BarChart3, color: '#102e4a' },
    { id: 'return-status', label: 'Return Status', icon: CheckCircle, color: '#a682ff' }
  ];

  const summaryData: SummaryData[] = [
    { title: 'Outstanding Bills', value: '₦85,000', status: 'warning', count: 2 },
    { title: 'Unread Messages', value: '3', status: 'info', count: 3 },
    { title: 'Upcoming Deadlines', value: '1', status: 'error', count: 1 },
    { title: 'Recent Payments', value: '₦150,000', status: 'success', count: 1 }
  ];

  const handleQuickAccess = (actionId: string) => {
    const quickAccessRoutes: { [key: string]: { section: string; subsection: string } } = {
      'generate-bill': { section: 'payment', subsection: 'generate-bill' },
      'file-returns': { section: 'returns', subsection: 'file-returns' },
      'make-payment': { section: 'payment', subsection: 'make-payment' },
      'payment-history': { section: 'payment', subsection: 'payment-history' },
      'tax-details': { section: 'payment', subsection: 'tax-details' },
      'return-status': { section: 'returns', subsection: 'return-status' }
    };

    const route = quickAccessRoutes[actionId];
    if (route) {
      setActiveSection(route.section);
      setActiveSubsection(route.subsection);
    }
    console.log(`Quick access: ${actionId}`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserDropdown(false);
    setActiveSection('dashboard');
    setActiveSubsection(null);
    console.log('User logged out successfully');
    alert('You have been logged out successfully!');
  };

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setActiveSubsection(null);
  };

  const handleSubsectionClick = (subsectionId: string) => {
    setActiveSubsection(subsectionId);
    console.log(`Navigate to: ${activeSection}/${subsectionId}`);
  };

  // Notification functions
  const markAsRead = (notificationId: number) => {
    setUnreadNotifications(prev => prev.filter(id => id !== notificationId));
  };

  const markAllAsRead = () => {
    setUnreadNotifications([]);
  };

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const openMessage = (message: any) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    setShowNotificationDropdown(false);
    // Mark as read when opening
    markAsRead(message.id);
  };

  const closeMessage = () => {
    setSelectedMessage(null);
    setShowMessageModal(false);
  };

  const viewPaymentHistory = () => {
    setActiveSection('payment');
    setActiveSubsection('payment-history');
    closeMessage();
  };

  const downloadReceipt = (paymentRef: string = 'PAY-2025-001234') => {
    // Simulate receipt download
    const receiptData = {
      reference: paymentRef,
      amount: '₦150,000',
      date: new Date().toLocaleDateString(),
      taxpayer: userProfile.name,
      taxpayerId: userProfile.taxpayerId,
      transactionId: 'TXN-789456123',
      paymentMethod: 'Bank Transfer',
      status: 'Completed'
    };

    // Create a simple receipt content
    const receiptContent = `
TIRS e-Tax Portal - Payment Receipt
=====================================

Receipt Number: ${receiptData.reference}
Transaction ID: ${receiptData.transactionId}
Date: ${receiptData.date}

Taxpayer Information:
Name: ${receiptData.taxpayer}
Taxpayer ID: ${receiptData.taxpayerId}

Payment Details:
Amount: ${receiptData.amount}
Payment Method: ${receiptData.paymentMethod}
Status: ${receiptData.status}

Tax Type: Personal Income Tax
Tax Year: 2024

=====================================
Thank you for your payment.
For inquiries, contact: support@tirs.gov.ng
`;

    // Create and download the receipt
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${receiptData.reference}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Show success message
    alert('Receipt downloaded successfully!');
  };

  const viewAssessment = () => {
    setActiveSection('assessment');
    setActiveSubsection('view-assessments');
    closeMessage();
  };

  const makePayment = () => {
    setActiveSection('payment');
    setActiveSubsection('make-payment');
    closeMessage();
  };

  const fileReturns = () => {
    setActiveSection('returns');
    setActiveSubsection('file-returns');
    closeMessage();
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Handle user dropdown
      if (showUserDropdown && !target.closest('.user-dropdown-container')) {
        setShowUserDropdown(false);
      }
      
      // Handle notification dropdown
      if (showNotificationDropdown && !target.closest('.notification-dropdown-container')) {
        setShowNotificationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown, showNotificationDropdown]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#102e4a' }}>
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#102e4a' }}>Logged Out</h2>
            <p className="mb-6" style={{ color: '#6c757d' }}>
              You have been successfully logged out from the TIRS e-Tax portal.
            </p>
            <button
              onClick={() => setIsLoggedIn(true)}
              className="w-full text-white py-2 px-4 rounded-md transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#a682ff' }}
            >
              Sign In Again
            </button>
            <p className="text-xs mt-4" style={{ color: '#6c757d' }}>
              In a real application, this would redirect to the login page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
              style={{ color: '#102e4a' }}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#102e4a' }}>TIRS e-Tax Portal</h1>
              <p className="text-sm" style={{ color: '#6c757d' }}>Tax Internal Revenue Service - Individual Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative notification-dropdown-container">
              <button
                onClick={toggleNotificationDropdown}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell 
                  className="w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity" 
                  style={{ color: '#6c757d' }}
                />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: '#a682ff' }}>
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold" style={{ color: '#102e4a' }}>Notifications</h3>
                    {unreadNotifications.length > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  
                  <div className="py-2">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 transition-colors ${
                          unreadNotifications.includes(notification.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-transparent'
                        }`}
                        onClick={() => openMessage(notification)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'error' ? 'bg-red-500' :
                            'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {unreadNotifications.includes(notification.id) && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={() => {
                        setShowNotificationDropdown(false);
                        handleSubsectionClick('notifications');
                      }}
                      className="w-full text-center py-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative user-dropdown-container">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 text-left hover:bg-gray-50 rounded-lg p-2 transition-colors"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#102e4a' }}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium" style={{ color: '#102e4a' }}>{userProfile.name}</p>
                  <p className="text-xs" style={{ color: '#6c757d' }}>{userProfile.taxpayerId}</p>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} style={{ color: '#6c757d' }} />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#102e4a' }}>
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: '#102e4a' }}>{userProfile.name}</p>
                        <p className="text-sm" style={{ color: '#6c757d' }}>{userProfile.taxpayerId}</p>
                        <p className="text-xs" style={{ color: '#6c757d' }}>Last login: {userProfile.lastLogin}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => {
                        setActiveSection('profile');
                        setActiveSubsection('view-profile');
                        setShowUserDropdown(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>View Profile</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        console.log('Settings clicked');
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                      id="logout-button"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar 
          sidebarOpen={sidebarOpen}
          activeSection={activeSection}
          activeSubsection={activeSubsection}
          onSectionClick={handleSectionClick}
          onSubsectionClick={handleSubsectionClick}
        />

        <MainContent 
          activeSection={activeSection}
          activeSubsection={activeSubsection}
          onQuickAccess={handleQuickAccess}
          onSubsectionClick={handleSubsectionClick}
          userProfile={userProfile}
          notifications={notifications}
          quickAccessItems={quickAccessItems}
          summaryData={summaryData}
          unreadNotifications={unreadNotifications}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          openMessage={openMessage}
          viewPaymentHistory={viewPaymentHistory}
          downloadReceipt={downloadReceipt}
          viewAssessment={viewAssessment}
          makePayment={makePayment}
          fileReturns={fileReturns}
        />
      </div>

      {/* Message Detail Modal */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#102e4a' }}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Message Details</h2>
                <button 
                  onClick={closeMessage} 
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Message Header */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#102e4a' }}>
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: '#102e4a' }}>System Administrator</h3>
                      <p className="text-sm text-gray-600">TIRS e-Tax Portal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedMessage.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      selectedMessage.type === 'success' ? 'bg-green-100 text-green-800' :
                      selectedMessage.type === 'error' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedMessage.type === 'warning' ? <AlertTriangle className="w-4 h-4 mr-1" /> :
                       selectedMessage.type === 'success' ? <CheckCircle className="w-4 h-4 mr-1" /> :
                       selectedMessage.type === 'error' ? <AlertCircle className="w-4 h-4 mr-1" /> :
                       <Info className="w-4 h-4 mr-1" />}
                      {selectedMessage.type.charAt(0).toUpperCase() + selectedMessage.type.slice(1)}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{selectedMessage.time}</p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-3" style={{ color: '#102e4a' }}>Message</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedMessage.message}</p>
                </div>

                {/* Additional Details Based on Message Type */}
                {selectedMessage.type === 'warning' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h5 className="font-medium text-yellow-800 mb-2">Action Required</h5>
                    <p className="text-sm text-yellow-700">
                      Please ensure you file your annual tax returns before the due date to avoid penalties. 
                      You can file your returns using the "File Returns" section in your dashboard.
                    </p>
                    <div className="mt-3">
                      <button 
                        onClick={() => {
                          closeMessage();
                          // Navigate to file returns - you can implement this
                        }}
                        className="text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                      >
                        File Returns Now
                      </button>
                    </div>
                  </div>
                )}

                {selectedMessage.type === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-medium text-green-800 mb-2">Payment Confirmation</h5>
                    <div className="text-sm text-green-700 space-y-1">
                      <p><strong>Amount:</strong> ₦150,000</p>
                      <p><strong>Reference:</strong> PAY-2025-001234</p>
                      <p><strong>Transaction ID:</strong> TXN-789456123</p>
                      <p><strong>Payment Method:</strong> Bank Transfer</p>
                    </div>
                    <div className="mt-3">
                      <button 
                        onClick={() => downloadReceipt('PAY-2025-001234')}
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                      >
                        Download Receipt
                      </button>
                      <button 
                        onClick={viewPaymentHistory}
                        className="text-sm border border-green-600 text-green-600 px-3 py-1 rounded hover:bg-green-50"
                      >
                        View Payment History
                      </button>
                    </div>
                  </div>
                )}

                {selectedMessage.type === 'info' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-800 mb-2">Assessment Information</h5>
                    <p className="text-sm text-blue-700">
                      A new tax assessment has been generated for the 2024 tax year. Please review the assessment details 
                      and make payment by the due date or submit an objection if you disagree with the assessment.
                    </p>
                    <div className="mt-3">
                      <button 
                        onClick={() => {
                          closeMessage();
                          // Navigate to assessments - you can implement this
                        }}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
                      >
                        View Assessment
                      </button>
                      <button className="text-sm border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50">
                        Make Payment
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={closeMessage}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Mark as read if not already
                    markAsRead(selectedMessage.id);
                    // You can add more actions here like forward, reply, etc.
                  }}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#102e4a' }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Handled
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxpayerDashboard;