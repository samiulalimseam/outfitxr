export const getShop = async (_req, res) => {
  try {
    const session = await res.locals.shopify.session;
    res.status(200).json({ shop: session?.shop });
  } catch (e) {
    console.log(`Failed : ${e.message}`);
    res.status(500).json(e?.message);
  }
};
