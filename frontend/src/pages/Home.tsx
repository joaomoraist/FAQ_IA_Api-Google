import { useState } from "react";
import { api } from "../services/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  async function sendMessage() {
    if (!question.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;

    setQuestion("");
    setLoading(true);

    try {
      const response = await api.post("/chat", {
        question: currentQuestion,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erro ao obter resposta.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="h-screen bg-zinc-900 text-white flex flex-col">

      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-zinc-500">
            Faça uma pergunta...
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-3xl p-4 rounded-2xl whitespace-pre-wrap ${
              message.role === "user"
                ? "bg-blue-600 ml-auto"
                : "bg-zinc-800"
            }`}
          >
            {message.content}
          </div>
        ))}

        {loading && (
          <div className="bg-zinc-800 p-4 rounded-2xl w-fit">
            Pensando...
          </div>
        )}

      </div>

      <div className="p-4 border-t border-zinc-800">

        <div className="max-w-4xl mx-auto flex gap-2">

          <input
            type="text"
            placeholder="Digite sua pergunta..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 px-6 rounded-xl hover:bg-blue-700 transition"
          >
            Enviar
          </button>

        </div>

      </div>

    </div>
  );
}