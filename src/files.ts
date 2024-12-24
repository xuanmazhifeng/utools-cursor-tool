import { readFileSync } from "fs";
import { Database } from "sql.js";
const initSqlJs = require("../third_party/sqljs/sql-wasm");

export interface Recent {
  entries: Entry[];
}

export interface Entry {
  folderUri?: string;
  workspace?: Workspace;
  label?: string;
  remoteAuthority?: string;
  fileUri?: string;
}

export interface Workspace {
  id: string;
  configPath: string;
}

export async function GetFiles(path: string) {
  let db = new (await initSqlJs()).Database(readFileSync(path)) as Database;
  let sql =
    "select value from ItemTable where key = 'history.recentlyOpenedPathsList'";
  let results = db.exec(sql);
  let res = results[0].values.toString();
  if (!res)
    throw new Error(
      "数据获取失败, 请检查 vsc-setting 配置, <br/> 注意当前仅在 vscode 1.64 版本进行过测试"
    );
  let data = JSON.parse(res) as Recent;

  return data.entries.map((file) => {
    if (typeof file === "string") return file;
    let path = file.fileUri || file.folderUri || file.workspace.configPath;
    return path;
  });
}
