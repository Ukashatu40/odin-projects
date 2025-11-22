# Code Review: blog-api-backend

Here is a detailed analysis of your backend codebase. I've categorized the findings into **Critical Issues** (must fix), **Architectural Improvements** (should fix for scalability), and **Code Quality** (best practices).

## 🚨 Critical Security Issues

### 1. Missing Authorization (High Severity)
**Problem:** In `postsController.js` (and likely comments controller), the `updatePost` and `deletePost` functions only check if a post *exists*. They do **not** check if the authenticated user is the *author* of that post.
**Impact:** Any logged-in user can update or delete *anyone else's* posts.
**Fix:** Check if `post.authorId === req.user.userId` before allowing the action.

```javascript
// Example Fix
if (existingPost.authorId !== req.user.userId) {
    return res.status(403).json({ message: 'Not authorized' });
}
```

### 2. Drafts are Public (Medium Severity)
**Problem:** `getAllPosts` returns all posts, regardless of the `published` field.
**Impact:** Draft posts are visible to users before they are ready.
**Fix:** Filter by `published: true` in `getAllPosts`. Add a separate route for authors to see their own drafts.

### 3. All Routes are Protected (Design Choice?)
**Problem:** In `routes/postsRouter.js`, `postsRouter.use(authToken)` is applied at the top.
**Impact:** Users must be logged in just to *read* posts. Usually, blogs allow public reading (`GET` requests) and require login only for creating/editing (`POST`, `PUT`, `DELETE`).

## 🏗️ Architectural Improvements

### 1. Prisma Client Instantiation
**Problem:** You are doing `const prisma = new PrismaClient();` in every controller file.
**Impact:** This creates multiple connection pools, which can exhaust your database connections, especially in development (hot reloading) or serverless environments.
**Fix:** Create a single `prismaClient.js` file and export one instance to use everywhere.

### 2. Pagination Missing
**Problem:** `getAllPosts` fetches *every* post in the database.
**Impact:** As your blog grows, this will become very slow and consume too much memory.
**Fix:** Implement pagination (e.g., `?page=1&limit=10`).

### 3. Middleware Naming
**Problem:** `postsMiddleware.js` is actually a generic validation error handler.
**Fix:** Rename it to `validationMiddleware.js` or `handleValidationErrors.js` since it can be used for users, comments, etc.

## 🧹 Code Quality & Best Practices

### 1. Consistent Validation
**Observation:** You have `express-validator` set up (great!), but some controllers (like `createPost`) still have manual checks like `if (!title || !content)`.
**Suggestion:** Rely entirely on `express-validator` for consistency and cleaner controller code.

### 2. Centralized Error Handling
**Observation:** Every controller method has a `try/catch` block logging errors and sending 500.
**Suggestion:** Use an error handling middleware (`app.use((err, req, res, next) => ...)`) to remove repetitive code.

### 3. Route Structure
**Observation:** You have a mix of root routes (`/login`) and API routes (`/api/posts`).
**Suggestion:** Move everything under `/api/v1/` (e.g., `/api/v1/auth/login`, `/api/v1/posts`) for better versioning and organization.

### 4. CORS Configuration
**Observation:** `app.use(cors())` allows requests from *any* origin.
**Suggestion:** In production, restrict this to your frontend's domain.

---

## Recommended Next Steps

1.  **Fix the Authorization bug immediately.**
2.  **Create a singleton Prisma instance.**
3.  **Decide on public vs. private access** for reading posts.
