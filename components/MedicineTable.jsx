import { medicinePrices } from "../data/medicinePrices";

export default function MedicineTable({ search }) {
  const filtered = medicinePrices.filter(m =>
    m.medicine.toLowerCase().includes(search.toLowerCase())
  );

  const cheapestPrice = Math.min(...filtered.map(m => m.price));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <tbody>
          {filtered.map((m, i) => (
            <tr key={i} className="border-b">
              <td>{m.medicine}</td>
              <td>{m.store}</td>
              <td>{m.area}</td>
              <td className="font-bold">
                ₹{m.price}
                {m.price === cheapestPrice && (
                  <span className="ml-2 text-green-600">CHEAPEST</span>
                )}
              </td>
              <td>
                {m.available ? "Available" : "Out of Stock"}
              </td>
              <td>
                {m.verified ? "✅ Verified" : "⚠️ Unverified"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
