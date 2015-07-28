//using closures to avoid name collision and window overloading, it should be an auto node.js task
(function(){
	
	'use strict';

	angular
		.module('devvit')
		.filter('customSearch', customSearch);

	function customSearch(){
		return function (input, searchText, AND_OR) {
	        // I don´t like the "multiple var assignment approach"

	        var returnArray = [];
	        // Split on single or multi space
	        var splitext = searchText.toLowerCase().split(/\s+/);
	        // Build Regexp with Logical AND using "look ahead assertions"
	        var regexp_and = "(?=.*" + splitext.join(")(?=.*") + ")";
	        // Build Regexp with logicial OR
	        var regexp_or = searchText.toLowerCase().replace(/\s+/g, "|");
	        
	        // Compile the regular expression
	        var re = new RegExp((AND_OR == "AND") ? regexp_and : regexp_or, "i");

	        for (var x = 0; x < input.length; x++) {
	            
	            var item = input[x];
	            var concatValues = item.Name+' '+item.Type+' '+item['Designed by'];

	            if (re.test(concatValues)) returnArray.push(item);
	        }

	        // View what the 2 regular expression look like
	        console.log(regexp_or);
	        console.log(regexp_and);
	        return returnArray;
	    }
	}

})();