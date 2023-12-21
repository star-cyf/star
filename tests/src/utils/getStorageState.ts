import { readFile } from "fs/promises";
import { PathLike } from "fs";

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

const readJsonFile = async (filePath: PathLike) => {
  try {
    const file = await readFile(filePath, "utf8");
    const data = JSON.parse(file);
    return data;
  } catch (error) {
    console.error("readJsonFile error:", error);
    throw error;
  }
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

export const refreshStorageState = async () => {
  try {
    const storageState = await readJsonFile("./src/utils/storage-state.json");
    // console.log("storageState", storageState);
    const allExpiries = getAllExpiries(storageState);
    // console.log("allExpiries", allExpiries);
    const soonestExpiry = Math.min(...allExpiries) * 1000;
    // console.log("soonestExpire", soonestExpiry);
    const now = new Date().getTime();
    // console.log("now", now);
    const result = now > soonestExpiry;
    // console.log("result", result);
    return result;
  } catch (error) {
    console.error("refreshStorageState error:", error);
    return false;
  }
};
