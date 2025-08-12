from groq import Groq
import os
from ..utils.news_fetcher import get_latest_news

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

news = get_latest_news()

def get_indian_news():
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"{news} this is the data of the today's news you have to summarize each and every news in the shortest way without lossing the main content of the news and then return it(the whole response should not exceed 500 words not more than this so the complete response should be only 10-11 lines max), make sure the response should be only in text format not markdwon nor json format. So that it can be utilized in a text to speech application. give directly the response without any extra text or explanation. DO NOT ADD ANYTHING ELSE",
                }
            ],
            model="llama-3.3-70b-versatile",
            stream=False,
        )

        ans = chat_completion.choices[0].message.content
        
        return ans
    except Exception as e:
        return None