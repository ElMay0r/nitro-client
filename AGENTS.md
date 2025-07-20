# Agent Guidelines for Nitro Client Repository

## Repository Purpose
Nitro Client is an Angular front-end that integrates with the `@nitrots/nitro-renderer` package to display a Habbo-like client in the browser.

## Setup
1. Install **NodeJS v16.13** or higher and `yarn`.
2. Run `yarn install` to install dependencies. The `postinstall` script will send anonymous package data to `install.nitrots.co`.
3. Copy example configuration files:
   - `.env.example` → `.env`
   - `src/renderer-config.json.example` → `src/renderer-config.json`
   - `src/ui-config.json.example` → `src/ui-config.json`
4. Update the new files with your server/asset URLs.
5. Start the dev server with `yarn start`.
6. Build a production bundle with `yarn build-prod` (outputs to `dist/`).

## Configuration
Runtime options are read from `.env`, `src/renderer-config.json`, and `src/ui-config.json`. These values are provided to the application via the global `NitroConfig` object in `src/index.html`.

## Code Style
- ESLint is not used. Do not run `yarn eslint`.
- Follow `.editorconfig` for formatting rules:
  - 4 space indentation
  - single quotes
  - semicolons
  - Allman brace style


## Continuous Integration
`.gitlab-ci.yml` installs dependencies and builds the project.

## Repository Layout
- `src/app/` – Angular modules and components.
- `src/assets/` – static assets.
- `src/environments/` – environment definitions.
- `src/renderer-config.json` and `src/ui-config.json` – application configuration.
- `src/main.ts` – application bootstrap.

## Additional Notes
- There are no unit tests.
- SCSS is the default style format for Angular components.
- the renderer comunicates with the Habbo Emulator in Java repo: https://git.krews.org/morningstar/Arcturus-Community

Follow these guidelines for any code modifications or troubleshooting within this repository.
