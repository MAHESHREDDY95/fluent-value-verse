import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Currency from "./pages/Currency";
import BMI from "./pages/BMI";
import EMI from "./pages/EMI";
import Units from "./pages/Units";
import Timestamp from "./pages/Timestamp";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/bmi" element={<BMI />} />
          <Route path="/emi" element={<EMI />} />
          <Route path="/units" element={<Units />} />
          <Route path="/timestamp" element={<Timestamp />} />
          <Route path="/info" element={<Info />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
