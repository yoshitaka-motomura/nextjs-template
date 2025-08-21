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

### 主な依存関係

- Next.js 15 / React 19 / TypeScript 5
- Tailwind CSS v4 + PostCSS
- shadcn/ui（`components.json` に基づく UI コンポーネント）
- Radix UI 一部（Label/Slot）
- class-variance-authority / clsx / tailwind-merge
- react-icons（アイコン）
- Jest（jsdom + babel-jest） / Playwright（E2E） / Prettier / ESLint v9（flat）

`package.json` 抜粋（バージョンはロックファイル参照）:

```json
{
  "dependencies": {
    "next": "15.x",
    "react": "19.x",
    "react-dom": "19.x",
    "react-icons": "^5",
    "@radix-ui/react-label": "^2",
    "@radix-ui/react-slot": "^1",
    "class-variance-authority": "^0.7",
    "clsx": "^2",
    "tailwind-merge": "^3"
  },
  "devDependencies": {
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.x",
    "jest": "^30",
    "jest-environment-jsdom": "^30",
    "babel-jest": "^30",
    "@babel/core": "^7",
    "@playwright/test": "^1.55",
    "prettier": "^3",
    "typescript": "^5"
  }
}
```

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
