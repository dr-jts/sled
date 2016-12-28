SLED.render = function($parent, refOrName) {
	// convert rule name to ref
	var ref = Ref.toRef(refOrName);
	var rule = SLED.grammar[ ref.name ];
	
	var isBlock = rule.content;
	var clzLayout = isBlock ? "type-block" : "type-value";
	var $obj = $('<div>')
		.addClass(clzLayout)
		.attr('sld-name', ref.name);
		
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
	$hdr.append( SLED.renderDelete($obj, ref));
	$hdr.append($title);
	$hdr.append($menu);
	$obj.append($hdr);
	
	for (var i = 0; i < rule.content.length; i++) {
		var refContent = rule.content[i];
		SLED.renderRefMarker( $obj, refContent );
	}
}
SLED.renderDelete = function($obj, ref) {
	var $del = null;
	if ( Ref.isOpt(ref) || Ref.isMany(ref) )  {
		$del = $('<span class="ctl-delete">').text('x');
		$del.click(function() {
			SLED.menuShow($obj, ref.name);
			$obj.remove();
		});
	}
	return $del;
}
SLED.renderValue = function($obj, ref) {
	var rule = SLED.grammar[ ref.name ];
	$item = $('<div class="option-value">')
		.append( SLED.renderDelete($obj, ref) )
		.append( $('<span class="value-title">').text( rule.title ) )
		.appendTo($obj);
		
	$('<input type="text" class="value-val">').appendTo($item).focus(); 
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
SLED.INDENT = '  ';
SLED.generate = function($gui, $doc) {
	$doc.empty();
	$('<p>').text('<SLD>').appendTo($doc);
	
	$sld = $gui.find('[sld-name]:first');
	gen($sld, 0);
	
	$('<p>').text('</SLD>').appendTo($doc);
	
	function gen($parent, indent) {
		indent = indent + 1;
		var indTxt = '&nbsp;'.repeat(indent);
		var $contents = $parent.children();
		$contents.each(function(i, e) {
			var $e = $(e);
			var name = $e.attr('sld-name');
			if (! name) {
				gen($e, indent);
			} 
			else {
				if ($e.hasClass('type-block')) {
					$('<p>')
						.append(indTxt)
						.append('&lt;'+name+'&gt;')
						.appendTo($doc);
					gen($e, indent);
					$('<p>')
						.append(indTxt)
						.append('&lt;/'+name+'&gt;')
						.appendTo($doc);
				}
				else {
					var input = $e.find('.value-val');
					var val = $(input).val();
					if (val.length <= 0) return;
					var txt = '&lt;'+name+'&gt;' + val + '&lt;/'+name+'&gt;';
					$('<p>')
						.append(indTxt)
						.append(txt)
						.appendTo($doc);
				}
			}
		})
	}
}