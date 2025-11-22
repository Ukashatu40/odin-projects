# Implementation Plan - Fix Backend Issues

This plan addresses the critical security vulnerabilities, architectural flaws, and code quality issues identified in the review.

## User Review Required
> [!IMPORTANT]
> **Breaking Change**: `getAllPosts` will now only return *published* posts. A new mechanism (or route) might be needed if authors need to see their drafts, but for now, the public feed will be safe.
> **Authorization**: Users will strictly only be able to edit/delete their *own* posts/comments.

## Proposed Changes

### Backend Architecture

#### [NEW] [prismaClient.js](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-backend/prismaClient.js)
- Create a singleton instance of `PrismaClient` to be used across the application.

### Controllers

#### [MODIFY] [postsController.js](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-backend/controllers/postsController.js)
- Import singleton `prisma`.
- `getAllPosts`: Add `where: { published: true }`.
- `createPost`: Remove manual validation (rely on middleware).
- `updatePost`: Add check `if (post.authorId !== req.user.userId)`.
- `deletePost`: Add check `if (post.authorId !== req.user.userId)`.
- `updateComment`: Add check `if (comment.authorId !== req.user.userId)`.
- `deleteComment`: Add check `if (comment.authorId !== req.user.userId)`.

#### [MODIFY] [usersController.js](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-backend/controllers/usersController.js)
- Import singleton `prisma`.

#### [MODIFY] [loginController.js](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-backend/controllers/loginController.js)
- Import singleton `prisma`.

#### [MODIFY] [registerController.js](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-backend/controllers/registerController.js)
- Import singleton `prisma`.

### Middlewares & Routes

#### [NEW] [validationMiddleware.js](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-backend/middlewares/validationMiddleware.js)
- Rename/Move content from `postsMiddleware.js` to here.

#### [DELETE] [postsMiddleware.js](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-backend/middlewares/postsMiddleware.js)
- Delete after moving content.

#### [MODIFY] [postsRouter.js](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-backend/routes/postsRouter.js)
- Update import to use `validationMiddleware.js`.

## Verification Plan

### Automated Tests
- Since there are no existing tests, I will verify manually using `curl` or by creating a small script if needed, but primarily by code inspection and ensuring the server starts without errors.
- I will verify the server starts: `node app.js`.

### Manual Verification
- **Singleton**: Verify no "too many clients" errors during stress testing (optional, but code check is sufficient).
- **Auth**:
    - Login as User A.
    - Create Post A.
    - Login as User B.
    - Try to Update/Delete Post A -> Should fail (403).
    - Try to Update/Delete Post B (non-existent) -> Should fail (404).
- **Drafts**:
    - Create Post (published: false).
    - `GET /api/posts` -> Should NOT see it.
    - Update Post (published: true).
    - `GET /api/posts` -> Should see it.
