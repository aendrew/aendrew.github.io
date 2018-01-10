webpackJsonp([0xae8dc855d14c],{634:function(a,t){a.exports={data:{site:{siteMetadata:{title:"aendrew.com v8",author:"Aendrew Rininsland"}},markdownRemark:{id:"/Users/andrew.rininsland/Projects/OTHER/aendrew.github.io/src/pages/2013-04-09-migrate-wordtour-openmusicfestival/index.md absPath of file >>> MarkdownRemark",html:"<p>The reason I created <a href=\"http://www.openmusicfestival.com\">OpenMusicFestival</a> in the first place was so that I could migrate <a href=\"http://www.motionnotion.com\">MotionNotion.com</a> from WordPress (And its unsupported WordTour plugin) to Drupal 7.</p>\n<p>While I suspect my original use of WordTour for a music festival was slightly weird (The system was designed for small record labels, but relationship between artists, events and venues made it work for my purposes), I’m releasing my Artist migration class in case somebody finds it useful and wants to migrate to OpenMusicFestival. Note that this only migrates Artists — the Event and Venues parts are incomplete (On that note, if somebody wants to do those, I’ll happily both give you credit on the project as well as include the code with OMF.).</p>\n<html><head></head><body><div class=\"gatsby-highlight\">\n      <pre class=\"language-php migrate_wordtour.php\"><code><!--?php\n/**\n * @file\n *  Migrate content from WordTour (WP) to OMF (Drupal)\n *\n *  NOTE: THIS IS WOEFULLY INCOMPLETE. I would *love* to give somebody credit\n *  for tidying up and completing this.\n */\n\nclass WordTourMigration extends Migration {\n  public $wp_prefix = 'wp_'; //This is the entire first part of the table name.\n  public $wp_db = '';\n  public $wp_user = '';\n  public $wp_pass = '';\n  public $wp_host = 'localhost';\n\n  public function __construct() {\n    // Always call the parent constructor first for basic setup\n    parent::__construct();\n\n    // With migrate_ui enabled, migration pages will indicate people involved in\n    // the particular migration, with their role and contact info. We default the\n    // list in the shared class; it can be overridden for specific migrations.\n    $this--->team = array(\n      new MigrateTeamMember(&apos;&#xC6;ndrew Rininsland&apos;, &apos;aendrew@aendrew.com&apos;, t(&apos;Developer&apos;)),\n    );\n\n    // Individual mappings in a migration can be linked to a ticket or issue\n    // in an external tracking system. Define the URL pattern here in the shared\n    // class with &apos;:id:&apos; representing the position of the issue number, then add\n    // -&gt;issueNumber(1234) to a mapping.\n    $this-&gt;issuePattern = &apos;http://drupal.org/node/:id:&apos;;\n  }\n}\n\n/**\n * There are four essential components to set up in your constructor:\n *  $this-&gt;source - An instance of a class derived from MigrateSource, this\n *    will feed data to the migration.\n *  $this-&gt;destination - An instance of a class derived from MigrateDestination,\n *    this will receive data that originated from the source and has been mapped\n *    by the Migration class, and create Drupal objects.\n *  $this-&gt;map - An instance of a class derived from MigrateMap, this will keep\n *    track of which source items have been imported and what destination objects\n *    they map to.\n *  Mappings - Use $this-&gt;addFieldMapping to tell the Migration class what source\n *    fields correspond to what destination fields, and additional information\n *    associated with the mappings.\n */\nclass ArtistMigration extends WordTourMigration {\n  public function __construct() {\n    parent::__construct();\n\n    //Set up other database\n    Database::addConnectionInfo(&apos;wp&apos;, &apos;default&apos;, array(\n          &apos;driver&apos; =&gt; &apos;mysql&apos;,\n          &apos;database&apos; =&gt; $this-&gt;wp_db,\n          &apos;username&apos; =&gt; $this-&gt;wp_user,\n          &apos;password&apos; =&gt; $this-&gt;wp_pass,\n          &apos;host&apos; =&gt; $this-&gt;wp_host,\n          &apos;prefix&apos; =&gt; $this-&gt;wp_prefix,\n        ));\n\n    $this-&gt;description = t(&apos;Migrate the artists!&apos;);\n\n    $this-&gt;map = new MigrateSQLMap($this-&gt;machineName,\n        array(\n          &apos;artist_id&apos; =&gt; array(\n                           &apos;type&apos; =&gt; &apos;int&apos;,\n                           &apos;length&apos; =&gt; 7,\n                           &apos;not null&apos; =&gt; TRUE,\n                           &apos;description&apos; =&gt; &apos;Artist ID&apos;,\n                          )\n        ),\n        MigrateDestinationNode::getKeySchema()\n      );\n\n    $query = Database::getConnection(&apos;default&apos;, &apos;wp&apos;)\n           -&gt;select(&apos;wtr_artists&apos;, &apos;a&apos;);\n    $query-&gt;join(&apos;wtr_attachment&apos;, &apos;at&apos;, &apos;a.artist_id = at.attachment_target_id&apos;);\n    $query-&gt;join(&apos;wtr_attachment&apos;, &apos;att&apos;, &apos;a.artist_id = att.attachment_target_id&apos;);\n    $query-&gt;join(&apos;postmeta&apos;, &apos;pm&apos;, &apos;pm.post_id = att.attachment_type_id&apos;);\n    $query-&gt;fields(&apos;a&apos;,\n              array(\n                  &apos;artist_id&apos;,\n                  &apos;artist_name&apos;,\n                  &apos;artist_publish_date&apos;,\n                  &apos;artist_bio&apos;,\n                  &apos;artist_record_company&apos;,\n                  &apos;artist_social_links&apos;,\n              )\n            );\n    //$query-&gt;fields(&apos;att&apos;, array(&apos;attachment_info&apos;));\n    $query-&gt;fields(&apos;pm&apos;, array(&apos;meta_value&apos;));\n    //$query-&gt;addField(&apos;pm&apos;, &apos;meta_value&apos;, &apos;photo&apos;);\n    $query-&gt;addExpression(&apos;GROUP_CONCAT(DISTINCT at.attachment_info)&apos;, &apos;genres&apos;); //Pull in genres.\n    $query-&gt;condition(&apos;at.attachment_target&apos;, &apos;artist&apos;);\n    $query-&gt;condition(&apos;at.attachment_type&apos;, &apos;genre&apos;);\n    $query-&gt;condition(&apos;att.attachment_type&apos;, &apos;thumbnail&apos;);\n    $query-&gt;condition(&apos;pm.meta_key&apos;, &apos;_wp_attached_file&apos;);\n    $query-&gt;groupBy(&apos;a.artist_id&apos;);\n\n\n    // Create a MigrateSource object, which manages retrieving the input data.\n    $this-&gt;source = new MigrateSourceSQL($query, array(), NULL, array(&apos;map_joinable&apos; =&gt; FALSE));\n\n    // Set up our destination\n    $this-&gt;destination = new MigrateDestinationNode(&apos;artist&apos;, array(&apos;text_format&apos; =&gt; &apos;full_html&apos;));\n\n    // Assign mappings TO destination fields FROM source fields.\n    $this-&gt;addFieldMapping(&apos;title&apos;, &apos;artist_name&apos;);\n    $this-&gt;addFieldMapping(&apos;uid&apos;)\n         -&gt;defaultValue(1);\n    $this-&gt;addFieldMapping(&apos;changed&apos;, &apos;artist_publish_date&apos;);\n    $this-&gt;addFieldMapping(&apos;status&apos;)\n         -&gt;defaultValue(1);\n    $this-&gt;addFieldMapping(&apos;promote&apos;, &apos;&apos;)\n         -&gt;defaultValue(0);\n    $this-&gt;addFieldMapping(&apos;sticky&apos;, &apos;&apos;)\n         -&gt;defaultValue(0);\n    $this-&gt;addFieldMapping(&apos;revision&apos;)\n         -&gt;defaultValue(0);\n    $this-&gt;addFieldMapping(&apos;log&apos;)\n         -&gt;defaultValue(&apos;Migrated to Drupal 7 from WordPress.&apos;);\n    $this-&gt;addFieldMapping(&apos;comment&apos;)\n         -&gt;defaultValue(1);\n    $this-&gt;addFieldMapping(&apos;body&apos;, &apos;artist_bio&apos;)\n          -&gt;arguments(array(&apos;format&apos; =&gt; &apos;full_html&apos;))\n          -&gt;description(&apos;See prepareRow()&apos;);\n    $this-&gt;addFieldMapping(&apos;created&apos;, &apos;artist_publish_date&apos;);\n    $this-&gt;addFieldMapping(&apos;field_labels&apos;, &apos;artist_record_company&apos;)\n          -&gt;separator(&apos;, &apos;)\n          -&gt;arguments(array(&apos;create_term&apos; =&gt; true));\n    //$this-&gt;addFieldMapping(&apos;path&apos;, &apos;&apos;);\n    //$this-&gt;addFieldMapping(&apos;pathauto&apos;, &apos;&apos;);\n    $this-&gt;addFieldMapping(&apos;field_photo&apos;, &apos;meta_value&apos;);\n    $this-&gt;addFieldMapping(&apos;field_photo:source_dir&apos;)\n         -&gt;defaultValue(&apos;/Users/aendrew/Sites/mn_wp&apos;);\n    $this-&gt;addFieldMapping(&apos;field_photo:preserve_files&apos;)\n         -&gt;defaultValue(true);\n    $this-&gt;addFieldMapping(&apos;field_photo:destination_file&apos;, &apos;meta_value&apos;);\n    $this-&gt;addFieldMapping(&apos;field_photo:file_replace&apos;)\n         -&gt;defaultValue(MigrateFile::FILE_EXISTS_REUSE);\n    $this-&gt;addFieldMapping(&apos;field_photo:alt&apos;, &apos;artist_name&apos;);\n    $this-&gt;addFieldMapping(&apos;field_photo:title&apos;, &apos;artist_name&apos;);\n    $this-&gt;addFieldMapping(&apos;field_links&apos;, &apos;artist_social_links&apos;)\n         -&gt;description(&apos;See prepare()&apos;); //Needs to be unserialized\n    $this-&gt;addFieldMapping(&apos;field_genres&apos;, &apos;genres&apos;)\n          -&gt;separator(&apos;,&apos;)\n          -&gt;arguments(array(&apos;create_term&apos; =&gt; true));\n  }\n\n  public function prepareRow($row) {\n    //Prepare Thumbnails\n    $thumb = trim($row-&gt;meta_value);\n    //watchdog(&apos;migrate&apos;, &apos;Filename is &apos; . $thumb);\n    $row-&gt;meta_value = &apos;wp-content/uploads/&apos; . $thumb;\n  }\n\n  public function prepare(stdClass $node, stdClass $row) {\n    //Set up the links\n    $links = unserialize($row-&gt;artist_social_links);\n    $empty = &apos;a:10:{s:13:&quot;artist_flickr&quot;;s:0:&quot;&quot;;s:14:&quot;artist_youtube&quot;;s:0:&quot;&quot;;s:12:&quot;artist_vimeo&quot;;s:0:&quot;&quot;;s:15:&quot;artist_facebook&quot;;s:0:&quot;&quot;;s:14:&quot;artist_twitter&quot;;s:0:&quot;&quot;;s:13:&quot;artist_lastfm&quot;;s:0:&quot;&quot;;s:14:&quot;artist_myspace&quot;;s:0:&quot;&quot;;s:15:&quot;artist_bandcamp&quot;;s:0:&quot;&quot;;s:13:&quot;artist_tumblr&quot;;s:0:&quot;&quot;;s:19:&quot;artist_reverbnation&quot;;s:0:&quot;&quot;;}&apos;;\n    if ($node-&gt;field_links[LANGUAGE_NONE][0][&apos;url&apos;] == $empty) {\n      unset($node-&gt;field_links);\n    } else {\n      $i = 0;\n      foreach ($links as $site =&gt; $link) {\n        if (!empty($link)) {\n          $site_name = ucfirst(str_replace(&apos;artist_&apos;, &apos;&apos;, $site));\n          if ($site_name == &quot;Youtube&quot;) $site_name = &quot;YouTube&quot;;\n          if ($site_name == &quot;Lastfm&quot;) $site_name = &quot;Last.fm&quot;;\n          if ($site_name == &quot;Youtube&quot;) $site_name = &quot;YouTube&quot;;\n          if ($site_name == &quot;Myspace&quot;) $site_name = &quot;MySpace&quot;;\n          $node-&gt;field_links[LANGUAGE_NONE][$i][&apos;title&apos;] = $site_name;\n          $node-&gt;field_links[LANGUAGE_NONE][$i][&apos;url&apos;] = urldecode($link);\n          $i++;\n        }\n      }\n    }\n  }\n}</code></pre>\n      </div></body></html>\n<p>Did this help you out? Have I saved you a tonne of time? Please leave me a comment letting me know!</p>",frontmatter:{title:"Migrate from WordTour to OpenMusicFestival",date:"April 09, 2013"}}},pathContext:{path:"content/migrate-wordtour-openmusicfestival"}}}});
//# sourceMappingURL=path---content-migrate-wordtour-openmusicfestival-6a7976ccf5f7de04706b.js.map