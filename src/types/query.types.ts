import { Browser } from "../core/browser/browser.js";
import { Engine } from "../core/engine/engine.js";

export interface BrowserProfileQuery {
  browser: string;
  profiles: string[];
}

export type QueryBrowser = [string, Browser<string, any>];
export type QueryEngine = [string, Engine<any, any>];
