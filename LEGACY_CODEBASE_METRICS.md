# Legacy Angular 1.x Codebase Metrics

This document provides empirical measurements of the legacy AngularJS (1.x) codebase to support effort estimation for upgrade projects. All metrics exclude the `upgrade/` subdirectory.

## Size Metrics

The codebase contains **331 source files** broken down as follows:

| File Type | Count |
|-----------|-------|
| JavaScript | 151 |
| HTML Templates | 120 |
| SCSS Stylesheets | 60 |

## Lines of Code

| Category | LOC |
|----------|-----|
| JavaScript (src/app) | 8,669 |
| HTML Templates | 4,514 |
| SCSS Stylesheets | 8,283 |
| Gulp Build System | 527 |
| **Grand Total** | **21,993** |

## Screen Quantity

The application has **32 navigable screens/routes** organized into 27 page modules. There are 102 HTML templates in the pages directory, many of which are sub-components and widgets within screens.

## Complexity Metrics

| Component Type | Count |
|----------------|-------|
| Controllers | 49 |
| Directives | 35 |
| Services/Factories | 12 |
| Angular Modules | 30 |
| Filters | 5 |
| Providers | 2 |
| Constants | 3 |
| UI-Router States | 37 |

## Angular 1.x Specific Patterns

These patterns require migration to modern Angular equivalents:

| Pattern | Occurrences |
|---------|-------------|
| $scope usages | 270 |
| $rootScope usages | 9 |
| $watch usages | 11 |
| Function definitions | 369 |
| Promise chains (.then) | 7 |

## SCSS Complexity

| Metric | Count |
|--------|-------|
| Variables | 128 |
| Mixins | 35 |
| Import statements | 62 |

## Third-Party Dependencies

The application uses **42 bower dependencies** including:

- Angular 1.5.8
- jQuery 3.1.1
- Bootstrap 3.3.5
- AmCharts, Chart.js, Chartist, Morris (charting libraries)
- FullCalendar, Leaflet, and various UI components

## Breakdown by Feature Area

| Feature | JS Files | JS LOC | HTML LOC |
|---------|----------|--------|----------|
| Dashboard | 20 | 964 | 229 |
| Charts | 17 | 1,929 | 231 |
| Forms | 12 | 437 | 788 |
| UI Components | 18 | 739 | 1,984 |
| Tables | 2 | 756 | 505 |
| Maps | 5 | 900 | 19 |
| Components (mail/timeline/tree) | 12 | 913 | 337 |
| Theme/Shared | 48 | 1,823 | 190 |

## Summary

This legacy codebase represents approximately **22,000 lines of code** across **32 screens**, with **49 controllers** and **35 directives** requiring migration from Angular 1.x patterns ($scope, $watch, etc.) to modern Angular. The 270 $scope usages and 42 third-party dependencies are key factors in estimating upgrade complexity.
