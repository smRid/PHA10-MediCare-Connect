import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis;
const mongoUri =
  process.env.MONGODB_URI ||
  process.env.MONGO_DB_URI ||
  "mongodb://127.0.0.1:27017/medicare_connect";

const mongoClient =
  globalForMongo.__medicareConnectMongoClient || new MongoClient(mongoUri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.__medicareConnectMongoClient = mongoClient;
}

const db = mongoClient.db(process.env.MONGODB_DB || "medicare_connect");

const trustedOrigins = [
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_APP_URL,
  "http://localhost:3000",
].filter(Boolean);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: mongoClient,
  }),
  secret: process.env.BETTER_AUTH_SECRET || "medicare-connect-dev-secret",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  account: {
    updateAccountOnSignIn: true,
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"],
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      overrideUserInfoOnSignIn: true,
    },
  },
  plugins: [
    dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
    }),
    nextCookies(),
  ],
});
