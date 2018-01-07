webpackJsonp([27342011384247],{658:function(t,e){t.exports={data:{site:{siteMetadata:{title:"aendrew.com v8",author:"Aendrew Rininsland"}},markdownRemark:{id:"/Users/andrew.rininsland/Projects/OTHER/aendrew.github.io/src/pages/2012-04-12-some-fun-semantic-web/index.md absPath of file >>> MarkdownRemark",html:'<p>I’ve recently been playing with the semantic web (for the uninitiated, the semantic web is a structuring of web content in terms of what it depicts instead of just a bunch of linked text files) and have come up with the following two queries — let me know if you find these useful!</p>\n<p>For SPARQL (I.e., <a href="http://www.dbpedia.org">dbpedia</a>), the following should return how many competitors each country is sending to the London 2012 Olympics:</p>\n<html><head></head><body><div class="gatsby-highlight">\n      <pre class="language-none"><code>SELECT ?country ?competitors WHERE {\n?s foaf:page ?country . \n?s rdf:type <http: dbpedia.org="" ontology="" olympicresult="">.\n?s <http: dbpedia.org="" property="" games=""> &quot;2012&quot;^^<http: 2001="" www.w3.org="" xmlschema#int=""> .\n?s dbpprop:competitors ?competitors\n} order by desc(?competitors)</http:></http:></http:></code></pre>\n      </div></body></html>\n<p>See results by going <a href="http://live.dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&#x26;query=SELECT+%3Fcountry+%3Fcompetitors+WHERE+%7B%0D%0A%3Fs+foaf%3Apage+%3Fcountry+.+%0D%0A%3Fs+rdf%3Atype+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2FOlympicResult%3E.%0D%0A%3Fs+%3Chttp%3A%2F%2Fdbpedia.org%2Fproperty%2Fgames%3E+%222012%22%5E%5E%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23int%3E+.%0D%0A%3Fs+dbpprop%3Acompetitors+%3Fcompetitors%0D%0A%7D+order+by+desc%28%3Fcompetitors%29&#x26;should-sponge=grab-all&#x26;format=text%2Fhtml&#x26;timeout=0&#x26;debug=on">here.</a></p>\n<p>Meanwhile, if you want a MQL query (I.e., <a href="http://www.freebase.org">Freebase</a>), use the following to give a comprehensive array of Golden Raspberry Award “winners”:</p>\n<html><head></head><body><div class="gatsby-highlight">\n      <pre class="language-none"><code>\t\tquery: {\n\t\t\t  &quot;id&quot;: &quot;/en/golden_raspberry_awards&quot;,\n\t\t\t  &quot;type&quot;: &quot;/award/award&quot;,\n\t\t\t  &quot;category&quot;: [{\n\t\t\t\t&quot;name&quot;: null,\n\t\t\t\t&quot;name!=&quot; : &quot;Razzie Award for Worst Actor of the Decade&quot;, \n\t\t\t\t&quot;AND:name!=&quot; : &quot;Razzie Award for Worst Actress of the Decade&quot;,\n\t\t\t\t&quot;nominees&quot;: [{          \n\t\t\t\t\t  &quot;year&quot;: null,\n\t\t\t\t\t  &quot;award_nominee&quot;: [],\n\t\t\t\t\t  &quot;nominated_for&quot;: [],\n\t\t\t\t\t &quot;sort&quot;: &quot;-year&quot;\n\t\t\t\t\t}], /* nominees */\n\t\t\t\t&quot;winners&quot;: [{\n\t\t\t\t  &quot;s1:/type/reflect/any_master&quot; : [{\n\t\t\t\t\t&quot;type&quot;: &quot;/award/award_winner&quot;,\n\t\t\t\t\t&quot;name&quot;: null,\n\t\t\t\t\t&quot;key&quot; : [{\n\t\t\t\t\t  &quot;namespace&quot; : &quot;/wikipedia/en&quot;,\n\t\t\t\t\t  &quot;value&quot;: null,\n\t\t\t\t\t  &quot;limit&quot;: 1\n\t\t\t\t\t\t}] /* key */\n\t\t\t\t\t}], /* award_winner */\n\t\t\t\t  &quot;s2:/type/reflect/any_master&quot; : [{\n\t\t\t\t\t&quot;type&quot;: &quot;/award/award_winning_work&quot;,\n\t\t\t\t\t&quot;name&quot;: null,\n\t\t\t\t\t}] /* award_winning_work */\n\t\t\t\t}] /* winners */\n\t\t\t}] /* category */\n\t\t}  /* query */  \t</code></pre>\n      </div></body></html>\n<p>Output <a href="https://api.freebase.com/api/service/mqlread?query=%7B%22query%22:%7B%22id%22:%22/en/golden_raspberry_awards%22,%22type%22:%22/award/award%22,%22category%22:%5B%7B%22name%22:null,%22nominees%22:%5B%7B%22year%22:null,%22award_nominee%22:%5B%5D,%22nominated_for%22:%5B%5D,%22sort%22:%22-year%22%7D%5D,%22winners%22:%5B%7B%22/type/reflect/any_master%22:%5B%7B%22type%22:%22/award/award_winning_work%22,%22name%22:null%7D%5D%7D%5D%7D%5D%7D%7D">here</a>.</p>\n<p>I’ll be writing a fairly comprehensive blog tutorial on this sometime in the next few weeks; follow me on <a href="http://www.twitter.com">Twitter</a> for updates.</p>',frontmatter:{title:"Some fun with the semantic web",date:"April 12, 2012"}}},pathContext:{path:"content/some-fun-semantic-web"}}}});
//# sourceMappingURL=path---content-some-fun-semantic-web-9663e489e34c7446b995.js.map