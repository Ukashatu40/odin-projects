# Implementation Plan - Frontend Development

This plan outlines the steps to complete the frontend for the Blog API, focusing on a "modern and futuristic" design.

## User Review Required
> [!IMPORTANT]
> **Design Direction**: I will use a dark-themed, glassmorphism-heavy design with neon accents (indigo/purple/pink gradients) to achieve the "futuristic" look.
> **Tech Stack**: React 19, Tailwind CSS 4, React Router 7.

## Proposed Changes

### 1. Core Infrastructure
#### [NEW] [AuthContext.jsx](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-frontend/src/context/AuthContext.jsx)
- Manage global user state (`user`, `token`, `login`, `logout`).
- Persist auth state on refresh.

#### [MODIFY] [App.jsx](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-frontend/src/App.jsx)
- Wrap app in `AuthProvider`.
- Add protected routes for creating/editing posts.

#### [MODIFY] [index.css](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-frontend/src/index.css)
- Add global styles for the futuristic theme (backgrounds, fonts).

### 2. Components
#### [MODIFY] [Navbar.jsx](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-frontend/src/components/Navbar.jsx)
- Responsive, glassmorphism effect.
- Show different links based on auth state.

#### [NEW] [PostCard.jsx](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-frontend/src/components/PostCard.jsx)
- Card component for displaying posts in the feed.

#### [NEW] [Layout.jsx](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-frontend/src/components/Layout.jsx)
- Main layout wrapper with Navbar and Footer.

### 3. Pages
#### [MODIFY] [HomePage.jsx](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-frontend/src/pages/HomePage.jsx)
- Fetch and display published posts.
- Hero section with dynamic text.

#### [NEW] [PostDetails.jsx](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-frontend/src/pages/PostDetails.jsx)
- View full post content.
- Comments section (read/add/delete).

#### [NEW] [CreatePost.jsx](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-frontend/src/pages/CreatePost.jsx)
- Form to create a new post.
- Toggle for `published`.

#### [NEW] [Dashboard.jsx](file:///Users/apple/javascript/odin-projects/blog-api-project/blog-api-frontend/src/pages/Dashboard.jsx)
- Manage user's own posts (Edit/Delete).

### 4. Design System (Futuristic)
- **Colors**: Deep blacks/grays (`bg-gray-900`), Neon Indigo (`text-indigo-400`), Pink accents.
- **Effects**: `backdrop-blur-md`, `bg-white/10` (glass), `shadow-neon`.
- **Typography**: Modern sans-serif (Inter or similar).

## Verification Plan
- **Auth Flow**: Register -> Login -> Redirect to Home -> Navbar updates.
- **Post Flow**: Create Post -> Appear in Dashboard -> Publish -> Appear in Home.
- **Comments**: Add comment -> Appear immediately.
- **Responsiveness**: Check on mobile/desktop sizes.
