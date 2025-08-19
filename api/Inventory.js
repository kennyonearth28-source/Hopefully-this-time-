import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://nephilly.ethoscannabis.com/stores/ethos-northeast-philadelphia/products/flower'
    );

    // Try to parse JSON, fallback to text
    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    res.status(200).json({ inventory: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
}
