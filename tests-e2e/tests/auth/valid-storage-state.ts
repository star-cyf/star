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

const parseStorageStateJson = (filePath: string) => {
  const storageStateFile = readFileSync(filePath, "utf8");
  const storageStateData = JSON.parse(storageStateFile);

  const keys = Object.keys(storageStateData);
  if (keys.length === 0) {
    throw new Error("storage-state.json IS EMPTY ❌");
  }

  if (!keys.includes("cookies")) {
    throw new Error("storage-state.json IS MISSING 'cookies' ❌");
  }

  if (!keys.includes("origins")) {
    throw new Error("storage-state.json IS MISSING 'origins' ❌");
  }

  const authenticatedUser = storageStateData.origins.some((origin: Origin) => {
    return origin.localStorage.find((localStorageItem: LocalStorageItem) => {
      return localStorageItem.name === "authenticatedUser";
    });
  });

  if (!authenticatedUser) {
    throw new Error(
      "storage-state.json IS MISSING 'localStorage' 'authenticatedUser' ❌"
    );
  }

  return storageStateData;
};

const getSoonestExpiry = (storageState: StorageState) => {
  const expiresValues: number[] = [];

  Object.keys(storageState).forEach((key) => {
    if (key === "cookies") {
      storageState[key].forEach((cookie: Cookie) => {
        const cookieExpires = cookie.expires;
        expiresValues.push(Math.floor(cookieExpires));
      });
    } else if (key === "origins") {
      storageState[key].forEach((origin: Origin) => {
        origin.localStorage.forEach((localStorageItem: LocalStorageItem) => {
          if (localStorageItem.name === "authenticatedUser") {
            const authenticatedUser = JSON.parse(localStorageItem.value);
            expiresValues.push(
              Math.floor(Number(authenticatedUser.expirationTime))
            );
          }
        });
      });
    }
  });

  if (expiresValues.length === 0) {
    throw new Error("getSoonestExpiry No Expiries ❌ ");
  }

  const soonestExpiry = Math.min(...expiresValues);

  return soonestExpiry;
};

export const validStorageState = () => {
  const filePath = "./tests/auth/storage-state.json";
  try {
    if (!existsSync(filePath)) {
      console.log("storage-state.json NOT FOUND ❌");
      return false;
    }
    console.log("storage-state.json FOUND ✅");

    const storageState = parseStorageStateJson(filePath);

    const soonestExpiry = getSoonestExpiry(storageState);

    const now = Number(Date.now().toString().substring(0, 10));
    console.log(
      `storage-state.json IS ${soonestExpiry > now ? "VALID ✅" : "EXPIRED ❌"}`
    );
    return soonestExpiry > now;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return false;
  }
};
