
def keyword_match_score(transcript, skill_keywords):
    scores = {}
    transcript_lower = transcript.lower()
    
    for skill, keywords in skill_keywords.items():
        count = sum(1 for kw in keywords if kw.lower() in transcript_lower)
        score = min(count, 5)  
        scores[skill] = score
    return scores

skill_keywords = {
    "Technical Skills": ["python", "machine learning", "deep learning", "tensorflow", "nlp"],
    "Relevant Experience": ["internship", "project", "industry", "real-world", "hands-on"],
    "Communication Skills": ["team", "communicate", "collaborate", "discussion", "presentation"]
}

