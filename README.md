# HTTP Status Codes API

A REST API to explore and manage HTTP status codes organized by categories. Built with Express, TypeScript, Drizzle ORM and PostgreSQL.

## What is this?

This project provides a comprehensive API for HTTP status codes (200, 404, 500, etc.) grouped into categories like "Successful Responses", "Client Errors", "Server Errors", etc. Perfect for developers who want to quickly look up what each status code means.

## ✨ Features

- **Complete HTTP status codes catalog** with descriptions.
- **Categories system** (Informational, Success, Redirects, Client Errors, Server Errors)
- **RESTful API** with clean endpoints
- **TypeScript** for type safety
- **PostgreSQL database** with Drizzle ORM
- **Input validation** with Zod
- **Monorepo structure** ready for frontend + backend

## 📋 Prerequisites

- Node.js >= 18
- pnpm >= 8
- PostgreSQL >= 14

## 🚀 Quick Start

1. **Install dependencies:**

```bash
pnpm install
```

2. **Setup environment variables:**

```bash
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/http_status_codes
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

3. **Setup database:**

```bash
pnpm db:generate    # Generate migrations
pnpm db:migrate     # Run migrations
pnpm db:seed        # Load initial data
```

4. **Start development server:**

```bash
pnpm dev
```

API will be available at `http://localhost:3000/api`

## 📚 API Endpoints

### Status Codes

- `GET /api/status-codes` - Get all status codes with their categories
- `GET /api/status-codes/:id` - Get specific status code by ID
- `GET /api/status-codes/code/:code` - Get status code by number (e.g., `/code/404`)
- `POST /api/status-codes` - Create new status code
- `PUT /api/status-codes/:id` - Update status code
- `DELETE /api/status-codes/:id` - Delete status code

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get specific category
- `GET /api/categories/:id/codes` - Get category with all its status codes
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Health

- `GET /api/health` - Check if API is running

## 📝 Example Requests

**Get all status codes:**

```bash
curl http://localhost:3000/api/status-codes
```

**Get code 404:**

```bash
curl http://localhost:3000/api/status-codes/code/404
```

**Create new status code:**

```bash
curl -X POST http://localhost:3000/api/status-codes \
  -H "Content-Type: application/json" \
  -d '{
    "code": 418,
    "name": "I am a teapot",
    "description": "The server refuses to brew coffee because it is a teapot",
    "categoryId": 4
  }'
```

## 🗂️ Project Structure

```
.
├── apps/
│   ├── api/                    # Backend API
│   │   ├── src/
│   │   │   ├── controllers/    # Request handlers
│   │   │   ├── services/       # Business logic
│   │   │   ├── repositories/   # Database queries
│   │   │   ├── routes/         # API routes
│   │   │   ├── db/             # Database config & seeds
│   │   │   └── validators/     # Input validation
│   │   └── package.json
│   └── web/                    # Frontend (React)
├── pnpm-workspace.yaml
└── package.json
```

## 🛠️ Available Scripts

**Development:**

- `pnpm dev` - Start API and Web in parallel
- `pnpm dev:api` - Start only API
- `pnpm dev:web` - Start only Web

**Database:**

- `pnpm db:generate` - Generate migrations
- `pnpm db:migrate` - Run migrations
- `pnpm db:studio` - Open Drizzle Studio (visual DB editor)
- `pnpm db:seed` - Seed database with initial data

**Production:**

- `pnpm build` - Build both API and Web
- `pnpm start` - Start API in production mode

**Other:**

- `pnpm lint` - Run linter
- `pnpm clean` - Clean node_modules and build files

## 🏗️ Tech Stack

- **Backend:** Express.js + TypeScript
- **Frontend:** Next.js 16 + Tailwind
- **Database:** PostgreSQL + Drizzle ORM
- **Validation:** Zod
- **Security:** Helmet + CORS
- **Monorepo:** pnpm workspaces

## 📦 What's Included

The database comes pre-seeded with all standard HTTP status codes:

- **1xx - Informational:** 100 Continue, 101 Switching Protocols, 102 Processing
- **2xx - Success:** 200 OK, 201 Created, 202 Accepted, 204 No Content
- **3xx - Redirection:** 301 Moved Permanently, 302 Found, 304 Not Modified, 307/308 Redirects
- **4xx - Client Errors:** 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, 408 Timeout, 429 Too Many Requests
- **5xx - Server Errors:** 500 Internal Server Error, 501 Not Implemented, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout

## 🎯 Use Cases

- **Documentation:** Quickly look up HTTP status codes
- **Learning:** Understand what each status code means
- **Development:** Integrate into your apps to show user-friendly error messages
- **Testing:** Reference for API testing scenarios

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
