# =============================================================================
# パッケージング用Makefile
# =============================================================================
# shellの指定
SHELL := /usr/bin/bash

# 出力ディレクトリの定義
DIST_DIR := ./dist

# ビルド済みプラグインファイルの実体
BUILT_PLUGIN_FILE := ./build/UTA_MessageSkipMV.js

# Sphinx関連変数定義
SPHINXBUILD         ?= sphinx-build
SPHINX_SOURCE_DIR   := docs/help/source
SPHINX_BUILD_DIR    := docs/help/build

SPHINX_AUTOBUILD    ?= sphinx-autobuild
SPHINX_PREVIEW_PORT := 8000

# デフォルトゴールの定義
.DEFAULT_GOAL := help

# 仮想ターゲットの定義
.PHONY := help clean-js js watch-sphinx build-sphinx clean-sphinx clean pack all

# コマンド群を1つのシェルプロセスで実行するように
.ONESHELL:

# 使い方の表示
help:
	@cat <<-'EOS'
	# Usage
	make <target>
	  
	# Targets
	clean-js     : Clean js build directory.
	js           : Run release build plugin js file and copy built plugin js file to project root.
	watch-spbinx : Execute sphinx-autobuild.
	build-sphinx : Build sphinx document to html.
	clean-sphinx : Clean sphinx build directory.
	clean        : Execute clean-js and clean-sphinx.
	pack         : Create package from built files.
	all          : Execute clean, build, pack targets.
	EOS

# js出力ディレクトリのお掃除
clean-js:
	@if [ ! -d "$(DIST_DIR)" ]; then { mkdir -p "$(DIST_DIR)"; } fi
	@echo "Clean dist directory... ($(DIST_DIR))"
	@find $(DIST_DIR) -mindepth 1 -delete

# プラグインファイルのリリースビルド
# PluginFinder用にプロジェクトルートにコピーしておく
js:
	@npm run clean
	@npm run build:release
	@cp -af $(BUILT_PLUGIN_FILE) ./

# sphinx-autobuild
# ホットリロードありプレビュー
watch-sphinx:
	@$(SPHINX_AUTOBUILD) "$(SPHINX_SOURCE_DIR)" "$(SPHINX_BUILD_DIR)" --port $(SPHINX_PREVIEW_PORT)

# sphinx html build
build-sphinx:
	@$(SPHINXBUILD) -M html "$(SPHINX_SOURCE_DIR)" "$(SPHINX_BUILD_DIR)"

# sphinx出力ディレクトリをお掃除
clean-sphinx:
	@if [ ! -d "$(SPHINX_BUILD_DIR)" ]; then { mkdir -p "$(SPHINX_BUILD_DIR)"; } fi
	@echo "Clean sphinx build directory... ($(SPHINX_BUILD_DIR))"
	@find $(SPHINX_BUILD_DIR) -mindepth 1 -delete

# 出力ディレクトリのお掃除
clean: clean-js clean-sphinx

# パッケージングスクリプトを実行
pack:
	@$(SHELL) ./tools/make_package.sh

# ビルド・パッケージングの一括処理
all: clean js pack
