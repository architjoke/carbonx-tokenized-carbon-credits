def predict_confidence(location: str, area: int, co2: int) -> int:
    """
    Simple AI confidence predictor (hackathon-safe).
    Replace with real ML later.
    """

    if area <= 0 or co2 <= 0:
        return 0

    # simple heuristic
    score = 50 + (area * 5)

    if score > 90:
        score = 90

    return score
