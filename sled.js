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

	var $hdr = $('<div class="block-header">');
	var $title = $('<span class="block-name">').text( rule.title );
	$hdr.append( SLED.renderDelete($obj, ref, rule ));
	$hdr.append($title);
	
	var $menu = $('<div class="menu">');
	// contents
	var currChoiceGroup = null;
	for (var i = 0; i < rule.content.length; i++) {
		var refContent = rule.content[i];
		if (currChoiceGroup && currChoiceGroup != refContent.choiceGroup) {
			/*$('<span>').text(")").attr('menu-tag', currChoiceGroup )
				.appendTo($menu);*/
			currChoiceGroup = null;		
		}
		if (currChoiceGroup && currChoiceGroup == refContent.choiceGroup) {
			$('<span>').text("|").attr('menu-tag', refContent.choiceGroup)
				.appendTo($menu);
		}
		if (refContent.choiceGroup && ! currChoiceGroup) {
			/*$('<span>').text("(").attr('menu-tag', refContent.choiceGroup)
				.appendTo($menu);*/
			currChoiceGroup = refContent.choiceGroup;		
		}
		SLED.renderMenuRef($obj, $menu, refContent);
	}
	$hdr.append($menu);
	$obj.append($hdr);
	
	//render content markers in order
	for (var i = 0; i < rule.content.length; i++) {
		var refContent = rule.content[i];
		SLED.renderMarker( $obj, refContent );
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
	
	var menuTag = ref.choiceGroup ? ref.choiceGroup : title;
	var $btn = $('<span>')
		.addClass("menu-item")
		.addClass(clz)
		.attr('menu-tag', menuTag)
		.text(title);
	$btn.click(function() {
		if (isSingleton) {
			$btn.hide();
		}
		if (ref.choiceGroup) {
			$menu.find('[menu-tag="' + ref.choiceGroup + '"]').hide();
		}
		SLED.render( SLED.findElement($menu.parent().parent(), ref.name), ref);
	});
	var isMand = ref.mult[0] > 0;
	if (isMand && isSingleton) { $btn.hide(); }

	$menu.append($btn);
}
SLED.renderDelete = function($obj, ref, rule) {
	var $del = null;
 
	if ( Ref.isOpt(ref) || Ref.isMany(ref) )  {
		var menuTag = ref.choiceGroup ? ref.choiceGroup : rule.title;
		$del = $('<span class="ctl-delete">').text('x');
		$del.click(function() {
			SLED.docChanged();
			SLED.menuShow($obj, menuTag );
			$obj.remove();
		});
	}
	return $del;
}
SLED.menuShow = function($obj, name) {
	var $p = $obj.parent().parent();
	var $menu = $p.find('.menu');
	$menu.find('[menu-tag="' + name + '"]').show();
}
SLED.renderValue = function($obj, ref) {
	var rule = SLED.grammar[ ref.name ];
	$obj.append( SLED.renderDelete($obj, ref, rule) );
	$obj.append( $('<span class="value-title">').text( rule.title ) );
		
	var $input = $('<input type="text" class="value-val">').appendTo($obj).focus();
	$input.bind('keyup', SLED.docChanged );

	if (rule.val) {
		$input.val(rule.val);
	}
	if (rule.size) {
		$input.attr('size', rule.size);
	}
	if (rule.type == 'color') {
		SLED.renderColor($obj, $input);
	}
}
SLED.renderColor = function($obj, $input) {
	var $clrInput = $('<input type="color">')
		.appendTo($obj);
	var $clr = $('<div class="color-swatch">')
		.css('background-color', $input.val() )
		.appendTo($obj);
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
SLED.renderMarker = function($block, ref) {
	var rule = SLED.grammar[ref.name];
	var isMand = ref.mult[0] > 0;
	var clzMarker = 'element-'+ref.name;
	
	$('<div>').addClass(clzMarker).appendTo($block);

	if (Ref.isMand(ref) || Ref.isDefault(ref)) {
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
			return val.startsWith('#') ? val.toUpperCase() : '#' + val.toUpperCase();
		}
		if (rule.type == 'number') {
			// strip commas
			return val.replace(/,/g, "");
		}
	}
	return val;
}
SLED.GEN_DELAY = 500;
SLED.docChanged = function() {
	$('#doc').addClass('doc-stale');
	clearTimeout( SLED.timeout );
	SLED.timeout = setTimeout(SLED.regen, SLED.GEN_DELAY);
}
//==============================================================================

Ref = {};
Ref.isMany = function(ref) {
	return ref.mult[1] > 1;
}
Ref.isMand = function(ref) {
	return ref.mult[0] > 0;
}
Ref.isDefault = function(ref) {
	return ref.default;
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
	
	var $tbl = $('<table>').appendTo($doc);
	var lineNum = 1;
	
	line('<?xml version="1.0" encoding="ISO-8859-1"?>');
	line('<StyledLayerDescriptor version="1.0.0"')
	line('  xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"')
	line('  xmlns="http://www.opengis.net/sld" ')
	line('  xmlns:ogc="http://www.opengis.net/ogc" ')
	line('  xmlns:xlink="http://www.w3.org/1999/xlink" ')
	line('  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">')
	
	$sld = $gui.find('[rule-name]:first');
	scanRule($sld, null, 0);
	
	line('</StyledLayerDescriptor>')
	
	function line(txt, indent) {
		var indentText = ' '.repeat(indent);
		var $tr = $('<tr>').appendTo($tbl);
		//$('<td class="doc-linenum">').text( lineNum++ ).appendTo($tr);
		$('<td class="doc-linenum">').attr( 'linenum', lineNum++ ).appendTo($tr);
		var $tdText = $('<td class="doc-line">').text( indentText + txt ).appendTo($tr);
		return $tdText;
	}
	function scanRule($parent, $tdStartTag, indent) {
		indent = indent + 1;
		$parent.children().each(function(i, ch) {
			var $ch = $(ch);
			var ruleName = $ch.attr('rule-name');
			if (ruleName) {
				genRule($ch, ruleName, $tdStartTag, indent);
			}
			else {
				// recurse down to next rule container element
				scanRule($ch, $tdStartTag, indent);
			} 
		})
	}
	function genRule($e, ruleName, $tdStartTag, indent) {
		if ($e.hasClass('type-block')) {
			genBlock($e, ruleName, indent)
		}
		else { 
			genVal($e, ruleName, $tdStartTag, indent);
		}
	}
	function genBlock($e, ruleName, indent) {
		var rule = SLED.grammar[ ruleName ];
		var tag = rule.tag ? rule.tag : ruleName;
		var pref = rule.prefix ? rule.prefix+":" : "";
		var $tdStartTag = line('<' + pref + tag + '>', indent);
		scanRule($e, $tdStartTag, indent);
		line('</' + pref + tag + '>', indent);		
	}
	function genVal($e, ruleName, $tdStartTag, indent) {
		var rule = SLED.grammar[ ruleName ];
		var val = formVal($e, rule);
		var isEmpty = ! val || val.length == 0;
		
		// don't skip empty values - if they are in GUI should appear in doc
		//if (! rule.allowEmpty && isEmpty) return;
		
		// ensure value is blank if empty
		if (isEmpty) val = '';
		
		// testing
		//$tdStartTag.text( $tdStartTag.text()+ruleName );
		
		var fGenVal = genValElement;
		if (rule.css) fGenVal = genValCSS;
		if (rule.template) fGenVal = genValTemplate;
		if (rule.attribute) fGenVal = genValAttribute;
		
		var txtVal = fGenVal(val, ruleName, rule);
		if (rule.attribute) {
			var tag = $tdStartTag.text();
			var pref = tag.substring(0, tag.length-1);
			var newtag = pref + " " + txtVal + '>';
			$tdStartTag.text( newtag );
		}
		else {
		line(txtVal, indent);
		}
	}
	function genValElement(val, ruleName, rule) {
		var pref = rule.prefix ? rule.prefix+":" : "";
		var tag = rule.tag ? rule.tag : ruleName;
		return '<' + pref + tag + '>' 
				+ val 
				+ '</' + pref + tag + '>';
	}
	function genValAttribute(val, ruleName, rule) {
		var tag = rule.tag ? rule.tag : ruleName;
		return tag + '="' + val + '"';
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
	/*
	function htmlEscape(str) {
		return str
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}
	*/
}
