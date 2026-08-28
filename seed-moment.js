// seed-moments.js
import { db, doc, setDoc, collection, Timestamp } from './firebase-config.js';

export async function seedMomentsDatabase() {
  try {
    console.log("🌱 Seeding Moments Firestore database with subscription tier structures...");

    // 1. Seed a Free Tier User (Alex)
    // Locked to 1 connection per day via application logic & upcoming security rules
    const freeUserRef = doc(db, "users", "user_free_1");
    await setDoc(freeUserRef, {
      uid: "user_free_1",
      displayName: "Alex",
      email: "alex@example.com",
      tier: "free",
      connectionStats: {
        countToday: 0,
        lastConnectionResetAt: Timestamp.now()
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    console.log("✅ Seeded Free User: Alex");

    // 2. Seed a Premium Tier User (Jordan)
    // Entitled to Unlimited connections and Type-to-Connect Matchmaker
    const premiumUserRef = doc(db, "users", "user_premium_1");
    await setDoc(premiumUserRef, {
      uid: "user_premium_1",
      displayName: "Jordan",
      email: "jordan@example.com",
      tier: "premium",
      connectionStats: {
        countToday: 0,
        lastConnectionResetAt: Timestamp.now()
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    console.log("✅ Seeded Premium User: Jordan");

    // 3. Seed a Pro Unlimited Tier User (Sam)
    // Entitled to Priority Story Resonance
    const proUserRef = doc(db, "users", "user_pro_1");
    await setDoc(proUserRef, {
      uid: "user_pro_1",
      displayName: "Sam",
      email: "sam@example.com",
      tier: "pro",
      connectionStats: {
        countToday: 0,
        lastConnectionResetAt: Timestamp.now()
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    console.log("✅ Seeded Pro User: Sam");

    // 4. Seed a Shared Story Thread (Authored by Pro User Sam)
    // Priority Resonance flag is true because Sam is Pro
    const storyRef = doc(collection(db, "stories"));
    await setDoc(storyRef, {
      storyId: storyRef.id,
      authorId: "user_pro_1",
      content: "Watching the quiet sunset tonight. Anyone else ditching screen time early?",
      tags: ["mindfulness", "reflection"],
      isPriorityResonance: true, 
      createdAt: Timestamp.now()
    });
    console.log("✅ Seeded Story Thread with Priority Resonance");

    // 5. Seed a Matchmaker Queue Entry (Type-to-Connect)
    // Staging the Premium user Jordan in the matchmaking pool
    const matchmakerRef = doc(db, "matchmakerQueue", "user_premium_1");
    await setDoc(matchmakerRef, {
      userId: "user_premium_1",
      promptText: "Looking to connect with another creator focused on minimal apps.",
      userTier: "premium",
      queuedAt: Timestamp.now()
    });
    console.log("✅ Seeded Matchmaker Queue Item");

    console.log("🎉 All initial dataset documents successfully created in Firestore!");
  } catch (error) {
    console.error("❌ Error seeding Firestore database:", error);
  }
}