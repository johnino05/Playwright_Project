# QA Test Academy — AI-Driven Playwright Framework

Playwright + TypeScript + Claude AI test framework for [qatestacademy.com](https://qatestacademy.com).

## Stack
- **Playwright 1.56** — browser automation
- **TypeScript 6** — type-safe tests
- **Claude AI** — dynamic scenario generation, edge cases, failure analysis
- **Page Object Model** — maintainable locator layer

## Setup
```bash
# 1. Clone and enter
git clone <repo> && cd qa-test-academy

# 2. Copy env and fill in your values
cp .env.example .env

# 3. Run tests
npx playwright test
```

## Commands
| Command | Description |
|---|---|
| `npm test` | Run all tests |
| `npm run test:auth` | Auth tests only |
| `npm run test:payment` | Payment tests only |
| `npm run test:a11y` | Accessibility tests only |
| `npm run test:smoke` | Smoke tests only |
| `npm run test:headed` | Watch tests run |
| `npm run test:debug` | Run Playwright in debug mode |
| `npm run test:ui` | Interactive UI mode |
| `npm run lint` | Run ESLint on test files |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format files with Prettier |
| `npm run report` | Open HTML report |
| `npm run codegen` | Record new tests |

## Project structure
```
tests/
  pages/         Page Object Models
  fixtures/      Shared test fixtures + auth setup
  data/          Test credentials and payment data
  specs/         Test files organized by flow
    auth/
    enrollment/
    payment/
    video/
    downloads/
    accessibility/
  ai/            Claude AI helper utilities
```

## Environment variables
See `.env.example` for all required variables.
Set `ANTHROPIC_API_KEY` to enable AI-powered scenario generation.

## Improvements added
- Typed configuration with `playwright.config.ts`
- ESLint + Prettier formatting
- Smoke test suite with `@smoke` tag
- GitHub Actions workflow publishing HTML and JUnit reports
- Fixture-based authenticated pages for student, instructor, and admin
