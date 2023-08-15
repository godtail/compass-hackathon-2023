export const generatePersonaTemplate = (listing: any) => `
  Give you a listing information:
  - address: ${listing.city} ${listing.address}.
  - price: ${listing.displayPrice}.
  - key details: ${listing.keyDetails
    .filter((detail: any) => detail.value !== '-')
    .map((detail: any) => `${detail.key} is ${detail.value}`)
    .join(',')}.
  - public records: ${listing.publicRecords
    .map(
      (record: any) =>
        `${record.name}: ${record.fields
          .map((field: any) => `${field.key} is ${field.value}`)
          .join(' and ')}`,
    )
    .join(',')}.
  please generate the listing buyer persona profile in following JSON format:
  {
    "name": string,
    "sex": string,
    "age": string,
    "jobTitle": string,
    "annualSalary": string,
    "location": string,
    "quote": string,
    "bio": string,
    "tags": string[],
    "goals": string[],
    "painPoints": string[],
    "decisionCriteria": string[],
    "likes": string[],
    "dislikes": string[],
  }
  profile rules:
  - sex available values: male, female.
  - age available values: adult, young-adult, child, infant, elderly.
  - name and sex should match.
  - generate jobTitle & annualSalary.
`;
