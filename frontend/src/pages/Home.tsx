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
    <div className="h-screen bg-gradient-to-b from-[#181818] to-[#101010] text-white flex flex-col">

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">

            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-600 bg-clip-text text-transparent">
              Olá, qual sua dúvida?
            </h1>

            <p className="text-zinc-500 text-lg">
              Faça uma pergunta para começar.
            </p>

          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`
                w-fit
                max-w-[80%]
                px-5
                py-3
                rounded-2xl
                whitespace-pre-wrap
                break-words
                shadow-xl
                transition-all
                duration-300
                ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-orange-500 to-amber-600 shadow-orange-500/20"
                    : "bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50"
                }
              `}
            >
              {message.content}
            </div>

          </div>
        ))}

        {loading && (
          <div className="flex justify-start">

            <div className="bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 px-5 py-3 rounded-2xl shadow-xl">
              Pensando...
            </div>

          </div>
        )}

      </div>

      <div className="p-4 border-t border-zinc-800/50 bg-[#121212]/80 backdrop-blur-md">

        <div className="max-w-4xl mx-auto flex gap-3">

          <input
            type="text"
            placeholder="Digite sua pergunta..."
            className="
              flex-1
              bg-zinc-900/80
              backdrop-blur-md
              border
              border-zinc-700/60
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-orange-500
              focus:ring-2
              focus:ring-orange-500/20
              transition-all
            "
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
            className="
              bg-gradient-to-br
              from-orange-500
              to-amber-600
              px-6
              rounded-2xl
              font-medium
              hover:scale-105
              hover:opacity-95
              active:scale-95
              transition-all
              shadow-xl
              shadow-orange-500/20
            "
          >
            Enviar
          </button>

        </div>

      </div>

    </div>
  );
}