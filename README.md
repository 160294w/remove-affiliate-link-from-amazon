# Amazon Affiliate Link Remover

[日本語] | [English](./README_EN.md)

Amazon.co.jpのアフィリエイトパラメータを自動的に削除してクリーンなリンクにリダイレクトするChrome拡張機能です。

## 機能

- Amazon.co.jpページでアフィリエイトパラメータ（`tag`, `linkCode`, `ref`など）を自動削除
- ページ上のAmazonリンクのクリーン化
- 動的に追加されるリンクの監視と処理
- リアルタイムでのURLリダイレクト

## インストール方法

1. Chromeで `chrome://extensions/` にアクセス
2. 右上の「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このフォルダを選択

## テスト方法

1. 拡張機能をインストール後、`test.html`をブラウザで開く
2. テストリンクをクリックしてアフィリエイトパラメータが削除されることを確認
3. ブラウザの開発者ツールでコンソールログを確認

## 削除される主なパラメータ

- `tag` - アフィリエイトタグ
- `linkCode` - リンクコード
- `linkId` - リンクID
- `ref`, `ref_` - リファレンス
- `referrer` - リファラー
- `camp` - キャンペーン
- `creative` - クリエイティブ
- `creativeASIN` - クリエイティブASIN
- `ascsubtag` - ASCサブタグ
- `ie` - エンコーディング

## ファイル構成

```
remove-affiliate-link-from-amazon/
├── manifest.json      # 拡張機能の設定
├── content.js         # メインロジック
├── icon16.png         # 16x16アイコン
├── icon48.png         # 48x48アイコン
├── icon128.png        # 128x128アイコン
├── test.html          # テスト用ページ
└── README.md          # このファイル
```
