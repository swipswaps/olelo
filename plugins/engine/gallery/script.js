(function(){function e(b){var a=document.createElement("img");a.src=b;f.push(a)}function d(){var b=$("<img/>"),a=$("<img/>");$("#gallery-screen").append(b).append(a);$("#gallery-thumbs a").click(function(c){c.preventDefault();a.hide().attr("src",this.href);b.fadeOut("slow");a.fadeIn("slow");c=b;b=a;a=c;return false}).each(function(){e(this.href)})}var f=[];$("#page").bind("pageLoaded",d);d()})();
