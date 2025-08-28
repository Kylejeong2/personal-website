---

title: "UCLA sent me a cease and desist"
date: "2025-01-15"

---

The LA wildfires in early 2025 were a crazy tragedy. People were losing the houses they grew up in, and rampant wildfires took over the news. For me, I'd just started winter quarter at UCLA, which was already super hectic. Early morning classes, trying to catch up with friends, and I was trying to get VEST (my startup club) off the ground. 

We were running events every other day and meeting tons of new people that wanted to join. There probably could not have been a crazier start to my year. 

<br/>

I had a feeling that the fires were going to get to us. The air was getting smoggier and I noticed AQI was hundreds above the healthy amount. My roommates and I listened to the news at night and saw the night sky burn a bright red from the fires. 

It didn't take long for UCLA to switch to online classes and I decided to drive back to the Bay Area to stay extra safe.

<br/>

### The Problem

Tracking the fires was a mess. If you wanted to know if we were going to be safe, you needed to check:

- **Multiple sources for AQI data**
    - PurpleAir sensors
    - Government air quality sites
    - Local weather stations

- **Different map services**
    - CalFire maps
    - News outlet fire trackers
    - Satellite imagery

- **Campus information**
    - Live camera feeds
    - Official alerts
    - Social media updates

All these separate sources made it hard to stay informed.

<br/>

### Building a Solution

I saw an opportunity to help. By aggregating all this data into one website, students and parents could have a single source for fire information.

I built an MVP in just a few hours (thanks Claude) using Next.js + Tailwind. Check it out here: [GitHub Repo](https://github.com/Kylejeong2/UCLA-Wildfires).(if you're lucky it might still be up at <a href="westwoodfires.org">westwoodfires.org<a/>)

Speed was the priority over perfect code - I just needed to ship something useful fast.

<br/>

### Launch

Launching on Monday (1/13) across multiple platforms, the site gained significant traction:
- **Reddit**: 400+ upvotes
<table>
  <tr>
    <td><img src="/blog/fires/reddit1.png" alt="Reddit Post 1" loading="lazy" width="100%" /></td>
    <td><img src="/blog/fires/reddit2.png" alt="Reddit Post 2" loading="lazy" width="100%" height="400px" /></td>
  </tr>
</table>

- **X (Twitter)**: 500k views
<table>
  <tr>
    <td><img src="/blog/fires/twitter1.png" alt="Tweet coverage 1" loading="lazy" width="100%" /></td>
    <td><img src="/blog/fires/twitter2.png" alt="Tweet coverage 2" loading="lazy" width="100%" height="400px" /></td>
  </tr>
</table>

- **LinkedIn**: 2k views
- **Instagram**: 1000+ views

Here's the [IG post](https://www.instagram.com/p/DE0wfuCyEnw/) describing the project.

An hour after launch though something crazy happened. The digital media coordinator at UCLA sent me a strongly worded email:

> "You need to take uclafire.org offline immediately. We are getting reports related to the site as it is creating confusion within our community and outside about UCLA's fire reporting and management. You cannot use UCLA's trademarks as you do not own, represent, nor have permission to use the mark in any form. This is highly improper especially during a time of crisis. Please take this down immediately."
> 

<br />

I was using technically using UCLA but not the exact logo so wasn't sure if that was okay. I responded asking if I could keep it up using a different name and they agreed. So I moved UCLA to Westwood (the area around the school) and continued to grow the site, pushing it on twitter, reddit, wherever I could think. 

The site actually went down halfway through the day from load and I remember pushing a fix while sitting in south park with some friends.  

One of the coolest moments that day was when a friend reached out and asked if I was the one behind the site. Her friend sent it to their groupchat to help them track what was going on and it's super cool that it spread full circle. 

By the end of the day I scaled to 1.3M requests and 40k users. That was insane. Real people were using my product and liking it. If I was able to help even one person, I was happy.

<br/>

#### Side Effects

Alongside the very "nice" letter from UCLA, many people reached out and wanted to help in any way they could: promoting the app, sending money to pay for hosting costs, etc.
For something I built with so little effort you'd be surprised at how many people wanted to hire me from this.

<br/>

### The Moral

The moral of the story is: you can just do things. Who cares what people say or think? It won't matter if no one sees your project. Build a working version and just ship it.

If I didn't push out the first version so fast, someone else would have beat me to it. I didn't care about the details (and using UCLA's name lol) and just put it in front of people's eyeballs. I received a lot of feedback and made changes accordingly as well as optimizations to save money.

*(shoutout to upstash for giving me free credits for this)*

<br/>

### The End

If you're currently a student at UCLA, apply to VEST.