## 2025-05-22 - [Secure JWT Configuration]
**Vulnerability:** Hardcoded JWT secret key and disabled issuer/audience validation.
**Learning:** Hardcoded secrets in code are critical security risks. Disabling issuer/audience validation makes the system vulnerable to token forgery or reuse across different environments.
**Prevention:** Always retrieve security-sensitive configuration from the environment or a secure configuration provider. Ensure all standard JWT validation checks (Issuer, Audience, Lifetime, Key) are enabled by default.
