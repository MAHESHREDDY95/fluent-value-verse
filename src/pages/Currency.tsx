
import { useState, useEffect } from "react";
import { ArrowLeftRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Currency = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("0.85");
  const [exchangeRate, setExchangeRate] = useState("0.85");

  // Mock exchange rates - in a real app, you'd fetch from an API
  const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110.0, INR: 74.5, AUD: 1.35, CAD: 1.25 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129.5, INR: 87.8, AUD: 1.59, CAD: 1.47 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 150.8, INR: 102.1, AUD: 1.85, CAD: 1.71 },
    JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066, INR: 0.68, AUD: 0.012, CAD: 0.011 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.0098, JPY: 1.48, AUD: 0.018, CAD: 0.017 },
    AUD: { USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 81.5, INR: 55.2, CAD: 0.93 },
    CAD: { USD: 0.80, EUR: 0.68, GBP: 0.58, JPY: 88.0, INR: 59.6, AUD: 1.08 }
  };

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" }
  ];

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
      const convertedAmount = parseFloat(amount) * rate;
      setResult(convertedAmount.toFixed(2));
      setExchangeRate(rate.toFixed(4));
    }
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Currency Converter</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Convert Currencies</CardTitle>
            <CardDescription className="text-center">
              Get real-time exchange rates for major world currencies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From Currency */}
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <div className="space-y-2">
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>

              {/* To Currency */}
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <div className="space-y-2">
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <div className="text-2xl font-bold text-green-700">
                      {currencies.find(c => c.code === toCurrency)?.symbol}{result}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={swapCurrencies} variant="outline" size="sm">
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Swap Currencies
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}</p>
              <p className="mt-1">Rates are indicative and may vary from actual market rates</p>
            </div>
          </CardContent>
        </Card>

        {/* Popular Currency Pairs */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Currency Pairs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { from: "USD", to: "EUR", rate: "0.85" },
                { from: "USD", to: "GBP", rate: "0.73" },
                { from: "USD", to: "JPY", rate: "110.00" },
                { from: "EUR", to: "GBP", rate: "0.86" },
                { from: "USD", to: "INR", rate: "74.50" },
                { from: "GBP", to: "INR", rate: "102.10" }
              ].map((pair, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{pair.from}/{pair.to}</span>
                    <span className="text-gray-600">{pair.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Currency;
