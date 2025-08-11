# Affiliate Link Remover

[日本語](./README.md) | [English]

A Chrome extension that automatically removes affiliate parameters from Amazon, FANZA, and DLsite links and redirects to clean URLs.

## Purpose

This extension was developed to avoid clicking on your own affiliate links. As a side effect, all affiliate links will be disabled, so please be aware that this may impact other people's affiliate income as well.

## Supported Sites

- **Amazon** (amazon.co.jp) - Removes affiliate parameters automatically
- **FANZA** (dmm.co.jp) - Removes UTM parameters automatically  
- **DLsite** (dlsite.com) - Removes unique_op and UTM parameters automatically

## Features

- Automatically removes affiliate parameters from supported sites
- Cleans up affiliate links on web pages
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

### Amazon Parameters
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

### FANZA・DLsite Common Parameters
- `utm_medium` - UTM medium
- `utm_source` - UTM source
- `utm_campaign` - UTM campaign
- `utm_content` - UTM content

### DLsite Specific Parameters
- `unique_op` - Affiliate identifier

## Usage Examples

### Amazon Example

**Before (URL with affiliate parameters):**
```
https://www.amazon.co.jp/dp/B00ZR7XVNO?tag=example-affiliate-22&linkCode=abc&th=1&psc=1
```

**After (Clean URL):**
```
https://www.amazon.co.jp/dp/B00ZR7XVNO?th=1&psc=1
```

**Removed parameters:** `tag`, `linkCode`  
**Preserved parameters:** `th`, `psc` (normal parameters needed for product display)

### FANZA Example

**Before (URL with affiliate parameters):**
```
https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_564243/?utm_medium=dmm_affiliate&utm_source=a2aaaeaaiiia-001&utm_campaign=affiliate_toolbar&utm_content=link
```

**After (Clean URL):**
```
https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_564243/
```

**Removed parameters:** `utm_medium`, `utm_source`, `utm_campaign`, `utm_content`

### DLsite Example

**Before (URL with affiliate parameters):**
```
https://www.dlsite.com/maniax/work/=/product_id/RJ01150653.html/?unique_op=af&utm_medium=affiliate&utm_source=ch.dlsite.com%2Fmatome%2F456407
```

**After (Clean URL):**
```
https://www.dlsite.com/maniax/work/=/product_id/RJ01150653.html/
```

**Removed parameters:** `unique_op`, `utm_medium`, `utm_source`

## Testing

The extension functionality can be tested using the following files:

- **test.html** - HTML page for browser-based link testing
- **test.js** - Automated test script for Node.js

### Running Automated Tests
```bash
node test.js
```

## File Structure

```
remove-affiliate-link-from-amazon/
├── manifest.json      # Extension configuration
├── content.js         # Main logic
├── icon16.png         # 16x16 icon
├── icon48.png         # 48x48 icon
├── icon128.png        # 128x128 icon
├── test.html          # Browser test page
├── test.js           # Automated test script
├── README.md          # Japanese README
└── README_EN.md       # This file
```