from carbonx.ai.carbon_model import predict_confidence

def verify_project_ai(location: str, area: int, co2: int) -> int:
    """
    Runs AI/ML model to generate confidence score
    """
    confidence = predict_confidence(
        location=location,
        area=area,
        co2=co2
    )

    if confidence < 60:
        raise ValueError("AI confidence too low")

    return confidence
