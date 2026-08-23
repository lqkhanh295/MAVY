"use client";

import { IoRestaurant, IoPerson } from "react-icons/io5";
import { ChatMessage as ChatMessageType } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectFollowUp?: (query: string) => void;
}

export default function ChatMessage({ message, onSelectFollowUp }: ChatMessageProps) {
  const isChef = message.sender === "chef";

  return (
    <div className={`flex gap-2.5 ${isChef ? "justify-start" : "justify-end"} mb-4 w-full`}>
      {isChef && (
        <div className="w-8 h-8 rounded-full bg-navy-800 border border-coral text-coral flex items-center justify-center shrink-0 shadow-md mt-0.5">
          <IoRestaurant className="w-4 h-4" />
        </div>
      )}

      <div className={`max-w-[95%] sm:max-w-[90%] ${isChef ? "items-start" : "items-end"} flex-1 min-w-0`}>
        {/* Chat bubble */}
        <div
          className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg ${
            isChef
              ? "glass-dark-card text-white border border-white/10 rounded-tl-sm w-full"
              : "bg-coral text-navy-950 font-bold rounded-tr-sm w-fit ml-auto shadow-md"
          }`}
        >
          {isChef ? (
            <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-2">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h3 className="text-sm sm:text-base font-bold text-coral mt-3 mb-1">{children}</h3>,
                  h2: ({ children }) => <h3 className="text-sm sm:text-base font-bold text-coral mt-3 mb-1">{children}</h3>,
                  h3: ({ children }) => <h4 className="text-xs sm:text-sm font-bold text-coral mt-2.5 mb-1">{children}</h4>,
                  strong: ({ children }) => <strong className="text-coral font-bold">{children}</strong>,
                  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-ink-light/90">{children}</p>,
                  ul: ({ children }) => <ul className="my-2 space-y-1 list-disc pl-4 text-ink-light/90">{children}</ul>,
                  ol: ({ children }) => <ol className="my-2 space-y-1 list-decimal pl-4 text-ink-light/90">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed pl-0.5">{children}</li>,
                  hr: () => <hr className="my-3 border-white/10" />,
                  code: ({ children }) => (
                    <code className="bg-white/[0.08] text-coral px-1.5 py-0.5 rounded text-[11px] font-mono border border-white/10">
                      {children}
                    </code>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-coral/60 pl-3 py-1 my-2 bg-white/[0.02] text-ink-light/80 italic rounded-r">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
          )}
        </div>

        {/* Follow up suggestions */}
        {isChef && message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {message.suggestedFollowUps.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onSelectFollowUp?.(suggestion)}
                className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-coral hover:bg-coral/10 hover:border-coral transition-colors flex items-center gap-1.5 text-left cursor-pointer"
              >
                <span className="text-coral text-xs leading-none select-none">•</span>
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        )}

        <div
          className={`text-[10px] text-ink-light/50 mt-1 px-1 ${
            isChef ? "text-left" : "text-right"
          }`}
        >
          {message.timestamp}
        </div>
      </div>

      {!isChef && (
        <div className="w-8 h-8 rounded-full bg-coral text-navy-950 flex items-center justify-center shrink-0 font-bold shadow-md mt-0.5">
          <IoPerson className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
