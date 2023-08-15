export const generatePersonaTemplate = (listing: any) => `
  Generate a buyer's persona profile using the listing information provided to you in JSON: ${JSON.stringify(
    listing,
  )}.
  output the persona profile in following JSON format:
  {
    "name": "",
    "sex": "",
    "age": "",
    "jobTitle": "",
    "annualSalary": "",
    "location": "",
    "quote": "",
    "bio": "",
    "tags": [],
    "goals": [],
    "painPoints": [],
    "decisionCriteria": [],
    "likes": [],
    "dislikes": [],
  }
  Rules:
  - sex available values: male, female.
  - age available values: adult, young-adult, child, infant, elderly.
  - name and sex should match.
`;
