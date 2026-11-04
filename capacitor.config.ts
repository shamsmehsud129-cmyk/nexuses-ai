import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.nexuses.ai",
  appName: "Nexuses AI",
  webDir: "out",
  server: {
    url: "https://nexuses-ai-seven.vercel.app",
    androidScheme: "https",
  },
};

export default config;
