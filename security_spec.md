# Security Specification for AI Interview Pro

## Data Invariants
1. A user can only access their own profile, interviews, saved resources, and coding attempts.
2. `userId` in any document must match the document path's `{userId}` and the authenticated user's `uid`.
3. `createdAt` and `savedAt` fields are immutable after creation.
4. An interview session cannot be modified once its status is set to 'completed' (except by system/admin if applicable).
5. All scores must be between 0 and 10.

## The "Dirty Dozen" Payloads (Targeting Rejection)
1. **Identity Theft**: Create an interview session with `userId: "attacker_uid"` in `/users/victim_uid/interviews/123`.
2. **Shadow Field**: Update an interview with an extra field `isVerified: true`.
3. **Ghost Update**: Change `userId` of an existing interview.
4. **Invalid Score**: Set `communication` score to `100`.
5. **Path Poisoning**: Create a resource with a 2KB document ID.
6. **State Shortcut**: Create an interview directly with status `completed` without history.
7. **Temporal Fraud**: Set `createdAt` to a date in the future.
8. **Resource Spoofing**: Save a resource with a malicious script in the `link` field.
9. **Bulk Scrape**: Try to `list` all interviews across the entire `/users` collection without filtering by `userId`.
10. **Admin Escalation**: Add `role: "admin"` to the user profile payload.
11. **Profile Overwrite**: Non-owner trying to write to `/users/another_user_uid`.
12. **Immutable Revision**: Trying to change the `createdAt` of a finished interview.

## The Test Runner (firestore.rules.test.ts)
(Implementation would go here in a real environment to verify rules)
