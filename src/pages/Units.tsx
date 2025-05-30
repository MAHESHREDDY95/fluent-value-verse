import { useState, useEffect } from "react";
import { ArrowLeft, Ruler } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConversionType {
  name: string;
  units: {
    name: string;
    value: number;
    symbol: string;
  }[];
}

const conversionTypes: ConversionType[] = [
  {
    name: "Length",
    units: [
      { name: "Millimeter", value: 0.001, symbol: "mm" },
      { name: "Centimeter", value: 0.01, symbol: "cm" },
      { name: "Meter", value: 1, symbol: "m" },
      { name: "Kilometer", value: 1000, symbol: "km" },
      { name: "Inch", value: 0.0254, symbol: "in" },
      { name: "Foot", value: 0.3048, symbol: "ft" },
      { name: "Yard", value: 0.9144, symbol: "yd" },
      { name: "Mile", value: 1609.344, symbol: "mi" }
    ]
  },
  {
    name: "Weight",
    units: [
      { name: "Milligram", value: 0.001, symbol: "mg" },
      { name: "Gram", value: 1, symbol: "g" },
      { name: "Kilogram", value: 1000, symbol: "kg" },
      { name: "Metric Ton", value: 1000000, symbol: "t" },
      { name: "Ounce", value: 28.3495, symbol: "oz" },
      { name: "Pound", value: 453.592, symbol: "lb" },
      { name: "Stone", value: 6350.29, symbol: "st" }
    ]
  },
  {
    name: "Temperature",
    units: [
      { name: "Celsius", value: 1, symbol: "°C" },
      { name: "Fahrenheit", value: 1, symbol: "°F" },
      { name: "Kelvin", value: 1, symbol: "K" }
    ]
  },
  {
    name: "Area",
    units: [
      { name: "Square Millimeter", value: 0.000001, symbol: "mm²" },
      { name: "Square Centimeter", value: 0.0001, symbol: "cm²" },
      { name: "Square Meter", value: 1, symbol: "m²" },
      { name: "Square Kilometer", value: 1000000, symbol: "km²" },
      { name: "Square Inch", value: 0.00064516, symbol: "in²" },
      { name: "Square Foot", value: 0.092903, symbol: "ft²" },
      { name: "Square Yard", value: 0.836127, symbol: "yd²" },
      { name: "Acre", value: 4046.86, symbol: "ac" },
      { name: "Hectare", value: 10000, symbol: "ha" }
    ]
  },
  {
    name: "Volume",
    units: [
      { name: "Milliliter", value: 0.001, symbol: "ml" },
      { name: "Liter", value: 1, symbol: "L" },
      { name: "Cubic Meter", value: 1000, symbol: "m³" },
      { name: "Cubic Centimeter", value: 0.001, symbol: "cm³" },
      { name: "Cubic Inch", value: 0.0163871, symbol: "in³" },
      { name: "Cubic Foot", value: 28.3168, symbol: "ft³" },
      { name: "Gallon (US)", value: 3.78541, symbol: "gal" },
      { name: "Gallon (UK)", value: 4.54609, symbol: "gal" },
      { name: "Fluid Ounce (US)", value: 0.0295735, symbol: "fl oz" },
      { name: "Fluid Ounce (UK)", value: 0.0284131, symbol: "fl oz" }
    ]
  },
  {
    name: "Time",
    units: [
      { name: "Millisecond", value: 0.001, symbol: "ms" },
      { name: "Second", value: 1, symbol: "s" },
      { name: "Minute", value: 60, symbol: "min" },
      { name: "Hour", value: 3600, symbol: "hr" },
      { name: "Day", value: 86400, symbol: "day" },
      { name: "Week", value: 604800, symbol: "week" },
      { name: "Month", value: 2592000, symbol: "month" },
      { name: "Year", value: 31536000, symbol: "year" }
    ]
  },
  {
    name: "Speed",
    units: [
      { name: "Meter per Second", value: 1, symbol: "m/s" },
      { name: "Kilometer per Hour", value: 0.277778, symbol: "km/h" },
      { name: "Mile per Hour", value: 0.44704, symbol: "mph" },
      { name: "Foot per Second", value: 0.3048, symbol: "ft/s" },
      { name: "Knot", value: 0.514444, symbol: "kt" },
      { name: "Mach", value: 340.3, symbol: "M" },
      { name: "Light Speed", value: 299792458, symbol: "c" }
    ]
  },
  {
    name: "Energy",
    units: [
      { name: "Joule", value: 1, symbol: "J" },
      { name: "Kilojoule", value: 1000, symbol: "kJ" },
      { name: "Calorie", value: 4.184, symbol: "cal" },
      { name: "Kilocalorie", value: 4184, symbol: "kcal" },
      { name: "Watt-hour", value: 3600, symbol: "Wh" },
      { name: "Kilowatt-hour", value: 3600000, symbol: "kWh" },
      { name: "British Thermal Unit", value: 1055.06, symbol: "BTU" },
      { name: "Electron Volt", value: 1.60218e-19, symbol: "eV" },
      { name: "Foot-pound", value: 1.35582, symbol: "ft⋅lb" }
    ]
  },
  {
    name: "Force",
    units: [
      { name: "Newton", value: 1, symbol: "N" },
      { name: "Kilonewton", value: 1000, symbol: "kN" },
      { name: "Pound-force", value: 4.44822, symbol: "lbf" },
      { name: "Dyne", value: 0.00001, symbol: "dyn" },
      { name: "Kilogram-force", value: 9.80665, symbol: "kgf" },
      { name: "Ounce-force", value: 0.278014, symbol: "ozf" },
      { name: "Poundal", value: 0.138255, symbol: "pdl" }
    ]
  },
  {
    name: "Fuel Consumption",
    units: [
      { name: "Liter per 100 km", value: 1, symbol: "L/100km" },
      { name: "Miles per Gallon (US)", value: 235.215, symbol: "mpg" },
      { name: "Miles per Gallon (UK)", value: 282.481, symbol: "mpg" },
      { name: "Kilometer per Liter", value: 100, symbol: "km/L" },
      { name: "Gallon per 100 Miles (US)", value: 2.35215, symbol: "gal/100mi" },
      { name: "Gallon per 100 Miles (UK)", value: 2.82481, symbol: "gal/100mi" }
    ]
  },
  {
    name: "Data Storage",
    units: [
      { name: "Bit", value: 0.125, symbol: "b" },
      { name: "Byte", value: 1, symbol: "B" },
      { name: "Kilobyte", value: 1024, symbol: "KB" },
      { name: "Megabyte", value: 1048576, symbol: "MB" },
      { name: "Gigabyte", value: 1073741824, symbol: "GB" },
      { name: "Terabyte", value: 1099511627776, symbol: "TB" },
      { name: "Petabyte", value: 1125899906842624, symbol: "PB" },
      { name: "Exabyte", value: 1152921504606846976, symbol: "EB" },
      { name: "Zettabyte", value: 1180591620717411303424, symbol: "ZB" },
      { name: "Yottabyte", value: 1208925819614629174706176, symbol: "YB" }
    ]
  },
  {
    name: "Pressure",
    units: [
      { name: "Pascal", value: 1, symbol: "Pa" },
      { name: "Kilopascal", value: 1000, symbol: "kPa" },
      { name: "Bar", value: 100000, symbol: "bar" },
      { name: "Pound per Square Inch", value: 6894.76, symbol: "psi" },
      { name: "Atmosphere", value: 101325, symbol: "atm" },
      { name: "Torr", value: 133.322, symbol: "Torr" },
      { name: "Millimeter of Mercury", value: 133.322, symbol: "mmHg" },
      { name: "Inch of Mercury", value: 3386.39, symbol: "inHg" },
      { name: "Millibar", value: 100, symbol: "mbar" },
      { name: "Kilogram per Square Centimeter", value: 98066.5, symbol: "kg/cm²" }
    ]
  },
  {
    name: "Power",
    units: [
      { name: "Watt", value: 1, symbol: "W" },
      { name: "Kilowatt", value: 1000, symbol: "kW" },
      { name: "Megawatt", value: 1000000, symbol: "MW" },
      { name: "Horsepower (metric)", value: 735.499, symbol: "hp" },
      { name: "Horsepower (imperial)", value: 745.7, symbol: "hp" },
      { name: "Foot-pound per Second", value: 1.35582, symbol: "ft⋅lb/s" },
      { name: "BTU per Hour", value: 0.293071, symbol: "BTU/h" },
      { name: "Calorie per Second", value: 4.1868, symbol: "cal/s" },
      { name: "Kilocalorie per Hour", value: 1.163, symbol: "kcal/h" }
    ]
  },
  {
    name: "Angle",
    units: [
      { name: "Degree", value: 1, symbol: "°" },
      { name: "Radian", value: 57.2958, symbol: "rad" },
      { name: "Gradian", value: 0.9, symbol: "grad" },
      { name: "Minute of Arc", value: 0.0166667, symbol: "arcmin" },
      { name: "Second of Arc", value: 0.000277778, symbol: "arcsec" },
      { name: "Revolution", value: 360, symbol: "rev" },
      { name: "Quadrant", value: 90, symbol: "quad" },
      { name: "Sextant", value: 60, symbol: "sextant" },
      { name: "Octant", value: 45, symbol: "octant" }
    ]
  },
  {
    name: "Volume (Dry)",
    units: [
      { name: "Cubic Meter", value: 1, symbol: "m³" },
      { name: "Liter", value: 0.001, symbol: "L" },
      { name: "Cubic Foot", value: 0.0283168, symbol: "ft³" },
      { name: "Cubic Inch", value: 0.0000163871, symbol: "in³" },
      { name: "Bushel (US)", value: 0.0352391, symbol: "bu" },
      { name: "Bushel (UK)", value: 0.0363687, symbol: "bu" },
      { name: "Peck (US)", value: 0.00880977, symbol: "pk" },
      { name: "Peck (UK)", value: 0.00909218, symbol: "pk" },
      { name: "Gallon (US dry)", value: 0.00440488, symbol: "gal" },
      { name: "Gallon (UK dry)", value: 0.00454609, symbol: "gal" }
    ]
  },
  {
    name: "Density",
    units: [
      { name: "Kilogram per Cubic Meter", value: 1, symbol: "kg/m³" },
      { name: "Gram per Cubic Centimeter", value: 1000, symbol: "g/cm³" },
      { name: "Pound per Cubic Foot", value: 16.0185, symbol: "lb/ft³" },
      { name: "Pound per Cubic Inch", value: 27679.9, symbol: "lb/in³" },
      { name: "Ounce per Cubic Inch", value: 1729.99, symbol: "oz/in³" },
      { name: "Slug per Cubic Foot", value: 515.379, symbol: "slug/ft³" },
      { name: "Ton per Cubic Yard", value: 1328.94, symbol: "t/yd³" }
    ]
  },
  {
    name: "Moment of Inertia",
    units: [
      { name: "Kilogram Square Meter", value: 1, symbol: "kg⋅m²" },
      { name: "Gram Square Centimeter", value: 0.0000001, symbol: "g⋅cm²" },
      { name: "Pound Square Foot", value: 0.0421401, symbol: "lb⋅ft²" },
      { name: "Pound Square Inch", value: 0.00029264, symbol: "lb⋅in²" },
      { name: "Ounce Square Inch", value: 0.00001829, symbol: "oz⋅in²" },
      { name: "Slug Square Foot", value: 1.35582, symbol: "slug⋅ft²" }
    ]
  },
  {
    name: "Torque",
    units: [
      { name: "Newton Meter", value: 1, symbol: "N⋅m" },
      { name: "Kilonewton Meter", value: 1000, symbol: "kN⋅m" },
      { name: "Pound-force Foot", value: 1.35582, symbol: "lbf⋅ft" },
      { name: "Pound-force Inch", value: 0.112985, symbol: "lbf⋅in" },
      { name: "Ounce-force Inch", value: 0.00706155, symbol: "ozf⋅in" },
      { name: "Kilogram-force Meter", value: 9.80665, symbol: "kgf⋅m" },
      { name: "Dyne Centimeter", value: 0.0000001, symbol: "dyn⋅cm" }
    ]
  },
  {
    name: "Angular Velocity",
    units: [
      { name: "Radian per Second", value: 1, symbol: "rad/s" },
      { name: "Degree per Second", value: 0.0174533, symbol: "°/s" },
      { name: "Revolution per Minute", value: 0.10472, symbol: "rpm" },
      { name: "Revolution per Second", value: 6.28319, symbol: "rps" },
      { name: "Revolution per Hour", value: 0.00174533, symbol: "rph" },
      { name: "Revolution per Day", value: 0.0000727221, symbol: "rpd" }
    ]
  },
  {
    name: "Angular Acceleration",
    units: [
      { name: "Radian per Square Second", value: 1, symbol: "rad/s²" },
      { name: "Degree per Square Second", value: 0.0174533, symbol: "°/s²" },
      { name: "Revolution per Square Minute", value: 0.00174533, symbol: "rpm²" },
      { name: "Revolution per Square Second", value: 6.28319, symbol: "rps²" },
      { name: "Revolution per Square Hour", value: 0.000000484813, symbol: "rph²" },
      { name: "Revolution per Square Day", value: 0.00000000000561034, symbol: "rpd²" }
    ]
  },
  {
    name: "Specific Volume",
    units: [
      { name: "Cubic Meter per Kilogram", value: 1, symbol: "m³/kg" },
      { name: "Cubic Centimeter per Gram", value: 0.001, symbol: "cm³/g" },
      { name: "Cubic Foot per Pound", value: 0.062428, symbol: "ft³/lb" },
      { name: "Cubic Inch per Pound", value: 0.000036127, symbol: "in³/lb" },
      { name: "Liter per Kilogram", value: 0.001, symbol: "L/kg" },
      { name: "Gallon per Pound (US)", value: 0.0083454, symbol: "gal/lb" },
      { name: "Gallon per Pound (UK)", value: 0.0100224, symbol: "gal/lb" }
    ]
  },
  {
    name: "Moment Force",
    units: [
      { name: "Newton Meter", value: 1, symbol: "N⋅m" },
      { name: "Kilonewton Meter", value: 1000, symbol: "kN⋅m" },
      { name: "Pound-force Foot", value: 1.35582, symbol: "lbf⋅ft" },
      { name: "Pound-force Inch", value: 0.112985, symbol: "lbf⋅in" },
      { name: "Ounce-force Inch", value: 0.00706155, symbol: "ozf⋅in" },
      { name: "Kilogram-force Meter", value: 9.80665, symbol: "kgf⋅m" },
      { name: "Dyne Centimeter", value: 0.0000001, symbol: "dyn⋅cm" }
    ]
  }
];

// Add new conversion types
const heatTransferUnits: ConversionType = {
  name: "Heat Transfer",
  units: [
    { name: "Watt per Square Meter Kelvin", value: 1, symbol: "W/(m²·K)" },
    { name: "Watt per Square Meter Celsius", value: 1, symbol: "W/(m²·°C)" },
    { name: "British Thermal Unit per Square Foot Hour Fahrenheit", value: 5.67826, symbol: "BTU/(ft²·h·°F)" },
    { name: "Calorie per Square Centimeter Second Celsius", value: 41868, symbol: "cal/(cm²·s·°C)" }
  ]
};

const thermalConductivityUnits: ConversionType = {
  name: "Thermal Conductivity",
  units: [
    { name: "Watt per Meter Kelvin", value: 1, symbol: "W/(m·K)" },
    { name: "Watt per Meter Celsius", value: 1, symbol: "W/(m·°C)" },
    { name: "British Thermal Unit per Foot Hour Fahrenheit", value: 1.73073, symbol: "BTU/(ft·h·°F)" },
    { name: "Calorie per Centimeter Second Celsius", value: 418.68, symbol: "cal/(cm·s·°C)" }
  ]
};

const heatCapacityUnits: ConversionType = {
  name: "Heat Capacity",
  units: [
    { name: "Joule per Kilogram Kelvin", value: 1, symbol: "J/(kg·K)" },
    { name: "Joule per Kilogram Celsius", value: 1, symbol: "J/(kg·°C)" },
    { name: "British Thermal Unit per Pound Fahrenheit", value: 4186.8, symbol: "BTU/(lb·°F)" },
    { name: "Calorie per Gram Celsius", value: 4186.8, symbol: "cal/(g·°C)" }
  ]
};

const flowRateUnits: ConversionType = {
  name: "Flow Rate",
  units: [
    { name: "Cubic Meter per Second", value: 1, symbol: "m³/s" },
    { name: "Liter per Second", value: 0.001, symbol: "L/s" },
    { name: "Cubic Foot per Second", value: 0.0283168, symbol: "ft³/s" },
    { name: "Gallon per Minute (US)", value: 0.0000630902, symbol: "gpm" },
    { name: "Gallon per Minute (UK)", value: 0.0000757682, symbol: "gpm" }
  ]
};

const viscosityUnits: ConversionType = {
  name: "Viscosity",
  units: [
    { name: "Pascal Second", value: 1, symbol: "Pa·s" },
    { name: "Poise", value: 0.1, symbol: "P" },
    { name: "Centipoise", value: 0.001, symbol: "cP" },
    { name: "Pound per Foot Second", value: 1.48816, symbol: "lb/(ft·s)" }
  ]
};

const surfaceTensionUnits: ConversionType = {
  name: "Surface Tension",
  units: [
    { name: "Newton per Meter", value: 1, symbol: "N/m" },
    { name: "Dyne per Centimeter", value: 0.001, symbol: "dyn/cm" },
    { name: "Pound per Foot", value: 14.5939, symbol: "lb/ft" },
    { name: "Pound per Inch", value: 175.127, symbol: "lb/in" }
  ]
};

const luminanceUnits: ConversionType = {
  name: "Luminance",
  units: [
    { name: "Candela per Square Meter", value: 1, symbol: "cd/m²" },
    { name: "Nit", value: 1, symbol: "nt" },
    { name: "Stilb", value: 10000, symbol: "sb" },
    { name: "Lambert", value: 3183.1, symbol: "L" },
    { name: "Foot-lambert", value: 3.42626, symbol: "fL" }
  ]
};

const illuminanceUnits: ConversionType = {
  name: "Illuminance",
  units: [
    { name: "Lux", value: 1, symbol: "lx" },
    { name: "Foot-candle", value: 10.7639, symbol: "fc" },
    { name: "Phot", value: 10000, symbol: "ph" },
    { name: "Nox", value: 0.001, symbol: "nx" }
  ]
};

const luminousIntensityUnits: ConversionType = {
  name: "Luminous Intensity",
  units: [
    { name: "Candela", value: 1, symbol: "cd" },
    { name: "Candlepower", value: 1, symbol: "cp" },
    { name: "Hefner Candle", value: 0.903, symbol: "HK" },
    { name: "Carcel", value: 9.74, symbol: "carcel" }
  ]
};

const electricCurrentUnits: ConversionType = {
  name: "Electric Current",
  units: [
    { name: "Ampere", value: 1, symbol: "A" },
    { name: "Milliampere", value: 0.001, symbol: "mA" },
    { name: "Microampere", value: 0.000001, symbol: "µA" },
    { name: "Kiloampere", value: 1000, symbol: "kA" }
  ]
};

const electricPotentialUnits: ConversionType = {
  name: "Electric Potential",
  units: [
    { name: "Volt", value: 1, symbol: "V" },
    { name: "Millivolt", value: 0.001, symbol: "mV" },
    { name: "Microvolt", value: 0.000001, symbol: "µV" },
    { name: "Kilovolt", value: 1000, symbol: "kV" }
  ]
};

const electricResistanceUnits: ConversionType = {
  name: "Electric Resistance",
  units: [
    { name: "Ohm", value: 1, symbol: "Ω" },
    { name: "Milliohm", value: 0.001, symbol: "mΩ" },
    { name: "Microohm", value: 0.000001, symbol: "µΩ" },
    { name: "Kiloohm", value: 1000, symbol: "kΩ" },
    { name: "Megaohm", value: 1000000, symbol: "MΩ" }
  ]
};

const electricCapacitanceUnits: ConversionType = {
  name: "Electric Capacitance",
  units: [
    { name: "Farad", value: 1, symbol: "F" },
    { name: "Microfarad", value: 0.000001, symbol: "µF" },
    { name: "Picofarad", value: 0.000000000001, symbol: "pF" },
    { name: "Nanofarad", value: 0.000000001, symbol: "nF" }
  ]
};

const magneticFieldUnits: ConversionType = {
  name: "Magnetic Field",
  units: [
    { name: "Tesla", value: 1, symbol: "T" },
    { name: "Gauss", value: 0.0001, symbol: "G" },
    { name: "Microtesla", value: 0.000001, symbol: "µT" },
    { name: "Millitesla", value: 0.001, symbol: "mT" }
  ]
};

const magneticFluxUnits: ConversionType = {
  name: "Magnetic Flux",
  units: [
    { name: "Weber", value: 1, symbol: "Wb" },
    { name: "Maxwell", value: 0.00000001, symbol: "Mx" },
    { name: "Microweber", value: 0.000001, symbol: "µWb" },
    { name: "Milliweber", value: 0.001, symbol: "mWb" }
  ]
};

const magneticFluxDensityUnits: ConversionType = {
  name: "Magnetic Flux Density",
  units: [
    { name: "Tesla", value: 1, symbol: "T" },
    { name: "Gauss", value: 0.0001, symbol: "G" },
    { name: "Microtesla", value: 0.000001, symbol: "µT" },
    { name: "Millitesla", value: 0.001, symbol: "mT" }
  ]
};

const radiationDoseUnits: ConversionType = {
  name: "Radiation Dose",
  units: [
    { name: "Gray", value: 1, symbol: "Gy" },
    { name: "Rad", value: 0.01, symbol: "rad" },
    { name: "Milligray", value: 0.001, symbol: "mGy" },
    { name: "Microgray", value: 0.000001, symbol: "µGy" }
  ]
};

const radioactivityUnits: ConversionType = {
  name: "Radioactivity",
  units: [
    { name: "Becquerel", value: 1, symbol: "Bq" },
    { name: "Curie", value: 37000000000, symbol: "Ci" },
    { name: "Rutherford", value: 1000000, symbol: "Rd" },
    { name: "Millibecquerel", value: 0.001, symbol: "mBq" }
  ]
};

const radiationExposureUnits: ConversionType = {
  name: "Radiation Exposure",
  units: [
    { name: "Coulomb per Kilogram", value: 1, symbol: "C/kg" },
    { name: "Roentgen", value: 0.000258, symbol: "R" },
    { name: "Milliroentgen", value: 0.000000258, symbol: "mR" },
    { name: "Microcoulomb per Kilogram", value: 0.000001, symbol: "µC/kg" }
  ]
};

const allConversionTypes: { [key: string]: ConversionType } = {
  length: conversionTypes[0],
  weight: conversionTypes[1],
  temperature: conversionTypes[2],
  area: conversionTypes[3],
  volume: conversionTypes[4],
  time: conversionTypes[5],
  speed: conversionTypes[6],
  energy: conversionTypes[7],
  force: conversionTypes[8],
  fuel: conversionTypes[9],
  data: conversionTypes[10],
  pressure: conversionTypes[11],
  power: conversionTypes[12],
  angle: conversionTypes[13],
  "volume-dry": conversionTypes[14],
  density: conversionTypes[15],
  inertia: conversionTypes[16],
  torque: conversionTypes[17],
  "angular-velocity": conversionTypes[18],
  "angular-acceleration": conversionTypes[19],
  "specific-volume": conversionTypes[20],
  "moment-force": conversionTypes[21],
  "heat-transfer": heatTransferUnits,
  "thermal-conductivity": thermalConductivityUnits,
  "heat-capacity": heatCapacityUnits,
  "flow-rate": flowRateUnits,
  viscosity: viscosityUnits,
  "surface-tension": surfaceTensionUnits,
  luminance: luminanceUnits,
  illuminance: illuminanceUnits,
  "luminous-intensity": luminousIntensityUnits,
  "electric-current": electricCurrentUnits,
  "electric-potential": electricPotentialUnits,
  "electric-resistance": electricResistanceUnits,
  "electric-capacitance": electricCapacitanceUnits,
  "magnetic-field": magneticFieldUnits,
  "magnetic-flux": magneticFluxUnits,
  "magnetic-flux-density": magneticFluxDensityUnits,
  "radiation-dose": radiationDoseUnits,
  radioactivity: radioactivityUnits,
  "radiation-exposure": radiationExposureUnits
};

const Units = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");
  const [value, setValue] = useState<string>("1");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (typeParam && allConversionTypes[typeParam]) {
      const type = allConversionTypes[typeParam];
      setFromUnit(type.units[0].name);
      setToUnit(type.units[1].name);
      setResult(null);
    }
  }, [typeParam]);

  const handleConversion = () => {
    if (!typeParam || !allConversionTypes[typeParam]) return;

    const currentType = allConversionTypes[typeParam];
    const fromUnitData = currentType.units.find(unit => unit.name === fromUnit);
    const toUnitData = currentType.units.find(unit => unit.name === toUnit);
    if (!fromUnitData || !toUnitData) return;

    const inputValue = parseFloat(value);
    if (isNaN(inputValue)) return;

    let convertedValue: number;

    if (typeParam === "temperature") {
      // Special handling for temperature conversions
      if (fromUnit === "Celsius" && toUnit === "Fahrenheit") {
        convertedValue = (inputValue * 9/5) + 32;
      } else if (fromUnit === "Fahrenheit" && toUnit === "Celsius") {
        convertedValue = (inputValue - 32) * 5/9;
      } else if (fromUnit === "Celsius" && toUnit === "Kelvin") {
        convertedValue = inputValue + 273.15;
      } else if (fromUnit === "Kelvin" && toUnit === "Celsius") {
        convertedValue = inputValue - 273.15;
      } else if (fromUnit === "Fahrenheit" && toUnit === "Kelvin") {
        convertedValue = (inputValue - 32) * 5/9 + 273.15;
      } else if (fromUnit === "Kelvin" && toUnit === "Fahrenheit") {
        convertedValue = (inputValue - 273.15) * 9/5 + 32;
      } else {
        convertedValue = inputValue;
      }
    } else {
      // Standard conversion for other units
      convertedValue = (inputValue * fromUnitData.value) / toUnitData.value;
    }

    setResult(convertedValue);
  };

  const currentType = typeParam ? allConversionTypes[typeParam] : null;
  if (!currentType) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Ruler className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{currentType.name} Converter</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Convert {currentType.name}</CardTitle>
              <CardDescription>
                Convert between different units of {currentType.name.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>From</Label>
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentType.units.map((unit) => (
                        <SelectItem key={unit.name} value={unit.name}>
                          {unit.name} ({unit.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>To</Label>
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentType.units.map((unit) => (
                        <SelectItem key={unit.name} value={unit.name}>
                          {unit.name} ({unit.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Value</Label>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter value"
                  />
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleConversion}
                >
                  Convert
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>
                Converted value
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result !== null && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600">Converted Value</div>
                    <div className="text-2xl font-bold">
                      {result.toFixed(6)} {currentType.units.find(u => u.name === toUnit)?.symbol}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {value} {currentType.units.find(u => u.name === fromUnit)?.symbol} = {result.toFixed(6)} {currentType.units.find(u => u.name === toUnit)?.symbol}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About {currentType.name} Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p>
                This converter supports various units of {currentType.name.toLowerCase()}:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                {currentType.units.map((unit, index) => (
                  <li key={index}>
                    <strong>{unit.name}:</strong> {unit.symbol}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Note: All conversions are based on standard conversion factors. For temperature conversions, special formulas are used to ensure accurate results.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Units;
