import { stdout } from "process";

// Function to update the progress bar
const updateProgressBar = (progress: number, total: number) => {
  // Calculate the percentage
  const percentage = (progress / total) * 100;
  // Define the progress bar format
  const progressBar = `[${"=".repeat(percentage / 2)}${" ".repeat(50 - percentage / 2)}] ${percentage.toFixed(2)}%`;
  // Clear the current line and write the updated progress bar
  stdout.write("\r" + progressBar);
};

// Simulating a task that updates the progress
const simulateTask = async () => {
  const totalIterations = 100;
  for (let i = 1; i <= totalIterations; i++) {
    // Simulate some asynchronous task
    await new Promise((resolve) => setTimeout(resolve, 50));
    // Update the progress bar
    updateProgressBar(i, totalIterations);
  }
  // Add a new line after the progress is complete
  stdout.write("\n");
};

// Call the function to simulate the task
simulateTask();
