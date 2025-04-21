from groq import Groq
import os
import datetime

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

def get_indian_news():
    today_date = datetime.datetime.now().strftime("%d-%m-%Y")
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"Give me the latest news from India of today's date which is {today_date}, in 3 bullet points. Expelain in little summary type and provide the source for each news. Expected output : news1 is from source and the news is :news1 , and so on.. (Make sure that source contains only the name of the news source and not the URL) and the response should be only in text format not markdwon nor json format. So that it can be utilized in a text to speech application. ",
                }
            ],
            model="llama-3.3-70b-versatile",
            stream=False,
        )

        ans = chat_completion.choices[0].message.content
        
        return ans
    except Exception as e:
        return None