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
  "Dropped your headphones in the puddle? Monday strikes again. 🎧💧 #BlameItOnMonday",

  "Phone just slipped out of your hand for no reason? Must be Monday's doing. 📱 #BlameItOnMonday",

  "Of course, your favorite mug shattered today. It’s Monday magic. ☕ #BlameItOnMonday",

  "Put your shirt on inside-out? Monday's been busy. 👕 #BlameItOnMonday",

  "Left the house without your keys? Monday probably hid them. 🔑 #BlameItOnMonday",

  "Why does the heater break down on the coldest Monday? 🥶 #BlameItOnMonday",

  "Left the fridge door open overnight? Classic Monday mistake. 🥛 #BlameItOnMonday",

  "Burned the popcorn? Monday’s working overtime. 🍿 #BlameItOnMonday",

  "Ran out of toothpaste this morning? Yep, it’s a Monday thing. 🪥 #BlameItOnMonday",

  "Just stubbed your toe AGAIN? Monday won’t quit. 🦶 #BlameItOnMonday",

  "Of course, your zipper got stuck on Monday. 🚪 #BlameItOnMonday",

  "Microwave meal exploded everywhere? Monday’s having fun. 🍲 #BlameItOnMonday",

  "Hit every red light on the way to work? Yep, Monday is real. 🚦 #BlameItOnMonday",

  "Forgot to feed the pet? Monday’s toying with your memory. 🐾 #BlameItOnMonday",

  "Woke up with a sore neck? Monday’s sneak attack. 💆‍♂️ #BlameItOnMonday",

  "Left your phone charger at home? Monday’s being sneaky. 🔌 #BlameItOnMonday",

  "Lost a page from your notebook? Monday’s definitely involved. 📓 #BlameItOnMonday",

  "Forgot to set an alarm? Monday overslept too. ⏰ #BlameItOnMonday",

  "Accidentally spilled milk everywhere? That’s pure Monday. 🥛 #BlameItOnMonday",

  "Can’t remember your passwords today? Monday’s mind games. 🔐 #BlameItOnMonday",

  "Your screen protector cracked on its own? Monday strikes once more. 📱 #BlameItOnMonday",

  "Your shoelaces keep coming untied? Monday’s prank. 👟 #BlameItOnMonday",

  "Of course, the faucet starts leaking today. It’s Monday’s fault. 🚰 #BlameItOnMonday",

  "Missed the deadline by one minute? Monday doesn’t care. ⏳ #BlameItOnMonday",

  "Got toothpaste on your shirt? Monday did it. 🪥👕 #BlameItOnMonday",

  "Turned off your alarm in your sleep? Monday mind control. 💤 #BlameItOnMonday",

  "Laundry shrunk your favorite shirt? Monday’s a trickster. 👚 #BlameItOnMonday",

  "Your glasses keep slipping off? Blame it on Monday. 👓 #BlameItOnMonday",

  "Your favorite snack is mysteriously gone? Monday stole it. 🍪 #BlameItOnMonday",

  "Lost your ID badge? Classic Monday prank. 🎫 #BlameItOnMonday",

  "Just realized you wore mismatched shoes? That’s Monday for you. 👠👢 #BlameItOnMonday",

  "Coffee spill on your paperwork? Monday’s got a vendetta. ☕📄 #BlameItOnMonday",

  "Battery died on every single remote? Guess what day it is? 📺 #BlameItOnMonday",

  "Accidentally texted your boss something meant for your friend? Thanks, Monday. 📱 #BlameItOnMonday",

  "Bumped into every corner in your house? It’s Monday’s obstacle course. 🏠 #BlameItOnMonday",

  "Missed an important call? Monday’s interference. 📞 #BlameItOnMonday",

  "Water splashed all over your face while washing hands? Monday has no chill. 🚿 #BlameItOnMonday",

  "Hit your head on a cabinet? It’s Monday physics. 🧠 #BlameItOnMonday",

  "Forgot to bring your notebook to the meeting? Monday strikes again. 📝 #BlameItOnMonday",

  "Your water bottle spilled in your bag? Monday’s plotting. 💧 #BlameItOnMonday",

  "Locked your car keys in the car? Of course, it’s Monday. 🚗 #BlameItOnMonday",

  "Printer won’t stop printing blank pages? Thanks, Monday. 🖨️ #BlameItOnMonday",

  "Ever notice your apps crash more on Mondays? 📱 #BlameItOnMonday",

  "The elevator’s on every floor but yours? Must be Monday. 🚪 #BlameItOnMonday",

  "Lost track of time scrolling? Monday's to blame. ⏳ #BlameItOnMonday",

  "Accidentally deleted the wrong email? Monday’s behind it. 📨 #BlameItOnMonday",

  "Lost your train of thought mid-sentence? Thanks, Monday. 🤔 #BlameItOnMonday",

  "Can’t find the TV remote? Monday’s hiding it. 📺 #BlameItOnMonday",

  "The stapler jammed when you needed it most? Monday strikes again. 📎 #BlameItOnMonday",

  "Took the wrong exit? Monday’s on the road with you. 🛣️ #BlameItOnMonday",

  "Got disconnected mid-call? Monday’s messing with your reception. 📱 #BlameItOnMonday",

  "Cut yourself opening a package? Monday’s keeping you on edge. 📦 #BlameItOnMonday",

  "Paper cut on the first page? Monday’s handiwork. 📄 #BlameItOnMonday",

  "Forgot your password? Monday messed with your memory. 🔑 #BlameItOnMonday",

  "Your order got mixed up? Must be Monday chaos. 🍔 #BlameItOnMonday",

  "Your favorite song skipped on the radio? Yep, Monday’s involved. 🎶 #BlameItOnMonday",

  "Headphones mysteriously tangled in your bag? Monday’s sabotage. 🎧 #BlameItOnMonday",

  "The shower went cold mid-shampoo? Monday’s cold-hearted. 🚿 #BlameItOnMonday",

  "The delivery person came while you were out? Monday’s prank. 🚚 #BlameItOnMonday",

  "Dropped your phone under the couch? Monday’s magnetic pull. 📱 #BlameItOnMonday",

  "Opened the fridge, forgot why? Monday’s mind games. 🧠 #BlameItOnMonday",

  "Accidentally hit 'reply all'? Thanks, Monday. 📧 #BlameItOnMonday",
  "Ran out of gas on your way to work? Monday must have siphoned it. ⛽ #BlameItOnMonday",

  "Your coffee was too weak? Monday's playing tricks on the barista. ☕ #BlameItOnMonday",

  "Why did you forget to turn off your alarm on your day off? Only Monday would be this cruel. ⏰ #BlameItOnMonday",

  "The AC broke down during a heatwave? Monday’s got you sweating. 🌞 #BlameItOnMonday",

  "Spilled ketchup on your shirt? Monday loves these stains. 🍔 #BlameItOnMonday",

  "Your credit card declined for no reason? Monday and finances don’t mix. 💳 #BlameItOnMonday",

  "Broke your shoelace while tying it? Monday must have sabotaged it. 👟 #BlameItOnMonday",

  "Accidentally deleted an important file? Monday’s digital prank. 💻 #BlameItOnMonday",

  "Your car radio only plays commercials today? It’s a Monday conspiracy. 📻 #BlameItOnMonday",

  "Dropped your toothbrush in the sink? Monday’s all about inconvenience. 🪥 #BlameItOnMonday",

  "The ATM ran out of cash? Mondays are in charge of restocking. 💵 #BlameItOnMonday",

  "Lost your place in your book? Monday’s got a way of ruining stories. 📖 #BlameItOnMonday",

  "The batteries died in your remote? Monday’s handiwork. 🕹️ #BlameItOnMonday",

  "Left your lights on and drained your car battery? Classic Monday sabotage. 🔋 #BlameItOnMonday",

  "You ran out of milk after pouring cereal? Monday’s breakfast prank. 🥣 #BlameItOnMonday",

  "Had an awkward encounter with your neighbor? Monday strikes in the strangest ways. 🏠 #BlameItOnMonday",

  "Forgot to defrost dinner? Monday’s idea of meal planning. 🍲 #BlameItOnMonday",

  "The weather app lied about sunshine? Monday controls the forecast. ☀️ #BlameItOnMonday",

  "Woke up to find all your pens missing? Monday hoards stationary. 🖊️ #BlameItOnMonday",

  "You missed that super important call? Yep, that’s Monday. 📞 #BlameItOnMonday",

  "The faucet started leaking? Monday’s having plumbing issues. 🚰 #BlameItOnMonday",

  "Why did you suddenly get a headache? Monday’s just getting started. 💆 #BlameItOnMonday",

  "The only parking space left is miles away? Thank Monday for that cardio. 🚶 #BlameItOnMonday",

  "Overslept and forgot your morning run? That’s Monday’s workout plan. 🏃 #BlameItOnMonday",

  "The news was extra depressing? Monday’s got a hand in that. 📰 #BlameItOnMonday",

  "Lost your glasses on your head? Monday plays mind games. 🤓 #BlameItOnMonday",

  "Spilled sauce on your keyboard? Monday loves messy workspaces. 🍝 #BlameItOnMonday",

  "Unexplained phone call in the middle of the night? Monday’s ghosting. 📞 #BlameItOnMonday",

  "Tripped over nothing? Monday’s invisible traps are everywhere. 👟 #BlameItOnMonday",

  "Forgot your headphones? Monday hates music too. 🎶 #BlameItOnMonday",

  "Your favorite snack tasted off? Monday's messing with flavor now. 🍫 #BlameItOnMonday",

  "Got ink all over your hands? Monday and pens don’t get along. 🖊️ #BlameItOnMonday",

  "The last donut is gone? Monday took it. 🍩 #BlameItOnMonday",

  "Got ghosted by your weekend plans? Monday’s revenge. 👻 #BlameItOnMonday",

  "The floor is extra squeaky today? Only on a Monday. 🏠 #BlameItOnMonday",

  "Accidentally wore two different shoes? Yep, it's Monday's influence. 👞👟 #BlameItOnMonday",

  "Every door is harder to open? Monday's making things difficult. 🚪 #BlameItOnMonday",

  "Misplaced your charger? Monday likes to play hide and seek. 🔌 #BlameItOnMonday",

  "The line at the coffee shop is out the door? Monday knows. ☕ #BlameItOnMonday",

  "Stubbed your toe on the bed again? Monday rearranged the room. 🛏️ #BlameItOnMonday",

  "You accidentally ate expired yogurt? Monday won’t let you read dates. 🍦 #BlameItOnMonday",

  "Got your headphones yanked by a doorknob? Monday’s grip is strong. 🎧 #BlameItOnMonday",

  "Forgot to pack lunch? Monday’s hunger games. 🍱 #BlameItOnMonday",

  "Your bag strap broke? Monday’s just adding weight to your day. 👜 #BlameItOnMonday",

  "Every elevator is packed today? Monday’s got people stacked. 🚪 #BlameItOnMonday",

  "Your coworker is extra chatty? Monday encourages small talk. 💬 #BlameItOnMonday",

  "Lost your train of thought mid-sentence? Monday’s playing mind tricks. 🧠 #BlameItOnMonday",

  "Your favorite mug broke? It’s like Monday’s targeting happiness. ☕ #BlameItOnMonday",

  "The microwave left cold spots in your food? Monday's not done. 🍲 #BlameItOnMonday",

  "Missed a sale by one day? Monday's timing is impeccable. 🛍️ #BlameItOnMonday",

  "Lost a sock in the dryer? Monday eats clothes too. 🧦 #BlameItOnMonday",

  "The paper shredder jammed? Monday just hates documents. 🗃️ #BlameItOnMonday",

  "Your favorite show’s season finale is delayed? Monday hates suspense. 📺 #BlameItOnMonday",

  "The pen you needed just ran out? Monday enjoys frustration. 🖋️ #BlameItOnMonday",

  "Coffee shop ran out of your order? Monday’s got poor timing. ☕ #BlameItOnMonday",

  "Left your wallet at home? Monday's your personal forgetfulness assistant. 💳 #BlameItOnMonday",

  "Phone battery is dying faster? Monday’s testing your patience. 🔋 #BlameItOnMonday",

  "Accidentally used fabric softener instead of detergent? Monday, again. 🧺 #BlameItOnMonday",

  "Your cereal got soggy? Monday and milk don't mix. 🥣 #BlameItOnMonday",
  "Why is the wifi so slow today? Monday’s throttling connections. 📶 #BlameItOnMonday",

  "Printer ran out of ink mid-report? Monday and tech don’t get along. 🖨️ #BlameItOnMonday",

  "Lost your last bobby pin? Monday’s collecting hair accessories. 💇 #BlameItOnMonday",

  "Stubbed your toe on the way to the kitchen? Monday moves furniture at night. 🛋️ #BlameItOnMonday",

  "Accidentally used salt instead of sugar? Monday’s cooking tips. 🧂 #BlameItOnMonday",

  "You’ve got a case of the hiccups? Monday loves a laugh. 🫢 #BlameItOnMonday",

  "Phone slipped out of your hand? Monday makes things slippery. 📱 #BlameItOnMonday",

  "Spilled ink on your favorite shirt? Monday’s a fan of stains. 🖋️ #BlameItOnMonday",

  "That one fly keeps buzzing around you? Monday’s pest control. 🪰 #BlameItOnMonday",

  "Why did your shoelace untie itself? Monday hates secure knots. 👟 #BlameItOnMonday",

  "The battery in your remote died mid-show? Monday loves cliffhangers. 📺 #BlameItOnMonday",

  "Heard your alarm clock but ignored it? Monday’s singing a lullaby. 🛌 #BlameItOnMonday",

  "Lost your favorite earring? Monday’s treasure hunting. 💎 #BlameItOnMonday",

  "Dropped your pizza topping-down? Monday’s got a taste for sabotage. 🍕 #BlameItOnMonday",

  "Accidentally left your keys in the car? Monday likes a locked door. 🚗 #BlameItOnMonday",

  "That random headache showed up? Monday’s tension game is strong. 🤕 #BlameItOnMonday",

  "Tripped on a flat surface? Monday adds invisible bumps. 🚶 #BlameItOnMonday",

  "The oven timer mysteriously reset? Monday’s messing with time. ⏲️ #BlameItOnMonday",

  "Misread a text and caused confusion? Monday’s cryptic communication. 📲 #BlameItOnMonday",

  "Every public restroom is occupied? Monday's restroom rush. 🚻 #BlameItOnMonday",

  "Left your shopping list at home? Monday’s forgetful spell. 📝 #BlameItOnMonday",

  "Accidentally dropped your change? Monday’s pickpocketing. 💰 #BlameItOnMonday",

  "The bus just left without you? Monday’s the driver today. 🚌 #BlameItOnMonday",

  "Found a crack in your phone screen? Monday leaves souvenirs. 📱 #BlameItOnMonday",

  "The water heater stopped working? Monday’s ice bath special. 🚿 #BlameItOnMonday",

  "Spilled coffee right after pouring it? Monday says no caffeine today. ☕ #BlameItOnMonday",

  "Forgot to charge your phone overnight? Monday’s on battery patrol. 🔋 #BlameItOnMonday",

  "Can’t find the remote? Monday’s hiding it in plain sight. 📺 #BlameItOnMonday",

  "Got an unexpected bill in the mail? Monday handles finances too. 💸 #BlameItOnMonday",

  "Burned your toast? Monday’s culinary touch. 🍞 #BlameItOnMonday",

  "Internet went out mid-meeting? Monday likes silent calls. 💻 #BlameItOnMonday",

  "Missed your turn on GPS? Monday’s your new navigator. 🗺️ #BlameItOnMonday",

  "A package was delayed? Monday’s in charge of logistics now. 📦 #BlameItOnMonday",

  "Spilled water on your laptop? Monday loves a tech mishap. 💧 #BlameItOnMonday",

  "Your charger broke at the worst time? Monday’s got timing down. 🔌 #BlameItOnMonday",

  "Burned your tongue on hot soup? Monday’s dining tip: patience. 🍲 #BlameItOnMonday",

  "Found a bug in your code you swore wasn’t there? Monday writes its own code. 💻 #BlameItOnMonday",

  "Microwave refused to start? Monday’s tech troubles. ☢️ #BlameItOnMonday",

  "Dropped your keys down a grate? Monday’s got a key collection. 🔑 #BlameItOnMonday",

  "Your boss scheduled an early meeting? Monday’s a morning person. 🕗 #BlameItOnMonday",

  "Why did your favorite pen just die? Monday’s creativity killer. 🖊️ #BlameItOnMonday",

  "Ran into someone you were avoiding? Monday’s social surprise. 😬 #BlameItOnMonday",

  "Put your shirt on backward? Monday styles you. 👕 #BlameItOnMonday",

  "Lost a sock in the laundry? Monday’s closet gremlin. 🧦 #BlameItOnMonday",

  "Got lost while walking a familiar route? Monday’s map mischief. 🗺️ #BlameItOnMonday",

  "The last slice of cake vanished? Monday’s got a sweet tooth. 🍰 #BlameItOnMonday",

  "That one song you hate keeps playing? Monday’s DJ-ing. 🎶 #BlameItOnMonday",

  "Stray hair that won’t stay in place? Monday's hairstyling. 💁 #BlameItOnMonday",

  "Left the house only to realize you forgot something? Monday’s checklist is blank. 📝 #BlameItOnMonday",

  "The elevator was out of order? Monday says take the stairs. 🚶 #BlameItOnMonday",

  "Hit every red light on your way in? Monday’s got the traffic lights. 🚦 #BlameItOnMonday",

  "Accidentally activated Siri or Google? Monday’s listening in. 🎙️ #BlameItOnMonday",

  "You missed out on a sale by hours? Monday doesn’t do discounts. 🛒 #BlameItOnMonday",

  "Dropped your open snack on the floor? Monday says five-second rule. 🍫 #BlameItOnMonday",

  "Found a smudge on your glasses right before an important read? Monday blurs the lines. 🤓 #BlameItOnMonday",

  "The movie you wanted to watch is no longer streaming? Monday manages content now. 🎥 #BlameItOnMonday",

  "Got stuck behind a slow walker? Monday’s pace, Monday’s rules. 🚶 #BlameItOnMonday",

  "Printer jammed during an urgent print job? Monday’s quality control. 🖨️ #BlameItOnMonday",

  "Fell asleep on the bus and missed your stop? Monday rocks you to sleep. 🚌 #BlameItOnMonday",

  "Got a paper cut? Monday’s mark of the day. 📄 #BlameItOnMonday",

  "Your phone’s autocorrect is worse today? Monday programs it. 📲 #BlameItOnMonday",

  "The playlist keeps skipping your favorite songs? Monday DJ skips. 🎶 #BlameItOnMonday",

  "Why did your shampoo bottle run out mid-shower? Monday, that’s why. 🚿 #BlameItOnMonday",
  "Stepped on a LEGO? Monday set the trap. 🧩 #BlameItOnMonday",

  "All your socks have holes in them today? Monday doesn’t sew. 🧦 #BlameItOnMonday",

  "The coffee machine broke down at work? Monday prefers decaf. ☕ #BlameItOnMonday",

  "Accidentally replied-all to an email? Monday presses send for you. 📧 #BlameItOnMonday",

  "Got tangled in your headphones? Monday knots them up. 🎧 #BlameItOnMonday",

  "Burned the popcorn in the microwave? Monday's movie snack hack. 🍿 #BlameItOnMonday",

  "Why do all your pens suddenly run out of ink? Monday's ink boycott. 🖋️ #BlameItOnMonday",

  "The lightbulb went out when you needed it most? Monday loves the dark. 💡 #BlameItOnMonday",

  "Found an expired coupon in your wallet? Monday missed the sale. 💳 #BlameItOnMonday",

  "Hit your funny bone? Monday's tickling tactic. 🦴 #BlameItOnMonday",

  "Can’t find your favorite mug? Monday’s taken it for coffee. ☕ #BlameItOnMonday",

  "Tried to catch something and missed? Monday’s making you butterfingers. 🖐️ #BlameItOnMonday",

  "Bluetooth connection keeps dropping? Monday’s signal interference. 📶 #BlameItOnMonday",

  "Left the fridge door open? Monday’s chilling out. 🥶 #BlameItOnMonday",

  "Can’t find a parking spot? Monday’s got all the spaces reserved. 🚗 #BlameItOnMonday",

  "Got a splinter? Monday’s got woodwork skills. 🌲 #BlameItOnMonday",

  "Why is your phone updating right now? Monday schedules the updates. 📱 #BlameItOnMonday",

  "Lost a file you swore you saved? Monday’s a file thief. 💾 #BlameItOnMonday",

  "Your favorite app keeps crashing? Monday’s rewriting the code. 📲 #BlameItOnMonday",

  "Accidentally deleted an important photo? Monday’s memory wipe. 🖼️ #BlameItOnMonday",

  "Got rained on without an umbrella? Monday’s weather planner. ☔ #BlameItOnMonday",

  "Stepped in gum? Monday’s street surprise. 👞 #BlameItOnMonday",

  "Phone’s charging slower than usual? Monday’s draining the volts. 🔋 #BlameItOnMonday",

  "Lost your favorite playlist? Monday prefers silence. 🎵 #BlameItOnMonday",

  "The zipper on your bag just broke? Monday hates closures. 🎒 #BlameItOnMonday",

  "Missed a call you were waiting for? Monday hit decline. 📞 #BlameItOnMonday",

  "Forgot your lunch at home? Monday’s doing intermittent fasting. 🥪 #BlameItOnMonday",

  "Ran out of toothpaste? Monday’s dental day off. 🪥 #BlameItOnMonday",

  "Unexpected traffic jam? Monday's roadblock creation. 🚗 #BlameItOnMonday",

  "Dropped your phone on your face in bed? Monday’s gravity boost. 📱 #BlameItOnMonday",

  "Chipped a nail? Monday’s manicure sabotage. 💅 #BlameItOnMonday",

  "Why did your coffee spill on your paperwork? Monday's caffeine calamity. ☕ #BlameItOnMonday",

  "The last piece of cake is gone? Monday’s a dessert fiend. 🍰 #BlameItOnMonday",

  "Why do your pants feel tighter? Monday’s got the munchies. 🍟 #BlameItOnMonday",

  "Accidentally double-booked? Monday’s schedule chaos. 📅 #BlameItOnMonday",

  "Your favorite song skipped on shuffle? Monday’s remix edition. 🎶 #BlameItOnMonday",

  "Lost track of time? Monday keeps no clock. ⏰ #BlameItOnMonday",

  "Got a stain on your favorite shirt? Monday’s a fan of abstract art. 👕 #BlameItOnMonday",

  "Found out there’s a meeting in 5 minutes? Monday loves surprises. 🕒 #BlameItOnMonday",

  "Dropped your wallet right as the bus arrived? Monday’s slip-n-slide. 🚎 #BlameItOnMonday",

  "Burned yourself with hot tea? Monday’s anti-relaxation policy. 🍵 #BlameItOnMonday",

  "The GPS took you the long way? Monday’s scenic route. 🗺️ #BlameItOnMonday",

  "The batteries in your remote died? Monday’s remote control monopoly. 🔋 #BlameItOnMonday",

  "Why did your alarm stop working? Monday’s no-snooze policy. ⏰ #BlameItOnMonday",

  "The vending machine ate your money? Monday’s snack sabotage. 🍫 #BlameItOnMonday",

  "Locked yourself out of your account? Monday’s password protection. 🔐 #BlameItOnMonday",

  "Your screen froze mid-presentation? Monday’s freeze frame. 💻 #BlameItOnMonday",

  "That itch you can’t scratch? Monday’s invisible tickle. 🤨 #BlameItOnMonday",

  "Got ghosted by customer support? Monday’s customer care caper. 📞 #BlameItOnMonday",

  "Why did your phone randomly restart? Monday’s reboot. 📱 #BlameItOnMonday",

  "Forgot to reply to that important message? Monday’s memory lapse. 📲 #BlameItOnMonday",

  "Why is there a mystery charge on your credit card? Monday’s got shopping fever. 💳 #BlameItOnMonday",

  "Your charger stopped working overnight? Monday’s unplugged. 🔌 #BlameItOnMonday",

  "Laptop died right before you saved? Monday’s tech tantrum. 💻 #BlameItOnMonday",

  "You put something down and now it’s gone? Monday’s vanishing act. ✨ #BlameItOnMonday",

  "Tripped over your own feet? Monday’s balance beam. 🏃 #BlameItOnMonday",

  "Paper jam at work? Monday’s arts and crafts hour. 📄 #BlameItOnMonday",

  "Lost your train of thought mid-conversation? Monday derailed it. 🚂 #BlameItOnMonday",

  "Got a ticket for a late payment? Monday’s penalty point. 💵 #BlameItOnMonday",

  "Why is every pen on your desk dried out? Monday’s ink ban. 🖊️ #BlameItOnMonday",

  "Wi-Fi went down at the worst moment? Monday’s connection control. 🌐 #BlameItOnMonday",

  "Why did your soup boil over? Monday’s chef special. 🥄 #BlameItOnMonday",

  "Knocked over a water bottle onto your papers? Monday’s hydration habit. 💦 #BlameItOnMonday",

  "Every elevator is on a different floor? Monday’s slow ride. 🛗 #BlameItOnMonday",

  "Why is every chair you try uncomfortable? Monday’s ergonomic rebellion. 💺 #BlameItOnMonday",

  "Just missed the last metro of the day? Monday’s timing. 🚉 #BlameItOnMonday",

  "The takeout place is out of your favorite dish? Monday’s hunger games. 🍜 #BlameItOnMonday",

  "Why are you in the longest line at the store? Monday’s checkout challenge. 🛒 #BlameItOnMonday",

  "Got mud on your shoes? Monday’s landscape decor. 👞 #BlameItOnMonday",

  "The power went out during your favorite show? Monday’s blackout. 🎥 #BlameItOnMonday",

  "Ran out of gas right before the station? Monday’s fuel economy fail. ⛽ #BlameItOnMonday",

  "Headphones stopped working mid-song? Monday’s radio silence. 🎧 #BlameItOnMonday",

  "Can’t open a jar? Monday’s closed-door policy. 🥫 #BlameItOnMonday",

  "Spilled a drop of coffee on a new book? Monday’s bookmark. 📚 #BlameItOnMonday"
];


const usedBlames = new Set();

async function createTweet() {
  const availableBlames = blames.filter(blame => !usedBlames.has(blame));
  
  if (availableBlames.length === 0) {
    usedBlames.clear();
  }
  
  const index = Math.floor(Math.random() * availableBlames.length);
  const tweetText = availableBlames[index];
  
  let client = getClient();
  try {
    await client.v2.tweet(tweetText);
    console.log(`Tweeted this: ${tweetText}`);
    
    usedBlames.add(tweetText);
  } catch (error) {
    console.error("Error tweeting:", error);
  }
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
