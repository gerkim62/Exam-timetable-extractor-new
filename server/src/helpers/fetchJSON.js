async function fetchJSON() {
  const apiKey = "aa46bce5-ad11-4d2f-9f2d-b455db283732";
  const jsonUrl = "https://jsonbin.org/gerkim62/blog";

  try {
    const response = await fetch(jsonUrl, {
      headers: {
        authorization: `token ${apiKey}`,
      },
    });

    const data = await response.json();
    console.log("Fetched JSON:", data);
    // Use the fetched JSON data
    return data;
  } catch (error) {
    console.error("Error fetching JSON:", error);
    return false;
  }
}
