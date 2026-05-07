import os
import json
from dotenv import load_dotenv

# Optional: Load env variables
load_dotenv()

# Intent Classification Map based on JARVIS Blueprint
INTENT_MAP = {
    "business": ["Suryalite", "revenue", "sales", "KPI", "ecommerce"],
    "content": ["post", "Instagram", "content", "schedule", "carousel", "caption"],
    "security": ["security", "breach", "OPSEC", "CVE", "network"],
    "learning": ["learn", "study", "flashcards", "summarize", "skill"],
    "life": ["plan", "schedule", "task", "habit", "morning brief"],
    "money": ["cashflow", "P&L", "invest", "finance", "expense"],
    "tech": ["code", "bug", "deploy", "review", "infra"]
}

def classify_intent_heuristic(user_input: str) -> str:
    """
    A simple heuristic-based fallback classifier.
    """
    text = user_input.lower()
    for intent, keywords in INTENT_MAP.items():
        if any(keyword.lower() in text for keyword in keywords):
            return intent
    return "unknown"

def classify_intent(user_input: str) -> str:
    """
    Classify user intent using LLM (placeholder for LangChain/Claude implementation).
    """
    # In a real implementation, this would call Claude 3.5 Sonnet
    # via LangChain to classify the text into one of the 7 domains.

    # For now, we use a simple heuristic matching
    return classify_heuristic(user_input)

def classify_heuristic(user_input: str) -> str:
    return classify_intent_heuristic(user_input)

if __name__ == "__main__":
    test_inputs = [
        "How's Suryalite doing?",
        "What should I post this week?",
        "Am I learning fast enough?",
        "Any security alerts?",
        "What's my cashflow look like?",
        "Review this code",
        "Plan my week"
    ]

    print("Testing Intent Classifier (Heuristic):")
    for text in test_inputs:
        intent = classify_intent(text)
        print(f"'{text}' -> {intent}_agent")
