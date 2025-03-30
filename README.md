# 📚 Book Tracker 📚

![video!!]

A modern web app to manage your personal library, track reading progress, and visualize stats with charts.

Backend repository:  
🔗 [Book Tracker Backend](https://github.com/artemhula/book_tracker_backend)

---

## 🚀 Features

- 📖 Add books by ISBN or manually
- 📝 Track current page and reading progress
- 📊 Weekly bar chart & monthly heatmap
- 🔒 Google OAuth login & protected pages
- 💾 Persistent state (redux-persist)
- 🎨 Responsive UI with Tailwind
- 🔔 Toast notifications (Sonner)

---

## 🛠️ Tech Stack

- **React 19** & **TypeScript**
- **Vite** for fast dev/build
- **Redux Toolkit** & **RTK Query**
- **redux-persist**
- **React Router 7**
- **Tailwind CSS**
- **Recharts** for charts
- **Sonner** for notifications
- **react-hook-form** for forms
- **react-icons**
- **react-tabs**
- **Google Books API**

---

## 🔑 Environment Variables

Create a `.env` file in the project root with:

```
VITE_API_URL=http://localhost:3000
VITE_APP_URL=http://localhost:5173
VITE_GOOGLE_BOOKS_API_KEY=your-google-books-api-key
```

- `VITE_API_URL` – **required**. Your backend API URL (used for all API calls).
- `VITE_APP_URL` – **required**. Your frontend URL (used for OAuth redirect).
- `VITE_GOOGLE_BOOKS_API_KEY` – **required**. Get it from [Google Books API](https://developers.google.com/books/docs/v1/using#APIKey).

---

## 🏁 Getting Started

### 1. Clone both repos

```bash
git clone https://github.com/artemhula/book_tracker_backend.git
git clone https://github.com/artemhula/book_tracker.git
```

### 2. Setup & run the backend

- Follow instructions in the backend README.
- Make sure it runs on the port you set in `VITE_API_URL` (default: `http://localhost:3000`).

### 3. Setup frontend

- Go to the frontend folder:
  ```bash
  cd book_tracker
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Create `.env` file as above.

### 4. Start both servers

- **Start backend first** (see backend README).
- Then start frontend:
  ```bash
  npm run dev
  ```

---

## 🏗️ Build

- Build for production:
  ```bash
  npm run build
  ```

---

## 📂 Key Files

- App shell & routing: [`src/App.tsx`](src/App.tsx)
- Protected routes: [`src/components/ProtectedLayout.tsx`](src/components/ProtectedLayout.tsx)
- API wrapper: [`src/utils/api-fetch.ts`](src/utils/api-fetch.ts)
- Redux store: [`src/redux/store.ts`](src/redux/store.ts)
- Slices: [`src/redux/slices/`](src/redux/slices/)
- Stats page: [`src/pages/StatsPage.tsx`](src/pages/StatsPage.tsx)
- Charts: [`src/components/Stats/WeekBarChart.tsx`](src/components/Stats/WeekBarChart.tsx), [`src/components/Stats/MonthHeatMap.tsx`](src/components/Stats/MonthHeatMap.tsx)

---

## 💡 How It Works

- **Auth:** accessToken in localStorage, refresh via `/auth/refresh` on 401 ([api-fetch.ts](src/utils/api-fetch.ts)).
- **Protected routes:** redirect to `/login` if not authenticated.
- **Library:** add/update/delete books via Redux actions.
- **Stats:** fetched via Redux, visualized with Recharts & custom heatmap.
- **Notifications:** toast via Sonner.

---

## 📜 Scripts

- `npm run dev` – start dev server
- `npm run build` – build for production

---

Made with ❤️ for readers!
