import { Platform } from "../../shared/enums/platform.enum";

export interface AppData {
  name: string;
  icon: string;
  genre: string;
  os: Platform;
  packageId: string;
  bundleId?: string;
  storeUrl: string;
}
