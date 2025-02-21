export const generatePhoneticKeys = async (input: string): Promise<string[]> => {
    try {
      // Dynamically import the ESM modules
      const { metaphone } = await import("metaphone"); 
      const { transliterate } = await import("hebrew-transliteration");
  
      const englishPhonetic = metaphone(input);
      const hebrewPhonetic = metaphone(transliterate(input));
  
      console.log("Generated Phonetic Keys:", [englishPhonetic, hebrewPhonetic]); 
      return [englishPhonetic, hebrewPhonetic];
    } catch (error) {
      console.error("Error generating phonetic keys:", error);
      throw error;
    }
  };