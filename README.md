[こちらのボイラープレートを利用しています](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate)

## 概要

TweetDeck内の動画プレイヤーの音量調整を補助する拡張機能。

- 設定した音量を保存し、ブラウザ間で同期*
- 拡張機能のポップアップウィンドウでいつでも音量を変更、即反映

*Firefoxでは設定 → Sync でアドオンの同期を有効にする必要があります。

## 使い方

現在手動でビルドをしているので用意が遅れることがあります。すぐに最新版を使いたい場合は下記のコマンドでビルドしてください。

```bash
npm install
npm run build:chrome # for chrome
npm run build:firefox # for firefox
npm run build:opera # for opera
```

## ライセンス

MIT ライセンスで提供されています。LICENSE ファイルをご確認ください。

- Use boilerplate [samuelsimoes/chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate) (MIT License)
- Use [volume_up of Material Design Icon](https://material.io/resources/icons/) for extension icon (Apache License 2.0)
