import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestContext,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";

import { doc, getDoc, setDoc } from "firebase/firestore";

import * as fs from "fs";
import * as path from "path";

const MY_PROJECT_ID = "dev-personal-finance-app";

const getTestEnv = async (): Promise<RulesTestEnvironment> => {
  return await initializeTestEnvironment({
    projectId: MY_PROJECT_ID,
    firestore: {
      // Would like to make this better
      rules: fs.readFileSync(
        path.join(__dirname, "../../firestore.rules"),
        "utf8",
      ),
    },
  });
};

let testEnv: RulesTestEnvironment;
// Cannot find appropriate types for these
// Docs say they should be type firebase.firestore.firestore
// but importing Firestore from "firebase/firestore" gives a type error
let user1Firestore: any;
let unauthenticatedUserFirestore: any;

describe("Firestore rules", () => {
  beforeAll(async () => {
    testEnv = await getTestEnv();

    // create user firebase instances
    user1Firestore = testEnv.authenticatedContext("user1", {}).firestore();
    unauthenticatedUserFirestore = testEnv.unauthenticatedContext().firestore();

    // create mock data
    await testEnv.withSecurityRulesDisabled(
      async (context: RulesTestContext) => {
        const firestore = context.firestore();

        await setDoc(doc(firestore, "users/user1"), {
          uid: "user1",
          email: "user1@example.com",
        });

        await setDoc(doc(firestore, "users/user2"), {
          uid: "user2",
          email: "user1@example.com",
        });

        await setDoc(doc(firestore, "data/user1/transction/1"), {
          amount: 1.0,
          category: "Income",
          date: new Date(),
          description: "Demo Transaction",
          isExpense: false,
        });

        await setDoc(doc(firestore, "data/user2/transction/1"), {
          amount: 1.0,
          category: "Income",
          date: new Date(),
          description: "Demo Transaction",
          isExpense: false,
        });
      },
    );
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it("should allow read access to a user's own document", async () => {
    const firestore = user1Firestore;
    assertSucceeds(getDoc(doc(firestore, "users/user1")));
    assertSucceeds(getDoc(doc(firestore, "data/user1/transactions/1")));
  });

  it("should allow write access to a user's own document", async () => {
    const firestore = user1Firestore;
    assertSucceeds(
      setDoc(doc(firestore, "data/user1/transction/2"), {
        amount: 1.0,
        category: "Income",
        date: new Date(),
        description: "Second Transaction",
        isExpense: false,
      }),
    );
  });

  it("should not allow read access to another user's document", async () => {
    const firestore = user1Firestore;
    assertFails(getDoc(doc(firestore, "users/user2")));
    assertFails(getDoc(doc(firestore, "data/user2/transactions/1")));
  });

  it("should not allow write access to another user's document", async () => {
    const firestore = user1Firestore;
    assertFails(
      setDoc(doc(firestore, "data/user2/transction/2"), {
        amount: 1.0,
        category: "Income",
        date: new Date(),
        description: "Second Transaction",
        isExpense: false,
      }),
    );
  });

  // eslint-disable-next-line no-multi-str
  it("should not allow write access to any document if user is \
    not authenticated", async () => {
    const firestore = unauthenticatedUserFirestore;
    assertFails(getDoc(doc(firestore, "users/user1")));
    assertFails(getDoc(doc(firestore, "data/user1/transactions/1")));
  });

  // eslint-disable-next-line no-multi-str
  it("should not allow write access to any document if user is \
    not authenticated", async () => {
    const firestore = unauthenticatedUserFirestore;
    assertFails(
      setDoc(doc(firestore, "data/user1/transction/3"), {
        amount: 1.0,
        category: "Income",
        date: new Date(),
        description: "Third Transaction",
        isExpense: false,
      }),
    );
  });
});
