window.addLoadEvent = function(func) {
   var oldonload = window.onload;
   if (typeof window.onload != 'function') {
      window.onload = func;
   } else {
      window.onload = function() {
         if (oldonload) {
            oldonload();
         }
         func();
      }
   }
}

var pngfix = {

   main : function() {

      if ((parseFloat(navigator.appVersion.split("MSIE")[1]) >= 5.5) && (document.body.filters)) {
         for(var i=0; i<document.images.length; i++) {
            var img = document.images[i]
            var imgName = img.src.toUpperCase()
            if (imgName.substring(imgName.length-3, imgName.length) == "PNG") {
               var imgID = (img.id) ? "id='" + img.id + "' " : ""
               var imgClass = (img.className) ? "class='" + img.className + "' " : ""
               var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
               var imgStyle = "display:inline-block;" + img.style.cssText 
               if (img.align == "left") imgStyle = "float:left;" + imgStyle
               if (img.align == "right") imgStyle = "float:right;" + imgStyle
               if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
               var strNewHTML = "<span " + imgID + imgClass + imgTitle
               + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
               + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
               + "(src=\'" + img.src + "\', sizingMethod='image');\"></span>" 
               img.outerHTML = strNewHTML
               i = i-1
            }
         }
      }
   }
}

window.addLoadEvent(function() { pngfix.main(); });
