//******************************************************************************
//
//    DHTML Tree Menu 2.0
//    Additional module for saving Tree Menu state
//    http://dhtml-menu.com
//    (c) 2005, by Apycom Software
//    www.apycom.com
//    dhtml@dhtml-menu.com
//
//******************************************************************************

var tcSep='@';

function apy_tloadState(mInd)
// Loads the state for the menu with the specified prefix
{
  with (apy_tmenu[mInd])
  {
      var stts = apy_tgetCookie(savePrefix+id);
      if (!stts) return;                                              // cookies were not found
      states = stts.split(tcSep);
      stateLoaded  = 1;
  }
}


function apy_tsaveState(mInd)
// Saves the state for the specified menu
{
    with (apy_tmenu[mInd].savePrefix) apy_tsaveMenuState(mInd);     // if the state for this menu was loaded by calling apy_tloadState(), e.g. the prefix was specified
}


function apy_tgetCookie(cName)
// Reads the cookie
{
  var cookParams, cooks=tdo.cookie.split('; ');                     // get cookie array

  for (var i=0; i<cooks.ln(); i++)
  {
      cookParams = cooks[i].split('=');
      if (cName==cookParams[0]) return unescape(cookParams[1]);
  }
  return 0;                                                         // the cookie doesn't exist
}

function apy_tsetCookie(cName, cValue, cPath)
// Sets the cookie
{
  cPath = runtPath;
  tdo.cookie = cName+'='+escape(cValue)+'; expires=Mon, 31 Dec 2029 23:59:59 UTC; ' + (cPath?'path='+cPath+';':'');
}


function apy_tsaveMenuState(mInd)
// Creates & saves cookies for the menu with the specified menu prefix (must be original for each menu on a page)
{
  var menu = apy_tmenu[mInd];
  var st, stts='';

  var itVar=menu.i[0];
  do
  {
      with (itVar)
      {
          st = isHidden ? 'h' : (isVisible ? (expanded ? '+' : '-') : 'u');
          stts += st + (apy_tgetNextItem(itVar) ? tcSep : '');
      }
  }
  while (itVar=apy_tgetNextItem(itVar));
  //stts += menu.pressedItemID;
  apy_tsetCookie(menu.savePrefix+menu.id, stts, '');
}


