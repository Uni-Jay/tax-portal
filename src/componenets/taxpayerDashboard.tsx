import { useState } from 'react';
import {  Settings, Search, Download, FileText, Calendar, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
// import { Link } from 'react-router-dom';

export default function NigeriaTaxpayerDashboard() {
  const [activeMenu, setActiveMenu] = useState('Profile');
  const [expandedSubMenu, setExpandedSubMenu] = useState(null);
  
  const SidebarMenu = [
    {
      label: "Profile",
      icon: "👤",
      route: "/user/profile"
    },
    {
      label: "Tax Assessments",
      icon: "📊",
      route: "/user/assessments"
    },
    {
      label: "Objections & Appeals",
      icon: "⚖️",
      route: "/user/objections"
    },
    {
      label: "Tax Offices",
      icon: "🏢",
      route: "/user/tax-offices"
    },
    {
      label: "Account Management",
      icon: "🔗",
      subMenu: [
        { label: "Merge Accounts", route: "/user/accounts/merge" },
        { label: "Account Settings", route: "/user/accounts/settings" }
      ]
    },
    {
      label: "Payments",
      icon: "💳",
      subMenu: [
        { label: "Generate Bill", route: "/user/payments/generate-bill" },
        { label: "Payment History", route: "/user/payments/history" },
        { label: "Tax Clearance", route: "/user/payments/clearance" }
      ]
    },
    {
      label: "Tax Returns",
      icon: "📋",
      subMenu: [
        { label: "File Returns", route: "/user/returns/file" },
        { label: "Return History", route: "/user/returns/history" },
        { label: "2025 Tax Forms", route: "/user/returns/2025-forms" }
      ]
    },
    {
      label: "LASPPPA",
      icon: "🏠",
      route: "/user/laspppa"
    },
    {
      label: "Tax Consultants",
      icon: "👥",
      route: "/user/consultants"
    },
    {
      label: "Help & Guides",
      icon: "📚",
      subMenu: [
        { label: "2025 Tax Guide", route: "/user/help/2025-guide" },
        { label: "How-to Tutorials", route: "/user/help/tutorials" },
        { label: "FAQ", route: "/user/help/faq" }
      ]
    },
    {
      label: "Logout",
      icon: "🚪",
      route: "/logout"
    }
  ];

  const handleMenuClick = (item) => {
    if (item.label === 'Logout') {
      console.log('Logging out...');
      return;
    }
    
    if (item.subMenu) {
      setExpandedSubMenu(expandedSubMenu === item.label ? null : item.label);
    } else {
      setActiveMenu(item.label);
      setExpandedSubMenu(null);
    }
  };

  const handleSubMenuClick = (subItem, parentLabel) => {
    setActiveMenu(`${parentLabel} - ${subItem.label}`);
  };

  const renderMainContent = () => {
    switch (activeMenu) {
      case 'Profile':
        return (
          <div className="space-y-6">
            {/* New 2025 Tax Law Alert */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold text-green-900">New Nigeria Tax Law 2025 in Effect</h3>
                  <p className="text-green-800 text-sm mt-1">Updated tax rates and compliance requirements are now active. Review your tax obligations for 2025.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Taxpayer Profile</h2>
                <div className="flex space-x-3">
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Generate TCC
                  </button>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">Adebayo Olumide Johnson</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Taxpayer Identification Number (TIN)</label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg font-mono">20123456789-0001</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">March 15, 1985</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">Software Engineer</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">adebayo.johnson@example.com</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">+234 803 123 4567</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address</label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">15 Ademola Adetokunbo Crescent, Victoria Island, Lagos</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State / LGA / LCDA</label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">Lagos / Eti-Osa / Victoria Island</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg border">
                    <h3 className="font-semibold text-gray-900 mb-3">Tax Status 2025</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax Year:</span>
                        <span className="font-medium">2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-green-600 font-medium">Active</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">TCC Status:</span>
                        <span className="text-blue-600 font-medium">Valid</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Next Due:</span>
                        <span className="font-medium">Mar 31, 2026</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">2025 Tax Updates</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• New minimum tax rates</li>
                      <li>• Digital services tax</li>
                      <li>• Updated filing deadlines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Tax Assessments':
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Outstanding</p>
                    <p className="text-2xl font-bold text-red-600">₦1,245,000</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Paid This Year</p>
                    <p className="text-2xl font-bold text-green-600">₦2,180,000</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Assessments</p>
                    <p className="text-2xl font-bold text-yellow-600">3</p>
                  </div>
                  <FileText className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Next Due Date</p>
                    <p className="text-lg font-bold text-blue-600">Mar 31, 2025</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Tax Assessments (2025 Tax Law)</h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search assessments..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Export Report
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Assessment ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tax Year</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tax Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount (₦)</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Due Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-sm">ASS2025001</td>
                      <td className="px-4 py-3">2025</td>
                      <td className="px-4 py-3">Personal Income Tax</td>
                      <td className="px-4 py-3 font-medium">450,000</td>
                      <td className="px-4 py-3">Mar 31, 2025</td>
                      <td className="px-4 py-3">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pending</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-sm mr-2">Pay Now</button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm">View</button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-sm">ASS2025002</td>
                      <td className="px-4 py-3">2025</td>
                      <td className="px-4 py-3">Digital Services Tax (New)</td>
                      <td className="px-4 py-3 font-medium">125,000</td>
                      <td className="px-4 py-3">Jun 30, 2025</td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">New 2025</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-sm mr-2">Pay Now</button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm">View</button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-sm">ASS2024003</td>
                      <td className="px-4 py-3">2024</td>
                      <td className="px-4 py-3">Capital Gains Tax</td>
                      <td className="px-4 py-3 font-medium">85,000</td>
                      <td className="px-4 py-3">Dec 31, 2024</td>
                      <td className="px-4 py-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Paid</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-gray-600 hover:text-gray-800 text-sm">View Receipt</button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-sm">ASS2024002</td>
                      <td className="px-4 py-3">2024</td>
                      <td className="px-4 py-3">Withholding Tax</td>
                      <td className="px-4 py-3 font-medium">670,000</td>
                      <td className="px-4 py-3">Jan 15, 2025</td>
                      <td className="px-4 py-3">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Overdue</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-red-600 hover:text-red-800 text-sm mr-2">Pay Now</button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm">Object</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'Tax Returns - 2025 Tax Forms':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">New 2025 Tax Forms Available</h3>
              <p className="text-blue-800 text-sm">Updated forms reflecting the new Nigeria Tax Law 2025 are now available for download and filing.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">2025 Tax Forms & Returns</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Form PIT-2025</h4>
                      <p className="text-sm text-gray-600">Personal Income Tax Return</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">New</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">Updated for 2025 tax law with new rate bands and digital income provisions.</p>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Download PDF</button>
                    <button className="text-green-600 hover:text-green-800 text-sm">File Online</button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Form DST-2025</h4>
                      <p className="text-sm text-gray-600">Digital Services Tax</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">New 2025</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">New form for digital platform operators and service providers under the 2025 law.</p>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Download PDF</button>
                    <button className="text-green-600 hover:text-green-800 text-sm">File Online</button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Form CGT-2025</h4>
                      <p className="text-sm text-gray-600">Capital Gains Tax Return</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Updated</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">Revised CGT form with updated exemption thresholds under the new law.</p>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Download PDF</button>
                    <button className="text-green-600 hover:text-green-800 text-sm">File Online</button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Filing Deadlines 2025</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Individual Income Tax Returns</p>
                      <p className="text-gray-600">Due: March 31, 2025</p>
                    </div>
                    <div>
                      <p className="font-medium">Digital Services Tax Returns</p>
                      <p className="text-gray-600">Due: June 30, 2025 (Quarterly)</p>
                    </div>
                    <div>
                      <p className="font-medium">Capital Gains Tax Returns</p>
                      <p className="text-gray-600">Due: 90 days from disposal</p>
                    </div>
                    <div>
                      <p className="font-medium">Withholding Tax Returns</p>
                      <p className="text-gray-600">Due: 21 days after month end</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Payments - Generate Bill':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Generate Payment Bill (2025 Tax Year)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Personal Income Tax</option>
                    <option>Digital Services Tax (New 2025)</option>
                    <option>Capital Gains Tax</option>
                    <option>Withholding Tax</option>
                    <option>Minimum Tax</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Year</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>2025</option>
                    <option>2024</option>
                    <option>2023</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Period</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Annual</option>
                    <option>Q1 (Jan-Mar)</option>
                    <option>Q2 (Apr-Jun)</option>
                    <option>Q3 (Jul-Sep)</option>
                    <option>Q4 (Oct-Dec)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Taxable Income (₦)</label>
                  <input
                    type="number"
                    placeholder="Enter taxable income"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">2025 Tax Calculation Preview</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• New progressive rates: 7%, 11%, 15%, 19%, 21%, 24%</p>
                  <p>• Minimum tax: 0.25% of turnover for companies</p>
                  <p>• Digital services tax: 6% on qualifying digital services</p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Calculate & Generate Bill
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        );

      case 'Help & Guides - 2025 Tax Guide':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Nigeria Tax Law 2025 - Complete Guide</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
                    <h3 className="font-semibold text-gray-900 mb-3">Key Changes in 2025</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>New Tax Rates:</strong> Updated progressive tax bands with rates from 7% to 24%</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Digital Services Tax:</strong> 6% tax on digital platform operators and services</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Minimum Tax:</strong> 0.25% of turnover for companies (reduced from 0.5%)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Filing Extensions:</strong> Extended deadlines for certain categories</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">2025 Tax Filing Requirements</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                      <li>All individuals and businesses must file returns by March 31, 2025</li>
                      <li>Digital services providers must register and file quarterly</li>
                      <li>Capital gains tax returns due within 90 days of asset disposal</li>
                      <li>Withholding tax returns due 21 days after month end</li>
                      <li>New minimum tax applies to all companies with turnover</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Resources & Tools</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                      <li><a href="/user/help/2025-guide/download" className="text-blue-600 hover:underline">Download Full 2025 Tax Guide (PDF)</a></li>
                      <li><a href="/user/help/tutorials" className="text-blue-600 hover:underline">View How-to Tutorials</a></li>
                      <li><a href="/user/help/faq" className="text-blue-600 hover:underline">Frequently Asked Questions</a></li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h3 className="font-semibold text-gray-900 mb-3">Important Dates</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• March 31, 2025: Individual Income Tax Returns Due</li>
                      <li>• June 30, 2025: Digital Services Tax Quarterly Filing</li>
                      <li>• Ongoing: Capital Gains Tax on asset disposals</li>
                      <li>• Monthly: Withholding Tax Returns due 21 days after month end</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border">
                    <h3 className="font-semibold text-yellow-900 mb-3">Need Help?</h3>
                    <p className="text-sm text-yellow-800">Contact our support team for assistance with the new tax law and filing requirements.</p>
                    <button className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="text-gray-500">Select a menu item to view content.</div>;
    }
  };
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white border-r p-4">
        <h1 className="text-xl font-bold mb-6">Taxpayer Dashboard</h1>
        <nav>
          {SidebarMenu.map((item) => (
            <div key={item.label} className="mb-2">
              <button
                onClick={() => handleMenuClick(item)}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center space-x-3 ${activeMenu === item.label ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
              {item.subMenu && expandedSubMenu === item.label && (
                <div className="pl-6 mt-2 space-y-1">
                  {item.subMenu.map((subItem) => (
                    <button
                      key={subItem.label}
                      onClick={() => handleSubMenuClick(subItem, item.label)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm ${activeMenu.startsWith(item.label) && activeMenu.endsWith(subItem.label) ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-grow p-6 overflow-y-auto">
        {renderMainContent()}
      </main>
    </div>
  );
}


