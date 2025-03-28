# Account Keeper Gateway

A user management application built with React, Vite, and Tailwind CSS.

## Overview

This application provides a user management interface with authentication and user listing capabilities. It uses the ReqRes API (https://reqres.in) for authentication and user data management.

## Features

- User authentication (login/logout)
- Protected routes for authenticated users
- User listing with pagination
- User detail view
- Responsive design

## Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Routing**: React Router
- **API Client**: Axios
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **TypeScript**: For type safety

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vishnuu5/Employwise-task.git
cd account-keeper-gateway
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## Authentication

This application uses the ReqRes API for authentication. You can use the following credentials for testing:

- Email: `eve.holt@reqres.in`
- Password: `cityslicka`

## Project Structure

```
src/
├── components/       # Reusable UI components
├── contexts/         # React Context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and API client
├── pages/            # Page components
└── App.tsx           # Main application component
```

## Deployment

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will generate a `dist` folder with the production-ready assets.



## License

This project is licensed under the MIT License.