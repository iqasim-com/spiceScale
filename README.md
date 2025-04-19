# SpiceScale with Bolt ai

SpiceScale is a modern web application for scaling Pakistani and Indian recipes based on the number of servings needed. Built with React, TypeScript, and Redux, it helps home cooks adjust authentic recipes for any gathering size while maintaining the perfect balance of spices and ingredients.

## Features

- **Dynamic Recipe Scaling**: Automatically adjust ingredient quantities based on desired servings
- **Unit Conversion**: Toggle between metric and imperial measurements
- **Recipe Categories**: Browse recipes by type (Rice, Curry, Bread, Stew, Dessert)
- **Search Functionality**: Find recipes by name, ingredients, or tags
- **Favorites System**: Save your preferred recipes for quick access
- **Print-Friendly**: Optimized recipe view for printing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spice-scale.git
cd spice-scale
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── store/            # Redux store and slices
├── data/            # Static data (recipes, categories)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── App.tsx          # Root component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Recipe images from [Pexels](https://www.pexels.com)
- Icons from [Lucide](https://lucide.dev)
