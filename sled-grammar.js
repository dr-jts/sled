SLED = {};
SLED.grammar = {};
SLED.grammar.root = {
	title: "StyledLayerDescriptor",
	content: [
		{ name: "NamedLayer",	mult: [0,99] }
	]
};
SLED.grammar.NamedLayer = {
	title: "NamedLayer",
	content: [
		{ name: "Name",	mult: [1,1] },
		{ name: "UserStyle",	mult: [0,99] }
	]
};
SLED.grammar.UserStyle = {
	title: "UserStyle",
	content: [
		{ name: "Name",	mult: [0,1] },
		{ name: "Title",	mult: [0,1] },
		{ name: "Abstract",	mult: [0,1] },
		{ name: "FeatureTypeStyle",	mult: [1,99] }
	]
};
SLED.grammar.FeatureTypeStyle = {
	title: "FeatureTypeStyle",
	content: [
		{ name: "Name",	mult: [0,1] },
		{ name: "Title",	mult: [0,1] },
		{ name: "Abstract",	mult: [0,1] },
		{ name: "Rule",	mult: [1,99] }
	]
};
SLED.grammar.Rule = {
	title: "Rule",
	content: [ 
		{ name: "Name",	mult: [0,1] },
		{ name: "Title",	mult: [0,1] },
		{ name: "Abstract",	mult: [0,1] },
		{ name: "Filter",	mult: [0,1] },
		{ name: "MinScale",	mult: [0,1] },
		{ name: "MaxScale",	mult: [0,1] },
		{ name: "PointSymbolizer",	mult: [0,99] },
		{ name: "LineSymbolizer",	mult: [0,99] },
		{ name: "PolygonSymbolizer",	mult: [0,99] },
		{ name: "TextSymbolizer",	mult: [0,99] }
	]
};
SLED.grammar.Filter = {
	title: "Filter",
	content: [
		{	name: "And",	mult: [0,1] },
		{	name: "PropertyIsLessThan",	mult: [0,1] },
		{	name: "PropertyIsLessThanOrEqualTo",	mult: [0,1] },
		{	name: "PropertyIsGreaterThan",	mult: [0,1] },
		{	name: "PropertyIsGreaterThanOrEqualTo",	mult: [0,1] }
	]
};
SLED.grammar.And = {
	title: "And",
	content: [
		{	name: "PropertyIsLessThan",	mult: [0,1] },
		{	name: "PropertyIsLessThanOrEqualTo",	mult: [0,1] },
		{	name: "PropertyIsGreaterThan",	mult: [0,1] },
		{	name: "PropertyIsGreaterThanOrEqualTo",	mult: [0,1] }
	]
};
SLED.grammar.PropertyIsLessThan = {
	title: "<",
	content: [
		{	name: "PropertyName",	mult: [1,1] },
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.PropertyIsLessThanOrEqualTo = {
	title: "<=",
	content: [
		{	name: "PropertyName",	mult: [1,1] },
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.PropertyIsGreaterThan = {
	title: ">",
	content: [
		{	name: "PropertyName",	mult: [1,1] },
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.PropertyIsGreaterThanOrEqualTo = {
	title: ">=",
	content: [
		{	name: "PropertyName",	mult: [1,1] },
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.PropertyName = {
	title: "PropertyName"
};
SLED.grammar.Literal = {
	title: "Literal"
};
SLED.grammar.PointSymbolizer = {
	title: "Point",
	content: [
		{	name: "Graphic",	mult: [0,1] }
	]
};
SLED.grammar.LineSymbolizer = {
	title: "Line",
	content: [
		{	name: "Stroke",	mult: [1,1] },
		{	name: "PerpendicularOffset",	mult: [0,1] }
	]
};
SLED.grammar.PolygonSymbolizer = {
	title: "Polygon",
	content: [
		{	name: "Fill",	mult: [0,1] },
		{	name: "Stroke",	mult: [0,1] }
	]
};
SLED.grammar.TextSymbolizer = {
	title: "Text",
	content: [
		{	name: "Label",	mult: [0,1] },
		{	name: "Font",	mult: [0,1] },
		{	name: "LabelPlacement",	mult: [0,1] },
		{	name: "Halo",	mult: [0,1] },
		{	name: "Fill",	mult: [0,1] },
		{	name: "Graphic",	mult: [0,1] },
		{	name: "Priority",	mult: [0,1] }
	]
};
SLED.grammar.Graphic = {
	title: "Graphic",
	content: [
		{	name: "ExternalGraphic",	mult: [0,1] },
		{	name: "Mark",		mult: [0,1] },
		{	name: "Opacity",	mult: [0,1] },
		{	name: "Size",		mult: [0,1] },
		{	name: "Rotation",	mult: [0,1] }
	]
};
SLED.grammar.Fill = {
	title: "Fill",
	content: [
		{	name: "GraphicFill",	mult: [0,1] },
		{	name: "FillColor",		mult: [0,1] },
		{	name: "FillOpacity",	mult: [0,1] }
	]
};
SLED.grammar.GraphicFill = {
	title: "GraphicFill",
	content: [
		{	name: "Graphic",	mult: [1,1] }
	]
};
SLED.grammar.Stroke = {
	title: "Stroke",
	content: [
		{	name: "GraphicFill",	mult: [0,1] },
		{	name: "GraphicStroke",	mult: [0,1] },
		{	name: "StrokeColor",	mult: [0,1] },
		{	name: "Width",	mult: [0,1] },
		{	name: "StrokeOpacity",	mult: [0,1] },
		{	name: "LineJoin",	mult: [0,1] },
		{	name: "LineCap",	mult: [0,1] },
		{	name: "DashArray",	mult: [0,1] },
		{	name: "DashOffset",	mult: [0,1] }
	]
};
SLED.grammar.GraphicStroke = {
	title: "GraphicStroke",
	content: [
		{	name: "Graphic",	mult: [1,1] }
	]
};
SLED.grammar.ExternalGraphic = {
	title: "ExternalGraphic",
	content: [
		{	name: "OnlineResource",	mult: [1,1] },
		{	name: "Format",	mult: [1,1] }
	]
};
SLED.grammar.Mark = {
	title: "Mark",
	content: [
		{	name: "WellKnownName",	mult: [1,1] },
		{	name: "Fill",	mult: [0,1] },
		{	name: "Stroke",	mult: [0,1] }
	]
};
SLED.grammar.OnlineResource = {
	title: "OnlineResource",
	template: '<OnlineResource  xlink:type="simple" xlink:href="$val" />',
	val: "http://"
	
};
SLED.grammar.Format = {
	title: "Format",
	val: "image/png"
};
SLED.grammar.WellKnownName = {
	title: "WellKnownName",
	val: "circle",
	size: 30
};
SLED.grammar.Label = {
	title: "Label",
	content: [
		{	name: "PropertyName",	mult: [0,1] }
	]
};
SLED.grammar.LabelPlacement = {
	title: "LabelPlacement",
	content: [
		{	name: "PointPlacement",	mult: [0,1] },
		{	name: "LinePlacement",	mult: [0,1] }
	]
};
SLED.grammar.PointPlacement = {
	title: "PointPlacement",
	content: [
		{	name: "AnchorPoint",	mult: [0,1] },
		{	name: "Displacement",	mult: [0,1] },
		{	name: "Rotation",	mult: [0,1] }
	]
};
SLED.grammar.AnchorPoint = {
	title: "AnchorPoint",
	content: [
		{	name: "AnchorPointX",	mult: [1,1] },
		{	name: "AnchorPointY",	mult: [1,1] }
	]
};
SLED.grammar.Displacement = {
	title: "Displacement",
	content: [
		{	name: "DisplacementX",	mult: [1,1] },
		{	name: "DisplacementY",	mult: [1,1] }
	]
};

SLED.grammar.LinePlacement = {
	title: "LinePlacement",
	content: [
		{	name: "PerpendicularOffset",	mult: [1,1] }
	]
};

SLED.grammar.Font = {
	title: "Font",
	content: [
		{	name: "FontFamily",	mult: [0,1] },
		{	name: "FontStyle",	mult: [0,1] },
		{	name: "FontWeight",	mult: [0,1] },
		{	name: "FontSize",	mult: [0,1] }
	]
};

SLED.grammar.AnchorPointX = {
	title: "AnchorPointX",
	val: ".5",
	size: 5
};
SLED.grammar.AnchorPointY = {
	title: "AnchorPointY",
	val: ".5",
	size: 5
};
SLED.grammar.DisplacementX = {
	title: "DisplacementX",
	val: "0",
	size: 5
};
SLED.grammar.DisplacementY = {
	title: "DisplacementY",
	val: "0",
	size: 5
};
SLED.grammar.Halo = {
	title: "Halo",
	val: "1"
};
SLED.grammar.Priority = {
	title: "Priority",
	val: "1000"
};
SLED.grammar.FontFamily = {
	title: "family",
	css: "font-family",
	val: "Arial"
};
SLED.grammar.FontStyle = {
	title: "style",
	css: "font-style",
	val: "italic"
};
SLED.grammar.FontWeight = {
	title: "weight",
	css: "font-weight",
	val: "bold"
};
SLED.grammar.FontSize = {
	title: "size",
	css: "font-size",
	val: "10"
};
SLED.grammar.Opacity = {
	title: "Opacity",
	val: "1",
	size: 4
};
SLED.grammar.Size = {
	title: "Size",
	val: "10"
};
SLED.grammar.Rotation = {
	title: "Rotation",
	val: "0"
};
SLED.grammar.MinScale = {
	title: "MinScale",
	type: "number",
	val: "0",
	size: 7
};
SLED.grammar.MaxScale = {
	title: "MaxScale",
	type: "number",
	val: "10,000,000",
	size: 7
};
SLED.grammar.Name = {
	title: "Name"
};
SLED.grammar.Title = {
	title: "Title"
};
SLED.grammar.Abstract = {
	title: "Abstract"
};
SLED.grammar.FillColor = {
	title: "color",
	type: "color",
	css: "fill",
	val: "000000",
	size: 4
};
SLED.grammar.FillOpacity = {
	title: "opacity",
	css: "fill-opacity",
	val: "1",
	size: 2
};
SLED.grammar.StrokeColor = {
	title: "color",
	type: "color",
	css: "stroke",
	val: "000000",
	size: 4
};
SLED.grammar.Width = {
	title: "width",
	css: "stroke-width",
	size: 2,
	val: "1"
};
SLED.grammar.StrokeOpacity = {
	title: "opacity",
	css: "stroke-opacity",
	size: 2,
	val: "1"
};
SLED.grammar.LineJoin = {
	title: "linejoin",
	css: "stroke-linejoin",
	size: 6,
	val: "round"
};
SLED.grammar.LineCap = {
	title: "linecap",
	css: "stroke-linecap",
	size: 6,
	val: "round"
};
SLED.grammar.DashArray = {
	title: "dasharray",
	css: "stroke-dasharray",
	size: 6,
	val: "5 2"
};
SLED.grammar.DashOffset = {
	title: "dashoffset",
	css: "stroke-dashoffset",
	size: 6,
	val: "0"
};
SLED.grammar.PerpendicularOffset = {
	title: "PerpendicularOffset",
	size: 2,
	val: "1"
};
SLED.grammar.PropertyName = {
	title: "PropertyName"
};
