
import { useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Timestamp = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [humanDate, setHumanDate] = useState(new Date().toISOString().slice(0, 16));
  const [timestampResult, setTimestampResult] = useState("");
  const [humanResult, setHumanResult] = useState("");

  const convertToHuman = () => {
    const ts = parseInt(timestamp);
    if (ts) {
      const date = new Date(ts * 1000);
      setTimestampResult(date.toLocaleString());
    }
  };

  const convertToTimestamp = () => {
    const date = new Date(humanDate);
    if (date.getTime()) {
      setHumanResult(Math.floor(date.getTime() / 1000).toString());
    }
  };

  const getCurrentTimestamp = () => {
    const current = Math.floor(Date.now() / 1000);
    setTimestamp(current.toString());
    setTimestampResult(new Date(current * 1000).toLocaleString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Timestamp Converter</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Clock className="h-6 w-6" />
              Convert Timestamps
            </CardTitle>
            <CardDescription className="text-center">
              Convert between Unix timestamps and human-readable dates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="to-human" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="to-human">Timestamp to Date</TabsTrigger>
                <TabsTrigger value="to-timestamp">Date to Timestamp</TabsTrigger>
              </TabsList>
              
              <TabsContent value="to-human" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Unix Timestamp</label>
                    <Input
                      type="number"
                      placeholder="Enter Unix timestamp"
                      value={timestamp}
                      onChange={(e) => setTimestamp(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={convertToHuman} className="bg-red-600 hover:bg-red-700">
                      Convert to Date
                    </Button>
                    <Button onClick={getCurrentTimestamp} variant="outline">
                      Use Current Time
                    </Button>
                  </div>

                  {timestampResult && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <label className="text-sm font-medium text-red-800">Human-readable Date:</label>
                      <div className="text-lg font-mono text-red-700">{timestampResult}</div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="to-timestamp" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date and Time</label>
                    <Input
                      type="datetime-local"
                      value={humanDate}
                      onChange={(e) => setHumanDate(e.target.value)}
                    />
                  </div>

                  <Button onClick={convertToTimestamp} className="bg-red-600 hover:bg-red-700">
                    Convert to Timestamp
                  </Button>

                  {humanResult && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <label className="text-sm font-medium text-red-800">Unix Timestamp:</label>
                      <div className="text-lg font-mono text-red-700">{humanResult}</div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">About Unix Timestamps</h3>
              <p className="text-sm text-gray-600 mb-2">
                Unix timestamp is the number of seconds since January 1, 1970, 00:00:00 UTC.
              </p>
              <p className="text-sm text-gray-600">
                Current timestamp: <span className="font-mono">{Math.floor(Date.now() / 1000)}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Timestamp;
