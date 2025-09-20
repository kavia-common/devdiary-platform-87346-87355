# DevDiary Frontend (React)

Modern, modular React application implementing the DevDiary UI with the Ocean Professional theme.

## Highlights

- Ocean Professional theme (primary #2563EB, secondary #F59E0B, error #EF4444)
- Global CSS variables and dark mode via ThemeProvider
- Modular layout: Sidebar, Topbar, RightPanel with activity feed
- Modules/pages: Logs, Standup, Integrations, Insights
- Reusable components: Button, Card, Modal, Input, Tag
- React Router for navigation
- Fetch wrapper and environment config scaffolds
- Accessible interactions with keyboard and focus states
- Smooth transitions and minimalist design

## Project Structure

- src/styles/global.css — theme variables, base styles
- src/theme/theme.js — theme constant (colors)
- src/context/ThemeContext.js — theme provider and hook
- src/components/common/ — reusable UI components
- src/components/layout/ — Sidebar, Topbar, RightPanel, MainLayout
- src/pages/ — Logs, Standup, Integrations, Insights
- src/config/env.js — environment configuration (baseURL)
- src/services/http.js — GET/POST wrappers

## Run

- npm install
- npm start
- Open http://localhost:3000

## Environment

Create a .env file (do not commit secrets):

REACT_APP_API_BASE=https://your-backend.example.com/api

If not provided, defaults to http://localhost:4000/api.

## Backend Integration TODOs

- Logs: POST /logs to persist entries (currently local list)
- Standup: POST /standup/generate to generate summaries
- Integrations: POST /integrations/:key/connect to start OAuth
- Insights: Replace mock KPIs and trends with real metrics

Update src/config/env.js and use src/services/http.js for API calls.

## Accessibility

- Focus-visible rings
- A11y labels on buttons, modal has correct aria attributes
- Keyboard ESC to close modal
- High contrast dark mode

## Architecture Notes

- Routing is provided by react-router-dom v6
- Layout composes Left Sidebar, Topbar, Main content, RightPanel
- Theme is stored in localStorage and applied on root `data-theme`
- Styling uses CSS variables and inline styles for component theming

## License

Internal use.
