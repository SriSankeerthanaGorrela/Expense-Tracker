

# Expense Tracker

A simple and modern expense tracker built with **Next.js**, **Tailwind CSS**, **TypeScript**, and **Firebase**. Easily add, view, edit, and delete your expenses, with secure authentication and real-time updates.

***

## Features

- User authentication (Firebase Auth)
- Add, edit, and delete expenses
- Categorize expenses (e.g. food, travel, shopping)
- Dashboard view with summaries \& analytics
- Real-time database sync using Firebase Firestore
- Responsive design (mobile \& desktop)
- (Optional) Push notifications for reminders

***

## Technologies Used

- [Next.js](https://nextjs.org/) (frontend and backend API routes)
- [Tailwind CSS](https://tailwindcss.com/) (styling)
- [TypeScript](https://www.typescriptlang.org/) (type safety)
- [Firebase](https://firebase.google.com/) (Auth + Firestore + Cloud Messaging)
- (Optional) Chart.js or Recharts (dashboard charts/graphs)

***

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

## License

This project is licensed under the MIT License.

