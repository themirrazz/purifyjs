# purify.js
A JavaScript-based library that can read RSAC/RSACi and ICRA rating information, as well as PICS v1.1 HTTP headers and any RSACi/ICRA rating information embedded within them.

## What is ICRA?
ICRA was a self-applied rating system for websites. Instead of providing strict age ratings, the website would encode information about the type of content it contains - for example, language or nudity. However, it had more than just these top-level categories - it went into details, providing options like "deliberate damage to objects" (violence), "crude words or profanity" (language), and "bare buttocks" (nudity/sex) - categories that, to this day, are in some ways more comprehensive than existing rating systems. It even had the ability to select context (artistic, educational, medical, or sports). However, ICRA was only ever supported by Netscape Navigator and Internet Explorer - it was never supported by Chrome, Firefox, or Safari, hence its demise.

## What is RSAC/RSACi?
RSAC(i) is the predecessor to ICRA. It was also a self-applied rating system, but it only had four categories - violence, language, nudity, and sex. Each category had a value from 0 to 4, where "0" means "not present" and "4" means "explicit" or "intense". It also lacked context. The official ICRA tag generator (which no longer exists) often would also icnlude RSAC/RSACi tags in the resulting PICS header as a backup for browsers that didn't support ICRA.

## What is PICS?
PICS is a special HTTP header used to carry information about a website's rating. It is no longer used, but can still technically be sent. You can specify it either as an HTTP header, or via the use of a `<meta ... />` HTML tag. Here's the PICS data for my Nekoweb site:
```
(pics-1.1 "http://www.icra.org/ratingsv02.html" comment "ICRAonline EN v2.0" l gen true for "https://themirrazz.nekoweb.org" r (ne 1 ni 1 vb 1 vd 1 vh 1 vj 1 vk 1 lb 1 lc 1 od 1 oe 1 og 1 oh 1 cb 1) "http://www.rsac.org/ratingsv01.html" l gen true for "https://themirrazz.nekoweb.org" r (n 2 s 1 v 4 l 2))
```

## How to use purify.js?
It's simple! Just call `purify.parse(...)` and feed the PICS data into it. You'll get an array with all the data in it. If you just want to parse the ICRA or RSAC/i data directly, just call `purify.icra.decode(...)` or `purify.rsac.decode(...)`. You can see how the outputs will be structured [in `typings.d.ts`](src/typings.d.ts).

I'm planning on making a documentation for it ~~soon~~ eventually.

## Where can I use purify.js?
purify.js currently works in browsers as well as Node.JS. There's also a callable version that's minified and lets you put it into a single variable. (This is useful if you're in a limited environment, i.e. Windows 96, or just don't wanna pollute the global scope.) purify.js was also designed to be ES3-compliant, so *in theory* it should run perfectly fine on IE5+ (this has not been tested yet, I look forward to testing it ~~soon~~ eventually).
