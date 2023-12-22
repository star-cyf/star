import { existsSync, readFileSync } from "fs";
interface StorageState {
  cookies: Cookie[];
  origins: Origin[];
}
interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: string;
}
interface Origin {
  origin: string;
  localStorage: LocalStorageItem[];
}
interface LocalStorageItem {
  name: string;
  value: string;
}
const readJsonFile = (filePath: string) => {
  const file = readFileSync(filePath, "utf8");
  console.log("readJsonFile file:", file);
  const data = JSON.parse(file);
  console.log("readJsonFile data:", file);
  return data;
};
const getAllExpiries = (storageState: StorageState) => {
  const expiresValues: number[] = [];
  Object.keys(storageState).forEach((key) => {
    if (key === "cookies") {
      storageState[key].forEach((obj) => {
        const cookieExpires = obj.expires;
        expiresValues.push(Math.floor(cookieExpires));
      });
    } else if (key === "origins") {
      storageState[key].forEach((obj) => {
        obj.localStorage.forEach((obj) => {
          if (obj.name === "authenticatedUser") {
            const authenticatedUser = JSON.parse(obj.value);
            expiresValues.push(
              Math.floor(Number(authenticatedUser.expirationTime))
            );
          }
        });
      });
    }
  });
  return expiresValues;
};
export const validStorageState = () => {
  try {
    if (!existsSync("./src/utils/storage-state.json")) {
      console.log("❌ validStorageState 'storage-state.json' NOT FOUND");
      return false;
    }
    console.log(
      "✅ validStorageState 'storage-state.json' FOUND attempting to read"
    );
    const storageState = readJsonFile("./src/utils/storage-state.json");
    console.log("validStorageState storageState", storageState);
    const allExpiries = getAllExpiries(storageState);
    console.log("validStorageState allExpiries", allExpiries);
    const soonestExpiry = Math.min(...allExpiries) * 1000;
    console.log("validStorageState soonestExpire", soonestExpiry);
    const now = new Date().getTime();
    console.log("validStorageState now", now);
    const result = now > soonestExpiry;
    console.log("validStorageState result:", result);
    return result;
  } catch (error) {
    console.error("validStorageState error:", error);
    return false;
  }
};
