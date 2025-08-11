# Affiliate Link Remover

[日本語] | [English](./README_EN.md)

Amazon、FANZA、DLsiteのアフィリエイトパラメータを自動的に削除してクリーンなリンクにリダイレクトするChrome拡張機能です。

## 目的

この拡張機能は、自分のアフィリエイトリンクを踏まないようにするために開発されました。副作用として全てのアフィリエイトリンクが無効になるので注意してください。他の方のアフィリエイト収入にも影響が出る可能性があります。

## 対応サイト

- **Amazon** (amazon.co.jp) - アフィリエイトパラメータを自動削除
- **FANZA** (dmm.co.jp) - UTMパラメータを自動削除
- **DLsite** (dlsite.com) - unique_op及びUTMパラメータを自動削除

## 機能

- 各サイトのアフィリエイトパラメータを自動削除
- ページ上のアフィリエイトリンクのクリーン化
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

### Amazon用パラメータ
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

### FANZA・DLsite共通パラメータ
- `utm_medium` - UTMメディア
- `utm_source` - UTMソース
- `utm_campaign` - UTMキャンペーン
- `utm_content` - UTMコンテンツ

### DLsite専用パラメータ
- `unique_op` - アフィリエイト識別子

## 使用例

### Amazon の例

**変更前（アフィリエイト付きURL）:**
```
https://www.amazon.co.jp/dp/B00ZR7XVNO?tag=example-affiliate-22&linkCode=abc&th=1&psc=1
```

**変更後（クリーンなURL）:**
```
https://www.amazon.co.jp/dp/B00ZR7XVNO?th=1&psc=1
```

**削除されたパラメータ:** `tag`, `linkCode`  
**保持されたパラメータ:** `th`, `psc` (商品表示に必要な通常パラメータ)

### FANZA の例

**変更前（アフィリエイト付きURL）:**
```
https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_564243/?utm_medium=dmm_affiliate&utm_source=a2aaaeaaiiia-001&utm_campaign=affiliate_toolbar&utm_content=link
```

**変更後（クリーンなURL）:**
```
https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_564243/
```

**削除されたパラメータ:** `utm_medium`, `utm_source`, `utm_campaign`, `utm_content`

### DLsite の例

**変更前（アフィリエイト付きURL）:**
```
https://www.dlsite.com/maniax/work/=/product_id/RJ01150653.html/?unique_op=af&utm_medium=affiliate&utm_source=ch.dlsite.com%2Fmatome%2F456407
```

**変更後（クリーンなURL）:**
```
https://www.dlsite.com/maniax/work/=/product_id/RJ01150653.html/
```

**削除されたパラメータ:** `unique_op`, `utm_medium`, `utm_source`

## テストについて

拡張機能の動作テストには以下のファイルを使用できます：

- **test.html** - ブラウザで開いてリンクテストができるHTMLページ
- **test.js** - Node.jsで実行する自動テストスクリプト

### 自動テスト実行
```bash
node test.js
```

## ファイル構成

```
remove-affiliate-link-from-amazon/
├── manifest.json      # 拡張機能の設定
├── content.js         # メインロジック
├── icon16.png         # 16x16アイコン
├── icon48.png         # 48x48アイコン
├── icon128.png        # 128x128アイコン
├── test.html          # ブラウザテスト用ページ
├── test.js           # 自動テストスクリプト
├── README.md          # このファイル
└── README_EN.md       # 英語版README
```
