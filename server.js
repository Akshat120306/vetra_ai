
const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/ai", async (req, res) => {
  const { prompt } = req.body;

  try {
    const hfRes = await axios.post(
      "https://router.huggingface.co/hf-inference/models/google/flan-t5-small",
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.3
        }
      },
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json"
        }
      }
    );

    const reply =
      hfRes.data?.[0]?.generated_text ||
      hfRes.data?.generated_text ||
      "AI warming up. Please retry.";

    res.json({ reply });

  } catch (err) {
    console.error("HF ERROR:", err.response?.data || err.message);
    res.json({ reply: "AI warming up. Retry in 20 seconds." });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 VetraChain server running at http://localhost:${PORT}`);
});


function fetchVetsByLocation(location) {
  const vetGrid = document.getElementById("vetGrid");
  vetGrid.innerHTML = "🔍 Finding nearby vets...";

  db.collection("vets")
    .where("area", "==", location)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        vetGrid.innerHTML = "❌ No vets found in this area.";
        return;
      }

      vetGrid.innerHTML = "";

      snapshot.forEach(doc => {
        const vet = doc.data();

        vetGrid.innerHTML += `
          <div class="vet-card">
            <div class="vet-header">
              <div class="vet-name">${vet.name}</div>
              <div class="vet-rating">⭐ ${vet.rating}</div>
            </div>

            <div class="vet-area">${vet.clinicName}</div>

            <div class="vet-spec">
              💼 ${vet.experienceYears} yrs experience
            </div>

            <div class="vet-badge">
              ${vet.openNow ? "🟢 Open Now" : "🔴 Closed"}
            </div>

            <div style="margin:10px 0;font-size:14px;">
              💰 ₹${vet.consultationFee}
            </div>

            <div style="font-size:13px;color:#666;">
              📍 ${vet.address}
            </div>

            <button class="vet-button">
              📞 Book / Contact
            </button>
          </div>
        `;
      });
    })
    .catch(err => {
      vetGrid.innerHTML = "⚠️ Error loading vets";
      console.error(err);
    });
}
