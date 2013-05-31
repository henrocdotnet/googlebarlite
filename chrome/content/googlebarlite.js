// Import the Services module for future use, if we're not in a browser window where it's already loaded
Components.utils.import('resource://gre/modules/Services.jsm');

var objGooglebarLite = {
	FormHistory: Components.classes["@mozilla.org/satchel/form-history;1"].getService(Components.interfaces.nsIFormHistory2 || Components.interfaces.nsIFormHistory),
	PrefBranch: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.googlebarlite."),
	
	// Create a constructor for the builtin transferable class
	nsTransferable: Components.Constructor("@mozilla.org/widget/transferable;1", "nsITransferable"),
	
	Prefs: {
		// General
		SiteToUse: { name: "site_to_use", value: "", type: "complex"},
		ClickSelectsAll: { name: "click_selects_all", value: false},
		SearchInTab: { name: "search_in_tab", value: false},
		RememberCombined: { name: "remember_combined", value: false},
		SearchOnDragDrop: { name: "search_on_drag_drop", value: false},
		DisableAutoCorrect: { name: "disable_auto_correct", value: false},
		UseSecureSearch: { name: "use_secure_search", value: false},
		
		// Search history
		WarnOnFormHistory: { name: "warn_on_form_history", value: false},
		MaintainHistory: { name: "maintain_history", value: false},
		EnableAutoComplete: { name: "enable_auto_complete", value: false},
		UseInlineComplete: { name: "use_inline_complete", value: false},
		AutoSearch: { name: "auto_search", value: false},
		PromptToClear: { name: "prompt_to_clear", value: false},
		IgnoreDictionary: { name: "ignore_dictionary", value: false},
		
		// Toolbar buttons
		TB_ShowLabels: { name: "buttons.showlabels", value: false},
		TB_ShowUp: { name: "buttons.up", value: false, xulid: "GBL-TB-UpButton"},
		TB_ShowHighlighter: { name: "buttons.highlighter", value: false, xulid: "GBL-TB-Highlighter"},
		TB_ShowSearchWords: { name: "buttons.searchwords", value: false, xulid: "GBL-TB-SearchWordsContainer"},
		TB_ShowCombined: { name: "buttons.combined", value: false, xulid: "GBL-TB-Combined"},
		TB_ShowWeb: { name: "buttons.web", value: false, xulid: "GBL-TB-Web"},
		TB_ShowLucky: { name: "buttons.lucky", value: false, xulid: "GBL-TB-Lucky"},
		TB_ShowSite: { name: "buttons.site", value: false, xulid: "GBL-TB-Site"},
		TB_ShowImages: { name: "buttons.images", value: false, xulid: "GBL-TB-Images"},
		TB_ShowVideo: { name: "buttons.video", value: false, xulid: "GBL-TB-Video"},
		TB_ShowNews: { name: "buttons.news", value: false, xulid: "GBL-TB-News"},
		TB_ShowMaps: { name: "buttons.maps", value: false, xulid: "GBL-TB-Maps"},
		TB_ShowShopping: { name: "buttons.shopping", value: false, xulid: "GBL-TB-Shopping"},
		TB_ShowGroups: { name: "buttons.groups", value: false, xulid: "GBL-TB-Groups"},
		TB_ShowBlog: { name: "buttons.blog", value: false, xulid: "GBL-TB-Blog"},
		TB_ShowBook: { name: "buttons.book", value: false, xulid: "GBL-TB-Book"},
		TB_ShowFinance: { name: "buttons.finance", value: false, xulid: "GBL-TB-Finance"},
		TB_ShowScholar: { name: "buttons.scholar", value: false, xulid: "GBL-TB-Scholar"},
		TB_ShowDictionary: { name: "buttons.dictionary", value: false, xulid: "GBL-TB-Dictionary"},
		
		// Keyboard shortcuts
		ShortcutCtrl: { name: "shortcut_ctrl", value: false },
		ShortcutAlt: { name: "shortcut_alt", value: false },
		ShortcutShift: { name: "shortcut_shift", value: false },
		FocusKey: { name: "focus_key", value: "", type: "string"},
		ShiftSearch: { name: "shift_search", value: "", type: "string"},
		CtrlSearch: { name: "ctrl_search", value: "", type: "string"},
		ShiftCtrlSearch: { name: "shift_ctrl_search", value: "", type: "string"},
		
		// Context menu
		CM_ShowContext: { name: "context.showcontext", value: false},
		CM_Web: { name: "context.web", value: false},
		CM_Site: { name: "context.site", value: false},
		CM_Images: { name: "context.images", value: false},
		CM_Video: { name: "context.video", value: false},
		CM_Groups: { name: "context.groups", value: false},
		CM_Maps: { name: "context.maps", value: false},
		CM_Dictionary: { name: "context.dictionary", value: false},
		CM_Backward: { name: "context.backward", value: false},
		CM_Cached: { name: "context.cached", value: false},
		CM_CachedLink: { name: "context.cachedlink", value: false},
		CM_Similar: { name: "context.similar", value: false},
		CM_Translate: { name: "context.translate", value: false}
	},
	
	PrefObserver: {
		register: function() {
			//objGooglebarLite.PrefBranch.QueryInterface(Components.interfaces.nsIPrefBranch);
			objGooglebarLite.PrefBranch.addObserver("", this, false);
		},
		
		unregister: function() {
			if(!objGooglebarLite.PrefBranch) return;
			objGooglebarLite.PrefBranch.removeObserver("", this);
		},
		
		observe: function(subject, topic, data) {
			if(topic != "nsPref:changed") return;
			
			var prefID = null;
			var prefValue = null;
			
			// Update the preference value in our Prefs object
			for(var pid in objGooglebarLite.Prefs)
			{
				var p = objGooglebarLite.Prefs[pid];
				if(p.name == data)
				{
					// We found the preference we need to update
					if(p.hasOwnProperty("type"))
					{
						if(p.type == "string")
							p.value = objGooglebarLite.PrefBranch.getCharPref(p.name);
						else if(p.type == "complex")
							p.value = objGooglebarLite.PrefBranch.getComplexValue(p.name, Components.interfaces.nsIPrefLocalizedString).data;
					}
					else
						p.value = objGooglebarLite.PrefBranch.getBoolPref(p.name);
					
					prefID = pid;
					prefValue = p.value;
					break; // Done with the loop
				}
			}
			
			var prefs = objGooglebarLite.Prefs;
			
			if(data.indexOf("buttons.") != -1)
			{
				var p = prefs[prefID];
				if(prefs[prefID].hasOwnProperty("xulid"))
					document.getElementById(p.xulid).setAttribute("collapsed", !prefValue); // Toggle the physical XUL element's state
				
				switch(data)
				{
				case prefs.TB_ShowLabels.name:
					objGooglebarLite.ToggleButtonLabels(prefValue);
					break;
					
				case prefs.TB_ShowHighlighter.name:
					var hb = document.getElementById(prefs.TB_ShowHighlighter.xulid);
					if(hb.checked == true && prefValue == false)
					{
						hb.checked = false;
						objGooglebarLite.RemoveHighlighting(null);
						objGooglebarLite.LastHighlightedTerms = "";
						objGooglebarLite.UpdateSearchWordButtons();
					}
					break;

				case prefs.TB_ShowCombined.name:
					if(prefValue == false) document.getElementById(prefs.TB_ShowCombined.xulid).setAttribute("searchType", "web");
					break;
				}
				
				objGooglebarLite.CheckButtonContainer();
				objGooglebarLite.Resize(null); // Fake a resize to overflow properly
			}
			else if(data == prefs.CM_ShowContext.name)
			{
				objGooglebarLite.UpdateContextMenuVisibility();
			}
			else if(data == prefs.MaintainHistory.name ||
					data == prefs.UseInlineComplete.name ||
					data == prefs.EnableAutoComplete.name ||
					data == prefs.ClickSelectsAll.name)
			{
				objGooglebarLite.UpdateSearchBoxSettings();
			}
			else if(data == prefs.RememberCombined.name)
			{
				// Reset the combined search menu if the user disabled the option to remember it
				if(prefs.RememberCombined.value == false)
					document.getElementById("GBL-TB-Combined").setAttribute("searchType", "web");
			}
			else if(data == prefs.WarnOnFormHistory.name)
			{
				objGooglebarLite.ValidateSearchHistorySetting();
			}
		}
	},
	
	HighlightColors: new Array("background: #FF0;", "background: #0FF;", "background: #0F0;",
								"background: #F0F;", "background: orange;", "background: dodgerblue;"),

	Initialized: false,
	LastHighlightedTerms: "",
	OverflowButtonWidth: 0,
	PreviouslyOnSecureSearchPage: false,
	ToolbarPresent: false,
	
	SecureTLDs: {
		"google.co.uk": 1,
		"google.de": 1,
		"google.fr": 1
	},

	StylesArray: new Array("-moz-image-region: rect(0px 32px 16px 16px)",
							"-moz-image-region: rect(0px 48px 16px 32px)",
							"-moz-image-region: rect(0px 64px 16px 48px)",
							"-moz-image-region: rect(0px 80px 16px 64px)",
							"-moz-image-region: rect(0px 96px 16px 80px)",
							"-moz-image-region: rect(0px 112px 16px 96px)"),

	ProgressListener: {
		QueryInterface: function(aIID)
		{
			if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
				aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
				aIID.equals(Components.interfaces.nsISupports))
				return this;
			throw Components.results.NS_NOINTERFACE;
		},
	
		onProgressChange: function (aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress) {},
		onSecurityChange: function(aWebProgress, aRequest, aState) {},
		onStatusChange: function(aWebProgress, aRequest, aStatus, aMessage) {},
		
		onStateChange: function (aWebProgress, aRequest, aStateFlags, aStatus)
		{
			if(aStateFlags & Components.interfaces.nsIWebProgressListener.STATE_STOP)
			{
				if(document.getElementById("GBL-TB-Highlighter").checked == true)
					objGooglebarLite.AddHighlighting(null);
			}
		},
	
		onLocationChange: function(aProgress, aRequest, aLocation)
		{
			if (aLocation)
			{
				var terms = null;
				var url = objGooglebarLite.ConvertToURL(aLocation.spec);
				
				var urlHasHostProperty = null;
				try
				{
					if(url && url.host)
						urlHasHostProperty = true;
					else
						urlHasHostProperty = false;
				}
				catch (ex)
				{
					urlHasHostProperty = false;
				}

				// Only update the search terms if we're on a Google page (URL host must match "google.")
				if(url != null && urlHasHostProperty == true && /^https?/.test(url.scheme) && /google\./.test(url.host))
				{
					// For some reason, the nsIURL "query" property doesn't work on Google search result pages (possibly because of no
					// file extension in the URL?) So, I wrote my own function to grab the query portion of the URL.
					var urlQuery = objGooglebarLite.ExtractQuery(aLocation.spec);
					var queryParts = objGooglebarLite.ParseQueryString(urlQuery);
					
					if(queryParts.hasOwnProperty("as_q"))
						terms = queryParts["as_q"];
					else if(queryParts.hasOwnProperty("q"))
						terms = queryParts["q"];
					
					if(terms != null)
					{
						// If all of the following conditions are true, don't change the search terms (stupid forwarding trick from Google)
						// 1. User was previously on https google query
						// 2. User is now on http google query
						// 3. Query string is empty
						// 4. Parameter "esrc=s" is present
						if(! (objGooglebarLite.PreviouslyOnSecureSearchPage == true && 
						   url.scheme == "http" && 
						   queryParts.hasOwnProperty("esrc") &&
						   queryParts["esrc"] == "s" &&
						   terms == ""))
						{
							if(objGooglebarLite.GetSearchTerms(false) != terms)
								objGooglebarLite.SetSearchTerms(terms);
						}
						
						if(url.scheme == "https")
							objGooglebarLite.PreviouslyOnSecureSearchPage = true;
						else
							objGooglebarLite.PreviouslyOnSecureSearchPage = false;
					}
				}
	
				var searchSiteButton = document.getElementById("GBL-TB-Site");
				var searchSiteMenuItem = document.getElementById("GBL-TB-Combined-Site");
							
				// Disable the site search options under the following conditions:
				//  1. The URL is null
				//  2. The URL has no 'host' property
				//  3. The URL scheme is neither 'http' nor 'https'
				//  4. The URL does not contain 'google' in its host
	
				if (url == null || urlHasHostProperty == false || !(/^https?/.test(url.scheme)) || /google/.test(url.host))
				{
					searchSiteButton.setAttribute("disabled", true);
					searchSiteMenuItem.setAttribute("disabled", true);
				}
				else
				{
					searchSiteButton.setAttribute("disabled", false);
					searchSiteMenuItem.setAttribute("disabled", false);
				}
	
				objGooglebarLite.UpdateUpButton();
			}
		}
	},

	Log: function(aMessage)
	{
		var consoleService = Components.classes['@mozilla.org/consoleservice;1'].getService(Components.interfaces.nsIConsoleService);
		consoleService.logStringMessage('Googlebar_Lite: ' + aMessage);
	},
	
	About: function()
	{
		window.openDialog("chrome://googlebarlite/content/about.xul", "About Googlebar Lite", "centerscreen,chrome,modal");
	},

	AddHighlighting: function(win)
	{
		if(!win)
			win = window.content;
	
		var i=0; // Avoid multiple redeclaration warnings
	
		for(i=0; win.frames && i < win.frames.length; i++)
		{
			this.AddHighlighting(win.frames[i]);
		}
	
		var doc = win.document;
		if(!doc) { return; }
	
		var body = doc.body;
		if(!body) { return; }
	
		var terms = this.GetSearchTerms();
		var termsArray = this.SplitTerms(terms);
		this.LastHighlightedTerms = terms; // Back up the highlighted terms
	
		for(i=0; i<termsArray.length; i++)
		{
			var term = termsArray[i];
			term = term.replace(/"/g, ''); // Remove any double quotes that may appear in the search term
			
			// Don't highlight the AND or OR logical operators
			if(term.toLowerCase() == "or" || term.toLowerCase() == "and")
				continue;
			
			var span = doc.createElement("span");
			span.setAttribute("style", this.HighlightColors[i%6] + " color: #000; display: inline !important; font-size: inherit !important;");
			span.setAttribute("class", "GBL-Highlighted");
	
			var searchRange = doc.createRange(); // Create the search range
			searchRange.selectNodeContents(body); // Set our search range to everything in the body element
			
			var start = searchRange.cloneRange(); // Set a start point
			start.collapse(true); // Collapse to the beginning
			
			var end = searchRange.cloneRange(); // Set a start point
			end.collapse(false); // Collapse to the end
			
			// Create the finder instance on the fly
			var finder = Components.classes['@mozilla.org/embedcomp/rangefind;1']
				.createInstance(Components.interfaces.nsIFind);
	
			var result = null;
			while( (result = finder.Find(term, searchRange, start, end)) )
			{
				var hilitenode = span.cloneNode(true);
				result.surroundContents(hilitenode);
				
				start = result; // Pick up right after our first hit
				start.collapse(false); // Collapse this range to its end point
				
				// Workaround for bug https://bugzilla.mozilla.org/show_bug.cgi?id=488427
				// (forcing a FlushPendingNotifications call)
				body.offsetWidth;
			}
		}
	},

	AddSearchWordButtons: function(inString)
	{
		var searchWordsContainer = document.getElementById("GBL-TB-SearchWordsContainer");
		var highlighter = document.getElementById("GBL-TB-Highlighter");
		var overflowMenu = document.getElementById("GBL-Overflow-Menu");
		var stringBundle = document.getElementById("GBL-String-Bundle");
	
		var searchTerms = this.SplitTerms(inString);
		var tempButton;
		var tempMenuItem;

		var operators = Array("allinanchor:", "allintext:", "allintitle:", "allinurl:", "cache:", 
							  "define:", "filetype:", "id:", "inanchor:", "info:", "intext:",
							  "intitle:", "inurl:", "link:", "phonebook:", "related:", "site:");
	
		for(var i=0; i<searchTerms.length; i++)
		{
			var thisTerm = searchTerms[i];
			var containsOperator = false;

			for(var j=0; j<operators.length; j++)
			{
				if(thisTerm.toLowerCase().indexOf(operators[j]) != -1)
				{
					containsOperator = true;
					break;
				}
			}

			if(containsOperator == true || thisTerm.toLowerCase() == "or" || thisTerm.charAt(0) == "-")
				continue; // Ignore this term

			// Remove all double quotes
			thisTerm = thisTerm.replace(/"/g, '');
			if(thisTerm.length == 0)
				continue;
			
			tempButton = this.CreateXULElement("toolbarbutton", {
				'label': thisTerm,
				'class': 'GBL-TB-SearchWordButton',
				'collapsed': false,
				'tooltiptext': stringBundle.getFormattedString("GBL_FindNextOccurrence", [thisTerm]),
			});
			
			tempMenuItem = this.CreateXULElement("menuitem", {
				'label': thisTerm,
				'collapsed': "true",
				'tooltiptext': stringBundle.getFormattedString("GBL_FindNextOccurrence", [thisTerm])
			});
			
			if(highlighter.checked == true)
			{
				tempButton.setAttribute("style", this.StylesArray[i%6] + " !important;");
				tempMenuItem.setAttribute("style", this.StylesArray[i%6] + " !important;");
			}
	
			searchWordsContainer.appendChild(tempButton);
			overflowMenu.appendChild(tempMenuItem);
		}
	
		this.Resize(null); // Fake a resize to overflow properly
	},
	
	BuildSearchURL: function(prefix, restrict, searchTerms, useSecure, secureType)
	{
		var u = "";
		
		if(useSecure != null && useSecure == true)
		{
			if(this.SecureTLDs.hasOwnProperty(this.Prefs.SiteToUse.value))
				u = "https://www." + this.Prefs.SiteToUse.value + "/";
			else
				u = "https://www.google.com/";
			
			if (searchTerms.length > 0)
			{
				u += "search?q=" + searchTerms;
				if(this.Prefs.DisableAutoCorrect.value == true)
					u += "&nfpr=1";
				
				if(secureType != null)
					u += "&tbs=" + secureType;
			}
		}
		else
		{
			if(this.Prefs.SiteToUse.value.length > 0)
				u = "http://" + prefix + "." + this.Prefs.SiteToUse.value + "/" + restrict;
			else
				u = "http://" + prefix + ".google.com/" + restrict;

			if(searchTerms.length > 0)
			{
				u += "?q=" + searchTerms + "&ie=UTF-8";
				if(this.Prefs.DisableAutoCorrect.value == true)
					u += "&nfpr=1";
			}
		}
		
		return u;
	},
	
	CheckButtonContainer: function()
	{
		var c = document.getElementById("GBL-Buttons");
		var reportedWidth = c.boxObject.width;
		var actualWidth = 0;
	
		for(var i=0; i<c.childNodes.length; i++)
		{
			if(c.childNodes[i].nodeName == "toolbarbutton" || c.childNodes[i].nodeName == "toolbarseparator")
			{
				if(c.childNodes[i].collapsed == false)
					actualWidth += c.childNodes[i].boxObject.width;
			}
		}
	
		// If the button container is too large, resize it appropriately
		if(actualWidth < reportedWidth)
			c.setAttribute("width", actualWidth);
		
		// Also, update the separator controls as necessary
		var s1visible = this.Prefs.TB_ShowCombined.value;
		var s2visible = (this.Prefs.TB_ShowWeb.value || this.Prefs.TB_ShowLucky.value || this.Prefs.TB_ShowSite.value ||
						 this.Prefs.TB_ShowImages.value || this.Prefs.TB_ShowVideo.value || this.Prefs.TB_ShowNews.value ||
						 this.Prefs.TB_ShowMaps.value || this.Prefs.TB_ShowGroups.value || this.Prefs.TB_ShowBlog.value ||
						 this.Prefs.TB_ShowBook.value || this.Prefs.TB_ShowScholar.value || this.Prefs.TB_ShowDictionary.value ||
						 this.Prefs.TB_ShowFinance.value || this.Prefs.TB_ShowShopping.value);
		var s3visible = (this.Prefs.TB_ShowUp.value || this.Prefs.TB_ShowHighlighter.value);
		var s4visible = this.Prefs.TB_ShowSearchWords.value;

		document.getElementById("GBL-TB-Sep1").setAttribute("hidden", !(s1visible && (s2visible || s3visible || s4visible)));
		document.getElementById("GBL-TB-Sep2").setAttribute("hidden", !(s2visible && (s3visible || s4visible)));
		document.getElementById("GBL-TB-Sep3").setAttribute("hidden", !(s3visible && s4visible));
	},

	ClearHistory: function(flag)
	{
		if(flag == "false")
			return;
	
		this.FormHistory.removeEntriesForName("GBL-Search-History");
	
		this.SetSearchTerms(""); // Clear the search terms box and buttons
        
		var hb = document.getElementById("GBL-TB-Highlighter");
	
		if(hb.checked == true)
		{
			hb.checked = false;
			this.RemoveHighlighting(null);
		}
	},

	ClearHistoryPrompt: function()
	{
		if(this.Prefs.PromptToClear.value)
			window.openDialog("chrome://googlebarlite/content/confirm.xul", "Clear Search History?", "centerscreen,chrome,modal");
		else
			this.ClearHistory(true);
	},
	
	CombinedSearch: function(event)
	{
		var type = "web";
		
		if(event.target.nodeName == "menuitem")
		{
			type = event.target.getAttribute("searchType"); // Get the type from the menuitem the user selected
			if(this.Prefs.RememberCombined.value == true) // Update the combined menu if the option is set
				document.getElementById("GBL-TB-Combined").setAttribute("searchType", type);
		}
		else
			type = document.getElementById("GBL-TB-Combined").getAttribute("searchType");
		
		this.PrepareSearch(event, type);
	},

	ConfigureKeyboardShortcuts: function()
	{
		var windowEnumeration = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getEnumerator("navigator:browser");
		
		var modifiers = new Array();
		if(this.Prefs.ShortcutCtrl.value == true)
			modifiers.push("accel");
		
		if(this.Prefs.ShortcutAlt.value == true)
			modifiers.push("access");
		
		if(this.Prefs.ShortcutShift.value == true)
			modifiers.push("shift");
	
		// Loop through all open windows
		while(windowEnumeration.hasMoreElements())
		{
			var mainDocument = windowEnumeration.getNext().document;
			if(mainDocument)
			{
				var focusKey = mainDocument.getElementById("GBL-Focus-Key");
				focusKey.setAttribute("modifiers", modifiers.join());
				focusKey.setAttribute("key", this.Prefs.FocusKey.value);
			}
		}
	},
	
	ConvertTermsToURI: function(terms)
	{
		var termArray = terms.split(" ");
		for(var i=0; i<termArray.length; i++)
		{
			termArray[i] = this.MakeSafe(termArray[i]);
		}
		return termArray.join("+");
	},

	ConvertToURL: function(url)
	{
		if (typeof url == "string")
		{
			try {
				return Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(url, null, null);
			} catch (ex) {
				return null;
			}
		}
	
		return null;
	},
	
	CreateXULElement: function(element, attrs)
	{
		var tempItem = document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", element);
		for(var a in attrs)
		{
			tempItem.setAttribute(a, attrs[a]);
		}
		return tempItem;
	},
	
	CustomizeAfter: function(e)
	{
		var theToolbox = e.target;
		if(objGooglebarLite.ToolbarPresent == false)
		{
			// Toolbar was not there previously, but now is
			objGooglebarLite.Startup();
			objGooglebarLite.SetSearchTerms(""); // Always clear search terms after customizing the toolbar
		}
		else
		{
			// Toolbar was previously there, but now is not
			if(document.getElementById("GBL-Toolbar-MainItem") == null)
				objGooglebarLite.Shutdown();
			else
				objGooglebarLite.SetSearchTerms(""); // Always clear search terms after customizing the toolbar
		}
	},
	
	CustomizeBefore: function(e)
	{
		if(document.getElementById("GBL-Toolbar-MainItem") == null)
			objGooglebarLite.ToolbarPresent = false;
		else
			objGooglebarLite.ToolbarPresent = true;
	},

	DelayedStartup: function()
	{
		var searchbox = document.getElementById("GBL-SearchBox");
		searchbox.addEventListener("popupshowing", objGooglebarLite.SearchContextOnPopupShowing, true);
		searchbox.addEventListener("drop", objGooglebarLite.DragDropHandler, true);
		
		objGooglebarLite.ValidateSearchHistorySetting();
	},

	DisableSearchHistory: function(neverShowAgain)
	{
		// Disable the Googlebar Lite search history option and make sure we update the search box
		this.PrefBranch.setBoolPref(this.Prefs.MaintainHistory.name, false);
		this.UpdateSearchBoxSettings();
	
		// Disable the dialog from being displayed if the user asked to do so
		if(neverShowAgain)
			this.PrefBranch.setBoolPref(this.Prefs.WarnOnFormHistory.name, false);
	},
	
	DragDropHandler: function(event)
	{
		var dataType = "text/plain";
		if(event.dataTransfer.types.contains("text/uri-list"))
		{
			// Grab the link text if possible; otherwise fall back to the URL
			if(event.dataTransfer.types.contains("text/x-moz-url-desc"))
				dataType = "text/x-moz-url-desc";
			else
				dataType = "text/uri-list";
		}
		
		var data = event.dataTransfer.getData(dataType);
		data = data.replace(/[\r\n]/g, ' '); // Replace new-lines with a space
		data = objGooglebarLite.TrimString(data);
		
		if(!data || data == "") { return; } // Bail out if what was dragged is empty
		
		objGooglebarLite.SetSearchTerms(data);
		
		if(objGooglebarLite.Prefs.SearchOnDragDrop.value)
		{
			var useTab = objGooglebarLite.OpenInTab(event, false);
			objGooglebarLite.Search(data, "web", useTab);
		}
			
		event.preventDefault();
	},

	EnableFormHistory: function(neverShowAgain)
	{
		var b = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("browser.");
	
		// Enable form history
		b.setBoolPref("formfill.enable", true);
	
		// Disable the dialog from being displayed if the user asked to do so
		if(neverShowAgain)
			this.PrefBranch.setBoolPref(this.Prefs.WarnOnFormHistory.name, false);
	},

	ExtractQuery: function(url)
	{
		// Test for the AJAX-style query first (Google apparently gives it higher priority)
		if(/^[^#]+?#([^#]+)/.test(url))
			return RegExp.$1;
		else if (/^[^?]+?\?(.*)/.test(url)) // Test for the "normal-style" query
			return RegExp.$1;
		else
			return "";
	},

	// Reuse the find bar mechanisms in Firefox (we get a bunch of stuff for free that way)
	// Most of this function's code came from the Google toolbar
    FindInPage: function(term, e)
	{
		var findBar = document.defaultView.gFindBar;
		var shiftKey = e.shiftKey;
		var findObj;
		var cachedFindTerm;

		if ("_find" in findBar)
		{
			findObj = {
				find: function(t) {
					findBar._find(t);
				},
				findNext: function() {
					 findBar._findAgain(false);
				},
				findPrevious: function() {
					 findBar._findAgain(true);
				}
			};

			cachedFindTerm = getBrowser().fastFind.searchString;
		}
		else
		{
			findObj = findBar;
			cachedFindTerm = getBrowser().findString;
		}

		if (cachedFindTerm == term)
		{
			if(shiftKey)
				findObj.findPrevious();
			else
				findObj.findNext();
		}
		else
		{
			findObj.find(term);
			if(shiftKey)
				findObj.findPrevious();
		}
	},
	
	GetSearchTerms: function(trimString)
	{
		var val = document.getElementById("GBL-SearchBox").value;
		if(typeof trimString === "undefined" || trimString == true) // trimString defaults to true if not available
			return this.TrimString(val);
		else
			return val;
	},
	
	GetSearchType: function(event)
	{
		// Return the default value if the event is null
		if(!event)
			return "web";
		
		if(event.shiftKey)
		{
			if(event.ctrlKey)
				return this.Prefs.ShiftCtrlSearch.value;
			else
				return this.Prefs.ShiftSearch.value;
		}
	
		if(event.ctrlKey)
			return this.Prefs.CtrlSearch.value;
	
		// Are we remembering the combined search type? If so, return that value
		if(this.Prefs.RememberCombined.value == true)
			return document.getElementById("GBL-TB-Combined").getAttribute("searchType");
	
		return "web"; // Return the default if no search type modifiers were caught.
	},

	GetTextContent: function(node)
	{
		if(node.nodeType == Node.TEXT_NODE)
			return node.nodeValue;
		else
		{
			var str = "";
			for(var i=0; i < node.childNodes.length; i++)
			{
				if(node.childNodes[i].nodeName != "SCRIPT")
					str += this.GetTextContent(node.childNodes[i]);
			}
			return str;
		}
	},
	
	Help: function()
	{
		var newTab = getBrowser().addTab("http://www.borngeek.com/firefox/googlebarlite/doc/");
		getBrowser().selectedTab = newTab;
	},

	LoadPrefsAndInitUI: function()
	{
		for (var pid in this.Prefs)
		{
			// Cache the pref values in our Prefs object
			var p = this.Prefs[pid];
			if(p.hasOwnProperty("type"))
			{
				if(p.type == "string")
					p.value = this.PrefBranch.getCharPref(p.name);
				else if(p.type == "complex")
					p.value = this.PrefBranch.getComplexValue(p.name, Components.interfaces.nsIPrefLocalizedString).data;
			}
			else
				p.value = this.PrefBranch.getBoolPref(p.name);
			
			// Update toolbar button UI if it's a preference of that type
			if(p.name.indexOf("buttons.") != -1)
			{
				if(p.hasOwnProperty("xulid"))
				{
					document.getElementById(p.xulid).setAttribute("collapsed", !p.value); // Toggle the physical XUL element's state
					
					if(p.name == this.Prefs.TB_ShowCombined.name)
					{
						if(p.value == false)
							document.getElementById(this.Prefs.TB_ShowCombined.xulid).setAttribute("searchType", "web");
					}
				}
				else if(p.name == this.Prefs.TB_ShowLabels.name)
					this.ToggleButtonLabels(p.value);
			}
		}
		
		// If the option to remember the combined search type is disabled, but the default search type is hosed
		// for some reason, reset it to the default value
		if(this.Prefs.RememberCombined.value == false &&
		   document.getElementById("GBL-TB-Combined").getAttribute("searchType") != "web")
			document.getElementById("GBL-TB-Combined").setAttribute("searchType", "web");
		
		this.CheckButtonContainer();
		this.UpdateContextMenuVisibility();
		this.UpdateSearchBoxSettings();
	},
	
	LoadURL: function(url, openTab)
	{
		openUILinkIn(url, openTab ? "tab" : "current", false, null, null);
	},

	MakeSafe: function(element, index, array)
	{
		var safeTerm = encodeURIComponent(element);
		safeTerm = safeTerm.replace(/\'/g, '%27');
		return safeTerm;
	},
	
	MigratePrefs: function()
	{
		var oldBranch = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("googlebar_lite.");
		
		for(var pid in this.Prefs)
		{
			var p = this.Prefs[pid];
			if(oldBranch.prefHasUserValue(p.name))
			{
				if(p.hasOwnProperty("type"))
				{
					if(p.type == "string")
					{
						var temp = oldBranch.getCharPref(p.name);
						this.PrefBranch.setCharPref(p.name, temp);
						try {
							oldBranch.clearUserPref(p.name); // Clean up the old preference
						} catch (e) {}
					}
					else if(p.type == "complex")
					{
						// We only have 1 complex value as of this writing, so we're going to massage the value a bit
						var temp = oldBranch.getComplexValue(p.name, Components.interfaces.nsIPrefLocalizedString).data;
						temp = temp.substr(4); // Remove the "www." from the front of the string
						
						try {
							var pls = Components.classes["@mozilla.org/pref-localizedstring;1"].createInstance(Components.interfaces.nsIPrefLocalizedString);
							pls.data = temp;
							this.PrefBranch.setComplexValue(p.name, Components.interfaces.nsIPrefLocalizedString, pls);
						} catch (e) {}
						
						try {
							oldBranch.clearUserPref(p.name); // Clean up the old preference
						} catch (e) {}
					}
				}
				else
				{
					var temp = oldBranch.getBoolPref(p.name); // Get the old preference
					this.PrefBranch.setBoolPref(p.name, temp); // Move it to the new location
					try {
						oldBranch.clearUserPref(p.name); // Clean up the old preference
					} catch (e) {}
				}
			}
		}
	},
	
	OpenInTab: function(aEvent, allowAltKey)
	{
		if(aEvent == null)
			aEvent = { ctrlKey:false, altKey:false, button:0 };
	
		// If the search in tab option is checked, and we aren't viewing a blank window, open a new tab regardless
		if(this.TabIsBlank() == false && this.Prefs.SearchInTab.value)
			return true;
	
		// Only the search box passes in a true value for allowAltKey. This prevents a Ctrl+Enter search from the
		// search box from opening a custom search in a new tab.
		if(allowAltKey)
			return aEvent.altKey;
	
		// If we saw the CTRL key or a middle click, return true
		if(aEvent.ctrlKey || (aEvent.button && aEvent.button == 1))
			return true;
	
		return false;
	},

	OpenOptions: function()
	{
		window.openDialog("chrome://googlebarlite/content/prefs.xul", "Googlebar Lite Options", "centerscreen,chrome,modal,toolbar");
	},
	
	ParseQueryString: function(query)
	{
		var pieces = {};
		if(query)
		{
			// Strip any anchors (so they don't show up as search terms)
			query = query.replace(/#[^&]*$/, "");
			var pairs = query.split("&");
			for(var p in pairs)
			{
				var tokens = pairs[p].split("=");
				if(tokens)
				{
					var key = decodeURIComponent(tokens.shift().replace(/[+]/g, " "));
					pieces[key] = decodeURIComponent(tokens.join("=").replace(/[+]/g, " "));
				}
			}
		}
		return pieces;
	},

	PasteAndSearch: function()
	{
		var trans = this.Transferable();
		trans.addDataFlavor("text/unicode");
		Services.clipboard.getData(trans, Services.clipboard.kGlobalClipboard);
		
		var str = {};
		var strLength = {};
		
		trans.getTransferData("text/unicode", str, strLength);
		
		if(!str) return; // Exit if there's nothing there
		var pastetext = str.value.QueryInterface(Components.interfaces.nsISupportsString).data;
		pastetext = this.TrimString(pastetext);
		
		if(pastetext.length == 0) return; // Exit if the string is empty after trimming
		
		this.SetSearchTerms(pastetext);
	
		var useTab = false;
		if(this.TabIsBlank() == false)
			useTab = this.Prefs.SearchInTab.value;
	
		this.Search(pastetext, 'web', useTab);
	},

	PrepareMainMenu: function(event, searchType)
	{
		var useTab = this.OpenInTab(event, false);
		
		if(searchType == "gmail")
		{
			this.LoadURL("https://gmail.google.com/", useTab);
			return;
		}
	
		this.Search('', searchType, useTab);
	},
	
	PrepareSearch: function(event, searchType)
	{
		// Step 1: Get the search terms
		var searchTerms = this.GetSearchTerms();
	
		// Step 2: Check the search type (if necessary)
		if(searchType == "")
			searchType = this.GetSearchType(event);
	
		// Step 3: Determine if we need to open search results in a new tab
		var useTab = this.OpenInTab(event, false);
		
		// Step 4: Perform the search
		this.Search(searchTerms, searchType, useTab);
	},

	PrepareCachedSearch: function(searchType)
	{
		var useTab = false;
	
		if(this.TabIsBlank())
			useTab = this.Prefs.SearchInTab.value;
		
		this.Search('', searchType, useTab);
	},

	PrepareSelectedSearch: function(aEvent, searchType)
	{
		// ****************************************
		// Step 1: Get the selected text
		// ****************************************
	
		var node = document.popupNode;
		var selection = "";
		var nodeLocalName = node.localName.toLowerCase();
	
		if((nodeLocalName == "textarea") || (nodeLocalName == "input" && node.type == "text"))
			selection = node.value.substring(node.selectionStart, node.selectionEnd);
		else
		{
			var focusedWindow = document.commandDispatcher.focusedWindow;
			selection = focusedWindow.getSelection().toString();
		}
	
		// Limit the selection length
		if(selection.length >= 150)
			selection = selection.substring(0, 149);
	
		// ****************************************
		// Step 2: Clean up the selected text
		// ****************************************
	
		selection = this.TrimString(selection); // Clean up whitespace
		
		var selArray = selection.split(" ");
		for(var i=0; i<selArray.length; i++)
		{
			selArray[i] = selArray[i].replace(/^(\&|\(|\)|\[|\]|\{|\}|\"|,|\.|!|\?|'|:|;)+/, "");
			selArray[i] = selArray[i].replace(/(\&|\(|\)|\[|\]|\{|\}|\"|,|\.|!|\?|'|:|;)+$/, "");
		}
	
		selection = selArray.join(" ");
	
		// ****************************************
		// Step 3: Update the search box and search word buttons
		// ****************************************
	
		this.SetSearchTerms(selection);
	
		// ****************************************
		// Step 4: Perform the search
		// ****************************************
	
		var useTab = this.OpenInTab(aEvent, false);
	
		this.Search(selection, searchType, useTab);
	},
	
	RemoveHighlighting: function(win)
	{
		// Remove highlighting.  We use the find API again rather than
		// searching for our span elements by id so that we gain access to the
		// anonymous content that nsIFind searches.
	
		if(!win)
			win = window.content;
	
		var i=0; // Avoid multiple redeclaration warnings
	
		for(i=0; win.frames && i < win.frames.length; i++)
		{
			this.RemoveHighlighting(win.frames[i]);
		}
	
		var doc = win.document;
		if(!doc) return;
		var body = doc.body;
		if(!body) return;
	
		var terms = this.LastHighlightedTerms; // Restore the previously backed up highlighted terms
		var termsArray = this.SplitTerms(terms);
	
		for(i=0; i<termsArray.length; i++)
		{
			var term = termsArray[i];
			term = term.replace(/"/g, ''); // Remove any double quotes that may appear in the search term
	
			// Skip the AND or OR logical operators
			if(term.toLowerCase() == "or" || term.toLowerCase() == "and")
				continue;
			
			var searchRange = doc.createRange();
			searchRange.selectNodeContents(body);
			
			var startPt = searchRange.cloneRange();
			startPt.collapse(true);
			
			var endPt = searchRange.cloneRange();
			endPt.collapse(false);
			
			// Create the finder instance on the fly
			var finder = Components.classes['@mozilla.org/embedcomp/rangefind;1']
				.createInstance(Components.interfaces.nsIFind);
			
			var result = null;
			while((result = finder.Find(term, searchRange, startPt, endPt)))
			{
				var startContainer = result.startContainer;
				var elem = null;
				try { elem = startContainer.parentNode; } catch (e) { }
				if(elem)
				{
					// Avoid multiple redeclaration warnings
					var docfrag = null;
					var child = null;
					var next = null;
					var parent = null;
	
					if(elem.getAttribute("class") == "GBL-Highlighted")
					{
						docfrag = doc.createDocumentFragment();
						next = elem.nextSibling;
						parent = elem.parentNode;
	
						while((child = elem.firstChild)) {
							docfrag.appendChild(child);
						}
	
						startPt.setStartAfter(elem);
	
						parent.removeChild(elem);
						parent.insertBefore(docfrag, next);
					}
					else
					{
						// For whatever reason, we did not highlight this instance (or it
						// appears that we did not). Let's walk up the DOM tree to see if
						// we can find a span higher up. This fixes a bug in GBL with
						// poorly coded HTML.
						try {
							while((elem = elem.parentNode))
							{
								if(elem.getAttribute("class") == "GBL-Highlighted")
								{
									docfrag = doc.createDocumentFragment();
									next = elem.nextSibling;
									parent = elem.parentNode;
	
									while((child = elem.firstChild)) {
										docfrag.appendChild(child);
									}
	
									startPt.setStartAfter(elem);
	
									parent.removeChild(elem);
									parent.insertBefore(docfrag, next);
									break;
								}
							}
						} catch(e) {}
						
						startPt.setStart(result.endContainer, result.endOffset);
					}
				}
				else
				{
					startPt.setStart(result.endContainer, result.endOffset);
				}
	
				startPt.collapse(true);
			}
		}
	},

	Resize: function(event)
	{
		// Sizing issue hack (taken from patch for bug 266737)
		if(event && event.type == 'focus') 
			window.removeEventListener('focus', objGooglebarLite.Resize, false);
		
		var buttons = document.getElementById("GBL-TB-SearchWordsContainer");
		if(!buttons || !objGooglebarLite.Prefs.TB_ShowSearchWords.value)
			return;
	
		var chevron = document.getElementById("GBL-Overflow-Button");
		var available = window.innerWidth;

		// Sizing issue hack (taken from patch for bug 266737)
		if(available == 0)
			window.addEventListener('focus', objGooglebarLite.Resize, false);
	
		var overflowed = false;

		for(var i=0; i<buttons.childNodes.length; i++)
		{
			var button = buttons.childNodes[i];
			button.collapsed = overflowed;
	
			var offset = button.boxObject.x;
			if(offset + button.boxObject.width + objGooglebarLite.OverflowButtonWidth > available)
			{
				overflowed = true;
				// This button doesn't fit, so show it in the menu and hide it in the toolbar.
				if(!button.collapsed)
					button.collapsed = true;
				if(chevron.collapsed)
					chevron.collapsed = false;
			}
		}

		// If we never overflowed, make sure the overflow button is hidden from view
		if(overflowed == false)
			chevron.collapsed = true;
	},

	Search: function(searchTerms, searchType, useTab)
	{
		var win = window.content.document;
		var URL = "";
		var originalTerms = searchTerms;
		var canIgnore = false;	// True if doing a dictionary search
		var isEmpty = (searchTerms.length == 0);
	
		// ****************************************
		// Step 1: Convert the search terms into a URI capable string
		// ****************************************
		if(isEmpty == false)
			searchTerms = this.ConvertTermsToURI(searchTerms);
		
		// ****************************************
		// Step 2: Switch on the search type
		// ****************************************
	
		switch(searchType)
		{
		case "web":
			if(isEmpty) { URL = this.BuildSearchURL("www", "", "", this.Prefs.UseSecureSearch.value); }
			else		{ URL = this.BuildSearchURL("www", "search", searchTerms, this.Prefs.UseSecureSearch.value); }
			break;
	
		case "lucky":
			if(isEmpty) { URL = this.BuildSearchURL("www", "", "", this.Prefs.UseSecureSearch.value); }
			else		{ URL = this.BuildSearchURL("www", "search", searchTerms + "&btnI=I%27m+Feeling+Lucky", this.Prefs.UseSecureSearch.value); }
			break;
	
		case "site":
			if(isEmpty) { URL = this.BuildSearchURL("www", "", "", this.Prefs.UseSecureSearch.value); }
			else		{ URL = this.BuildSearchURL("www", "search", "site:" + win.location.hostname + "+" + searchTerms, this.Prefs.UseSecureSearch.value); }
			break;
	
		case "images":
			if(isEmpty) { URL = this.BuildSearchURL("images", "", ""); }
			else		{ URL = this.BuildSearchURL("images", "images", searchTerms, this.Prefs.UseSecureSearch.value, "&tbm=isch"); }
			break;
	
		case "video":
			if(isEmpty) { URL = this.BuildSearchURL("video", "", ""); }
			else		{ URL = this.BuildSearchURL("www", "search", searchTerms + "&tbm=vid", this.Prefs.UseSecureSearch.value); }
			break;
	
		case "news":
			// For some reason, searches prefer the "www" variant to the "news" variant
			if(isEmpty) { URL = this.BuildSearchURL("news", "", ""); }
			else		{ URL = this.BuildSearchURL("www", "search", searchTerms + "&tbm=nws", this.Prefs.UseSecureSearch.value, "nws:1"); }
			break;
	
		case "maps":
			if(isEmpty) { URL = this.BuildSearchURL("maps", "", ""); }
			else		{ URL = this.BuildSearchURL("maps", "maps", searchTerms); }
			break;
	
		case "shopping":
			if(isEmpty) { URL = this.BuildSearchURL("www", "shopping", ""); }
			else		{ URL = this.BuildSearchURL("www", "search", searchTerms + "&tbm=shop"); }
			break;
	
		case "groups":
			if(isEmpty) { URL = this.BuildSearchURL("groups", "", ""); }
			else		{ URL = this.BuildSearchURL("groups", "groups", searchTerms); }
			break;
	
		case "blog":
			if(isEmpty) { URL = this.BuildSearchURL("blogsearch", "blogsearch", ""); }
			else		{ URL = this.BuildSearchURL("blogsearch", "blogsearch", searchTerms, this.Prefs.UseSecureSearch.value, "blg:1"); }
			break;
	
		case "book":
			if(isEmpty) { URL = this.BuildSearchURL("www", "books", ""); }
			else		{ URL = this.BuildSearchURL("www", "books", searchTerms, this.Prefs.UseSecureSearch.value, "bks:1"); }
			break;
	
		case "finance":
			if(isEmpty) { URL = this.BuildSearchURL("www", "finance", ""); }
			else		{ URL = this.BuildSearchURL("www", "finance", searchTerms); }
			break;
	
		case "scholar":
			if(isEmpty) { URL = this.BuildSearchURL("scholar", "", ""); }
			else		{ URL = this.BuildSearchURL("scholar", "scholar", searchTerms); }
			break;
	
		case "dictionary":
			canIgnore = true;
			if(isEmpty) { URL = this.BuildSearchURL("www", "", ""); }
			else		{ URL = this.BuildSearchURL("www", "search", searchTerms + "&tbs=dfn:1"); }
			break;
			
		// The following cases are only accessible through the context menu
		case "backwards":
			URL = this.BuildSearchURL("www", "search", "link:" + encodeURIComponent(win.location.href));
			break;
	
		case "cached":
			URL = this.BuildSearchURL("www", "search", "cache:" + encodeURIComponent(win.location.href));
			break;
	
		case "cachedlink":
			URL = this.BuildSearchURL("www", "search", "cache:" + gContextMenu.link);
			break;
	
		case "similar":
			URL = this.BuildSearchURL("www", "search", "related:" + encodeURIComponent(win.location.href));
			break;
	
		case "translate":
			// Only uses .com (no country customization)
			URL = "http://translate.google.com/translate?u=" + encodeURIComponent(win.location.href);
			break;
	
		// The following cases are only accessible through items on the GBL main menu
		case "advanced":
			URL = this.BuildSearchURL("www", "advanced_search", "");
			break;
	
		case "searchprefs":
			URL = this.BuildSearchURL("www", "preferences", "");
			break;
	
		case "languagetools":
			URL = this.BuildSearchURL("www", "language_tools", "");
			break;
	
		default:
			if(isEmpty) { URL = this.BuildSearchURL("www", "", ""); }
			else		{ URL = this.BuildSearchURL("www", "search", searchTerms); }
			break;
		}
		
		// ****************************************
		// Step 3: Add terms to search history
		// ****************************************
		
		if(this.Prefs.MaintainHistory.value == true && !isEmpty && !(canIgnore && this.Prefs.IgnoreDictionary.value))
		{
			try {
				// Firefox 20+
				Components.utils.import("resource://gre/modules/PrivateBrowsingUtils.jsm");
				var isSet = PrivateBrowsingUtils.isWindowPrivate(window);
				if (!PrivateBrowsingUtils.isWindowPrivate(window))
					this.FormHistory.addEntry("GBL-Search-History", originalTerms);
			} catch(e) {
				// pre Firefox 20 (if you do not have access to a doc.
				// might use doc.hasAttribute("privatebrowsingmode") then instead)
				try {
					var inPrivateBrowsing = Components.classes["@mozilla.org/privatebrowsing;1"].
						getService(Components.interfaces.nsIPrivateBrowsingService).privateBrowsingEnabled;
					if (!inPrivateBrowsing)
						this.FormHistory.addEntry("GBL-Search-History", originalTerms);
				} catch(e) {
					Components.utils.reportError(e);
					return;
				}
			}
		}
	
		// ****************************************
		// Step 4: Perform search
		// ****************************************
		
		this.LoadURL(URL, useTab);
	},

	SearchBoxTextEntered: function(aTriggeringEvent)
	{
		// Step 1: Get the search terms
		var terms = this.GetSearchTerms();
	
		// Step 2: Do we need to open a new tab?
		var useTab = this.OpenInTab(aTriggeringEvent, true);
	
		// Step 3: Get the search type
		var searchType = this.GetSearchType(aTriggeringEvent);
	
		// Step 4: Search
		if(aTriggeringEvent != null || (aTriggeringEvent == null && this.Prefs.AutoSearch.value))
			this.Search(terms, searchType, useTab);
	},

	SearchContextOnPopupShowing: function(e)
	{
		if(e.originalTarget.localName == "menupopup" && !document.getElementById("GBL-PasteAndSearch"))
		{
			var stringBundle = document.getElementById("GBL-String-Bundle");
	
			var tempItem = objGooglebarLite.CreateXULElement("menuitem", {
				'id': "GBL-PasteAndSearch",
				'label': stringBundle.getString("GBL_PasteAndSearch_Label"),
				'accesskey': stringBundle.getString("GBL_PasteAndSearch_AK"),
				'command': "GBL-Command-PasteAndSearch"
			});
			
			var items = e.originalTarget.childNodes;
			for (var i=0; i<items.length; i++) {
				if(items[i].getAttribute("cmd") == "cmd_paste")
				{
					e.originalTarget.insertBefore(tempItem, items[i+1]);
					break;
				}
			}
		}
	
		var cmd = document.getElementById("GBL-Command-PasteAndSearch");
		var controller = document.commandDispatcher.getControllerForCommand("cmd_paste");
		var enabled = controller.isCommandEnabled("cmd_paste");
	
		// If the normal "Paste" command is disabled, let's disable ours too
		if(enabled)
			cmd.setAttribute("disabled", "false");
		else
			cmd.setAttribute("disabled", "true");
	},
	
	SetFocus: function(event)
	{
		var toolbar = document.getElementById("GBL-Toolbar");
		if(toolbar != null)
		{
			var searchBox = document.getElementById("GBL-SearchBox");
			if(searchBox != null && (!searchBox.parentNode || searchBox.parentNode.parentNode != toolbar || ! toolbar.collapsed))
				searchBox.focus();
		}
	},

	SetSearchTerms: function(terms)
	{
		document.getElementById("GBL-SearchBox").value = terms;
		this.TermsHaveUpdated();
	},

	Shutdown: function()
	{
		objGooglebarLite.PrefObserver.unregister();
		
		var searchbox = document.getElementById("GBL-SearchBox");
		searchbox.removeEventListener('popupshowing', objGooglebarLite.SearchContextOnPopupShowing, true);
		searchbox.removeEventListener('drop', objGooglebarLite.DragDropHandler, true);
		
		window.getBrowser().removeProgressListener(objGooglebarLite.ProgressListener);
		
		window.removeEventListener('aftercustomization', objGooglebarLite.CustomizeAfter, false);
		window.removeEventListener('beforecustomization', objGooglebarLite.CustomizeBefore, false);
		window.removeEventListener('focus', objGooglebarLite.Resize, false);
		window.removeEventListener('load', objGooglebarLite.Startup, false);
		window.removeEventListener('resize', objGooglebarLite.Resize, false);
		window.removeEventListener('unload', objGooglebarLite.Shutdown, false);
	},

	SplitCurrentURL: function()
	{
		var currentAddress = window.content.document.location.href;
	
		// Trim off the trailing slash if there is one
		if(currentAddress.charAt(currentAddress.length - 1) == "/")
			currentAddress = currentAddress.substring(0, currentAddress.length - 1);
	
		return currentAddress.split("/");
	},
	
	SplitTerms: function(searchwords)
	{
		var string = this.TrimString(searchwords);
		var buffer = "";
		var inQuotes = false;
		var inWord = false;
		var myArray = new Array();
		
		for(var i=0; i<string.length; i++)
		{
			var c = string.charAt(i);
			
			switch(c)
			{
			case ' ':
				if(inQuotes == false)
				{
					// Only push onto the array if the buffer isn't empty
					if(buffer != "")
					{
						myArray.push(buffer);
						buffer = "";
					}
					if(inWord == true)
						inWord = false;
				}
				else
					buffer += c;
				break;
	
			case '"':
				if(inQuotes == false)
				{
					inQuotes = true;
					inWord = true;
					buffer += "\"";
				}
				else
				{
					// We're coming out of quotes mode, so push the "word" onto the array and clear the buffer
					inQuotes = false;
					inWord = false;

					buffer += "\"";
					myArray.push(buffer);
					buffer = "";
				}
				break;
	
			case ',': // Ignore commas (regardless of where they are)
			case '|': // Ignore pipe
				break; 
	
			case '+': // Ignore plus
			case '~': // Ignore tilde
			case '(': // Ignore open paren
				if(inWord == false)
					break;
				
			case ')': // Ignore close paren
				if(inWord == true)
					break;
	
			default:
				if(inWord == false) 
					inWord = true;
				buffer += c;
			}
		}
		
		if(buffer != "")
			myArray.push(buffer);
		
		return myArray;
	},

	Startup: function()
	{
		// Only initialize if the main toolbar item is present
		if(document.getElementById("GBL-Toolbar-MainItem") && objGooglebarLite.Initialized == false)
		{
			objGooglebarLite.Initialized = true;
			
			objGooglebarLite.PrefObserver.register();
	
			window.getBrowser().addProgressListener(objGooglebarLite.ProgressListener);

			var chevron = document.getElementById("GBL-Overflow-Button");
			objGooglebarLite.OverflowButtonWidth = chevron.boxObject.width;
			chevron.collapsed = true; // Initalize the overflow button to a hidden state
	
			if(objGooglebarLite.PrefBranch.prefHasUserValue("prefs_version") == false)
			{
				objGooglebarLite.MigratePrefs(); // Migrate old preferences
				objGooglebarLite.PrefBranch.setIntPref("prefs_version", 2);
			}
			
			objGooglebarLite.LoadPrefsAndInitUI(); // Load stored preferences
			objGooglebarLite.ConfigureKeyboardShortcuts();

			if(window.opener != null)
			{
				var osb = window.opener.document.getElementById("GBL-SearchBox");
				objGooglebarLite.SetSearchTerms(osb.value);
			}
			else
				objGooglebarLite.TermsHaveUpdated();
	
			setTimeout(function(){objGooglebarLite.DelayedStartup();}, 50); // Needs to happen after Firefox's delayedStartup()
		}
	},
	
	TabIsBlank: function()
	{
		if(window.content.document.location == "about:blank" || window.content.document.location == "about:newtab")
			return true;
		else
			return false;
	},

	TermsHaveUpdated: function()
	{
		if(this.GetSearchTerms() === "")
		{
			document.getElementById("GBL-TB-Dictionary").setAttribute("disabled", "true");
			document.getElementById("GBL-TB-Combined-Dictionary").setAttribute("disabled", "true");
			document.getElementById("GBL-TB-Highlighter").setAttribute("disabled", "true");
		}
		else
		{
			document.getElementById("GBL-TB-Dictionary").setAttribute("disabled", "false");
			document.getElementById("GBL-TB-Combined-Dictionary").setAttribute("disabled", "false");
			document.getElementById("GBL-TB-Highlighter").setAttribute("disabled", "false");
		}

		this.UpdateSearchWordButtons();
	},
	
	ToggleButtonLabels: function(prefValue)
	{
		var stringBundle = document.getElementById("GBL-String-Bundle");
		document.getElementById(this.Prefs.TB_ShowCombined.xulid).setAttribute("label", (prefValue == true ? stringBundle.getString("GBL_TB_Combined_Label") : ""));
		document.getElementById(this.Prefs.TB_ShowUp.xulid).setAttribute("label", (prefValue == true ? stringBundle.getString("GBL_TB_Up_Label") : ""));
		document.getElementById(this.Prefs.TB_ShowHighlighter.xulid).setAttribute("label", (prefValue == true ? stringBundle.getString("GBL_TB_Highlighter_Label") : ""));
	},
	
	ToggleHighlighting: function()
	{
		var hb = document.getElementById("GBL-TB-Highlighter");
	
		if(hb.checked == true)
		{
			hb.checked = false;
			this.RemoveHighlighting(null);
			this.LastHighlightedTerms = ""; // Reset the backed up terms, just to be clean about it
		}
		else
		{
			hb.checked = true;
			this.AddHighlighting(null);
		}
	
		this.UpdateSearchWordButtons();
	},
	
	ToggleToolbar: function()
	{
		var toolbar = document.getElementById("GBL-Toolbar");
		toolbar.collapsed = !toolbar.collapsed;
		document.persist("GBL-Toolbar", "collapsed");
	},
	
	// Create a wrapper to construct an nsITransferable instance and set its source to the given window, when necessary
	Transferable: function(source)
	{
		var res = this.nsTransferable();
		if ('init' in res) {
			// When passed a Window object, find a suitable provacy context for it.
			if (source instanceof Ci.nsIDOMWindow)
				// Note: in Gecko versions >16, you can import the PrivateBrowsingUtils.jsm module
				// and use PrivateBrowsingUtils.privacyContextFromWindow(sourceWindow) instead
				source = source.QueryInterface(Ci.nsIInterfaceRequestor)
							   .getInterface(Ci.nsIWebNavigation);
	 
			res.init(source);
		}
		return res;
	},

	TrimString: function(string)
	{
		if (!string) return "";
	
		string = string.replace(/^\s+/, ''); // Trim leading white space
		string = string.replace(/\s+$/, ''); // Trim trailing white space
		string = string.replace(/\s+/g, ' '); // Replace all white space runs with a single space
	
		return string;
	},

	Up: function(path, event)
	{
		var useTab = this.OpenInTab(event, false);

		// Path is empty if the user clicks the up button
		if(path == "")
		{
			var addressArray = this.SplitCurrentURL();
			if(addressArray.length > 3)
			{
				var target = addressArray.slice(0, addressArray.length - 1).join("/") + "/";
				this.LoadURL(target, useTab);
			}
			else if(addressArray.length == 3)
			{
				var hostArray = addressArray[2].split(".");
				if(hostArray.length >= 3 && (addressArray[0] == "http:" || addressArray[0] == "https:") && hostArray[0] != "www")
				{
					var topHost = addressArray[0] + "//www";
					for(i=1; i<hostArray.length; i++)
					{
						topHost += "." + hostArray[i];
					}

					topHost += "/";
					this.LoadURL(topHost, useTab);
				}
			}
		}
		else
			this.LoadURL(path, useTab);
	},

	UpdateContextMenu: function()
	{
		// Grab the context menu items
		var conWeb = document.getElementById("GBL-Context-Web");
		var conSite = document.getElementById("GBL-Context-Site");
		var conImages = document.getElementById("GBL-Context-Images");
		var conVideo = document.getElementById("GBL-Context-Video");
		var conGroups = document.getElementById("GBL-Context-Groups");
		var conMaps = document.getElementById("GBL-Context-Maps");
		var conDictionary = document.getElementById("GBL-Context-Dictionary");
		var conBackward = document.getElementById("GBL-Context-Backward");
		var conCached = document.getElementById("GBL-Context-Cached");
		var conCachedLink = document.getElementById("GBL-Context-CachedLink");
		var conSimilar = document.getElementById("GBL-Context-Similar");
		var conTranslate = document.getElementById("GBL-Context-Translate");
		var conSubSep = document.getElementById("GBL-Context-SubSeparator");
	
		// Set the collapsed attribute as necessary
		conWeb.setAttribute("collapsed", !this.Prefs.CM_Web.value);
		conSite.setAttribute("collapsed", !this.Prefs.CM_Site.value);
		conImages.setAttribute("collapsed", !this.Prefs.CM_Images.value);
		conVideo.setAttribute("collapsed", !this.Prefs.CM_Video.value);
		conGroups.setAttribute("collapsed", !this.Prefs.CM_Groups.value);
		conMaps.setAttribute("collapsed", !this.Prefs.CM_Maps.value);
		conDictionary.setAttribute("collapsed", !this.Prefs.CM_Dictionary.value);
		conBackward.setAttribute("collapsed", !this.Prefs.CM_Backward.value);
		conCached.setAttribute("collapsed", !this.Prefs.CM_Cached.value);
		conCachedLink.setAttribute("collapsed", !this.Prefs.CM_CachedLink.value);
		conSimilar.setAttribute("collapsed", !this.Prefs.CM_Similar.value);
		conTranslate.setAttribute("collapsed", !this.Prefs.CM_Translate.value);
	
		// Deal with the separator
		conSubSep.setAttribute("hidden", !(this.Prefs.CM_Web.value || this.Prefs.CM_Site.value || this.Prefs.CM_Images.value ||
										   this.Prefs.CM_Video.value || this.Prefs.CM_Groups.value || this.Prefs.CM_Maps.value || 
										   this.Prefs.CM_Dictionary.value) || 
							   !(this.Prefs.CM_Backward.value || this.Prefs.CM_Cached.value || this.Prefs.CM_CachedLink.value || 
								 this.Prefs.CM_Similar.value || this.Prefs.CM_Translate.value));
	
		var node = document.popupNode;
		var selection = "";
		var nodeLocalName = node.localName.toLowerCase();
		if((nodeLocalName == "textarea") || (nodeLocalName == "input" && node.type == "text"))
			selection = node.value.substring(node.selectionStart, node.selectionEnd);
		else
		{
			var focusedWindow = document.commandDispatcher.focusedWindow;
			selection = focusedWindow.getSelection().toString();
		}
	
		// Update the selected text search items
		if(selection.length == 0)
		{
			conWeb.setAttribute("disabled", "true");
			conSite.setAttribute("disabled", "true");
			conImages.setAttribute("disabled", "true");
			conVideo.setAttribute("disabled", "true");
			conGroups.setAttribute("disabled", "true");
			conMaps.setAttribute("disabled", "true");
			conDictionary.setAttribute("disabled", "true");
		}
		else
		{
			conWeb.setAttribute("disabled", "false");
			conSite.setAttribute("disabled", "false");
			conImages.setAttribute("disabled", "false");
			conVideo.setAttribute("disabled", "false");
			conGroups.setAttribute("disabled", "false");
			conMaps.setAttribute("disabled", "false");
			conDictionary.setAttribute("disabled", "false");
		}
	
		// Update all of the web-page specific menu items
		var url = this.ConvertToURL(window.content.document.location.href);
	
		if(url == null || url.scheme == "file" || url.scheme == "about")
		{
			conBackward.setAttribute("disabled", "true");
			conCached.setAttribute("disabled", "true");
			conSimilar.setAttribute("disabled", "true");
			conTranslate.setAttribute("disabled", "true");
		}
		else
		{
			conBackward.setAttribute("disabled", "false");
			conCached.setAttribute("disabled", "false");
			conSimilar.setAttribute("disabled", "false");
			conTranslate.setAttribute("disabled", "false");
		}
	
		if(!gContextMenu.onLink || (/^file:/i.test(gContextMenu.link)) || (/^about:/i.test(gContextMenu.link)))
			conCachedLink.setAttribute("disabled", "true");
		else
			conCachedLink.setAttribute("disabled", "false");
	
	},

	UpdateContextMenuVisibility: function()
	{
		document.getElementById("GBL-Context-Menu").setAttribute("collapsed", !this.Prefs.CM_ShowContext.value);
		document.getElementById("GBL-Context-Separator").setAttribute("hidden", !this.Prefs.CM_ShowContext.value);
	},
	
	UpdateOverflowMenu: function()
	{
		var buttons = document.getElementById("GBL-TB-SearchWordsContainer");
		var overflowMenu = document.getElementById("GBL-Overflow-Menu");
	
		for(var i=0; i<buttons.childNodes.length; i++)
		{
			var button = buttons.childNodes[i];
			var menu = overflowMenu.childNodes[i];
			if(menu.collapsed == button.collapsed)
				menu.collapsed = !menu.collapsed;
		}
	},

	UpdateSearchBoxSettings: function()
	{
		var searchBox = document.getElementById("GBL-SearchBox");
		
		searchBox.setAttribute("enablehistory", this.Prefs.MaintainHistory.value);
	
		if(this.Prefs.MaintainHistory.value)
		{
			searchBox.setAttribute("completedefaultindex", this.Prefs.UseInlineComplete.value);
			searchBox.setAttribute("disableautocomplete", !this.Prefs.EnableAutoComplete.value);
		}
		else
		{
			searchBox.setAttribute("completedefaultindex", false);
			searchBox.setAttribute("disableautocomplete", true);
		}

		searchBox.clickSelectsAll = this.Prefs.ClickSelectsAll.value;
	},
	
	UpdateSearchWordButtons: function()
	{
		// Step 1: Clear existing search word buttons
		var searchWordsContainer = document.getElementById("GBL-TB-SearchWordsContainer");
		while(searchWordsContainer.hasChildNodes())
		{
			searchWordsContainer.removeChild(searchWordsContainer.lastChild);
		}
		
		var overflowMenu = document.getElementById("GBL-Overflow-Menu");
		while(overflowMenu.hasChildNodes())
		{
			overflowMenu.removeChild(overflowMenu.lastChild);
		}
		
		// Step 2: Add the new search word buttons
		this.AddSearchWordButtons(this.GetSearchTerms());
	},

	UpdateUpButton: function()
	{
		var addressArray = this.SplitCurrentURL();
		
		if(addressArray.length < 3)
		{
			document.getElementById("GBL-TB-UpButton").setAttribute("disabled", true);
		}
		else if(addressArray.length == 3)
		{
			var hostArray = addressArray[2].split(".");
			if(hostArray.length >= 3 && (addressArray[0] == "http:" || addressArray[0] == "https:") && hostArray[0] != "www")
				document.getElementById("GBL-TB-UpButton").setAttribute("disabled", false);
			else
				document.getElementById("GBL-TB-UpButton").setAttribute("disabled", true);
		}
		else
			document.getElementById("GBL-TB-UpButton").setAttribute("disabled", false);
	},
	
	UpdateUpMenu: function()
	{
		var addressArray = this.SplitCurrentURL();
	
		// Bail out if the addressArray is less than 3 in size (since it does not fit the xxx://yyy model)
		if(addressArray.length < 3)
			return;
	
		// Clean up what's currently in the up menu
		var upMenu = document.getElementById("GBL-TB-UpMenu");
		while(upMenu.hasChildNodes())
		{
			upMenu.removeChild(upMenu.lastChild);
		}

		var i=0; // Avoid multiple redeclaration warnings
	
		var tempItem = null;
		var currentPath = "";
		var endPoint = (addressArray[0] == "file:" ? 3 : 2);
	
		for(i=(addressArray.length - 1); i > endPoint; i--)
		{
			currentPath = addressArray.slice(0, i).join("/") + "/";
			upMenu.appendChild(this.CreateXULElement("menuitem", {'label': currentPath}));
		}
	
		var hostArray = addressArray[2].split(".");
	
		if(hostArray.length >= 3 && (addressArray[0] == "http:" || addressArray[0] == "https:") && hostArray[0] != "www")
		{
			var topHost = addressArray[0] + "//www";
			for(i=1; i<hostArray.length; i++)
			{
				topHost += "." + hostArray[i];
			}
	
			topHost += "/";
			upMenu.appendChild(this.CreateXULElement("menuitem", {'label': topHost}));
		}
	},

	ValidateSearchHistorySetting: function()
	{
		if(this.Prefs.WarnOnFormHistory.value == true)
		{
			var b = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("browser.");
	
			// Only case we care about is where form history is disabled, and search history is enabled
			if(b.getBoolPref("formfill.enable") == false && this.PrefBranch.getBoolPref(this.Prefs.MaintainHistory.name) == true)
				window.openDialog("chrome://googlebarlite/content/formhistory.xul", 
								  "Warning: Form History", "centerscreen,chrome,modal");
		}
	}
};

window.addEventListener('load', objGooglebarLite.Startup, false);
window.addEventListener('resize', objGooglebarLite.Resize, false);
window.addEventListener('unload', objGooglebarLite.Shutdown, false);
window.addEventListener('aftercustomization', objGooglebarLite.CustomizeAfter, false);
window.addEventListener('beforecustomization', objGooglebarLite.CustomizeBefore, false);
