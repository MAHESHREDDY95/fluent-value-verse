import { useState, useEffect } from "react";
import { ArrowLeftRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Currency = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState("0");
  const [exchangeRate, setExchangeRate] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [rates, setRates] = useState<Record<string, number>>({});

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
    const fetchRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const data = await response.json();
        if (data.result === 'success') {
          setRates(data.rates);
          const rate = data.rates[toCurrency];
          setExchangeRate(rate.toFixed(4));
          setResult((parseFloat(amount) * rate).toFixed(2));
        } else {
          toast.error("Failed to fetch exchange rates");
        }
      } catch (error) {
        toast.error("Error fetching exchange rates");
        console.error("Error fetching rates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (rates[toCurrency]) {
      const rate = rates[toCurrency];
      setExchangeRate(rate.toFixed(4));
      setResult((parseFloat(amount) * rate).toFixed(2));
    }
  }, [amount, toCurrency, rates]);

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
              <Button 
                onClick={swapCurrencies} 
                variant="outline" 
                size="sm"
                disabled={isLoading}
              >
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Swap Currencies
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}</p>
              <p className="mt-1">Real-time rates from Open Exchange Rates API</p>
              {isLoading && <p className="text-blue-600">Updating rates...</p>}
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
                { from: "USD", to: "INR" },
                { from: "EUR", to: "USD" },
                { from: "GBP", to: "USD" },
                { from: "USD", to: "JPY" },
                { from: "EUR", to: "GBP" },
                { from: "USD", to: "AUD" }
              ].map((pair, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{pair.from}/{pair.to}</span>
                    <span className="text-gray-600">
                      {rates[pair.to] ? (rates[pair.to] / rates[pair.from]).toFixed(4) : "..."}
                    </span>
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
