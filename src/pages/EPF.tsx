import { useState, useEffect } from "react";
import { ArrowLeft, Calculator, Info, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EPFCalculation {
  employeeContribution: number;
  employerContribution: number;
  pensionContribution: number;
  totalContribution: number;
  interestEarned: number;
  maturityAmount: number;
  pensionAmount: number;
  yearWiseBreakdown: Array<{
    year: number;
    openingBalance: number;
    contribution: number;
    interest: number;
    closingBalance: number;
  }>;
}

const organizationDeductions = [
  { name: "Standard (12% + 12%)", employeeRate: 0.12, employerRate: 0.12 },
  { name: "Fixed (₹1800 + ₹1800)", employeeRate: 1800, employerRate: 1800, isFixed: true },
  { name: "Custom", employeeRate: 0.12, employerRate: 0.12, isCustom: true }
];

const EPF = () => {
  const [basicSalary, setBasicSalary] = useState<string>("15000");
  const [dearnessAllowance, setDearnessAllowance] = useState<string>("0");
  const [retirementAge, setRetirementAge] = useState<number>(58);
  const [currentAge, setCurrentAge] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(8.15);
  const [calculation, setCalculation] = useState<EPFCalculation | null>(null);
  const [deductionType, setDeductionType] = useState<string>("Standard (12% + 12%)");
  const [customEmployeeRate, setCustomEmployeeRate] = useState<string>("12");
  const [customEmployerRate, setCustomEmployerRate] = useState<string>("12");
  const [pensionRate, setPensionRate] = useState<number>(8.33);

  const calculateEPF = () => {
    const basic = parseFloat(basicSalary) || 0;
    const da = parseFloat(dearnessAllowance) || 0;
    const wage = basic + da;
    const years = retirementAge - currentAge;
    
    // Get deduction rates based on selected type
    const selectedDeduction = organizationDeductions.find(d => d.name === deductionType);
    let employeeContribution, employerContribution;

    if (selectedDeduction?.isFixed) {
      employeeContribution = selectedDeduction.employeeRate;
      employerContribution = selectedDeduction.employerRate;
    } else if (selectedDeduction?.isCustom) {
      const employeeRate = parseFloat(customEmployeeRate) / 100;
      const employerRate = parseFloat(customEmployerRate) / 100;
      employeeContribution = Math.min(wage * employeeRate, 21600);
      employerContribution = Math.min(wage * employerRate, 21600);
    } else {
      employeeContribution = Math.min(wage * 0.12, 21600);
      employerContribution = Math.min(wage * 0.12, 21600);
    }

    // Calculate pension contribution (8.33% of employer's contribution)
    const pensionContribution = Math.min(employerContribution * (pensionRate / 100), 1500);
    const totalContribution = employeeContribution + employerContribution;

    // Year-wise breakdown
    const yearWiseBreakdown = [];
    let balance = 0;
    let totalInterest = 0;
    let totalPensionContribution = 0;

    for (let year = 1; year <= years; year++) {
      const openingBalance = balance;
      const contribution = totalContribution * 12;
      const interest = (openingBalance + contribution) * (interestRate / 100);
      balance = openingBalance + contribution + interest;
      totalInterest += interest;
      totalPensionContribution += pensionContribution * 12;

      yearWiseBreakdown.push({
        year,
        openingBalance,
        contribution,
        interest,
        closingBalance: balance
      });
    }

    setCalculation({
      employeeContribution,
      employerContribution,
      pensionContribution,
      totalContribution,
      interestEarned: totalInterest,
      maturityAmount: balance,
      pensionAmount: totalPensionContribution,
      yearWiseBreakdown
    });
  };

  useEffect(() => {
    calculateEPF();
  }, [basicSalary, dearnessAllowance, retirementAge, currentAge, interestRate, deductionType, customEmployeeRate, customEmployerRate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">EPF Calculator</h1>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calculator className="h-4 w-4 mr-2" />
              Open Calculator
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Calculate Your EPF</CardTitle>
              <CardDescription>
                Estimate your EPF maturity amount and contributions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="deductionType">Organization Deduction Type</Label>
                  <Select value={deductionType} onValueChange={setDeductionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select deduction type" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationDeductions.map((type) => (
                        <SelectItem key={type.name} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {deductionType === "Custom" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customEmployeeRate">Employee Rate (%)</Label>
                      <Input
                        id="customEmployeeRate"
                        type="number"
                        value={customEmployeeRate}
                        onChange={(e) => setCustomEmployeeRate(e.target.value)}
                        placeholder="Enter rate"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customEmployerRate">Employer Rate (%)</Label>
                      <Input
                        id="customEmployerRate"
                        type="number"
                        value={customEmployerRate}
                        onChange={(e) => setCustomEmployerRate(e.target.value)}
                        placeholder="Enter rate"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="basicSalary">Basic Salary (₹)</Label>
                  <Input
                    id="basicSalary"
                    type="number"
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(e.target.value)}
                    placeholder="Enter basic salary"
                  />
                </div>

                <div>
                  <Label htmlFor="dearnessAllowance">Dearness Allowance (₹)</Label>
                  <Input
                    id="dearnessAllowance"
                    type="number"
                    value={dearnessAllowance}
                    onChange={(e) => setDearnessAllowance(e.target.value)}
                    placeholder="Enter DA"
                  />
                </div>

                <div>
                  <Label>Current Age: {currentAge} years</Label>
                  <Slider
                    value={[currentAge]}
                    onValueChange={(value) => setCurrentAge(value[0])}
                    min={18}
                    max={58}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Retirement Age: {retirementAge} years</Label>
                  <Slider
                    value={[retirementAge]}
                    onValueChange={(value) => setRetirementAge(value[0])}
                    min={58}
                    max={65}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Interest Rate: {interestRate}%</Label>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    min={7}
                    max={9}
                    step={0.05}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle>EPF Calculation Results</CardTitle>
              <CardDescription>
                Your estimated EPF maturity details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {calculation && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-blue-600">Monthly Contribution</div>
                      <div className="text-2xl font-bold">₹{calculation.totalContribution.toFixed(2)}</div>
                      <div className="text-xs text-blue-500">
                        Employee: ₹{calculation.employeeContribution.toFixed(2)} + 
                        Employer: ₹{calculation.employerContribution.toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-green-600">Interest Earned</div>
                      <div className="text-2xl font-bold">₹{calculation.interestEarned.toFixed(2)}</div>
                      <div className="text-xs text-green-500">Over {retirementAge - currentAge} years</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-sm text-purple-600">EPF Maturity Amount</div>
                      <div className="text-3xl font-bold">₹{calculation.maturityAmount.toFixed(2)}</div>
                      <div className="text-xs text-purple-500">At retirement age {retirementAge}</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-sm text-orange-600">Pension Amount</div>
                      <div className="text-3xl font-bold">₹{calculation.pensionAmount.toFixed(2)}</div>
                      <div className="text-xs text-orange-500">Total pension contribution</div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="text-sm text-indigo-600">Total Retirement Corpus</div>
                    <div className="text-3xl font-bold">₹{(calculation.maturityAmount + calculation.pensionAmount).toFixed(2)}</div>
                    <div className="text-xs text-indigo-500">EPF + Pension at retirement</div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Year-wise Breakdown</h3>
                    <div className="max-h-60 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 text-left">Year</th>
                            <th className="p-2 text-right">Opening</th>
                            <th className="p-2 text-right">Contribution</th>
                            <th className="p-2 text-right">Interest</th>
                            <th className="p-2 text-right">Closing</th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculation.yearWiseBreakdown.map((year) => (
                            <tr key={year.year} className="border-t">
                              <td className="p-2">{year.year}</td>
                              <td className="p-2 text-right">₹{year.openingBalance.toFixed(2)}</td>
                              <td className="p-2 text-right">₹{year.contribution.toFixed(2)}</td>
                              <td className="p-2 text-right">₹{year.interest.toFixed(2)}</td>
                              <td className="p-2 text-right">₹{year.closingBalance.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" />
              About EPF
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p>
                The Employee Provident Fund (EPF) is a retirement benefits scheme in which employees of an organization contribute a portion of their basic salary and dearness allowance every month. The employer also contributes an equal amount to the employee's EPF account.
              </p>
              <h3>Key Features:</h3>
              <ul>
                <li>Employee contribution: 12% of basic salary + DA (or fixed amount)</li>
                <li>Employer contribution: 12% of basic salary + DA (or fixed amount)</li>
                <li>Maximum contribution limit: ₹21,600 per month</li>
                <li>Current interest rate: 8.15% per annum</li>
                <li>Tax benefits under Section 80C</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Note: This calculator provides an estimate based on current rules and rates. Actual returns may vary based on changes in interest rates and government policies.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EPF; 