# AGENTS.md - Angular Material & CDK Development Guide

This document provides guidance for AI coding agents (like Jules) and developers working with the Angular Material Components library. It describes the architecture, tools, conventions, and workflows to help generate more relevant plans and completions.

## Repository Overview

**Repository:** `angular/components`  
**Purpose:** Official Material Design components, Component Dev Kit (CDK), and related tools for Angular applications  
**Packages:**
- `@angular/material` - Material Design UI components
- `@angular/cdk` - Component Dev Kit for building custom components
- `@angular/google-maps` - Angular wrapper for Google Maps JavaScript API
- `@angular/youtube-player` - Angular wrapper for YouTube Player API

## Build System & Tools

### Primary Build Tool: Bazel
- The project uses **Bazel** as its primary build system
- Build files: `BUILD.bazel`, `MODULE.bazel`
- Configuration: `packages.bzl`, `pkg-externals.bzl`

### Package Manager: pnpm
- **Required version:** `pnpm@10.20.0`
- Workspace configuration: `pnpm-workspace.yaml`
- Lock file: `pnpm-lock.yaml`
- **Do not use npm or yarn** - the project enforces pnpm usage

### Key Development Commands

#### Building
- `pnpm build` - Build all packages in release mode (output: `dist/releases`)
- `pnpm build-docs-content` - Build documentation content
- `pnpm build-and-check-release-output` - Build and validate release artifacts

#### Development Server
- `pnpm dev-app` - Start local development server with hot reload
- `pnpm docs-app` - Start documentation app server
- `ibazel run //src/dev-app:devserver` - Alternative dev server with Bazel

#### Testing
- `pnpm test <target>` - Run unit tests (e.g., `pnpm test button` or `pnpm test src/cdk/stepper`)
- `pnpm test-local` - Run tests locally
- `pnpm test-firefox` - Run tests in Firefox
- `pnpm test --debug` - Debug tests with manual browser connection
- `pnpm e2e` - Run end-to-end tests
- `pnpm test-tsec` - Run security tests with tsec

#### Code Quality
- `pnpm lint` - Run all linters (tslint, stylelint, ownerslint, format check)
- `pnpm format` - Format changed files
- `pnpm ng-dev format changed` - Format using ng-dev tool
- `pnpm tslint` - TypeScript linting
- `pnpm stylelint` - CSS/SCSS linting
- `pnpm ownerslint` - CODEOWNERS validation

#### API Management
- `pnpm approve-api <target>` - Approve public API changes
- Golden files location: `goldens/<package>/<entry-point>.api.md`
- `pnpm check-entry-point-setup` - Validate entry point configuration
- `pnpm check-package-externals` - Verify package externals

#### Circular Dependencies
- `pnpm ts-circular-deps:check` - Check for circular dependencies
- `pnpm ts-circular-deps:approve` - Approve circular dependencies
- Configuration: `src/circular-deps-test.conf.cjs`

#### Other Tools
- `pnpm breaking-changes` - Analyze breaking changes
- `pnpm detect-component-id-collisions` - Detect component ID conflicts
- `pnpm integration-tests` - Run integration tests

## Project Structure

### Source Code (`src/`)
```
src/
├── cdk/                    # Component Dev Kit
│   ├── a11y/              # Accessibility utilities
│   ├── bidi/              # Bidirectionality support
│   ├── dialog/            # Dialog primitives
│   ├── drag-drop/         # Drag and drop functionality
│   ├── overlay/           # Overlay positioning
│   ├── portal/            # Portal for dynamic content
│   ├── scrolling/         # Virtual scrolling
│   ├── stepper/           # Stepper primitives
│   ├── table/             # Table primitives
│   ├── testing/           # Component test harnesses
│   └── schematics/        # CDK schematics
├── material/              # Material Design components
├── google-maps/           # Google Maps integration
├── youtube-player/        # YouTube player integration
├── dev-app/               # Development application
├── e2e-app/               # E2E test application
└── components-examples/   # Component usage examples
```

### Configuration Files
- `tsconfig.json` - Root TypeScript configuration
- `tslint.json` - TSLint rules
- `.stylelintrc.json` - Stylelint configuration
- `karma.conf.js` - Karma test runner configuration
- `firebase.json` - Firebase hosting configuration

### Documentation (`docs/` and `guides/`)
- `guides/` - Developer guides (theming, schematics, getting started, etc.)
- `docs/` - Documentation app source code

## Coding Standards & Conventions

### TypeScript
- **Style Guide:** Google TypeScript Style Guide
- **Line Length:** 100 characters maximum
- **Type Safety:** Avoid `any`; use generics when appropriate
- **Access Modifiers:**
  - Omit `public` (default)
  - Use `private` with underscore prefix (`_propertyName`)
  - Use `protected` without prefix
  - Use underscore for internal APIs without `private` keyword
- **Decorators:** Apply `@Input` to getter, not setter
- **Prefer:** `readonly` properties over getters with no setter

### Input Coercion
- Boolean inputs: Use `{transform: booleanAttribute}`
- Number inputs: Use appropriate transform function
```typescript
@Input({transform: booleanAttribute}) disabled: boolean = false;
```

### Naming Conventions
- **Classes:** Descriptive names capturing responsibility (e.g., `UniqueSelectionDispatcher`, not `RadioService`)
- **Components:** Prefix with `Mat` for Material components
- **Directives:** CamelCase selectors
- **Component Selectors:** Lowercase, hyphenated
- **Methods:** Action-based names (`activateRipple()`, not `handleClick()`)
- **Booleans:** Use `is` and `has` prefixes (except `@Input` properties)
- **Observables:** No `$` suffix

### CSS/SCSS
- **Specificity:** Use lowest specificity possible
- **No Nesting:** Avoid SCSS nesting for organization
- **Host Styling:** Never set margin on host elements
- **Classes over Tags:** Use CSS classes, not tag names or attributes
- **High Contrast:** Support Windows high-contrast mode
- **Flexbox:** Use cautiously; avoid on projected content

### Angular Patterns
- **Host Bindings:** Prefer `host` object over `@HostBinding`/`@HostListener`
- **Inheritance:** Avoid; use TypeScript mixins for reusable behaviors
- **Content Projection:** Expose native inputs through `ng-content`

### Comments
- **Why over What:** Explain why code exists, not just what it does
- **TypeScript:** Use JsDoc for classes/members, `//` for explanations
- **SCSS:** Always use `//` style comments
- **HTML:** Use `<!-- -->` (stripped during build)
- **Public APIs:** All must have user-facing JsDoc comments

### Testing
- **Framework:** Jasmine with Karma
- **E2E:** Bazel-based e2e tests
- **Component Harnesses:** CDK testing harnesses for component interaction
- **Coverage:** All features/bugs must have specs

## Schematics

### Angular Material Schematics
- `ng add @angular/material` - Installation schematic
- `ng generate @angular/material:address-form` - Form component
- `ng generate @angular/material:navigation` - Nav component with sidenav
- `ng generate @angular/material:table` - Data table with sorting/pagination
- `ng generate @angular/material:dashboard` - Dashboard with cards
- `ng generate @angular/material:tree` - Tree component

### CDK Schematics
- `ng add @angular/cdk` - CDK installation
- `ng generate @angular/cdk:drag-drop` - Drag-drop component

## Development Workflow

### Initial Setup
1. Install Node.js (use `nvm` for version management)
2. Install pnpm@10.20.0
3. Clone repository
4. Run `pnpm i` to install dependencies

### Making Changes
1. Create branch: `git checkout -b my-fix-branch main`
2. Make changes with appropriate test cases
3. Follow commit message conventions (see below)
4. Run test suite
5. Test with supported browsers and screen readers
6. Submit PR

### Commit Message Format
```
<type>(<package>/<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Test improvements
- `build` - Build system changes
- `ci` - CI configuration changes
- `release` - Release point

**Example:**
```
fix(material/button): unable to disable button through binding

Fixes a bug where buttons cannot be disabled through a binding
because the disabled input did not set the .mat-button-disabled class.

Fixes #1234
```

### PR Checklist
- [ ] Appropriate tests included
- [ ] Follows coding rules
- [ ] Tested with supported browsers
- [ ] Commit messages follow conventions
- [ ] Public API changes approved (`pnpm approve-api <target>`)
- [ ] CLA signed

## Environment Variables

### Dev App Variables
These can be set in your shell configuration (`.bashrc`, `.zshrc`):
- `GOOGLE_MAPS_KEY` - API key for Google Maps integration
- `HUSKY=0` - Disable Git hooks if desired

## Browser & Accessibility Support

### Browsers (latest 2 versions)
- Chrome (including Android)
- Firefox
- Safari (including iOS)
- Edge

### Screen Readers
- **Windows:** NVDA and JAWS with FF/Chrome
- **macOS:** VoiceOver with Safari/Chrome
- **iOS:** VoiceOver with Safari
- **Android:** Android Accessibility Suite with Chrome
- **Chrome OS:** ChromeVox with Chrome

## Windows Development

**Use Windows Subsystem for Linux (WSL):**
1. Run `wsl --install` from PowerShell (as administrator)
2. Restart machine
3. Enter WSL: `wsl`
4. Continue with Linux-based development

## CI/CD Integration

### CircleCI Artifacts
- Build artifacts available per PR
- Format: `<package-name>-pr<pr-number>-<sha>.tgz`
- Install from artifacts:
```json
"dependencies": {
  "@angular/material": "https://...circle-artifacts.com.../material-pr12345-a1b2c3d.tgz"
}
```

## Key Files for Agent Context

### Understanding the Project
- `README.md` - Project overview
- `CONTRIBUTING.md` - Contribution guidelines
- `CODING_STANDARDS.md` - Detailed coding standards
- `DEV_ENVIRONMENT.md` - Environment setup

### Understanding Components
- `src/material/` - Material component implementations
- `src/cdk/` - CDK implementation
- `src/components-examples/` - Usage examples
- `guides/` - Developer guides

### Understanding Build
- `BUILD.bazel` - Bazel build configuration
- `package.json` - npm scripts and dependencies
- `.ng-dev/` - Angular dev-infra configuration

### Understanding Tests
- `karma.conf.js` - Test runner configuration
- `src/**/*.spec.ts` - Unit tests
- `src/e2e-app/` - E2E tests

## Common Agent Tasks

### Adding a New Component
1. Create component directory in `src/material/` or `src/cdk/`
2. Implement component with appropriate tests
3. Add component to `public-api.ts`
4. Update BUILD.bazel files
5. Add examples to `src/components-examples/`
6. Update golden files: `pnpm approve-api <package>`
7. Add documentation

### Fixing a Bug
1. Identify affected component/package
2. Write failing test case first
3. Implement fix
4. Verify tests pass: `pnpm test <target>`
5. Check for breaking changes
6. Update API golden if needed

### Updating Styles
1. Follow CSS conventions (low specificity, no nesting)
2. Support high-contrast mode
3. Test in all supported browsers
4. Verify no margin on host elements
5. Run `pnpm stylelint`

### Refactoring Code
1. Ensure no breaking changes to public API
2. Update tests as needed
3. Verify circular dependencies: `pnpm ts-circular-deps:check`
4. Run full test suite
5. Check API changes: `pnpm approve-api <target>`

## Input/Output Conventions

### Component APIs
- **Inputs:** Use property decorators with coercion
- **Outputs:** Use EventEmitter with descriptive names
- **Methods:** Public API methods require explicit types
- **Properties:** Document with JsDoc

### File Organization
- **200-300 lines** ideal file length
- **400 lines** triggers refactor consideration
- **Single responsibility** per module

## Testing Patterns

### Unit Tests
- Use Jasmine test framework
- Use ComponentHarness for component interaction
- Test behavior, not implementation
- Mock external dependencies
- Test accessibility features

### E2E Tests
- Tag with `e2e` in BUILD.bazel
- Run with `pnpm e2e`
- Test complete user workflows
- Verify cross-browser compatibility

## Release Process

### Creating Release
1. Run `pnpm build` to create release packages
2. Output: `dist/releases/`
3. Archives created: `create-package-archives.mjs`
4. Validation: `build-and-check-release-output.mts`

### Version Management
- Version in `package.json` (e.g., `21.1.0-next.0`)
- Follow semantic versioning
- Update CHANGELOG.md
- Tag releases appropriately

## Additional Resources

- **Documentation:** https://material.angular.dev
- **CDK Docs:** https://material.angular.dev/cdk/categories
- **API Reference:** Auto-generated from JsDoc comments
- **Community:** https://groups.google.com/forum/#!forum/angular-material2
- **Issues:** https://github.com/angular/components/issues
- **Gitter Chat:** https://gitter.im/angular/material2

## Agent Tips

1. **Always use pnpm**, never npm or yarn
2. **Run tests** before and after changes
3. **Check API changes** with `pnpm approve-api`
4. **Follow commit conventions** strictly
5. **Maintain 100-column limit** in all files
6. **Document public APIs** with JsDoc
7. **Test accessibility** features thoroughly
8. **Support all target browsers** and screen readers
9. **Use Bazel** for builds, not direct tsc
10. **Leverage component harnesses** for testing

---

**Last Updated:** November 2025  
**For Questions:** See CONTRIBUTING.md or open an issue on GitHub
