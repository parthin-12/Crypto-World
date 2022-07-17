import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import "./Banner.css";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../CryptoCurrency";
import Carousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";

const Banner = () => {
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState("");

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const images = trending
    ? trending.map((e) => (
        <Link to={`/coin/${e.id}`} className="carouselItem">
          <img
            src={e.image}
            alt={e.name}
            height="80px"
            style={{ marginBottom: 10 }}
          />

          <span>
            {e.symbol}
            &nbsp;
            <span
              className={e.price_change_percentage_24h >= 0 ? "green" : "red"}
              style={{ fontWeight: "600" }}
            >
              {e.price_change_percentage_24h >= 0
                ? `+${e.price_change_percentage_24h.toFixed(2)}%`
                : `${e.price_change_percentage_24h.toFixed(2)}%`}
            </span>
          </span>

          <span
            style={{
              fontSize: "1.4rem",
              letterSpacing: "1.1px",
              fontWeight: "500",
              fontFamily: "Montserrat",
            }}
          >
            {symbol} {numberWithCommas(e.current_price.toFixed(2))}
          </span>
        </Link>
      ))
    : [];

  const responsive = {
    0: {
      items: 2,
    },
    600: {
      items: 4,
    },
  };

  const fetchTrendingCoinsApi = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoinsApi(currency);
  }, [currency]);

  return (
    <div className="bannerPage">
      <Container className="bannerContainer">
        <div className="tagLine">
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto World
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              fontSize: "0.85rem",
            }}
          >
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </div>
        {trending && (
          <div className="carouselClass">
            <Carousel
              mouseTracking
              infinite
              items={images}
              autoPlay
              autoPlayInterval={1000}
              animationDuration={1500}
              disableDotsControls
              disableButtonsControls
              responsive={responsive}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default Banner;
