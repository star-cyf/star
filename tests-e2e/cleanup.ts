import os from "os";
import { execSync } from "child_process";

try {
  console.log("🧹 Cleanup: Attempting...");

  const operatingSystem = os.platform();

  console.log("⏳ Cleanup: Stopping Client & Server...");
  if (operatingSystem === "win32") {
    execSync('taskkill /F /IM "node.exe"');
  } else {
    execSync("lsof -ti :3000 | xargs kill");
    execSync("lsof -ti :4000 | xargs kill");
  }

  console.log("✅ Cleanup: Complete");
  process.exit(0);
} catch (error) {
  console.error("❌ Cleanup: Failed");
  process.exit(1);
}
