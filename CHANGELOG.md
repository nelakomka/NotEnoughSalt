# Changelog

Created a file to document all updates moving foward:

📌 Tip: Follow Semantic Versioning:

Major (1.0.0) – Significant updates, breaking changes.
Minor (1.1.0) – New features, but backward-compatible.
Patch (1.1.1) – Bug fixes, security patches.

## [2.0.0] - 2025-03-06, CL

### Added

- Login through token and log out
- Pages (profile and meal prep) behind a login wall
- Recipe submission to db.json (no image)
- Random recipes on home page (explore more, 4 recipes)
- Random recipe on the home page in the "by category" (when clicked on category linked to a random recipe)
- Random recipes on the individual recipe page (3 recipes)

### Fixed

- Fixed heart colors (no fill and fill)
- Each random recipe links to their recipe page

## [1.1.2] - 2025-03-06, CL

### Added

- Feedback now sends to db.json

## [1.1.1] - 2025-03-04, TA

### Added

- Implemented a profile dropdown menu that displays Login/Logout options.
- Updated Profile.js to show the correct option based on login status.
- Updated Profile page, users can now upload a profile picture, save name and password.
- Modified Profile.css to style the dropdown for smooth hover functionality.
- Adjusted Profile.html to include the profile dropdown structure in the navigation bar.
- Updated logic on the home page, when user clicks on recipe, system pulls the recipe ID.
- Updated filter logic on the recipe search page, filters are connected to the db.json file
- Created logic for the Recipe Preferences (needs addtional review)
- Created logic for the filters on the home page, but this doesn't seem to be working correctly//NEEDS REVIEW

### Fixed

- Optimized Profile.js by removing duplicate event listeners and improving structure.
- Ensured Logout properly clears localStorage and redirects to the login page.
- Corrected the recipe images
- Improved the UI features in the Profile page, centered text, removed unneed headers.

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

## [1.0.2] - 2025-02-13, CL

### Fixed

- Reorganized db.json recipe collection for standardized display
- Newsletter form position fixed and submission to db.json
- Auth system

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
