
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Eye, Package } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Package className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ItemVerse
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your personal item showcase platform. Add, organize, and explore your collection with ease.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Plus className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Add New Item</CardTitle>
                <CardDescription className="text-gray-600">
                  Create a new item entry with images and detailed information
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/add-item">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium transition-all duration-200">
                    Start Adding Items
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                  <Eye className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl text-gray-800">View Items</CardTitle>
                <CardDescription className="text-gray-600">
                  Browse and explore your complete item collection
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/view-items">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-medium transition-all duration-200">
                    Explore Collection
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Organize Your World
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether it's clothing, sports gear, or any personal items, ItemVerse helps you catalog 
                and showcase your collection with beautiful imagery and detailed descriptions.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>Created by Tushar 2025 for AMRR TechSols Pvt Ltd(Assignment)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
