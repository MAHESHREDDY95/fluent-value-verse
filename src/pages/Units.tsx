
import { useState } from "react";
import { ArrowLeft, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Units = () => {
  const [lengthValue, setLengthValue] = useState("1");
  const [lengthFrom, setLengthFrom] = useState("meter");
  const [lengthTo, setLengthTo] = useState("feet");
  const [lengthResult, setLengthResult] = useState("3.28");

  const [weightValue, setWeightValue] = useState("1");
  const [weightFrom, setWeightFrom] = useState("kilogram");
  const [weightTo, setWeightTo] = useState("pound");
  const [weightResult, setWeightResult] = useState("2.20");

  const lengthUnits = [
    { value: "meter", label: "Meter (m)" },
    { value: "feet", label: "Feet (ft)" },
    { value: "inch", label: "Inch (in)" },
    { value: "centimeter", label: "Centimeter (cm)" },
    { value: "kilometer", label: "Kilometer (km)" },
    { value: "mile", label: "Mile (mi)" }
  ];

  const weightUnits = [
    { value: "kilogram", label: "Kilogram (kg)" },
    { value: "pound", label: "Pound (lb)" },
    { value: "gram", label: "Gram (g)" },
    { value: "ounce", label: "Ounce (oz)" },
    { value: "ton", label: "Ton (t)" }
  ];

  const convertLength = () => {
    const conversions = {
      meter: { feet: 3.28084, inch: 39.3701, centimeter: 100, kilometer: 0.001, mile: 0.000621371 },
      feet: { meter: 0.3048, inch: 12, centimeter: 30.48, kilometer: 0.0003048, mile: 0.000189394 },
      inch: { meter: 0.0254, feet: 0.0833333, centimeter: 2.54, kilometer: 0.0000254, mile: 0.0000157828 },
      centimeter: { meter: 0.01, feet: 0.0328084, inch: 0.393701, kilometer: 0.00001, mile: 0.00000621371 },
      kilometer: { meter: 1000, feet: 3280.84, inch: 39370.1, centimeter: 100000, mile: 0.621371 },
      mile: { meter: 1609.34, feet: 5280, inch: 63360, centimeter: 160934, kilometer: 1.60934 }
    };

    const value = parseFloat(lengthValue);
    if (lengthFrom === lengthTo) {
      setLengthResult(value.toString());
    } else {
      const result = value * conversions[lengthFrom][lengthTo];
      setLengthResult(result.toFixed(6));
    }
  };

  const convertWeight = () => {
    const conversions = {
      kilogram: { pound: 2.20462, gram: 1000, ounce: 35.274, ton: 0.001 },
      pound: { kilogram: 0.453592, gram: 453.592, ounce: 16, ton: 0.000453592 },
      gram: { kilogram: 0.001, pound: 0.00220462, ounce: 0.035274, ton: 0.000001 },
      ounce: { kilogram: 0.0283495, pound: 0.0625, gram: 28.3495, ton: 0.0000283495 },
      ton: { kilogram: 1000, pound: 2204.62, gram: 1000000, ounce: 35274 }
    };

    const value = parseFloat(weightValue);
    if (weightFrom === weightTo) {
      setWeightResult(value.toString());
    } else {
      const result = value * conversions[weightFrom][weightTo];
      setWeightResult(result.toFixed(6));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Units Converter</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Ruler className="h-6 w-6" />
              Convert Units
            </CardTitle>
            <CardDescription className="text-center">
              Convert between different units of measurement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="length" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="length">Length</TabsTrigger>
                <TabsTrigger value="weight">Weight</TabsTrigger>
              </TabsList>
              
              <TabsContent value="length" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From</label>
                    <Select value={lengthFrom} onValueChange={setLengthFrom}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {lengthUnits.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Enter value"
                      value={lengthValue}
                      onChange={(e) => setLengthValue(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">To</label>
                    <Select value={lengthTo} onValueChange={setLengthTo}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {lengthUnits.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
                      <div className="text-2xl font-bold text-orange-700">{lengthResult}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button onClick={convertLength} className="bg-orange-600 hover:bg-orange-700">
                    Convert Length
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="weight" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From</label>
                    <Select value={weightFrom} onValueChange={setWeightFrom}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {weightUnits.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Enter value"
                      value={weightValue}
                      onChange={(e) => setWeightValue(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">To</label>
                    <Select value={weightTo} onValueChange={setWeightTo}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {weightUnits.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
                      <div className="text-2xl font-bold text-orange-700">{weightResult}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button onClick={convertWeight} className="bg-orange-600 hover:bg-orange-700">
                    Convert Weight
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Units;
