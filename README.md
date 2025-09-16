# Next.js Template

モダンなNext.js 15.5.0 + React 19 + TypeScript + Tailwind CSS v4 + Prisma + React Query + Zustand テンプレート

## 技術スタック

- **Framework**: Next.js 15.5.0 (App Router)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Database**: Prisma ORM + MySQL
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: shadcn/ui + Radix UI
- **Form Handling**: React Hook Form + Zod
- **Testing**: Jest + Testing Library
- **Development**: Turbopack + ESLint v9 + Prettier

## 主な機能

- ✅ Next.js 15.5.0対応（Turbopack有効）
- ✅ React 19対応
- ✅ TypeScript strict mode
- ✅ Tailwind CSS v4
- ✅ Prisma ORM（MySQL対応）
- ✅ React Query（TanStack Query）
- ✅ Zustand状態管理
- ✅ shadcn/uiコンポーネント
- ✅ フォームバリデーション（Zod）
- ✅ テスト環境（Jest + Testing Library）
- ✅ ESLint v9 + Prettier
- ✅ 国際化対応準備

## 依存関係

### 本番依存関係（dependencies）

| パッケージ                     | バージョン | 説明                               | 用途                 |
| ------------------------------ | ---------- | ---------------------------------- | -------------------- |
| next                           | 15.5.0     | React フレームワーク（App Router） | メインフレームワーク |
| react                          | 19.1.0     | React ライブラリ                   | UI ライブラリ        |
| react-dom                      | 19.1.0     | React DOM レンダリング             | ブラウザレンダリング |
| @prisma/client                 | ^6.15.0    | Prisma ORM クライアント            | データベース操作     |
| @tanstack/react-query          | ^5.85.5    | React Query（TanStack Query）      | サーバー状態管理     |
| @tanstack/react-query-devtools | ^5.85.5    | React Query 開発ツール             | 開発時のデバッグ     |
| zustand                        | ^5.0.8     | 状態管理ライブラリ                 | クライアント状態管理 |
| @radix-ui/react-label          | ^2.1.7     | アクセシブルなラベルコンポーネント | UI コンポーネント    |
| @radix-ui/react-slot           | ^1.2.3     | コンポーネント合成のためのスロット | UI コンポーネント    |
| class-variance-authority       | ^0.7.1     | バリアントベースのクラス管理       | UI コンポーネント    |
| clsx                           | ^2.1.1     | 条件付きクラス名ユーティリティ     | CSS クラス管理       |
| tailwind-merge                 | ^3.3.1     | Tailwind CSS クラスマージャー      | CSS クラス最適化     |
| react-hook-form                | ^7.62.0    | フォーム管理ライブラリ             | フォーム処理         |
| zod                            | ^4.1.4     | スキーマバリデーション             | データ検証           |
| dayjs                          | ^1.11.13   | 軽量な日時ライブラリ               | 日時処理             |
| react-icons                    | ^5.5.0     | React用アイコンライブラリ          | アイコン表示         |
| hono                           | ^4.9.7     | 軽量Webフレームワーク              | API ルート           |

## セットアップ

### 前提条件

- Node.js 18.17.0以上
- pnpm 8.0.0以上
- MySQL 8.0以上

### インストール

```bash
# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env.local
# .env.localを編集してデータベース接続情報を設定

# Prismaクライアントの生成
pnpm prisma generate

# データベースのセットアップ
pnpm prisma migrate dev
```

### 開発サーバーの起動

```bash
# 開発サーバー起動（Turbopack有効）
pnpm dev

# ビルド
pnpm build

# 本番サーバー起動
pnpm start
```

## スクリプト

```bash
# 開発
pnpm dev              # 開発サーバー起動
pnpm build            # ビルド
pnpm start            # 本番サーバー起動

# コード品質
pnpm lint             # ESLint実行
pnpm format           # Prettier実行
pnpm format:check     # Prettierチェック

# テスト
pnpm test             # テスト実行
pnpm test:watch       # テストウォッチモード

# データベース
pnpm prisma generate  # Prismaクライアント生成
pnpm prisma migrate dev # マイグレーション実行
pnpm prisma studio    # Prisma Studio起動
```

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── example/           # 例示ページ
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # ホームページ
├── components/            # Reactコンポーネント
│   ├── icons/            # アイコンコンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   ├── providers/        # プロバイダーコンポーネント
│   └── ui/               # shadcn/uiコンポーネント
├── lib/                   # ユーティリティ・ライブラリ
│   ├── api/              # API関連
│   ├── db/               # データベース関連
│   ├── hooks/            # カスタムフック
│   ├── prisma.ts         # Prismaクライアント
│   ├── query-client.ts   # React Queryクライアント
│   ├── store/            # Zustandストア
│   ├── types/            # 型定義
│   ├── utils/            # ユーティリティ関数
│   └── validations/      # Zodバリデーション
└── messages/              # 国際化メッセージ

prisma/
├── schema.prisma          # Prismaスキーマ
└── migrations/            # データベースマイグレーション

e2e/                      # Playwright E2Eテスト
```

## 環境変数

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
# データベース
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# その他の環境変数
NODE_ENV=development
```

## 開発ガイドライン

詳細な開発ガイドラインについては [AGENTS.md](./AGENTS.md) を参照してください。

このファイルには以下の内容が含まれています：
- コーディング標準とベストプラクティス
- アーキテクチャ原則
- 技術固有の実装パターン
- テスト戦略
- セキュリティガイドライン
- コミットルールとGit運用

## ライセンス

MIT License
