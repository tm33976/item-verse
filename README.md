
# ItemVerse

A modern web application for managing and showcasing personal item collections built with React, TypeScript, and Tailwind CSS.

▶️▶️▶️ Live Demo - https://item-verse.vercel.app/

## Author
**Tushar Mishra**  
Email: tm3390782@gmail.com

## 🚀 Project Overview

ItemVerse is a personal item showcase platform that allows users to add, organize, and explore their collections with beautiful imagery and detailed descriptions. Whether it's clothing, sports gear, electronics, or any personal items, ItemVerse helps you catalog and showcase your collection effectively.

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Data Persistence**: Local Storage

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   └── ItemDetailModal.jsx
├── contexts/
│   └── ItemContext.jsx  # Global state management
├── pages/
│   ├── Index.jsx        # Home page
│   ├── AddItem.jsx      # Add new item page
│   ├── ViewItems.jsx    # Items collection page
│   └── NotFound.tsx     # 404 page
├── hooks/
├── lib/
└── App.jsx             # Main application component
```

## 🎯 Features

### 1. **Home Page (Index.jsx)**
- **Purpose**: Landing page with navigation to main features
- **Components**: 
  - Hero section with ItemVerse branding
  - Two main action cards (Add Item, View Items)
  - Footer with author information
- **Key Features**:
  - Responsive design with gradient backgrounds
  - Hover effects on cards
  - Clean navigation structure

### 2. **Add Item Page (AddItem.jsx)**
- **Purpose**: Form for creating new item entries
- **Key Features**:
  - File upload support for images (converted to base64)
  - Form validation
  - Item type selection
  - Cover image and additional images support
  - Real-time image preview
- **Workflow**:
  ```javascript
  // Image upload handling
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  ```

### 3. **View Items Page (ViewItems.jsx)**
- **Purpose**: Display all items in a responsive grid
- **Key Features**:
  - Responsive card grid layout
  - Image hover effects
  - Item type badges
  - Click to view detailed modal
  - Empty state handling
- **Card Structure**:
  ```jsx
  <Card className="group cursor-pointer hover:shadow-xl transition-all">
    <CardContent>
      <div className="relative overflow-hidden">
        <img className="group-hover:scale-110 transition-transform" />
        <Badge>{item.type}</Badge>
      </div>
      <div className="p-4">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
    </CardContent>
  </Card>
  ```

### 4. **Item Detail Modal (ItemDetailModal.jsx)**
- **Purpose**: Detailed view of individual items
- **Key Features**:
  - Image carousel with navigation
  - Thumbnail navigation
  - Item details display
  - Enquiry functionality
- **Image Navigation Logic**:
  ```javascript
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };
  ```

## 🗂️ State Management (ItemContext.jsx)

### Context Structure
```javascript
const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    // Load from localStorage or use initial items
  });

  const addItem = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setItems(prev => [item, ...prev]);
  };

  const getItem = (id) => {
    return items.find(item => item.id === id);
  };
};
```

### Data Flow
1. **Initialization**: Context loads items from localStorage or uses default items
2. **Adding Items**: New items get unique IDs and timestamps
3. **Persistence**: Changes are automatically saved to localStorage
4. **Retrieval**: Items can be fetched by ID for detailed views

## 📱 Responsive Design

### Grid System
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns
- **Large screens**: Up to 4 columns

### CSS Classes Used
```css
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

## 🎨 UI Components

### shadcn/ui Components Used
- **Button**: Various variants (default, outline, destructive)
- **Card**: Main container for items
- **Dialog**: Modal for item details
- **Input**: Form inputs
- **Select**: Dropdown selections
- **Textarea**: Multi-line text input
- **Badge**: Type indicators
- **Label**: Form labels

### Custom Styling
- Gradient backgrounds: `bg-gradient-to-br from-blue-50 to-indigo-100`
- Hover effects: `hover:shadow-xl transition-all duration-300`
- Glass morphism: `bg-white/90 backdrop-blur-sm`

## 🔄 Application Workflow

### 1. Application Start
```
App.tsx → BrowserRouter → Routes → ItemProvider wraps all pages
```

### 2. Adding New Item
```
AddItem.tsx → Form Submission → ItemContext.addItem() → localStorage update → Navigate to ViewItems
```

### 3. Viewing Items
```
ViewItems.tsx → ItemContext.items → Render grid → Click item → ItemDetailModal
```

### 4. Item Detail View
```
ItemDetailModal → getItem(id) → Display details → Image carousel → Enquiry action
```

## 💾 Data Persistence

### localStorage Implementation
```javascript
// Save items
useEffect(() => {
  try {
    localStorage.setItem('itemverse-items', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving items to localStorage:', error);
  }
}, [items]);

// Load items
const [items, setItems] = useState(() => {
  try {
    const savedItems = localStorage.getItem('itemverse-items');
    if (savedItems) {
      return parseStoredItems(JSON.parse(savedItems));
    }
  } catch (error) {
    console.error('Error loading items from localStorage:', error);
  }
  return initialItems;
});
```

## 🖼️ Image Handling

### File Upload Process
1. User selects files through input
2. Files converted to base64 using FileReader API
3. Base64 strings stored in state
4. Images displayed as previews
5. Data persisted to localStorage

### Image Display
- Cover images: Fixed aspect ratio containers
- Additional images: Thumbnail grid with click navigation
- Responsive sizing across devices

## 🚦 Error Handling

### Form Validation
```javascript
if (!formData.name || !formData.type || !formData.description || !formData.coverImage) {
  toast.error('Please fill in all required fields');
  return;
}
```

### Image Upload Errors
```javascript
try {
  const base64 = await fileToBase64(file);
  setFormData(prev => ({ ...prev, coverImage: base64 }));
} catch (error) {
  toast.error('Error uploading image');
}
```

## 🎯 Key Features Implementation

### 1. Responsive Card Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map((item) => (
    <Card key={item.id} className="group cursor-pointer hover:shadow-xl">
      {/* Card content */}
    </Card>
  ))}
</div>
```

### 2. Image Carousel
```jsx
const allImages = [item.coverImage, ...item.additionalImages];
const [currentImageIndex, setCurrentImageIndex] = useState(0);

// Navigation buttons with circular logic
const nextImage = () => {
  setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
};
```

### 3. Toast Notifications
```javascript
import { toast } from 'sonner';

// Success notification
toast.success('Item successfully added!');

// Error notification
toast.error('Please fill in all required fields');
```

## 🔧 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/tm33976/item-verse.git

# Navigate to project directory
cd item-verse

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Dependencies

### Core Dependencies
- `react` & `react-dom`: UI framework
- `react-router-dom`: Client-side routing
- `@tanstack/react-query`: Data fetching (ready for future backend integration)

### UI Dependencies
- `@radix-ui/*`: Accessible UI primitives
- `lucide-react`: Icon library
- `tailwindcss`: Utility-first CSS framework
- `sonner`: Toast notifications

### Development Dependencies
- `vite`: Build tool and dev server
- `typescript`: Type safety
- `eslint`: Code linting



## 📄 License

This project is created by Tushar Mishra for AMRR TechSols Pvt Ltd.

## 🤝 Contributing

Feel free to reach out to tm3390782@gmail.com for any questions or contributions.

---

**Built by Tushar Mishra**
