# Playwright TypeScript Framework

A test automation framework using Playwright, TypeScript, Page Object Model, Allure reports, and Docker.

## Structure

```
├── pages/              # Page Object Model
│   ├── BasePage.ts     # Base class for all pages
│   ├── HomePage.ts     # Example page object
│   └── index.ts
├── tests/              # Test specifications
│   ├── fixtures.ts     # Test fixtures with POM injection
│   └── example.spec.ts
├── utils/              # Utilities
│   └── config.ts       # Config loaded from .env
├── .env                # Environment variables (BASE_URL)
├── .env.example        # Template for .env
├── playwright.config.ts
├── Dockerfile
└── docker-compose.yml
```

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install Playwright browsers** (first time only)
   ```bash
   npx playwright install
   ```

3. **Configure environment**
   - Copy `.env.example` to `.env` and set `BASE_URL` to your app URL

## Running Tests

```bash
# Run all tests
npm test

# Run with UI mode
npm run test:ui

# Run headed (visible browser)
npm run test:headed
```

## Allure Reports

After running tests:

```bash
# Generate and open Allure report
npm run report

# Generate report only
npm run report:generate
```

Then open `allure-report/index.html` or run `allure open allure-report`.

## Docker

This repository includes a Dockerfile under `.docker/Dockerfile` and a CI-ready Compose file at `docker-compose.yml`.

```bash
# Build the image and run tests in Docker
docker-compose up --build

# Override BASE_URL for CI or external environments
BASE_URL=https://your-app.com docker-compose up --build
```

The container uses `CI=1`, runs Playwright in headless mode, and persists results to `./allure-results`.

This project also now uses Playwright storage state so login is performed once in `global-setup.ts` and replayed for all tests.

Allure results are written to `./allure-results`. Generate the report locally:

```bash
allure generate ./allure-results -o ./allure-report --clean
allure open ./allure-report
```

## Adding New Pages

1. Create `pages/YourPage.ts` extending `BasePage`
2. Export from `pages/index.ts`
3. Add fixture in `tests/fixtures.ts`
4. Use in tests: `test('...', async ({ yourPage }) => { ... })`
