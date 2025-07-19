import { useState, useEffect } from 'react';
import { FileText, Receipt, Award, Menu, X, Home, Calculator, HelpCircle, Phone, ChevronDown, Users, TrendingUp, Shield } from 'lucide-react';
import TaxCalculator from '../componenets/tax_calculator';
import { Link } from 'react-router-dom';

export default function IRSLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a682ff 0%, #715aff 50%, #5887ff 100%)' }}>
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold" style={{ color: '#102e4a' }}>TIRS</h1>
                <p className="text-xs" style={{ color: '#6c757d' }}>Tax Internal Revenue Service</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="transition-colors duration-200 font-medium" style={{ color: '#6c757d' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#a682ff')} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6c757d')}>Tax Info</a>
              <a href="#" className="transition-colors duration-200 font-medium" style={{ color: '#6c757d' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#a682ff')} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6c757d')}>News</a>
              <a href="#" className="transition-colors duration-200 font-medium" style={{ color: '#6c757d' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#a682ff')} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6c757d')}>e-Tax</a>
              <div className="relative group">
                <button className="transition-colors duration-200 font-medium flex items-center" style={{ color: '#6c757d' }}>
                  Services <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="#" className="block px-4 py-3 rounded-t-lg transition-colors" style={{ color: '#6c757d' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#a682ff')} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6c757d')}>Tax Returns</a>
                  <a href="#" className="block px-4 py-3 transition-colors" style={{ color: '#6c757d' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#a682ff')} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6c757d')}>Bill Generation</a>
                  <a href="#" className="block px-4 py-3 rounded-b-lg transition-colors" style={{ color: '#6c757d' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#a682ff')} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6c757d')}>Tax Clearance</a>
                </div>
              </div>
              <a href="#" className="transition-colors duration-200 font-medium" style={{ color: '#6c757d' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#a682ff')} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6c757d')}>Contact</a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to={"/login"} className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <button onClick={toggleMenu} className="md:hidden" style={{ color: '#102e4a' }}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md transition-colors" style={{ color: '#6c757d' }} onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#f0f2ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>Tax Info</a>
              <a href="#" className="block px-3 py-2 rounded-md transition-colors" style={{ color: '#6c757d' }} onMouseEnter={(e) =>(e.target as HTMLElement).style.backgroundColor = '#f0f2ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>News</a>
              <a href="#" className="block px-3 py-2 rounded-md transition-colors" style={{ color: '#6c757d' }} onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#f0f2ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>e-Tax</a>
              <a href="#" className="block px-3 py-2 rounded-md transition-colors" style={{ color: '#6c757d' }} onMouseEnter={(e) =>(e.target as HTMLElement).style.backgroundColor = '#f0f2ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>Services</a>
              <a href="#" className="block px-3 py-2 rounded-md transition-colors" style={{ color: '#6c757d' }} onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#f0f2ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>Contact</a>
              <div className="flex space-x-2 px-3 pt-2">
                <Link to={"/login"} className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #a682ff 0%, #715aff 30%, #5887ff 70%, #102e4a 100%)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_0)] bg-[size:40px_40px]"></div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Pay Taxes,
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Let's Grow Together!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Simplifying tax compliance for Tax residents and businesses. Experience seamless digital tax services with IRS.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to={"/login"} className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                Login to e-Tax
              </Link>
            </div>

            {/* Partnership Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-white/80">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">+4 IRS Partnership</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">+4 Bomes Resources Consulting</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Trusted by 100k+ taxpayers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="py-20" style={{ backgroundColor: '#f0f2ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#102e4a' }}>Quick Access Services</h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6c757d' }}>
              Complete your tax obligations quickly and efficiently with our digital services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* File Returns Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #a682ff 0%, #715aff 100%)' }}>
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#102e4a' }}>File Returns</h3>
              <p className="mb-6 leading-relaxed" style={{ color: '#6c757d' }}>
                Submit your tax returns online with our user-friendly digital platform. Fast, secure, and available 24/7.
              </p>
              <button className="font-semibold transition-colors duration-200 flex items-center" style={{ color: '#a682ff' }}>
                Get Started <ChevronDown className="ml-2 w-4 h-4 rotate-[-90deg]" />
              </button>
            </div>

            {/* Generate Bill Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #715aff 0%, #5887ff 100%)' }}>
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#102e4a' }}>Generate Bill</h3>
              <p className="mb-6 leading-relaxed" style={{ color: '#6c757d' }}>
                Calculate and generate your tax bills instantly. Get accurate assessments based on current tax rates and regulations.
              </p>
              <button className="font-semibold transition-colors duration-200 flex items-center" style={{ color: '#715aff' }}>
                Calculate Now <ChevronDown className="ml-2 w-4 h-4 rotate-[-90deg]" />
              </button>
            </div>

            {/* Get TCC Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #5887ff 0%, #102e4a 100%)' }}>
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#102e4a' }}>Get TCC</h3>
              <p className="mb-6 leading-relaxed" style={{ color: '#6c757d' }}>
                Apply for and download your Tax Clearance Certificate online. Required for business registration and contract bids.
              </p>
              <button className="font-semibold transition-colors duration-200 flex items-center" style={{ color: '#5887ff' }}>
                Apply Now <ChevronDown className="ml-2 w-4 h-4 rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Calculator Section Placeholder */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#102e4a' }}>Tax Calculator</h2>
          <p className="text-xl mb-8" style={{ color: '#6c757d' }}>
            Calculate your tax obligations with our interactive tax calculator
          </p>
          <TaxCalculator/>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-white py-12" style={{ backgroundColor: '#102e4a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About TIRS</h3>
              <p className="mb-4" style={{ color: '#6c757d' }}>
                The Tax Internal Revenue Service (IRS) is committed to providing efficient tax services to the residents and businesses of Tax State. Our mission is to ensure compliance with tax laws while promoting voluntary tax payment through innovative digital solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="transition-colors duration-200" style={{ color: '#6c757d' }} onMouseEnter={(e) =>(e.target as HTMLElement).style.color = '#a682ff'} onMouseLeave={(e) =>(e.target as HTMLElement).style.color = '#6c757d'}>
                  <FileText className="w-5 h-5" />
                </a>
                <a href="#" className="transition-colors duration-200" style={{ color: '#6c757d' }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#a682ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#6c757d'}>
                  <Receipt className="w-5 h-5" />
                </a>
                <a href="#" className="transition-colors duration-200" style={{ color: '#6c757d' }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#a682ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#6c757d'}>
                  <Award className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Quick Links Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="transition-colors duration-200" style={{ color: '#6c757d' }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#a682ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#6c757d'}>Tax Information</a>
                </li>
                <li>
                  <a href="#" className="transition-colors duration-200" style={{ color: '#6c757d' }} onMouseEnter={(e) =>(e.target as HTMLElement).style.color = '#a682ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#6c757d'}>News & Updates</a>
                </li>
                <li>
                  <a href="#" className="transition-colors duration-200" style={{ color: '#6c757d' }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#a682ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#6c757d'}>e-Tax Portal</a>
                </li>
                <li>
                  <a href="#" className="transition-colors duration-200" style={{ color: '#6c757d' }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#a682ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#6c757d'}>Contact Us</a>
                </li>
              </ul>
            </div>
            
            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="mb-2" style={{ color: '#6c757d' }}>Tax Internal Revenue Service</p>
              <p className="mb-2" style={{ color: '#6c757d' }}>123 Tax Avenue, Tax  Nigeria</p>
              <p className="mb-2" style={{ color: '#6c757d' }}>Phone: +234 123 4567</p>
              <p className="mb-2" style={{ color: '#6c757d' }}>Email: <a href="mailto:info@irs.gov.ng" className="text-white hover:underline" style={{ color: '#a682ff' }}>info@irs.gov.ng</a></p>
            </div>
          </div>
          
          <div className="mt-12 border-t pt-6 text-center text-sm" style={{ borderColor: '#6c757d', color: '#6c757d' }}>
            &copy; {new Date().getFullYear()} Tax Internal Revenue Service. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Quick Links Mobile Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 md:hidden z-40" style={{ borderColor: '#f0f2ff' }}>
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center space-y-1 transition-colors duration-200" style={{ color: '#6c757d' }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#a682ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#6c757d'}>
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1 transition-colors duration-200" style={{ color: '#6c757d' }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#a682ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#6c757d'}>
            <Calculator className="w-6 h-6" />
            <span className="text-xs font-medium">e-Tax</span>
          </button>
          <button className="flex flex-col items-center space-y-1 transition-colors duration-200" style={{ color: '#6c757d' }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#a682ff'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#6c757d'}>
            <HelpCircle className="w-6 h-6" />
            <span className="text-xs font-medium">Help</span>
          </button>
          <button className="flex flex-col items-center space-y-1 transition-colors duration-200" style={{ color: '#6c757d' }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#a682ff'} onMouseLeave={(e) =>(e.target as HTMLElement).style.color = '#6c757d'}>
            <Phone className="w-6 h-6" />
            <span className="text-xs font-medium">Contact</span>
          </button>
        </div>
      </div>

      {/* Add padding bottom for mobile to account for sticky footer */}
      <div className="md:hidden pb-20"></div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
}