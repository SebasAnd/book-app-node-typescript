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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var express = require("express");
var app = express();
var port = 3000;
var PrismaClient = require('@prisma/client').PrismaClient;
var prisma = new PrismaClient({
    log: [
        {
            emit: 'stdout',
            level: 'query',
        },
        {
            emit: 'stdout',
            level: 'error',
        },
        {
            emit: 'stdout',
            level: 'info',
        },
        {
            emit: 'stdout',
            level: 'warn',
        },
    ]
});
prisma.$on('query', function (e) {
    console.log('Query: ' + e.query);
    console.log('Params: ' + e.params);
    console.log('Duration: ' + e.duration + 'ms');
});
function getPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findMany()];
                case 1:
                    posts = _a.sent();
                    console.log("posts", posts);
                    return [2 /*return*/];
            }
        });
    });
}
app.use(express.json());
getPosts();
/* AUTENTICATION  */
app.post('/api/auth/register/', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var now, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    now = new Date(Date.now());
                    console.log("body", req.body);
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                name: req.body.name,
                                email: req.body.email,
                                password: req.body.password,
                                createdAt: now,
                                upDateTimedAt: now,
                            }
                        })];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    res.send({ 'error': err_1 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
app.post('/api/auth/login', function (req, res) {
    res.send('register');
});
/* *******************************  */
/* BOOKS  */
app.get('/api/books/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var now, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                now = new Date(Date.now());
                console.log("body", req.body);
                return [4 /*yield*/, prisma.book.findMany({})];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.send({ 'error': err_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/books/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.book.findUnique({
                        where: { id: parseInt(req.params.id) },
                    })];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.send({ 'error': err_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/api/books/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var now, publicationDate, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                now = new Date(Date.now());
                publicationDate = new Date(req.body.publicationYear);
                return [4 /*yield*/, prisma.book.create({
                        data: {
                            title: req.body.title,
                            author: req.body.author,
                            publicationYear: publicationDate,
                            createdAt: now,
                            upDateTimedAt: now,
                        }
                    })];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.send({ 'error': err_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put('/api/books/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataIn, now, publicationDate, publicationDate_1, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dataIn = {};
                now = new Date(Date.now());
                publicationDate = new Date(req.body.publicationYear);
                if (req.body.title != undefined || req.body.title != null) {
                    dataIn['title'] = req.body.title;
                }
                if (req.body.author != undefined || req.body.author != null) {
                    dataIn['author'] = req.body.author;
                }
                if (req.body.publicationYear != undefined || req.body.publicationYear != null) {
                    publicationDate_1 = new Date(req.body.publicationYear);
                    dataIn['publicationYear'] = publicationDate_1;
                }
                dataIn['upDateTimedAt'] = now;
                return [4 /*yield*/, prisma.book.update({
                        where: { id: parseInt(req.params.id) },
                        data: dataIn
                    })];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.send({ 'error': err_5 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete('/api/books/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.book.delete({
                        where: { id: parseInt(req.params.id) },
                    })];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.send({ 'error': err_6 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/* *******************************  */
/* LOANS */
app.post('/api/loans/:userId/:bookId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var now, resultGet, result, result, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                now = new Date(Date.now());
                return [4 /*yield*/, prisma.loan.findFirst({
                        where: {
                            userId: parseInt(req.params.userId),
                            bookId: parseInt(req.params.bookId),
                        }
                    })];
            case 1:
                resultGet = _a.sent();
                console.log(resultGet);
                if (!(resultGet == null)) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma.loan.create({
                        data: {
                            userId: parseInt(req.params.userId),
                            bookId: parseInt(req.params.bookId),
                            loanDateTime: now,
                            returnDateTime: now
                        }
                    })];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 6];
            case 3:
                console.log("ODDER", resultGet.returnDateTime - resultGet.loanDateTime, resultGet.returnDateTime, resultGet.loanDateTime);
                if (!(resultGet.returnDateTime - resultGet.loanDateTime != 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, prisma.loan.update({
                        where: {
                            id: resultGet.id
                        },
                        data: {
                            loanDateTime: now,
                            returnDateTime: now
                        }
                    })];
            case 4:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 6];
            case 5:
                res.send(resultGet);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_7 = _a.sent();
                res.send({ 'error': err_7 });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.put('/api/loans/:userId/:bookId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resultGet, now, result, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, prisma.loan.findFirst({
                        where: {
                            userId: parseInt(req.params.userId),
                            bookId: parseInt(req.params.bookId),
                        }
                    })];
            case 1:
                resultGet = _a.sent();
                console.log(resultGet);
                if (!(resultGet != null)) return [3 /*break*/, 3];
                now = new Date(Date.now());
                return [4 /*yield*/, prisma.loan.update({
                        where: {
                            id: resultGet.id
                        },
                        data: {
                            returnDateTime: now
                        }
                    })];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                res.send(resultGet);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_8 = _a.sent();
                res.send({ 'error': err_8 });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/* *******************************  */
/* BOOK PURCHASE */
app.post('/api/purchase', function (req, res) {
    res.send('register');
});
/* *******************************  */
app.get('/', function (req, res) {
    res.send('Hello World from here !');
});
app.listen(port, function () {
    return console.log("Express is listening at http://localhost:".concat(port));
});
