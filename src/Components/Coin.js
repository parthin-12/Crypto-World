import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { useParams } from "react-router-dom";
import { CryptoState } from "./CryptoCurrency";
import { Typography, LinearProgress, Button } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "./CoinInfo";
import "./Coin.css";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./firebase";

const Coin = () => {
  const [coin, setCoin] = useState("");

  const { id } = useParams();
  const { currency, symbol, user, watchlist } = CryptoState();

  const fetchCoinById = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  function functionForPrice(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });

      return toast.success(`${coin.name} Added to the Watchlist!`);
    } catch (error) {
      return toast.error(error);
    }
  };

  const removeFromWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((e) => e !== coin?.id),
        },
        { merge: "true" }
      );

      return toast.success(`${coin.name} Remove to the Watchlist!`);
    } catch (error) {
      return toast.error(error);
    }
  };

  useEffect(() => {
    fetchCoinById();
  }, [currency]);

  if (!coin) {
    return <LinearProgress style={{ backgroundColor: "gold" }} />;
  }

  return (
    <div className="coinContainer">
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className="coinHeading">
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitile1"
          className="coinDesc"
          style={{
            wordSpacing: "1.1px",
            letterSpacing: "1.05px",
            lineHeight: "1.6",
          }}
        >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className="marketData">
          <span
            style={{
              display: "flex",
              marginBottom: 20,
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                fontWeight: "400",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex", marginBottom: 20 }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Current Price:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {functionForPrice(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex", marginBottom: 20 }}>
            <Typography
              style={{
                fontWeight: "bold",
                fontFamily: "Montserrat",
                fontSize: "1.5rem",
              }}
            >
              Market Cap:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {functionForPrice(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              id="watchListBtn"
              onClick={inWatchlist ? removeFromWatchList : addToWatchList}
              style={{
                backgroundColor: inWatchlist ? "red" : "",
                color: inWatchlist ? "white" : "",
              }}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coin;
