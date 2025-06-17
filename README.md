# TailFinder – Pet Adoption App 🐾

Welcome to **TailFinder**, a user-friendly frontend application that lets users browse, add, and adopt pets. This project is built as part of the Noroff Semester Project 2 (Resit) and demonstrates frontend skills including authentication, state management, dynamic filtering, pagination, and user interaction.

---

## 📄 Table of Contents

* [Demo](#demo)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Setup & Installation](#setup--installation)
* [Folder Structure](#folder-structure)
* [Known Limitations](#known-limitations)
* [Author](#author)

---

## 🎥 Demo

Live site: [https://tailfinder.netlify.app](https://tailfinder.netlify.app)

---

## ✨ Features

* User registration and login via Noroff API
* Add, edit, and delete pets (authenticated users only)
* Reveal/hide pet images for accessibility or phobia sensitivity
* Filter pets by species (with alias support, e.g. "snake" hides "python")
* Search bar with dynamic filtering
* Pagination for improved UX
* Dark mode toggle
* Responsive design for mobile and desktop
* Humor-friendly code and hidden Spider-Man references ☺️

---

## 🚀 Tech Stack

* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Zustand](https://github.com/pmndrs/zustand)
* [React Router](https://reactrouter.com/)
* [React Hot Toast](https://react-hot-toast.com/)

---

## ⚙️ Setup & Installation

```bash
# 1. Clone the repository
$ git clone https://github.com/your-username/tailfinder.git
$ cd tailfinder

# 2. Install dependencies
$ npm install

# 3. Create a .env file
VITE_API_KEY=your_noroff_api_key_here

# 4. Start the dev server
$ npm run dev
```

---

## 🗂️ Folder Structure

```
src/
├── components/
├── context/
├── hooks/
├── pages/
├── store/
├── types/
├── utils/
└── App.tsx
```

---

## ⚠️ Known Limitations

### 🐾 Adoption Requests (Local Only)

Due to the frontend-only nature of this exam, adoption requests are **not persisted to the backend** and do not sync between users or browsers.

Instead, they are stored using [Zustand](https://github.com/pmndrs/zustand) with `localStorage` under the hood.

#### Limitations:

* Adoption requests are only visible **in the browser and session where they were created**.
* Owners will not see incoming requests unless using the same localStorage state.
* If you clear site data or switch browser, requests will disappear.
* This is intentional and documented as part of the frontend scope.

✨ However, the `adoptionStatus` of each pet **is updated via Noroff's API** and *does* sync globally. This ensures that pets marked as **Adopted** are consistently filtered or hidden for all users.

---

## 👤 Author

**Hilde-Kathrine**
Frontend Student @ Noroff
[GitHub Profile](https://github.com/Entav78)

---

> "With great filtering comes great responsibility."
> — Spider-Man, probably debugging `speciesAliasMap.ts`

---

## Credits

- Guidance and technical assistance provided by ChatGPT (OpenAI), used as a development assistant during the project.
- Thanks for helping debug species filters, toggle dark mode, and keep the fun alive with Spider-Man jokes.
