# Altos del Murco Web Server

A lightweight Kotlin/Ktor web server for the **Altos del Murco** tourism and restaurant ecosystem.  
It serves the public web pages for the project, exposes a health endpoint for deployment checks, and is structured so it can grow into a stronger backend for the Altos apps over time.

---

## Overview

This repository currently contains a Ktor-based server for the Altos del Murco web presence under the package:

```kotlin
com.premierdarkcoffee.tourism
```

The server is designed to serve static HTML pages such as:

- Home
- About
- Privacy Policy
- Terms and Conditions

It also exposes a simple health endpoint that can be used by hosting platforms, reverse proxies, uptime monitors, or deployment checks.

---

## Current Features

### Static website routing

The server maps public routes to HTML resources bundled inside the application:

| Route | Page |
|---|---|
| `/` | Home page |
| `/about` | About page |
| `/privacy` | Privacy Policy |
| `/privacy-policy` | Privacy Policy alias |
| `/terms` | Terms and Conditions |
| `/terms-and-conditions` | Terms and Conditions alias |

Static assets are served from:

```text
/static
```

### Health check endpoint

The server includes a JSON health endpoint:

```http
GET /health
```

Expected response:

```json
{
  "status": "ok",
  "service": "altos-del-murco-web"
}
```

This is useful for:

- DigitalOcean deployment checks
- Docker health checks
- Nginx reverse proxy validation
- External uptime monitoring
- CI/CD smoke tests

### Dependency injection with Koin

The project includes Koin configuration and a simple `HelloService` example, making the app ready for cleaner service/module expansion.

### Test coverage starter

A basic server test verifies that the root endpoint returns `200 OK`.

---

## Tech Stack

- **Kotlin**
- **Ktor Server**
- **Netty engine**
- **Koin** for dependency injection
- **Logback / SLF4J** for logging
- **Kotlin test utilities** for endpoint tests

---

## Project Structure

```text
src
├── main
│   └── kotlin
│       ├── HelloService.kt
│       ├── Koin.kt
│       ├── Routing.kt
│       ├── Serialization.kt
│       └── main.kt
│
└── test
    └── kotlin
        └── ServerTest.kt
```

### Main files

| File | Purpose |
|---|---|
| `main.kt` | Starts the Ktor server using Netty |
| `Routing.kt` | Defines public web routes and static resource serving |
| `Serialization.kt` | Configures content negotiation |
| `Koin.kt` | Configures dependency injection |
| `HelloService.kt` | Example service interface |
| `ServerTest.kt` | Basic root endpoint test |

---

## Getting Started

### Prerequisites

Make sure you have:

- JDK 17 or newer
- Kotlin/Gradle project support
- IntelliJ IDEA Community or Ultimate
- Git

Check your Java version:

```bash
java -version
```

---

## Run Locally

From the root of the project:

```bash
./gradlew run
```

Then open:

```text
http://localhost:8080
```

Check the health endpoint:

```bash
curl http://localhost:8080/health
```

---

## Run Tests

```bash
./gradlew test
```

---

## Build

```bash
./gradlew build
```

The generated build output will be available inside:

```text
build/
```

---

## Recommended Static Resource Layout

The routing layer expects static HTML files to be available as application resources.

A recommended layout is:

```text
src/main/resources
└── static
    ├── index.html
    ├── about.html
    ├── privacy.html
    ├── terms.html
    ├── css
    │   └── styles.css
    ├── js
    │   └── main.js
    └── images
        └── ...
```

---

## Deployment Notes

This server is suitable for deployment behind a reverse proxy such as Nginx.

Example production flow:

```text
User Browser
    ↓
Domain / Subdomain
    ↓
Nginx Reverse Proxy
    ↓
Ktor Server
```

For example:

```text
tourism.premierdarkcoffee.com → Ktor server
```

Recommended deployment checks:

```bash
curl https://your-domain.com/health
```

The expected response should include:

```json
{
  "status": "ok"
}
```

---

## Suggested Nginx Reverse Proxy Configuration

Example only. Adjust the port, domain, SSL settings, and server paths to match your deployment.

```nginx
server {
    server_name tourism.premierdarkcoffee.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

After configuring SSL with Certbot, the site should be served through HTTPS.

---

## Recommended `.gitignore`

Make sure your repository does not track build files, IDE caches, or generated exports:

```gitignore
.gradle/
build/
.idea/
*.iml
out/

# Generated exports
project_kotlin_files.md
project_swift_files.md
export_kotlin_to_md.sh
export_swift_to_md.sh

# OS files
.DS_Store
```

---

## Current API

### `GET /`

Returns the home page.

### `GET /about`

Returns the about page.

### `GET /privacy`

Returns the privacy policy page.

### `GET /privacy-policy`

Alias for the privacy policy page.

### `GET /terms`

Returns the terms and conditions page.

### `GET /terms-and-conditions`

Alias for the terms and conditions page.

### `GET /health`

Returns server health status as JSON.

---

## Roadmap Ideas

This repository can evolve from a static web server into a complete backend for the Altos del Murco ecosystem.

Possible future improvements:

- Add contact form support
- Add restaurant menu API
- Add adventure activities API
- Add booking/reservation backend
- Add admin authentication
- Add Firebase Admin SDK integration
- Add structured JSON serialization
- Add request logging and monitoring
- Add Docker production deployment
- Add CI/CD with GitHub Actions
- Add SEO-friendly dynamic metadata
- Add sitemap and robots.txt
- Add Open Graph metadata for social sharing
- Add analytics endpoints for the admin app

---

## Development Guidelines

Recommended conventions for future code:

- Keep routes small and focused
- Move business logic into services
- Use Koin modules for dependency injection
- Keep DTOs separate from domain models
- Add tests for each public route
- Return clear HTTP status codes
- Keep static pages lightweight and cache-friendly
- Avoid committing generated Markdown exports

---

## Useful Commands

### Run server

```bash
./gradlew run
```

### Test server

```bash
./gradlew test
```

### Build project

```bash
./gradlew build
```

### Check Git status

```bash
git status
```

### Commit changes

```bash
git add .
git commit -m "Update web server"
git push
```

---

## About Altos del Murco

**Altos del Murco** is a tourism, restaurant, and adventure experience project focused on combining food, nature, and outdoor activities in one destination.

The broader ecosystem includes:

- A client-facing mobile app
- An admin/back-office app
- Restaurant ordering and reservations
- Adventure activity bookings
- Loyalty and rewards
- Public web presence

This server supports the public web layer and can later become part of the larger digital infrastructure for the project.

---

## License

Add your preferred license here.

For private commercial projects, you may leave the repository unlicensed or add a custom proprietary notice.

Example:

```text
Copyright © 2026 Altos del Murco.
All rights reserved.
```

---

## Author

Developed for **Altos del Murco**.

