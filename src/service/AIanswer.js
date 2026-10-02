const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;

export async function runGeneration(message) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
     {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error Response:", data);
      return "<p>Gemini request failed</p>";
    }

    let html =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.replace(
        /```html|```/g,
        ""
      ) || "<p>No response from Gemini</p>";

    return html.trim();
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return "<p>Error fetching from Gemini</p>";
  }
}
