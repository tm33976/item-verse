
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemProvider } from "./contexts/ItemContext";
import Index from "./pages/Index";
import AddItem from "./pages/AddItem";
import ViewItems from "./pages/ViewItems";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ItemProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/view-items" element={<ViewItems />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ItemProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
