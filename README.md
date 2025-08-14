# 震源分布マップ（MapLibre + PMTiles）

このプロジェクトは、[Search Earthquake Catalog(USGS)](https://earthquake.usgs.gov/earthquakes/search/)で提供されている地震カタログデータを使用し、MapLibre GL JS + React を用いて Web 上に地震の震源の分布を表示したビューアです。

## 機能

- [Natural Earth 2](https://www.naturalearthdata.com/downloads/10m-raster-data/10m-natural-earth-2/)を背景に使用
- 過去20年間（2005/8/1-2025/8/1）のM6以上の地震について、震源の深さに応じて色分けして表示
- [プレート分布図](https://www.livescience.com/planet-earth/geology/how-many-tectonic-plates-does-earth-have)のOn/Off表示

## 🔧 セットアップ手順

### 1. 依存ライブラリのインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

---

## 🧪 デモで使用している主なライブラリ

| ライブラリ                                                     | 概要                    |
| --------------------------------------------------------- | --------------------- |
| [maplibre-gl](https://maplibre.org/)                      | 軽量オープンソース地図描画ライブラリ    |
| [pmtiles](https://github.com/protomaps/PMTiles) | PMTiles 形式の読み込み用プロトコル |
| [React](https://react.dev/)                               | UIフレームワーク             |
| [Vite](https://vitejs.dev/)                               | 超高速フロントエンド開発環境        |
| [TypeScript](https://www.typescriptlang.org/)             | 型安全なJavaScript        |

## ライセンス
MIT