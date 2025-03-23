
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Login from "./pages/Login";
import CPFEntry from "./pages/CPFEntry";
import Dashboard from "./pages/Dashboard";
import LoanConfirmation from "./pages/LoanConfirmation";
import LoanDetails from "./pages/LoanDetails";
import LoanProcessing from "./pages/LoanProcessing";
import LoanContract from "./pages/LoanContract";
import BankDetails from "./pages/BankDetails";
import PaymentProcessing from "./pages/PaymentProcessing";
import InsuranceRequest from "./pages/InsuranceRequest";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

// PageScroll component to handle scrolling behavior
const PageScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[100svh] overflow-x-hidden">
      {children}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageScroll>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cpf-entry" element={<CPFEntry />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/loan-confirmation" element={<LoanConfirmation />} />
              <Route path="/loan-details" element={<LoanDetails />} />
              <Route path="/loan-processing" element={<LoanProcessing />} />
              <Route path="/loan-contract" element={<LoanContract />} />
              <Route path="/bank-details" element={<BankDetails />} />
              <Route path="/payment-processing" element={<PaymentProcessing />} />
              <Route path="/insurance-request" element={<InsuranceRequest />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </PageScroll>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
