## Googlebar Lite Revision History

### 5.1.3
* Added a preference for collapsing search words when Googlebar Lite is placed on the nav-bar toolbar (enabled by default). Disable this preference to get the old search word button behavior.

### 5.1.2
* Fixed a missing entity in all non-English locales
* Commented out a couple of unused devtool JavaScript module paths preventing compatibility with Firefox 44

### 5.1.1
* Fixed a mangled entity in the about dialog XUL

### 5.1.0
* Search words are now grouped together under one toolbar button when Googlebar Lite is placed on the nav-bar
* Googlebar Lite options can now be exported and imported, making it much easier to migrate options from one install to another
* Keyboard search modifiers (Ctrl+Enter, Shift+Enter, etc.) can now be toggled on or off
* Keyboard search modifiers (Ctrl+Enter, Shift+Enter, etc.) now have the option of opening in a new tab
* The basic web search type is now available for each keyboard search modifier
* The "classic Maps" option has been renamed and now toggles "Lite mode" when performing Google Maps searches
* Bumped the supported minVersion to 38.0
* Simplified the extension's about dialog
* Removed a few deprecated code paths
* Removed four locales due to their being very out of date: el-GR, hr-HR, pt-BR, and sk-SK
* Minor locale updates
* Googlebar Lite change history has been moved into a Markdown-flavored file at the top of the tree
* Bug Fix: Removed a hard-coded tooltip, replacing it with the appropriate localized variant

### 5.0.6
* Bug Fix: Performing an empty Maps search with the force classic Google Maps search option checked no longer results in a 404

### 5.0.5
* Added an option to hide all toolbar separators
* Added an option to force the classic Google Maps interface when performing a Maps search
* Added a Ukranian (uk-UA) translation
* Bug Fix: External toolbar buttons placed on the Googlebar Lite toolbar should no longer display their label

### 5.0.4
* Bug Fix: Corrected an issue introduced in 5.0.3 that caused the up menu from working properly

### 5.0.3
* Bug Fix: Simplified logic in the ProgressListener routines that caused search terms to occasionally be removed in some circumstances
* Bug Fix: The Googlebar Lite toolbar should no longer permanently overflow if it's placed on the navigation toolbar and search words are enabled
* Bug Fix: Overflowed search terms should now properly display an icon, indicating their highlighted color
* Bug Fix: Search word buttons are no longer created when the search word area is hidden

### 5.0.2
* Bug Fix: Fixed an issue caused by a change in Firefox 31 that prevented search suggestions from being clicked

### 5.0.1
* Bug Fix: Implemented a workaround to prevent the search site button, up button, and Google Dictionary menu item from getting stuck in the "disabled" state

### 5.0.0
* Google search suggestions are now offered when typing in the Googlebar Lite search box
* Searches are now performed over secure (https) connections by default
* Added an option to control the search suggestions feature (suggestions are enabled by default)
* Added an option to lock the search box width
* Internal search URLs have been tweaked
* Improved the efficiency of the window resize event listener
* Removed the option to enable secure search since it is now enabled by default
* Changed the minimum width of the search box from 150 to 100 pixels
* Removed several deprecated strings
* Removed the nb-NO locale due to it being woefully out of date
* Bug Fix: The search word overflow button is now hidden properly if it was visible and search words were turned off
* Bug Fix: The search word container is now resized properly if search words buttons were present and then turned off

### 4.9.15
* Restored the resize gripper

### 4.9.14
* Bug Fix: Search terms should no longer be duplicated when they already exist in the search history
* Bug Fix: The Googlebar Lite toolbar should now look better when using large icons

### 4.9.13
* Improved the look and feel of the search box on Windows and Linux
* Replaced the custom clear search history confirmation dialog with a built-in one from nsIPromptService
* Added a couple of extra presets to the search box width option
* Search box width presets now list their width in pixels
* Bug Fix: Fixed a minor warning that was appearing in the browser console on startup

### 4.9.12
* Removed the search box resize gripper, and replaced it with a new search box width preference
* Redesigned the way that internal preference data and common functions are stored
* Tweaked the internal XUL structure of the toolbar, specifically changing the way the search box is contained
* Removed a few deprecated content manifests from the package
* Simplified the style of the about dialog
* Removed a few unused style rules
* Bug Fix: The Googlebar Lite toolbar can now be placed in the new menu panel in Firefox 29+, using a new minimal user interface
* Bug Fix: The main Googlebar Lite toolbar item now renders correctly when placed into the toolbar palette
* Bug Fix: Fixed a minor object duplication issue with the preferences dialog

### 4.9.11
* Googlebar Lite context menu items can now be middle clicked to open in a new tab
* Search history is now asynchronous thanks to the FormHistory JavaScript module
* Changed a few of the default context menu display settings
* Removed a deprecated means of detecting private browsing
* Bumped the minVersion to 24.0
* Bumped the maxVersion to 45.*

### 4.9.10
* Simplified a number of service calls using the Services JavaScript module
* Bug Fix: Word search buttons should now work properly in Firefox 25.0

### 4.9.9
* Bug Fix: The dictionary search feature should work properly again
* Bug Fix: Corrected a minor Javascript variable declaration issue
* Bug Fix: Corrected a styling issue with highlighted search terms

### 4.9.8
* Search terms entered into private browsing windows are no longer saved to the search history
* The minimum supported Firefox version has been changed to 17.0
* Bumped the maxVersion to 30.*
* Removed all private browsing detection and observation logic, since those interfaces have been deprecated
* Removed the one and only reference to the nsiPrefBranch2 interface, since it has been deprecated
* Bug Fix: The video search option should no longer result in a 404 page not found error
* Bug Fix: Logical operators (AND / OR) should no longer be highlighted when search term highlighting is enabled
* Bug Fix: Open and close parentheses are now filtered out from search terms

### 4.9.7
* Various internal code improvements
* Bug Fix: Disabling the "Remember last combined-menu search type" option will now reset the combined search button properly
* Bug Fix: Doing a news search when no search terms are present will now take you to the Google News homepage as intended

### 4.9.6
* Bug Fix: The news search type should no longer result in a "page not found" error
* Bug Fix: Dragging a link to the search box no longer pastes the URL, but the link text instead

### 4.9.5
* Bug Fix: Corrected a problem that prevented the "Paste and Search" option from appearing in the search box context menu

### 4.9.4
* Simplified the drag and drop implementation to use a newer, more portable interface
* Improved the means by which URLs are loaded
* Improved the way dynamic XUL elements are created
* Improved the way events are handled for dynamic XUL elements
* The minimum supported Firefox version has been changed from 4.0 to 10.0
* Miscellaneous code improvements
* Bug Fix: The shopping search type now works properly
* Bug Fix: The news search type now passes the search query through properly

### 4.9.3
* Bug Fix: Corrected a number of locales that were incomplete in the previous release.

### 4.9.2
* Improved the customizability of the keyboard shortcut to set search box focus.
* Changed the default search box focus key from 'S' to 'O' (to avoid a conflict with the new developer bar).
* Improved the use of the nsITransferable interface, to be compatible with the upcoming changes to private browsing.
* Bumped the maxVersion to 25.*.
* Bug Fix: A new tab is no longer opened if the user has the "Open search results in a new tab" option checked, and the current tab is on "about:newtab".

### 4.9.1
* Made a few minor improvements to the installer manifest.
* Removed the embedded JAR file from within the XPI.
* Bumped the maxVersion to 20.*.
* Bug Fix: Corrected an issue that was causing the toolbar to shut down after toolbar customization.

### 4.9.0
* Native secure search should now work for the following top-level domains: google.co.uk, google.fr, and google.de
* Secure image searches can now be performed
* Added google.cz and google.si to the list of top-level domains
* The minimum supported Firefox version has been changed from 3.6 to 4.0
* Googlebar Lite no longer overrides the built-in toolbar customization function
* Removed obsolete contents.rdf files from each localization folder, reducing overall file size
* Bug Fix: Googlebar Lite is now initialized properly after adding the main Googlebar Lite toolbar item during toolbar customization
* Bug Fix: Googlebar Lite is now shut down properly after removing the main Googlebar Lite toolbar item during toolbar customization
* Bug Fix: Errors should no longer be thrown after removing the main Googlebar Lite toolbar item during toolbar customization
* Bug Fix: The routine for migrating old preferences should no longer be called on every startup
* Bug Fix: Updated redirection rules for several items in the Google Links menu, as well as when clicking toolbar buttons with no search terms, when the use secure search option is enabled
* Bug Fix: The "site to use" menu item in the Googlebar Lite options dialog should now be properly initialized on new installs

### 4.8.2
* Bug Fix: Extended characters should no longer get corrupted when searching

### 4.8.1
* Bug Fix: Search terms should no longer mysteriously disappear
* Bug Fix: The "Site to Use" menu in the Googlebar Lite options dialog is now initialized properly in Linux
* Bug Fix: Removed several obsolete function calls that were throwing errors after customizing the toolbar

### 4.8.0
* Completely redesigned the options interface and the underlying code
* Added a new option allowing users to disable Google search auto-correct
* Extension options have been moved to the appropriate "extensions." branch
* Menu items within the up button are no longer updated on every page load, improving performance
* Choices in the search term auto-completion popup menu can now be navigated through with the Tab key
* Several minor performance improvements
* The minimum supported Firefox version has been changed from 2.0 to 3.6
* The maximum supported Firefox version has been changed to 15.*
* Added a Norwegian (nb-NO) localization
* Various locale updates
* Bug Fix: Search terms no longer disappear from the search box when searching over a secure connection
* Bug Fix: Several registered event listeners were not being removed on shutdown
* Bug Fix: Secure searches no longer point to the old "beta" secure search website
* Bug Fix: Corrected a minor bug in the Catalan (ca-AD) locale that affected the Google search site URL

### 4.7.11
* Added google.com.eg to the list of available top-level domains
* The Google dictionary search button and menu item are now disabled when the search box is empty
* AJAX-style queries (on Google search result pages) are now given higher priority than normal GET-style queries
* Updated the menu item label for the translate context menu command
* Converted a few component instances into a lazy-load approach, which should improve startup speeds
* Removed a few unused variables and one unused interface instance
* Bug Fix: Corrected a number of issues with the search term highlighting feature

### 4.7.10
* Altered the Google dictionary search since Google has shut down that dedicated service
* Bumped the maxVersion to 12.* to work around Mozilla's annoying new release schedule
* Added google.sk to the list of available top-level domains
* Bug Fix: Corrected an error with the addProgressListener call
* Bug Fix: Reverted a style rule change that caused search word button labels to disappear in some themes

### 4.7.9
* Changed the default keyboard shortcut for setting search box focus to Ctrl+Shift+S (was Ctrl+Shift+K)
* Added support for Firefox 5 and 6
* Added a new Estonian translation (et-EE)
* Various locale updates
* Relaxed the importance of style rules in the Googlebar Lite stylesheet
* Bug Fix: Search terms surrounded by double quotes are now highlighted properly

### 4.7.8
* Replaced Answers.com search type with Google Dictionary (English dictionary only for now)
* Various locale updates
* Bug Fix: Dragging and dropping text should no longer result in duplicated text
* Bug Fix: Fixed broken logic used to show and hide the search word overflow button
* Bug Fix: Improved the logic for displaying toolbar separators

### 4.7.7
* Bug Fix: Corrected a few parsing issues in the search word button filter which were introduced in 4.7.6.

### 4.7.6
* Improved styling in a few places.
* Removed the style rules for the Qute and Noia themes.
* Bug Fix: Corrected a resize issue that was causing a phantom chrome element to appear in Firefox 4.
* Bug Fix: URLs passed as a part of several context menu search types are now wrapped in encodeURIComponent() calls, preventing certain URLs from failing to load.
* Bug Fix: Altered the XUL markup around the search box to fix some styling issues.
* Bug Fix: Added several missing search operators to the word search button filter.
* Bug Fix: Search word buttons are no longer created for the pipe character.

### 4.7.5
* Added an option to enable secure search (where possible)
* Gave the "toggle toolbar" button a more descriptive name
* Enabled support for Firefox 4.0.*.
* Various locale updates.
* Bug Fix: Search terms now update properly on secure search result pages
* Bug Fix: Terms appearing in double quotes, which have a minus sign as the first character, are no longer hidden in the search word buttons

### 4.7.4
* Bug Fix: Word search should no longer get stuck when the terms appear in a text edit control

### 4.7.3
* Major code cleanup. The global JavaScript namespace is no longer polluted with all of Googlebar Lite’s variable and function names, and code has been made more efficient in some cases.
* Search terms are now cleared when exiting private browsing mode
* Bumped the maxVersion to 3.6.* to support Firefox 3.6 builds
* The hidden preference for Google’s sandbox search engine has been removed, since Google is no longer offering this sandbox to the public
* Updated the Russian (ru-RU) locale
* Updated the Chinese Traditional (zh-TW) locale
* Updated the Czech (cs-CZ) locale
* Bug Fix: The “single click in search box selects all search terms” option now uses native Firefox functionality, fixing several auto-selection problems in Linux
* Bug Fix: Dragging empty text to the search box no longer causes a blank entry to be added to the search history
* Bug Fix: Dragging text into the search box now opens a new tab if the “open search results in a new tab” and “automatically search on drag and drop” options are both set
* Bug Fix: Search terms are now cleared properly after customizing the Firefox toolbars

### 4.7.2
* Added Google Product search support (formally ‘Froogle’ search)
* Added Google Finance search support

### 4.7.1
* Support has been added for Google’s new Caffeine search engine, via a hidden preference (set googlebar_lite.use_sandbox to true in about:config). Note that this option currently only works with web searches and not specialized searches (images, groups, etc.).
* Bug Fix: Drag and drop did not work properly in Firefox 3.5.x
* Bug Fix: The Up button menu now provides the full range of options for https URLs
* Bug Fix: Highlighted search terms should no longer cause unwanted line breaks or font-size changes on certain sites

### 4.7.0
* Blog search support added (replacing Froogle search)
* Book search support added (replacing Web Directory search)
* Croatia top-level-domain added (.hr)
* Bug Fix: AJAX driven search result pages at Google no longer prevent search terms from updating in the Googlebar Lite search box

### 4.6.9
* Bumped the maxVersion to 3.5.* to support Firefox 3.5 builds

### 4.6.8
* Bug Fix: The tool-tip suppression code introduced back in version 4.3 has started to cause problems. Occasionally, Googlebar Lite could cause Firefox menus to stop responding. The problematic code has been removed.
* New Polish (pl-PL) localization.

### 4.6.7
* Bug Fix: Up-button menu items were not working as intended.

### 4.6.6
* Bumped the maxVersion to support Firefox 3 Release Candidate 1 (and all future Firefox 3.0.x builds).

### 4.6.5
* Added support for Firefox 3.0pre (includes beta 5 support).
* Minimum version changed to 2.0.0.*. Beginning with this build, Firefox 1.x is no longer supported.
* Removed 1 unused global variable and 4 unused functions left over from older releases.
* Googlebar Lite now exclusively uses a chrome manifest.
* Bug Fix: Googlebar Lite no longer appears in certain popup windows when other chrome items are hidden.
* Bug Fix: URL anchor directives (using the # mark) no longer show up as search terms if the query string appears as the last part of the URL.
* Bug Fix: Search term buttons were not being separated correctly when a search phrase, surrounded with double quotes, was immediately followed by a search term with no space in between.
* Bug Fix: Search term highlighting is now automatically turned off when the user chooses to hide the highlighter toolbar button.
* New Czech (cs-CZ) localization.

### 4.6.4
* Bug Fix: In some specific cases, the onLocationChange listener threw uncaught exceptions, causing the forward and back buttons in Firefox to stop functioning.
* New Greek (el-GR) localization.

### 4.6.3
* Bug Fix: An uncaught exception in the new URL parsing logic (added in 4.6.2) was causing the URL bar in Firefox to act incorrectly when a new tab was opened.
* Bug Fix: The new URL parsing was too strict. Because of this, search terms were not being updated appropriately on non-web searches (image searches, group searches, etc.).

### 4.6.2
* The "Google GMail" option in the Googlebar Lite main menu now points to the secure https:// address.
* Bug Fix: Searching country-specific pages often caused search terms to become corrupted in the Googlebar Lite search box. The URL parsing logic has been rewritten and should now work as expected.
* Bug Fix: Some translational errors in the Dutch (nl-NL) locale have been fixed.

### 4.6.1
* Bug Fix: Highlighting on pages that contained frames did not work as expected.
* Bug Fix: Strict JavaScript parsing error.

### 4.6
* New option allows the user to select the Google site to use across all search types, providing better localized search results.
* New optional toolbar button toggles visibility of the Googlebar Lite toolbar.
* The keyboard shortcut for setting search box focus is now semi-customizable (Ctrl + Shift + <desired letter>).
* New "Search This Site for Selected Text" context menu item.
* New "Search Videos for Selected Text" context menu item.
* Googlebar Lite now does better with searches that contain characters outside of the Latin-1 character set.
* Arabic localization removed due to lack of updates.
* Bug Fix: Googlebar Lite could, in some cases, cause the browser menus to become disabled when customizing toolbars in Firefox.
* Bug Fix: The individual search toolbar buttons were not being restored properly after customizing toolbars.

### 4.5.1
* Bug Fix: Corrections made to the Italian localization.

### 4.5
* Google Video search support added.
* Google Scholar search support added.
* Drag and drop support added to the search box.
* New option allows user to automatically perform a web search on dragging text to the search box.
* New French (fr-FR) localization added.
* Keyboard accelerator to set search box focus has been changed to Ctrl + Shift + K.
* Updates made to the Chinese Traditional (zh-TW) localization.
* Toolbar button images are now better centered on each search button.
* License file added to the Googlebar Lite XPI.
* Removed legacy code that was no longer needed.
* Bug Fix: Customizing toolbars when certain other extensions were installed caused Firefox menus to become unusable.
* Bug Fix: Corrected a logic bug for hiding some of the toolbar separators.

### 4.4
* Added support for Firefox 2.0 release candidate builds.
* Added new Croatian (hr-HR) translation.
* Selected text searches (in the Googlebar Lite context menu) can now be opened in a new tab by holding the CTRL key when selecting the search to perform.
* The about dialog has been widened and the large logo has been removed.
* The Arabic localization country code has been changed from 'ar' to 'ar-AR'.
* Bug Fix: Holding the CTRL key down to open a new tab did not work in the Firefox 2.0 nightly builds.

### 4.3.1
* Added support for Bon Echo Beta 2 builds (Firefox 2.0).
* Added new Arabic (ar-AR) translation.
* Updated the Russian (ru-RU) translation.

### 4.3
* Renamed all "Google Local" items to "Google Maps" to reflect the name change (again) at Google.
* Extension description is now localizable.
* The code to add search word buttons to the toolbar has been cleaned up.
* Bug Fix: A low-risk, cross-site scripting vulnerability has been patched.
* Bug Fix: Tool-tips are no longer shown for toolbar menu items (main menu, combined search menu, and the up-button menu).
* Bug Fix: Search words now appear in the Googlebar Lite search box when a new Firefox window is opened.
* Bug Fix: The word search feature did not work for terms with apostrophes.
* Bug Fix: Search words containing an apostrophe are now escaped properly in the resulting Google URI.
* Bug Fix: The form history warning now appears after the browser window appears, not before.

### 4.2
* Added support for the Bon Echo alpha builds (Firefox 2.0).
* Added a new Slovak (sk-SK) translation.
* Added a new Chinese Simplified (zh-CN) translation.
* Bug Fix: Fixed the 'disappearing search box' problem, introduced in version 4.0.

### 4.1.2
* Bug Fix: Corrected an issue with the Spanish locale.
* Bug Fix: Corrected several problems with the Russian locale.

### 4.1.1
* Cleaned up the majority of the locale files, reducing the overall file size.
* Bug Fix: Corrected an invalid character in the German (de-DE) locale.

### 4.1
* New option allows user to set a custom Froogle top-level domain.
* New dialog warns when form-history is disabled and search history is enabled. Form history is required to maintain a search history in Googlebar Lite.
* Added a Portuguese: Brazilian (pt-BR) localization.
* Added a Russian (ru-RU) localization.
* Added a Turkish (tr-TR) localization.
* Removed some unused style rules.
* The Googlebar Lite widget used in the customize toolbars dialog now uses a new icon.
* Made a few tweaks to the about box.
* Bug Fix: The search modifier keyboard shortcuts (Ctrl+Enter, Shift+Enter, Ctrl+Shift+Enter) were not working.
* Bug Fix: The "Remember last combined menu search type" option was not being correctly applied to searches performed from the search box using the keyboard.
* Bug Fix: The "Use custom Google News domain" option was not working properly.
* Bug Fix: The search box in the Noia theme did not render correctly.
* Bug Fix: Toggling the combined search or up buttons caused the toolbar's height to change in some cases.
* Bug Fix: The search box now uses a reasonable height when placed on a toolbar with large icons.
* Bug Fix: When Googlebar Lite was dragged to the customize toolbars dialog, the resulting widget was improperly sized.
* Bug Fix: The customize widget became invisible when dragged into the customize toolbar using the Noia theme.
* Bug Fix: Corrected some translation errors in the Catalan (ca-AD) translation.
* Bug Fix: Corrected the locale identifier for the Catalan (ca-AD) translation.
* Bug Fix: Corrected some corrupt strings in the French (fr-FR) translation.

### 4.0.1
* Minor modifications to the Italian (it-IT) translation.
* Bug Fix: The German (de-DE) translation had a few corrupt entries.

### 4.0
* A brand new search history system has been implemented. Features include:
++ Auto-completion of search terms as you type (enabled by default).
++ Inline auto-completion of best search term match (disabled by default).
++ Ability to disable search history completely.
++ Virtually unlimited number of search terms can be stored in the search history.
* New option allows user to enable or disable single-click selection in the search box.
* Brand new icons used throughout the toolbar (icons come from the 'silk' icon library).
* The highlighting color for search words is now indicated through the icon of each search word button, rather than the button's background color.
* The toolbar is no longer as tall as it used to be, thanks to the new XUL control used for the search box.
* Tweaked the regular expression responsible for updating search terms while browsing Google pages.
* Options dialog style sheet has been tweaked.
* Bug Fix: When performing an advanced Google search, search terms were lost in the Googlebar Lite search box (a regular expression bug).
* Bug Fix: The overflow button bug fixed in version 3.0 was reintroduced in version 3.3. It has now been fixed (again).
* Bug Fix: The overflow button no longer flickers when Firefox is starting for the first time.

### 3.3
* Bug Fix: When search word buttons were hidden, the search terms box could not be made larger.
* Bug Fix: When the "Open search results in a new tab" option was enabled, viewing a cached page or cached link did not result in creating a new tab.

### 3.2
* Added the ability to remove individual items from the search history (shift + right click the desired item to remove it).
* Added a new Catalan (ca-AD) translation.
* Renamed "Google Maps" to "Google Local" (to conform with Google's naming).
* The "Always open search results in a new tab" option now checks to see if the current tab is blank (about:blank). If it is, the search results are loaded in that blank tab (and a new tab does not get created). Many thanks to Matthew Williams for this suggestion and the relevant code changes.
* The "Always open search results in a new tab" option has been renamed to "Open search results in a new tab (if necessary)", as a result of the previously mentioned change in behavior.
* Added an additional Italian translator credit (which I mistakenly omitted).
* Translator names now appear in their own DTD file, reducing duplicate entries in each DTD file.
* Bug Fix: The following Google search operators no longer appear as search word buttons: filetype: and safesearch:.
* Bug Fix: Made some minor corrections to the Italian (it-IT) translation.
* Bug Fix: Left-aligned the label on the Googlebar Lite customize item.

### 3.1
* Support added for Firefox 1.5.
* Google Maps search added to the context menu.
* About box has been redesigned and all relevant code rewritten.
* The Answers.com toolbar button icon now has improved contrast.
* Minor updates made to the German (de-DE), French (fr-FR), Chinese (zh-TW) and Japanese (ja-JP) translations.
* Bug Fix: The combined search menu icon did not correctly show "I'm Feeling Lucky" when the "remember last combined-menu search type" option was checked.
* Bug Fix: Corrected a corrupt string in the Swedish translation.

### 3.0.1
* Bug Fix: Corrected a corrupt string in the Chinese translation.

### 3.0
* Added Firefox 1.5 Beta 1 and Beta 2 support.
* Added Google Maps search.
* Renamed "Dictionary Search" to "Answers.com Search". The icon has been updated, and all relevant options have also been renamed.
* Removed the Thesaurus search type. After changing to Answers.com, the search mechanisms for the thesaurus search and dictionary search were exactly identical to each other.
* New Swedish (sv-SE) translation.
* Toolbar options can now be set from the Extension Manager (right click the Googlebar Lite entry and select the options menu item).
* Made some cosmetic improvements to the toolbar buttons options page.
* The code behind the website link in the about box has been improved.
* Made several minor about dialog style sheet changes.
* Removed old, commented code from the main style sheet.
* Minor corrections made to Chinese (zh-TW) translation.
* Highlighted spans now use the class attribute as an identifier instead of the id attribute (to be more standards compliant).
* Bug Fix: Some Google queries were being ignored (the toolbar would not react to the Google search) due to a regular expression bug.
* Bug Fix: When search word buttons were hidden, the search words overflow menu still appeared in certain circumstances.
* Bug Fix: The Answers.com search query has been changed to reflect Firefox bug 309379.
* Bug Fix: Changing toolbar options only affected the active browser window. Changes are now propagated across all open windows.
* Bug Fix: An error in the German translation file was preventing the options dialog from opening correctly.
* Bug Fix: Toolbar button labels are now readable in the Noia theme.

### 2.2
* Added a "Paste and Search" feature to the search box context menu.
* Added an option to allow the user to disable the Clear Search History prompt.
* Dictionary and Thesaurus searches now use Answers.com, instead of Dictionary.com and Thesaurus.com. This was done to conform with the upcoming Firefox 1.5 release (bug #289362).
* Removed some unused, commented blocks of code.
* Bug Fix: The highlighter button is now enabled when a search is performed from a Google page (rather than from the Googlebar Lite search box).
* Bug Fix: The highlighter button was not properly disabled if there were search terms in the search box and the user customized a toolbar.
* Bug Fix: If the search words changed while highlighting was turned on, turning off highlighting would result in words that did not "un-highlight" as expected.
* Bug Fix: Googlebar Lite's style sheet for the Qute theme was not working as expected, and has been fixed.

### 2.1.1
* Bug Fix: Corrected a cosmetic issue where blank space appeared at the end of the toolbar.

### 2.1
* A "Cached Snapshot of This Link" item has been added to the Googlebar Lite context menu. This new feature allows you to view a cached copy of a selected link (simply right click on a link to enable the menu item).
* Removed a few obsolete strings from a few translation files.
* Bug Fix: After exiting the toolbar customization dialog, the last selected item in the search history was displayed in the search box. Now, the search box is cleared when exiting the toolbar customization dialog.
* Bug Fix: Items in the search history menu were being duplicated after customizing a toolbar.
* Bug Fix: Search word buttons were not being reflowed after changing toolbar options. This resulted in cases where search word buttons could be overflowed, even though there was enough space to show them.
* Bug Fix: Fixed the context menu access keys for the Italian translation.

### 2.0
* The toolbar can now be moved (as one unit) to other areas of the browser. This was by far the most requested feature for Googlebar Lite.
* A Spanish translation (es-ES) has been added.
* All of the Google Links in the Googlebar Lite main menu can now be opened in a new tab. To open them in a new tab, simply middle click or Ctrl+click the desired menu item.
* The toolbar's name has been changed from "Googlebar Lite" to "Googlebar Lite Toolbar".
* The main menu icon (Googlebar Lite logo) has been enlarged.
* The logo in the about dialog has been enlarged (from 32x32 to 48x48).
* Registered style sheet renamed to gbl_overlay.css.
* Bug Fix: Overflowed search word buttons now show their respective highlight colors (when highlighting is turned on).
* Bug Fix: Several duplicate strings have been consolidated into one to reduce file size.

### 1.1
* A Japanese (ja-JP) translation has been added.
* The internal skin structure has been completely redone, allowing for theme-specific rules to apply to their respective skins only.
* Bug Fix: The default locale is now en-US.
* Bug Fix: A critical problem with the Dutch (nl-NL) locale, which prevented 1.0 from properly installing, has been fixed.
* Bug Fix: A skinning issue with the combined search button has been resolved with the default theme.

### 1.0
* The context menu is now customizable via a new options page.
* The context menu can now be hidden (it is shown by default).
* The keyboard accelerator to set focus on the search box has been changed to Ctrl+Shift+L.
* Automatic updating is now supported.
* All localizable strings have been consolidated into one DTD file.
* Default preference values are now handled properly, greatly reducing the size of the preference reading code.
* The homepage URL in the install manifest now points to the Googlebar Lite homepage.
* Bug Fix: The keyboard accelerator used to set focus on the search box did not work in 1.0.3.
* Bug Fix: Occasionally, when restoring Firefox from a minimized state, the search word buttons (if present) would not appear and the overflow menu-button appeared in their place. The fix was obtained from a patch for Firefox bug #266737.
* Bug Fix: The proper XML style sheet statement was not being used in the about box. This has been fixed.
* Bug Fix: A minor DOCTYPE issue was fixed in the about dialog markup.
* Bug Fix: A variable redeclaration warning (seen in strict JavaScript parsing) was fixed in the options dialog code.
* Bug Fix: The Googlebar Lite toolbar was too tall in the Qute theme. Several style rules have been added to fix this in Windows (the problem still appears in some Linux builds).

### 0.9.2
* A French translation (fr-FR) has been added.
* Bug Fix (Critical): The proper XML style sheet statement was not being used in 0.9.1. This has been fixed, and the style sheet now points to the proper location.
* Bug Fix: Search history is now stored and retrieved using the getComplexType() and setComplexType() functions, fixing an issue with the Chinese translation (and other similar languages).
* Bug Fix: The hidden buttons issue, supposedly fixed in 0.9.1, was still being seen. The issue is now resolved in a different manner, although the root problem still exists. I am still looking for a permanent, efficient solution to this problem.

### 0.9.1
* The "I'm Feeling Lucky" search has been added.
* New option added to set a custom news domain (e.g. news.google.co.uk).
* Several tooltip strings have been combined to reduce redundancy.
* Link in about box now points to the Googlebar Lite home page.
* Bug Fix: A couple of functions which relied on selected text were failing in the 1.0.3 Firefox builds (due to a new security fix). The means by which selected text is obtained has been fixed, and the subsequent JavaScript errors should no longer be seen.
* Bug Fix: When upgrading from a build before version 0.8 to version 0.8 or later, several of the toolbar buttons remained hidden (when they should have been displayed). Upgrading from a pre-0.8 version will no longer cause this issue.
* Bug Fix: Several items in the about box were not localized. This has been fixed.
* Bug Fix: Minor logic fixes made to the Search Modifiers options page.

### 0.9
* Two new translations into Chinese (Traditional - locale zh-TW) and Italian (it-IT).
* When a search word button is clicked, and the word does not appear in the current page, a sound is now played, indicating that the word could not be found. Previously, a modal dialog appeared, forcing the user to click past the dialog to proceed browsing. The text of that dialog now appears in the browser's status bar.
* Made a few changes to the about box.
* Bug Fix: Due to file format issues, making use of the Danish locale (da-DK) previously caused problems. This has been corrected.
* Bug Fix: Fixed a minor issue with the combined search button and the up button in some themes.

### 0.8.1 (Mar. 22, 2005)
* Bug Fix: Corrected a problem with one of the toolbarseparator elements.

### 0.8 (Mar. 22, 2005)
* Two new translations into Danish (locale da-DK) and German (locale de-DE).
* New option now allows button labels to be shown for all default buttons (the combined search button, the up button, and the highlighter button).
* Reordered a few options on the "Toolbar Buttons" options page.
* Initial search box width reduced from 250 to 175.
* Tweaked the CSS style for each toolbarseparator element.
* Removed all "persist" attributes from every toolbar button. This mechanism was essentially not being used, since the Googlebar Lite code manually handles hiding and showing the varioius search buttons.
* Bug Fix: Incorrect listener registration has been removed, resulting in an overall performance improvement (page change events no longer fire twice).
* Bug Fix: Commas no longer appear in search word buttons.
* Bug Fix: Corrected a sizing issue with the search button container.
* Bug Fix: Changed all "hidden" attributes for toolbar buttons to the "collapsed" attribute.
* Bug Fix: Corrected a variable redefinition warning with strict JavaScript parsing.
* Bug Fix: Removed the unused function GBL_DoHighlight.

### 0.7 (Mar. 7, 2005)
* Googlebar Lite now supports Dutch (locale nl-NL).
* Added a keyboard accelerator (Alt+S) to set focus on the Googlebar Lite search box.
* Added "Backward Links" to the Googlebar Lite context menu.
* Added "Cached Snapshot of Page" to the Googlebar Lite context menu.
* Added "Similar Pages" to the Googlebar Lite context menu.
* Removed the "Search for Selected Text" item from the Googlebar Lite context menu.
* Removed the "Googlebar Lite Options" item from the Googlebar Lite context menu.
* Converted all hbox container elements to toolbaritem elements.
* Bug Fix: Several sizing issues with the search word container have been resolved.
* Bug Fix: Corrected a possible URL mistake in the translate search case.
* Bug Fix: The "Translate into English" menu item is now disabled for "about:" and "file://" style URLs.

### 0.6 (Feb. 24, 2005)
* Rewrote the core search mechanism, fixing a number of problems.
* Most of the Google Links in the main menu now use a custom top level domain (if one is provided).
* Added links to Google GMail and Google Maps in the Googlebar Lite main menu.
* Added an option to remember the last search type performed in the combined-search menu.
* Bug Fix: The "Site Search" menu item in the combined search menu is now disabled in all of the proper instances.
* Bug Fix: Performing a site search when the search terms box is empty now directs you to the main Google search page.
* Bug Fix: Greatly simplified the code for performing a site search (and removed some broken code).
* Bug Fix: Any + symbol that appears at the end of a search word (as in C++) now appears in the search word button.
* Bug Fix: All + symbols now appear (regardless of their position) if placed inside a double quoted string.
* Bug Fix: The default search case (in GBL_Search) used an incorrect URL.
* Bug Fix: Localized a couple of strings that had not previously been localized.

### 0.5 (Feb. 15, 2005)
* Tweaked the style and look of the resizing gripper.
* Replaced the style rules that add images to the toolbar buttons preference panel. Just uncomment the style block if you want the images.
* Removed all but one of the debug functions.
* New extension version format now used.
* Updated the extension's description.
* Bug Fix: Selected text searches now open the results in a new tab if the "always open in tabs" option is set.
* Bug Fix: Selected text searches now cause the search word buttons to update properly.
* Bug Fix: Selected text searches now add their search terms to the search history.
* Bug Fix: The site search button is now disabled properly at all Google pages.
* Bug Fix: Fixed a regular expression bug which caused the search words box to not update properly when performing an advanced search.
* Bug Fix: Visiting a Google search results page caused the search words buttons to be updated every time, regardless of whether or not the search terms were the same. Search word buttons are now updated only if the terms have changed.
* Bug Fix: Corrected a number of variable redefinition warnings seen with strict JavaScript parsing.
* Bug Fix: Typographical error corrected in the Googlebar Lite context menu.

### 0.4.83 (Feb. 7, 2005)
* New option allows user to force search results to open in a new tab.
* Moved the custom Google domain options to the "Search Modifiers" options tab.
* New (better looking) up-button toolbar icon.
* Updated the main-menu toolbar button icon.
* Renamed main overlay from "googlebarlite_overlay.xul" to "googlebarlite.xul".
* Optimized several regular expression matches that occur on every page change event.
* Bug Fix: The site search button is now disabled for "about:" style URLs.
* Bug Fix: The following Google modifiers no longer appear as search word buttons: cache:, link:, related:, info:, allintitle:, intitle:, allinurl:, inurl:
* Bug Fix: The group: Google modifier has been removed (it is apparently no longer supported).
* Bug Fix: The search keyword "OR" no longer appears as a search word button.
* Bug Fix: Search words preceded by a '-' sign no longer appear as search word buttons.
* Bug Fix: Search words preceded by a '+' or '~' no longer display those two symbols in the label of the corresponding search word button.
* Bug Fix: The highlighter button is now enabled based on the number of search word buttons, rather than the number of search words.

### 0.4.52 (Jan. 31, 2005)
* Added support to open up-menu items in a new tab (by middle clicking).
* Alt+Enter in the search box now opens the search results in a new tab.
* Googlebar Lite Help now points to the online documentation (instead of the embedded HTML file).
* Simplified the toolbar button style sheet.
* Overflow button image is now included in the toolbar button sheet.
* Fixed the overflow button's image.
* Fixed the web directory search button, which was not working.

### 0.4.44 (Jan. 24, 2005)
* Customizable keyboard shortcuts are now available.
* New 16x16 icons are now used.
* Icons (temporarily) removed from options checkboxes to correct several theme problems.
* Search site button is now disabled for "file:///" style URLs.

### 0.4.21 (Jan. 21, 2005)
* The menu items in the combined search menu can now be middle clicked to open the search in a new tab.
* Toolbar images are now packed into one image, fixing an image loading problem in the combined search menu and improving performance.
* Images are now packaged in the proper skin directory (registered at install time).
* New groups search toolbar icon.
* Updated the main menu icon and program logo.
* Several style sheet tweaks (for combined search menu items and option dialog check boxes).
* Fixed a skin bug with the resizing gripper.
* Fixed a missing tooltip in the main menu.

### 0.3.91 (Jan. 7, 2005)
* New toolbar options dialog.
* New option allows users to use a custom Google domain (e.g. www.google.co.uk).
* Fixed a bug with the "Translate into English" menu item.
* Removed a few stray JavaScript console log messages.
* Updated and reorganized the help page.

### 0.3.69 (Jan. 6, 2005)
* Localization support has been added.
* New "Translate into English" context menu item.
* Fixed a highlighting bug where one search word was a substring of another.
* Removed several redundant functions and commented code blocks.
* Help page moved into locale directory.

### 0.3.55 (Jan. 5, 2005)
* Prevented some print statements from showing up in the JavaScript console.

### 0.3.45 (Jan. 4, 2005) - First Public Release
* Can now middle click or Ctrl-click search buttons to open them in a new tab.
* Default button set has been changed.
* Help page now opens in a tab.

### 0.3.38
* Highlighting bug in edit boxes has been fixed.
* Website URLs now point to the Born Geek Firefox section.
* Significantly updated the about box.
* Extension description has been updated.
* Minor updates to the help page.

### 0.3.27
* Search words now overflow properly!
* User is now prompted when clearing search history.
* Extension is now compatible in builds after Firefox 1.0.
* Removed some debug log messages.
* Context menu search items are now disabled if no text is selected.
* Renamed a few functions to avoid naming collisions.
* Added more information to the help file.
* Googlebar Lite logo now appears in the extension manager.
* Renamed one of the main menu items.

### 0.2.66
* Right-click context menu now available. You can do either a web search or dictionary lookup on selected text. Doing this when nothing is selected is currently broken, so don't do that.
* Weird toolbar height issue has been fixed.
* The internal toolbar layout has changed (two hbox elements have been removed, and a toolbarspring element has been added).
* Changed the main menu access keys a little.
* Maybe another fix or two (I can't remember).

### 0.2.36
* Missing access key in the toolbar menu has been fixed.
* Toolbar options dialog has been tweaked a little.
* The Googlebar Lite help page is now available, although it is not yet completed.
* The about box is now functional (but it certainly needs to be polished).
* Fixed a menu item typo.

### 0.2.16
* Fixed the button selection interface.

### 0.2.12
* Added Froogle search to all the relevant places.
* New toolbar button selection interface.
* Highlighting is now cleared when the search history is cleared.
* New search words icon.

### 0.1.89
* Highlighting is now retained when you change pages (and it's turned on).
* The highlighter button is now disabled and enabled properly.
* Fixed a bug with the site icon in the combined search menu.
* Fixed a bug with the site icon in the options dialog.

### 0.1.63
* Highlighting now semi-works (be sure to test this if you get the chance). There are certainly many bugs lurking in this. I'm not disabling the highlighting button yet, and it probably breaks when you change pages (and leave it turned on). I tried understanding what was going on in Googlebar, and that has taken all morning. Although their code seems ugly, it works, so I copied bits of it over.
* The "Site", "Up" and "Highlight" buttons no longer briefly disappear when being disabled or enabled.
* The search box width is now saved properly (as it should have been).

### 0.1.21
* New combined search button / menu.
* Preference defaults are now set properly.
* Button separators now get hidden based on their corresponding button's visibility.
* Can now hide the highlighter button.
* Might be a bug fix or two (I don't recall).

### 0.0.98
* The toolbar now updates properly when you search at Google.com. You can even search with the other Googlebar and watch mine update!
* "Automatically search when you select an item from the search history" now works.
* Fixed the "onLinkIconAvailable" error message from appearing the JavaScript console.
* Fixed a problem with registering my listener that (I think) would cause bad things to happen if my code screwed things up.
* The search site icon now gets disabled when at a google.com page.

### 0.0.88
* Search word buttons now update when you select an item in the drop down history.
* Search terms including the "site:" and "group:" modifiers are now no longer shown in the search words buttons (e.g., "site:ncsu.edu" is no longer made into a search term button).
* Search terms now get selected when you click in the search box. (This was very hard to figure out, so I simply copied the working code from the Googlebar).
* Cosmetic issues in options dialog fixed
* Updated icons
