let currentTab = localStorage.getItem('currentTab') || 'frontend'; // localStorageからタブの状態を取得

const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('change', function () {
    if (this.checked) {
        navList.style.display = 'flex'; // 表示状態にする
        navList.classList.remove('nav-close'); // フェードアウトクラスを削除
        navList.classList.add('nav-open'); // フェードインクラスを追加
    } else {
        navList.classList.remove('nav-open'); // フェードインクラスを削除
        navList.classList.add('nav-close'); // フェードアウトクラスを追加
        // アニメーションの終了を待ってから非表示にする
        navList.addEventListener('animationend', function handleAnimationEnd() {
            navList.style.display = 'none'; // アニメーション後に非表示にする
            navList.classList.remove('nav-close'); // クラスをリセット
            navList.removeEventListener('animationend', handleAnimationEnd); // イベントリスナーを削除
        });
    }
});

// 言語選択をした際に、ナビゲーションを閉じる。
function closeNavList() {
    const screenWidth = window.innerWidth; // 現在の画面幅を取得

    // スマートフォンサイズ（768px以下）の場合のみ実行
    if (screenWidth <= 768) {
        menuToggle.checked = false; // トグルをオフにする
        navList.classList.remove('nav-open'); // フェードインクラスを削除
        navList.classList.add('nav-close'); // フェードアウトクラスを追加
        // アニメーションの終了を待ってから非表示にする
        navList.addEventListener('animationend', function handleAnimationEnd() {
            navList.style.display = 'none'; // アニメーション後に非表示にする
            navList.classList.remove('nav-close'); // クラスをリセット
            navList.removeEventListener('animationend', handleAnimationEnd); // イベントリスナーを削除
        });
    }
}

function switchLanguage(lang) {
    // すべての言語のコンテンツを非表示にする
    document.querySelectorAll('.content').forEach(function(element) {
        element.style.opacity = '0';
        element.style.pointerEvents = 'none'; // 選択を無効化

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
        setTimeout(function() {
            element.style.opacity = '1'; // フェードイン
            element.style.pointerEvents = 'auto'; // 選択を有効化
        }, 0);
    });

    // タブを初期化
    switchTab(currentTab); // デフォルトのタブを表示
}

function switchTab(tab) {
    currentTab = tab; // 現在のタブを更新
    localStorage.setItem('currentTab', currentTab); // タブの状態を保存

    // すべてのプロジェクトカテゴリを非表示
    document.querySelectorAll('.project-category-page').forEach(function(element) {
        element.style.display = 'none';
        element.classList.remove('fade-in'); // アニメーションクラスを削除
    });

    // 選択されたタブのプロジェクトカテゴリを表示
    const selectedCategory = document.querySelectorAll(`.${tab}`);
    selectedCategory.forEach(function(element) {
        element.style.display = 'block'; // 表示
        observer.observe(element); // 再度監視を開始
    });
}

// ページが読み込まれたときに現在のタブを表示
window.addEventListener('DOMContentLoaded', () => {
    switchTab(currentTab); // 最初にタブを表示

    // 初回の監視設定をここで行う
    document.querySelectorAll('.project-category, .custom-about, .custom-contact').forEach((element) => {
        observer.observe(element); // どちらの要素も監視
    });
});

// フェードインアニメーション //
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('project-category')) {
                entry.target.classList.add('fade-in'); // プロジェクトカテゴリーにはフェードイン
            } else if (entry.target.classList.contains('custom-about') || entry.target.classList.contains('custom-contact')) {
                entry.target.classList.add('fade-in-scale'); // カスタムヘッディングにはスケール
            }
            observer.unobserve(entry.target); // 一度だけ発動する場合は監視を停止
        }
    });
}, { threshold: 0.8 });

// about me //
function toggleContent(element) {
    const content = element.nextElementSibling;
    content.classList.toggle('show');
    element.textContent = content.classList.contains('show') ? 'Show Less' : 'Learn More';
}

// モーダルを取得
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.modal-close');

// モーダルを開くリンク（動画サムネイル）を取得
const openModalLinks = document.querySelectorAll('.open-modal');

// 各リンクにクリックイベントを追加
openModalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const videoSrc = link.getAttribute('data-video-src'); // data属性から動画のパスを取得
        modalVideo.querySelector('source').src = videoSrc; // 動画のソースを設定
        modalVideo.load(); // 動画を再読み込み
        modal.style.display = 'flex'; // モーダルを表示
    });
});

// モーダルを閉じる
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalVideo.querySelector('source').src = ''; // モーダルを閉じたら動画のソースをクリア
});

// モーダルの外側をクリックしたときも閉じる
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modalVideo.querySelector('source').src = ''; // モーダルを閉じたら動画のソースをクリア
    }
});
