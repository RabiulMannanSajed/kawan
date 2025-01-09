// trainModel();
import * as fs from 'fs';
import * as path from 'path';
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

//Here is the file system
const forestFilePath = path.join(__dirname, 'random_forest_weights.json');
// Load model and mappings
const forest: Forest = JSON.parse(fs.readFileSync(forestFilePath, 'utf-8'));

const labelFilePath = path.join(
  __dirname,
  'label_encoder_and_suggestions.json',
);

const mappings: Mappings = JSON.parse(fs.readFileSync(labelFilePath, 'utf-8'));

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

export const suggestionOfBMI = async (userBMI: string) => {
  //* here we send the BMI as string make is number
  const BMINumber = parseFloat(userBMI);
  const suggestion = getSuggestion(BMINumber);
  console.log(`For BMI ${BMINumber}, Suggestion: ${suggestion}`);
  return suggestion;
};
