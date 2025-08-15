# Google Flights Clone

A fully functional Google Flights-style application built with **Vite + React + Tailwind CSS** and integrated with the Sky-Scrapper API from RapidAPI.

## ✈️ Features

- 🔍 **Real Flight Search**: Integrated with Sky-Scrapper API for live flight data
- 🌙 **Dark/Light Mode**: Toggle between themes with localStorage persistence
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎛️ **Advanced Filters**: Price range slider, stops filter, airline selection
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development
- 🎨 **Clean UI**: Google Flights-inspired design with subtle shadows and spacing
- 🔄 **Loading States**: Smooth loading animations and error handling
- 📊 **Mock Data Fallback**: Works even without API key for testing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- RapidAPI account with Sky-Scrapper API access

### Installation

1. **Clone/Download the project**
2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up your API key:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Edit `.env` and add your RapidAPI key:
   \`\`\`env
   VITE_RAPIDAPI_KEY=your_rapidapi_key_here
   VITE_RAPIDAPI_HOST=sky-scrapper.p.rapidapi.com
   \`\`\`

4. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open [http://localhost:3000](http://localhost:3000)**

That's it! The app will work immediately with your API key, or show mock data if no key is provided.

## 🏗️ Project Structure

\`\`\`
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation with theme toggle
│   │   ├── SearchForm.jsx       # Flight search form
│   │   ├── Filters.jsx          # Sidebar filters (collapsible)
│   │   ├── FlightCard.jsx       # Individual flight display
│   │   ├── FlightsList.jsx      # Flight results container
│   │   ├── LoadingSpinner.jsx   # Reusable loading component
│   │   └── ErrorBoundary.jsx    # Error handling wrapper
│   ├── services/
│   │   └── api.js               # Sky-Scrapper API integration
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Tailwind CSS styles
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── .env.example                # Environment variables template
\`\`\`

## 🔧 API Integration

### Sky-Scrapper API Setup

1. **Get API Key:**
   - Sign up at [RapidAPI](https://rapidapi.com)
   - Subscribe to [Sky-Scrapper API](https://rapidapi.com/apiheya/api/sky-scrapper)
   - Copy your API key

2. **Configuration:**
   The API service (`src/services/api.js`) is pre-configured with:
   - Automatic error handling
   - Mock data fallback
   - Response transformation
   - Environment variable integration

3. **API Endpoints Used:**
   - `GET /api/v1/flights/searchFlights` - Main flight search

### Data Flow

\`\`\`
SearchForm → API Service → Sky-Scrapper API → Transform Data → FlightsList
\`\`\`

## 🎨 UI Components

### Core Components

- **`Navbar`**: Logo, dark mode toggle, profile avatar
- **`SearchForm`**: Origin/destination inputs, date pickers, passenger selector
- **`Filters`**: Price range slider, stops checkboxes, airline multi-select
- **`FlightCard`**: Airline info, flight times, duration, price, book button
- **`FlightsList`**: Results display with loading/error/empty states

### Mobile Features

- Collapsible filters sidebar
- Touch-friendly controls
- Responsive flight cards
- Optimized form layouts

## 🛠️ Customization

### Styling
- **Tailwind CSS** for all styling
- **Dark mode** with automatic system detection
- **Custom color scheme** in `tailwind.config.js`
- **Responsive breakpoints**: `sm:`, `md:`, `lg:`, `xl:`

### API Configuration
Update `src/services/api.js` to modify:
- API endpoints
- Request parameters
- Response transformation
- Error handling

### Mock Data
Modify `MOCK_FLIGHTS` in `src/services/api.js` for testing without API key.

## 📱 Responsive Design

- **Mobile First**: Designed for mobile, enhanced for desktop
- **Breakpoints**: 
  - `sm`: 640px+ (tablets)
  - `md`: 768px+ (small laptops)
  - `lg`: 1024px+ (desktops)
  - `xl`: 1280px+ (large screens)

## 🔍 Flight Search Features

### Search Form
- Origin/destination with swap button
- Departure/return date pickers
- Passenger count selector
- Trip type (round-trip/one-way)
- Form validation

### Filters
- **Price Range**: Dual slider with min/max
- **Stops**: Non-stop, 1 stop, 2+ stops
- **Airlines**: Multi-select checkboxes
- **Mobile**: Collapsible with active indicators

### Results
- **Sorting**: By price (lowest first)
- **Loading**: Animated spinner with status
- **Error**: Graceful fallback to mock data
- **Empty**: Helpful messaging for no results

## 🚀 Performance

- **Vite**: Fast development and optimized builds
- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Unused code elimination
- **Lazy Loading**: Images and components
- **Lighthouse Score**: Optimized for performance

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📦 Build & Deploy

### Development
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
\`\`\`

### Production
\`\`\`bash
npm run build
npm run preview
\`\`\`

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_RAPIDAPI_KEY` | Your RapidAPI key for Sky-Scrapper | Yes* |
| `VITE_RAPIDAPI_HOST` | API host (default: sky-scrapper.p.rapidapi.com) | No |

*Required for live data. App works with mock data if not provided.

## 🐛 Troubleshooting

### Common Issues

1. **No flights showing**: Check your API key in `.env`
2. **API errors**: Verify your RapidAPI subscription is active
3. **Styling issues**: Ensure Tailwind CSS is properly configured
4. **Build errors**: Check Node.js version (18+ required)

### Debug Mode
Set `console.log` statements in `src/services/api.js` to debug API calls.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test on multiple devices/browsers
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Ready to fly?** 🛫 Just add your API key and start searching for flights!
