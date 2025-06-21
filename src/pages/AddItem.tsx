
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useItems } from '@/contexts/ItemContext';
import { toast } from 'sonner';

const AddItem = () => {
  const navigate = useNavigate();
  const { addItem } = useItems();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: '',
    additionalImages: [] as string[]
  });

  const itemTypes = [
    'Shirt',
    'Pant',
    'Shoes',
    'Sports Gear',
    'Jacket',
    'Accessories',
    'Electronics',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.description || !formData.coverImage) {
      toast.error('Please fill in all required fields');
      return;
    }

    addItem(formData);
    toast.success('Item successfully added!');
    navigate('/view-items');
  };

  const handleImageAdd = (type: 'cover' | 'additional', url: string) => {
    if (!url.trim()) return;
    
    if (type === 'cover') {
      setFormData(prev => ({ ...prev, coverImage: url }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        additionalImages: [...prev.additionalImages, url] 
      }));
    }
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <Link to="/" className="mr-4">
              <Button variant="outline" size="sm" className="hover:bg-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Add New Item</h1>
          </div>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-800">
                Create Item Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Item Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter item name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                    Item Type *
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select item type" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Item Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item in detail"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[100px] resize-none"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Cover Image *
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="Enter image URL"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleImageAdd('cover', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        handleImageAdd('cover', input.value);
                        input.value = '';
                      }}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.coverImage && (
                    <div className="relative inline-block">
                      <img
                        src={formData.coverImage}
                        alt="Cover preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                        onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Additional Images
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="Enter additional image URL"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleImageAdd('additional', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        handleImageAdd('additional', input.value);
                        input.value = '';
                      }}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {formData.additionalImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.additionalImages.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={img}
                            alt={`Additional ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0"
                            onClick={() => removeAdditionalImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Add Item
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
