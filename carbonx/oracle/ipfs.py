import hashlib
import json

def upload_proof(data: dict) -> str:
    """
    Simulates IPFS upload.
    Replace later with nft.storage / Pinata.
    """
    encoded = json.dumps(data).encode()
    cid = hashlib.sha256(encoded).hexdigest()

    return cid
