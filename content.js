// Amazon.co.jpのアフィリエイトパラメータを削除するContent Script

(function() {
  'use strict';

  // アフィリエイト関連のパラメータリスト
  const affiliateParams = [
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
    'ie'
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

  // ページ上のすべてのAmazonリンクを処理
  function processAmazonLinks() {
    const links = document.querySelectorAll('a[href*="amazon.co.jp"]');
    
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
              // 新しく追加された要素内のAmazonリンクを処理
              const amazonLinks = node.querySelectorAll ? 
                node.querySelectorAll('a[href*="amazon.co.jp"]') : [];
              
              amazonLinks.forEach(link => {
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

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // 初期化処理
  function init() {
    // 現在のページがアフィリエイトリンクの場合はリダイレクト
    checkAndRedirectCurrentPage();

    // DOM読み込み完了後にリンク処理を実行
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        processAmazonLinks();
        setupMutationObserver();
      });
    } else {
      processAmazonLinks();
      setupMutationObserver();
    }
  }

  // 拡張機能を初期化
  init();

})();