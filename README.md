## myapps-nextjs

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind v4 プロジェクト。

### コマンド（pnpm）

```bash
pnpm dev           # 開発（Turbopack）
pnpm build         # ビルド（Turbopack）
pnpm start         # 本番サーバ
pnpm lint          # ESLint (flat config)
pnpm test          # Jest（ユニットテスト）
pnpm test:watch    # Jest ウォッチ
pnpm e2e           # Playwright（E2Eテスト）
pnpm e2e:ui        # E2Eテスト（UIモード）
pnpm e2e:headed    # E2Eテスト（ブラウザ表示）
pnpm e2e:report    # E2Eテストレポート表示
pnpm format        # Prettier で整形
pnpm format:check  # Prettier チェック
```

### 依存関係

#### 本番依存関係（dependencies）

| パッケージ | バージョン | 説明 | リンク |
|-----------|-----------|------|--------|
| next | 15.5.0 | React フレームワーク（App Router） | [npm](https://www.npmjs.com/package/next) |
| react | 19.1.0 | React ライブラリ | [npm](https://www.npmjs.com/package/react) |
| react-dom | 19.1.0 | React DOM レンダリング | [npm](https://www.npmjs.com/package/react-dom) |
| @radix-ui/react-label | ^2.1.7 | アクセシブルなラベルコンポーネント | [npm](https://www.npmjs.com/package/@radix-ui/react-label) |
| @radix-ui/react-slot | ^1.2.3 | コンポーネント合成のためのスロット | [npm](https://www.npmjs.com/package/@radix-ui/react-slot) |
| class-variance-authority | ^0.7.1 | バリアントベースのクラス管理 | [npm](https://www.npmjs.com/package/class-variance-authority) |
| clsx | ^2.1.1 | 条件付きクラス名ユーティリティ | [npm](https://www.npmjs.com/package/clsx) |
| dayjs | ^1.11.13 | 軽量な日時ライブラリ | [npm](https://www.npmjs.com/package/dayjs) |
| react-icons | ^5.5.0 | React用アイコンライブラリ | [npm](https://www.npmjs.com/package/react-icons) |
| tailwind-merge | ^3.3.1 | Tailwind CSS クラスマージャー | [npm](https://www.npmjs.com/package/tailwind-merge) |

#### 開発依存関係（devDependencies）

| パッケージ | バージョン | 説明 | リンク |
|-----------|-----------|------|--------|
| @babel/core | ^7.28.3 | Babel コンパイラー | [npm](https://www.npmjs.com/package/@babel/core) |
| @eslint/eslintrc | ^3 | ESLint 設定ユーティリティ | [npm](https://www.npmjs.com/package/@eslint/eslintrc) |
| @playwright/test | ^1.55.0 | E2E テストフレームワーク | [npm](https://www.npmjs.com/package/@playwright/test) |
| @tailwindcss/postcss | ^4 | Tailwind CSS PostCSS プラグイン | [npm](https://www.npmjs.com/package/@tailwindcss/postcss) |
| @testing-library/jest-dom | ^6.8.0 | Jest DOM マッチャー | [npm](https://www.npmjs.com/package/@testing-library/jest-dom) |
| @types/jest | ^30.0.0 | Jest TypeScript 型定義 | [npm](https://www.npmjs.com/package/@types/jest) |
| @types/node | ^20 | Node.js TypeScript 型定義 | [npm](https://www.npmjs.com/package/@types/node) |
| @types/react | ^19 | React TypeScript 型定義 | [npm](https://www.npmjs.com/package/@types/react) |
| @types/react-dom | ^19 | React DOM TypeScript 型定義 | [npm](https://www.npmjs.com/package/@types/react-dom) |
| babel-jest | ^30.0.5 | Jest Babel トランスフォーマー | [npm](https://www.npmjs.com/package/babel-jest) |
| eslint | ^9 | JavaScript/TypeScript リンター | [npm](https://www.npmjs.com/package/eslint) |
| eslint-config-next | 15.5.0 | Next.js ESLint 設定 | [npm](https://www.npmjs.com/package/eslint-config-next) |
| identity-obj-proxy | ^3.0.0 | CSS モジュール Jest プロキシ | [npm](https://www.npmjs.com/package/identity-obj-proxy) |
| jest | ^30.0.5 | JavaScript テストフレームワーク | [npm](https://www.npmjs.com/package/jest) |
| jest-environment-jsdom | ^30.0.0 | Jest JSDOM 環境 | [npm](https://www.npmjs.com/package/jest-environment-jsdom) |
| prettier | ^3.6.2 | コードフォーマッター | [npm](https://www.npmjs.com/package/prettier) |
| tailwindcss | ^4 | ユーティリティファーストCSS フレームワーク | [npm](https://www.npmjs.com/package/tailwindcss) |
| tw-animate-css | ^1.3.7 | Tailwind CSS アニメーションユーティリティ | [npm](https://www.npmjs.com/package/tw-animate-css) |
| typescript | ^5 | TypeScript コンパイラー | [npm](https://www.npmjs.com/package/typescript) |

### ディレクトリ構成（主要）

```text
.
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  └─ health/route.ts     # ヘルスチェック API
│  │  ├─ favicon.ico
│  │  ├─ globals.css            # Tailwind v4
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ ui/                    # shadcn/ui 追加コンポーネント
│  │  │  ├─ button.tsx
│  │  │  ├─ input.tsx
│  │  │  ├─ textarea.tsx
│  │  │  └─ label.tsx
│  │  ├─ layout/
│  │  └─ icons/
│  ├─ lib/
│  │  ├─ api/
│  │  ├─ hooks/
│  │  ├─ types/
│  │  ├─ utils/
│  │  └─ utils.ts               # shadcn 初期化で追加
│  ├─ messages/
│  ├─ styles/
│  └─ __tests__/                # ユニットテスト
├─ e2e/                         # E2Eテスト（Playwright）
│  ├─ home.spec.ts
│  ├─ api.spec.ts
│  └─ README.md
├─ public/
│  ├─ images/
│  ├─ fonts/
│  └─ *.svg
├─ components.json              # shadcn 設定
├─ playwright.config.ts         # Playwright E2E設定
├─ eslint.config.mjs            # ESLint フラット設定
├─ postcss.config.mjs           # Tailwind v4 用 PostCSS
├─ next.config.ts
├─ tsconfig.json
└─ README.md
```

### 開発メモ

- App Router 前提。クライアント側が必要な場合のみ `"use client"`。
- API ルートは `src/app/api/**/route.ts`。
- `@/*` → `src/*` のパスエイリアス。
- Jest は `jsdom` 環境、`babel-jest` で `next/babel` を使用。
- Playwright は Chrome/Firefox/Safari + Mobile でのE2Eテスト。
- Prettier 設定は `package.json` に記載（整形は `pnpm format`）。

### テスト

#### ユニットテスト（Jest）
- `src/__tests__/` にテストファイルを配置
- ユーティリティ関数やコンポーネントの単体テスト
- `pnpm test` で実行、`pnpm test:watch` でウォッチモード

#### E2Eテスト（Playwright）
- `e2e/` にテストファイルを配置
- ブラウザでの実際のユーザー操作をテスト
- `pnpm e2e` で実行、`pnpm e2e:ui` でUIモード
- Chrome、Firefox、Safari、Mobile Chrome、Mobile Safari で実行

### ヘルスチェック

`GET /api/health` で `{ status: "ok", timestamp: ISOString }` を返します。キャッシュは無効化。
