const express = require("express");
const { TwitterApi } = require("twitter-api-v2");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const appKey = process.env.CONSUMER_KEY;
const appSecret = process.env.CONSUMER_SECRET;
const accessToken = process.env.ACCESS_TOKEN;
const accessSecret = process.env.ACCESS_SECRET;

function getClient() {
  return new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  });
}

const blames = [
  "Burned your breakfast toast? Classic Monday move. 🔥🍞 #BlameItOnMonday",

  "Got stuck in traffic for an hour? You already know who to blame. 🚗 #BlameItOnMonday",

  "Sent that email to the wrong person? Monday strikes again! 📧 #BlameItOnMonday",

  "Your favorite show got canceled? Thanks a lot, Monday. 📺 #BlameItOnMonday",

  "Tripped over your shoelaces? Must be the Monday effect. 👟 #BlameItOnMonday",

  "Forgot your wallet at home? Yup, that's Monday's doing. 😩 #BlameItOnMonday",

  "Why is the Wi-Fi always down on Mondays? Coincidence? I think not. 💻 #BlameItOnMonday",

  "Late for a meeting because your coffee spilled? Thanks for nothing, Monday. ☕ #BlameItOnMonday",

  "The microwave just exploded. Guess what day it is? 🔥 #BlameItOnMonday",

  "Lost your keys again? Monday's out to get you. 🔑 #BlameItOnMonday",

  "The copier jammed... and it's only Monday morning. 🖨️ #BlameItOnMonday",

  "Dogs always bark louder on a Monday. 🐕 #BlameItOnMonday",

  "Lost the remote? Monday's got it. 📺 #BlameItOnMonday",

  "Your favorite lunch spot closed early? Oh look, it's Monday again. 🍔 #BlameItOnMonday",

  "Someone ate your leftovers? Monday is to blame. 🍕 #BlameItOnMonday",

  "Your phone died in the middle of a call? It’s gotta be Monday. 📱 #BlameItOnMonday",

  "Misread the time and missed your meeting? Classic Monday mistake. ⏰ #BlameItOnMonday",

  "Why does every bad thing start on a Monday? 🌧️ #BlameItOnMonday",

  "Even the sun looks tired on a Monday. ☀️ #BlameItOnMonday",

  "Still can't find that one sock? Monday stole it. 🧦 #BlameItOnMonday",

  "Took the wrong train this morning? You know who to thank. 🚉 #BlameItOnMonday",

  "Lost your parking spot at work? Monday strikes again. 🅿️ #BlameItOnMonday",

  "Of course the printer's out of ink. Why wouldn't it be? 🖨️ #BlameItOnMonday",

  "Why is the coffee machine broken every Monday? ☕ #BlameItOnMonday",

  "Broke your phone screen on a Monday? Yep, that checks out. 📱 #BlameItOnMonday",

  "Laundry day gone wrong? Must be Monday’s fault. 🧺 #BlameItOnMonday",

  "Got rained on the second you stepped outside? Ugh, Monday. 🌧️ #BlameItOnMonday",

  "Your internet just lagged during your presentation? Monday ruins everything. 🌐 #BlameItOnMonday",

  "Missed the last train home? Of course, it's Monday. 🚋 #BlameItOnMonday",

  "Tried to start the car and it won’t start? Typical Monday move. 🚗 #BlameItOnMonday",

  "Your cat knocked over your coffee again? Monday vibes. 🐈 #BlameItOnMonday",

  "Accidentally sent a message to the wrong group chat? Monday strikes again. 📱 #BlameItOnMonday",

  "Got stuck in the rain with no umbrella? Who else but Monday? 🌧️ #BlameItOnMonday",

  "Burnt your tongue on hot soup? Blame Monday for that. 🍲 #BlameItOnMonday",

  "Dropped your phone in the toilet? No surprise... it's Monday. 💧 #BlameItOnMonday",

  "Stepped in gum? Why does this always happen on a Monday? 👞 #BlameItOnMonday",

  "Your alarm clock didn’t go off? Monday messed with it. ⏰ #BlameItOnMonday",

  "Why does my printer hate me on Mondays? 🖨️ #BlameItOnMonday",

  "Misread an important email? Typical Monday problem. 📧 #BlameItOnMonday",

  "Why does the fridge always run out of snacks on a Monday? 🍪 #BlameItOnMonday",

  "Stubbed your toe on the way to the kitchen? Damn you, Monday. 🦶 #BlameItOnMonday",

  "Why does my dog only ignore me on Mondays? 🐶 #BlameItOnMonday",

  "Your favorite pen ran out of ink? It had to be Monday. 🖊️ #BlameItOnMonday",

  "The vending machine stole your money? Monday strikes again. 🍫 #BlameItOnMonday",

  "Missed the bus by 10 seconds? Thanks for that, Monday. 🚌 #BlameItOnMonday",

  "Lost a document you just saved? Oh, it's Monday for sure. 💾 #BlameItOnMonday",

  "The elevator’s broken again? Must be Monday magic. 🚪 #BlameItOnMonday",

  "Ran out of hot water? I’m guessing Monday’s behind this. 🚿 #BlameItOnMonday",

  "Woke up with a bad hair day? Yeah, it’s Monday’s fault. 💇 #BlameItOnMonday",

  "Missed breakfast? Classic Monday move. 🥞 #BlameItOnMonday",

  "Accidentally called your boss 'mom'? Of course, it happened on a Monday. 👩‍💼 #BlameItOnMonday",

  "Your favorite shirt just ripped? Yep, that's Monday's fault. 👕 #BlameItOnMonday",

  "Found out your coffee is decaf after you drink it? Monday did this. ☕ #BlameItOnMonday",

  "Dropped your sandwich? Gravity’s just stronger on Mondays. 🥪 #BlameItOnMonday",

  "Accidentally put salt in your coffee? Monday at its finest. 🧂 #BlameItOnMonday",

  "The store’s out of your favorite snacks? Classic Monday behavior. 🍫 #BlameItOnMonday",

  "Your phone froze during an important text? Monday’s fault, clearly. 📱 #BlameItOnMonday",

  "Ever wonder why your headphones always get tangled on Mondays? 🎧 #BlameItOnMonday",

  "Forgot your umbrella and now it's raining? Thanks, Monday. ☔ #BlameItOnMonday",

  "Dropped your phone in the sink while washing dishes? Typical Monday disaster. 🧼 #BlameItOnMonday",

  "Of course the Wi-Fi only cuts out during your meeting. Guess what day it is? 🌐 #BlameItOnMonday",

  "Why does my car battery die on Mondays? 🚗 #BlameItOnMonday",

  "Lost your glasses for the third time today? Monday’s being extra today. 🤓 #BlameItOnMonday",

  "Your laptop restarted right before saving your work? Thanks, Monday. 💻 #BlameItOnMonday",

  "Spilled coffee all over your new outfit? The Monday curse is real. 👗☕ #BlameItOnMonday",

  "Ever notice how the office printer only breaks on Mondays? 🖨️ #BlameItOnMonday",

  "Missed your bus and now it’s raining? What a typical Monday scenario. ☔ #BlameItOnMonday",

  "Locked out of the house? Ugh, Monday strikes again. 🔑 #BlameItOnMonday",

  "You get to the vending machine, and it's out of everything good. Monday's evil. 🍬 #BlameItOnMonday",

  "Woke up with a pimple on picture day? Yup, that’s Monday for you. 📸 #BlameItOnMonday",

  "Misspelled your own name in an email? Monday’s pulling the strings. 📝 #BlameItOnMonday",

  "Stepped in a puddle on your way to work? Of course, it’s Monday. 💦 #BlameItOnMonday",

  "Burned the roof of your mouth on hot pizza? Leave it to Monday. 🍕🔥 #BlameItOnMonday",

  "Can’t find a single pen that works? Monday’s hoarding them. 🖊️ #BlameItOnMonday",

  "Forgot to charge your phone overnight? Thanks, Monday. 🔋 #BlameItOnMonday",

  "Ever notice how your socks always go missing on Mondays? 🧦 #BlameItOnMonday",

  "Coffee spilled in your car? It's like Monday is haunting you. 🚗☕ #BlameItOnMonday",

  "Phone autocorrected your text into nonsense? Yep, Monday's behind this. 📱 #BlameItOnMonday",

  "Your to-do list tripled overnight? Monday clearly hacked your life. 📋 #BlameItOnMonday",

  "Of course your flight gets delayed... it’s Monday. ✈️ #BlameItOnMonday",

  "Your screen froze during a movie? Monday won’t let you have nice things. 🎥 #BlameItOnMonday",

  "Locked yourself out of the gym locker? Monday's really working hard. 🏋️‍♂️ #BlameItOnMonday",

  "Of course the elevator’s out of order. Typical Monday. 🚪 #BlameItOnMonday",

  "The microwave timer is stuck again? Only on a Monday. 🍲 #BlameItOnMonday",

  "Had the wrong file open during your presentation? Yeah, that’s Monday's touch. 📑 #BlameItOnMonday",

  "Accidentally answered the phone with 'I love you'? Thanks a lot, Monday. ☎️ #BlameItOnMonday",

  "Forgot the grocery list at home? Monday’s been planning this all along. 🛒 #BlameItOnMonday",

  "The computer blue-screened right when you needed it most? Yeah, it’s Monday. 💻 #BlameItOnMonday",

  "Stepped on a LEGO? Monday’s attack plan is truly evil. 🧱 #BlameItOnMonday",

  "Cut yourself shaving? Monday loves these minor disasters. 🪒 #BlameItOnMonday",

  "Ever noticed your hair refuses to cooperate on Mondays? 💇 #BlameItOnMonday",

  "Your favorite coffee shop is closed for repairs? Thanks, Monday. ☕ #BlameItOnMonday",

  "Lost your favorite pen? Mondays are thieves. 🖊️ #BlameItOnMonday",

  "Your pet just knocked over your glass of water? Yep, Monday's messing with you. 🐕 #BlameItOnMonday",

  "Accidentally put on two different socks? Monday’s just showing off now. 🧦 #BlameItOnMonday",

  "Forgot to hit ‘send’ on that important email? Monday strikes again. 📧 #BlameItOnMonday",

  "Missed the trash pickup? Monday wins again. 🗑️ #BlameItOnMonday",

  "Forgot your lunch at home? Definitely Monday's doing. 🍱 #BlameItOnMonday",

  "Tripped walking upstairs? Monday’s got it out for you. 🪜 #BlameItOnMonday",

  "The office coffee machine is broken, of course. Thanks a lot, Monday. ☕ #BlameItOnMonday",
];

async function createTweet() {
  const index = Math.floor(Math.random() * blames.length);
  const tweetText = blames[index];
  let client = getClient();
  await client.v2.tweet(tweetText);
}

async function scheduleTweets() {
  const now = new Date();
  const minutes = now.getMinutes();
  if (minutes === 0 || minutes === 30) {
    await createTweet();
  }
}

async function InitProcess(params) {
  setInterval(scheduleTweets, 60000);
}

InitProcess();

app.get("/health-check", (_req, res) => {
  res.send("Ok");
});

app.listen(process.env.PORT, () => console.log("Server running"));
