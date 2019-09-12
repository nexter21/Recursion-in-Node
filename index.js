const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("agents.txt");

const alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

let alphArrLength = 0;

const getAgentsforAlphabet = number => {
  let alphabet = alphabets[number];
  request(
    `https://www.taan.org.np/pages/general-members/${alphabet}`,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $(".member-detail-link").each((i, el) => {
          const name = $(el)
            .find("a")
            .text();
          console.log(name);
          writeStream.write(`${name} \n`);
        });
        console.log("Scraping Done...", alphabet);
      }
      alphArrLength = alphArrLength + 1;
      if (alphArrLength != 26) {
        getAgentsforAlphabet(alphArrLength);
      } else {
        return;
      }
    }
  );
};

getAgentsforAlphabet(alphArrLength);
