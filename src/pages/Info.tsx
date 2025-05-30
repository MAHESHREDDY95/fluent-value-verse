
import { ArrowLeft, BookOpen, Calculator, DollarSign, Activity, Ruler, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Info = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Information Hub</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <BookOpen className="h-6 w-6" />
              Learn About Conversions & Calculations
            </CardTitle>
            <CardDescription className="text-center">
              Comprehensive information about formulas, calculations, and conversion methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="currency" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="currency">Currency</TabsTrigger>
                <TabsTrigger value="bmi">BMI</TabsTrigger>
                <TabsTrigger value="emi">EMI</TabsTrigger>
                <TabsTrigger value="units">Units</TabsTrigger>
                <TabsTrigger value="timestamp">Timestamp</TabsTrigger>
              </TabsList>
              
              <TabsContent value="currency" className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <h3 className="text-xl font-semibold">Currency Conversion</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">How Currency Conversion Works</h4>
                    <p className="text-gray-600">
                      Currency conversion is the process of exchanging one currency for another at a specific rate. 
                      Exchange rates fluctuate constantly based on economic factors, supply and demand, and market conditions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Formula</h4>
                    <p className="font-mono bg-gray-100 p-2 rounded">
                      Converted Amount = Original Amount × Exchange Rate
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Major Currency Pairs</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>EUR/USD - Euro to US Dollar</li>
                      <li>GBP/USD - British Pound to US Dollar</li>
                      <li>USD/JPY - US Dollar to Japanese Yen</li>
                      <li>USD/CHF - US Dollar to Swiss Franc</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bmi" className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-semibold">Body Mass Index (BMI)</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">What is BMI?</h4>
                    <p className="text-gray-600">
                      BMI is a measure of body fat based on height and weight. It's used as a screening tool 
                      to categorize individuals into different weight categories.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Formula</h4>
                    <p className="font-mono bg-gray-100 p-2 rounded">
                      BMI = Weight (kg) / (Height (m))²
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">BMI Categories</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Underweight: BMI less than 18.5</li>
                      <li>Normal weight: BMI 18.5-24.9</li>
                      <li>Overweight: BMI 25-29.9</li>
                      <li>Obese: BMI 30 or greater</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="emi" className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="h-5 w-5 text-purple-600" />
                  <h3 className="text-xl font-semibold">Equated Monthly Installment (EMI)</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">What is EMI?</h4>
                    <p className="text-gray-600">
                      EMI is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. 
                      It includes both principal and interest components.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Formula</h4>
                    <p className="font-mono bg-gray-100 p-2 rounded text-sm">
                      EMI = [P × R × (1+R)ⁿ] / [(1+R)ⁿ-1]
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Where: P = Principal, R = Monthly Interest Rate, N = Number of Monthly Installments
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Types of Loans</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Home Loans: Typically 15-30 years tenure</li>
                      <li>Car Loans: Usually 3-7 years tenure</li>
                      <li>Personal Loans: Generally 1-5 years tenure</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="units" className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Ruler className="h-5 w-5 text-orange-600" />
                  <h3 className="text-xl font-semibold">Unit Conversions</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Common Unit Systems</h4>
                    <p className="text-gray-600">
                      Unit conversion involves changing a measurement from one unit to another while maintaining the same quantity.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Length Conversions</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>1 meter = 3.28084 feet</li>
                      <li>1 inch = 2.54 centimeters</li>
                      <li>1 kilometer = 0.621371 miles</li>
                      <li>1 yard = 0.9144 meters</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Weight Conversions</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>1 kilogram = 2.20462 pounds</li>
                      <li>1 pound = 16 ounces</li>
                      <li>1 ton = 1000 kilograms</li>
                      <li>1 ounce = 28.3495 grams</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timestamp" className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-red-600" />
                  <h3 className="text-xl font-semibold">Unix Timestamps</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">What is Unix Timestamp?</h4>
                    <p className="text-gray-600">
                      Unix timestamp is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC. 
                      It's a standard way to represent time in programming and databases.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Why Use Timestamps?</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Universal time representation</li>
                      <li>Easy calculations and comparisons</li>
                      <li>No timezone confusion</li>
                      <li>Efficient storage in databases</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Common Use Cases</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Log files and system events</li>
                      <li>Database records</li>
                      <li>API responses</li>
                      <li>File creation/modification times</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Info;
