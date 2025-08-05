import { useState } from 'react';
import { ArrowLeft, TrendingUp, ChevronDown, Shield, User, Building, CheckCircle, Phone, Mail, MapPin, Lock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState({
    taxPayer: false,
    identification: false,
    state: false,
    lga: false
  });

  type IndividualDetails = {
    name: string;
    dateOfBirth: string;
    gender: string;
  };

  type CorporateDetails = {
    companyName: string;
    rcNumber: string;
    dateOfIncorporation: string;
    companyType: string;
  };

  type FormDataType = {
    taxPayerType: 'Individual' | 'Corporate';
    identificationSystemType: string;
    identificationNumber: string;
    fetchedDetails: IndividualDetails | CorporateDetails | {};
    email: string;
    phone: string;
    address: string;
    state: string;
    lga: string;
    password: string;
    confirmPassword: string;
  };

  const [formData, setFormData] = useState<FormDataType>({
    // Step 1
    taxPayerType: 'Individual',
    identificationSystemType: 'BVN',
    identificationNumber: '',
    
    // Step 2 - Fetched details (simulated)
    fetchedDetails: {},
    
    // Step 2 - User input
    email: '',
    phone: '',
    address: '',
    state: '',
    lga: '',
    password: '',
    confirmPassword: ''
  });

  const taxPayerTypes = ['Individual', 'Corporate'];
  const nigerianStates = [
    'Lagos', 'Abuja', 'Kano', 'Rivers', 'Ogun', 'Kaduna', 'Oyo', 'Delta', 'Edo', 'Anambra',
    'Imo', 'Plateau', 'Cross River', 'Akwa Ibom', 'Osun', 'Ondo', 'Kwara', 'Bauchi', 'Benue', 'Niger'
  ];

  const getLgasByState = (state: string) => {
    const lgaMap: { [key: string]: string[] } = {
      'Lagos': ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'],
      'Abuja': ['Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal Area Council'],
      'Kano': ['Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta', 'Dawakin Kudu', 'Dawakin Tofa']
    };
    return lgaMap[state] || ['Select State First'];
  };
  
  const getIdentificationTypes = () => {
    return formData.taxPayerType === 'Corporate' ? ['CAC'] : ['BVN', 'NIN', 'Passport'];
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const simulateFetchDetails = async (
    _idNumber: string,
    _idType: string,
    taxpayerType: string
  ) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (taxpayerType === 'Individual') {
      return {
        name: 'John Adebayo Ogundimu',
        dateOfBirth: '15th March, 1985',
        gender: 'Male'
      };
    } else {
      return {
        companyName: 'TechVenture Solutions Limited',
        rcNumber: 'RC1234567',
        dateOfIncorporation: '20th January, 2018',
        companyType: 'Private Limited Company'
      };
    }
  };

  const handleStep1Submit = async () => {
    if (!formData.identificationNumber.trim()) {
      alert('Please enter your identification number');
      return;
    }
    
    setIsLoading(true);
    try {
      const details = await simulateFetchDetails(
        formData.identificationNumber,
        formData.identificationSystemType,
        formData.taxPayerType
      );
      setFormData(prev => ({ ...prev, fetchedDetails: details }));
      setCurrentStep(2);
    } catch (error) {
      alert('Failed to verify details. Please try again.');
    }
    setIsLoading(false);
  };

  const handleStep2Submit = async () => {
    // Validation
    if (!formData.email || !formData.phone || !formData.address || 
        !formData.state || !formData.lga || !formData.password || 
        !formData.confirmPassword) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCurrentStep(3);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      if (field === 'taxPayerType') {
        if (value === 'Corporate') {
          newData.identificationSystemType = 'CAC';
        } else {
          newData.identificationSystemType = 'BVN';
        }
      }
      
      if (field === 'state') {
        newData.lga = ''; // Reset LGA when state changes
      }
      
      return newData;
    });
  };

  type DropdownType = keyof typeof showDropdown;

  const toggleDropdown = (type: DropdownType) => {
    setShowDropdown(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const selectOption = (field: string, value: string, dropdownType: DropdownType) => {
    handleInputChange(field, value);
    setShowDropdown(prev => ({
      ...prev,
      [dropdownType]: false
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Tax Payer Type Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#102e4a' }}>
          Select Tax Payer Type *
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown('taxPayer')}
            className="w-full px-4 py-3 bg-white rounded-lg text-left flex items-center justify-between transition-all duration-200 border"
            style={{ 
              borderColor: showDropdown.taxPayer ? '#a682ff' : '#e9ecef',
              boxShadow: showDropdown.taxPayer ? '0 0 0 2px rgba(166, 130, 255, 0.2)' : 'none'
            }}
          >
            <span style={{ color: '#102e4a' }}>{formData.taxPayerType}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown.taxPayer ? 'rotate-180' : ''}`} style={{ color: '#6c757d' }} />
          </button>
          
          {showDropdown.taxPayer && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg" style={{ borderColor: '#e9ecef' }}>
              {taxPayerTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => selectOption('taxPayerType', type, 'taxPayer')}
                  className="w-full px-4 py-3 text-left first:rounded-t-lg last:rounded-b-lg transition-colors hover:bg-purple-50"
                  style={{ color: '#102e4a' }}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Identification System Type Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#102e4a' }}>
          Select Identification System Type *
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown('identification')}
            className="w-full px-4 py-3 bg-white rounded-lg text-left flex items-center justify-between transition-all duration-200 border"
            style={{ 
              borderColor: showDropdown.identification ? '#a682ff' : '#e9ecef',
              boxShadow: showDropdown.identification ? '0 0 0 2px rgba(166, 130, 255, 0.2)' : 'none'
            }}
          >
            <span style={{ color: '#102e4a' }}>{formData.identificationSystemType}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown.identification ? 'rotate-180' : ''}`} style={{ color: '#6c757d' }} />
          </button>
          
          {showDropdown.identification && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg" style={{ borderColor: '#e9ecef' }}>
              {getIdentificationTypes().map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => selectOption('identificationSystemType', type, 'identification')}
                  className="w-full px-4 py-3 text-left first:rounded-t-lg last:rounded-b-lg transition-colors hover:bg-purple-50"
                  style={{ color: '#102e4a' }}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Identification Number Input */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#102e4a' }}>
          Enter {formData.identificationSystemType} No. *
        </label>
        <input
          type="text"
          value={formData.identificationNumber}
          onChange={(e) => handleInputChange('identificationNumber', e.target.value)}
          className="w-full px-4 py-3 bg-white border rounded-lg transition-all duration-200"
          style={{ 
            borderColor: '#e9ecef',
            color: '#102e4a'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#a682ff';
            e.target.style.boxShadow = '0 0 0 2px rgba(166, 130, 255, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e9ecef';
            e.target.style.boxShadow = 'none';
          }}
          placeholder={`Enter your ${formData.identificationSystemType} number`}
        />
      </div>

      {/* reCAPTCHA Placeholder */}
      <div className="flex items-center justify-center p-4 rounded-lg border" style={{ backgroundColor: '#f8f9fa', borderColor: '#e9ecef' }}>
        <div className="flex items-center">
          <div className="w-6 h-6 border-2 rounded mr-3" style={{ borderColor: '#6c757d' }}></div>
          <span style={{ color: '#102e4a' }}>I'm not a robot</span>
          <div className="ml-4 text-xs">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#5887ff' }}>
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleStep1Submit}
        disabled={isLoading}
        className="w-full text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        style={{ 
          background: 'linear-gradient(135deg, #a682ff 0%, #715aff 50%, #5887ff 100%)',
        }}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Verifying...
          </>
        ) : (
          'PROCEED'
        )}
      </button>
       <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to={"/login"} className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Login here
                </Link>
              </p>
            </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Verified Details Section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <h3 className="font-medium text-green-800">Verified Details</h3>
        </div>
        
        {formData.taxPayerType === 'Individual' ? (
          <div className="space-y-2 text-sm text-green-700">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span className="font-medium">Name:</span>
              <span className="ml-2">{(formData.fetchedDetails as IndividualDetails).name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="font-medium">Date of Birth:</span>
              <span className="ml-2">{(formData.fetchedDetails as IndividualDetails).dateOfBirth}</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span className="font-medium">Gender:</span>
              <span className="ml-2">{(formData.fetchedDetails as IndividualDetails).gender}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-sm text-green-700">
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              <span className="font-medium">Company Name:</span>
              <span className="ml-2">{(formData.fetchedDetails as CorporateDetails).companyName}</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span className="font-medium">RC Number:</span>
              <span className="ml-2">{(formData.fetchedDetails as CorporateDetails).rcNumber}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="font-medium">Date of Incorporation:</span>
              <span className="ml-2">{(formData.fetchedDetails as CorporateDetails).dateOfIncorporation}</span>
            </div>
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              <span className="font-medium">Company Type:</span>
              <span className="ml-2">{(formData.fetchedDetails as CorporateDetails).companyType}</span>
            </div>
          </div>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#102e4a' }}>
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border rounded-lg transition-all duration-200"
            style={{ borderColor: '#e9ecef', color: '#102e4a' }}
            placeholder="Enter your email address"
          />
        </div>
      </div>

      {/* Phone Input */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#102e4a' }}>
          Phone Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border rounded-lg transition-all duration-200"
            style={{ borderColor: '#e9ecef', color: '#102e4a' }}
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      {/* Address Input */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#102e4a' }}>
          Address *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border rounded-lg transition-all duration-200 resize-none h-20"
            style={{ borderColor: '#e9ecef', color: '#102e4a' }}
            placeholder="Enter your address"
          />
        </div>
      </div>

      {/* State Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#102e4a' }}>
          State *
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown('state')}
            className="w-full px-4 py-3 bg-white rounded-lg text-left flex items-center justify-between transition-all duration-200 border"
            style={{ 
              borderColor: showDropdown.state ? '#a682ff' : '#e9ecef',
              boxShadow: showDropdown.state ? '0 0 0 2px rgba(166, 130, 255, 0.2)' : 'none'
            }}
          >
            <span style={{ color: formData.state ? '#102e4a' : '#6c757d' }}>
              {formData.state || 'Select State'}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown.state ? 'rotate-180' : ''}`} style={{ color: '#6c757d' }} />
          </button>
          
          {showDropdown.state && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto" style={{ borderColor: '#e9ecef' }}>
              {nigerianStates.map((state) => (
                <button
                  key={state}
                  type="button"
                  onClick={() => selectOption('state', state, 'state')}
                  className="w-full px-4 py-3 text-left transition-colors hover:bg-purple-50"
                  style={{ color: '#102e4a' }}
                >
                  {state}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LGA Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#102e4a' }}>
          Local Government Area *
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown('lga')}
            disabled={!formData.state}
            className="w-full px-4 py-3 bg-white rounded-lg text-left flex items-center justify-between transition-all duration-200 border disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              borderColor: showDropdown.lga ? '#a682ff' : '#e9ecef',
              boxShadow: showDropdown.lga ? '0 0 0 2px rgba(166, 130, 255, 0.2)' : 'none'
            }}
          >
            <span style={{ color: formData.lga ? '#102e4a' : '#6c757d' }}>
              {formData.lga || 'Select LGA'}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown.lga ? 'rotate-180' : ''}`} style={{ color: '#6c757d' }} />
          </button>
          
          {showDropdown.lga && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto" style={{ borderColor: '#e9ecef' }}>
              {getLgasByState(formData.state).map((lga) => (
                <button
                  key={lga}
                  type="button"
                  onClick={() => selectOption('lga', lga, 'lga')}
                  className="w-full px-4 py-3 text-left transition-colors hover:bg-purple-50"
                  style={{ color: '#102e4a' }}
                >
                  {lga}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#102e4a' }}>
          Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border rounded-lg transition-all duration-200"
            style={{ borderColor: '#e9ecef', color: '#102e4a' }}
            placeholder="Enter password (min. 8 characters)"
          />
        </div>
      </div>

      {/* Confirm Password Input */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#102e4a' }}>
          Confirm Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border rounded-lg transition-all duration-200"
            style={{ borderColor: '#e9ecef', color: '#102e4a' }}
            placeholder="Confirm your password"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 border"
          style={{ borderColor: '#e9ecef', color: '#102e4a' }}
        >
          BACK
        </button>
        <button
          onClick={handleStep2Submit}
          disabled={isLoading}
          className="flex-1 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          style={{ 
            background: 'linear-gradient(135deg, #a682ff 0%, #715aff 50%, #5887ff 100%)',
          }}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Creating Account...
            </>
          ) : (
            'CREATE ACCOUNT'
          )}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#22c55e' }}>
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      
      <h2 className="text-3xl font-bold mb-4" style={{ color: '#102e4a' }}>Registration Successful!</h2>
      
      <p className="text-lg mb-6" style={{ color: '#6c757d' }}>
        Your Tax Payer ID account has been created successfully.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
        <h3 className="font-semibold mb-3" style={{ color: '#102e4a' }}>What's Next?</h3>
        <div className="space-y-3 text-sm" style={{ color: '#6c757d' }}>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span>Check your email for a verification link</span>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span>Complete email verification to activate your account</span>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span>Login with your credentials to access tax services</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Link to={"/register"}
          onClick={() => {
            setCurrentStep(1);
            setFormData({
              taxPayerType: 'Individual',
              identificationSystemType: 'BVN',
              identificationNumber: '',
              fetchedDetails: {},
              email: '',
              phone: '',
              address: '',
              state: '',
              lga: '',
              password: '',
              confirmPassword: ''
            });
          }}
          className="flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 border"
          style={{ borderColor: '#e9ecef', color: '#102e4a' }}
        >
          CREATE ANOTHER ACCOUNT
        </Link>
        <Link to={"/login"}
          className="flex-1 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200"
          style={{ 
            background: 'linear-gradient(135deg, #a682ff 0%, #715aff 50%, #5887ff 100%)',
          }}
        >
          GO TO LOGIN
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4" style={{ backgroundColor: '#f0f2ff' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(166,130,255,0.1)_1px,_transparent_0)] bg-[size:40px_40px]"></div>
      
      <div className="relative w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Left Side - Information Panel */}
          <div className="p-8 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #a682ff 0%, #715aff 50%, #5887ff 100%)' }}>
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              {/* Back Button (only show on step 2) */}
              {currentStep === 2 && (
                <button
                  onClick={handleBack}
                  className="mb-6 p-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/20 transition-all duration-200 group"
                  title="Go back"
                >
                  <ArrowLeft className="w-4 h-4 text-white group-hover:text-white transition-colors" />
                </button>
              )}

              {/* Progress Indicator */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                        currentStep >= step 
                          ? 'bg-white text-purple-600'
                          : 'bg-white/20 text-white'
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
                
                <div className="text-xs opacity-80">
                  Step {currentStep} of 3
                </div>
              </div>

              {/* Dynamic Content Based on Step */}
              {currentStep === 1 && (
                <div>
                  <h1 className="text-3xl font-bold mb-4">Create Your Tax Payer ID</h1>
                  <p className="text-white/80 mb-6">
                    Start your journey with our secure registration process. We'll verify your identity and set up your account in just a few steps.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 mr-3 text-white/80" />
                      <span className="text-sm">Secure identity verification</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-3 text-white/80" />
                      <span className="text-sm">Fast & efficient process</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-white/80" />
                      <span className="text-sm">Government verified system</span>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h1 className="text-3xl font-bold mb-4">Complete Your Profile</h1>
                  <p className="text-white/80 mb-6">
                    We've verified your identity! Now let's complete your profile with contact information and create your secure account.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                      <span className="text-sm">Identity verified ✓</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-3 text-white/80" />
                      <span className="text-sm">Personal details confirmed</span>
                    </div>
                    <div className="flex items-center">
                      <Lock className="w-5 h-5 mr-3 text-white/80" />
                      <span className="text-sm">Secure account creation</span>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h1 className="text-3xl font-bold mb-4">Welcome Aboard!</h1>
                  <p className="text-white/80 mb-6">
                    Congratulations! Your Tax Payer ID account has been successfully created. You're now ready to access all our tax services.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                      <span className="text-sm">Account created successfully</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-white/80" />
                      <span className="text-sm">Verification email sent</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-3 text-white/80" />
                      <span className="text-sm">Ready to use tax services</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Form Content */}
          <div className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>
        </div>
      </div>
    </div>
  );
}