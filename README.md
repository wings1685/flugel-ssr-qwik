# SSR Experiments Qwik Version

Qwik SSR での挙動を見るためだけの実験場です。

**Note:** 本リポジトリは、実験場という性質であるため Issues 及び Pull Requests は受け付けておりません。

## Tech Stack

- Qwik 1.20.1

- Drizzle ORM 0.45.3
- Drizzle Kit 0.31.11

## Experiments

この実験場では以下を行いました。

- Qwik + Drizzle での CRUD 処理

## Related Articles

- [各 JS フレームワークのみでの DB 連携探訪記](https://wings.hatenablog.com/entry/withoutLaravelFestival)

## Static Site Generator (Node.js)

Be sure to configure your server to serve very long cache headers for the `build/**/*.js` files.

Typically you'd set the `Cache-Control` header for those files to `public, max-age=31536000, immutable`.

```shell
npm run build.server
```
