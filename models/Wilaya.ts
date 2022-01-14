const mongoose = require("mongoose");

const WilayaSchema = new mongoose.Schema({
  id: Number,
  name: String,
  postalCode: String,
  dairas: [
    {
      name: String,
      communes: [
        {
          name: String,
          codeONS: String,
          postalCode: String,
          otherPosts: [
            {
              name: String,
              postalCode: String,
            },
          ],
        },
      ],
    },
  ],
  address: [{ name: String, postalCode: String }],
});

const Wilaya = mongoose.models.Wilaya || mongoose.model("Wilaya", WilayaSchema);
export default Wilaya;
