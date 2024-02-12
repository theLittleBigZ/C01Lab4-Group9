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

    if (data.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "Unable to find note with given ID." });
    }
    res.json({ response: `Document with ID ${noteId} patched.` });
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})


app.patch('/updateNoteColor/:noteId', express.json(), async (req, res) => {
  const { noteId } = req.params;
  const { color } = req.body;

  if (!ObjectId.isValid(noteId)) {
      return res.status(400).json({ error: "Invalid note ID." });
  }

  try {
      const collection = db.collection('notes');
      await collection.updateOne({ _id: new ObjectId(noteId) }, { $set: { color } });
      res.json({ message: 'Note color updated successfully.' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.delete("/deleteAllNotes", express.json(), async (req, res) => {
  try {
    const collection = db.collection(COLLECTIONS.notes);
    const data = await collection.deleteMany({});

    res.json({ response: `${data.deletedCount} note(s) deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});