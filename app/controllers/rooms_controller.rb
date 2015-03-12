require 'json'

class RoomsController < ApplicationController

  def show

  end

  def summary
    text = getData()
    article = OTS.parse(text)
    @summary = article.summarize(percent: 25)
    render json: { data: @summary }
  end

  def history
    data = getData()
    render json: { data: data }
  end

  def getData
<<EOF
Culture matters for startups. For a startup to succeed, it must have a culture that reflects what it wants to achieve. This is one of my areas of expertise. I've spent the past decade focusing on Y Combinator's culture. Here I'm going to tell you what I did and what I learned.

People and culture have played an important role at Y Combinator from the very beginning. And I was the one responsible for these things from the very beginning.  Most people don't know this–both because I prefer to operate in the background and because culture is not as visible to the outside world as what a company does functionally.

"Softer" stuff like values, culture and community is often ignored by the press, and more dangerously it's also sometimes ignored by founders. Maybe that's because it doesn't seem exciting, or it's too touchy-feely, or it can't be measured. Or maybe when you're trying to solve a technical problem that's never been solved before, company culture seems a secondary consideration.

But company culture starts when it's just two people working on an idea at the kitchen table. In my experience, the founders who start to care about their culture the soonest also tend to be the ones who build the best companies. In fact, the reason YC has deliberately never offered office space to founders is precisely because of this insight: the founders of individual startups drive the culture from a very early stage and this culture needs to grow organically in the startup's own space.

Here I'm going to explain some things about the origins of Y Combinator's own culture that I've never really shared before. One of the reasons I've never talked about this is that YC's culture was largely my creation and I didn't want to seem to be bragging. But if you understand my story, you'll understand what Y Combinator really is. Y Combinator is two things: it's a new structure of investment firm, but it's also a collection of people, both founders and partners. That collection of people has largely been curated by me over the last decade.

My cofounders Paul, Robert and Trevor are amazing at judging technical ideas, but as they'd be the first to admit, they're not as good judges of character. That's my department. For some reason I've always been a good judge of character–even as a little kid. So during the history of YC, for the most part they judged the ideas, and I judged the people. My cofounders called me "the social radar" for what seemed to them my uncanny ability to see through fakers and sociopaths. But it has historically been very important in making YC what it is.
EOF
  end

end

