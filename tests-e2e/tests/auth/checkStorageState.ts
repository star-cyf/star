import fs from "fs";

export function checkStorageState() {
  const filePath = "./tests/auth/storage-state.json";
  const fileExists = () => {
    try {
      fs.accessSync(filePath, fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  };
  const notExpired = () => {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent);
      const jsonExpiredDate = JSON.parse(
        jsonData?.origins[0]?.localStorage[0]?.value
      )?.expirationTime; //1703193483
      const nowDate = Number(Date.now().toString().substring(0, 10)); //1703189366
      // console.log(
      //   `jsonExpiredDate:${new Date(
      //     jsonExpiredDate * 1000
      //   )} nowDate:${new Date()}`
      // );
      return jsonExpiredDate > nowDate;
    } catch (error: any) {
      console.error("Error reading JSON file:", error.message);
      return null;
    }
  };
  const exists = fileExists();
  const isNotExpired = notExpired();

  console.log(
    `storage-state.json exists: ${exists}, and is not expired: ${isNotExpired}`
  );

  return exists && isNotExpired;
}
