// Amazon、FANZA、DLsiteのアフィリエイトパラメータを削除するContent Script

(function() {
  'use strict';

  // アフィリエイト関連のパラメータリスト
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

  // URLからアフィリエイトパラメータを削除する関数
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
      return null;
    }
  }

  // 現在のページのURLをチェックしてリダイレクト
  function checkAndRedirectCurrentPage() {
    const currentUrl = window.location.href;
    const cleanUrl = removeAffiliateParams(currentUrl);
    
    if (cleanUrl && cleanUrl !== currentUrl) {
      console.log('Redirecting from affiliate URL:', currentUrl);
      console.log('To clean URL:', cleanUrl);
      window.location.replace(cleanUrl);
    }
  }

  // ページ上のすべてのアフィリエイトリンクを処理
  function processAffiliateLinks() {
    const links = document.querySelectorAll('a[href*="amazon.co.jp"], a[href*="dmm.co.jp"], a[href*="dlsite.com"]');
    
    links.forEach(link => {
      const originalHref = link.href;
      const cleanUrl = removeAffiliateParams(originalHref);
      
      if (cleanUrl && cleanUrl !== originalHref) {
        link.href = cleanUrl;
        console.log('Cleaned link:', originalHref, '->', cleanUrl);
      }
    });
  }

  // MutationObserverで動的に追加されるリンクも処理
  function setupMutationObserver() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // 新しく追加された要素内のアフィリエイトリンクを処理
              const affiliateLinks = node.querySelectorAll ? 
                node.querySelectorAll('a[href*="amazon.co.jp"], a[href*="dmm.co.jp"], a[href*="dlsite.com"]') : [];
              
              affiliateLinks.forEach(link => {
                const originalHref = link.href;
                const cleanUrl = removeAffiliateParams(originalHref);
                
                if (cleanUrl && cleanUrl !== originalHref) {
                  link.href = cleanUrl;
                  console.log('Cleaned dynamically added link:', originalHref, '->', cleanUrl);
                }
              });
            }
          });
        }
      });
    });

    // document.bodyが存在する場合のみObserverを開始
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      // bodyがまだ存在しない場合は、DOMContentLoadedで再試行
      document.addEventListener('DOMContentLoaded', function() {
        if (document.body) {
          observer.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
      });
    }
  }

  // 初期化処理
  function init() {
    // 現在のページがアフィリエイトリンクの場合はリダイレクト
    checkAndRedirectCurrentPage();

    // DOM読み込み完了後にリンク処理を実行
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        processAffiliateLinks();
        setupMutationObserver();
      });
    } else {
      processAffiliateLinks();
      setupMutationObserver();
    }
  }

  // 拡張機能を初期化
  init();

})();