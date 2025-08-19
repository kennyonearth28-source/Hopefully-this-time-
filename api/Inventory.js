import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://nephilly.ethoscannabis.com/stores/ethos-northeast-philadelphia/products/flower'
    );

    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    // If the API returns structured JSON
    if (Array.isArray(data)) {
      // Remove prices, keep only clean details
      const cleaned = data.map(item => ({
        name: item.name || null,
        brand: item.brand || null,
        type: item.type || null,
        category: item.category || 'Flower',
        thc: item.thc || null,
        cbd: item.cbd || null,
        description: item.description || null
      }));

      return res.status(200).json({ inventory: cleaned });
    }

    // If it’s HTML or unknown format
    return res.status(200).json({
      message: "Fetched data (non-JSON). Manual parsing may be needed.",
      raw: data
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch data',
      details: error.message
    });
  }
}
