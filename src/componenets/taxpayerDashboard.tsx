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
  Download
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
  summaryData
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});

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

  const deleteDocument = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const deleteFamilyMember = (id: number) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Date of Birth</label>
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Address</label>
                <textarea
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Occupation</label>
                <input
                  type="text"
                  value={profileData.occupation}
                  onChange={(e) => setProfileData(prev => ({ ...prev, occupation: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Marital Status</label>
                <select
                  value={profileData.maritalStatus}
                  onChange={(e) => setProfileData(prev => ({ ...prev, maritalStatus: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
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
                className="inline-flex items-center px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#102e4a' }}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ),
      'upload-documents': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold" style={{ color: '#102e4a' }}>Document Management</h3>
              <button
                className="inline-flex items-center px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#102e4a' }}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload New Document
              </button>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: '#6c757d' }} />
              <p className="text-lg font-medium mb-2" style={{ color: '#102e4a' }}>Drop files here or click to upload</p>
              <p className="text-sm" style={{ color: '#6c757d' }}>Supported formats: PDF, JPG, PNG (Max 10MB)</p>
            </div>

            {/* Documents List */}
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
      'generate-bill': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#102e4a' }}>Generate New Bill</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Agency</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-opacity-50">
                  <option>Select Agency</option>
                  <option>Tax Internal Revenue Service</option>
                  <option>Federal Inland Revenue Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Revenue Type</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Select Revenue Type</option>
                  <option>Personal Income Tax</option>
                  <option>Withholding Tax</option>
                  <option>Capital Gains Tax</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Tax Year</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#6c757d' }}>Amount (₦)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter amount" />
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button 
                className="px-6 py-2 text-white rounded-md transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#102e4a' }}
              >
                Generate Bill
              </button>
              <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Preview
              </button>
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
      'inbox': (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold" style={{ color: '#102e4a' }}>Inbox Messages</h3>
              <span className="text-sm" style={{ color: '#6c757d' }}>3 unread</span>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium" style={{ color: '#102e4a' }}>System Administrator</span>
                        <span className={`w-2 h-2 rounded-full ${notification.type === 'warning' ? 'bg-yellow-500' : notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                      </div>
                      <p className="text-sm" style={{ color: '#6c757d' }}>{notification.message}</p>
                      <p className="text-xs mt-2" style={{ color: '#6c757d' }}>{notification.time}</p>
                    </div>
                    <button className="text-xs text-gray-500 hover:text-gray-700">
                      Mark as read
                    </button>
                  </div>
                </div>
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
                  {notifications.length} unread
                </span>
              </div>
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
    </>
  );
};

// Main Dashboard Component
const TaxpayerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
    // Map quick access items to their corresponding sections and subsections
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
    setActiveSubsection(null); // Reset subsection when changing sections
  };

  const handleSubsectionClick = (subsectionId: string) => {
    setActiveSubsection(subsectionId);
    console.log(`Navigate to: ${activeSection}/${subsectionId}`);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserDropdown && !(event.target as HTMLElement).closest('.relative')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  // If user is logged out, show login prompt
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
            <div className="relative">
              <Bell 
                className="w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity" 
                style={{ color: '#6c757d' }}
              />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: '#a682ff' }}>
                  {notifications.length}
                </span>
              )}
            </div>
            
            <div className="relative">
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

              {/* User Dropdown Menu */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info */}
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

                  {/* Menu Items */}
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

                  {/* Logout */}
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
        {/* Sidebar Component */}
        <Sidebar 
          sidebarOpen={sidebarOpen}
          activeSection={activeSection}
          activeSubsection={activeSubsection}
          onSectionClick={handleSectionClick}
          onSubsectionClick={handleSubsectionClick}
        />

        {/* Main Content Component */}
        <MainContent 
          activeSection={activeSection}
          activeSubsection={activeSubsection}
          onQuickAccess={handleQuickAccess}
          onSubsectionClick={handleSubsectionClick}
          userProfile={userProfile}
          notifications={notifications}
          quickAccessItems={quickAccessItems}
          summaryData={summaryData}
        />
      </div>
    </div>
  );
};

export default TaxpayerDashboard;