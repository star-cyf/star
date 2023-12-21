import fs from "fs";

export function checkState() {
  const filePath = "./src/utils/storage-state.json";
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
  const exist = fileExists();
  const expired = notExpired();

  console.log(exist, expired);

  return exist && expired;
}
