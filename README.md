📖 Scriptoria - Library Management System

Welcome to Scriptoria, your modern, magical, and mighty library management system built with the MERN Stack + TypeScript! Think of it as a Hogwarts for books — complete with slick UI, smart features, and a sprinkle of goofy charm.

🚀 Features

    ✨ Modern UI/UX – Built with React + MUI + custom CSS animations

    🔎 Book Catalog – Browse, explore, and click for full book info

    📚 Book of the Week – Randomly showcases a highlighted book (yes, with animations!)

    🧑‍💼 Roles & Permissions – Employees can issue & return books

    📦 Redux State Management – Because props drilling is so 2022

    💬 Chatbot Support – Local AI chatbot using LMStudio

    ❤️ Easter Eggs – Like a Mr. Bean YouTube surprise. Go find it.

🛠️ Tech Stack
    Layer	Tech
    Frontend	React + Vite + TypeScript + MUI
    Backend	Express.js + Node.js
    Database	MongoDB
    State	Redux Toolkit
    Styling	MUI + Custom CSS (with animations & hover magic)
    AI Bot	Local LLM powered by LMStudio


🧠 How It Works

    When the user opens the catalog, they see a carousel of books.

    Employees can issue/return books directly from the card.

    Book of the Week section randomly picks a featured book every minute (but not the same twice!).

    Clicking a book navigates to a detailed view powered by BookInformation.

    Redux handles all shared state like logged-in user, current book, and modals.

    A chatbot waits to chat in /routes/chat.ts connected to a local LMStudio server.


🧪 Future Features

    ✅ Wishlist a book

    ✅ Better book search with filters

    🟨 Analytics for borrowed books

    ⏳ Late return reminders

    🪄 More UI sparkle (like confetti when a book is issued, why not?)