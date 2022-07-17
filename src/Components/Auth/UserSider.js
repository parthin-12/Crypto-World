import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Avatar, Button } from "@material-ui/core";
import { CryptoState } from "../CryptoCurrency";
import "./UserSlider.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

function functionForPrice(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function UserSider() {
  const { user, watchlist, coins, symbol } = CryptoState();

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logoutBtnHandler = () => {
    signOut(auth);
    toast.success("Logout successfully");
    toggleDrawer();
  };

  const removeFromWatchList = async (coin) => {
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

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "white",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className="userSiderContainer">
              <div className="profile">
                <Avatar
                  id="avatarImg"
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span>{user.displayName || user.email}</span>
                <div className="watchList">
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((e) => {
                    if (watchlist.includes(e.id)) {
                      return (
                        <div className="watchlistCoin">
                          <span>{e.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}
                            {functionForPrice(e.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchList(e)}
                            />
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                id="logoutBtn"
                onClick={logoutBtnHandler}
              >
                Logout
              </Button>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export default UserSider;
