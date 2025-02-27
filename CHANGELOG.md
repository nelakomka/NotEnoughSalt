# Changelog

Created a file to document all updates moving foward:

📌 Tip: Follow Semantic Versioning:

Major (1.0.0) – Significant updates, breaking changes.
Minor (1.1.0) – New features, but backward-compatible.
Patch (1.1.1) – Bug fixes, security patches.

## [1.1.0] - 2025-02-26, TA

### Added

- Implemented dropdown selection for adding saved recipes to the meal plan calendar.

- Created a container in MealPlan.js to house the dropdown and "Add to Meal Plan" button for a cleaner UI.

- Updated MealPlan.css with new styles for the dropdown and button.

- Modified Profile.js to include a delete button for each saved recipe.

- Added localStorage persistence for saved recipes, ensuring they remain visible across sessions.

### Fixed

- Resolved an issue where saved recipes wouldn't persist correctly in the UI after refreshing.
- Fixed empty saved recipes list breaking the profile page; now displays a proper message instead.
- Addressed styling inconsistencies in buttons across the meal plan and profile pages.

## [1.1.0] - 2025-02-24, TA

### Added

- Created a JavaScript file (MealPlan.js) that restricts access to the Meal Plan page by checking a login flag.
- Updated Login.js to set a login flag in localStorage upon successful login, ensuring only authenticated users can access protected pages.

## [1.0.1] - 2025-02-09, TA

### Added

- Implemented Database JSON

### Fixed

- Resolved form validation issues in `faq.js`.
- Improved error handling for empty form submissions.

## [1.0.0] - 2025-02-01, TA

### Initial Release

- Set up project structure.
- Created FAQ page with frontend UI.
