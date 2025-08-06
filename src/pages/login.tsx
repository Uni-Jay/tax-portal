import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Shield, Building2, Mail, Users, ArrowLeft } from 'lucide-react';

// components (keep as you had them for imports if needed)
// import TaxpayerDashboard from '../componenets/taxpayerDashboard';
// import CorporateDashboard from '../componenets/CorporateDashboard';
// import ConsultantDashboard from '../componenets/ConsultantDashboard';
// import StaffDashboard from '../componenets/StaffDashboard';

// Define roles explicitly
type RoleType = 'taxpayer' | 'corporate' | 'consultant' | 'staff';

interface FormDataType {
  taxpayerId: string;
  companyTaxpayerId: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<RoleType | ''>('');
  const [formData, setFormData] = useState<FormDataType>({
    taxpayerId: '',
    companyTaxpayerId: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles: { value: RoleType; label: string; icon: any }[] = [
    { value: 'taxpayer', label: 'Individual Taxpayer', icon: User },
    { value: 'corporate', label: 'Corporate Admin', icon: Building2 },
    { value: 'consultant', label: 'Consultant', icon: Users },
    { value: 'staff', label: 'IRS Staff', icon: Shield }
  ];

  const handleBack = () => {
    // reset form and selection
    setSelectedRole('');
    setFormData({
      taxpayerId: '',
      companyTaxpayerId: '',
      email: '',
      password: ''
    });
  };

  const handleInputChange = (field: keyof FormDataType, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (role: RoleType) => {
    // ensure only one role selected
    setSelectedRole(prev => (prev === role ? '' : role));
    setFormData({
      taxpayerId: '',
      companyTaxpayerId: '',
      email: '',
      password: ''
    });
  };

  const handleSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: replace with real authentication call
      await new Promise(resolve => setTimeout(resolve, 800));

      // On success navigate to the correct route (update URL)
      switch (selectedRole) {
        case 'taxpayer':
          navigate('/taxpayer-dashboard', { replace: true });
          break;
        case 'corporate':
          navigate('/corporate-dashboard', { replace: true });
          break;
        case 'consultant':
          navigate('/consultant-dashboard', { replace: true });
          break;
        case 'staff':
          navigate('/staff-dashboard', { replace: true });
          break;
        default:
          alert('Unknown role selected');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (): boolean => {
    if (!selectedRole) return false;
    switch (selectedRole) {
      case 'taxpayer':
      case 'consultant':
        return !!formData.taxpayerId && !!formData.password;
      case 'corporate':
        return !!formData.companyTaxpayerId && !!formData.taxpayerId && !!formData.password;
      case 'staff':
        return !!formData.email && !!formData.password;
      default:
        return false;
    }
  };

  const renderLoginFields = () => {
    switch (selectedRole) {
      case 'taxpayer':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taxpayer ID
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <User className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.taxpayerId}
                  onChange={(e) => handleInputChange('taxpayerId', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="e.g., P0000123456"
                />
              </div>
            </div>
          </>
        );

      case 'corporate':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Company's Taxpayer ID
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.companyTaxpayerId}
                  onChange={(e) => handleInputChange('companyTaxpayerId', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="e.g., C0000123456"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Taxpayer ID
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <User className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.taxpayerId}
                  onChange={(e) => handleInputChange('taxpayerId', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="e.g., P0000789012"
                />
              </div>
            </div>
          </>
        );

      case 'consultant':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taxpayer ID
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.taxpayerId}
                  onChange={(e) => handleInputChange('taxpayerId', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="e.g., CON0000123456"
                />
              </div>
            </div>
          </>
        );

      case 'staff':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="staff@irs.gov.ng"
                />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(59,130,246,0.1)_1px,_transparent_0)] bg-[size:40px_40px]"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-blue-500/10 to-transparent rounded-t-2xl"></div>

          <button
            onClick={handleBack}
            className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>

          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
              IRS eTax Portal
            </h1>
            <p className="text-gray-600 text-sm"> Internal Revenue Service</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Your Role</label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <label key={role.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all duration-200">
                    <input
                      type="checkbox"
                      checked={selectedRole === role.value}
                      onChange={() => handleRoleChange(role.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500/20"
                    />
                    <div className="ml-2 flex flex-col items-start">
                      <div className="flex items-center">
                        <role.icon className="w-3 h-3 text-gray-500 mr-1" />
                        <span className="text-xs font-medium text-gray-900">{role.label.split(' ')[0]}</span>
                      </div>
                      <span className="text-xs text-gray-600">{role.label.split(' ').slice(1).join(' ')}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {selectedRole && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {roles.find(r => r.value === selectedRole)?.label} Login
                </h3>

                {renderLoginFields()}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500/20" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</a>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            )}
          </div>

          {selectedRole && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Register here
                </a>
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">© 2025 Internal Revenue Service</p>
            <p className="text-xs text-gray-500 mt-1">Secure • Reliable • Efficient</p>
          </div>
        </div>

        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}
