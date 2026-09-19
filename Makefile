# =============================================================================
# パッケージング用Makefile
# =============================================================================
# shellの指定
SHELL := /usr/bin/bash

# 出力ディレクトリの定義
DIST_DIR := ./dist

# ビルド済みプラグインファイルの実体
BUILT_PLUGIN_FILE := ./build/UTA_MessageSkipMV.js

# デフォルトゴールの定義
.DEFAULT_GOAL := help

# 仮想ターゲットの定義
.PHONY := help clean js pack all

# コマンド群を1つのシェルプロセスで実行するように
.ONESHELL:

# 使い方の表示
help:
	@cat <<-'EOS'
	# Usage
	make [target]
	  
	# Targets
	clean : Clean dist directory.
	js    : Run release build plugin js file and copy built plugin js file to project root.
	pack  : Create package from built files.
	all   : Execute in batch clean, js, pack targets.
	EOS

# 出力ディレクトリのお掃除
clean:
	@if [ ! -d "$(DIST_DIR)" ]; then { mkdir -p "$(DIST_DIR)"; } fi
	@echo "Clean dist directory... ($(DIST_DIR))"
	@find $(DIST_DIR) -mindepth 1 -delete

# プラグインファイルのリリースビルド
# PluginFinder用にプロジェクトルートにコピーしておく
js:
	@npm run clean
	@npm run build:release
	@cp -af $(BUILT_PLUGIN_FILE) ./

# パッケージングスクリプトを実行
pack:
	@$(SHELL) ./tools/make_package.sh

# ビルド・パッケージングの一括処理
all: clean js pack
