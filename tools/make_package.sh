#!/usr/bin/env bash
# =============================================================================
# パッケージング用スクリプト
# =============================================================================
# 配布用zipパッケージおよび検算用のハッシュファイルを作成する。
# 予めビルドを行ってから実行する。
# 
# TARGETS, TARGET_KEYS にパッケージング対象を定義する事。
# =============================================================================
set -euo pipefail

# プロジェクトルートディレクトリのパス
declare -r WORK_DIR="$(cd $(dirname ${0}); cd ../; pwd)"

# package.jsonのパス
declare -r PACKAGE_JSON_PATH="${WORK_DIR%/}/package.json"

# プラグインファイル名をpackage.jsonから取得
# 拡張子(.js)は除外しておく
declare -r PLUGIN_FILENAME="$(cat ${PACKAGE_JSON_PATH} | jq -r '.config.PLUGIN_FILENAME' | xargs -i basename {} '.js')"

# プラグインバージョンをpackage.jsonから取得
declare -r PLUGIN_VERSION="v$(cat ${PACKAGE_JSON_PATH} | jq -r '.version')"

# 出力zipファイル名
declare ZIP_FILENAME="${PLUGIN_FILENAME}_${PLUGIN_VERSION}.zip"

# 出力sha256ファイル名
declare SHA256_TXT_FILENAME="${ZIP_FILENAME}.sha256sum.txt"

# ビルド結果出力ディレクトリのパス
declare -r BUILD_DIR="${WORK_DIR%/}/build"

# docsディレクトリのパス
declare -r DOCS_DIR="${WORK_DIR%/}/docs"

# 出力先ディレクトリのパス
declare -r DIST_DIR="${WORK_DIR%/}/dist"

# 同梱物のパス定義
# 以下のルールで定義する
#  識別子:src   : 同梱対象物のファイルパス
#  識別子:dest  : 同梱対象物の配置パス(配布ディレクトリルートからの相対パス)
declare -rA TARGETS=(
    # プラグインファイル
    ["plugin:src"]="${BUILD_DIR%/}/UTA_PluginTemplateMVZ.js"
    ["plugin:dest"]="plugin/UTA_PluginTemplateMVZ.js"
    # 日本語READMEファイル
    ["readme_ja:src"]="${DOCS_DIR%}/README.txt"
    ["readme_ja:dest"]="README.txt"
    # 英語READMEファイル
    # ["readme_en:src"]="${DOCS_DIR%}/README_EN.txt"
    # ["readme_en:dest"]="README_EN.txt"
    # ライセンスファイル
    ["license:src"]="${WORK_DIR%/}/LICENSE"
    ["license:dest"]="LICENSE"
)

# 処理ターゲットの識別子定義
declare -ra TARGET_KEYS=(
    "plugin"
    "readme_ja"
    # "readme_en"
)

# 一時ディレクトリの掃除
function cleanup() {
    # ディレクトリが存在しない場合は何もしない
    if [ ! -d "${TEMP_DIR}" ]; then
        return
    fi

    rm -rf "${TEMP_DIR}"
    echo "Cleaned temporary files.(${TEMP_DIR})"
}

# 一時ディレクトリを作成
declare -r TEMP_DIR="$(mktemp -d)"

# スクリプト終了時に一時ディレクトリをクリーンアップ
trap 'cleanup' EXIT

# 定義した対象を一時ディレクトリにコピー
for target in "${TARGET_KEYS[@]}"; do
    declare src_path="${TARGETS[${target}:src]}"
    declare dest_path="${TEMP_DIR%/}/${TARGETS[${target}:dest]}"
    declare dest_dir="$(dirname ${dest_path})"

    # 対象ファイルが存在しない場合はエラーとして中断
    if [ ! -e "${src_path}" ]; then
        echo "[error] Source target '${src_path}' is not found." 2>&1
        exit 1
    fi

    # ディレクトリが存在しない場合は作成
    if [ ! -d "${dest_dir}" ]; then
        echo "Create directory: ${dest_dir}"
        mkdir -p "${dest_dir}"
    fi

    # ファイルをコピー/ディレクトリの場合は再帰コピー
    echo "Copy file: ${src_path} -> ${dest_path}"
    cp -rf ${src_path} ${dest_path}
done

# distディレクトリが存在しない場合は作成
if [ ! -d "${DIST_DIR}" ]; then
    mkdir -p "${DIST_DIR}"
fi

declare -r DIST_FILE_PATH="${DIST_DIR%/}/${ZIP_FILENAME}"

# 一時ディレクトリの内容をzipに固め、distディレクトリに出力
pushd "${TEMP_DIR}" > /dev/null
echo "Create package file... (${DIST_FILE_PATH})"
zip -r "${DIST_FILE_PATH}" ./
echo "Succeeded to create package file. (${DIST_FILE_PATH})"
echo ""

# 作成したzip中身を確認
unzip -Z "${DIST_FILE_PATH}"
echo ""
popd > /dev/null

# 作成したzipのハッシュファイルを作成
pushd "${DIST_DIR}" > /dev/null
echo "Create sha256 hash file... (${SHA256_TXT_FILENAME})"
sha256sum "${ZIP_FILENAME}" > "${SHA256_TXT_FILENAME}"
echo "Succeeded to create hash file. (${SHA256_TXT_FILENAME})"
popd > /dev/null
