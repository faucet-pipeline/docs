"use strict";

let generator = require("complate-ssg");

let generatePage = generator(__dirname, "./dist/views.js", { targetDir: "./dist/site" });

generatePage("index.html", "FrontPage");
