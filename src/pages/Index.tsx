import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, DollarSign, Activity, Clock, Ruler, Info, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleAd from "@/components/GoogleAd";

const Index = () => {
  const calculators = [
    {
      title: "Currency Converter",
      description: "Convert between different currencies with real-time rates",
      icon: DollarSign,
      path: "/currency",
      color: "bg-green-500"
    },
    {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index and health status",
      icon: Activity,
      path: "/bmi",
      color: "bg-blue-500"
    },
    {
      title: "EMI Calculator",
      description: "Calculate loan EMI, interest and payment schedule",
      icon: Calculator,
      path: "/emi",
      color: "bg-purple-500"
    },
    {
      title: "Units Converter",
      description: "Convert between various units of measurement",
      icon: Ruler,
      path: "/units",
      color: "bg-orange-500"
    },
    {
      title: "Timestamp Converter",
      description: "Convert timestamps and dates between formats",
      icon: Clock,
      path: "/timestamp",
      color: "bg-red-500"
    },
    {
      title: "EPF Calculator",
      description: "Calculate your EPF maturity amount and pension benefits",
      icon: Building2,
      path: "/epf",
      color: "bg-indigo-500"
    },
    {
      title: "Information Hub",
      description: "Learn about conversions, formulas and calculations",
      icon: Info,
      path: "/info",
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">ConvertHub</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/info" className="text-gray-600 hover:text-blue-600 transition-colors">Info</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            All Your Conversion Needs in One Place
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional calculators and converters for currency, BMI, EMI, units, and timestamps. 
            Fast, accurate, and easy to use.
          </p>
        </div>

        {/* Top Ad */}
        <div className="mb-8">
          <GoogleAd slot="YOUR_TOP_AD_SLOT" format="horizontal" style={{ display: 'block', textAlign: 'center' }} />
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className={`${calc.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <calc.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{calc.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {calc.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={calc.path}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Open Calculator
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Middle Ad */}
        <div className="my-8">
          <GoogleAd slot="YOUR_MIDDLE_AD_SLOT" format="horizontal" style={{ display: 'block', textAlign: 'center' }} />
        </div>

        {/* Features Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ConvertHub?</h3>
            <p className="text-lg text-gray-600">Professional tools for accurate calculations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Accurate Calculations</h4>
              <p className="text-gray-600">Precise formulas and real-time data for reliable results</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Real-time Rates</h4>
              <p className="text-gray-600">Live currency exchange rates and updated information</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Easy to Use</h4>
              <p className="text-gray-600">Intuitive interface designed for quick calculations</p>
            </div>
          </div>
        </section>

        {/* Bottom Ad */}
        <div className="mt-8">
          <GoogleAd slot="YOUR_BOTTOM_AD_SLOT" format="horizontal" style={{ display: 'block', textAlign: 'center' }} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 ConvertHub. All rights reserved. Professional conversion tools for everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
