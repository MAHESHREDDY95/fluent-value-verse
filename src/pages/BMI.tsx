
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const BMI = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [categoryColor, setCategoryColor] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) return;

    let heightInMeters: number;
    let weightInKg: number;

    if (unit === "metric") {
      heightInMeters = parseFloat(height) / 100; // cm to meters
      weightInKg = parseFloat(weight);
    } else {
      // Imperial: height in inches, weight in pounds
      heightInMeters = parseFloat(height) * 0.0254; // inches to meters
      weightInKg = parseFloat(weight) * 0.453592; // pounds to kg
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(parseFloat(bmiValue.toFixed(1)));

    // Determine category
    if (bmiValue < 18.5) {
      setCategory("Underweight");
      setCategoryColor("text-blue-600 bg-blue-50");
    } else if (bmiValue < 25) {
      setCategory("Normal weight");
      setCategoryColor("text-green-600 bg-green-50");
    } else if (bmiValue < 30) {
      setCategory("Overweight");
      setCategoryColor("text-yellow-600 bg-yellow-50");
    } else {
      setCategory("Obese");
      setCategoryColor("text-red-600 bg-red-50");
    }
  };

  useEffect(() => {
    if (height && weight) {
      calculateBMI();
    }
  }, [height, weight, unit]);

  const bmiCategories = [
    { range: "Below 18.5", category: "Underweight", color: "border-blue-200 bg-blue-50" },
    { range: "18.5 - 24.9", category: "Normal weight", color: "border-green-200 bg-green-50" },
    { range: "25.0 - 29.9", category: "Overweight", color: "border-yellow-200 bg-yellow-50" },
    { range: "30.0 and above", category: "Obese", color: "border-red-200 bg-red-50" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">BMI Calculator</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <Card>
            <CardHeader>
              <CardTitle>Calculate Your BMI</CardTitle>
              <CardDescription>
                Body Mass Index (BMI) is a measure of body fat based on height and weight
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">Units</Label>
                <RadioGroup value={unit} onValueChange={setUnit} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metric" id="metric" />
                    <Label htmlFor="metric">Metric (cm, kg)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imperial" id="imperial" />
                    <Label htmlFor="imperial">Imperial (in, lbs)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">
                    Height {unit === "metric" ? "(cm)" : "(inches)"}
                  </Label>
                  <Input
                    type="number"
                    placeholder={unit === "metric" ? "170" : "67"}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Weight {unit === "metric" ? "(kg)" : "(lbs)"}
                  </Label>
                  <Input
                    type="number"
                    placeholder={unit === "metric" ? "70" : "154"}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {bmi && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{bmi}</div>
                    <div className="text-sm text-gray-600">Your BMI</div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border-2 text-center ${categoryColor}`}>
                    <div className="font-semibold">{category}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* BMI Categories */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>BMI Categories</CardTitle>
                <CardDescription>
                  Understanding what your BMI means
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bmiCategories.map((cat, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${cat.color}`}>
                      <div className="flex justify-between">
                        <span className="font-medium">{cat.category}</span>
                        <span className="text-sm text-gray-600">{cat.range}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>• BMI is a screening tool and not a diagnostic tool</p>
                <p>• It may not be accurate for athletes with high muscle mass</p>
                <p>• Age, sex, and body composition can affect BMI interpretation</p>
                <p>• Consult healthcare professionals for personalized advice</p>
                <p>• BMI is one of many factors to consider for health assessment</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMI;
