import React from 'react';

interface ExchangeRate {
  dollar: string;
  buy: string;
  sell: string;
}

interface CurrencyExchangeProps {
  exchangeRates: { [currency: string]: ExchangeRate };
}

const CurrencyExchange: React.FC<CurrencyExchangeProps> = ({exchangeRates}) => {
  console.log(exchangeRates)
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Cotización dólar</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
            {Object.entries(exchangeRates).map(([currency, {dollar}]) => (
                <th key={dollar} className="px-4 py-2">{dollar}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.entries(exchangeRates).map(([currency, {buy, sell}]) => (
                <td key={currency} className="border px-4 py-2">
                  <div className="flex justify-between">
                    <span>Compra</span>
                    <span>Venta</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>${buy}</span>
                    <span>${sell}</span>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrencyExchange;