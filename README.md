# Cory Booth's Pollywog Code Challenge featuring MIA

Hi guys.

You should be able to get it running with an ```npm install``` and an ```npm start```

The approach I took was pretty straight forward.  I wanted to keep it simple and clean, but hopefully have a little bit of the feel of the actual MIA website as well.  I had access to MIA's css file for their website through a hack-a-thon I did, and I was very excited to be able to use their font.  I used the Material UI Gridlist for the main part of the app, which I think has a very orginized, clean look that I really like for galleries.

I started off with Create React App and built up from there.  I decided pretty early to use redux for the api info storage and I feel like that worked pretty well.  I mostly designed the layout for a browser, but I tweaked a couple things so it also looks decent on mobile (or at the least the mobile view in Chrome).

I built it in stages starting with the base features and then moving on to the bonus criteria.  I admittedly got a little hack-y with some of the bonus features.  In the service of moving quickly, I made the "star" feature very simple and do not currently have a way to "unstar" the artworks.

I chose to have the permalink art info page show related works in the same department and was happy with how that worked over all.  I wasn't able to find a way to return both related works and prioritize works with images, so unfornunately many do not have images.

The audio tour was the last feature I implemented and I couldn't quite make it work as described.  No matter what I tried or researched, I couldn't get a request to work for that section of the JSON file.  But since I'd alreay spent so much time on the feature, I decided to implement a few hard-coded tour stops.  I also set up an audio player that retrives random clips from the AWS hosting site.

It's always hard to guage how much time to spend on a project like this, and I'm sure I could have ironed out some of the bugs (I mean features;) if I continued to work on it.  That being said, I felt like this was a good place to stop (at least for now) and give you guys a chance to check out what I did accomplish.

Thank you so much for the opportunity and I look forward to discussing it further with you all!