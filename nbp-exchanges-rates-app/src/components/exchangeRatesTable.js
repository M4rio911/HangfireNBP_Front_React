import "./exchangeRatesTable.css";

export default function ExchangeRatesTable({ table }) {
  return (
    <div className="exchange-table-container">
      <h2>Table {table.tableCode} - {table.fileNumber}</h2>
      <p>Effective Date: {new Date(table.effectiveDate).toLocaleDateString()}</p>
      <table className="exchange-table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Code</th>
            <th>Mid</th>
          </tr>
        </thead>
        <tbody>
          {table.exchangeRates.map((rate, index) => (
            <tr key={index}>
              <td>{rate.name}</td>
              <td>{rate.code}</td>
              <td>{rate.mid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}