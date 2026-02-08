

# Expense Tracker

A simple and modern expense tracker built with **Next.js**, **Tailwind CSS**, **TypeScript**, and **Firebase**. Easily add, view, edit, and delete your expenses, with secure authentication and real-time updates.

***

## Features

- User authentication (Firebase Auth)
- Add, edit, and delete expenses
- Categorize expenses (e.g. food, travel, shopping)
- Dashboard view with summaries \& analytics
- Real-time database sync using Firebase Firestore


***

- **Recurring Expenses \& Subscription Tracking**
Detect and manage regular bills or subscriptions (Netflix, insurance, gym).
- **Budgets \& Goals**
Set monthly budgets by category and visualize spending progress; create savings goals.
- **Analytics Dashboard**
Interactive charts, trends, and spending insights over time.
- **Mileage \& Travel Expense Tracking**
Log business travel expenses and calculate mileage for reimbursements.
- **Global Search**
Global search bar to quickly find any transaction by category.
- **Expense Tagging with Hashtags**
For custom searches (e.g., #worktrip, #grocery)
- **Category Customization**
Allow users to create and manage their own custom expense categories.
- **Advanced Filtering \& Search**
Find expenses by names,categories,date etc.
- **AI-driven Insights**
Get personalized advice, spend predictions, and saving tips based on habits.

These features can make your expense tracker app much more powerful, competitive, and useful for different users!



## Technologies Used

- [Next.js](https://nextjs.org/) (frontend and backend API routes)
- [Tailwind CSS](https://tailwindcss.com/) (styling)
- [TypeScript](https://www.typescriptlang.org/) (type safety)
- [Firebase](https://firebase.google.com/) (Auth + Firestore + Cloud Messaging)
-  Recharts (dashboard charts/graphs)



## Getting Started

### Prerequisites

- Node.js \& npm installed
- Firebase account
- Clone this repository


### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a new [Firebase project](https://console.firebase.google.com/).
3. Add your Firebase config to `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

4. Start the app locally:

```bash
npm run dev
```


***

## Folder Structure

```
/expense-tracker
│
├── app/              # Pages, API routes, layouts (Next.js)
├── components/       # UI components (forms, dashboard)
├── lib/              # Firebase config, helpers
├── types/            # TypeScript types & interfaces
├── styles/           # Tailwind/global CSS
├── public/           # Static assets
├── .env.local        # Environment variables (do NOT share/secrets)
└── README.md
```


***

## Usage

- Sign up/log in using your email or Google
- Add your expenses
- View and filter expenses by category or date
- Edit or delete entries
- See summaries and basic analytics on your dashboard

***

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

***

1. Smart Insights (AI-like)

Show insights such as:

“You spent 20% more on Food this month compared to last month.”
“You’re saving only 8% — target is 20%. Try reducing Entertainment expenses.”

You can compute this in frontend logic or Firebase Cloud Function.


🧾 2. Budget Alerts

User sets monthly budget → show progress bar (used vs remaining budget).
If 90% spent, show alert:

“You’ve almost reached your monthly spending limit!”

💬 3. Expense Notes / Tags

User can tag expenses (e.g., “Office”, “Personal”)
→ Filter by tags later.
