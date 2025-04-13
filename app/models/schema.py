from pydantic import BaseModel, Field
from typing import List, Optional

class ImagePayload(BaseModel):
    """Base64 encoded image string"""
    image: str = Field(..., description="Base64 encoded image string")

class QueryPayload(BaseModel):
    """Query string"""
    query: str = Field(..., description="Query string for the model")

class LocationPayload(BaseModel):
    """Location coordinates"""
    lat: float = Field(..., description="Latitude of the location")
    lng: float = Field(..., description="Longitude of the location")

class Response(BaseModel):
    """Response format: 
    
    ## Successfull Response
    ```
    {
        "status": "success",
        "message": "Analysis completed successfully.",
        "data": {
            "description": "You are on a street with traffic and shops nearby."
        }
    }
    ```
    
    ## Error Response
    ```
    {
        "status": "error",
        "message": "An error occurred during analysis.",
        "data": {}
    }
    ```
    """
    status: str = Field(..., description="Status of the response")
    message: str = Field(..., description="Message content of the response")
    data: Optional[dict] = Field(..., description="Data content of the response")
