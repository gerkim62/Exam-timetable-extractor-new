async function updateJSON(jsonData) {
  const apiKey = "aa46bce5-ad11-4d2f-9f2d-b455db283732";
  const jsonUrl = "https://jsonbin.org/gerkim62/blog";

  try {
    const response = await fetch(jsonUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `token ${apiKey}`,
      },
      body: JSON.stringify(jsonData),
    });

    const data = await response.json();
    console.log("JSON updated:", data);
  } catch (error) {
    console.error("Error updating JSON:", error);
  }
}
