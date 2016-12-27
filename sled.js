SLED.render = function($parent, name) {
	var rule = SLED.grammar[ name ];
	var isBlock = rule.content;
	var clzLayout = isBlock ? "type-block" : "type-value";
	var $obj = $('<div>')
		.addClass(clzLayout);
		
	var clzDepth = 'depth-even';
	if ($parent.hasClass('depth-even')) {
		clzDepth = 'depth-odd';
	} 
	$obj.addClass(clzDepth);
	$parent.append($obj);	
	
	if (isBlock) {
		SLED.renderBlock($obj, rule);
	}
	else {
		SLED.renderValue($obj, rule);
	}
	
}
SLED.renderBlock = function($obj, rule) {
	var $hdr = $obj.append( $('<div class="block-name">').text( rule.title ) );
	var $menu = $('<div class="menu">');
	// contents
	for (var i = 0; i < rule.content.length; i++) {
		var ref = rule.content[i];
		SLED.renderRefMenu($menu, ref);
	}
	$hdr.append($menu);
	
	for (var i = 0; i < rule.content.length; i++) {
		var ref = rule.content[i];
		SLED.renderRefMarker($obj, ref);
	}
}
SLED.renderValue = function($obj, rule) {
	$obj.append( $('<div class="option-value">').text( rule.title ) );
}
SLED.renderRefMenu = function($obj, ref) {
	var rule = SLED.grammar[ref.name];
	var isList = ref.mult[0] >= 0 && ref.mult[1] > 1;
	var isMand = ref.mult[0] > 0;
	var isOptional = ref.mult[0] == 0 && ref.mult[1] == 1;
	
	/*
	if (isMand) {
		SLED.render( $obj, ref.name);
	}
	*/
	if (isList) {
		var $btn = $('<span class="ctl-add">').text(rule.title);
		$btn.click(function() {
			SLED.render( SLED.findElement($obj.parent(), ref.name), ref.name);
		});
		$obj.append($btn);
	}
	else if (isOptional) {
		var $ctl = $('<span class="option-value">').text(rule.title);
		$obj.append($ctl);		
	}
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
	return $e.find('.element-'+name);
}