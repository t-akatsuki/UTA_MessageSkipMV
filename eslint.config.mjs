// =============================================================================
// ESLint設定ファイル
// =============================================================================
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

import pluginStylistic from "@stylistic/eslint-plugin";

import pkg from "./package.json" with { type: "json" };

/**
 * 対象とするRPGツクールのエディション。
 * package.jsonの定義値。
 * @type {"MV" | "MZ"}
 */
const RPGMAKER_EDITION = pkg.config.RPGMAKER_EDITION.toUpperCase()

/**
 * RPGツクールMV用globals定義。
 * RPGMakerMV v1.6.3 core script global objects
 * @type {Object<string, string>}
 */
const GLOBAL_CONF_MV = Object.freeze({
  /**
   * plugins.js
   */
  "$plugins": false,
  /**
   * rpg_core.js
   */
  "JsExtensions": true,
  "Utils": true,
  "CacheEntry": true,
  "CacheMap": true,
  "ImageCache": true,
  "RequestQueue": true,
  "Point": true,
  "Rectangle": true,
  "Bitmap": true,
  "Graphics": true,
  "Input": true,
  "TouchInput": true,
  "Sprite": true,
  "Tilemap": true,
  "ShaderTilemap": true,
  "TilingSprite": true,
  "ScreenSprite": true,
  "Window": true,
  "WindowLayer": true,
  "Weather": true,
  "ToneFilter": true,
  "ToneSprite": true,
  "Stage": true,
  "WebAudio": true,
  "Html5Audio": true,
  "JsonEx": true,
  "Decrypter": true,
  "ResourceHandler": true,
  /**
   * rpg_manager.js
   */
  "DataManager": true,
  "$dataActors": false,
  "$dataClasses": false,
  "$dataSkills": false,
  "$dataItems": false,
  "$dataWeapons": false,
  "$dataArmors": false,
  "$dataEnemies": false,
  "$dataTroops": false,
  "$dataStates": false,
  "$dataAnimations": false,
  "$dataTilesets": false,
  "$dataCommonEvents": false,
  "$dataSystem": false,
  "$dataMapInfos": false,
  "$dataMap": false,
  "$gameTemp": true,
  "$gameSystem": true,
  "$gameScreen": true,
  "$gameTimer": true,
  "$gameMessage": true,
  "$gameSwitches": true,
  "$gameVariables": true,
  "$gameSelfSwitches": true,
  "$gameActors": true,
  "$gameParty": true,
  "$gameTroop": true,
  "$gameMap": true,
  "$gamePlayer": true,
  "$testEvent": true,
  "ConfigManager": true,
  "StorageManager": true,
  "ImageManager": true,
  "AudioManager": true,
  "SoundManager": true,
  "TextManager": true,
  "SceneManager": true,
  "BattleManager": true,
  "PluginManager": true,
  /**
   * rpg_objects.js
   */
  "Game_Temp": true,
  "Game_System": true,
  "Game_Timer": true,
  "Game_Message": true,
  "Game_Switches": true,
  "Game_Variables": true,
  "Game_SelfSwitches": true,
  "Game_Screen": true,
  "Game_Picture": true,
  "Game_Item": true,
  "Game_Action": true,
  "Game_ActionResult": true,
  "Game_BattlerBase": true,
  "Game_Battler": true,
  "Game_Actor": true,
  "Game_Enemy": true,
  "Game_Actors": true,
  "Game_Unit": true,
  "Game_Party": true,
  "Game_Troop": true,
  "Game_Map": true,
  "Game_CommonEvent": true,
  "Game_CharacterBase": true,
  "Game_Character": true,
  "Game_Player": true,
  "Game_Follower": true,
  "Game_Followers": true,
  "Game_Vehicle": true,
  "Game_Event": true,
  "Game_Interpreter": true,
  /**
   * rpg_scenes.js
   */
  "Scene_Base": true,
  "Scene_Boot": true,
  "Scene_Title": true,
  "Scene_Map": true,
  "Scene_MenuBase": true,
  "Scene_Menu": true,
  "Scene_ItemBase": true,
  "Scene_Item": true,
  "Scene_Skill": true,
  "Scene_Equip": true,
  "Scene_Status": true,
  "Scene_Options": true,
  "Scene_File": true,
  "Scene_Save": true,
  "Scene_Load": true,
  "Scene_GameEnd": true,
  "Scene_Shop": true,
  "Scene_Name": true,
  "Scene_Debug": true,
  "Scene_Battle": true,
  "Scene_Gameover": true,
  /**
   * rpg_sprites.js
   */
  "Sprite_Base": true,
  "Sprite_Button": true,
  "Sprite_Character": true,
  "Sprite_Battler": true,
  "Sprite_Actor": true,
  "Sprite_Enemy": true,
  "Sprite_Animation": true,
  "Sprite_Damage": true,
  "Sprite_StateIcon": true,
  "Sprite_StateOverlay": true,
  "Sprite_Weapon": true,
  "Sprite_Balloon": true,
  "Sprite_Picture": true,
  "Sprite_Timer": true,
  "Sprite_Destination": true,
  "Spriteset_Base": true,
  "Spriteset_Map": true,
  "Spriteset_Battle": true,
  /**
   * rpg_windows.js
   */
  "Window_Base": true,
  "Window_Selectable": true,
  "Window_Command": true,
  "Window_Gold": true,
  "Window_MenuCommand": true,
  "Window_MenuStatus": true,
  "Window_MenuActor": true,
  "Window_ItemCategory": true,
  "Window_ItemList": true,
  "Window_SkillType": true,
  "Window_SkillStatus": true,
  "Window_SkillList": true,
  "Window_EquipStatus": true,
  "Window_EquipCommand": true,
  "Window_EquipSlot": true,
  "Window_EquipItem": true,
  "Window_Status": true,
  "Window_Options": true,
  "Window_SavefileList": true,
  "Window_ShopCommand": true,
  "Window_ShopBuy": true,
  "Window_ShopSell": true,
  "Window_ShopNumber": true,
  "Window_ShopStatus": true,
  "Window_NameEdit": true,
  "Window_NameInput": true,
  "Window_ChoiceList": true,
  "Window_NumberInput": true,
  "Window_EventItem": true,
  "Window_Message": true,
  "Window_ScrollText": true,
  "Window_MapName": true,
  "Window_BattleLog": true,
  "Window_PartyCommand": true,
  "Window_ActorCommand": true,
  "Window_BattleStatus": true,
  "Window_BattleActor": true,
  "Window_BattleEnemy": true,
  "Window_BattleSkill": true,
  "Window_BattleItem": true,
  "Window_TitleCommand": true,
  "Window_GameEnd": true,
  "Window_DebugRange": true,
  "Window_DebugEdit": true,
  /**
   * libs/lz-string.js
   */
  "LZString": true,
});

/**
 * RPGツクールMZ用globals定義。
 * RPGMakerMZ v1.9.0 core script global objects
 * @type {Object<string, string>}
 */
const GLOBAL_CONF_MZ = Object.freeze({
  // main.js
  "scriptUrls": "readonly",
  "effekseerWasmUrl": "readonly",
  "Main": "readonly",
  "main": "readonly",
  // plugin.js
  "$plugins": "readonly",
  // rmmz_core.js
  "Utils": "readonly",
  "Graphics": "readonly",
  "Point": "readonly",
  "Rectangle": "readonly",
  "Bitmap": "readonly",
  "Sprite": "readonly",
  "Tilemap": "readonly",
  "TilingSprite": "readonly",
  "ScreenSprite": "readonly",
  "Window": "readonly",
  "WindowLayer": "readonly",
  "Weather": "readonly",
  "ColorFilter": "readonly",
  "Stage": "readonly",
  "WebAudio": "readonly",
  "Video": "readonly",
  "Input": "readonly",
  "TouchInput": "readonly",
  "JsonEx": "readonly",
  // rmmz_managers.js
  "DataManager": "readonly",
  "$dataActors": "readonly",
  "$dataClasses": "readonly",
  "$dataSkills": "readonly",
  "$dataItems": "readonly",
  "$dataWeapons": "readonly",
  "$dataArmors": "readonly",
  "$dataEnemies": "readonly",
  "$dataTroops": "readonly",
  "$dataStates": "readonly",
  "$dataAnimations": "readonly",
  "$dataTilesets": "readonly",
  "$dataCommonEvents": "readonly",
  "$dataSystem": "readonly",
  "$dataMapInfos": "readonly",
  "$dataMap": "readonly",
  "$gameTemp": "readonly",
  "$gameSystem": "readonly",
  "$gameScreen": "readonly",
  "$gameTimer": "readonly",
  "$gameMessage": "readonly",
  "$gameSwitches": "readonly",
  "$gameVariables": "readonly",
  "$gameSelfSwitches": "readonly",
  "$gameActors": "readonly",
  "$gameParty": "readonly",
  "$gameTroop": "readonly",
  "$gameMap": "readonly",
  "$gamePlayer": "readonly",
  "$testEvent": "readonly",
  "ConfigManager": "readonly",
  "StorageManager": "readonly",
  "FontManager": "readonly",
  "ImageManager": "readonly",
  "EffectManager": "readonly",
  "AudioManager": "readonly",
  "SoundManager": "readonly",
  "TextManager": "readonly",
  "ColorManager": "readonly",
  "SceneManager": "readonly",
  "BattleManager": "readonly",
  "PluginManager": "readonly",
  // rmmz_objects.js
  "Game_Temp": "readonly",
  "Game_System": "readonly",
  "Game_Message": "readonly",
  "Game_Switches": "readonly",
  "Game_Variables": "readonly",
  "Game_SelfSwitches": "readonly",
  "Game_Screen": "readonly",
  "Game_Picture": "readonly",
  "Game_Item": "readonly",
  "Game_Action": "readonly",
  "Game_ActionResult": "readonly",
  "Game_BattlerBase": "readonly",
  "Game_Battler": "readonly",
  "Game_Actor": "readonly",
  "Game_Enemy": "readonly",
  "Game_Unit": "readonly",
  "Game_Party": "readonly",
  "Game_Troop": "readonly",
  "Game_Map": "readonly",
  "Game_CommonEvent": "readonly",
  "Game_CharacterBase": "readonly",
  "Game_Character": "readonly",
  "Game_Player": "readonly",
  "Game_Follower": "readonly",
  "Game_Followers": "readonly",
  "Game_Vehicle": "readonly",
  "Game_Event": "readonly",
  "Game_Interpreter": "readonly",
  // rmmz_scenes.js
  "Scene_Base": "readonly",
  "Scene_Boot": "readonly",
  "Scene_Splash": "readonly",
  "Scene_Title": "readonly",
  "Scene_Message": "readonly",
  "Scene_Map": "readonly",
  "Scene_MenuBase": "readonly",
  "Scene_Menu": "readonly",
  "Scene_ItemBase": "readonly",
  "Scene_Item": "readonly",
  "Scene_Skill": "readonly",
  "Scene_Equip": "readonly",
  "Scene_Status": "readonly",
  "Scene_Options": "readonly",
  "Scene_File": "readonly",
  "Scene_Save": "readonly",
  "Scene_Load": "readonly",
  "Scene_GameEnd": "readonly",
  "Scene_Shop": "readonly",
  "Scene_Name": "readonly",
  "Scene_Debug": "readonly",
  "Scene_Battle": "readonly",
  "Scene_Gameover": "readonly",
  // rmmz_sprites.js
  "Sprite_Clickable": "readonly",
  "Sprite_Button": "readonly",
  "Sprite_Character": "readonly",
  "Sprite_Battler": "readonly",
  "Sprite_Actor": "readonly",
  "Sprite_Enemy": "readonly",
  "Sprite_Animation": "readonly",
  "Sprite_AnimationMV": "readonly",
  "Sprite_Battleback": "readonly",
  "Sprite_Damage": "readonly",
  "Sprite_Gauge": "readonly",
  "Sprite_Name": "readonly",
  "Sprite_StateIcon": "readonly",
  "Sprite_StateOverlay": "readonly",
  "Sprite_Weapon": "readonly",
  "Sprite_Balloon": "readonly",
  "Sprite_Picture": "readonly",
  "Sprite_Timer": "readonly",
  "Sprite_Destination": "readonly",
  "Spriteset_Base": "readonly",
  "Spriteset_Map": "readonly",
  "Spriteset_Battle": "readonly",
  // rmmz_windows.js
  "Window_Base": "readonly",
  "Window_Scrollable": "readonly",
  "Window_Selectable": "readonly",
  "Window_Command": "readonly",
  "Window_HorzCommand": "readonly",
  "Window_Help": "readonly",
  "Window_Gold": "readonly",
  "Window_StatusBase": "readonly",
  "Window_MenuCommand": "readonly",
  "Window_MenuStatus": "readonly",
  "Window_MenuActor": "readonly",
  "Window_ItemCategory": "readonly",
  "Window_ItemList": "readonly",
  "Window_SkillType": "readonly",
  "Window_SkillStatus": "readonly",
  "Window_SkillList": "readonly",
  "Window_EquipStatus": "readonly",
  "Window_EquipCommand": "readonly",
  "Window_EquipSlot": "readonly",
  "Window_EquipItem": "readonly",
  "Window_Status": "readonly",
  "Window_StatusParams": "readonly",
  "Window_StatusEquip": "readonly",
  "Window_Options": "readonly",
  "Window_SavefileList": "readonly",
  "Window_ShopCommand": "readonly",
  "Window_ShopBuy": "readonly",
  "Window_ShopSell": "readonly",
  "Window_ShopNumber": "readonly",
  "Window_ShopStatus": "readonly",
  "Window_NameEdit": "readonly",
  "Window_NameInput": "readonly",
  "Window_NameBox": "readonly",
  "Window_ChoiceList": "readonly",
  "Window_NumberInput": "readonly",
  "Window_EventItem": "readonly",
  "Window_Message": "readonly",
  "Window_ScrollText": "readonly",
  "Window_MapName": "readonly",
  "Window_BattleLog": "readonly",
  "Window_PartyCommand": "readonly",
  "Window_ActorCommand": "readonly",
  "Window_BattleStatus": "readonly",
  "Window_BattleActor": "readonly",
  "Window_BattleEnemy": "readonly",
  "Window_BattleSkill": "readonly",
  "Window_BattleItem": "readonly",
  "Window_TitleCommand": "readonly",
  "Window_GameEnd": "readonly",
  "Window_DebugRange": "readonly",
  "Window_DebugEdit": "readonly",
  /**
   * RPGMAker MZ libs global objects
   */
  // effekseer.min.js
  "effekseer_native": "readonly",
  // pixi.js
  "PIXI": "readonly",
  // vorbisdecoder.js
  "VorbisDecoderModule": "readonly",
});

/**
 * 対象エディションに合わせたglobals設定値を得る。
 * @param {"MV" | "MZ"} edition 対象のRPGツクールエディション。
 * @return {Object<string, string>} globals設定値となる連想配列。
 */
function getRPGMakerGlobals(edition) {
  let ret;
  switch (edition) {
    case "MV":
      ret = Object.assign({}, GLOBAL_CONF_MV);
      break;
    case "MZ":
      ret = Object.assign({}, GLOBAL_CONF_MZ);
      break;
    default:
      throw new Error();
  }

  return ret;
}

export default defineConfig([
  {
    "files": [
      "src/**/*.js",
    ],
    "languageOptions": {
      // トランスパイル前コードはESModule形式で記載
      "sourceType": "module",
      // トランスパイル前コードはエディションによって書ける範囲が異なる
      // RPGツクールMV: ES2015相当で記述
      // RPGツクールMZ: ES2022相当で記述
      "ecmaVersion": RPGMAKER_EDITION === "MZ" ? 2022: 2015,
      // グローバル変数定義
      "globals": {
        ...globals.es2022,
        ...globals.browser,
        ...globals.node,

        // 対象エディションに応じたglobal定義
        ...getRPGMakerGlobals(RPGMAKER_EDITION),

        // 開発プラグインの名前空間
        "utakata": "writable",
      },
    },
    "plugins": {
      "@stylistic": pluginStylistic,
    },
    "extends": [
      // 推奨ルールをベースとする
      js.configs.recommended,
    ],
    "rules": {
      /**
       * ESLint rules
       * https://eslint.org/docs/latest/rules/
       */
      // 厳格な等価演算子を利用させる
      "eqeqeq": [
        "error",
        "always",
        {
          "null": "ignore",
        }
      ],
      // console関連関数を制限しない
      "no-console": "off",
      // switch-case文におけるdefaultケースを必須にする
      "default-case": "error",
      // eval()の使用を許可しない
      "no-eval": "error",
      // switch-case文におけるfallthroughを許可しない
      "no-fallthrough": "error",
      // 特殊booleanキャストを許容する
      "no-extra-boolean-cast": "off",
      // 演算子による型強制を禁止する
      "no-implicit-coercion": "error",
      // eval()のようなメソッドの使用を許可しない
      "no-implied-eval": "error",
      // 利用していない変数を許可しない
      // RPGツクールMV/MZではオーバーライドを多用するので _ から始まるものは許容
      // 特殊置換される __VERSION__ などの値についても許容
      // /* exported 変数名 */ で例外とする事ができる
      "no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
        },
      ],
      // 例外オブジェクトのcause指定はES2022からなので強要しない
      "preserve-caught-error": "off",

      /**
       * ESLint Stylistic rules
       * https://eslint.style/packages/ts#rules
       */
      // アロー関数かっこの前後スペースを入れる
      "@stylistic/arrow-spacing": [
        "error",
        {
          "before": true,
          "after": true,
        },
      ],
      // カンマ前後のスペース規制
      "@stylistic/comma-spacing": [
        "error",
        {
          "before": false,
          "after": true,
        },
      ],
      // 改行コードはCRLFに統一させる
      // コアスクリプト側の仕様に合わせる
      "@stylistic/linebreak-style": [
        "error",
        "windows",
      ],
      // 小数における省略記法を認めない
      "@stylistic/no-floating-decimal": "error",
      // インデントのスペース数制約
      "@stylistic/indent": [
        "error",
        4,
        {
          "SwitchCase": 1,
        },
      ],
      // ifなどのキーワードの前後にスペースを入れる
      "@stylistic/keyword-spacing": [
        "error",
        {
          "before": true,
          "after": true,
        },
      ],
      // object key前後のスペース制御
      "@stylistic/key-spacing": [
        "error",
        {
          "beforeColon": false,
          "afterColon": true,
          "mode": "minimum",
        },
      ],
      // 冗長なセミコロンを禁止
      "@stylistic/no-extra-semi": "error",
      // クォートをダブルクォートに統一
      "@stylistic/quotes": [
        "error",
        "double",
        {
          "avoidEscape": true,
          // テンプレートリテラルはES5では利用できないので注意
          "allowTemplateLiterals": "always",
        },
      ],
      // objectのプロパティ名のクォートは付与する
      "@stylistic/quote-props": [
        "error",
        "always",
      ],
      // 文末のセミコロンを強制する
      "@stylistic/semi": "error",
      // functionなどのブロックの{}の前にスペースを入れる
      "@stylistic/space-before-blocks": "error",
      // 関数定義の引数括弧の前にスペースを強要しない
      "@stylistic/space-before-function-paren": "off",
      // 演算子の前後にスペースを入れる
      "@stylistic/space-infix-ops": "error",
    },
  },
  {
    // Lint除外対象の定義
    "ignores": [
      "node_modules/**",
      "project/**",
      "build/**",
      "dist/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
]);
