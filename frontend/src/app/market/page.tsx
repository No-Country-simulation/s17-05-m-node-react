"use client";

import useFetchData from "@/hooks/useFetchData";
import { getExchangeRates, getMarketGrainPrices } from "@/services";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CropPrices from "../../components/market/CropPrices";
import CurrencyExchange from "../../components/market/CurrencyExchange";
import AgriculturalInputs from "../../components/market/AgriculturalInputs";
import Header from "../common/Header";
import Footer from "../common/Footer";
import withAuth from "../auth/withAuth";

const Market = () => {
  const { fetchData } = useFetchData();
  const [marketData, setMarketData] = useState({});
  const [exchangeRates, setExchangeRates] = useState({});


  useEffect(() => {
    const getMarketData = async () => {
      const { ok, data } = await fetchData(getMarketGrainPrices, {});
      ok
        ? setMarketData(data)
        : toast.error("no se pudo traer la informacion del mercado");
    };

    const getMoneyData = async () => {
      const { ok, data } = await fetchData(getExchangeRates, {});
      ok
        ? setExchangeRates(data)
        : toast.error("no se pudo traer la informacion de tasas de cambio");
    };

    getMarketData();
    getMoneyData();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-orange-50 py-8">
        <Head>
          <title>Agricultural Data</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto px-4 text-black">
          <h1 className="text-3xl font-bold mb-8 text-center ">
            Datos actuales de mercado
          </h1>
          <div className="space-y-8 ">
            <CropPrices marketData={marketData} />
            <CurrencyExchange exchangeRates={exchangeRates} />
            <AgriculturalInputs />
          </div>
        </main>
      </div>
      <Footer/>
    </>
  );
};

export default withAuth(Market);
