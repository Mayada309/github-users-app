#  GitHub Users Explorer

A modern, responsive web application for discovering and managing GitHub users with advanced search capabilities, favorites system, and infinite scroll pagination.

##  Features

### Core Features

- **Real-time Search** - Debounced client-side search across all fetched users
- **Favorites System** - Save and manage favorite users with persistent local storage
- **React Router Navigation** - Clean routing between home and favorites pages
- **Dual View Modes** - Toggle between grid and list view layouts

### Bonus Features Implemented

- **Infinite Scroll Pagination** - Seamlessly load GitHub users with 8 users per batch
- **Dark Mode Support** - Persistent theme switching with system preference detection
- **Debounced Search** - Optimized search with 300ms debounce for performance
- **Loading States & Error Handling** - Comprehensive error boundaries and loading indicators
- **Responsive Design** - Mobile-first design that works across all device sizes
- **TypeScript Integration** - Full type safety with Zod schema validation
- **Comprehensive Testing** - Jest + React Testing Library with high test coverage

##  Tech Stack

- **Frontend**: React 19, TypeScript 5.8
- **State Management**: Zustand with persistence middleware
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **HTTP Client**: Native Fetch API with error handling
- **Testing**: Jest, React Testing Library, ts-jest
- **Build Tool**: Vite with React plugin
- **Code Quality**: ESLint, TypeScript strict mode
- **Validation**: Zod for runtime type validation

##  Setup

- Node.js (v18 or higher)
- npm/yarn/pnpm/bun

##  Quick Start

```bash
# Clone the repository
git clone https://github.com/Mayada309/github-users-app.git
cd github-users-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your GitHub API endpoint to .env

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

##  Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, etc.)
│   ├── Searchbar.tsx    # Search input with debouncing
│   ├── UserCard.tsx     # Individual user display component
│   ├── UserGrid.tsx     # Grid layout for users
│   ├── UserList.tsx     # List layout for users
│   ├── ThemeToggle.tsx  # Dark/light mode toggle
│   └── ViewToggle.tsx   # Grid/list view toggle
├── pages/               # Route components
│   ├── Home.tsx         # Main users listing page
│   └── Favorites.tsx    # Favorites management page
├── hooks/               # Custom React hooks
│   ├── useDebounce.ts   # Search debouncing hook
│   ├── useInfiniteScroll.ts # Infinite scroll logic
│   └── useUsers.ts      # Users data fetching hook
├── store/               # Zustand state management
│   ├── favorites-store.ts    # Favorites state with persistence
│   ├── infinite-scroll-store.ts # Pagination state
│   ├── search-store.ts       # Search state management
│   ├── theme-store.ts        # Theme state with persistence
│   └── view-store.ts         # View mode state
├── services/            # API and external services
│   ├── api.ts          # HTTP client abstraction
│   ├── users.ts        # GitHub users API service
│   └── env.ts          # Environment validation
├── types/               # TypeScript type definitions
│   └── user.ts         # User data types
├── utils/               # Utility functions
│   └── handle-search-params.ts # URL search params handling
└── lib/                 # Shared utilities
    └── utils.ts        # Common helper functions
```

##  Technical Design Decisions

### State Management

**Why Zustand instead of localStorage and Redux**:

- **vs localStorage**: While localStorage is great for simple persistence, it lacks reactive state management, type safety, and complex state logic. Zustand provides reactive updates, TypeScript support, and middleware capabilities while still offering persistence.
- **vs Redux**: Redux requires significant boilerplate (actions, reducers, selectors) and can be overkill for smaller applications. Zustand offers similar capabilities with 90% less code, better TypeScript inference, and simpler mental model for this project's scope.

**Persistence Strategy**: Implemented selective persistence using Zustand's `persist` middleware with `partialize` to only store necessary data (favorites and theme preferences) in localStorage.

**State Structure**: Modular store design with separate stores for different concerns (favorites, search, pagination, theme) to maintain clear separation of responsibilities.

### Data Fetching

**Why fetch instead of axios**:

- **Bundle Size**: Native fetch API reduces bundle size by ~13KB compared to axios
- **Modern Standard**: Fetch is the modern web standard, well-supported across all browsers
- **Simplicity**: For this project's API needs, fetch provides sufficient functionality without additional dependencies
- **Future-proof**: Better long-term support and performance optimizations from browser vendors

**Why React Query (TanStack Query)**:

- **Server State Management**: React Query excels at managing server state with built-in caching, background updates, and synchronization
- **Performance**: Automatic request deduplication, intelligent caching, and background refetching reduce unnecessary API calls
- **Developer Experience**: Excellent DevTools, optimistic updates, and error handling out of the box
- **Infinite Queries**: Perfect fit for our infinite scroll pagination with built-in support for paginated data

### Error Handling

**User Feedback**: Clear error messages with retry functionality and graceful fallbacks for network issues.

##  Code Review Notes

### Strengths

- **Type Safety**: Comprehensive TypeScript usage with proper type definitions
- **Performance**: Optimized with debouncing, throttling, and efficient re-renders
- **User Experience**: Smooth interactions with loading states and error handling
- **Code Organization**: Clean separation of concerns with modular architecture
- **Testing**: Meaningful test cases
