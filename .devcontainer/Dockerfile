# ===================================================================
# RPGツクールMV/MZプラグイン開発 DevContainer用Dockerfile
# ===================================================================
# Microsoftが提供するDevContainer公式イメージをベースとする
# https://hub.docker.com/r/microsoft/devcontainers
FROM mcr.microsoft.com/devcontainers/javascript-node:24-trixie

USER root

# shellの指定
SHELL ["/bin/bash", "-euo", "pipefail", "-c"]

ENV \
    # コマンドラインのインタラクティブ操作を無効化
    # https://www.debian.org/releases/sarge/s390/ch05s02.html.ja
    DEBIAN_FRONTEND=noninteractive \
    # debconf警告の抑制
    # apt-getを利用すると出てしまう模様だが、docker環境では無視する
    # https://manpages.debian.org/unstable/debconf-doc/debconf.7.en.html#DEBCONF_NOWARNINGS
    DEBCONF_NOWARNINGS=yes \
    # タイムゾーンの設定
    TZ="Asia/Tokyo"

RUN \
    # パッケージのインストール
    apt-get update && \
    apt-get install --no-install-recommends -y make zip unzip jq tig && \
    # マウント用のディレクトリを作成
    mkdir -p /workspace && \
    # キャッシュ削除
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# コンテナ実行時ユーザー
USER node

# ワークディレクトリを設定
WORKDIR /workspace

# マウントポイントの設定
# /workspace
#   ワークスペース用ディレクトリ
# /workspace/node_modules
#   node_modulesのパフォーマンス対策用
# /workspace/project
#   RPGツクールMV/MZプロジェクトマウント用
VOLUME ["/backup", "/target"]
