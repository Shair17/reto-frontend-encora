# 📰 Reto Técnico Reddit

> An application built with Vue 3 to browse top Reddit posts. It supports infinite scrolling, detailed post views, marking posts as read or dismissed, and provides a smooth single-page application (SPA) experience.

![screenshot](https://github.com/Shair17/reto-frontend-encora/blob/dev/public/preview.png?raw=true)

---

## ⚙️ Project Setup

```sh
npm install
```

---

### 🔥 Compile and Hot-Reload for Development

```sh
npm run dev
```

---

### ✅ Type-Check, Compile and Minify for Production

```sh
npm run build
```

---

### 🧪 Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

---

### 🧪 Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

---

### 🐙 Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

---

### 🧹 Format with [Prettier](https://prettier.io/)

```sh
npm run format
```

---

## 🚀 Technologies

| Technology     | Description                                           |
| -------------- | ----------------------------------------------------- |
| ⚡ Vue 3       | Frontend framework with the Composition API           |
| ⚡ Vue Router  | Routing library for Vue.js for building SPAs          |
| 🎨 TailwindCSS | Utility-first CSS framework for responsive design     |
| ☁️ Vue Query   | Remote data handling and smart caching                |
| 🧠 Pinia       | Global state management with persistence              |
| 🍞 Vue Sonner  | Toast-style notification system                       |
| 🕓 dayjs       | Lightweight date library for readable relative times  |
| 📡 Axios       | HTTP client for consuming the Reddit API              |
| 🧹 Prettier    | Code formatter to ensure consistent style             |
| 🧪 Vitest      | Modern unit testing framework for Vue                 |
| 🧭 Cypress     | End-to-end testing tool for full user flow validation |

---

## 🔌 API

- Feed:
  `https://www.reddit.com/top.json`

- Post detail:  
  `https://www.reddit.com/comments/{postId}.json`

> ⚠️ **Notas**:

- Reddit does not expose `downvotes`. Only `ups` and `score` (net votes) are available.
- In some cases, images fail to load because Reddit does not allow direct access.

---

## 📦 Organización del código

```
src/
├── assets/             # Static assets like images, fonts, icons
├── components/         # Reusable UI components (buttons, cards, loaders)
├── composables/        # Custom Vue composables (logic hooks)
├── router/             # Vue Router configuration and route definitions
├── stores/             # Global state management (Pinia stores)
├── types/              # TypeScript interfaces and type definitions
├── utils/              # Utility functions and helpers
├── views/              # Page-level components used in routing

```

---

## 🧠 Technical Decisions

- 🧱 **SPA with Vue Router**:  
  `/` displays the post list.
  `/:id` shows the post detail with a split layout on large screens and a single-column layout on smaller devices.

- 🔄 **Infinite loading**:

  - Loads `10 posts` per page up to a maximum of `50 posts`.

- ✨ **Smooth animations**:

  - Transitions when showing the post detail.
  - Animated removal using `<TransitionGroup />`
  - Scroll-to-top animation.
  - Navigation using `View Transitions`.

- 🗑 **Discarded posts**:

  - They are marked as discarded in the store
  - They are not shown in the list
  - All discarded posts can be restored with a button
  - If you try to access a discarded post, you’ll be redirected to the home page

- 🎬 **Media support:**:
  - If it's a video: a `<video />` player is displayed.
  - If it's an image: it's shown using `preview.images[0].source.url`.
  - Button to download media.
  - Link to open media in a new tab.

---

## 🧪 UX Behavior

    - ✅ When opening a post detail, the page scrolls to the top automatically.
    - ✅ If the post doesn't exist or was discarded, the app redirects to / and shows a message.
    - ✅ Toasts use vue-sonner and are displayed globally.

---

## 🎯 Key Features

- [x] Infinite loading (limited to 50 posts)
- [x] Mark posts as read or dismissed
- [x] Restore dismissed posts
- [x] Image and video support
- [x] Smooth animations
- [x] Fully responsive layout
- [x] Redirect with a message if the post is hidden

---

## 👤 Authors

| Name              | GitHub Profile                         |
| ----------------- | -------------------------------------- |
| **Jimmy Morales** | [@Shair17](https://github.com/shair17) |
