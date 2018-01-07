webpackJsonp([0x9c4a3422e18c],{666:function(e,t){e.exports={data:{site:{siteMetadata:{title:"aendrew.com v8",author:"Aendrew Rininsland"}},markdownRemark:{id:"/Users/andrew.rininsland/Projects/OTHER/aendrew.github.io/src/pages/2011-05-24-why-i-only-use-dreamhost/index.md absPath of file >>> MarkdownRemark",html:'<p><strong>Another update:</strong> While I’m doing increasingly more on Digital Ocean, Amazon Web Services and GitHub Pages for content hosting, I feel I should issue something of a retraction about my last update; Dreamhost seems to have gotten quite a lot better recently. All the projects I do with Citizen Media are hosted on Dreamhost, because their DreamPress managed hosting is really tight — ~$20 per month for managed WordPress hosting. While it’s not nearly as “managed” as, say, WordPress VIP, I effectively never have to worry about server performance for any site hosted as such. The main <a href="http://www.hackneycitizen.co.uk">Hackney Citizen</a> site is hosted as such now, and as traffic for <a href="http://www.eastendreview.co.uk">other</a> <a href="http://www.bestofhackney.com">Citizen-related</a> <a href="http://www.eastendcitizen.co.uk">projects</a> ramps up, they can be easily migrated there.</p>\n<p>So, tl;dr — if all you’re doing is running WordPress, Dreamhost is still a’ight.</p>\n<p><html><head></head><body><strong></strong></body></html>Update:<html><head></head><body></body></html> After a solid year of nothing but absolutely shit service from Dreamhost across multiple accounts, this blog post is no longer true. I’ll write an actual post about my experiences soon, but for the moment — do yourself a favour and steer clear of Dreamhost.</p>\n<p>(Also, if anyone has any webhost suggestions, I’m all ears — please post in the comments, thanks!)</p>\n<p>Web hosting is always one of those awkward things you have to deal with when building new websites — if the client already has some sort of online presence, they probably have a preexisting business relationship with whoever is hosting their current website, even if that’s just a placeholder page. In general, the larger the existing web presence, the more difficult it is to make a client let go of their existing host. In the case of simple, HTML-driven websites, this isn’t much of a problem. However, in order to provide a consistent and high quality experience to your visitors, it is absolutely critical to select a high quality webhost if using a server-driven Content Management System (CMS) framework like <a href="http://wordpress.org">WordPress</a>, <a href="http://joomla.org">Joomla!</a> or <a href="http://drupal.org">Drupal</a>.</p>\n<p>Note that this may differ from your domain registrar. While some companies like <a href="http://godaddy.com">GoDaddy</a> use really obnoxious checkout procedures as a way to sucker people into using their mediocre hosting service, often one works with two separate companies, one of which is dealt with once a year (the domain registrar — i.e., at renewal time) while the other entails daily interaction (the webhost). At its most basic level, a CMS is a big collection of server scripts that build a webpage when a user loads it. Say a visitor to your website loads the front page — a bunch of code sends the headers, a bunch more gathers data about whether the user is logged in or not, some more looks up the content that’s supposed to be displayed on that particular page, other code renders the layout and design elements, et cetera. While this doesn’t necessarily happen every single time a user loads a page — after generating a page, the CMS keeps a copy of it to keep processing overhead down — it happens often enough that server-related issues can push load times past the often-fatal 5 second mark (after which most users will supposedly give up patience).</p>\n<p>I have administrated web servers since I was in high school and, trust me, it is both an art and a science. I have also dealt with so many absolutely terrible webhosts that have ultimately cost me money in terms of lost time due to being improperly or poorly configured that it would make your head spin. Because of this, the only company I trust with hosting my work is <a href="http://www.dreamhost.com/r.cgi?329024">Dreamhost</a>.</p>\n<h1>Here is why:</h1>\n<h2>It’s cheaper than everyone else</h2>\n<p>Just to get it out of the way, using Dreamhost will save you money. I don’t know what your current webhost charges you, but it’s likely much more than what a comparable plan through Dreamhost will set you back. Their <a href="http://www.dreamhost.com/hosting.html">hosting plan</a> has only one package/tier/plan/program and will supply you with all the space, bandwidth, users, emails, databases and domains you could ever ask for. Between all my projects, I’m currently hosting 50 domains on a single shared hosting account. While Dreamhost has a <a href="http://www.dreamhost.com/hosting-vps.html">Virtual Private Server</a> service, you’ll only ever need it if you’re serving something that is incredibly memory- or CPU-intensive.</p>\n<h2>It’s like totally sweet</h2>\n<p>Unlimited space. Unlimited email. Unlimited bandwidth. Unlimited domains. Unlimited emails. Unlimited databases. Unlimited announcement and discussion lists. Support for everything under the sun. Easily restore automatically-kept file and database backups with two clicks. And this is just the basic webhosting plan.</p>\n<h2>They give you a legit amount of RAM</h2>\n<p>A modern CMS will use quite a bit of RAM — I’ve seen WordPress and Drupal consume upwards of 50mb per page request with enough plugins/modules. That big chain of scripts that I talked about at the beginning? When it happens, there’s a spike in memory usage as the CMS churns through all those functions linked together. If you have a lame webhost that limits your memory usage to something ridiculous like 24mb per process and you’re running against your memory limit, one of those functions will tell the next in the chain to fire but it will run out of memory and instead return a 500 internal service error message. This will render one of two ways: either as an ugly blank screen with a bunch of useless information on it, or an ugly blank screen with nothing on it. Neither makes your visitors think you’re a very competent company (Best case scenario is that the server delivers a cached version of the page). The 80mb allocated by Dreamhost is generally more than enough for most PHP-based CMS systems (Drupal, WordPress, Joomla!); if not, you can scale to their Virtual Private Server plans relatively easily. </p>\n<h2>Industry-leading tech support</h2>\n<p>The world would be a beautiful place if only everyone was as helpful as Dreamhost’s support staff is. I have dealt with an incredibly wide range of support personnel in my lifetime, and I will say without hesitation that Dreamhost’s are the fastest, friendliest and most helpful I have ever encountered. When the shit hits the fan, these are the people that might be the difference between your site being down for five minutes or for five hours. This is not true for all webhosts — some I’ve dealt with seem to have a total of one support staff, who’s more accustomed to static HTML pages than these newfangled PHP script thingamawhatsit, and take not mere hours but whole <em>weeks</em> to respond. In addition, they have a lot excellent official and community-supported documentation, detailing everything from configuring your email client to installing a custom PHP.ini file.</p>\n<h2>100% Uptime Guarantee</h2>\n<p>If you notice your site’s down due to problems on Dreamhost’s behalf, <a href="http://www.dreamhost.com/hosting-100-percent-uptime-guarantee.html">they’ll give you a day of free hosting for each hour</a> (or fraction thereof) your account is inaccessible (upon opening the support ticket). Given Dreamhost is pretty inexpensive to begin with, this means a day of downtime (and lost work if your company uses web-based systems through its website) will save you roughly $7 in hosting. However, my experience has been that downtime is fairly rare with Dreamhost and is often fixed by the time I send the support ticket (On that note, if anybody knows of some comparative data analyzing downtime between large webhosts, I’d be very interested).</p>\n<h2>Great newsletters</h2>\n<p>I’m really adverse to promotional materials; my inbox is cluttered with an astounding array of things I’ve subscribed to but don’t ever actually read. Dreamhost’s monthly newsletters do not fall into this category — they manage to be both informative and entertaining and I look forward to each. Beyond these sporadic and often-late mailouts, Dreamhost uses very minimal email marketing.</p>\n<p>I could go on, really. Post in the comments if you want a coupon code.</p>\n<p>-æ.</p>',frontmatter:{title:"Why I only use Dreamhost",date:"May 24, 2011"}}},pathContext:{path:"content/why-i-only-use-dreamhost"}}}});
//# sourceMappingURL=path---content-why-i-only-use-dreamhost-6a9c033db6eabb15d576.js.map