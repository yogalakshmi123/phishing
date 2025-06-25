import streamlit as st
from groq import Groq

#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

from groq import Groq

client = Groq(
    api_key="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",
)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "Explain the importance of fast language models",
        }
    ],
    model="llama-3.3-70b-versatile",
    stream=False,
)

st.write(chat_completion.choices[0].message.content)



