function switchLanguage(lang) {
  // すべての言語のコンテンツを非表示にする
  document.querySelectorAll('.content').forEach(function(element) {
      // フェードアウト
      element.style.opacity = '0';
      
      // フェードアウトが完了した後に非表示にする
      element.addEventListener('transitionend', function() {
          if (element.style.opacity === '0') {
              element.style.display = 'none'; // 遅延して非表示にする
          }
      });
  });

  // 選択された言語のコンテンツを表示する
  const selectedElements = document.querySelectorAll('.' + lang);
  selectedElements.forEach(function(element) {
      element.style.display = 'block'; // まず表示
      // フェードインを始める
      setTimeout(function() {
          element.style.opacity = '1'; // フェードイン
      }, 0); // すぐに透明度を変更
  });
}

