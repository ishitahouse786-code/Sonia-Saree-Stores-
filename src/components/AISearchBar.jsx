import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export default function AISearchBar({ onSearch }) {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an AI saree search assistant." },
          { role: "user", content: `Find sarees related to: ${query}` }
        ],
      });

      const suggestion = completion.choices[0].message.content;
      onSearch(suggestion);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder={t("search_placeholder")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border p-2 rounded"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "..." : "AI"}
      </button>
      <button
        onClick={() => i18n.changeLanguage(i18n.language === "en" ? "bn" : "en")}
        className="bg-gray-200 px-3 py-2 rounded"
      >
        {t("toggle_language")}
      </button>
    </div>
  );
}