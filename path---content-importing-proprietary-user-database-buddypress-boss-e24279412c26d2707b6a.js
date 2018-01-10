webpackJsonp([0xca28d73462d4],{611:function(a,s){a.exports={data:{site:{siteMetadata:{title:"aendrew.com v8",author:"Aendrew Rininsland"}},markdownRemark:{id:"/Users/andrew.rininsland/Projects/OTHER/aendrew.github.io/src/pages/2012-04-09-importing-proprietary-user-database-buddypress-boss/index.md absPath of file >>> MarkdownRemark",html:'<h3>Disclaimer: this may have changed in more recent versions of BuddyPress, so your mileage may very substantially. Please let me know if something’s not working, but caveat lector none of this comes with any warranty or support whatsoever.</h3>\n<p>A bit over a year ago, I <a href="http://wordpress.stackexchange.com/questions/4948/importing-users-to-buddypress-with-custom-fields">asked a question</a> on the <a href="http://wordpress.stackexchange.com">WordPress Stack Exchange site</a> about importing content from a proprietary database into <a href="http://www.buddypress.org">BuddyPress</a>, the “social network in a box” plugin for <a href="http://www.wordpress.org">WordPress</a>. Not getting anything resembling a response, I ended up writing a whole schwack of MySQL statements. After answering my question on SO, I’ve averaged about an email every 4-6 months about how I managed to do what I did. Alas, I was a total jerk and couldn’t find the SQL I use and ended up ignoring most of them.</p>\n<p><strong>Until today!</strong></p>\n<p>Note that the following is <strong>not</strong> a one-click script that will import your users. It’s a starting point I’m posting in hopes that somebody finds it useful. You <strong>will</strong> need to modify it for your purposes, and *please, please, <strong>PLEASE*</strong> don’t use this on a production database, and make backups frequently. I take no responsibility if you screw something up with it!</p>\n<p>Also attached to this post is an importer script <a href="http://www.dimunation.com">Michael Dimunation</a> sent me awhile back after I emailed him the SQL query in question. I have no idea what it does and have never used it — again, same caveats apply, but hopefully somebody finds it useful.</p>\n<h2>proprietary<em>to</em>wp.sql</h2>\n<html><head></head><body><div class="gatsby-highlight">\n      <pre class="language-none"><code>/* Query 1 */\n\nINSERT INTO `WORDPRESS`.`wp_users` (`user_login`, `user_pass`, `user_nicename`, `user_email`,  `user_registered`, `display_name`)\n\nSELECT \na.`username` as `user_login`,\nMD5(a.`password`) as `user_pass`,\nCONCAT(a.`first_name`,&apos;-&apos;,a.`last_name`) as `user_nicename`,\nb.`location_name` as `user_email`,\na.`row_created_date` as `user_registered`,\nCONCAT(a.`first_name`,&apos; &apos;,a.`last_name`) as `user_displayname`\n\nFROM `ORIGINAL`.`business_associate` AS a\n\nLEFT JOIN `ORIGINAL`.`ba_contact_info` AS b ON b.`business_associate` = a.`business_associate` AND b.`location_id` = &apos;email&apos;\nWHERE a.`ba_type` = &apos;person&apos;;\n\n\n/* Query 2 -- First Name */\n\nINSERT INTO\t`WORDPRESS`.`wp_usermeta` (`user_id`, `meta_key`, `meta_value`)\n\nSELECT\n`ID` as `user_id`, \n&apos;first_name&apos; as `meta_key`,\nSUBSTRING_INDEX(`display_name`, &apos; &apos;, 1) as `meta_value`\n\nFROM `WORDPRESS`.`wp_users`;\n\n/* Query 3 -- Last Name */\n\nINSERT INTO\t`WORDPRESS`.`wp_usermeta` (`user_id`, `meta_key`, `meta_value`)\n\nSELECT\n`ID` as `user_id`, \n&apos;last_name&apos; as `meta_key`,\nSUBSTRING(`display_name`, INSTR(`display_name`, &apos; &apos;)) as `meta_value`\n\nFROM `WORDPRESS`.`wp_users`;\n\n\n/* Query 4 -- Nick Name */\n\nINSERT INTO\t`WORDPRESS`.`wp_usermeta` (`user_id`, `meta_key`, `meta_value`)\n\nSELECT\n`ID` as `user_id`, \n&apos;nickname&apos; as `meta_key`,\n`display_name` as `meta_value`\n\nFROM `WORDPRESS`.`wp_users`;\n\n/* Query 5 -- Last Activity */\n\nINSERT INTO\t`WORDPRESS`.`wp_usermeta` (`user_id`, `meta_key`, `meta_value`)\n\nSELECT\n`ID` as `user_id`, \n&apos;last_activity&apos; as `meta_key`,\n&apos;2010-12-06 20:46:27&apos; as `meta_value`\n\nFROM `WORDPRESS`.`wp_users`;\n\n\n/* Broken from here ... \n\n//user privs query 5.1\n\nINSERT INTO\t`WORDPRESS`.`wp_usermeta` (`user_id`, `meta_key`, `meta_value`)\n\nSELECT\n`ID` as `user_id`, \n&apos;wp_capabilities&apos; as `meta_key`,\n&apos;a:1:{s:15:&apos;s2member_level1&apos;;s:1:&apos;1&apos;;}&apos; as `meta_value`\n\nFROM `WORDPRESS`.`wp_users` \n\nWHERE `ID` != &apos;1&apos; OR &apos;247&apos; OR &apos;379&apos;;\n\n//user level query 6\n\nINSERT INTO\t`WORDPRESS`.`wp_usermeta` (`user_id`, `meta_key`, `meta_value`)\n\nSELECT\n`ID` as `user_id`, \n&apos;wp_user_level&apos; as `meta_key`,\n&apos;0&apos; as `meta_value`\n\nFROM `WORDPRESS`.`wp_users`;\n\n ...broken to here */\n\n\n/* Query 7 -- BP Name */\n\nINSERT INTO `WORDPRESS`.`wp_bp_xprofile_data` (`field_id`, `user_id`, `value`, `last_updated`)\n\nSELECT\n&apos;1&apos; as `field_id`,\n`ID` as `user_id`,\n`display_name` as `value`,\nNOW() as `last_updated`\nFROM `WORDPRESS`.`wp_users`;\n\n\n/* Query 8 -- BP Phone */\n\nINSERT INTO `WORDPRESS`.`wp_bp_xprofile_data` (`field_id`, `user_id`, `value`, `last_updated`)\n\nSELECT\n&apos;4&apos; as `field_id`,\ne.`ID` as `user_id`,\nc.`location_name` as `value`,\nNOW() as `last_updated`\n\nFROM `ORIGINAL`.`business_associate` as a\n\nLEFT JOIN `ORIGINAL`.`ba_contact_info` AS b ON b.`business_associate` = a.`business_associate` AND b.`location_id` = &apos;email&apos;\nLEFT JOIN `ORIGINAL`.`ba_contact_info` AS c ON c.`business_associate` = a.`business_associate` AND c.`location_id` = &apos;phone&apos; \nLEFT JOIN `ORIGINAL`.`ba_contact_info` AS d ON d.`business_associate` = a.`business_associate` AND d.`location_id` = &apos;fax&apos;\nLEFT JOIN `WORDPRESS`.`wp_users` as e ON e.`user_login` = a.`username`\nWHERE `ba_type` = &apos;person&apos;;\n\n\n/* Query 9 -- BP Fax */\n\nINSERT INTO `WORDPRESS`.`wp_bp_xprofile_data` (`field_id`, `user_id`, `value`, `last_updated`)\n\nSELECT\n&apos;5&apos; as `field_id`,\ne.`ID` as `user_id`,\nd.`location_name` as `value`,\nNOW() as `last_updated`\n\nFROM `ORIGINAL`.`business_associate` as a\n\nLEFT JOIN `ORIGINAL`.`ba_contact_info` AS d ON d.`business_associate` = a.`business_associate` AND d.`location_id` = &apos;fax&apos;\nLEFT JOIN `WORDPRESS`.`wp_users` as e ON e.`user_login` = a.`username`\nWHERE `ba_type` = &apos;person&apos;;\n\n\n/* Query 10 -- BP Email */\n\nINSERT INTO `WORDPRESS`.`wp_bp_xprofile_data` (`field_id`, `user_id`, `value`, `last_updated`)\n\nSELECT\n&apos;6&apos; as `field_id`,\ne.`ID` as `user_id`,\nd.`location_name` as `value`,\nNOW() as `last_updated`\n\nFROM `ORIGINAL`.`business_associate` as a\n\nLEFT JOIN `ORIGINAL`.`ba_contact_info` AS d ON d.`business_associate` = a.`business_associate` AND d.`location_id` = &apos;email&apos;\nLEFT JOIN `WORDPRESS`.`wp_users` as e ON e.`user_login` = a.`username`\nWHERE `ba_type` = &apos;person&apos;;\n\n\n/* Query 11 -- BP Company */\n\nINSERT INTO `WORDPRESS`.`wp_bp_xprofile_data` (`field_id`, `user_id`, `value`, `last_updated`)\n\nSELECT\n&apos;2&apos; as `field_id`,\ne.`ID` as `user_id`,\nf.`ba_name` as `value`,\nNOW() as `last_updated`\n\nFROM `ORIGINAL`.`business_associate` as a\n\nLEFT JOIN `ORIGINAL`.`ba_employee` AS d ON d.`employee_ba_id` = a.`business_associate`\nLEFT JOIN `WORDPRESS`.`wp_users` as e ON e.`user_login` = a.`username`\nINNER JOIN `ORIGINAL`.`business_associate` as f ON f.`business_associate` = d.`employer_ba_id`\n\nWHERE a.`ba_type` = &apos;person&apos;;</code></pre>\n      </div></body></html>',frontmatter:{title:"Importing a proprietary user database into BuddyPress like a boss",date:"April 09, 2012"}}},pathContext:{path:"content/importing-proprietary-user-database-buddypress-boss"}}}});
//# sourceMappingURL=path---content-importing-proprietary-user-database-buddypress-boss-e24279412c26d2707b6a.js.map