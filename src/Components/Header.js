import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "./CryptoCurrency";
import "./Header.css";
import Auth from "./Auth/Auth";
import UserSidebar from "./Auth/UserSider.js";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Header() {
  const { currency, setCurrency, user } = CryptoState();
  const navigate = useNavigate();

  return (
    <div className="headerContainer">
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                onClick={() => navigate("/")}
                variant="h6"
                className="title"
              >
                <p>Crypto</p>
                <p>World</p>
              </Typography>
              {/* <Button color="inherit">Login</Button> */}
              <Select
                variant="outlined"
                id="demo-simple-select"
                value={currency}
                style={{
                  width: 100,
                  height: "2.8rem",
                  marginLeft: 15,
                }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"INR"}>INR</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
              </Select>
              {user ? <UserSidebar /> : <Auth />}
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default Header;
