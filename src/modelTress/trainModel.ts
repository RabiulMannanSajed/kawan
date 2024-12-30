// import { DecisionTree } from 'decision-tree-js';
// import { readCSV } from './readCSV';
// import fs from 'fs';

// const trainModel = async () => {
//   try {
//     // Assuming readCSV is a function that reads your CSV data
//     const data = await readCSV('./src/data/healthData.csv');
//     const features = ['Height', 'Weight', 'BMI']; // Input features
//     const target = 'FitnessLevel'; // Target label

//     const decisionTree = new DecisionTree(data, target, features);

//     // Save the trained model to a JSON file
//     const modelJSON = decisionTree.toJSON();
//     fs.writeFileSync('./trainedModel.json', JSON.stringify(modelJSON, null, 2));

//     console.log('Model trained and saved successfully!');
//   } catch (error) {
//     console.error('Error during model training:');
//   }
// };

// trainModel();
import * as fs from 'fs';

interface TreeNode {
  children_left: number[];
  children_right: number[];
  feature: number[];
  threshold: number[];
  value: number[][][];
}

interface Forest {
  forest: TreeNode[];
  n_classes: number;
  n_features: number;
  n_estimators: number;
}

interface Mappings {
  label_mapping: { [key: string]: number };
  suggestion_mapping: { [key: string]: string };
}

// Load model and mappings
const forest: Forest = JSON.parse(
  fs.readFileSync(
    // '\projects2\mental-health-server\src\app\data\random_forest_weights.json',
    '/projects2/mental-health-server/src/app/data/random_forest_weights.json',
    'utf-8',
  ),
);
const mappings: Mappings = JSON.parse(
  fs.readFileSync(
    // '\projects2\mental-health-server\src\app\data\label_encoder_and_suggestions.json',
    '/projects2/mental-health-server/src/app/data/label_encoder_and_suggestions.json',
    'utf-8',
  ),
);

// Function to traverse a single tree
function traverseTree(tree: TreeNode, bmi: number): number {
  let node = 0;

  while (tree.children_left[node] !== -1) {
    if (bmi <= tree.threshold[node]) {
      node = tree.children_left[node];
    } else {
      node = tree.children_right[node];
    }
  }

  // Extract the class with the highest probability
  const classProbs = tree.value[node][0];
  const predictedClass = classProbs.indexOf(Math.max(...classProbs));
  return predictedClass;
}

// Function to predict using the Random Forest
function predictStatus(bmi: number): number {
  const predictions: number[] = [];

  // Traverse each tree in the forest
  for (const tree of forest.forest) {
    const prediction = traverseTree(tree, bmi);
    predictions.push(prediction);
  }

  // Majority voting
  const classCounts: { [key: string]: number } = {}; // Use string keys explicitly
  for (const pred of predictions) {
    const key = pred.toString(); // Convert number to string for object key
    classCounts[key] = (classCounts[key] || 0) + 1;
  }

  // Find the class with the highest count
  const majorityClass = Object.keys(classCounts).reduce((a, b) =>
    classCounts[a] > classCounts[b] ? a : b,
  );

  return parseInt(majorityClass, 10); // Convert the majority class back to a number
}

// Function to get the suggestion based on the predicted status
function getSuggestion(bmi: number): string {
  const statusIndex = predictStatus(bmi);
  const status = Object.keys(mappings.label_mapping).find(
    (key) => mappings.label_mapping[key] === statusIndex,
  );

  if (!status || !(status in mappings.suggestion_mapping)) {
    throw new Error('Suggestion not found for the given BMI.');
  }

  // Return suggestion
  return mappings.suggestion_mapping[status];
}

// Test the prediction
const bmiValue = 28; // BMI as number
try {
  const suggestion = getSuggestion(bmiValue);
  console.log(`For BMI ${bmiValue}, Suggestion: ${suggestion}`);
} catch (error: any) {
  console.error(error.message);
}
