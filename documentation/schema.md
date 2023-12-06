# Proposed Schemas

- MVP will be built using Firebase Firestore, a JSON-like NoSQL database
- This is probably not the best solution at scale. The majority of our data (financial transactions) will be highly structure.
- GCP offers SQL servers at a cost that is prohibitive for small scale deployment.

## User Account Data

Document Path: users/{user_uid}

Schema:

```js
{
    uid: user.uid,
    email: user.email,
    // TODO: implement these after MVP
    // displayName: user.displayName,
    // photoURL: user.photoURL,
    // currency: "USD",
}
```

## User Financial Data

Document Path: data/{user_uid}/transactions/{transaction_id}

Schema:

```js
{
    // some reference to transactions sub collection
    // TODO: implement these after MVP
    categories: ["Groceries", "Housing", "Fun"], // Firebase type: Array of Text string
}
```

Document Path: data/{user_uid}/transactions/{transaction_id}

Schema:

```js
{
    date: Date(), // Firebase type: Data and time
    description: "", // Firebase type: Text string
    amount: 1234.56, // Firebase type: Floating-point number
    category: "Groceries" | null, // Firebase type: Text string or Null
    isExpense: true, // Firebase type: Boolean
}
```

## Other Considerations

- I also need to implement security logic for data access.
- Most (if not all) data access should be performed by firebase-admin running on the server side.
- Look into indexing later (most likely can exempt transaction description from indexing to save space)
