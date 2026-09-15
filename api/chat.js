export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages are required." });
    }

    const apiKey = process.env.TABITOKEN_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "TABITOKEN_API_KEY is not configured." });
    }

    const upstream = await fetch("https://tabitoken.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages
      })
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: data?.error?.message || data?.message || "AI API request failed."
      });
    }

    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      return res.status(502).json({ error: "AI returned no text." });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: "Server error while contacting the AI API." });
  }
}
