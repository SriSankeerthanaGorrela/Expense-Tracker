This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# Next.js acts as both frontend and backend, but for authentication, it only acts as a client that talks directly to Firebase.

# 3. What Happens After Registration

When a user registers successfully:

Firebase Auth creates a user record in the Authentication Users list

It returns a user object to your app (contains uid, email, etc.)

That user is now considered logged in

The Firebase SDK automatically stores a session token in the browser

On page refresh, it automatically restores the session (using onAuthStateChanged)

You don’t need to handle cookies, tokens, or sessions manually.

users
 └── {userId}
      ├── profile
      │    └── name, email, createdAt, etc.
      │
      ├── budgets (collection)
      │    └── {budgetId}: {
      │          category: "Food",
      │          limit: 3000,
      │          month: "2025-11" // optional, for month-wise budgets
      │       }
      │
      ├── transactions (collection)
      │    └── {transactionId}: {
      │          category: "Food",
      │          amount: 200,
      │          date: "2025-11-05",
      │          type: "expense" | "income",
      │          note: "Dinner at Domino's"
      │       }
      │
      ├── goals (collection)
      │    └── {goalId}: {
      │          title: "Emergency Fund",
      │          targetAmount: 50000,
      │          currentAmount: 15000,
      │          deadline: "2026-03-01"
      │       }
      │
      ├── insights (optional, computed and cached)
      │    └── {insightId}: {
      │          month: "2025-11",
      │          summary: "You spent 20% more on Dining this month compared to last month",
      │          createdAt: new Date()
      │       }
      │
      └── reports (optional, precomputed graphs)
           └── {reportId}: {
                 month: "2025-11",
                 spendingByCategory: {
                   Food: 2000,
                   Transport: 800,
                   Entertainment: 1500,
                 },
                 monthlyTotal: 5000
               }

