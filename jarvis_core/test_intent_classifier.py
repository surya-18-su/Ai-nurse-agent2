import pytest
from intent_classifier import classify_intent

def test_classify_intent():
    assert classify_intent("How's Suryalite doing?") == "business"
    assert classify_intent("What should I post this week?") == "content"
    assert classify_intent("Am I learning fast enough?") == "learning"
    assert classify_intent("Any security alerts?") == "security"
    assert classify_intent("What's my cashflow look like?") == "money"
    assert classify_intent("Review this code") == "tech"
    assert classify_intent("Plan my week") == "life"
    assert classify_intent("Random text without keywords") == "unknown"
