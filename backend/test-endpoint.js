fetch('http://localhost:5000/api/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: "console.log('hello')", language: "javascript" })
})
.then(async res => {
    console.log("Response Status:", res.status);
    console.log("Response Body:", await res.text());
})
.catch(err => {
    console.error("Fetch Error:", err);
});
