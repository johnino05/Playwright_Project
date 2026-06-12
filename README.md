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
| `npx playwright test` | Run all tests |
| `npx playwright test --grep @auth` | Auth tests only |
| `npx playwright test --grep @payment` | Payment tests only |
| `npx playwright test --headed` | Watch tests run |
| `npx playwright test --ui` | Interactive UI mode |
| `npx playwright show-report` | Open HTML report |
| `npx playwright codegen https://qatestacademy.com` | Record new tests |

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
