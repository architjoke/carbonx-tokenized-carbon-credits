from fastapi import FastAPI, HTTPException
from carbonx.oracle.schemas import (
    ProjectInput,
    VerificationResult,
)
from carbonx.oracle.verifier import verify_project_ai
from carbonx.oracle.ipfs import upload_proof
from carbonx.oracle.signer import submit_and_verify_project

app = FastAPI(title="CarbonX Oracle")

# -----------------------------
# VERIFY PROJECT
# -----------------------------
@app.post("/verify", response_model=VerificationResult)
def verify_project(data: ProjectInput):
    try:
        confidence = verify_project_ai(
            data.location,
            data.areaHectares,
            data.co2Kg
        )

        proof_cid = upload_proof({
            "location": data.location,
            "area": data.areaHectares,
            "co2": data.co2Kg,
            "confidence": confidence
        })

        tx_data = submit_and_verify_project(
            data.location,
            data.areaHectares,
            data.co2Kg,
            confidence,
            proof_cid
       )

        return VerificationResult(
            confidence=confidence,
            proof_cid=proof_cid,
            project_id=tx_data["project_id"],
            tx_hash=tx_data["tx_hash"]
        )


    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# -----------------------------
# PROJECT STATUS (for hook)
# -----------------------------
@app.get("/project/{project_id}/status")
def project_status(project_id: int):
    """
    Frontend polling endpoint
    """
    # MVP: mocked state (later read from contract events)
    return {
        "project_id": project_id,
        "status": "verified",  # pending | verified | minted
        "confidence": 82
    }


# -----------------------------
# USER CREDITS (for hook)
# -----------------------------
@app.get("/credits/{address}")
def get_credits(address: str):
    """
    Returns total carbon credits of a user
    """
    # MVP mock (replace with contract call later)
    return {
        "address": address,
        "credits": 1000
    }
