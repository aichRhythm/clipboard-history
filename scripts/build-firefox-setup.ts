import { renameSync, writeFileSync } from "fs";

import packageJSON from "../package.json";

// mv package.json .package.json
renameSync("package.json", ".package.json");

// jq '.displayName="Clipboard History Pro" | del(.manifest.permissions[] | select(. == "offscreen"))' .package.json > package.json
packageJSON.displayName = "Clipboard History Pro";
packageJSON.manifest.permissions = packageJSON.manifest.permissions.filter(
  (permission) => permission !== "offscreen",
);
writeFileSync("package.json", JSON.stringify(packageJSON));
