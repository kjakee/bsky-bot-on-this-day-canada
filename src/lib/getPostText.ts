import axios from 'axios';
import OpenAI from "openai";

const openai = new OpenAI();

export default async function getPostText() {
  
    const response = await axios.get('https://www.onthisday.com/today/canadian-history.php');
    const users = response.data;


 const stream = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "write a tweet with maximum two bullet points from " + response.data + " within 250 characters. Include only hashtags #History #Canada #OnThisDay #CanadaHistory"}],
  stream: true,
});
var tweetString = '';
for await (const chunk of stream) {
  tweetString = tweetString + (chunk.choices[0]?.delta?.content || "");
  //process.stdout.write(chunk.choices[0]?.delta?.content || "");
}
  // Generate the text for your post here. You can return a string or a promise that resolves to a string
  return tweetString;
}
