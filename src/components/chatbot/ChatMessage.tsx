"use client";

import { IoRestaurant, IoPerson, IoSparkles } from "react-icons/io5";
import { ChatMessage as ChatMessageType } from "@/types";
import RecipeCard from "./RecipeCard";

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectFollowUp?: (query: string) => void;
}

export default function ChatMessage({ message, onSelectFollowUp }: ChatMessageProps) {
  const isChef = message.sender === "chef";

  return (
    <div className={`flex gap-2.5 ${isChef ? "justify-start" : "justify-end"} mb-4 w-full`}>
      {isChef && (
        <div className="w-8 h-8 rounded-full bg-navy-800 border border-gold text-gold flex items-center justify-center shrink-0 shadow-md mt-0.5">
          <IoRestaurant className="w-4 h-4" />
        </div>
      )}

      <div className={`max-w-[90%] sm:max-w-[88%] ${isChef ? "items-start" : "items-end"} flex-1 min-w-0`}>
        {/* Chat bubble */}
        <div
          className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
            isChef
              ? "bg-navy-800 text-white border border-navy-600 rounded-tl-sm w-full"
              : "bg-gold text-navy-950 font-semibold rounded-tr-sm w-fit ml-auto"
          }`}
        >
          <p className="whitespace-pre-line leading-relaxed">{message.text}</p>

          {/* Structured Recipes */}
          {message.recipes && message.recipes.length > 0 && (
            <div className="mt-3 space-y-3 w-full">
              {message.recipes.map((rec, i) => (
                <RecipeCard key={i} recipe={rec} onAskMore={onSelectFollowUp} />
              ))}
            </div>
          )}
        </div>

        {/* Follow up suggestions */}
        {isChef && message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.suggestedFollowUps.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onSelectFollowUp?.(suggestion)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-navy-900 border border-navy-800 text-gold hover:bg-navy-800 hover:border-gold transition-colors flex items-center gap-1 text-left"
              >
                <IoSparkles className="w-2.5 h-2.5 shrink-0" />
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
        <div className="w-8 h-8 rounded-full bg-gold text-navy-950 flex items-center justify-center shrink-0 font-bold shadow-md mt-0.5">
          <IoPerson className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
