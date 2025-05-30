import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calculator, DollarSign, Activity, Clock, Ruler, Info, Building2, 
  Thermometer, Weight, Zap, Droplet, Sun, Magnet, Radio, Flame,
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GoogleAd from "@/components/GoogleAd";

type ConverterItem = {
  title: string;
  description: string;
  icon: JSX.Element;
  href: string;
  color: string;
  section?: string;
};

const calculators: ConverterItem[] = [
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    icon: <Calculator className="h-6 w-6" />,
    href: "/bmi",
    color: "bg-blue-500"
  },
  {
    title: "EMI Calculator",
    description: "Calculate your loan EMI",
    icon: <DollarSign className="h-6 w-6" />,
    href: "/emi",
    color: "bg-green-500"
  },
  {
    title: "Currency Converter",
    description: "Convert between different currencies",
    icon: <DollarSign className="h-6 w-6" />,
    href: "/currency",
    color: "bg-purple-500"
  },
  {
    title: "Timestamp Converter",
    description: "Convert between different time formats",
    icon: <Clock className="h-6 w-6" />,
    href: "/timestamp",
    color: "bg-orange-500"
  },
  {
    title: "Units Converter",
    description: "Convert between different units",
    icon: <Ruler className="h-6 w-6" />,
    href: "/units",
    color: "bg-indigo-500"
  },
  {
    title: "EPF Calculator",
    description: "Calculate your EPF maturity amount and pension benefits",
    icon: <Building2 className="h-6 w-6" />,
    href: "/epf",
    color: "bg-teal-500"
  },
  {
    title: "Information Hub",
    description: "Learn about conversions, formulas and calculations",
    icon: <Info className="h-6 w-6" />,
    href: "/info",
    color: "bg-cyan-500"
  }
];

const engineeringConverters: ConverterItem[] = [
  {
    title: "Length",
    description: "Convert between different units of length",
    icon: <Ruler className="h-6 w-6" />,
    href: "/units?type=length",
    color: "bg-blue-500"
  },
  {
    title: "Volume",
    description: "Convert between different units of volume",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=volume",
    color: "bg-green-500"
  },
  {
    title: "Area",
    description: "Convert between different units of area",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=area",
    color: "bg-purple-500"
  },
  {
    title: "Speed",
    description: "Convert between different units of speed",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=speed",
    color: "bg-red-500"
  },
  {
    title: "Energy",
    description: "Convert between different units of energy",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=energy",
    color: "bg-yellow-500"
  },
  {
    title: "Force",
    description: "Convert between different units of force",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=force",
    color: "bg-indigo-500"
  },
  {
    title: "Fuel Consumption",
    description: "Convert between different units of fuel consumption",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=fuel",
    color: "bg-pink-500"
  },
  {
    title: "Data Storage",
    description: "Convert between different units of data storage",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=data",
    color: "bg-gray-500"
  },
  {
    title: "Weight & Mass",
    description: "Convert between different units of weight and mass",
    icon: <Weight className="h-6 w-6" />,
    href: "/units?type=weight",
    color: "bg-blue-600"
  },
  {
    title: "Pressure",
    description: "Convert between different units of pressure",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=pressure",
    color: "bg-green-600"
  },
  {
    title: "Temperature",
    description: "Convert between different units of temperature",
    icon: <Thermometer className="h-6 w-6" />,
    href: "/units?type=temperature",
    color: "bg-red-600"
  },
  {
    title: "Power",
    description: "Convert between different units of power",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=power",
    color: "bg-yellow-600"
  },
  {
    title: "Time",
    description: "Convert between different units of time",
    icon: <Clock className="h-6 w-6" />,
    href: "/units?type=time",
    color: "bg-purple-600"
  },
  {
    title: "Angle",
    description: "Convert between different units of angle",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=angle",
    color: "bg-indigo-600"
  },
  {
    title: "Volume (Dry)",
    description: "Convert between different units of dry volume",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=volume-dry",
    color: "bg-pink-600"
  },
  {
    title: "Density",
    description: "Convert between different units of density",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=density",
    color: "bg-gray-600"
  },
  {
    title: "Moment of Inertia",
    description: "Convert between different units of moment of inertia",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=inertia",
    color: "bg-blue-700"
  },
  {
    title: "Torque",
    description: "Convert between different units of torque",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=torque",
    color: "bg-green-700"
  },
  {
    title: "Angular Velocity",
    description: "Convert between different units of angular velocity",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=angular-velocity",
    color: "bg-red-700"
  },
  {
    title: "Angular Acceleration",
    description: "Convert between different units of angular acceleration",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=angular-acceleration",
    color: "bg-yellow-700"
  },
  {
    title: "Specific Volume",
    description: "Convert between different units of specific volume",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=specific-volume",
    color: "bg-purple-700"
  },
  {
    title: "Moment Force",
    description: "Convert between different units of moment force",
    icon: <Calculator className="h-6 w-6" />,
    href: "/units?type=moment-force",
    color: "bg-indigo-700"
  }
];

const heatConverters: ConverterItem[] = [
  {
    title: "Temperature",
    description: "Convert between different temperature scales",
    icon: <Thermometer className="h-6 w-6" />,
    href: "/units?type=temperature",
    color: "bg-red-500"
  },
  {
    title: "Heat Transfer",
    description: "Convert heat transfer coefficients",
    icon: <Flame className="h-6 w-6" />,
    href: "/units?type=heat-transfer",
    color: "bg-orange-500"
  },
  {
    title: "Thermal Conductivity",
    description: "Convert thermal conductivity units",
    icon: <Flame className="h-6 w-6" />,
    href: "/units?type=thermal-conductivity",
    color: "bg-yellow-500"
  },
  {
    title: "Heat Capacity",
    description: "Convert heat capacity units",
    icon: <Flame className="h-6 w-6" />,
    href: "/units?type=heat-capacity",
    color: "bg-amber-500"
  }
];

const fluidConverters: ConverterItem[] = [
  {
    title: "Flow Rate",
    description: "Convert fluid flow rates",
    icon: <Droplet className="h-6 w-6" />,
    href: "/units?type=flow-rate",
    color: "bg-blue-500"
  },
  {
    title: "Viscosity",
    description: "Convert viscosity units",
    icon: <Droplet className="h-6 w-6" />,
    href: "/units?type=viscosity",
    color: "bg-indigo-500"
  },
  {
    title: "Surface Tension",
    description: "Convert surface tension units",
    icon: <Droplet className="h-6 w-6" />,
    href: "/units?type=surface-tension",
    color: "bg-violet-500"
  }
];

const lightConverters: ConverterItem[] = [
  {
    title: "Luminance",
    description: "Convert luminance units",
    icon: <Sun className="h-6 w-6" />,
    href: "/units?type=luminance",
    color: "bg-yellow-400"
  },
  {
    title: "Illuminance",
    description: "Convert illuminance units",
    icon: <Sun className="h-6 w-6" />,
    href: "/units?type=illuminance",
    color: "bg-amber-400"
  },
  {
    title: "Luminous Intensity",
    description: "Convert luminous intensity units",
    icon: <Sun className="h-6 w-6" />,
    href: "/units?type=luminous-intensity",
    color: "bg-orange-400"
  }
];

const electricityConverters: ConverterItem[] = [
  {
    title: "Electric Current",
    description: "Convert electric current units",
    icon: <Zap className="h-6 w-6" />,
    href: "/units?type=electric-current",
    color: "bg-blue-400"
  },
  {
    title: "Electric Potential",
    description: "Convert voltage units",
    icon: <Zap className="h-6 w-6" />,
    href: "/units?type=electric-potential",
    color: "bg-indigo-400"
  },
  {
    title: "Electric Resistance",
    description: "Convert resistance units",
    icon: <Zap className="h-6 w-6" />,
    href: "/units?type=electric-resistance",
    color: "bg-violet-400"
  },
  {
    title: "Electric Capacitance",
    description: "Convert capacitance units",
    icon: <Zap className="h-6 w-6" />,
    href: "/units?type=electric-capacitance",
    color: "bg-purple-400"
  }
];

const magnetismConverters: ConverterItem[] = [
  {
    title: "Magnetic Field",
    description: "Convert magnetic field units",
    icon: <Magnet className="h-6 w-6" />,
    href: "/units?type=magnetic-field",
    color: "bg-blue-600"
  },
  {
    title: "Magnetic Flux",
    description: "Convert magnetic flux units",
    icon: <Magnet className="h-6 w-6" />,
    href: "/units?type=magnetic-flux",
    color: "bg-indigo-600"
  },
  {
    title: "Magnetic Flux Density",
    description: "Convert magnetic flux density units",
    icon: <Magnet className="h-6 w-6" />,
    href: "/units?type=magnetic-flux-density",
    color: "bg-violet-600"
  }
];

const radiologyConverters: ConverterItem[] = [
  {
    title: "Radiation Dose",
    description: "Convert radiation dose units",
    icon: <Radio className="h-6 w-6" />,
    href: "/units?type=radiation-dose",
    color: "bg-green-600"
  },
  {
    title: "Radioactivity",
    description: "Convert radioactivity units",
    icon: <Radio className="h-6 w-6" />,
    href: "/units?type=radioactivity",
    color: "bg-emerald-600"
  },
  {
    title: "Radiation Exposure",
    description: "Convert radiation exposure units",
    icon: <Radio className="h-6 w-6" />,
    href: "/units?type=radiation-exposure",
    color: "bg-teal-600"
  }
];

const sectionColors = {
  "Basic Converters": "bg-gradient-to-r from-blue-500 to-blue-600",
  "Engineering Converters": "bg-gradient-to-r from-green-500 to-green-600",
  "Heat Converters": "bg-gradient-to-r from-red-500 to-red-600",
  "Fluid Converters": "bg-gradient-to-r from-blue-400 to-blue-500",
  "Light Converters": "bg-gradient-to-r from-yellow-400 to-yellow-500",
  "Electricity Converters": "bg-gradient-to-r from-purple-400 to-purple-500",
  "Magnetism Converters": "bg-gradient-to-r from-indigo-400 to-indigo-500",
  "Radiology Converters": "bg-gradient-to-r from-emerald-400 to-emerald-500"
};

const Index = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const sections = [
    { title: "Basic Converters", items: calculators },
    { title: "Engineering Converters", items: engineeringConverters },
    { title: "Heat Converters", items: heatConverters },
    { title: "Fluid Converters", items: fluidConverters },
    { title: "Light Converters", items: lightConverters },
    { title: "Electricity Converters", items: electricityConverters },
    { title: "Magnetism Converters", items: magnetismConverters },
    { title: "Radiology Converters", items: radiologyConverters }
  ];

  const nextSection = () => {
    setActiveSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setActiveSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  // Get all converters for search
  const allConverters = sections.flatMap(section => 
    section.items.map(item => ({
      ...item,
      section: section.title
    }))
  );

  // Filter converters based on search query
  const filteredConverters = searchQuery
    ? allConverters.filter(converter => 
        converter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        converter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        converter.section.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sections[activeSection].items;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">ConvertHub</h1>
            </div>
            <div className="flex-1 max-w-xl w-full">
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                <Input
                  type="text"
                  placeholder="Search converters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`pl-10 w-full border-2 transition-all duration-300 ${
                    isSearchFocused 
                      ? 'border-blue-500 shadow-lg' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/info" className="text-gray-600 hover:text-blue-600 transition-colors">Info</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            All Your Conversion Needs in One Place
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Professional calculators and converters for engineering, science, and everyday use. 
            Fast, accurate, and easy to use.
          </p>
        </div>

        {/* Top Ad */}
        <div className="mb-6 md:mb-8">
          <GoogleAd slot="YOUR_TOP_AD_SLOT" format="horizontal" style={{ display: 'block', textAlign: 'center' }} />
        </div>

        {/* Section Navigation - Only show when not searching */}
        {!searchQuery && (
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <Button
              variant="outline"
              size="lg"
              onClick={prevSection}
              className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-full hover:shadow-md transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="hidden sm:inline">{sections[(activeSection - 1 + sections.length) % sections.length].title}</span>
            </Button>
            <div className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-white font-semibold text-sm md:text-base ${sectionColors[sections[activeSection].title]}`}>
              {sections[activeSection].title}
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={nextSection}
              className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-full hover:shadow-md transition-all"
            >
              <span className="hidden sm:inline">{sections[(activeSection + 1) % sections.length].title}</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-blue-100 animate-fadeIn">
            <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <Search className="h-6 w-6 text-blue-500" />
              Search Results for "{searchQuery}"
            </h3>
            <p className="text-gray-600 mt-2">
              Found {filteredConverters.length} converter{filteredConverters.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Converter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredConverters.map((item, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:scale-105 ${
                searchQuery ? 'animate-fadeIn' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {item.description}
                </CardDescription>
                {searchQuery && (
                  <div className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {item.section}
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <Link to={item.href}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Open Converter
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {searchQuery && filteredConverters.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md border border-red-100 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No converters found</h3>
            <p className="text-gray-600">Try a different search term or browse through the categories</p>
          </div>
        )}

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
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Accurate Calculations</h4>
              <p className="text-gray-600">Precise formulas and real-time data for reliable results</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Real-time Rates</h4>
              <p className="text-gray-600">Live currency exchange rates and updated information</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
