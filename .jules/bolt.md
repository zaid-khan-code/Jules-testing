## 2025-05-15 - Optimize N+1 query in MeController
**Learning:** Found N+1 query in MeController when loading user organizations. Eager loading reduces DB calls.
**Action:** Use .Include() and .ThenInclude() for navigation properties.
