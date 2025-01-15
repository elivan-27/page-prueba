//******************************************************************************
//
//    DHTML Tree Menu 2.0
//    http://dhtml-menu.com
//    (c) 2005, by Apycom Software
//    www.apycom.com
//    dhtml@dhtml-menu.com
//
//==============================================================================
//  ---------- v2.0 -----------
//  1. new engine
//  2. hierarchical tree structure
//  3. several .js modules
//  4. dynamic functions (changing/adding/removing items, etc.)
//  5. apyt_ext_userClick(itemID), apyt_ext_userRightClick(itemID) - user's functions on mouse click and mouse right click
//  6. tcloseExpanded, tcloseExpandedXP = 0/1 - only 1 item (XP submenu) can be expanded
//  7. tXPFilter = 0/1 - enable fade filter for XP submenu in IE
//  8. tXPBtnWidth, tXPBtnHeight - width and height of XP title expand-button
//  9. tXPBorderColor - border color for XP submenus
// 10. tfontColorDisabled - color for disabled items
// 11. tfloatableX, tfloatableY = 0/1 - floatable axes
// 12. tnoWrap = 0/1 - word-wrap
// 13. ttoggleMode = 0/1 - toggle mode. To set pressed item - add '>' symbol before item's text.
//        - var tpressedFontColor = '#AA0000';
// 14. Deleted: tsavePrefix, tsavenMenuN. tsaveState must be enabled only.
//
//******************************************************************************



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//                              COMMENTS
//                            ------------
// 1. do not erase double brackets in while statement (NS6 issue).
//    For example: while ((it=funcname()))
//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



String.prototype.sb=function(s,e) {return this.substring(s,e)}
String.prototype.io=function(s)   {return this.indexOf(s)}
String.prototype.ln=function()    {return this.length}
 Array.prototype.ln=function()    {return this.length}

var runtPath = "/runt/";                       //Path para almacenar las cookies del estado del menu
var containerDivId = "menu-script";            //ID del div que contiene el menu

var isIE  = 0;
var isIE5 = 0;
var isNS  = 0;
var isNS4 = 0;
var isOP  = 0;
var isOP7 = 0;
var isMZ  = 0;
var isVER = 0;
var isDOM = 0;
var isMAC = 0;
var isIEComp = 0;                               // IE compatible (such as all IE and Opera 7+)
var tdo = document;

apy_getBrowser();

var tdynamicTree = !(isNS4 || (isOP && isVER<7));
var tuf = 'undefined';
var docElement;                                 // Document object variable depending on <!DOCTYPE> tag. Used as document.body object.
var tuserLoadFunc = null;                       // var to remember user's onLoad event


var apy_tmenu = [];                             // menu object
var tisLoaded  = 0;                             // is treemenu loaded

var tcurMenu = {
  ind  : 0,             // index of current processed menu
  mVar : null,
  itInd: -1,              // index of current processed item
  itVar: null,
  pitVar: null
}


var tmoveRec = {
  isMoving   : 0,       // if menu is in a moving process
  cX   : 0,             // capturing X coord
  cY   : 0,             // capturing Y coord
  mObj : 0,             // current movable menu object
  mVar : null           // current movable menu variable
}


var tcurBtn = 0;
var goffX = 0,
    goffY = 0;                        // global page offset after page was loaded (non-zero in MAC IE only).


//##############################################################################

function apy_setDocElement()
{
  // Detect the document object according to <!DOCTYPE> specification
  docElement = (tdo.compatMode=="CSS1Compat" && !isMZ) ? tdo.documentElement : tdo.body;
}


function apy_getBrowser()
// Detects browser
{
  var nv = navigator;
  var a = nv.userAgent;
  var n = nv.appName;
  var v = nv.appVersion;
  var ns = 'Netscape';
  var gk = 'Gecko';
  var pf = function(r) {return parseFloat(r)}
  isMAC = v.io("Mac")>=0;
  isDOM = tdo.getElementById?1:0;

  // Safari detect
  if ((parseInt(nv.productSub)>=20020000) && (nv.vendor.io("Apple Computer") != -1) && (nv.product==gk))
  {
      isNS  = 1;
      isVER = 6;
      isSAF = 1;
      return;
  }

  // Konqueror detect
  if (n.toLowerCase()=='konqueror')
  {
      isMZ  = 1;
      isVER = 1.6;
      return;
  }

  // Opera detect
  if (a.io('Opera')>=0)
  {
      isOP     = 1;
      isVER    = pf(a.sb(a.io('Opera')+6, a.ln()));
      isIEComp = (isVER>=7);
          return;
  }

  if (n.toLowerCase()=='netscape')
  {
	// Se ajusta para que el comportamiento en el navegador Chrome sea igual que en el navegador Mozilla
      if (a.io('rv:')!=-1 && a.io(gk)!=-1 && a.io(ns)==-1 || a.toLowerCase().indexOf('chrome') > -1)
      {
          isMZ  = 1;
          if(a.toLowerCase().indexOf('chrome') > -1){
          	isVER = pf(v);
          } else{                    
          	isVER = pf(a.sb(a.io('rv:')+3, a.ln()));
          }
      }
      else
      {
          isNS = 1;
          if (a.io(gk) != -1 && a.io(ns)>a.io(gk))
          {
                if (a.io(ns+'6')>-1) isVER = pf(a.sb(a.io(ns)+10, a.ln()));
                else
                  if (a.io(ns)>-1) isVER = pf(a.sb(a.io(ns)+9, a.ln()));
          }
          else
              isVER = pf(v);
      }
      isNS4 = isNS && isVER<6;
      return;
  }

  if (tdo.all?1:0)
  {
      isIE     = 1;
      isVER    = pf(a.sb(a.io('MSIE ')+5, a.ln()));
      isIE5    = (isVER>=5);
      isIE6    = (isVER>=6);
      isIEComp = 1;
      isIEPC   = (isMAC?0:1);
      isIEMAC  = isMAC;
  }
  //alert("isIE = "+isIE+"\n"+"isOP = "+isOP+"\n"+"isMZ = "+isMZ+"\n"+"isNS = "+isNS+"\n"+"isDOM = "+isDOM+"\n"+"isMAC = "+isMAC+"\n"+"isVER = "+isVER);    
}


//##############################################################################
// GLOBAL PARAMS FUNCTIONS
//##############################################################################

apy_tpreDefineGlobalParams();

function apy_tpreDefineGlobalParams()
// Pre-defines global variables
{
  tpressedFontColor = '#AAAAAA',

  tcloseExpanded   = 0;
  tcloseExpandedXP = 0;

  tXPFilter         = 1;
  tXPTitleLeftWidth = 4;
  tXPBtnWidth    = 25;
  tXPBtnHeight   = 25;
  tXPIconWidth   = 31;
  tXPIconHeight  = 32;
  tXPBorderWidth = 1;
  tXPBorderColor = '#FFFFFF';

  titemBorderWidth = 0;
  titemBorderStyle = 0;
  titemBorderColor = 0;

  tfontColorDisabled = '#AAAAAA';

  tfloatableX=1;
  tfloatableY=1;

  tmenuHeight = '';
  tnoWrap = 0;

  ttoggleMode      = 0;
  tpathPrefix_link = '';
  tpathPrefix_img  = '';

  tmoveColor  = '#ECECEC';
  tmoveHeight = 12;
  
  titemHeight = 19;
  texpanded   = 0;
  
  tsaveState  = 0;
  tsavePrefix = 'pre';
  
  tlevelDX = 20;
  texpandItemClick = 0;
}


function apy_tcheckGlobalParams()
{
  if (isNS4)
  {
      tfloatable = 0;
      tmovable   = 0;
  }

  with (tcurMenu)
  {
      itInd  = 0;
      itVar  = null;
      pitVar = null;
  }

  if (tfloatIterations<=0) tfloatIterations = 6;
  if (!tmenuWidth) tmenuWidth = '200';

  tpoints = tdynamicTree ? tpoints : 0;                                           // draw tree lines if browser support dynamic tree
  if (titemCursor=='pointer' && isIE) titemCursor = 'hand';


  // XP-style parameters
  if (tXPStyle)
      if (tXPIterations<=0) tXPIterations=1;
}


function apy_tgetObjectStyleXY(obj)
{
  with (obj) return [parseInt(style.left), parseInt(style.top)];
}


function apy_tload()
{
  apy_setDocElement();                                                            // Detect document object according to <DOCTYPE> specification

  var mObj = apy_tgetObjectByID("apy_t0div");
  var xy = apy_tgetObjectStyleXY(mObj);                                           // get current coords from object.style
  goffX = apy_tmenu[0].left - xy[0];
  goffY = apy_tmenu[0].top  - xy[1];
 
  tisLoaded = 1;                                                                    // all data were loaded


  // Initialize floatable and movable menu
  if (!(isOP && isVER<6))                                                         // cancel floatable mode for Opera 5: links don't work if enabled
  {
      var f=0, j=0;
      while (j<apy_tmenu.ln() && !(f=(apy_tmenu[j].floating && apy_tmenu[j].absPos))) j++;
      if (f) window.setInterval('apy_tScrollWindow()', 20);

      var f=0, j=0;
      while (j<apy_tmenu.ln() && !(f=(apy_tmenu[j].moving && apy_tmenu[j].absPos))) j++;
      if (f) apy_tassignMoveEvent();                                              // assign mousemove event for the moveable menu
  }


  if (tuserLoadFunc) tuserLoadFunc();                                             // execute user's onLoad event
}


function apy_tsetOnLoad()
// Attaches onload event to user's onload event (only if user defined the event before this script)
// window.attachEvent method was removed because it's necessary that user's onload event will be executed after menu's onload event
{
    tuserLoadFunc = (typeof(onload)=='function') ? onload : null;                 // remember user's onLoad event one time
    onload = apy_tload;                                                           // set own onLoad event one time
}


function apy_tGetParam(param, defparam) {
  return (typeof(param)!=tuf && param)?param:defparam;
}


function apy_tgetNextItem(itVar)
// Returns next item in the menu
{
  if (!itVar) return null;
  if (itVar.hasChild) return itVar.i[0];                                          // item has subitems => return the first child

  var pitVar = itVar.parentIt;
  if (!pitVar) return null;

  if (itVar.ind<pitVar.i.ln()-1)  return pitVar.i[itVar.ind+1];                   // item isn't the last one in submenu => return next item
  if (itVar.ind==pitVar.i.ln()-1)
  {
      while (pitVar.parentIt)
      {
          with (pitVar) if (parentIt.i[ind+1]) return parentIt.i[ind+1];
          pitVar = pitVar.parentIt;
      }
      return null;
  }
}


function apy_tgetLastChild(itVar)
{
  if (itVar.i.ln()) return apy_tgetLastChild(itVar.i[itVar.i.ln()-1])
  else
      return itVar;
}


function apy_tgetPrevItem(itVar)
// Returns previous item in the menu
{
  if (!itVar) return null;

  var pitVar = itVar.parentIt;
  if (!pitVar) return null;

  if (itVar.ind==0)                                                               // item is the first one in submenu
  {
      if (!pitVar.parentIt) return null;                                          // item is the first in menu
      return pitVar;                                                              // return parent item
  }

  if (itVar.ind>0)                                                                // item isn't the first one in submenu
      return apy_tgetLastChild(pitVar.i[itVar.ind-1]);
}


function apy_tgetLastItem(mInd)
// Returns last item in the menu
{
  with (apy_tmenu[mInd]) var itVar=i[i.ln()-1];
  var it;
  while ((it=apy_tgetNextItem(itVar))) itVar = it;
  return itVar;
}


function apy_tsetPointsMask(lvl, len, prevLvls, prevLvl)
// Sets points mask parameter for item (e.g. 00111: 0 - no points; 1 - draw points)
{
  var lvls='';
  for (var i=0; i<=len; i++)
  {
      if (prevLvls.charAt(i)!='0' && i<=lvl)  // previous position has points and not on current level yet
          lvls += '1';
      else
          lvls += (i==lvl) ? ((lvl!=prevLvl) ? '2' : '1') : '0';
  }
  return lvls;
}


function apy_tdetectPointsDraw(menu, maxNesting)
{
  with (menu)
  {
        var zeroLvl = apy_tsetPointsMask(-1, maxNesting, '', 0);  // fill string by zeroes
        var itVar = apy_tgetLastItem(menu.ind);

        with (itVar) ptMask = apy_tsetPointsMask(level, maxNesting, zeroLvl, 99999999);     // fill level mask for the last item

        var it;
        while ((it=apy_tgetPrevItem(itVar)))
        {
            with (it) ptMask = apy_tsetPointsMask(level, maxNesting, itVar.ptMask, itVar.level);
            itVar = it;
        }

  }
}


//##############################################################################
// PREFIX FUNCTIONS
//##############################################################################

var tfixPrefixes = ['javascript:', 'mailto:', "http://", "https://", "ftp://"];

function apy_tcanPrefix(url)
{
  for (var i=0; i<tfixPrefixes.length; i++)
      if (url.indexOf(tfixPrefixes[i])==0) return 0;
  return 1;
}


function apy_tsetPathPrefix(paths, prefix)
{
  if (typeof(paths)=='string') return paths ? ((apy_tcanPrefix(paths) ? prefix : '') + paths) : '';
  else
  {
      var p=[];
      for (var i=0; i<paths.length; i++)
          if (paths[i]) p[i] = (apy_tcanPrefix(paths[i])?prefix:'') + paths[i];

      return p;
  }
}


//##############################################################################
// PARAMETERS & INDIVIDUAL STYLES FUNCTIONS
//##############################################################################

function apy_tgetParam (param, defParam) {
  return (typeof(param)!="undefined" && param)?param:defParam;
}


function apy_tgetStyleParam(pName, sInd, sType, defValue)
// Returns an individual style value from a styles array for item/submenu
{
  if (sInd==-1 || ''+sInd+''=='') return defValue;
  var sp = (sType==1)?tstyles[sInd]:tXPStyles[sInd];   // get submenu or item style

  // Search for parameter name
  var f=0;
  for (var i=0; i<sp.ln(); i++)
      if (typeof(sp[i])==tuf) return defValue;
      else
          if (sp[i].io(pName)>=0)
          {
              f=1;
              break;
          }
          
  if (!f) return defValue;

  var val = sp[i].split('=')[1];                                // get parameters' value
  if (val.io(',')>=0) val = val.split(',');                     // if values is array -> create the array of values

  return val;
}


function apy_tsetStandardXPStyle()
{
  var standardXPStyle =
  {
      xpBtn            : apy_tsetPathPrefix(tXPExpandBtn, tpathPrefix_img),
      xpTitleBackColor : tXPTitleBackColor,
      xpTitleLeft      : apy_tsetPathPrefix(tXPTitleLeft, tpathPrefix_img),
      xpTitleLeftW     : tXPTitleLeftWidth,
      xpTitleBackImage : apy_tsetPathPrefix(tXPTitleBackImg, tpathPrefix_img)
  }
  return standardXPStyle;
}


function apy_tsetStandardItStyle()
{
  var standardItStyle =
  {
      backColor  : titemBackColor,
      backImage  : apy_tsetPathPrefix(titemBackImage,  tpathPrefix_img),
      // Font
      fntColor   : tfontColor,
      fntStyle   : tfontStyle,
      fntDecor   : tfontDecoration
  }
  return standardItStyle;
}


function apy_tgetXPStyle(menu, sInd)
{
  var st = menu.standardXPStyle;
  if (typeof(sInd)==tuf) return st;

  var btnI = apy_tgetStyleParam('tXPExpandBtn', sInd, 0, '');
  var lI   = apy_tgetStyleParam('tXPTitleLeft', sInd, 0, '');
  var bI   = apy_tgetStyleParam('tXPTitleBackImg', sInd, 0, '');

  var style =
  {
      xpBtn            : btnI ? apy_tsetPathPrefix(btnI, tpathPrefix_img) : st.xpBtn,
      xpTitleBackColor : apy_tgetStyleParam('tXPTitleBackColor', sInd, 0, st.xpTitleBackColor),
      xpTitleLeft      : lI ? apy_tsetPathPrefix(lI, tpathPrefix_img) : st.xpTitleLeft,
      xpTitleLeftW     : apy_tgetStyleParam('tXPTitleLeftWidth', sInd, 0, st.xpTitleLeftW),
      xpTitleBackImage : bI ? apy_tsetPathPrefix(bI, tpathPrefix_img) : st.xpTitleBackImage
  };
  return style;
}


function apy_tgetItemStyle(menu, sInd)
{
  var st = menu.standardItStyle;
  if (typeof(sInd)==tuf) return st;

  var bI = apy_tgetStyleParam("titemBackImage",  sInd, 1, '');

  var style =
  {
      backColor  : apy_tgetStyleParam('titemBackColor',    sInd, 1, st.backColor),
      backImage  : bI ? apy_tsetPathPrefix(bI, tpathPrefix_img) : st.backImage,
      // Font
      fntColor   : apy_tgetStyleParam("tfontColor",        sInd, 1, st.fntColor),
      fntStyle   : apy_tgetStyleParam("tfontStyle",        sInd, 1, st.fntStyle),
      fntDecor   : apy_tgetStyleParam("tfontDecoration",   sInd, 1, st.fntDecor)
  };

  return style;
}

//##############################################################################
// BASIC FUNCTIONS
//##############################################################################

function apy_tcreateMenuParams(curInd)
// Creates menu parameters
{
  apy_tmenu[curInd] =
  {
      i            : [],                     // root items array
      ind          : curInd,                 // index of the menu
      id           : 'apy_t'+curInd,         // HTML id
      parentIt       : null,                 // do not erase
      maxLevel     : 0,                      // max items level
      itCount      : 0,                      // current items count
      idCount      : 0,                      // number of items that were created, used for id of new items
      absPos       : tabsolute,
      left         : tleft,
      top          : ttop,
      width        : tmenuWidth,
      height       : tmenuHeight,
      itemH        : titemHeight,
      nowrap       : tnoWrap?'nowrap':'',
      dx           : tlevelDX,
      // Expand/collapse vars
      expandClick    : texpandItemClick,
      closeExpanded  : tcloseExpanded,
      closeExpandedXP: tcloseExpandedXP,
      // Floatable Menu
      floating     : tfloatable,
      floatingX    : tfloatableX,
      floatingY    : tfloatableY,
      iterations   : tfloatIterations,
      // Moveable Menu
      moving       : tmoveable,
      moveClr      : tmoveColor,
      moveImage    : tmoveImage,
      moveHeight   : tmoveHeight,
      // Appearance
      brdWidth     : tmenuBorderWidth,                           // border width
      brdStyle     : tmenuBorderStyle,
      brdColor     : tmenuBorderColor,
      backColor    : tmenuBackColor,                                      // menu background color
      backImage    : apy_tsetPathPrefix(tmenuBackImage, tpathPrefix_img), // menu background image
      fntColorDisabled : tfontColorDisabled,
      // Common     
      btns         : apy_tsetPathPrefix(texpandBtn, tpathPrefix_img),
      btnW         : texpandBtnW,
      btnH         : texpandBtnH,
      btnAlign     : texpandBtnAlign,
      iconAlign    : ticonAlign,
      hasPoints    : tpoints,
      pointsImg    : apy_tsetPathPrefix(tpointsImage, tpathPrefix_img),
      pointsVImg   : apy_tsetPathPrefix(tpointsVImage, tpathPrefix_img),
      pointsCImg   : apy_tsetPathPrefix(tpointsCImage, tpathPrefix_img),
      // XP-style
      isXPStyle    : tXPStyle,
      xpBtnW       : tXPBtnWidth,
      xpBtnH       : tXPBtnHeight,
      xpIconW      : tXPIconWidth,
      xpIconH      : tXPIconHeight,
      xpIterations : tXPIterations,
      xpFilter     : tXPFilter,
      xpBrdWidth   : tXPBorderWidth,
      xpBrdColor   : tXPBorderColor,
      isBusy       : 0,
      // Toggle mode
      toggleMode   : ttoggleMode,
        pressedItemID: '',
      pressedFontColor : tpressedFontColor,
        // Standard styles
        standardItStyle : apy_tsetStandardItStyle(),
        standardXPStyle : apy_tsetStandardXPStyle(),
        
       // Items states
        saveState   : tsaveState,
        //savePrefix  : tsavePrefix,
        savePrefix  : '',
        stateLoaded : 0,
        states      : []
  }
  
  tcurMenu.mVar = apy_tmenu[curInd];
}



function apy_tgetItemLink(linkVal) {                // Returns item link
  return apy_tsetPathPrefix(apy_tgetParam(linkVal, ''), tpathPrefix_link);
}


function apy_tgetItemTarget(targetVal) {            // Returns item target
  if (!targetVal && titemTarget) targetVal = titemTarget;  // if individual target is empty and a common target has a value -> assign a common target
  return targetVal;
}


function apy_tdelFlag(s) {
  return s.sb(1, s.ln());
}


function apy_tgetItemIcons(iParams)
// Returns icons names for item
{
  var ic0 = apy_tgetParam(iParams[2], '');
  var ic1 = apy_tgetParam(iParams[3], ic0);
  var ic2 = apy_tgetParam(iParams[4], ic1);
  return [ic0, ic1, ic2];
}


function apy_tcreateItemParams(parentM, parentItem, iParams, lvl, itInd)
// Creates item parameters
{
  var iText = iParams[0];
  var itID = parentM.id+'i'+parentM.idCount;


  // Detect is item is hidden
  var hid = 0;
  if (iText.charAt(0)=='#')                     // item is hidden
  {
      hid = 1;
      iText = apy_tdelFlag(iText);              // delete '#' (hidden-flag)
  }


  // Detect expand-state of item
  var expnd = (texpanded || !tdynamicTree);     // item is expanded
  if (iText.charAt(0)=='+')
  {
      iText=apy_tdelFlag(iText);                // delete '+' (expand-flag)
      expnd = 1;
  }
  expnd = (expnd && !hid);


  // Detect pressed item
  if (iText.charAt(0)=='>')
  {
      iText=apy_tdelFlag(iText);                // delete '>' (item is pressed)
      parentM.pressedItemID = itID;
  }

  // Link and target
  var iLink   = apy_tgetItemLink(iParams[1]);
  var iTarget = apy_tgetItemTarget(apy_tgetParam(iParams[6], ''));


  if (!parentItem) parentItem = parentM;         // if no parent item => make menu object as parent item
  else
      parentItem.hasChild = 1;


  var indx = (itInd>-1) ? itInd : parentItem.i.ln();


  // Set the item state according to loaded item state from cookies
  with (parentM)
      if (stateLoaded && tdynamicTree)                        // the menu isn't dynamic => don't get a loaded items state from cookies
      {
          var stt = (typeof(states[itCount])==tuf) ? '' : states[itCount]
          switch (stt)
          {
              case 'h': expnd = 0; hid = 1; break;            // item is hidden (user defined the item as unvisible)
              case 'u': expnd = 0; hid = 0; break;            // item is unvisible (parent item is collapsed)
              case '+': expnd = 1; hid = 0; break;            // item is expanded
              case '-': expnd = 0; hid = 0; break;            // item is collapsed
          }
      }

  parentItem.i[indx] =
  {
      i       : [],                          // child items
      mInd    : parentM.ind,
      ind     : indx,
      id      : itID,
      parentIt: parentItem,
      level   : lvl,                         // item's level
      dx      : parentM.dx,                  // x offset for every next level
      ptMask  : '',                          // draw points flag, for example, '00111'
      hasChild: 0,
      expanded: expnd ? 1 : 0,
      // Common
      text    : iText,
      link    : iLink,
      target  : iTarget,
      tip     : apy_tgetParam(iParams[5], ''),
      align   : titemAlign,
      valign  : 'middle',
      cursor  : titemCursor,
      // Appearance
      itStyle  : apy_tgetItemStyle(parentM, iParams[7]),
      xpStyle  : apy_tgetXPStyle(parentM, iParams[8]),
      // Icons & arrows
      icon     : apy_tsetPathPrefix(apy_tgetItemIcons(iParams), tpathPrefix_img),
      iconW    : ticonWidth,
      iconH    : ticonHeight,
      // Additional
      isVisible    : 1,
      isHidden     : hid,
      isDisabled   : (iTarget=='_')?1:0,           // target='_' - item is disabled
      isDeleted    : 0,
      timer        : null
  }


  with (parentM)
  {
      if (lvl>maxLevel) maxLevel = lvl;
      itCount++;
      idCount++;
  }

  with (tcurMenu)
  {
      mVar   = parentM;
      itInd  = indx;
      itVar  = parentItem.i[indx];
      pitVar = parentItem;
  }
}


function apy_tgetItemLevel(itText)
// Returns level of item and removes '|' symbols from item text
{
  var lvl=0;
  while (itText.charAt(lvl)=='|') lvl++;                                        // nesting of item
  return lvl;
}


function apy_tdetectItemVisibility_Expand(menu, itVar)
// Detects item's visibility and expand-state according to its attributes and attributes of its parent
{
  with (itVar)
  {
      var lowLevel = (menu.isXPStyle) ? 1 : 0;

      if (level>lowLevel) isVisible = (parentIt.expanded && !parentIt.isHidden);
      else
          isVisible = 1;

      expanded  = (hasChild && expanded && isVisible && !isHidden) ? 1 : 0;
  }
}

function apy_tparseItemsData()
// Parses menu items: creates item objects
{
    var pl=-1;                                        // previous item level
    var cl=0;                                         // current item level
    var textL;
    var iParams = tmenuItems;

    for (var i=0; (i<iParams.length && typeof(iParams[i])!=tuf); i++)
    {
        cl = apy_tgetItemLevel(iParams[i][0]);
        iParams[i][0] = iParams[i][0].sb(cl, iParams[i][0].ln());

        with (tcurMenu)
        {
            if (pl<cl) pitVar = itVar;                                            // set new parent
            if (pl>cl) for (var j=0; j<pl-cl; j++) pitVar = pitVar.parentIt;      // get previous level

            apy_tcreateItemParams(mVar, pitVar, iParams[i], cl, -1);
        }
        pl = cl;
        
    }
    
    // Detect items visibility and expand-state
    var itVar = tcurMenu.mVar.i[0];
    do
    {
        apy_tdetectItemVisibility_Expand(tcurMenu.mVar, itVar);
    }
    while ((itVar=apy_tgetNextItem(itVar)))
}


//##############################################################################
// HTML FUNCTIONS
//##############################################################################

var pmStyle = 'padding:0px;margin:0px;';

function apy_topenDIV(id, styleText, add) {
  return '<DIV id="'+id+'" style="'+pmStyle+styleText+'" '+add+'>';
}

function apy_tcloseDIV() {
  return '</DIV>';
}

function apy_topenTableSimple(id, spac, padd, styleText, events, add, r) {
   return '<Table id="'+id+'" '+events+' cellspacing='+spac+' cellpadding='+padd+' '+add+' style="'+styleText+'" border=0>'+ (r?'<tr>':'');
}

function apy_tcloseTable(r) {
  return (r?'</tr>':'') + '</Table>';
}

function apy_tcreateTd(id, styleText, add, html)
{
  return '<td id="'+id+'" '+add+' style="'+pmStyle+styleText+'">'+html+'</td>';
}

function apy_topenImg(id, url, w, h, add) {
  return '<img id="'+id+'" src="'+url+'" width='+w+' height='+h+' '+add+' border=0>';
}



function apy_tcreateDX(menu, itVar)
// Creates a space before item
{
  var s='';
  with (itVar)
  {
      var bl = apy_topenImg('', tblankImage, dx, 1, '');
      
      for (var k=level; k>=0; k--)
          if (menu.hasPoints && k!=level)
              s += (ptMask.charAt(level-k-1)=='1') ? apy_tcreateTd('', 'background-repeat:repeat-y', 'background="'+menu.pointsImg+'"', bl) : apy_tcreateTd('', '', '', bl);
          else
              s += apy_tcreateTd('', '', '', apy_topenImg('', tblankImage, ((k==level)?2:dx), 1, ''));
  }
  return s;
}


function apy_tcreateExpandBtn(menu, itVar)
// Creates [+]-button (expand-button)
{
  with (itVar)
  {
      var s   = '';
      var st  = '';
      var add = 'onMouseDown="apy_tBtnClick(\''+id+'\')"';
      
      if (tdynamicTree)                                                            // items can be expanded/collapsed by user
      {
          if (hasChild) add += ' style="cursor:pointer"';
          st = (ptMask.charAt(level)=='2') ? 'background: no-repeat' : 'background: repeat-y';
      }

      var html = apy_topenImg(id+'btn', (hasChild ? (expanded ? menu.btns[2] : menu.btns[0]) : tblankImage), menu.btnW, menu.btnH, add);
      s += apy_tcreateTd('', st, '', html);
  }

  s += (menu.btnAlign=="right") ? apy_tcreateDX(menu, itVar) : '';
  return s;
}


function apy_tcreateIcon(menu, itVar)
// Creates item icon
{
  with (itVar)
  {
      if (!icon[0]) return '';
      var pressed = (apy_tmenu[mInd].pressedItemID==id);
      //if ((!tdynamicTree || expanded || pressed)) alert(text);
      var s = apy_tcreateTd('', '', '', apy_topenImg(id+'icon', ((!tdynamicTree || expanded || pressed) ? icon[2] : icon[0]), iconW, iconH, ''));
  }
  return s;
}


function apy_tcreateSpace(menu, itVar, drawPoints)
// Created space within item
{
  return apy_tcreateTd('',
                       'background-repeat:repeat-x;',
                       ((menu.hasPoints && drawPoints && itVar.hasChild) ? 'background="'+menu.pointsVImg+'"' : ''),
                       apy_topenImg('', tblankImage, 5, 1, '')
                      );
}


function apy_tgetItemText(itVar)
// Returns item text within <span> tag.
// It's necessary to create <span> (or other inline tag) because in other case when font style is assigned to <td> IE shows wait-cursor on mouseover/mouseout
{
  with (apy_tmenu[itVar.mInd])
      with (itVar)
      {
          with (itStyle)
          {
              var pressed = (pressedItemID==id);
              var fColor  = isDisabled ? fntColorDisabled : (pressed ? pressedFontColor : fntColor[0]);
              var borderStyle = text.length>=2?' class="div_interno" ':'';
              var s = '<span class="dhtml_menu_items" id="'+id+'font" style="color:'+fColor+';font:'+fntStyle+';font-decoration:'+fntDecor[0]+'"><div'+borderStyle+'>'+text+'</div></span>';
          }
      }
  return s;
}


function apy_tcreateItemText(menu, itVar)
{
  with (itVar)
  {
      if (!text) return;
      var s = apy_tcreateTd(id+'textTD',
                                'width:100%;',
                                menu.nowrap+' height='+menu.itemH+' align='+align,
                                apy_tgetItemText(itVar));
  }
  return s;
}


function apy_tcreateXPSubmenu(menu, itVar, disp)
// Creates XP title with or without icon.
// Creates DIV for XP submenu.
{
  with (itVar)
  {
      var prm = '\''+id+'\'';
      
      var s = apy_topenTableSimple(id, 0, 0, 'width:100%;cursor:pointer', '', 'title="'+tip+'" onMouseOver="apy_tXPTitleChange(this,'+prm+',1)" onMouseOut="apy_tXPTitleChange(this,'+prm+',0)" onClick="apy_tXPTitleClick('+prm+')"', 0) +
              '<TR style="display:'+disp+'">';


      // HTML of cell with item's text
      var textTD = apy_tcreateTd(id+'textTD',
                                 'width:100%;background:'+xpStyle.xpTitleBackColor+' repeat-y',
                                 '',
                                 apy_tgetItemText(itVar));

      var btnImg = expanded ? xpStyle.xpBtn[2] : xpStyle.xpBtn[0];
      
      
      if (icon[0])                   // XP-title has icon
          s += apy_tcreateTd('', '', 'rowspan=2', apy_topenImg('', icon[0], menu.xpIconW, menu.xpIconH, '')) +
               apy_tcreateTd('', 'height:'+(menu.xpIconH-menu.xpBtnH)+'px', 'colspan=2', '') +
               '</TR><TR>' + textTD +
               apy_tcreateTd('', '', '', apy_topenImg(id+'btn', btnImg, menu.xpBtnW, menu.xpBtnH, ''));
      else
          s += apy_tcreateTd('', 'height:'+menu.xpBtnH+'px', '', apy_topenImg('', xpStyle.xpTitleLeft, xpStyle.xpTitleLeftW, menu.xpBtnH, '')) +
               textTD +
               apy_tcreateTd('', '', '', apy_topenImg(id+'btn', btnImg, menu.xpBtnW, menu.xpBtnH, ''));

      s += apy_tcloseTable(1) +
           // Create submenu DIVs
           apy_topenDIV(id+'divXP', 'width:100%;position:relative;overflow:visible;height:auto;' + (expanded ? '' : 'display:none;'), '') +
           apy_topenDIV(id+'divXP2','width:100%;height:auto;position:relative;top:0px;left:0px;filter:blendTrans(duration=0.2);', '') +
           apy_topenTableSimple(id+'tbl', 0, 0, 'border:solid '+menu.xpBrdWidth+'px '+menu.xpBrdColor+';border-top:none;width:100%;background:'+menu.backColor+' repeat', '', '', 0);
  }
  return s;
}


function apy_tcloseXPSubmenu()
// Closes XP submenu
{
  return apy_tcloseTable(0) + apy_tcloseDIV() + apy_tcloseDIV() +
         apy_topenDIV('', 'height:10px;font-size:1px;', '')+apy_tcloseDIV();      // create space between submenus
}


function apy_topenItemsTable(menu)
// Opens items table for standard style (not XP)
{
  return apy_topenTableSimple(menu.id+'tbl', 0, 0, 'width:165px;background:'+menu.backColor+' repeat;', '', '', 0);
}


function apy_tcreateItem(menu, itVar, disp, newRow)
// Creates standard item
{
  with (itVar)
  {
      var prm = '\''+id+'\'';

      var s = (newRow ? '<TR id="'+id+'TR" style="display:'+disp+'"><TD style="'+pmStyle+'">' : '') +
      
                  apy_topenTableSimple(id, 0, 0, 'cursor:'+cursor+';background:'+itStyle.backColor[0]+' repeat;width:168px',
                  'title="'+tip+'"', 'onMouseOver="apy_tchangeItem(this,'+prm+',1)" onMouseOut="apy_tchangeItem(this,'+prm+',0)" onClick="apy_tClick('+prm+')" onContextMenu="return apy_tRightClick('+prm+')"', 1) +

                      ((menu.btnAlign!='right')  ? apy_tcreateDX(menu, itVar) + apy_tcreateExpandBtn(menu, itVar) + apy_tcreateSpace(menu, itVar, 1): '') +
                      ((menu.iconAlign!='right') ? apy_tcreateIcon(menu, itVar) + apy_tcreateSpace(menu, itVar, 0) : '') +
                      apy_tcreateItemText(menu, itVar) +
                      ((menu.iconAlign=='right') ? apy_tcreateSpace(menu, itVar, 0) + apy_tcreateIcon(menu, itVar) : '') +
                      ((menu.btnAlign=='right')  ? apy_tcreateSpace(menu, itVar, 1) + apy_tcreateExpandBtn(menu, itVar) + apy_tcreateDX(menu, itVar) : '') +

                  apy_tcloseTable(1) +
              
              (newRow ? '</TD></TR>' : '');
  }
  return s;
}


function apy_tcreateMoveSpacer(menu)
// Creates move spacer
{
  with (menu)
      var s = apy_topenDIV(id+'move',
                           'font-size:1px;width:100%;height:'+moveHeight+'px;background:'+moveClr+' repeat;cursor:move',
                           'onMouseDown="apy_tstartMoving(event,'+ind+')" onMouseUp="apy_tstopMoving(event,'+ind+')"'
                          ) +
              apy_tcloseDIV();
      
  return s;
}



function apy_tmenuInit()
// Initializes the menu
{
  //  var d = new Date();
  //  var t = Date.parse(d.toUTCString());

    apy_tcheckGlobalParams();

    with (tcurMenu)
    {
        apy_tcreateMenuParams(ind);
        if (!ind) apy_tsetOnLoad();
    
        // Saving state parameters
        if (mVar.saveState) apy_tloadState(ind);

        apy_tparseItemsData();
        if (mVar.hasPoints) apy_tdetectPointsDraw(mVar, mVar.maxLevel);  // Detect where draw points

        var menu   = mVar;
    }

    //##########################################################################
    // Create HTML
    //##########################################################################

    var s = '';
    var itVar=menu.i[0], prm, disp;

    with (menu)
    {
        // Create main DIV
        s += apy_topenDIV(id+'div', 'background:'+backColor+' repeat;border:'+brdStyle+' '+brdWidth+'px '+brdColor+';' +
                          'width:'+width+';position:'+(absPos ? 'absolute' : 'static')+';height:'+ (height ? height : 'auto') + ';left:'+left+'px;top:'+top+'px;z-index:1000;'+(height ? 'overflow:auto' : ''),
                          '');


        if (moving)     s += apy_tcreateMoveSpacer(menu);
        if (!isXPStyle) s += apy_topenItemsTable(menu);


        // Run items
        do
        {
            with (itVar)
                if (isXPStyle)
                {
                    disp = (!isHidden && (isVisible || level<=1)) ? '' : 'none';        // if it isn't a 1-level item => hidden=true
                    if (!level) s += apy_tcreateXPSubmenu(menu, itVar, disp);
                    else        s += apy_tcreateItem(menu, itVar, disp, 1);
                }
                else
                    s += apy_tcreateItem(menu, itVar, ((isVisible && !isHidden) ? '' : 'none'), 1);

            //alert(itVar.text+'  '+itVar.ptMask)
            
            // Close XP submenu
            if (isXPStyle && (!apy_tgetNextItem(itVar) || apy_tgetNextItem(itVar).level==0)) s += apy_tcloseXPSubmenu();

        }
        while ((itVar=apy_tgetNextItem(itVar)))

        if (!isXPStyle) s += apy_tcloseTable(0);

        // Close main DIV
        s += apy_tcloseDIV();
    }

//    tdo.write(s);
    $(containerDivId).insert({bottom:s});



    tcurMenu.ind++;
    tcurMenu.curPressedIt = -1;
}


function apy_tgetItemVarByID(id)
{
  var itVar;
  for (var j=0; j<apy_tmenu.ln(); j++)
  {
      itVar = apy_tmenu[j].i[0];
      do
      {
          if (itVar.id==id) return itVar;
      }
      while ((itVar=apy_tgetNextItem(itVar)))
  }
  return null;
}


//##############################################################################
// XP-style events
//##############################################################################

function apy_tMin(v)
{
  return (v<1)?1:v;
}


function apy_tAnimExpand(divID, mInd, itInd, inc)
// Animated expand/collapse of XP submenu (called in setInterval)
{
  var menu   = apy_tmenu[mInd]
  var itVar  = menu.i[itInd];
  var smDIV  = apy_tgetObjectByID(divID)
  var smDIV2 = apy_tgetObjectByID(divID+'2')
  var oh     = smDIV2.offsetHeight;
  with (smDIV)
      var h = style.height ? parseInt(style.height) : offsetHeight;


  if (inc==-1)                                   // collapse submenu
  {
      var cond = (h>1);
      h -= apy_tMin(( isMAC ? h : h/menu.xpIterations ));
  }
  else                                           // expand submenu
  {
      var cond = (h<oh);
      if (cond) h += apy_tMin(( isMAC ? h : (oh-h)/menu.xpIterations ));
      if (h>oh)
      {
          h    = oh;
          cond = 0;
      }
  }


  if (cond)
  {
      smDIV.style.height = h+'px';
      smDIV2.style.top   = h-oh+'px';
  }
  else
  {
      window.clearInterval(itVar.timer);
      itVar.timer=null;
      if (inc==-1) smDIV.style.display = 'none';
      else
          if (isNS && isVER<7) smDIV.style.display = '';
          else
              with (smDIV.style)
              {
                  overflow = 'visible';
                  height='auto';
              }
              
      menu.isBusy--;
  }
}


function apy_tFilter(menu, obj, vis, dur)
// Enabled fade filter for XP submenu
{
  with (obj.filters[0])
  {
      duration = dur;
      apply();
      obj.style.visibility = vis;
      play();
  }
}


function apy_tgetDuration(menu, h)
{
  if (!h) return 0.3;
  var n=1;
  while (h>1)
  {
      h=h/menu.xpIterations;
      n++;
  }
  return 0.15*n;
}


function apy_tXPTitleClick(itID, selfCall)
// Start expand/collapse XP submenu
{
  var itVar = apy_tgetItemVarByID(itID);
  var menu  = apy_tmenu[itVar.mInd];

  if (!tdynamicTree || itVar.isHidden || itVar.isDeleted) return;

  var an = !(isNS && isVER<7);
  with (itVar)
  {
      if (timer) return;                                                 // if submenu is in expanding/collapsing process
      menu.isBusy++;
      var btnObj = apy_tgetObjectByID(id+'btn');
      var smDIV  = apy_tgetObjectByID(id+'divXP');
      var smDIVs = smDIV.style;
      var smDIV2 = apy_tgetObjectByID(id+'divXP2');
      var f      = (isIE && isVER>=5.5 && menu.xpFilter);
      if (f) var dur=apy_tgetDuration(menu, smDIV2.offsetHeight);

      if (expanded)                                                      // collapse submenu
      {
          expanded = 0;
          
          if (btnObj && xpStyle.xpBtn[1]) btnObj.src = xpStyle.xpBtn[1];
          if (an)
          {
              with (smDIVs)
              {
                  height = smDIV.offsetHeight+'px';                      // define style.height property
                  if (an) overflow = 'hidden';
              }
              timer = setInterval('apy_tAnimExpand("'+smDIV.id+'",'+mInd+','+ind+',-1)', 5);
              if (f) apy_tFilter(menu, smDIV2, 'hidden', dur);
          }
          else                    // Netscape 6
          {
              menu.isBusy--;
              smDIVs.display = 'none';
          }
      }
      else                                                               // expand submenu
      {
          expanded = 1;
          if (btnObj && xpStyle.xpBtn[3]) btnObj.src = xpStyle.xpBtn[3];

          smDIVs.display = '';
          if (an)
          {
              with (smDIVs)
              {
                  height = '1px';
                  overflow = 'hidden';
              }
              timer = setInterval('apy_tAnimExpand("'+smDIV.id+'",'+mInd+','+ind+',+1)', 5);
              if (f) apy_tFilter(menu, smDIV2, 'visible', dur);
          }
          else                  // Netscape 6
              menu.isBusy--;
      }
  }
  
  with (menu)
  {
      // Close expanded XP submenus if var tcloseExpandedXP = 1
      if (itVar.expanded && selfCall!=1 && closeExpandedXP)
          for (var j=0; j<i.ln(); j++) if (i[j].id!=itID && i[j].expanded) apy_tXPTitleClick(i[j].id, 1);

      if (saveState) apy_tsaveState(ind);                                         // save menu state in cookies
  }
}


function apy_tXPTitleChange(itObj, itID, over)
{
  var itVar = apy_tgetItemVarByID(itID);
  with (itVar)
  {
      apy_tchangeItemFont(itVar, apy_tgetObjectByID(id+'font').style, over);
      with (xpStyle)
          with (apy_tgetObjectByID(id+'btn'))
          {
              if (expanded) over += 2;
              if (xpBtn[over]) src = xpBtn[over];
          }
  }
}



//##############################################################################
// Standard items events
//##############################################################################

function apy_tchangeItemFont(itVar, fontStyle, over, pressed)
// Changes font parameters of item
{
  with (itVar)
      with (fontStyle)
      {
          if (pressed) color = apy_tmenu[mInd].pressedFontColor;
          else
              with (itStyle)
              {
                  color = fntColor[over];
                  textDecoration = fntDecor[over];
              }
      }
}


function apy_tchangeItem(itObj, itID, over)
// Changes item appearance on mouseover/mouseout
{
  var itVar = apy_tgetItemVarByID(itID);
  if (!itVar) return;

  with (itVar)
  {
      if (isDisabled) return;

      with (itStyle)
      {
          if (backColor[over]) itObj.style.backgroundColor = backColor[over];
          if (backImage[over]) itObj.style.backgroundImage = '';
      }

      var pressed = (apy_tmenu[mInd].pressedItemID==id);
      apy_tchangeItemFont(itVar, apy_tgetObjectByID(id+'font').style, over, pressed);

      if (pressed || expanded) over = 2;
      var icObj = apy_tgetObjectByID(id+'icon');
      if (icObj) icObj.src = icon[over];
  }
  
  tcurBtn = 0;
}


function apy_tRightClick(itID)
// Execute user's function on right mouse click
{
  if (typeof(apyt_ext_userRightClick)=='function') return apyt_ext_userRightClick(itID);
  else
      return true;
}


function apy_tsetPressedItem(menu, itID)
{
  if (menu.pressedItemID)                                  // any item is pressed
  {
      var pID = menu.pressedItemID
      menu.pressedItemID = '';
      apy_tchangeItem(apy_tgetObjectByID(pID), pID, 0);    // de-highlight pressed item
  }
  menu.pressedItemID = itID;
  apy_tchangeItem(apy_tgetObjectByID(itID), itID, 0);      // highlight current item
}


function apy_tClick(itID)
// Processes click event on item
{
  /*if (tcurBtn)                                                           // do not execute link's action if click was on expand-button
  {
      tcurBtn=0;
      return;
  }       */

  if (typeof(apyt_ext_userClick)=='function') if (!apyt_ext_userClick(itID)) return false;          // execute user's function if it's defined

  var itVar = apy_tgetItemVarByID(itID);
  var menu  = apy_tmenu[itVar.mInd];


  with (itVar)
  {
      if (isDisabled) return;
      
      // Expand item if var texpandItemClick=1
      if (menu.expandClick && hasChild) apy_tExpand(itVar, !expanded);

      if (link)
      {
          if (menu.toggleMode) apy_tsetPressedItem(menu, id);

          if (link.toLowerCase().io('javascript:')==0) eval(link.sb(11, link.length));    // execute JavaScript code
          else {             
                  var formMenu = document.createElement("form");
                  formMenu.setAttribute("method", "post"); 
                  formMenu.setAttribute("action", link); 
                  formMenu.setAttribute("target", target);         
                  document.body.appendChild(formMenu);    
                  formMenu.submit();
          }
      }
  }
}


function apy_tChangeItemVisibility(itVar, vis)
// Changes item visibility (and expand-state if visibility=0)
{
  with (itVar)
  {
      isVisible = vis;                                                // set the visibility flag
      if (isHidden) return;                                           // do not show/hide hidden item
      apy_tgetObjectByID(id+'TR').style.display = vis ? '' : 'none';
      if (!vis) expanded = 0;
  }
}



var tuserExpand=0;

function apy_tExpand(itVar, expnd)
// Expands/collapses item
{
  var menu  = apy_tmenu[itVar.mInd];

  if (!itVar.hasChild || itVar.isHidden || itVar.isDeleted) return;

  var icObj  = apy_tgetObjectByID(itVar.id+'icon');
  var btnObj = apy_tgetObjectByID(itVar.id+'btn');
  var icObj2;

  if (expnd)                                                                      // expand item
  {
      with (itVar)
      {
          for (var j=0; j<i.ln(); j++) apy_tChangeItemVisibility(i[j], 1);        // show child items with level+1 only
          expanded = 1;
          btnObj.src = menu.btns[2];
          apy_tchangeItem(apy_tgetObjectByID(id), id, 1);
      }
  }
  else                                                                            // collapse item
  {                                                                               // hide all child items
      with (itVar)
      {
          for (var j=0; j<i.ln(); j++)
          {
              if (i[j].hasChild && i[j].expanded)
              {
                  apy_tExpand(i[j], 0);                                           // collapse subitems
                  apy_tgetObjectByID(i[j].id+'btn').src = menu.btns[0];
                  icObj2 = apy_tgetObjectByID(i[j].id+'icon');
                  if (icObj2) icObj2.src = i[j].icon[0];
              }

              apy_tChangeItemVisibility(i[j], 0);
          }

          expanded = 0;
          btnObj.src = menu.btns[0];
          apy_tchangeItem(apy_tgetObjectByID(id), id, (tuserExpand ? 1 : 0));
      }
  }


  if (menu.saveState) apy_tsaveState(menu.ind);
}


function apy_tBtnClick(itID)
// Click event for expand-button (expand/collapse item)
{
  tcurBtn = 1;                                                     // mouse down on expand-button

  var itVar = apy_tgetItemVarByID(itID);
  var menu  = apy_tmenu[itVar.mInd];
  if (itVar.isDisabled || !itVar.hasChild || menu.isBusy) return;  // do not expand/collapse items while the menu expand/collapse XP submenu. In other case the height of XP submenu can be broken during animation


  with (itVar)
  {

      with (menu)
      {
          var it=menu.i[0];
          if (closeExpanded && !expanded)                             // only 1 item can be expanded and this one isn't expanded
              do
              {
                  if (it.level==itVar.level && it.expanded && it.id!=itVar.id) apy_tExpand(it, 0);
              }
              while ((it=apy_tgetNextItem(it)));

          tuserExpand = 1;                                            // user expands the item using a mouse
          apy_tExpand(itVar, !expanded);
          tuserExpand = 0;
      }

  }
}


function apy_tgetObjectByID(id)
// Returns object on a page by ID
{
  if (!id) return null;
  if (isIE && isVER<5) return tdo.all[id];
  return tdo.getElementById(id);
}


