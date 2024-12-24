import { InitPlugins, Setting } from "utools-helper";
import { config } from "./config";
import { Cursor } from "./cursor";
import { CursorOpen } from "./cursor";
try {
  InitPlugins([
    new Cursor(),
    new CursorOpen(),
    Setting.Init("cursor-setting", config),
  ]);
} catch (error) {
  alert(error.stack ? error.stack : error);
}
