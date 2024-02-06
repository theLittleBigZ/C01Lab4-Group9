// Post a note
app.post("/postNote", express.json(), async (req, res) => {
  try {
    // Basic body request check
    const { title, content } = req.body;
    const createdAt = new Date();

    if (!title || !content) {
      return res
        .status(400)
        .json({ error: "Title and content are both required." });
    }

    // Send note to database
    const collection = db.collection(COLLECTIONS.notes);
    const result = await collection.insertOne({
      title,
      content,
      createdAt
    });
    res.json({
      response: "Note added succesfully.",
      insertedId: result.insertedId,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});