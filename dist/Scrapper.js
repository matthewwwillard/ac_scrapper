"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request-promise-native");
var cheerio = require("cheerio");
var fse = require("fs-extra");
var Scrapper = /** @class */ (function () {
    function Scrapper() {
        this.urls = {
            // # Urls for New Horizons
            // # Collectables
            "fish": "https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)",
            "bugs": "https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)",
            "fossils": "https://animalcrossing.fandom.com/wiki/Fossils_(New_Horizons)",
            // # DIY Recipes
            "tools": "https://animalcrossing.fandom.com/wiki/DIY_recipes/Tools",
            "housewares": "https://animalcrossing.fandom.com/wiki/DIY_recipes/Housewares",
            "wall-mounted": "https://animalcrossing.fandom.com/wiki/DIY_recipes/Wall-mounted",
            "wallpaper-rugs-flooring": "https://animalcrossing.fandom.com/wiki/DIY_recipes/Wallpaper,_rugs_and_flooring",
            "equipment": "https://animalcrossing.fandom.com/wiki/DIY_recipes/Equipment",
            "other": "https://animalcrossing.fandom.com/wiki/DIY_recipes/Other",
            // Villagers
            "villagers": "https://animalcrossing.fandom.com/wiki/Villager_list_(New_Horizons)"
            // # Urls for New Leaf
            // # "fish": "https://animalcrossing.fandom.com/wiki/Fish_(New_Leaf)",
            // # "bugs": "https://animalcrossing.fandom.com/wiki/Bugs_(New_Leaf)"
        };
    }
    Scrapper.prototype.CollectVillagers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var htmlData, $_1, finalDataArray_1, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log('***** Collecting Villagers *****');
                        return [4 /*yield*/, request(this.urls.villagers)];
                    case 1:
                        htmlData = _a.sent();
                        $_1 = cheerio.load(htmlData);
                        finalDataArray_1 = [];
                        $_1('table.sortable').each(function (i, elem) {
                            $_1(elem).find('tr').each(function (i, elem) {
                                //Skip the first header info
                                if (i == 0)
                                    return;
                                var children = $_1(elem).children();
                                finalDataArray_1.push({
                                    name: _this.elementValue($_1, children[0]),
                                    img: $_1(children[1]).find('a').attr('href'),
                                    personality: _this.elementValue($_1, children[2]).replace(/♀|♂/, '').trim(),
                                    species: _this.elementValue($_1, children[3]),
                                    birthday: _this.elementValue($_1, children[4]),
                                    catchphrase: _this.elementValue($_1, children[5]).replace(/"/g, ''),
                                    sex: _this.collectSex(_this.elementValue($_1, children[2]))
                                });
                            });
                        });
                        return [4 /*yield*/, this.generateJSONFile('villagers', finalDataArray_1)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1.message);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype.CollectFish = function () {
        return __awaiter(this, void 0, void 0, function () {
            var htmlData, $_2, finalDataArray_2, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log('***** Collecting Fish *****');
                        return [4 /*yield*/, request(this.urls.fish)];
                    case 1:
                        htmlData = _a.sent();
                        $_2 = cheerio.load(htmlData);
                        finalDataArray_2 = [];
                        $_2('table.sortable').each(function (i, elem) {
                            var isNorth = $_2(elem).parents('div').attr('title').indexOf('North') >= 0;
                            $_2(elem).find('tr').each(function (i, elem) {
                                //Skip the first header info
                                if (i == 0)
                                    return;
                                var children = $_2(elem).children();
                                finalDataArray_2.push({
                                    name: _this.elementValue($_2, children[0]),
                                    img: $_2(children[1]).find('a').attr('href'),
                                    bellValue: Number(_this.elementValue($_2, children[2])),
                                    location: _this.elementValue($_2, children[3]),
                                    shadowSize: _this.elementValue($_2, children[4]),
                                    time: _this.elementValue($_2, children[5]),
                                    jan: _this.isDataCheckedOff(_this.elementValue($_2, children[6])),
                                    feb: _this.isDataCheckedOff(_this.elementValue($_2, children[7])),
                                    mar: _this.isDataCheckedOff(_this.elementValue($_2, children[8])),
                                    apr: _this.isDataCheckedOff(_this.elementValue($_2, children[9])),
                                    may: _this.isDataCheckedOff(_this.elementValue($_2, children[10])),
                                    jun: _this.isDataCheckedOff(_this.elementValue($_2, children[11])),
                                    jul: _this.isDataCheckedOff(_this.elementValue($_2, children[12])),
                                    aug: _this.isDataCheckedOff(_this.elementValue($_2, children[13])),
                                    sep: _this.isDataCheckedOff(_this.elementValue($_2, children[14])),
                                    oct: _this.isDataCheckedOff(_this.elementValue($_2, children[15])),
                                    nov: _this.isDataCheckedOff(_this.elementValue($_2, children[16])),
                                    dec: _this.isDataCheckedOff(_this.elementValue($_2, children[17])),
                                    isNorth: isNorth
                                });
                            });
                        });
                        return [4 /*yield*/, this.generateJSONFile('fish', finalDataArray_2)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        e_2 = _a.sent();
                        console.log(e_2.message);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype.CollectBug = function () {
        return __awaiter(this, void 0, void 0, function () {
            var htmlData, $_3, finalDataArray_3, e_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log('***** Collecting Bugs *****');
                        return [4 /*yield*/, request(this.urls.bugs)];
                    case 1:
                        htmlData = _a.sent();
                        $_3 = cheerio.load(htmlData);
                        finalDataArray_3 = [];
                        $_3('table.sortable').each(function (i, elem) {
                            var isNorth = $_3(elem).parents('div').attr('title').indexOf('North') >= 0;
                            $_3(elem).find('tr').each(function (i, elem) {
                                //Skip the first header info
                                if (i == 0)
                                    return;
                                var children = $_3(elem).children();
                                finalDataArray_3.push({
                                    name: _this.elementValue($_3, children[0]),
                                    img: $_3(children[1]).find('a').attr('href'),
                                    bellValue: Number(_this.elementValue($_3, children[2])),
                                    location: _this.elementValue($_3, children[3]),
                                    time: _this.elementValue($_3, children[4]),
                                    jan: _this.isDataCheckedOff(_this.elementValue($_3, children[5])),
                                    feb: _this.isDataCheckedOff(_this.elementValue($_3, children[6])),
                                    mar: _this.isDataCheckedOff(_this.elementValue($_3, children[7])),
                                    apr: _this.isDataCheckedOff(_this.elementValue($_3, children[8])),
                                    may: _this.isDataCheckedOff(_this.elementValue($_3, children[9])),
                                    jun: _this.isDataCheckedOff(_this.elementValue($_3, children[10])),
                                    jul: _this.isDataCheckedOff(_this.elementValue($_3, children[11])),
                                    aug: _this.isDataCheckedOff(_this.elementValue($_3, children[12])),
                                    sep: _this.isDataCheckedOff(_this.elementValue($_3, children[13])),
                                    oct: _this.isDataCheckedOff(_this.elementValue($_3, children[14])),
                                    nov: _this.isDataCheckedOff(_this.elementValue($_3, children[15])),
                                    dec: _this.isDataCheckedOff(_this.elementValue($_3, children[16])),
                                    isNorth: isNorth
                                });
                            });
                        });
                        return [4 /*yield*/, this.generateJSONFile('bugs', finalDataArray_3)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        e_3 = _a.sent();
                        console.log(e_3.message);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype.CollectFossils = function () {
        return __awaiter(this, void 0, void 0, function () {
            var htmlData, $_4, finalDataArray_4, e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log('***** Collecting Fossils *****');
                        return [4 /*yield*/, request(this.urls.fossils)];
                    case 1:
                        htmlData = _a.sent();
                        $_4 = cheerio.load(htmlData);
                        finalDataArray_4 = [];
                        $_4('table.sortable').each(function (i, elem) {
                            $_4(elem).find('tr').each(function (i, elem) {
                                //Skip the first header info
                                if (i == 0)
                                    return;
                                var children = $_4(elem).children();
                                if (children < 3)
                                    return;
                                finalDataArray_4.push({
                                    name: _this.elementValue($_4, children[0]),
                                    img: $_4(children[1]).find('a').attr('href'),
                                    bellValue: Number(_this.elementValue($_4, children[2]).replace('Bells', "").replace(',', '')),
                                });
                            });
                        });
                        return [4 /*yield*/, this.generateJSONFile('fossils', finalDataArray_4)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        e_4 = _a.sent();
                        console.log(e_4.message);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype.CollectDIYs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var finalDataArray, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, e_5;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        _o.trys.push([0, 8, , 9]);
                        console.log('***** Collecting DIYs *****');
                        finalDataArray = [];
                        _b = (_a = finalDataArray).concat;
                        return [4 /*yield*/, this._toolsDiy()];
                    case 1:
                        finalDataArray = _b.apply(_a, [_o.sent()]);
                        _d = (_c = finalDataArray).concat;
                        return [4 /*yield*/, this._housewareDiy()];
                    case 2:
                        finalDataArray = _d.apply(_c, [_o.sent()]);
                        _f = (_e = finalDataArray).concat;
                        return [4 /*yield*/, this._wallmountedDiy()];
                    case 3:
                        finalDataArray = _f.apply(_e, [_o.sent()]);
                        _h = (_g = finalDataArray).concat;
                        return [4 /*yield*/, this._wallpaperDiy()];
                    case 4:
                        finalDataArray = _h.apply(_g, [_o.sent()]);
                        _k = (_j = finalDataArray).concat;
                        return [4 /*yield*/, this._equipmentDiy()];
                    case 5:
                        finalDataArray = _k.apply(_j, [_o.sent()]);
                        _m = (_l = finalDataArray).concat;
                        return [4 /*yield*/, this._otherDiy()];
                    case 6:
                        finalDataArray = _m.apply(_l, [_o.sent()]);
                        return [4 /*yield*/, this.generateJSONFile('DIYs', finalDataArray)];
                    case 7:
                        _o.sent();
                        return [2 /*return*/, true];
                    case 8:
                        e_5 = _o.sent();
                        console.log(e_5.message);
                        return [2 /*return*/, false];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Tool Collectors
     */
    Scrapper.prototype._toolsDiy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var htmlData, $_5, finalDataArray_5, e_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('***** Collecting Tool DIYs *****');
                        return [4 /*yield*/, request(this.urls.tools)];
                    case 1:
                        htmlData = _a.sent();
                        $_5 = cheerio.load(htmlData);
                        finalDataArray_5 = [];
                        $_5('table.sortable').each(function (i, elem) {
                            $_5(elem).find('tr').each(function (i, elem) {
                                //Skip the first header info
                                if (i == 0)
                                    return;
                                var children = $_5(elem).children();
                                var materialString = $_5(children[2]).html().trim();
                                materialString = materialString.replace(/<[/a|noscript][^>]*>|<[/img][^>]*>/g, '');
                                finalDataArray_5.push({
                                    name: _this.elementValue($_5, children[0]),
                                    img: $_5(children[1]).find('a').attr('href'),
                                    bellValue: Number(_this.elementValue($_5, children[5]).replace(/<[^>]*>/g, '')),
                                    obtain: _this.elementValue($_5, [children[4]]),
                                    materials: materialString.split(/<br>/g)
                                });
                            });
                        });
                        return [2 /*return*/, finalDataArray_5];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype._housewareDiy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var htmlData, $_6, finalDataArray_6, e_7;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('***** Collecting HouseWare DIYs *****');
                        return [4 /*yield*/, request(this.urls.housewares)];
                    case 1:
                        htmlData = _a.sent();
                        $_6 = cheerio.load(htmlData);
                        finalDataArray_6 = [];
                        $_6('table.sortable').each(function (i, elem) {
                            $_6(elem).find('tr').each(function (i, elem) {
                                //Skip the first header info
                                if (i == 0)
                                    return;
                                var children = $_6(elem).children();
                                var materialString = $_6(children[2]).html().trim();
                                materialString = materialString.replace(/<[/a|noscript][^>]*>|<[/img][^>]*>/g, '');
                                finalDataArray_6.push({
                                    name: _this.elementValue($_6, children[0]),
                                    img: $_6(children[1]).find('a').attr('href'),
                                    bellValue: Number(_this.elementValue($_6, children[5]).replace(/<[^>]*>/g, '')),
                                    obtain: _this.elementValue($_6, [children[4]]),
                                    materials: materialString.split(/<br>/g)
                                });
                            });
                        });
                        return [2 /*return*/, finalDataArray_6];
                    case 2:
                        e_7 = _a.sent();
                        console.log(e_7);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype._wallmountedDiy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var htmlData, $_7, finalDataArray_7, e_8;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('***** Collecting Wall Mounted DIYs *****');
                        return [4 /*yield*/, request(this.urls["wall-mounted"])];
                    case 1:
                        htmlData = _a.sent();
                        $_7 = cheerio.load(htmlData);
                        finalDataArray_7 = [];
                        $_7('table.sortable').each(function (i, elem) {
                            $_7(elem).find('tr').each(function (i, elem) {
                                //Skip the first header info
                                if (i == 0)
                                    return;
                                var children = $_7(elem).children();
                                var materialString = $_7(children[2]).html().trim();
                                materialString = materialString.replace(/<[/a|noscript][^>]*>|<[/img][^>]*>/g, '');
                                finalDataArray_7.push({
                                    name: _this.elementValue($_7, children[0]),
                                    img: $_7(children[1]).find('a').attr('href'),
                                    bellValue: Number(_this.elementValue($_7, children[5]).replace(/<[^>]*>/g, '')),
                                    obtain: _this.elementValue($_7, [children[4]]),
                                    materials: materialString.split(/<br>/g)
                                });
                            });
                        });
                        return [2 /*return*/, finalDataArray_7];
                    case 2:
                        e_8 = _a.sent();
                        console.log(e_8);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype._wallpaperDiy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var htmlData, $_8, finalDataArray_8, e_9;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('***** Collecting Wall Paper DIYs *****');
                        return [4 /*yield*/, request(this.urls["wallpaper-rugs-flooring"])];
                    case 1:
                        htmlData = _a.sent();
                        $_8 = cheerio.load(htmlData);
                        finalDataArray_8 = [];
                        $_8('table.sortable').each(function (i, elem) {
                            $_8(elem).find('tr').each(function (i, elem) {
                                //Skip the first header info
                                if (i == 0)
                                    return;
                                var children = $_8(elem).children();
                                var materialString = $_8(children[2]).html().trim();
                                materialString = materialString.replace(/<[/a|noscript][^>]*>|<[/img][^>]*>/g, '');
                                finalDataArray_8.push({
                                    name: _this.elementValue($_8, children[0]),
                                    img: $_8(children[1]).find('a').attr('href'),
                                    bellValue: Number(_this.elementValue($_8, children[5]).replace(/<[^>]*>/g, '')),
                                    obtain: _this.elementValue($_8, [children[4]]),
                                    materials: materialString.split(/<br>/g)
                                });
                            });
                        });
                        return [2 /*return*/, finalDataArray_8];
                    case 2:
                        e_9 = _a.sent();
                        console.log(e_9);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype._equipmentDiy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var htmlData, $_9, finalDataArray_9, e_10;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('***** Collecting Equipment DIYs *****');
                        return [4 /*yield*/, request(this.urls.equipment)];
                    case 1:
                        htmlData = _a.sent();
                        $_9 = cheerio.load(htmlData);
                        finalDataArray_9 = [];
                        $_9('table.sortable').each(function (i, elem) {
                            $_9(elem).find('tr').each(function (i, elem) {
                                //Skip the first header info
                                if (i == 0)
                                    return;
                                var children = $_9(elem).children();
                                var materialString = $_9(children[2]).html().trim();
                                materialString = materialString.replace(/<[/a|noscript][^>]*>|<[/img][^>]*>/g, '');
                                finalDataArray_9.push({
                                    name: _this.elementValue($_9, children[0]),
                                    img: $_9(children[1]).find('a').attr('href'),
                                    bellValue: Number(_this.elementValue($_9, children[5]).replace(/<[^>]*>/g, '')),
                                    obtain: _this.elementValue($_9, [children[4]]),
                                    materials: materialString.split(/<br>/g)
                                });
                            });
                        });
                        return [2 /*return*/, finalDataArray_9];
                    case 2:
                        e_10 = _a.sent();
                        console.log(e_10);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype._otherDiy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var htmlData, $_10, finalDataArray_10, e_11;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('***** Collecting Other DIYs *****');
                        return [4 /*yield*/, request(this.urls.other)];
                    case 1:
                        htmlData = _a.sent();
                        $_10 = cheerio.load(htmlData);
                        finalDataArray_10 = [];
                        $_10('table.sortable').each(function (i, elem) {
                            $_10(elem).find('tr').each(function (i, elem) {
                                //Skip the first header info
                                if (i == 0)
                                    return;
                                var children = $_10(elem).children();
                                var materialString = $_10(children[2]).html().trim();
                                materialString = materialString.replace(/<[/a|noscript][^>]*>|<[/img][^>]*>/g, '');
                                finalDataArray_10.push({
                                    name: _this.elementValue($_10, children[0]),
                                    img: $_10(children[1]).find('a').attr('href'),
                                    bellValue: Number(_this.elementValue($_10, children[5]).replace(/<[^>]*>/g, '').replace('(each)', '')),
                                    obtain: _this.elementValue($_10, [children[4]]),
                                    materials: materialString.split(/<br>/g)
                                });
                            });
                        });
                        return [2 /*return*/, finalDataArray_10];
                    case 2:
                        e_11 = _a.sent();
                        console.log(e_11);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * End Tool Collectors
     */
    Scrapper.prototype.elementValue = function ($, elem) {
        return $(elem).text().trim();
    };
    Scrapper.prototype.isDataCheckedOff = function (value) {
        return value == "\u2713" || value == "✔";
    };
    Scrapper.prototype.collectSex = function (value) {
        return value.indexOf('♀') >= 0 ? 'F' : 'M';
    };
    Scrapper.prototype.generateJSONFile = function (title, data) {
        return __awaiter(this, void 0, void 0, function () {
            var e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fse.outputJson('./output/' + title + '.json', data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_12 = _a.sent();
                        console.error(e_12.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Scrapper;
}());
exports.Scrapper = Scrapper;
//# sourceMappingURL=Scrapper.js.map