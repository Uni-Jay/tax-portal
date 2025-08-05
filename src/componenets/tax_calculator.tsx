import  { useState } from 'react';
import {  User, Building2, TrendingUp, } from 'lucide-react';

type PersonalTaxResult = {
  grossIncome: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
  breakdown: {
    range: string;
    rate: number;
    taxableAmount: number;
    tax: number;
  }[];
};

type CorporateTaxResult = {
  turnover: number;
  taxRate: number;
  tax: number;
  netIncome: number;
  type: string;
};

type TaxResult = PersonalTaxResult | CorporateTaxResult | null;

const TaxCalculator = () => {
  const [calculatorType, setCalculatorType] = useState('personal');
  const [personalIncome, setPersonalIncome] = useState('');
  const [companyTurnover, setCompanyTurnover] = useState('');
  const [companyType, setCompanyType] = useState('small');
  const [taxResults, setTaxResults] = useState<TaxResult>(null);

  // Personal Income Tax Brackets (Progressive rates based on typical Nigerian structure)
  const personalTaxBrackets = [
    { min: 0, max: 300000, rate: 7 },
    { min: 300001, max: 600000, rate: 11 },
    { min: 600001, max: 1100000, rate: 15 },
    { min: 1100001, max: 1600000, rate: 19 },
    { min: 1600001, max: 3200000, rate: 21 },
    { min: 3200001, max: Infinity, rate: 24 }
  ];

  const calculatePersonalTax = (income: number) => {
    let totalTax = 0;
    let remainingIncome = income;
    const breakdown = [];

    for (let bracket of personalTaxBrackets) {
      if (remainingIncome <= 0) break;
      
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min + 1);
      const taxInBracket = taxableInBracket * (bracket.rate / 100);
      
      if (taxableInBracket > 0) {
        breakdown.push({
          range: `₦${bracket.min.toLocaleString()} - ${bracket.max === Infinity ? '∞' : `₦${bracket.max.toLocaleString()}`}`,
          rate: bracket.rate,
          taxableAmount: taxableInBracket,
          tax: taxInBracket
        });
        totalTax += taxInBracket;
        remainingIncome -= taxableInBracket;
      }
    }

    return {
      grossIncome: income,
      totalTax: totalTax,
      netIncome: income - totalTax,
      effectiveRate: (totalTax / income) * 100,
      breakdown: breakdown
    };
  };

  const calculateCorporateTax = (turnover: number, type: string) => {
    let taxRate = 0;
    let taxableIncome = turnover; // Simplified - in reality, this would be profit after expenses
    
    if (type === 'small' && turnover <= 50000000) {
      taxRate = 0; // 0% for small companies with turnover ≤ ₦50 million
    } else if (type === 'medium') {
      taxRate = 20; // Medium companies
    } else if (type === 'large') {
      taxRate = 27.5; // Large companies (2025 rate)
    }

    const tax = (taxableIncome * taxRate) / 100;
    
    return {
      turnover: turnover,
      taxRate: taxRate,
      tax: tax,
      netIncome: turnover - tax,
      type: type
    };
  };

  const handleCalculate = () => {
    if (calculatorType === 'personal') {
      const income = parseFloat(personalIncome);
      if (!isNaN(income) && income > 0) {
        setTaxResults(calculatePersonalTax(income));
      }
    } else {
      const turnover = parseFloat(companyTurnover);
      if (!isNaN(turnover) && turnover > 0) {
        setTaxResults(calculateCorporateTax(turnover, companyType));
      }
    }
  };

  const reset = () => {
    setPersonalIncome('');
    setCompanyTurnover('');
    setTaxResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-emerald-100 sticky top-0 z-50">
        {/* <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                Nigeria Tax Calculator 2025
              </h1>
              <p className="text-emerald-600 text-sm">Based on the New Nigeria Tax Act (NTA) 2025</p>
            </div>
          </div>
        </div> */}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Info Banner
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">About the 2025 Tax Reform</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                President Bola Tinubu signed four landmark Tax Reform Acts into law on June 26, 2025, marking the most significant transformation of Nigeria's tax system in decades. Key changes include new corporate tax rates, revised personal income tax brackets, and simplified compliance requirements.
              </p>
            </div>
          </div>
        </div> */}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-emerald-100">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Tax Calculator</h2>
              
              {/* Calculator Type Toggle */}
              <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
                <button
                  onClick={() => {
                    setCalculatorType('personal');
                    reset();
                  }}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                    calculatorType === 'personal'
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">Personal Income</span>
                </button>
                <button
                  onClick={() => {
                    setCalculatorType('corporate');
                    reset();
                  }}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                    calculatorType === 'corporate'
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium">Corporate Tax</span>
                </button>
              </div>

              {/* Personal Income Tax Form */}
              {calculatorType === 'personal' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Annual Gross Income (₦)
                    </label>
                    <input
                      type="number"
                      value={personalIncome}
                      onChange={(e) => setPersonalIncome(e.target.value)}
                      placeholder="Enter your annual income"
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                    <h4 className="font-semibold text-emerald-800 mb-2">2025 Tax Brackets</h4>
                    <div className="space-y-1 text-sm text-emerald-700">
                      {personalTaxBrackets.map((bracket, index) => (
                        <div key={index} className="flex justify-between">
                          <span>₦{bracket.min.toLocaleString()} - {bracket.max === Infinity ? '∞' : `₦${bracket.max.toLocaleString()}`}</span>
                          <span className="font-medium">{bracket.rate}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Corporate Tax Form */}
              {calculatorType === 'corporate' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Type
                    </label>
                    <select
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all duration-300"
                    >
                      <option value="small">Small Company (≤ ₦50M turnover)</option>
                      <option value="medium">Medium Company</option>
                      <option value="large">Large Company</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Annual Turnover (₦)
                    </label>
                    <input
                      type="number"
                      value={companyTurnover}
                      onChange={(e) => setCompanyTurnover(e.target.value)}
                      placeholder="Enter annual turnover"
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all duration-300"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">2025 Corporate Tax Rates</h4>
                    <div className="space-y-1 text-sm text-blue-700">
                      <div className="flex justify-between">
                        <span>Small Companies (≤ ₦50M)</span>
                        <span className="font-medium">0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medium Companies</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Large Companies</span>
                        <span className="font-medium">27.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Calculate Button */}
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate Tax
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-emerald-100">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Tax Calculation Results</h2>
              
              {!taxResults ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <TrendingUp className="h-16 w-16 mb-4 opacity-30" />
                  <p className="text-lg">Enter your details to see tax calculation</p>
                  <p className="text-sm">Results will appear here</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {calculatorType === 'personal' ? (
                    // Personal Tax Results
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-100">
                          <p className="text-sm text-emerald-600 font-medium">Gross Income</p>
                          <p className="text-2xl font-bold text-emerald-800">
                            ₦
                            {calculatorType === 'personal' && 'grossIncome' in taxResults
                              ? taxResults.grossIncome.toLocaleString()
                              : ''}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-2xl border border-red-100">
                          <p className="text-sm text-red-600 font-medium">Total Tax</p>
                          <p className="text-2xl font-bold text-red-700">
                            ₦{('totalTax' in taxResults ? taxResults.totalTax.toLocaleString() : '')}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
                          <p className="text-sm text-blue-600 font-medium">Net Income</p>
                          <p className="text-2xl font-bold text-blue-800">₦{taxResults.netIncome.toLocaleString()}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-2xl border border-purple-100">
                          <p className="text-sm text-purple-600 font-medium">Effective Rate</p>
                          <p className="text-2xl font-bold text-purple-800">
                            {'effectiveRate' in taxResults ? taxResults.effectiveRate.toFixed(2) : ''}%
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Tax Breakdown</h4>
                        <div className="space-y-2">
                          {'breakdown' in taxResults && taxResults.breakdown.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                              <div>
                                <span className="text-sm text-gray-600">{item.range}</span>
                                <span className="text-xs text-gray-500 ml-2">({item.rate}%)</span>
                              </div>
                              <span className="font-medium text-gray-800">₦{item.tax.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    // Corporate Tax Results
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-100">
                          <p className="text-sm text-emerald-600 font-medium">Annual Turnover</p>
                          <p className="text-2xl font-bold text-emerald-800">
                            ₦{'turnover' in taxResults ? taxResults.turnover.toLocaleString() : ''}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-2xl border border-orange-100">
                          <p className="text-sm text-orange-600 font-medium">Tax Rate</p>
                          <p className="text-2xl font-bold text-orange-800">
                            {'taxRate' in taxResults ? taxResults.taxRate : ''}%
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-2xl border border-red-100">
                          <p className="text-sm text-red-600 font-medium">Corporate Tax</p>
                          <p className="text-2xl font-bold text-red-700">
                            ₦{'tax' in taxResults ? taxResults.tax.toLocaleString() : ''}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
                          <p className="text-sm text-blue-600 font-medium">After-Tax Income</p>
                          <p className="text-2xl font-bold text-blue-800">₦{taxResults.netIncome.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Company Classification</h4>
                        {'type' in taxResults && (
                          <>
                            <p className="text-gray-600 capitalize">{taxResults.type} Company</p>
                            {taxResults.type === 'small' && taxResults.turnover <= 50000000 && (
                              <p className="text-green-600 text-sm mt-2 font-medium">✓ Eligible for 0% corporate tax rate</p>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-12 text-center">
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FileText className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600 font-medium">Disclaimer</span>
            </div>
            <p className="text-sm text-gray-600 max-w-4xl mx-auto leading-relaxed">
              This calculator is based on publicly available information about Nigeria's 2025 Tax Reform Acts. 
              Tax calculations are simplified estimates and may not reflect all applicable deductions, allowances, or special circumstances. 
              Always consult with a qualified tax professional for accurate tax planning and compliance advice.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TaxCalculator;