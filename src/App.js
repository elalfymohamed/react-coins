// React-router-dom v4
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// ComponentS
import CoinDetailPage from "./pages/CoinDetailPage";
import CoinSummaryPage from "./pages/CoinSummaryPage";
import Header from "./components/Header";
import PortfolioPage from "./pages/PortfolioPage";

//
import { WatchListProvider } from "./context/watchListContext";

function App() {
  return (
    <WatchListProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={CoinSummaryPage} />
          <Route path="/portfolioPage" component={PortfolioPage} />
          <Route path="/coins/:id" component={CoinDetailPage} />
        </Switch>
      </Router>
    </WatchListProvider>
  );
}

export default App;
