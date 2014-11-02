



<!DOCTYPE html>
<html lang="en" class="">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    
    
    <title>janl/mustache.js</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png">
    <meta property="fb:app_id" content="1401488693436528">

      <meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="janl/mustache.js" name="twitter:title" /><meta content="mustache.js - Minimal templating with {{mustaches}} in JavaScript" name="twitter:description" /><meta content="https://avatars2.githubusercontent.com/u/11321?v=2&amp;s=400" name="twitter:image:src" />
<meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="https://avatars2.githubusercontent.com/u/11321?v=2&amp;s=400" property="og:image" /><meta content="janl/mustache.js" property="og:title" /><meta content="https://github.com/janl/mustache.js" property="og:url" /><meta content="mustache.js - Minimal templating with {{mustaches}} in JavaScript" property="og:description" />

      <meta name="browser-stats-url" content="/_stats">
    <link rel="assets" href="https://assets-cdn.github.com/">
    <link rel="conduit-xhr" href="https://ghconduit.com:25035">
    <link rel="xhr-socket" href="/_sockets">
    <meta name="pjax-timeout" content="1000">

    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="selected-link" value="repo_source" data-pjax-transient>
      <meta name="google-analytics" content="UA-3769691-2">

    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="collector-cdn.github.com" name="octolytics-script-host" /><meta content="github" name="octolytics-app-id" /><meta content="4E66999E:382A:3FB8B20:54563989" name="octolytics-dimension-request_id" /><meta content="5831153" name="octolytics-actor-id" /><meta content="kathynka" name="octolytics-actor-login" /><meta content="8277427efba6407e0ba3e55a4218df85ce26a6a6c8f37b6d2c029f468f6fb9f1" name="octolytics-actor-hash" />
    
    <meta content="Rails, view, files#disambiguate" name="analytics-event" />

    
    
    <link rel="icon" type="image/x-icon" href="https://assets-cdn.github.com/favicon.ico">


    <meta content="authenticity_token" name="csrf-param" />
<meta content="KKKKQAd7nVztWAYkRywE+WzpCFfIHm3lfdjZViDdQ+Kz5/FZ6G2TUCz/G1gM92t1Ogr9c2Jb+ywMhqU6DhmC2Q==" name="csrf-token" />

    <link href="https://assets-cdn.github.com/assets/github-b1c905f1bdc31980aab4c315e0dd478fad5d2898a408bd7390807a27ba60160b.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://assets-cdn.github.com/assets/github2-c009dbdc08ab7d5eda945f5f7a2d624e96c5afb53096b7e00af8f7db21cd0d4d.css" media="all" rel="stylesheet" type="text/css" />
    
    


    <meta http-equiv="x-pjax-version" content="6b0641a6210772677e7e40e370ec9e7a">

      
  <meta name="description" content="mustache.js - Minimal templating with {{mustaches}} in JavaScript">
  <meta name="go-import" content="github.com/janl/mustache.js git https://github.com/janl/mustache.js.git">

  <meta content="11321" name="octolytics-dimension-user_id" /><meta content="janl" name="octolytics-dimension-user_login" /><meta content="326688" name="octolytics-dimension-repository_id" /><meta content="janl/mustache.js" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="326688" name="octolytics-dimension-repository_network_root_id" /><meta content="janl/mustache.js" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/janl/mustache.js/commits/master.atom" rel="alternate" title="Recent Commits to mustache.js:master" type="application/atom+xml">

  </head>


  <body class="logged_in  env-production macintosh vis-public">
    <a href="#start-of-content" tabindex="1" class="accessibility-aid js-skip-to-content">Skip to content</a>
    <div class="wrapper">
      
      
      
      


      <div class="header header-logged-in true" role="banner">
  <div class="container clearfix">

    <a class="header-logo-invertocat" href="https://github.com/" data-hotkey="g d" aria-label="Homepage" ga-data-click="Header, go to dashboard, icon:logo">
  <span class="mega-octicon octicon-mark-github"></span>
</a>


      <div class="site-search repo-scope js-site-search" role="search">
          <form accept-charset="UTF-8" action="/janl/mustache.js/search" class="js-site-search-form" data-global-search-url="/search" data-repo-search-url="/janl/mustache.js/search" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
  <input type="text"
    class="js-site-search-field is-clearable"
    data-hotkey="s"
    name="q"
    placeholder="Search"
    data-global-scope-placeholder="Search GitHub"
    data-repo-scope-placeholder="Search"
    tabindex="1"
    autocapitalize="off">
  <div class="scope-badge">This repository</div>
</form>
      </div>
      <ul class="header-nav left" role="navigation">
        <li class="header-nav-item explore">
          <a class="header-nav-link" href="/explore" data-ga-click="Header, go to explore, text:explore">Explore</a>
        </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="https://gist.github.com" data-ga-click="Header, go to gist, text:gist">Gist</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="/blog" data-ga-click="Header, go to blog, text:blog">Blog</a>
          </li>
        <li class="header-nav-item">
          <a class="header-nav-link" href="https://help.github.com" data-ga-click="Header, go to help, text:help">Help</a>
        </li>
      </ul>

    
<ul class="header-nav user-nav right" id="user-links">
  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link name" href="/kathynka" data-ga-click="Header, go to profile, text:username">
      <img alt="kathynka" class="avatar" data-user="5831153" height="20" src="https://avatars3.githubusercontent.com/u/5831153?v=2&amp;s=40" width="20" />
      <span class="css-truncate">
        <span class="css-truncate-target">kathynka</span>
      </span>
    </a>
  </li>

  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link js-menu-target tooltipped tooltipped-s" href="#" aria-label="Create new..." data-ga-click="Header, create new, icon:add">
      <span class="octicon octicon-plus"></span>
      <span class="dropdown-caret"></span>
    </a>

    <div class="dropdown-menu-content js-menu-content">
      
<ul class="dropdown-menu">
  <li>
    <a href="/new"><span class="octicon octicon-repo"></span> New repository</a>
  </li>
  <li>
    <a href="/organizations/new"><span class="octicon octicon-organization"></span> New organization</a>
  </li>


    <li class="dropdown-divider"></li>
    <li class="dropdown-header">
      <span title="janl/mustache.js">This repository</span>
    </li>
      <li>
        <a href="/janl/mustache.js/issues/new"><span class="octicon octicon-issue-opened"></span> New issue</a>
      </li>
</ul>

    </div>
  </li>

  <li class="header-nav-item">
        <a href="/notifications" aria-label="You have no unread notifications" class="header-nav-link notification-indicator tooltipped tooltipped-s" data-ga-click="Header, go to notifications, icon:read" data-hotkey="g n">
        <span class="mail-status all-read"></span>
        <span class="octicon octicon-inbox"></span>
</a>
  </li>

  <li class="header-nav-item">
    <a class="header-nav-link tooltipped tooltipped-s" href="/settings/profile" id="account_settings" aria-label="Settings" data-ga-click="Header, go to settings, icon:settings">
      <span class="octicon octicon-gear"></span>
    </a>
  </li>

  <li class="header-nav-item">
    <form accept-charset="UTF-8" action="/logout" class="logout-form" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="y+DbCVgUrzjZKVplw45OJs3AGqOGdDxMzPvd0SFqjy62K0R72q+jfQKAkBe6pl2C8pjjkh8jvdi9QHHIy+HQWQ==" /></div>
      <button class="header-nav-link sign-out-button tooltipped tooltipped-s" aria-label="Sign out" data-ga-click="Header, sign out, icon:logout">
        <span class="octicon octicon-sign-out"></span>
      </button>
</form>  </li>

</ul>


    
  </div>
</div>

      

        


      <div id="start-of-content" class="accessibility-aid"></div>
          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    <div id="js-flash-container">
      
    </div>
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        
<ul class="pagehead-actions">

    <li class="subscription">
      <form accept-charset="UTF-8" action="/notifications/subscribe" class="js-social-container" data-autosubmit="true" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="UegoHV1FM1URUMLveOosoioWWWxOXe88ZvAjYa0IwgICptH5XRIXKMN1MoJdV8izt0U1BgxZJ/v8jOJGcU7mOQ==" /></div>  <input id="repository_id" name="repository_id" type="hidden" value="326688" />

    <div class="select-menu js-menu-container js-select-menu">
      <a class="social-count js-social-count" href="/janl/mustache.js/watchers">
        349
      </a>
      <a href="/janl/mustache.js/subscription"
        class="minibutton select-menu-button with-count js-menu-target" role="button" tabindex="0" aria-haspopup="true">
        <span class="js-select-button">
          <span class="octicon octicon-eye"></span>
          Watch
        </span>
      </a>

      <div class="select-menu-modal-holder">
        <div class="select-menu-modal subscription-menu-modal js-menu-content" aria-hidden="true">
          <div class="select-menu-header">
            <span class="select-menu-title">Notifications</span>
            <span class="octicon octicon-x js-menu-close" role="button" aria-label="Close"></span>
          </div> <!-- /.select-menu-header -->

          <div class="select-menu-list js-navigation-container" role="menu">

            <div class="select-menu-item js-navigation-item selected" role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input checked="checked" id="do_included" name="do" type="radio" value="included" />
                <h4>Not watching</h4>
                <span class="description">Be notified when participating or @mentioned.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye"></span>
                  Watch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_subscribed" name="do" type="radio" value="subscribed" />
                <h4>Watching</h4>
                <span class="description">Be notified of all conversations.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye"></span>
                  Unwatch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_ignore" name="do" type="radio" value="ignore" />
                <h4>Ignoring</h4>
                <span class="description">Never be notified.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-mute"></span>
                  Stop ignoring
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

          </div> <!-- /.select-menu-list -->

        </div> <!-- /.select-menu-modal -->
      </div> <!-- /.select-menu-modal-holder -->
    </div> <!-- /.select-menu -->

</form>
    </li>

  <li>
    
  <div class="js-toggler-container js-social-container starring-container ">

    <form accept-charset="UTF-8" action="/janl/mustache.js/unstar" class="js-toggler-form starred js-unstar-button" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="oJgdI/6qVGIb61qzwvNwNR9k1XZHwx5mnEBGC8V6/LuQeSwSl4WWPzdY861x4XUgjoFVuQtT6MpkMayyjyAXqQ==" /></div>
      <button
        class="minibutton with-count js-toggler-target star-button"
        aria-label="Unstar this repository" title="Unstar janl/mustache.js">
        <span class="octicon octicon-star"></span>
        Unstar
      </button>
        <a class="social-count js-social-count" href="/janl/mustache.js/stargazers">
          6,984
        </a>
</form>
    <form accept-charset="UTF-8" action="/janl/mustache.js/star" class="js-toggler-form unstarred js-star-button" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="UCaoucM5k50kXMEaSwnSu60wGRDENDqOenTY9+eOJRlOJMeR9CS7u5fQIo2Ve3yCxPxWmkA/kkHl/S20Zymynw==" /></div>
      <button
        class="minibutton with-count js-toggler-target star-button"
        aria-label="Star this repository" title="Star janl/mustache.js">
        <span class="octicon octicon-star"></span>
        Star
      </button>
        <a class="social-count js-social-count" href="/janl/mustache.js/stargazers">
          6,984
        </a>
</form>  </div>

  </li>


        <li>
          <a href="/janl/mustache.js/fork" class="minibutton with-count js-toggler-target fork-button tooltipped-n" title="Fork your own copy of janl/mustache.js to your account" aria-label="Fork your own copy of janl/mustache.js to your account" rel="facebox nofollow">
            <span class="octicon octicon-repo-forked"></span>
            Fork
          </a>
          <a href="/janl/mustache.js/network" class="social-count">1,464</a>
        </li>

</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="mega-octicon octicon-repo"></span>
          <span class="author"><a href="/janl" class="url fn" itemprop="url" rel="author"><span itemprop="title">janl</span></a></span><!--
       --><span class="path-divider">/</span><!--
       --><strong><a href="/janl/mustache.js" class="js-current-repository js-repo-home-link" data-pjax-container-selector="#js-repo-pjax-container">mustache.js</a></strong>

          <span class="page-context-loader">
            <img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">
      <div class="repository-with-sidebar repo-container new-discussion-timeline with-full-navigation ">
        <div class="repository-sidebar clearfix">
            
<nav class="sunken-menu repo-nav js-repo-nav js-sidenav-container-pjax js-octicon-loaders" role="navigation" data-issue-count-url="/janl/mustache.js/issues/counts" data-pjax-container-selector="#js-repo-pjax-container">
  <ul class="sunken-menu-group">
    <li class="tooltipped tooltipped-w" aria-label="Code">
      <a href="/janl/mustache.js" aria-label="Code" class="selected js-selected-navigation-item sunken-menu-item" data-hotkey="g c" data-pjax="true" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches /janl/mustache.js">
        <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
        <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>    </li>

      <li class="tooltipped tooltipped-w" aria-label="Issues">
        <a href="/janl/mustache.js/issues" aria-label="Issues" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g i" data-selected-links="repo_issues repo_labels repo_milestones /janl/mustache.js/issues">
          <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
          <span class="js-issue-replace-counter"></span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

    <li class="tooltipped tooltipped-w" aria-label="Pull Requests">
      <a href="/janl/mustache.js/pulls" aria-label="Pull Requests" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g p" data-selected-links="repo_pulls /janl/mustache.js/pulls">
          <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
          <span class="js-pull-replace-counter"></span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>    </li>


      <li class="tooltipped tooltipped-w" aria-label="Wiki">
        <a href="/janl/mustache.js/wiki" aria-label="Wiki" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g w" data-selected-links="repo_wiki /janl/mustache.js/wiki">
          <span class="octicon octicon-book"></span> <span class="full-word">Wiki</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>
  </ul>
  <div class="sunken-menu-separator"></div>
  <ul class="sunken-menu-group">

    <li class="tooltipped tooltipped-w" aria-label="Pulse">
      <a href="/janl/mustache.js/pulse/weekly" aria-label="Pulse" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="pulse /janl/mustache.js/pulse/weekly">
        <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
        <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>    </li>

    <li class="tooltipped tooltipped-w" aria-label="Graphs">
      <a href="/janl/mustache.js/graphs" aria-label="Graphs" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="repo_graphs repo_contributors /janl/mustache.js/graphs">
        <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
        <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>    </li>
  </ul>


</nav>

              <div class="only-with-full-nav">
                
  
<div class="clone-url open"
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><span class="text-emphasized">HTTPS</span> clone URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="https://github.com/janl/mustache.js.git" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/janl/mustache.js.git" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>

  
<div class="clone-url "
  data-protocol-type="ssh"
  data-url="/users/set_protocol?protocol_selector=ssh&amp;protocol_type=clone">
  <h3><span class="text-emphasized">SSH</span> clone URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="git@github.com:janl/mustache.js.git" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="git@github.com:janl/mustache.js.git" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>

  
<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><span class="text-emphasized">Subversion</span> checkout URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="https://github.com/janl/mustache.js" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/janl/mustache.js" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>


<p class="clone-options">You can clone with
      <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>,
      <a href="#" class="js-clone-selector" data-protocol="ssh">SSH</a>,
      or <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>.
  <a href="https://help.github.com/articles/which-remote-url-should-i-use" class="help tooltipped tooltipped-n" aria-label="Get help on which URL is right for you.">
    <span class="octicon octicon-question"></span>
  </a>
</p>

  <a href="http://mac.github.com" data-url="github-mac://openRepo/https://github.com/janl/mustache.js" class="minibutton sidebar-button js-conduit-rewrite-url" title="Save janl/mustache.js to your computer and use it in GitHub Desktop." aria-label="Save janl/mustache.js to your computer and use it in GitHub Desktop.">
    <span class="octicon octicon-device-desktop"></span>
    Clone in Desktop
  </a>


                <a href="/janl/mustache.js/archive/master.zip"
                   class="minibutton sidebar-button"
                   aria-label="Download the contents of janl/mustache.js as a zip file"
                   title="Download the contents of janl/mustache.js as a zip file"
                   rel="nofollow">
                  <span class="octicon octicon-cloud-download"></span>
                  Download ZIP
                </a>
              </div>
        </div><!-- /.repository-sidebar -->

        <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
          
<span id="js-show-full-navigation"></span>

<div class="repository-meta js-details-container ">
    <div class="repository-description">
      <p>Minimal templating with {{mustaches}} in JavaScript</p>
    </div>

    <div class="repository-website">
      <p><a href="http://mustache.github.com/" rel="nofollow">http://mustache.github.com/</a></p>
    </div>


</div>

<div class="overall-summary overall-summary-bottomless">

  <div class="stats-switcher-viewport js-stats-switcher-viewport">
    <div class="stats-switcher-wrapper">
    <ul class="numbers-summary">
      <li class="commits">
        <a data-pjax href="/janl/mustache.js/commits/master">
            <span class="octicon octicon-history"></span>
            <span class="num text-emphasized">
              514
            </span>
            commits
        </a>
      </li>
      <li>
        <a data-pjax href="/janl/mustache.js/branches">
          <span class="octicon octicon-git-branch"></span>
          <span class="num text-emphasized">
            10
          </span>
          branches
        </a>
      </li>

      <li>
        <a data-pjax href="/janl/mustache.js/releases">
          <span class="octicon octicon-tag"></span>
          <span class="num text-emphasized">
            22
          </span>
          releases
        </a>
      </li>

      <li>
        
  <a href="/janl/mustache.js/graphs/contributors">
    <span class="octicon octicon-organization"></span>
    <span class="num text-emphasized">
      55
    </span>
    contributors
  </a>
      </li>
    </ul>

      <div class="repository-lang-stats">
        <ol class="repository-lang-stats-numbers">
          <li>
              <a href="/janl/mustache.js/search?l=javascript">
                <span class="color-block language-color" style="background-color:#f1e05a;"></span>
                <span class="lang">JavaScript</span>
                <span class="percent">95.4%</span>
              </a>
          </li>
          <li>
              <a href="/janl/mustache.js/search?l=ruby">
                <span class="color-block language-color" style="background-color:#701516;"></span>
                <span class="lang">Ruby</span>
                <span class="percent">4.6%</span>
              </a>
          </li>
        </ol>
      </div>
    </div>
  </div>

</div>

  <div class="tooltipped tooltipped-s" aria-label="Show language statistics">
    <a href="#"
     class="repository-lang-stats-graph js-toggle-lang-stats"
     style="background-color:#701516">
  <span class="language-color" style="width:95.4%; background-color:#f1e05a;" itemprop="keywords">JavaScript</span><span class="language-color" style="width:4.6%; background-color:#701516;" itemprop="keywords">Ruby</span>
    </a>
  </div>

<div class="js-deferred-content"
  data-url="/janl/mustache.js/show_partial?partial=recently_touched_branches_list">
</div>

<div class="file-navigation in-mid-page">
  <a href="/janl/mustache.js/find/master"
        class="js-show-file-finder minibutton empty-icon tooltipped tooltipped-s right"
        data-pjax
        data-hotkey="t"
        aria-label="Quickly jump between files">
    <span class="octicon octicon-list-unordered"></span>
  </a>
    <a href="/janl/mustache.js/compare" aria-label="Compare, review, create a pull request" class="minibutton primary tooltipped tooltipped-s left compare-button" aria-label="Compare &amp; review" data-pjax>
      <span class="octicon octicon-git-compare"></span>
    </a>

  
<div class="select-menu js-menu-container js-select-menu left">
  <span class="minibutton select-menu-button js-menu-target css-truncate" data-hotkey="w"
    data-master-branch="master"
    data-ref="master"
    title="master"
    role="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
    <span class="octicon octicon-git-branch"></span>
    <i>branch:</i>
    <span class="js-select-button css-truncate-target">master</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax aria-hidden="true">

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-x js-menu-close" role="button" aria-label="Close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Filter branches/tags" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.4.x"
                 data-name="0.4.x"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.4.x">0.4.x</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.8"
                 data-name="0.8"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.8">0.8</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/fix_commonjs"
                 data-name="fix_commonjs"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="fix_commonjs">fix_commonjs</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/gh-pages"
                 data-name="gh-pages"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="gh-pages">gh-pages</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/helpers"
                 data-name="helpers"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="helpers">helpers</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/master"
                 data-name="master"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="master">master</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/new-build-system"
                 data-name="new-build-system"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="new-build-system">new-build-system</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/parser-rewrite"
                 data-name="parser-rewrite"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="parser-rewrite">parser-rewrite</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/rewrite"
                 data-name="rewrite"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="rewrite">rewrite</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/with-js-extras"
                 data-name="with-js-extras"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="with-js-extras">with-js-extras</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.8.2"
                 data-name="0.8.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.8.2">0.8.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.8.1"
                 data-name="0.8.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.8.1">0.8.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.8.0"
                 data-name="0.8.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.8.0">0.8.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.7.3"
                 data-name="0.7.3"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.7.3">0.7.3</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.7.2"
                 data-name="0.7.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.7.2">0.7.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.7.1"
                 data-name="0.7.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.7.1">0.7.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.7.0"
                 data-name="0.7.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.7.0">0.7.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.6.0"
                 data-name="0.6.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.6.0">0.6.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.5.2-vsc"
                 data-name="0.5.2-vsc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.5.2-vsc">0.5.2-vsc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.5.2"
                 data-name="0.5.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.5.2">0.5.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.5.1-vsc"
                 data-name="0.5.1-vsc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.5.1-vsc">0.5.1-vsc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.5.1"
                 data-name="0.5.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.5.1">0.5.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.5.0-vsc"
                 data-name="0.5.0-vsc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.5.0-vsc">0.5.0-vsc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.4.2"
                 data-name="0.4.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.4.2">0.4.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.4.1"
                 data-name="0.4.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.4.1">0.4.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.4.0"
                 data-name="0.4.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.4.0">0.4.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.3.0"
                 data-name="0.3.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.3.0">0.3.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.2.3"
                 data-name="0.2.3"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.2.3">0.2.3</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.2.2"
                 data-name="0.2.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.2.2">0.2.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.2.1"
                 data-name="0.2.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.2.1">0.2.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.2"
                 data-name="0.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.2">0.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/janl/mustache.js/tree/0.1"
                 data-name="0.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.1">0.1</a>
            </div> <!-- /.select-menu-item -->
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->



  <div class="breadcrumb"><span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/janl/mustache.js" class="" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">mustache.js</span></a></span></span><span class="separator"> / </span><form action="/janl/mustache.js/new/master" aria-label="Fork this project and create a new file" class="js-new-blob-form tooltipped tooltipped-e new-file-link" method="post"><span aria-label="Fork this project and create a new file" class="js-new-blob-submit octicon octicon-plus" data-test-id="create-new-git-file" role="button"></span></form></div>
</div>



  
  <div class="commit commit-tease js-details-container" >
    <p class="commit-title ">
        <a href="/janl/mustache.js/commit/32db14a490ae19455d4367c35f412bd0ecdba17c" class="message" data-pjax="true" title="Merge pull request #378 from jrburke/umd-fix

Fixes AMD registration, volo package.json entry">Merge pull request</a> <a href="https://github.com/janl/mustache.js/pull/378" class="issue-link" title="Fixes AMD registration, volo package.json entry">#378</a> <a href="/janl/mustache.js/commit/32db14a490ae19455d4367c35f412bd0ecdba17c" class="message" data-pjax="true" title="Merge pull request #378 from jrburke/umd-fix

Fixes AMD registration, volo package.json entry">from jrburke/umd-fix</a>
        <span class="hidden-text-expander inline"><a href="#" class="js-details-target">…</a></span>
    </p>
      <div class="commit-desc"><pre>Fixes AMD registration, volo package.json entry</pre></div>
    <div class="commit-meta">
      <button aria-label="Copy SHA" class="js-zeroclipboard zeroclipboard-link" data-clipboard-text="32db14a490ae19455d4367c35f412bd0ecdba17c" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
      <a href="/janl/mustache.js/commit/32db14a490ae19455d4367c35f412bd0ecdba17c" class="sha-block" data-pjax>latest commit <span class="sha">32db14a490</span></a>

      <div class="authorship">
        <img alt="Michael Jackson" class="avatar" data-user="92839" height="20" src="https://avatars1.githubusercontent.com/u/92839?v=2&amp;s=40" width="20" />
        <span class="author-name"><a href="/mjackson" rel="contributor">mjackson</a></span>
        authored <time class="updated" datetime="2014-05-29T17:55:47Z" is="relative-time">May 29, 2014</time>

      </div>
    </div>
  </div>

  <div class="file-wrap">
    <table class="files" data-pjax>

      <tbody class=""
  data-url="/janl/mustache.js/file-list/master"
  data-deferred-content-error="Failed to load latest commit information.">

    <tr>
      <td class="icon">
        <span class="octicon octicon-file-directory"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/tree/master/test" class="js-directory-link" id="098f6bcd4621d373cade4e832627b4f6-60ad79b070539fd62109fca60c18c60cf28ecda2" title="test">test</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/42ec324c8fafb029f789eeae7f155c821b475ae5" class="message" data-pjax="true" title="When rendering partials, pass the partial template instead of the original template.">When rendering partials, pass the partial template instead of the ori…</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-01-03T14:50:46Z" is="time-ago">Jan 3, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-directory"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/tree/master/wrappers" class="js-directory-link" id="d0f511719ab495b7fabd1e190a5451c9-7f3c2c28ad1bc73e494fc28b0738db871ece3850" title="wrappers">wrappers</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/500fd5d825fb7a353b82e593ecd2719cf06e691e" class="message" data-pjax="true" title="Updated qooxdoo templates.">Updated qooxdoo templates.</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-02-06T14:25:40Z" is="time-ago">Feb 6, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/.gitignore" class="js-directory-link" id="a084b794bc0759e7a6b77810e01874f2-a4c0df6aaa6adc412d814224e02ab87067cfb9df" title=".gitignore">.gitignore</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/25243109da851bf0292bf044136670664f64480e" class="message" data-pjax="true" title="Ignore generated file for MooTools">Ignore generated file for MooTools</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2013-11-04T18:13:59Z" is="time-ago">Nov 4, 2013</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/.gitmodules" class="js-directory-link" id="8903239df476d7401cf9e76af0252622-9e2fdf850b93a9a96b987c2616407798d16fe36b" title=".gitmodules">.gitmodules</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/5e583585744be0601df701065500b7b40472d157" class="message" data-pjax="true" title="Include submodule for Mustache specifications.">Include submodule for Mustache specifications.</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2013-03-16T09:24:17Z" is="time-ago">Mar 16, 2013</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/.jshintrc" class="js-directory-link" id="4d5aa81bf4f18104bb6ea53a8b5d1f43-28dff7105e60a97620afa3e94f2c2b303fe95fad" title=".jshintrc">.jshintrc</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/9079bd88f21e51f44f8de38d1322d6f86419956f" class="message" data-pjax="true" title="Add lint task using JSHint">Add lint task using JSHint</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2012-07-14T05:38:07Z" is="time-ago">Jul 13, 2012</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/.npmignore" class="js-directory-link" id="0fd4ef892d9d4990033701887c2f9bcc-76e579ae4c9106f3b62fb9203ec5b49d8014d87c" title=".npmignore">.npmignore</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/5448386b2032d22dd5a2cd0ec93460de7cd42f21" class="message" data-pjax="true" title="Ignore test files in npm package

Fixes #341">Ignore test files in npm package</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2013-12-02T23:26:25Z" is="time-ago">Dec 2, 2013</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/.travis.yml" class="js-directory-link" id="354f30a63fb0907d4ad57269548329e3-3d839b0ef6cef80fd2bec7688be23faf48161b50" title=".travis.yml">.travis.yml</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/c316c973f64f52794c0c420bb0c2d753f2984808" class="message" data-pjax="true" title="Run tests on node 0.6">Run tests on node 0.6</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2012-06-21T03:47:24Z" is="time-ago">Jun 20, 2012</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/CHANGES" class="js-directory-link" id="e4eb329834da3d36278b1b7d943b3bc9-dfdec93dc11b397d1b0df48d147ae19b4c7d1371" title="CHANGES">CHANGES</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/c68b434eb438394d1b069e38ba9d582c8d1fd28f" class="message" data-pjax="true" title="Adding a bower.json file

The goal is to reduce the number of files downloaded by ignoring the test directory">Adding a bower.json file</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-03-18T00:15:15Z" is="time-ago">Mar 17, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/LICENSE" class="js-directory-link" id="9879d6db96fd29134fc802214163b95a-aa1b831603a3bdcd37391016e96f762525fb6d65" title="LICENSE">LICENSE</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/635667418b8cebf28851b2d31b1a109f30b258c6" class="message" data-pjax="true" title="Update copyright year

Updated the copyright year to protect the changes you&#39;ve made since 2010. :-)">Update copyright year</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-03-14T04:28:34Z" is="time-ago">Mar 13, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/README.md" class="js-directory-link" id="04c6e90faac2675aa89e2176d2eec7d8-ab01e0986fd1df8c48202699ddc7101f8d1e5ecc" title="README.md">README.md</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/a7837898c7f4a3e6fc7d2129d7b25e0581410647" class="message" data-pjax="true" title="Correct mistake in the readme

I&#39;ve corrected the wrong variable name.">Correct mistake in the readme</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-04-05T15:57:26Z" is="time-ago">Apr 5, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/Rakefile" class="js-directory-link" id="52c976fc38ed2b4e3b1192f8a8e24cff-c019087322190900ee90bc47104f034cbc729c53" title="Rakefile">Rakefile</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/207b76a880913f9e3ffb2c9f4921d50226563139" class="message" data-pjax="true" title="Fix some Rake tasks, cleanup Rakefile">Fix some Rake tasks, cleanup Rakefile</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2013-11-04T18:13:59Z" is="time-ago">Nov 4, 2013</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/bower.json" class="js-directory-link" id="0a08a7565aba4405282251491979bb6b-e8c9b11999e0df7f4e07ff53622699d0a31e254e" title="bower.json">bower.json</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/3946a87ec70e37c5e53ae84e1aa788b0d8a90e47" class="message" data-pjax="true" title="Lowercasing the package name

Oops">Lowercasing the package name</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-03-20T17:01:32Z" is="time-ago">Mar 20, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/mustache.js" class="js-directory-link" id="634d226b45dfff37e6e48538dbfe4cb0-be3d01a255cbc34fce4937ef4938683b43da1f7a" title="mustache.js">mustache.js</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/2e12efdeda50cb6818a337078c4f4f555c2558e3" class="message" data-pjax="true" title="Fixes AMD registration, volo package.json entry
This change allows the AMD define signature to match what common AMD optimizers use to find define calls that need naming.
Also updates the volo package.json entry so that the correct version of mustache can be fetched properly.">Fixes AMD registration, volo package.json entry</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-05-29T17:45:04Z" is="time-ago">May 29, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/mustache.js.nuspec" class="js-directory-link" id="96f4d633a8c27aff5548d421b6798b96-7a47994a1cbead5b34bd0cccca2022f606ab1a8a" title="mustache.js.nuspec">mustache.js.nuspec</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/c68b434eb438394d1b069e38ba9d582c8d1fd28f" class="message" data-pjax="true" title="Adding a bower.json file

The goal is to reduce the number of files downloaded by ignoring the test directory">Adding a bower.json file</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-03-18T00:15:15Z" is="time-ago">Mar 18, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/janl/mustache.js/blob/master/package.json" class="js-directory-link" id="b9cfc7f2cdf78a7f4b91a753d10865a2-1542449000c73f6e4f5accb5eae7eb31eb75b3f5" title="package.json">package.json</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/janl/mustache.js/commit/2e12efdeda50cb6818a337078c4f4f555c2558e3" class="message" data-pjax="true" title="Fixes AMD registration, volo package.json entry
This change allows the AMD define signature to match what common AMD optimizers use to find define calls that need naming.
Also updates the volo package.json entry so that the correct version of mustache can be fetched properly.">Fixes AMD registration, volo package.json entry</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-05-29T17:45:04Z" is="time-ago">May 29, 2014</time></span>
      </td>
    </tr>
</tbody>

    </table>
  </div>


  <div id="readme" class="boxed-group flush clearfix announce instapaper_body md">
    <h3>
      <span class="octicon octicon-book"></span>
      README.md
    </h3>

    <article class="markdown-body entry-content" itemprop="mainContentOfPage"><h1>
<a name="user-content-mustachejs---logic-less-mustache-templates-with-javascript" class="anchor" href="#mustachejs---logic-less-mustache-templates-with-javascript" aria-hidden="true"><span class="octicon octicon-link"></span></a>mustache.js - Logic-less {{mustache}} templates with JavaScript</h1>

<blockquote>
<p>What could be more logical awesome than no logic at all?</p>
</blockquote>

<p><a href="http://github.com/janl/mustache.js">mustache.js</a> is an implementation of the <a href="http://mustache.github.com/">mustache</a> template system in JavaScript.</p>

<p><a href="http://mustache.github.com/">Mustache</a> is a logic-less template syntax. It can be used for HTML, config files, source code - anything. It works by expanding tags in a template using values provided in a hash or object.</p>

<p>We call it "logic-less" because there are no if statements, else clauses, or for loops. Instead there are only tags. Some tags are replaced with a value, some nothing, and others a series of values.</p>

<p>For a language-agnostic overview of mustache's template syntax, see the <code>mustache(5)</code> <a href="http://mustache.github.com/mustache.5.html">manpage</a>.</p>

<h2>
<a name="user-content-where-to-use-mustachejs" class="anchor" href="#where-to-use-mustachejs" aria-hidden="true"><span class="octicon octicon-link"></span></a>Where to use mustache.js?</h2>

<p>You can use mustache.js to render mustache templates anywhere you can use JavaScript. This includes web browsers, server-side environments such as <a href="http://nodejs.org/">node</a>, and <a href="http://couchdb.apache.org/">CouchDB</a> views.</p>

<p>mustache.js ships with support for both the <a href="http://www.commonjs.org/">CommonJS</a> module API and the <a href="https://github.com/amdjs/amdjs-api/wiki/AMD">Asynchronous Module Definition</a> API, or AMD.</p>

<h2>
<a name="user-content-who-uses-mustachejs" class="anchor" href="#who-uses-mustachejs" aria-hidden="true"><span class="octicon octicon-link"></span></a>Who uses mustache.js?</h2>

<p>An updated list of mustache.js users is kept <a href="http://wiki.github.com/janl/mustache.js/beard-competition">on the Github wiki</a>. Add yourself or your company if you use mustache.js!</p>

<h2>
<a name="user-content-usage" class="anchor" href="#usage" aria-hidden="true"><span class="octicon octicon-link"></span></a>Usage</h2>

<p>Below is quick example how to use mustache.js:</p>

<div class="highlight highlight-js"><pre><span class="kt">var</span> view <span class="o">=</span> {
  title: <span class="s2">"Joe"</span>,
  calc: <span class="kt">function</span> () {
    <span class="k">return</span> <span class="m">2</span> <span class="o">+</span> <span class="m">4</span>;
  }
};

<span class="kt">var</span> output <span class="o">=</span> Mustache.render(<span class="s2">"{{title}} spends {{calc}}"</span>, view);</pre></div>

<p>In this example, the <code>Mustache.render</code> function takes two parameters: 1) the <a href="http://mustache.github.com/">mustache</a> template and 2) a <code>view</code> object that contains the data and code needed to render the template.</p>

<h2>
<a name="user-content-templates" class="anchor" href="#templates" aria-hidden="true"><span class="octicon octicon-link"></span></a>Templates</h2>

<p>A <a href="http://mustache.github.com/">mustache</a> template is a string that contains any number of mustache tags. Tags are indicated by the double mustaches that surround them. <code>{{person}}</code> is a tag, as is <code>{{#person}}</code>. In both examples we refer to <code>person</code> as the tag's key. There are several types of tags available in mustache.js, described below.</p>

<p>There are several techniques that can be used to load templates and hand them to mustache.js, here are two of them:</p>

<h4>
<a name="user-content-include-templates" class="anchor" href="#include-templates" aria-hidden="true"><span class="octicon octicon-link"></span></a>Include Templates</h4>

<p>If you need a template for a dynamic part in a static website, you can consider including the template in the static HTML file to avoid loading templates separately. Here's a small example using <code>jQuery</code>:</p>

<div class="highlight highlight-html"><pre>&lt;<span class="nt">html</span>&gt;
&lt;<span class="nt">body</span> <span class="na">onload</span>=<span class="s2">"loadUser"</span>&gt;
&lt;<span class="nt">div</span> <span class="na">id</span><span class="o">=</span><span class="s2">"target"</span>&gt;Loading...&lt;/<span class="nt">div</span>&gt;
<span class="h">&lt;<span class="nt">script</span> <span class="na">id</span><span class="o">=</span><span class="s2">"template"</span> <span class="na">type</span>=<span class="s2">"x-tmpl-mustache"</span>&gt;</span>
<span class="h">Hello {{ <span class="no">name</span> }}<span class="o">!</span></span>
<span class="h">&lt;/<span class="nt">script</span>&gt;</span>
&lt;/<span class="nt">body</span>&gt;
&lt;/<span class="nt">html</span>&gt;</pre></div>

<div class="highlight highlight-js"><pre><span class="kt">function</span> <span class="nf">loadUser</span>() {
  <span class="kt">var</span> template <span class="o">=</span> $(<span class="s1">'#template'</span>).html();
  Mustache.parse(template);   <span class="c1">// optional, speeds up future uses</span>
  <span class="kt">var</span> rendered <span class="o">=</span> Mustache.render(template, {<span class="no">name</span>: <span class="s2">"Luke"</span>});
  $(<span class="s1">'#target'</span>).html(rendered);
}</pre></div>

<h4>
<a name="user-content-load-external-templates" class="anchor" href="#load-external-templates" aria-hidden="true"><span class="octicon octicon-link"></span></a>Load External Templates</h4>

<p>If your templates reside in individual files, you can load them asynchronously and render them when they arrive. Another example using <code>jQuery</code>:</p>

<div class="highlight highlight-js"><pre><span class="kt">function</span> <span class="nf">loadUser</span>() {
  $.get(<span class="s1">'template.mst'</span>, <span class="kt">function</span>(<span class="nv">template</span>) {
    <span class="kt">var</span> rendered <span class="o">=</span> Mustache.render(template, {<span class="no">name</span>: <span class="s2">"Luke"</span>});
    $(<span class="s1">'#target'</span>).html(rendered);
  });
}</pre></div>

<h3>
<a name="user-content-variables" class="anchor" href="#variables" aria-hidden="true"><span class="octicon octicon-link"></span></a>Variables</h3>

<p>The most basic tag type is a simple variable. A <code>{{name}}</code> tag renders the value of the <code>name</code> key in the current context. If there is no such key, nothing is rendered.</p>

<p>All variables are HTML-escaped by default. If you want to render unescaped HTML, use the triple mustache: <code>{{{name}}}</code>. You can also use <code>&amp;</code> to unescape a variable.</p>

<p>View:</p>

<div class="highlight highlight-json"><pre>{
  <span class="s2">"name"</span>: <span class="s2">"Chris"</span>,
  <span class="s2">"company"</span>: <span class="s2">"&lt;b&gt;GitHub&lt;/b&gt;"</span>
}</pre></div>

<p>Template:</p>

<div class="highlight highlight-html"><pre>* {{name}}
* {{age}}
* {{company}}
* {{{company}}}
* {{<span class="err">&amp;</span>company}}</pre></div>

<p>Output:</p>

<div class="highlight highlight-html"><pre>* Chris
*
* <span class="sc">&amp;lt;</span>b<span class="sc">&amp;gt;</span>GitHub<span class="sc">&amp;lt;</span>/b<span class="sc">&amp;gt;</span>
* &lt;<span class="nt">b</span>&gt;GitHub&lt;/<span class="nt">b</span>&gt;
* &lt;<span class="nt">b</span>&gt;GitHub&lt;/<span class="nt">b</span>&gt;</pre></div>

<p>JavaScript's dot notation may be used to access keys that are properties of objects in a view.</p>

<p>View:</p>

<div class="highlight highlight-json"><pre>{
  <span class="s2">"name"</span>: {
    <span class="s2">"first"</span>: <span class="s2">"Michael"</span>,
    <span class="s2">"last"</span>: <span class="s2">"Jackson"</span>
  },
  <span class="s2">"age"</span>: <span class="s2">"RIP"</span>
}</pre></div>

<p>Template:</p>

<div class="highlight highlight-html"><pre>* {{name.first}} {{name.last}}
* {{age}}</pre></div>

<p>Output:</p>

<div class="highlight highlight-html"><pre>* Michael Jackson
* RIP</pre></div>

<h3>
<a name="user-content-sections" class="anchor" href="#sections" aria-hidden="true"><span class="octicon octicon-link"></span></a>Sections</h3>

<p>Sections render blocks of text one or more times, depending on the value of the key in the current context.</p>

<p>A section begins with a pound and ends with a slash. That is, <code>{{#person}}</code> begins a <code>person</code> section, while <code>{{/person}}</code> ends it. The text between the two tags is referred to as that section's "block".</p>

<p>The behavior of the section is determined by the value of the key.</p>

<h4>
<a name="user-content-false-values-or-empty-lists" class="anchor" href="#false-values-or-empty-lists" aria-hidden="true"><span class="octicon octicon-link"></span></a>False Values or Empty Lists</h4>

<p>If the <code>person</code> key does not exist, or exists and has a value of <code>null</code>, <code>undefined</code>, <code>false</code>, <code>0</code>, or <code>NaN</code>, or is an empty string or an empty list, the block will not be rendered.</p>

<p>View:</p>

<div class="highlight highlight-json"><pre>{
  <span class="s2">"person"</span>: <span class="kc">false</span>
}</pre></div>

<p>Template:</p>

<div class="highlight highlight-html"><pre>Shown.
{{#person}}
Never shown!
{{/person}}</pre></div>

<p>Output:</p>

<div class="highlight highlight-html"><pre>Shown.</pre></div>

<h4>
<a name="user-content-non-empty-lists" class="anchor" href="#non-empty-lists" aria-hidden="true"><span class="octicon octicon-link"></span></a>Non-Empty Lists</h4>

<p>If the <code>person</code> key exists and is not <code>null</code>, <code>undefined</code>, or <code>false</code>, and is not an empty list the block will be rendered one or more times.</p>

<p>When the value is a list, the block is rendered once for each item in the list. The context of the block is set to the current item in the list for each iteration. In this way we can loop over collections.</p>

<p>View:</p>

<div class="highlight highlight-json"><pre>{
  <span class="s2">"stooges"</span>: [
    { <span class="s2">"name"</span>: <span class="s2">"Moe"</span> },
    { <span class="s2">"name"</span>: <span class="s2">"Larry"</span> },
    { <span class="s2">"name"</span>: <span class="s2">"Curly"</span> }
  ]
}</pre></div>

<p>Template:</p>

<div class="highlight highlight-html"><pre>{{#stooges}}
&lt;<span class="nt">b</span>&gt;{{name}}&lt;/<span class="nt">b</span>&gt;
{{/stooges}}</pre></div>

<p>Output:</p>

<div class="highlight highlight-html"><pre>&lt;<span class="nt">b</span>&gt;Moe&lt;/<span class="nt">b</span>&gt;
&lt;<span class="nt">b</span>&gt;Larry&lt;/<span class="nt">b</span>&gt;
&lt;<span class="nt">b</span>&gt;Curly&lt;/<span class="nt">b</span>&gt;</pre></div>

<p>When looping over an array of strings, a <code>.</code> can be used to refer to the current item in the list.</p>

<p>View:</p>

<div class="highlight highlight-json"><pre>{
  <span class="s2">"musketeers"</span>: [<span class="s2">"Athos"</span>, <span class="s2">"Aramis"</span>, <span class="s2">"Porthos"</span>, <span class="s2">"D'Artagnan"</span>]
}</pre></div>

<p>Template:</p>

<div class="highlight highlight-html"><pre>{{#musketeers}}
* {{.}}
{{/musketeers}}</pre></div>

<p>Output:</p>

<div class="highlight highlight-html"><pre>* Athos
* Aramis
* Porthos
* D'Artagnan</pre></div>

<p>If the value of a section variable is a function, it will be called in the context of the current item in the list on each iteration.</p>

<p>View:</p>

<div class="highlight highlight-js"><pre>{
  <span class="s2">"beatles"</span>: [
    { <span class="s2">"firstName"</span>: <span class="s2">"John"</span>, <span class="s2">"lastName"</span>: <span class="s2">"Lennon"</span> },
    { <span class="s2">"firstName"</span>: <span class="s2">"Paul"</span>, <span class="s2">"lastName"</span>: <span class="s2">"McCartney"</span> },
    { <span class="s2">"firstName"</span>: <span class="s2">"George"</span>, <span class="s2">"lastName"</span>: <span class="s2">"Harrison"</span> },
    { <span class="s2">"firstName"</span>: <span class="s2">"Ringo"</span>, <span class="s2">"lastName"</span>: <span class="s2">"Starr"</span> }
  ],
  <span class="s2">"name"</span>: <span class="kt">function</span> () {
    <span class="k">return</span> <span class="nb">this</span>.firstName <span class="o">+</span> <span class="s2">" "</span> <span class="o">+</span> <span class="nb">this</span>.lastName;
  }
}</pre></div>

<p>Template:</p>

<div class="highlight highlight-html"><pre>{{#beatles}}
* {{name}}
{{/beatles}}</pre></div>

<p>Output:</p>

<div class="highlight highlight-html"><pre>* John Lennon
* Paul McCartney
* George Harrison
* Ringo Starr</pre></div>

<h4>
<a name="user-content-functions" class="anchor" href="#functions" aria-hidden="true"><span class="octicon octicon-link"></span></a>Functions</h4>

<p>If the value of a section key is a function, it is called with the section's literal block of text, un-rendered, as its first argument. The second argument is a special rendering function that uses the current view as its view argument. It is called in the context of the current view object.</p>

<p>View:</p>

<div class="highlight highlight-js"><pre>{
  <span class="s2">"name"</span>: <span class="s2">"Tater"</span>,
  <span class="s2">"bold"</span>: <span class="kt">function</span> () {
    <span class="k">return</span> <span class="kt">function</span> (<span class="nv">text</span>, <span class="nv">render</span>) {
      <span class="k">return</span> <span class="s2">"&lt;b&gt;"</span> <span class="o">+</span> render(text) <span class="o">+</span> <span class="s2">"&lt;/b&gt;"</span>;
    }
  }
}</pre></div>

<p>Template:</p>

<div class="highlight highlight-html"><pre>{{#bold}}Hi {{name}}.{{/bold}}</pre></div>

<p>Output:</p>

<div class="highlight highlight-html"><pre>&lt;<span class="nt">b</span>&gt;Hi Tater.&lt;/<span class="nt">b</span>&gt;</pre></div>

<h3>
<a name="user-content-inverted-sections" class="anchor" href="#inverted-sections" aria-hidden="true"><span class="octicon octicon-link"></span></a>Inverted Sections</h3>

<p>An inverted section opens with <code>{{^section}}</code> instead of <code>{{#section}}</code>. The block of an inverted section is rendered only if the value of that section's tag is <code>null</code>, <code>undefined</code>, <code>false</code>, or an empty list.</p>

<p>View:</p>

<div class="highlight highlight-json"><pre>{
  <span class="s2">"repos"</span>: []
}</pre></div>

<p>Template:</p>

<div class="highlight highlight-html"><pre>{{#repos}}&lt;<span class="nt">b</span>&gt;{{name}}&lt;/<span class="nt">b</span>&gt;{{/repos}}
{{^repos}}No repos :({{/repos}}</pre></div>

<p>Output:</p>

<div class="highlight highlight-html"><pre>No repos :(</pre></div>

<h3>
<a name="user-content-comments" class="anchor" href="#comments" aria-hidden="true"><span class="octicon octicon-link"></span></a>Comments</h3>

<p>Comments begin with a bang and are ignored. The following template:</p>

<div class="highlight highlight-html"><pre>&lt;<span class="nt">h1</span>&gt;Today{{! ignore me }}.&lt;/<span class="nt">h1</span>&gt;</pre></div>

<p>Will render as follows:</p>

<div class="highlight highlight-html"><pre>&lt;<span class="nt">h1</span>&gt;Today.&lt;/<span class="nt">h1</span>&gt;</pre></div>

<p>Comments may contain newlines.</p>

<h3>
<a name="user-content-partials" class="anchor" href="#partials" aria-hidden="true"><span class="octicon octicon-link"></span></a>Partials</h3>

<p>Partials begin with a greater than sign, like {{&gt; box}}.</p>

<p>Partials are rendered at runtime (as opposed to compile time), so recursive partials are possible. Just avoid infinite loops.</p>

<p>They also inherit the calling context. Whereas in ERB you may have this:</p>

<div class="highlight highlight-html+erb"><pre><span class="h"><span class="cp">&lt;%=</span> partial <span class="ss">:next_more</span>, <span class="ss">:start</span> <span class="o">=&gt;</span> start, <span class="ss">:size</span> <span class="o">=&gt;</span> size <span class="cp">%&gt;</span></span></pre></div>

<p>Mustache requires only this:</p>

<div class="highlight highlight-html"><pre>{{&gt; next_more}}</pre></div>

<p>Why? Because the <code>next_more.mustache</code> file will inherit the <code>size</code> and <code>start</code> variables from the calling context. In this way you may want to think of partials as includes, or template expansion, even though it's not literally true.</p>

<p>For example, this template and partial:</p>

<pre><code>base.mustache:
&lt;h2&gt;Names&lt;/h2&gt;
{{#names}}
  {{&gt; user}}
{{/names}}

user.mustache:
&lt;strong&gt;{{name}}&lt;/strong&gt;
</code></pre>

<p>Can be thought of as a single, expanded template:</p>

<div class="highlight highlight-html"><pre>&lt;<span class="nt">h2</span>&gt;Names&lt;/<span class="nt">h2</span>&gt;
{{#names}}
  &lt;<span class="nt">strong</span>&gt;{{name}}&lt;/<span class="nt">strong</span>&gt;
{{/names}}</pre></div>

<p>In mustache.js an object of partials may be passed as the third argument to <code>Mustache.render</code>. The object should be keyed by the name of the partial, and its value should be the partial text.</p>

<div class="highlight highlight-js"><pre>Mustache.render(template, view, {
  user: userTemplate
});</pre></div>

<h3>
<a name="user-content-set-delimiter" class="anchor" href="#set-delimiter" aria-hidden="true"><span class="octicon octicon-link"></span></a>Set Delimiter</h3>

<p>Set Delimiter tags start with an equals sign and change the tag delimiters from <code>{{</code> and <code>}}</code> to custom strings.</p>

<p>Consider the following contrived example:</p>

<pre><code>* {{ default_tags }}
{{=&lt;% %&gt;=}}
* &lt;% erb_style_tags %&gt;
&lt;%={{ }}=%&gt;
* {{ default_tags_again }}
</code></pre>

<p>Here we have a list with three items. The first item uses the default tag style, the second uses ERB style as defined by the Set Delimiter tag, and the third returns to the default style after yet another Set Delimiter declaration.</p>

<p>According to <a href="http://google-ctemplate.googlecode.com/svn/trunk/doc/howto.html">ctemplates</a>, this "is useful for languages like TeX, where double-braces may occur in the text and are awkward to use for markup."</p>

<p>Custom delimiters may not contain whitespace or the equals sign.</p>

<h2>
<a name="user-content-pre-parsing-and-caching-templates" class="anchor" href="#pre-parsing-and-caching-templates" aria-hidden="true"><span class="octicon octicon-link"></span></a>Pre-parsing and Caching Templates</h2>

<p>By default, when mustache.js first parses a template it keeps the full parsed token tree in a cache. The next time it sees that same template it skips the parsing step and renders the template much more quickly. If you'd like, you can do this ahead of time using <code>mustache.parse</code>.</p>

<div class="highlight highlight-js"><pre>Mustache.parse(template);

<span class="c1">// Then, sometime later.</span>
Mustache.render(template, view);</pre></div>

<h2>
<a name="user-content-plugins-for-javascript-libraries" class="anchor" href="#plugins-for-javascript-libraries" aria-hidden="true"><span class="octicon octicon-link"></span></a>Plugins for JavaScript Libraries</h2>

<p>mustache.js may be built specifically for several different client libraries, including the following:</p>

<ul class="task-list">
<li><a href="http://jquery.com/">jQuery</a></li>
<li><a href="http://mootools.net/">MooTools</a></li>
<li><a href="http://www.dojotoolkit.org/">Dojo</a></li>
<li><a href="http://developer.yahoo.com/yui/">YUI</a></li>
<li><a href="http://qooxdoo.org/">qooxdoo</a></li>
</ul>

<p>These may be built using <a href="http://rake.rubyforge.org/">Rake</a> and one of the following commands:</p>

<pre><code>$ rake jquery
$ rake mootools
$ rake dojo
$ rake yui3
$ rake qooxdoo
</code></pre>

<h2>
<a name="user-content-testing" class="anchor" href="#testing" aria-hidden="true"><span class="octicon octicon-link"></span></a>Testing</h2>

<p>The mustache.js test suite uses the <a href="http://visionmedia.github.com/mocha/">mocha</a> testing framework. In order to run the tests you'll need to install <a href="http://nodejs.org/">node</a>. Once that's done you can install mocha using <a href="http://npmjs.org/">npm</a>.</p>

<pre><code>$ npm install -g mocha
</code></pre>

<p>You also need to install the sub module containing <a href="http://github.com/mustache/spec">Mustache specifications</a> in the project root.</p>

<pre><code>$ git submodule init
$ git submodule update
</code></pre>

<p>Then run the tests.</p>

<pre><code>$ mocha test
</code></pre>

<p>The test suite consists of both unit and integration tests. If a template isn't rendering correctly for you, you can make a test for it by doing the following:</p>

<ol class="task-list">
<li>Create a template file named <code>mytest.mustache</code> in the <code>test/_files</code>
 directory. Replace <code>mytest</code> with the name of your test.</li>
<li>Create a corresponding view file named <code>mytest.js</code> in the same directory.
 This file should contain a JavaScript object literal enclosed in
 parentheses. See any of the other view files for an example.</li>
<li>Create a file with the expected output in <code>mytest.txt</code> in the same
 directory.</li>
</ol>

<p>Then, you can run the test with:</p>

<pre><code>$ TEST=mytest mocha test/render-test.js
</code></pre>

<h2>
<a name="user-content-thanks" class="anchor" href="#thanks" aria-hidden="true"><span class="octicon octicon-link"></span></a>Thanks</h2>

<p>mustache.js wouldn't kick ass if it weren't for these fine souls:</p>

<ul class="task-list">
<li>Chris Wanstrath / defunkt</li>
<li>Alexander Lang / langalex</li>
<li>Sebastian Cohnen / tisba</li>
<li>J Chris Anderson / jchris</li>
<li>Tom Robinson / tlrobinson</li>
<li>Aaron Quint / quirkey</li>
<li>Douglas Crockford</li>
<li>Nikita Vasilyev / NV</li>
<li>Elise Wood / glytch</li>
<li>Damien Mathieu / dmathieu</li>
<li>Jakub Kuźma / qoobaa</li>
<li>Will Leinweber / will</li>
<li>dpree</li>
<li>Jason Smith / jhs</li>
<li>Aaron Gibralter / agibralter</li>
<li>Ross Boucher / boucher</li>
<li>Matt Sanford / mzsanford</li>
<li>Ben Cherry / bcherry</li>
<li>Michael Jackson / mjijackson</li>
</ul>
</article>
  </div>


        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div><!-- /.container -->
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer" role="contentinfo">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="https://developer.github.com">API</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>

    </ul>

    <a href="/" aria-label="Homepage">
      <span class="mega-octicon octicon-mark-github" title="GitHub"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2014 <span title="0.05277s from github-fe131-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-suggester-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="fullscreen-contents js-fullscreen-contents js-suggester-field" placeholder=""></textarea>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped tooltipped-w" aria-label="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped tooltipped-w"
      aria-label="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-x flash-close js-ajax-error-dismiss" aria-label="Dismiss error"></a>
      Something went wrong with that request. Please try again.
    </div>


      <script crossorigin="anonymous" src="https://assets-cdn.github.com/assets/frameworks-15f10010d7ea9e4d5b9f20455abfb143a279c44fe8decefa4ab0af3a11c2e0fe.js" type="text/javascript"></script>
      <script async="async" crossorigin="anonymous" src="https://assets-cdn.github.com/assets/github-32b736baea9ab5d376df386d5e12d9bf3bd5489bb6b81288408097a767e0bf17.js" type="text/javascript"></script>
      
      
  </body>
</html>

