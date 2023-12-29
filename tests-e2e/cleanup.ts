import os from "os";
import { execSync } from "child_process";

try {
  console.log("🧹 Cleanup: Attempting...");

  const operatingSystem = os.platform();
  // console.log("🧹 Cleanup: Operating System:", operatingSystem);

  if (operatingSystem === "win32") {
    console.log("⏳ Cleanup: Stopping Client...");
    console.log("⏳ Cleanup: Stopping Server...");
    execSync('taskkill /F /IM "node.exe"');
  } else {
    console.log("⏳ Cleanup: Stopping Client...");
    execSync("pkill -f 'npm --prefix ../client run dev'");
    console.log("⏳ Cleanup: Stopping Server...");
    execSync("pkill -f 'npm --prefix ../server run dev'");
  }

  console.log("✅ Cleanup: Complete");
  process.exit(0);
} catch (error) {
  console.error("❌ Cleanup: Failed");
  process.exit(1);
}
