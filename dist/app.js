"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Handle preflight requests for all routes
app.options('*', (0, cors_1.default)());
//* https://kawan.onrender.com/api/v1
app.use('/api/v1', routes_1.default);
const getController = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Kawan is running',
    });
};
app.get('/', getController);
exports.default = app;
