import os
import base64
from groq import Groq

client:Groq = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def image_to_base64(image_path: str) -> str:
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode("utf-8")

prompts = {
    "analyze-road": (
        "You are guiding a blind person in real-time using a live street image. "
        "Analyze the image as a mature and responsible visual assistant. "
        "Describe the surroundings in 1-2 short lines, focusing only on essential details like obstacles, sidewalks, people, vehicles, road signs, and directions. "
        "Avoid any unnecessary artistic or emotional description — just helpful, clear, and safe navigation guidance. other than that you should not describe anything else. DO NOT ADD ANYTHING ELSE"
    ),

    "analyze-rupees": (
        "Identify and describe the Indian currency notes visible in the image. "
        "State their individual denominations and calculate the total amount. "
        "Respond clearly and concisely. just be short as much as possible, do not elaborate more and do not give extra response the response should be like Example: 'There are two 100 rupee notes and one 500 rupee note, so the total of 700 rupees.' DO NOT ADD ANYTHING ELSE"
    ),

    "analyze-document": (
        "Extract and understand the document’s main message. Return ONLY a 3–5 line summary, in plain, direct language. Do NOT include any raw text, formatting, or explanation.  Strictly avoid over-explaining or restating the full text. Keep it concise.  Example: 'This is a document with the following summary: it shows that the document is about the importance of education in society. {and the rest of the summary...}'. DO NOT ADD ANYTHING ELSE "
    ),

    "analyze-art": (
        "Describe the artistic scene in the image to a blind person. "
        "Act as a thoughtful artist, with little poetic way and focusing on the use of colors, shapes, composition, and the emotional or thematic message the artwork conveys. "
        "Keep the description concise (max 2-3 lines), yet vivid enough to help the listener visualize and feel the art’s intent. DO NOT ADD ANYTHING ELSE "
    )
}


def describe_image_for_blind(image_path: str, type_of_image: str) -> str:
    base64_image = image_to_base64(image_path)

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": (
                                prompts[type_of_image]
                            )
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            },
                        },
                    ],
                }
            ],
            model="meta-llama/llama-4-scout-17b-16e-instruct",
        )

        return chat_completion.choices[0].message.content.strip()
    
    except Exception as e:
        return None
