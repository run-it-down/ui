import axios from 'axios';
import https from 'https';

// TODO: change to gateway when available
const BASE_URL = "https://core.run-it-down.lol"
const ANALYZE_PATH = "/analyze"
const CRAWL_PATH = "/crawl"

// const report = { "summoner1": {}, "summoner2": {} }

const agent = new https.Agent({
  rejectUnauthorized: false,
});

class ApiLayer {
  getReport (summoner, partner) {
    console.log("Retrieve report...")
    const config = {
      httpsAgent: agent
    }
    const pathVariables = [`summonerName=${summoner}`, `summonerNameBuddy=${partner}`]
    const response = axios.get(BASE_URL + ANALYZE_PATH + "?" + pathVariables.join("&"), config);
    return response;
  }
  crawlData (token, summoner, partner) {
    console.log("Collect data...")
    const config = {
      httpsAgent: agent,
      headers: {
        "X-RIOT-TOKEN": token
      }
    }
    const response = axios.post(BASE_URL + CRAWL_PATH, {
      "summonerName": summoner,
      "summonerNameBuddy": partner
    }, config)
    return response
  }
}

export default ApiLayer;