# Amazon Affiliate Link Remover

[日本語](./README.md) | [English]

A Chrome extension that automatically removes affiliate parameters from Amazon.co.jp links and redirects to clean URLs.

## Features

- Automatically removes affiliate parameters (`tag`, `linkCode`, `ref`, etc.) from Amazon.co.jp pages
- Cleans up Amazon links on web pages
- Monitors and processes dynamically added links
- Real-time URL redirection

## Installation

1. Open `chrome://extensions/` in Chrome
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" 
4. Select this folder

## Testing

1. After installing the extension, open `test.html` in your browser
2. Click the test links to verify affiliate parameters are removed
3. Check the browser developer tools console for logs

## Main Parameters Removed

- `tag` - Affiliate tag
- `linkCode` - Link code
- `linkId` - Link ID
- `ref`, `ref_` - Reference
- `referrer` - Referrer
- `camp` - Campaign
- `creative` - Creative
- `creativeASIN` - Creative ASIN
- `ascsubtag` - ASC subtag
- `ie` - Encoding

## File Structure

```
remove-affiliate-link-from-amazon/
├── manifest.json      # Extension configuration
├── content.js         # Main logic
├── icon16.png         # 16x16 icon
├── icon48.png         # 48x48 icon
├── icon128.png        # 128x128 icon
├── test.html          # Test page
├── README.md          # Japanese README
└── README_EN.md       # This file
```