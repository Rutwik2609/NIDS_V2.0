import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import Feature from "../models/features.model.js";
import xlsx from "xlsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const predictController = async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const pythonScriptPath = path.join(__dirname, "..", "predict.py");
    const pythonProcess = spawn("python", [
      pythonScriptPath,
      JSON.stringify(data),
    ]);

    let result = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });

    pythonProcess.on("close", async (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: "Prediction failed" });
      }

      try {
        const predictionResult = JSON.parse(result);

        const featureData = {
          ...req.body,
          prediction: predictionResult.predictions[0].output,
        };

        await saveFeatureToDB(featureData);

        res
          .status(200)
          .json({ output: predictionResult.predictions[0].output });
      } catch (error) {
        console.error("Error saving to DB:", error);
        res.status(500).json({ error: "Database save failed" });
      }
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const saveFeatureToDB = async (featureData) => {
  try {
    const newFeature = new Feature(featureData);
    await newFeature.save();
  } catch (error) {
    console.error("Database save error:", error);
  }
};

export const bulkPredictController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No Excel file uploaded" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    if (!data || data.length === 0) {
      return res.status(400).json({ error: "No data found in Excel file" });
    }

    const pythonScriptPath = path.join(__dirname, "..", "predict.py");
    const pythonProcess = spawn("python", [
      pythonScriptPath,
      JSON.stringify(data),
    ]);

    let result = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });

    pythonProcess.on("close", async (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: "Bulk prediction failed" });
      }

      try {
        const predictionResults = JSON.parse(result);

        await Promise.all(
          predictionResults.predictions.map((prediction) =>
            saveFeatureToDB({
              ...prediction.input,
              prediction: prediction.output,
            })
          )
        );

        res.status(200).json({ predictions: predictionResults.predictions });
      } catch (error) {
        console.error("Error saving to DB:", error);
        res.status(500).json({ error: "Database save failed" });
      }
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};
