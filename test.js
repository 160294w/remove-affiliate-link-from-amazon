// Comprehensive test script to verify URL cleaning functionality
const testCases = [
  // FANZA URLs
  {
    name: 'FANZA URL with all utm parameters',
    url: 'https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_564243/?utm_medium=dmm_affiliate&utm_source=a2aaaeaaiiia-001&utm_campaign=affiliate_toolbar&utm_content=link',
    expected: 'https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_564243/'
  },
  {
    name: 'FANZA URL with mixed parameters',
    url: 'https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_265734/?utm_medium=dmm_affiliate&utm_source=a2aaaeaaiiia-001&utm_campaign=affiliate_toolbar&utm_content=link&category=doujin',
    expected: 'https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_265734/?category=doujin'
  },
  
  // DLsite URLs
  {
    name: 'DLsite URL with unique_op and utm parameters',
    url: 'https://www.dlsite.com/maniax/work/=/product_id/RJ01150653.html/?unique_op=af&utm_medium=affiliate&utm_source=ch.dlsite.com%2Fmatome%2F456407',
    expected: 'https://www.dlsite.com/maniax/work/=/product_id/RJ01150653.html/'
  },
  {
    name: 'DLsite URL with mixed parameters',
    url: 'https://www.dlsite.com/maniax/work/=/product_id/RJ395652.html/?unique_op=af&utm_medium=affiliate&utm_source=ch.dlsite.com%2Fmatome%2F377103&locale=ja_JP',
    expected: 'https://www.dlsite.com/maniax/work/=/product_id/RJ395652.html/?locale=ja_JP'
  },
  
  // Amazon URLs
  {
    name: 'Amazon URL with tag parameter',
    url: 'https://www.amazon.co.jp/dp/B08N5WRWNW?tag=affiliate-22&ref=sr_1_1',
    expected: 'https://www.amazon.co.jp/dp/B08N5WRWNW'
  },
  {
    name: 'Amazon URL with multiple affiliate parameters',
    url: 'https://www.amazon.co.jp/dp/B08N5WRWNW?tag=affiliate-22&linkCode=ll1&linkId=abc123&ref=as_li_ss_tl&camp=247&creative=1211',
    expected: 'https://www.amazon.co.jp/dp/B08N5WRWNW'
  },
  {
    name: 'Amazon URL with mixed parameters',
    url: 'https://www.amazon.co.jp/s?k=laptop&tag=affiliate-22&ref=sr_pg_1&crid=ABC123DEF456',
    expected: 'https://www.amazon.co.jp/s?k=laptop&crid=ABC123DEF456'
  },
  
  // Edge cases
  {
    name: 'URL with no affiliate parameters',
    url: 'https://www.amazon.co.jp/dp/B08N5WRWNW?category=electronics&color=black',
    expected: null // Should return null since no changes needed
  },
  {
    name: 'URL with only non-affiliate parameters',
    url: 'https://www.dlsite.com/maniax/work/=/product_id/RJ123456.html/?locale=ja_JP&sort=date',
    expected: null // Should return null since no changes needed
  },
  {
    name: 'FANZA URL with single utm parameter',
    url: 'https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_123456/?utm_source=test&normal_param=value',
    expected: 'https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_123456/?normal_param=value'
  },
  {
    name: 'DLsite URL with only unique_op',
    url: 'https://www.dlsite.com/maniax/work/=/product_id/RJ123456.html/?unique_op=af&search=keyword',
    expected: 'https://www.dlsite.com/maniax/work/=/product_id/RJ123456.html/?search=keyword'
  },
  {
    name: 'URL with all supported affiliate parameters',
    url: 'https://www.amazon.co.jp/dp/B123?tag=test&linkCode=ll1&linkId=123&ref=test&ref_=test&referrer=test&camp=123&creative=456&creativeASIN=B123&ascsubtag=test&ie=UTF8&utm_medium=test&utm_source=test&utm_campaign=test&utm_content=test&unique_op=af&normal=keep',
    expected: 'https://www.amazon.co.jp/dp/B123?normal=keep'
  },
  
  // Error cases
  {
    name: 'Invalid URL',
    url: 'not-a-valid-url',
    expected: 'error'
  },
  {
    name: 'Empty URL',
    url: '',
    expected: 'error'
  }
];

// アフィリエイト関連のパラメータリスト（content.jsと同じ）
const affiliateParams = [
  // Amazon用パラメータ
  'tag',
  'linkCode',
  'linkId',
  'ref',
  'ref_',
  'referrer',
  'camp',
  'creative',
  'creativeASIN',
  'ascsubtag',
  'ie',
  // 共通パラメータ（FANZA、DLsite）
  'utm_medium',
  'utm_source',
  'utm_campaign',
  'utm_content',
  'unique_op'
];

// URLからアフィリエイトパラメータを削除する関数（content.jsと同じ）
function removeAffiliateParams(url) {
  try {
    const urlObj = new URL(url);
    let hasChanged = false;

    // 各アフィリエイトパラメータを削除
    affiliateParams.forEach(param => {
      if (urlObj.searchParams.has(param)) {
        urlObj.searchParams.delete(param);
        hasChanged = true;
      }
    });

    // パラメータに変更があった場合のみ新しいURLを返す
    if (hasChanged) {
      return urlObj.toString();
    }
    return null;
  } catch (error) {
    console.error('URL parsing error:', error);
    return 'error';
  }
}

// テスト実行
function runTests() {
  console.log('🧪 Running Affiliate Link Remover Tests...\n');
  
  let passed = 0;
  let failed = 0;
  const failedTests = [];

  testCases.forEach((testCase, index) => {
    const result = removeAffiliateParams(testCase.url);
    const actualResult = result || testCase.url;
    const expectedResult = testCase.expected || testCase.url;
    
    const isPass = actualResult === expectedResult;
    
    if (isPass) {
      passed++;
      console.log(`✅ Test ${index + 1}: ${testCase.name} - PASS`);
    } else {
      failed++;
      failedTests.push({
        name: testCase.name,
        url: testCase.url,
        expected: expectedResult,
        actual: actualResult
      });
      console.log(`❌ Test ${index + 1}: ${testCase.name} - FAIL`);
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log(`📊 Test Results: ${passed} passed, ${failed} failed out of ${testCases.length} total`);
  
  if (failed > 0) {
    console.log('\n🔍 Failed Test Details:');
    failedTests.forEach((test, index) => {
      console.log(`\n${index + 1}. ${test.name}`);
      console.log(`   URL:      ${test.url}`);
      console.log(`   Expected: ${test.expected}`);
      console.log(`   Actual:   ${test.actual}`);
    });
  } else {
    console.log('\n🎉 All tests passed!');
  }
  
  return failed === 0;
}

// パラメータテスト - 各アフィリエイトパラメータが正しく削除されることをテスト
function runParameterTests() {
  console.log('\n🔧 Testing Individual Parameters...\n');
  
  const baseUrl = 'https://www.amazon.co.jp/dp/B123';
  let parameterTestsPassed = 0;
  let parameterTestsFailed = 0;
  
  affiliateParams.forEach((param, index) => {
    const testUrl = `${baseUrl}?${param}=testvalue&keep=this`;
    const result = removeAffiliateParams(testUrl);
    const expected = `${baseUrl}?keep=this`;
    
    if (result === expected) {
      parameterTestsPassed++;
      console.log(`✅ Parameter ${index + 1}: '${param}' removed correctly`);
    } else {
      parameterTestsFailed++;
      console.log(`❌ Parameter ${index + 1}: '${param}' NOT removed correctly`);
      console.log(`   Expected: ${expected}`);
      console.log(`   Actual:   ${result}`);
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log(`📊 Parameter Tests: ${parameterTestsPassed} passed, ${parameterTestsFailed} failed`);
  
  return parameterTestsFailed === 0;
}

// メイン実行
if (require.main === module) {
  const mainTestsPass = runTests();
  const parameterTestsPass = runParameterTests();
  
  if (mainTestsPass && parameterTestsPass) {
    console.log('\n🏆 All tests passed! The affiliate link remover is working correctly.');
    process.exit(0);
  } else {
    console.log('\n💥 Some tests failed. Please review the implementation.');
    process.exit(1);
  }
}

module.exports = { removeAffiliateParams, affiliateParams, testCases };