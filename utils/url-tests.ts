import { pathToRegexp } from "path-to-regexp";

export default [
  ...(import.meta.dev ? [pathToRegexp("{https\\://}?{www.}?github.com", { sensitive: true })] : []),
  pathToRegexp("{https\\://}?github.com/:author/:repo/(releases|archive|blob|raw)/*", { sensitive: true }),
  pathToRegexp("{https\\://}?github.com/:author/:repo/(info|git-)(.*)", { sensitive: true }),
  pathToRegexp("{https\\://}?raw.(githubusercontent|github).com/:author/:repo/(.+)/*", { sensitive: true }),
  pathToRegexp("{https\\://}?gist.(githubusercontent|github).com/:author/(.+)/*", { sensitive: true }),
];
