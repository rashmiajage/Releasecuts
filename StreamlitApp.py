import streamlit as st
from graph_agent import chain

st.title("Hardcoded Splunk Query Chain")

if st.button("Run Query Sequence"):
    with st.spinner("Running..."):
        result = chain.invoke({})
        st.subheader("Step 1: Failed SSH Logins")
        st.json(result.get("step1_result", {}))
        st.subheader("Step 2: Top 5 Users")
        st.json(result.get("step2_result", {}))
        st.subheader("Step 3: User IPs")
        st.json(result.get("step3_result", {}))
