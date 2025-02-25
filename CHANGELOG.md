# Changelog

Created a file to document all updates moving foward:

📌 Tip: Follow Semantic Versioning:

Major (1.0.0) – Significant updates, breaking changes.
Minor (1.1.0) – New features, but backward-compatible.
Patch (1.1.1) – Bug fixes, security patches.

## [1.1.0] - 2025-02-24
### Added
- Created a JavaScript file (MealPlan.js) that restricts access to the Meal Plan page by checking a login flag.
- Updated Login.js to set a login flag in localStorage upon successful login, ensuring only authenticated users can access protected pages.

## [1.0.1] - 2025-02-09
### Added
- Implemented backend API for handling comments.
- Integrated MongoDB database for storing user feedback.

### Fixed
- Resolved form validation issues in `faq.js`.
- Improved error handling for empty form submissions.

## [1.0.0] - 2025-02-01
### Initial Release
- Set up project structure.
- Created FAQ page with frontend UI.
