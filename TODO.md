# ExamSphere Deployment TODO

## Phase 1: Login Fix (COMPLETE)
- [x] 1. Fix CORS (AuthController, CorsConfig, SecurityConfig)
- [x] 2. Fix admin password hash in DB
- [x] 3. Fix role prefix mismatch
- [x] 4. Make frontend API base URL configurable
- [x] 5. Fix hardcoded backend URLs across all admin pages
- [x] 6. Restart backend and test login

## Phase 2: Production-Ready Backend
- [x] 1. Make CORS origins configurable via env var
- [x] 2. Make JWT secret configurable via env var
- [x] 3. Add health check endpoint
- [x] 4. Update application.properties for production

## Phase 3: Production-Ready Frontend
- [x] 5. Create .env.production with Render API URL
- [x] 6. Verify build works locally
- [x] 7. Add SPA routing support (redirects)

## Phase 4: Deploy to Render
- [ ] 8. Create Render PostgreSQL database
- [ ] 9. Deploy backend (Docker Web Service)
- [ ] 10. Deploy frontend (Static Site)
- [ ] 11. Seed database with complete-setup.sql
- [ ] 12. Test production login

