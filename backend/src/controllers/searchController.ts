import { Request, Response } from "express";
import Normalization from "../models/normalization";
import { generatePhoneticKeys } from "../utils/phonetic";
import { callLLM } from "../utils/llm";

export const search = async (req: Request, res: Response) => {
    const { query } = req.query;
  
    if (!query) {
      res.status(400).json({ error: "Query is required" });
      return;
    }
  
    try {
      console.log(`Received Query: ${query}`);
  
      //Phonetic Matching
      const phoneticKeys = await generatePhoneticKeys(query as string);
      console.log(`Generated Phonetic Keys:`, phoneticKeys);
  
      const matchedRecord = await Normalization.findOne({
        $or: [
          { variations: query },
          { phoneticKeys: { $in: phoneticKeys } },
        ],
      });
  
      console.log(`Matched Record:`, matchedRecord);
  
      if (matchedRecord) {
        res.json(matchedRecord);
        return;
      }
  
      //LLM Fallback
      const llmResponse = await callLLM(query as string);
      console.log(`LLM Response:`, llmResponse);
  
      if (llmResponse && llmResponse !== "new") {
        // Update existing record
        const updatedRecord = await Normalization.findOneAndUpdate(
            { canonicalName: llmResponse.trim() }, // Trim extra spaces
            { 
              $addToSet: { 
                variations: query, 
                phoneticKeys: { $each: phoneticKeys } 
              } 
            },
            { new: true, upsert: true } 
          );
          
  
        console.log(`Updated Record:`, updatedRecord);
        res.json(updatedRecord);
        return;
      } else {
        // Create new record
        const newRecord = new Normalization({
          canonicalName: query,
          variations: [query],
          phoneticKeys,
          category: "unknown", // Default category
        });
  
        await newRecord.save();
        console.log(`New Record Created:`, newRecord);
  
        res.json(newRecord);
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  