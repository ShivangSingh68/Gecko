import Firecrawl from "firecrawl";
import { writeFile, createWriteStream, writeFileSync } from "node:fs";
import "dotenv/config";

let client: Firecrawl | null = null;

function getClient() {
  if (client) return client;
  client = new Firecrawl({
    apiKey: process.env.FIRECRAWL_API_KEY!,
  });
  return client;
}

async function main() {
  // let searchResult = await getClient().search("Batman 4k images", {sources: ["images"]});
  // searchResult = JSON.parse(searchResult as string)
  // let scrapeResult = await getClient().scrape("https://rustjobs.dev/");
  const client = getClient();
  const { id } = await client.startCrawl("https://rustjobs.dev/", {
    limit: 10,
    includePaths: ["jobs"],
  });
  const watcher = client.watcher(id, {kind: "crawl", pollInterval: 2, timeout: 120});

  watcher.on('document', (doc) => {
    console.log("Doc", doc);
  });

  watcher.on("error", (err) => {
    console.error("ERR", err?.error || err);
  });

  watcher.on("done", (state) => {
    console.log("DONE", state.status);
  })
//   const status = await getClient().getCrawlStatus(crawlResponse.id);
//   console.log(status);
//   // scrapeResult = JSON.parse(scrapeResult as string);
//   let output = `Videos: ${JSON.stringify(crawlResponse, null, 2)}`;
//   writeFileSync("./result.txt", output);

await watcher.start();
}
await main();
