SLED.render = function($parent, refOrName) {
	SLED.docChanged();
	// convert rule name to ref
	var ref = Ref.toRef(refOrName);
	var rule = SLED.grammar[ ref.name ];
	
	var isBlock = rule.content;
	var clzLayout = isBlock ? "type-block" : "type-value";
	var $obj = $('<div>')
		.addClass(clzLayout)
		.attr('rule-name', ref.name);
		
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
	$hdr.append( SLED.renderDelete($obj, ref, rule ));
	$hdr.append($title);
	$hdr.append($menu);
	$obj.append($hdr);
	
	//render content markers in order
	for (var i = 0; i < rule.content.length; i++) {
		var refContent = rule.content[i];
		SLED.renderMarker( $obj, refContent );
	}
}
SLED.renderDelete = function($obj, ref, rule) {
	var $del = null;
	if ( Ref.isOpt(ref) || Ref.isMany(ref) )  {
		$del = $('<span class="ctl-delete">').text('x');
		$del.click(function() {
			SLED.docChanged();
			SLED.menuShow($obj, rule.title );
			$obj.remove();
		});
	}
	return $del;
}
SLED.renderValue = function($obj, ref) {
	var rule = SLED.grammar[ ref.name ];
	$item = $('<div class="option-value">')
		.append( SLED.renderDelete($obj, ref, rule) )
		.append( $('<span class="value-title">').text( rule.title ) )
		.appendTo($obj);
		
	var $input = $('<input type="text" class="value-val">').appendTo($item).focus(); 
	$input.bind('keyup', SLED.docChanged );

	if (rule.val) {
		$input.val(rule.val);
	}
	if (rule.size) {
		$input.attr('size', rule.size);
	}
	if (rule.type && rule.type == 'color') {
		var $clrInput = $('<input type="color">')
			.appendTo($item);
		var $clr = $('<div class="color-swatch">')
			.css('background-color', rule.val)
			.appendTo($item);
		$input.bind('keyup change', function() {
			SLED.docChanged();
			var clr = $input.val();
			if (clr.length == 6) {
				$clr.css('background-color', clr);
				$clr.removeClass('color-error');
				$clrInput.val('#'+clr);
			}
			else {
				$clr.css('background-color', '');
				$clr.addClass('color-error');
			}
		});
		$clrInput.bind('change', function() {
			SLED.docChanged();
			var clr = $clrInput.val();
			$input.val(clr.substr(1));
			$clr.css('background-color', clr);
			$clr.removeClass('color-error');
		});
	}
}
SLED.renderMenuRef = function($obj, $menu, ref) {
	var rule = SLED.grammar[ref.name];
	if (! rule) {
		console.log('Missing rule: ' + ref.name);
	}
	var isList = ref.mult[0] >= 0 && ref.mult[1] > 1;
	var isSingleton = ref.mult[1] == 1;
	
	var clz = "ctl-add";
	var title = rule.title + '*';
	if (isSingleton) { 
		clz = "ctl-option"; 
		title = rule.title;
	}
	
	var $btn = $('<span>')
		.addClass("menu-item")
		.addClass(clz)
		.text(title);
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
SLED.renderMarker = function($block, ref) {
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
SLED.expandVal = function(val, rule) {
	if (rule.type) {
		if (rule.type == 'color') {
			return val.startsWith('#') ? val : '#' + val;
		}
		if (rule.type == 'number') {
			// strip commas
			return val.replace(/,/g, "");
		}
	}
	return val;
}

SLED.docChanged = function() {
	$('#doc').addClass('doc-stale');
	clearTimeout( SLED.timeout );
	SLED.timeout = setTimeout(SLED.regen, 500);
}
//==============================================================================

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

//==============================================================================

SLED.INDENT = '  ';
SLED.regen = function() {
	SLED.generate( $('#gui'), $('#doc') );
}

SLED.generate = function($gui, $doc) {
	$doc.empty();
	$('#doc').removeClass('doc-stale');
	
	var $t = $('<table>').appendTo($doc);
	var lineNum = 1;
	
	line('<?xml version="1.0" encoding="ISO-8859-1"?>');
	line('<StyledLayerDescriptor version="1.0.0"')
	line('  xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"')
	line('  xmlns="http://www.opengis.net/sld" ')
	line('  xmlns:ogc="http://www.opengis.net/ogc" ')
	line('  xmlns:xlink="http://www.w3.org/1999/xlink" ')
	line('  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">')
	
	$sld = $gui.find('[rule-name]:first');
	gen($sld, 0);
	
	line('</StyledLayerDescriptor>')
	
	function line(txt, indent) {
		var indentText = ' '.repeat(indent);
		$('<tr>').appendTo($t)
			.append( $('<td class="doc-linenum">').text( lineNum++ ) )
			.append( $('<td class="doc-line">').text( indentText + txt ) );
	}
	function gen($parent, indent) {
		indent = indent + 1;
		var indentText = ' '.repeat(indent);
		var $contents = $parent.children();
		$contents.each(function(i, e) {
			var $e = $(e);
			var ruleName = $e.attr('rule-name');
			if (! ruleName) {
				gen($e, indent);
			} 
			else {
				if ($e.hasClass('type-block')) {
					genBlock($e, ruleName, indent, indentText)
				}
				else { 
					genVal($e, ruleName, indentText);
				}
			}
		})
	}
	function genBlock($e, ruleName, indent, indentText) {
		var rule = SLED.grammar[ ruleName ];
		var tag = rule.tag ? rule.tag : ruleName;
		var pref = rule.prefix ? rule.prefix+":" : "";
		line(indentText + '<' + pref + tag + '>');
		gen($e, indent);
		line(indentText + '</' + pref + tag + '>');		
	}
	function genVal($e, ruleName, indentText) {
		var rule = SLED.grammar[ ruleName ];
		var val = formVal($e, rule);
		
		var fGenVal = genValElement;
		if (rule.css) fGenVal = genValCSS;
		if (rule.template) fGenVal = genValTemplate;
		
		var txt = fGenVal(val, ruleName, rule);
		line(indentText + txt);
	}
	function genValElement(val, ruleName, rule) {
		var pref = rule.prefix ? rule.prefix+":" : "";
		var tag = rule.tag ? rule.tag : ruleName;
		return '<' + pref + tag + '>' 
				+ val 
				+ '</' + pref + tag + '>';
	}
	function genValCSS(val, sldName, rule) {
		return '<CssParameter name="' + rule.css + '">'
				+ val 
				+ '</CssParameter>';
	}
	function genValTemplate(val, sldName, rule) {
		var template = rule.template;
		var txt = template.replace('$val', val);
		return txt;
	}
	function formVal($e, rule) {
		var input = $e.find('.value-val');
		var val = $(input).val();
		if (val.length <= 0) return;
		
		val = SLED.expandVal(val, rule);
		return val;
	}
	function htmlEscape(str) {
		return str
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}
}
