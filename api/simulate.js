module.exports = async (req, res) => {
  let fetch;

  // Import dinámico de node-fetch
  try {
    fetch = (await import('node-fetch')).default;
  } catch (error) {
    console.error('Error importing node-fetch:', error);
    return res.status(500).json({ error: 'Failed to import node-fetch' });
  }

  const { body } = req;

  try {
    const response = await fetch(
      "https://api.tenderly.co/api/v1/account/juliopavilaa/project/safesnap-plugin/simulate-bundle",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": process.env.TENDERLY_ACCESS_KEY,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error with Tenderly:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
