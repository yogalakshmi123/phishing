import streamlit as st
import google.generativeai as genai
import json
import re

messages = st.text_area("Enter")

if st.button("Send"):
    genai.configure(api_key="AIzaSyCJQDpGvKX2nurvrkhliM_T4jQb1Vfu4y4")
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt =  f""" Check human factor to analysis for fear, urgency, pressure using this message {messages} and return as json 
                  i need only json string for json loads no need explanation or code block or any other
                    {{
                        "fear":1 - 5,
                        "urgency":1 - 5,
                        "pressure":1 - 5
                    }}
                 """
    response = model.generate_content(prompt)

    raw = response.text.strip()
    if raw.startswith("```"):
        raw = re.sub(r"```(?:json)?\s*([\s\S]*?)\s*```", r"\1", raw).strip()

    try:
        data = json.loads(raw)
        st.write(data)
    except json.JSONDecodeError as e:
        st.error("Failed to decode JSON")
        st.text("Raw response:")
        st.text(raw)
        st.text(f"Error: {e}")


    # st.write(raw = response.text.strip())
        
