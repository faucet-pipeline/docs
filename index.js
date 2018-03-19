"use strict";

let generator = require("complate-ssg");
let path = require("path");

let TARGET_DIR = "./dist/site";

let manifest = require("./dist/manifest.json");
let views = path.resolve(TARGET_DIR, manifest["views.js"]);
let generatePage = generator(__dirname, views, { targetDir: TARGET_DIR });

generatePage("index.html", "front-page");
generatePage("philosophy.html", "philosophy");
