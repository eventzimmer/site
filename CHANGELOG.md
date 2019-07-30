# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Make it possible to filter by category
- Add all available tags to all events based on locations
- Persist selected city
- Added a back to top button

### Changed
- Use Matomo with JavaScript and provide an explicit opt-out link in the privacy page.
- Exclude events that are older than PAST_HOUR_LIMIT hours from the current day
- Location badges do not overflow any longer
- Change read more button to be outlined / more visible
- Refactor events to be an individual component

### Removed
- Remove fixtures

## [0.0.3] - 2019-06-12
### Added
- Added privately hosted Matomo with disabled cookies
- Added font-awesome and instagram icon + link
- Added SEO meta tags
- Add badge with remaining time until event

### Changed
- Decode html containing description
- Only list events from the current day on
- Use badges for date and location name
- Remove unused bootstrap JS and use font awesome minified bundle
- Make all card titles links
- Change footer link color to be more accessible
- Add label for city select
- Add titles for impress and privacy

### Removed
- Removed Sentry because of privacy

## [0.0.2] - 2019-05-01
### Added
- Loading text
- Add Sentry error reporting

### Changed
- Skip waiting for workers

## [0.0.1] - 2019-04-27
### Added
- Make it possible to list events from API or fixtures
- Add card-based event view
- Display events of current and upcoming month
- Added impress and privacy as static html pages
- Added linting and tests and Travis
- Deployed via Netlify


