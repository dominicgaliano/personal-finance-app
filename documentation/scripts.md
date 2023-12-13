# Develop locally

## Start Emulator and Vite Server 

```bash
npm run dev
# which runs
concurrently "firebase emulators:start" && "vite dev --open"
```

- Does not transpile Firebase functions changes

## Transpile Firebase Functions

- Firebase emulator restarts on function source changes, but does not automatically transpile functions to JS

```bash
cd functions
npm run build
# which runs
tsc
```

## Start Firebase emulator

```bash
firebase emulators:start
```

## Start Vite server

```bash
vite dev --open
```

# Testing

## Unit Tests

```bash
npm run test:unit
# which runs
vitest
```

##  Firebase security rules

```bash
npm run test:firebase-rules

# which runs
cd functions
firebase emulators:exec 'npm test'
```

# Deploy

Deploy Firebase functions

- This script transpiles the local Firebase functions from TS to JS and then pushes to Firebase

```bash
firebase deploy --only functions
```
