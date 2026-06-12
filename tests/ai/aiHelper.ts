/**
 * AI Helper — calls Claude to generate test scenarios, data, and suggestions
 * during test execution. Uses the Anthropic Messages API.
 */

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';

interface AIResponse {
  scenarios?: string[];
  testData?: Record<string, unknown>[];
  suggestion?: string;
  priority?: 'P1' | 'P2' | 'P3';
}

async function callClaude(prompt: string, systemPrompt?: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
    console.warn('[AI Helper] ANTHROPIC_API_KEY not set — skipping AI call');
    return '';
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      system: systemPrompt || 'You are a QA expert generating Playwright test scenarios for qatestacademy.com. Respond with concise, actionable output only.',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) throw new Error(`AI API error: ${response.status}`);
  const data = await response.json();
  return data.content?.[0]?.text ?? '';
}

export async function generateEdgeCases(flow: string): Promise<string[]> {
  const text = await callClaude(
    `Generate 5 edge case test scenarios for the "${flow}" flow on qatestacademy.com. Return as a JSON array of strings.`
  );
  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim());
  } catch {
    return text.split('\n').filter(Boolean).slice(0, 5);
  }
}

export async function generateTestData(dataType: string, count = 5): Promise<Record<string, unknown>[]> {
  const text = await callClaude(
    `Generate ${count} ${dataType} test data entries for qatestacademy.com. Return as a JSON array of objects.`
  );
  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim());
  } catch {
    return [];
  }
}

export async function suggestLocator(element: string, pageContext: string): Promise<string> {
  return callClaude(
    `Suggest the best Playwright locator for "${element}" on the ${pageContext} page of qatestacademy.com. Return only the locator string.`
  );
}

export async function explainFailure(errorMessage: string, testName: string): Promise<string> {
  return callClaude(
    `A Playwright test "${testName}" failed with: "${errorMessage}". Suggest the most likely cause and fix in 2-3 sentences.`
  );
}
