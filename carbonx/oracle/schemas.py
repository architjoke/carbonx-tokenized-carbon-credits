from pydantic import BaseModel

class ProjectInput(BaseModel):
    location: str
    areaHectares: int
    co2Kg: int

class VerificationResult(BaseModel):
    confidence: int
    proof_cid: str
    project_id: int
    tx_hash: str
