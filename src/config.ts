import fs from "fs";
import path, { join } from "path";
import { IConfigItem } from "utools-helper";

// 获取 Cursor 安装路径
const getCursorPath = () => {
  // 根据操作系统类型确定可能的路径
  const isMac = process.platform === "darwin";
  const possiblePaths = isMac
    ? [
        // macOS 常见安装路径
        "/Applications/Cursor.app/Contents/MacOS/Cursor",
        path.join(
          process.env.HOME,
          "Applications/Cursor.app/Contents/MacOS/Cursor"
        ),
      ]
    : [
        // Windows 常见安装路径
        path.join(process.env.LOCALAPPDATA, "Programs", "cursor", "Cursor.exe"),
        path.join(process.env.PROGRAMFILES, "Cursor", "Cursor.exe"),
        path.join(process.env.PROGRAMFILES, "Programs", "Cursor", "Cursor.exe"),
      ];

  // 检查文件是否存在
  for (const cursorPath of possiblePaths) {
    if (fs.existsSync(cursorPath)) {
      return cursorPath;
    }
  }
  return null;
};

let defaultCursorPath = getCursorPath();

export const config: IConfigItem[] = [
  {
    name: "cursorPath",
    label: "cursorPath，重要，如果自定义cursor路径，需要配置此项",
    type: "input",
    placeholder: "重要，如果自定义cursor路径，需要配置此项",
    required: true,
    default: defaultCursorPath,
    only_current_machine: true,
  },
  {
    name: "db",
    label: "db，重要，如果自定义cursor路径，需要配置此项",
    placeholder: "重要，如果自定义cursor路径，需要配置此项",
    type: "input",
    required: true,
    only_current_machine: true,
    default: join(
      utools.getPath("appData"),
      "Cursor",
      "User",
      "globalStorage",
      "state.vscdb"
    ),
  },
  {
    name: "storage",
    label: "storage 路径 旧版本需要，理论上cursor不需要配置此项",
    placeholder: "storage 路径 旧版本需要，理论上cursor不需要配置此项",
    type: "input",
    required: true,
    only_current_machine: true,
    default: join(utools.getPath("appData"), "Cursor", "storage.json"),
  }
];
