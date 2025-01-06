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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHight = void 0;
const calculateHight = (hightM) => __awaiter(void 0, void 0, void 0, function* () {
    const hightValue = hightM.trim(); // Clean up whitespace
    let feet = 0;
    let inches = 0;
    if (hightValue.includes('.')) {
        [feet, inches = 0] = hightValue
            .split('.')
            .map((val) => parseFloat(val.trim()) || 0);
    }
    else {
        feet = parseFloat(hightValue) || 0;
    }
    const m = feet * 0.3048 + inches * 0.0254; // Conversion logic in m
    hightM = `${m.toFixed(2)} `;
    const hight = hightM.toString();
    return hight;
});
exports.calculateHight = calculateHight;
