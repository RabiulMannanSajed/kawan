"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.suggestionOfBMI = void 0;
// trainModel();
const fs = __importStar(require("fs"));
// Load model and mappings
const forest = JSON.parse(fs.readFileSync(
// '/projects2/mental-health-server/src/app/data/random_forest_weights.json',
'/projects2/mental-health-server/data/random_forest_weights.json', 'utf-8'));
const mappings = JSON.parse(fs.readFileSync(
// '/projects2/mental-health-server/src/app/data/label_encoder_and_suggestions.json',
'/projects2/mental-health-server/data/label_encoder_and_suggestions.json', 'utf-8'));
// Function to traverse a single tree
function traverseTree(tree, bmi) {
    let node = 0;
    while (tree.children_left[node] !== -1) {
        if (bmi <= tree.threshold[node]) {
            node = tree.children_left[node];
        }
        else {
            node = tree.children_right[node];
        }
    }
    // Extract the class with the highest probability
    const classProbs = tree.value[node][0];
    const predictedClass = classProbs.indexOf(Math.max(...classProbs));
    return predictedClass;
}
// Function to predict using the Random Forest
function predictStatus(bmi) {
    const predictions = [];
    // Traverse each tree in the forest
    for (const tree of forest.forest) {
        const prediction = traverseTree(tree, bmi);
        predictions.push(prediction);
    }
    // Majority voting
    const classCounts = {}; // Use string keys explicitly
    for (const pred of predictions) {
        const key = pred.toString(); // Convert number to string for object key
        classCounts[key] = (classCounts[key] || 0) + 1;
    }
    // Find the class with the highest count
    const majorityClass = Object.keys(classCounts).reduce((a, b) => classCounts[a] > classCounts[b] ? a : b);
    return parseInt(majorityClass, 10); // Convert the majority class back to a number
}
// Function to get the suggestion based on the predicted status
function getSuggestion(bmi) {
    const statusIndex = predictStatus(bmi);
    const status = Object.keys(mappings.label_mapping).find((key) => mappings.label_mapping[key] === statusIndex);
    if (!status || !(status in mappings.suggestion_mapping)) {
        throw new Error('Suggestion not found for the given BMI.');
    }
    // Return suggestion
    return mappings.suggestion_mapping[status];
}
const suggestionOfBMI = (userBMI) => __awaiter(void 0, void 0, void 0, function* () {
    //* here we send the BMI as string make is number
    const BMINumber = parseFloat(userBMI);
    const suggestion = getSuggestion(BMINumber);
    console.log(`For BMI ${BMINumber}, Suggestion: ${suggestion}`);
    return suggestion;
});
exports.suggestionOfBMI = suggestionOfBMI;
