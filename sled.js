SLED.render = function($parent, refOrName) {
	// convert rule name to ref
	var ref = Ref.toRef(refOrName);
	var rule = SLED.grammar[ ref.name ];
	
	var isBlock = rule.content;
	var clzLayout = isBlock ? "type-block" : "type-value";
	var $obj = $('<div>')
		.addClass(clzLayout);
		
	var clzDepth = 'depth-even';
	if ($parent.parent().hasClass('depth-even')) {
		clzDepth = 'depth-odd';
	} 
	$obj.addClass(clzDepth);
	$parent.append($obj);	
	
	if (isBlock) {
		SLED.renderBlock($obj, ref);
	}
	else {
		SLED.renderValue($obj, ref);
	}
}

SLED.renderBlock = function($obj, ref) {
	var rule = SLED.grammar[ ref.name ];
	var isOpt = ref.mult[0] == 0;
	var isMany = ref.mult[1] > 1;

	var $hdr = $('<div class="block-header">');
	var $title = $('<span class="block-name">').text( rule.title );
	var $menu = $('<div class="menu">');
	// contents
	for (var i = 0; i < rule.content.length; i++) {
		var refContent = rule.content[i];
		SLED.renderMenuRef($obj, $menu, refContent);
	}
	if ( Ref.isOpt(ref) || Ref.isMany(ref) )  {
		var $del = $('<span class="ctl-delete">').text('X');
		$del.click(function() {
			SLED.menuShow($obj, ref.name);
			$obj.remove();
		});
		$hdr.append($del);
	}
	$hdr.append($title);
	$hdr.append($menu);
	$obj.append($hdr);
	
	for (var i = 0; i < rule.content.length; i++) {
		var refContent = rule.content[i];
		SLED.renderRefMarker( $obj, refContent );
	}
}
SLED.renderValue = function($obj, ref) {
	var rule = SLED.grammar[ ref.name ];
	 $('<div class="option-value">')
		.text( rule.title )
		.append( $('<input type="text">') )
		.appendTo($obj);
}
SLED.renderMenuRef = function($obj, $menu, ref) {
	var rule = SLED.grammar[ref.name];
	var isList = ref.mult[0] >= 0 && ref.mult[1] > 1;
	var isSingleton = ref.mult[1] == 1;
	
	var clz = "ctl-add";
	if (isSingleton) { clz = "ctl-option"; }

	var $btn = $('<span>')
		.addClass("menu-item")
		.addClass(clz)
		.text(rule.title);
	$btn.click(function() {
		SLED.render( SLED.findElement($menu.parent().parent(), ref.name), ref);
		if (isSingleton) {
			//$btn.removeClass("ctl-option");
			//$btn.addClass("ctl-disabled");
			$btn.hide();
		}
	});
	var isMand = ref.mult[0] > 0;
	if (isMand && isSingleton) { $btn.hide(); }

	$menu.append($btn);
}
SLED.menuShow = function($obj, name) {
	var $p = $obj.parent().parent();
	var $menu = $p.find('.menu');
	var $ref = $menu.find(':contains(' + name + ')');
	$ref.show();
}
SLED.renderRefMarker = function($block, ref) {
	var rule = SLED.grammar[ref.name];
	var isMand = ref.mult[0] > 0;
	var clzMarker = 'element-'+ref.name;
	
	$('<div>').addClass(clzMarker).appendTo($block);

	if (isMand) {
		SLED.render( SLED.findElement($block, ref.name), ref.name);
	}
}
SLED.findElement = function($e, name) {
	var elts = $e.find('.element-'+name + ':first');
	return elts;
}
Ref = {};
Ref.isMany = function(ref) {
	return ref.mult[1] > 1;
}
Ref.isOpt = function(ref) {
	return ref.mult[0] == 0;
}
Ref.toRef = function(refOrName) {
	if (typeof refOrName === 'string') {
		return { name: refOrName, mult: [1,1] };
	}
	return refOrName;
}