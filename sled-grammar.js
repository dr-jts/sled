SLED = {};
SLED.grammar = {};
SLED.grammar.root = {
	title: "StyledLayerDescriptor",
	content: [
		{ name: "NamedLayer",	mult: [0,99], default: true }   // default for now
	]
};
SLED.grammar.NamedLayer = {
	title: "NamedLayer",
	content: [
		{ name: "Name",	mult: [1,1] },
		{ name: "UserStyle", mult: [0,99], default: true  }   // default for now
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
		{ name: "MinScaleDenominator",	mult: [0,1] },
		{ name: "MaxScaleDenominator",	mult: [0,1] },
		{ name: "PointSymbolizer",	mult: [0,99] },
		{ name: "LineSymbolizer",	mult: [0,99] },
		{ name: "PolygonSymbolizer",	mult: [0,99] },
		{ name: "TextSymbolizer",	mult: [0,99] }
	]
};
SLED.grammar.Filter = {
	prefix: "ogc",
	title: "Filter",
	content: [
		{	name: "PropertyIsEqualTo",		mult: [0,1], choiceGroup: "Filter" },
		{	name: "PropertyIsNotEqualTo",	mult: [0,1], choiceGroup: "Filter" },
		{	name: "PropertyIsLessThan",		mult: [0,1], choiceGroup: "Filter" },
		{	name: "PropertyIsLessThanOrEqualTo",	mult: [0,1], choiceGroup: "Filter" },
		{	name: "PropertyIsGreaterThan",	mult: [0,1], choiceGroup: "Filter" },
		{	name: "PropertyIsGreaterThanOrEqualTo",	mult: [0,1], choiceGroup: "Filter" },
		{	name: "PropertyIsBetween",		mult: [0,1 ], choiceGroup: "Filter" },
		{	name: "PropertyIsLike",			mult: [0,1 ], choiceGroup: "Filter" },
		{	name: "PropertyIsNull",			mult: [0,1 ], choiceGroup: "Filter" },
		{	name: "And",					mult: [0,1], choiceGroup: "Filter" },
		{	name: "Or",						mult: [0,1], choiceGroup: "Filter" },
		{	name: "Not",					mult: [0,1], choiceGroup: "Filter" }
	]
};
SLED.grammar.Not = {
	prefix: "ogc",
	title: "Not",
	content: [
		{	name: "PropertyIsEqualTo",		mult: [0,1], choiceGroup: "Not" },
		{	name: "PropertyIsNotEqualTo",	mult: [0,1], choiceGroup: "Not" },
		{	name: "PropertyIsLessThan",		mult: [0,1], choiceGroup: "Not" },
		{	name: "PropertyIsLessThanOrEqualTo",	mult: [0,1], choiceGroup: "Not" },
		{	name: "PropertyIsGreaterThan",	mult: [0,1], choiceGroup: "Not" },
		{	name: "PropertyIsGreaterThanOrEqualTo",	mult: [0,1], choiceGroup: "Not" },
		{	name: "PropertyIsBetween",		mult: [0,1 ], choiceGroup: "Not" },
		{	name: "PropertyIsLike",			mult: [0,1 ], choiceGroup: "Not" },
		{	name: "PropertyIsNull",			mult: [0,1 ], choiceGroup: "Not" },
		{	name: "And",					mult: [0,1], choiceGroup: "Not" },
		{	name: "Or",						mult: [0,1], choiceGroup: "Not" },
		{	name: "Not",					mult: [0,1], choiceGroup: "Not" }
	]
};
SLED.grammar.And = {
	prefix: "ogc",
	title: "And",
	content: [
		{	name: "PropertyIsEqualTo",		mult: [0,99 ] },
		{	name: "PropertyIsNotEqualTo",	mult: [0,99 ] },
		{	name: "PropertyIsLessThan",		mult: [0,99 ] },
		{	name: "PropertyIsLessThanOrEqualTo",	mult: [0,99 ] },
		{	name: "PropertyIsGreaterThan",	mult: [0,99 ] },
		{	name: "PropertyIsGreaterThanOrEqualTo",	mult: [0,99 ] },
		{	name: "PropertyIsBetween",		mult: [0,99 ] },
		{	name: "PropertyIsLike",			mult: [0,99 ] },
		{	name: "PropertyIsNull",			mult: [0,99 ] },
		{	name: "And",					mult: [0,99 ] },
		{	name: "Or",						mult: [0,99 ] },
		{	name: "Not",					mult: [0,99 ] }
	]
};
SLED.grammar.Or = {
	prefix: "ogc",
	title: "Or",
	content: [
		{	name: "PropertyIsEqualTo",		mult: [0,99 ] },
		{	name: "PropertyIsNotEqualTo",	mult: [0,99 ] },
		{	name: "PropertyIsLessThan",		mult: [0,99 ] },
		{	name: "PropertyIsLessThanOrEqualTo",	mult: [0,99 ] },
		{	name: "PropertyIsGreaterThan",	mult: [0,99 ] },
		{	name: "PropertyIsGreaterThanOrEqualTo",	mult: [0,99 ] },
		{	name: "PropertyIsBetween",		mult: [0,99 ] },
		{	name: "PropertyIsLike",			mult: [0,99 ] },
		{	name: "PropertyIsNull",			mult: [0,99 ] },
		{	name: "And",					mult: [0,99 ] },
		{	name: "Or",						mult: [0,99 ] },
		{	name: "Not",					mult: [0,99 ] }
	]
};
SLED.grammar.PropertyIsEqualTo = {
	prefix: "ogc",
	title: "=",
	content: [
		{	name: "matchCase",	mult: [0,1] },
		{	name: "PropertyName",	mult: [1,1] },
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.PropertyIsNotEqualTo = {
	prefix: "ogc",
	title: "!=",
	content: [
		{	name: "matchCase",	mult: [0,1] },
		{	name: "PropertyName",	mult: [1,1] },
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.PropertyIsLessThan = {
	prefix: "ogc",
	title: "<",
	content: [
		{	name: "matchCase",	mult: [0,1] },
		{	name: "PropertyName",	mult: [1,1] },
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.PropertyIsLessThanOrEqualTo = {
	prefix: "ogc",
	title: "<=",
	content: [
		{	name: "matchCase",	mult: [0,1] },
		{	name: "PropertyName",	mult: [1,1] },
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.PropertyIsGreaterThan = {
	prefix: "ogc",
	title: ">",
	content: [
		{	name: "matchCase",	mult: [0,1] },
		{	name: "PropertyName",	mult: [1,1] },
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.PropertyIsGreaterThanOrEqualTo = {
	prefix: "ogc",
	title: ">=",
	content: [
		{	name: "matchCase",	mult: [0,1] },
		{	name: "PropertyName",	mult: [1,1] },
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.PropertyIsLike = {
	prefix: "ogc",
	title: "Like",
	content: [
		{	name: "wildCard",	mult: [1,1] },
		{	name: "singleChar",	mult: [1,1] },
		{	name: "escapeChar",	mult: [1,1] },
		{	name: "PropertyName",	mult: [1,1] },
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.wildCard = {
	attribute: true,
	title: "wildCard",
	size: 1,
	val: "*"
};
SLED.grammar.singleChar = {
	attribute: true,
	title: "singleChar",
	size: 1,
	val: "%"
};
SLED.grammar.escapeChar = {
	attribute: true,
	title: "escapeChar",
	size: 1,
	val: "!"
};
SLED.grammar.PropertyIsNull = {
	prefix: "ogc",
	title: "Null",
	content: [
		{	name: "PropertyName",	mult: [1,1] }
	]
};
SLED.grammar.PropertyIsBetween = {
	prefix: "ogc",
	title: "Between",
	content: [
		{	name: "PropertyName",	mult: [1,1] },
		{	name: "LowerBoundary",	mult: [1,1] },
		{	name: "UpperBoundary",	mult: [1,1] }
	]
};
SLED.grammar.LowerBoundary = {
	prefix: "ogc",
	title: "LowerBoundary",
	content: [
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.UpperBoundary = {
	prefix: "ogc",
	title: "UpperBoundary",
	content: [
		{	name: "Literal",	mult: [1,1] }
	]
};
SLED.grammar.matchCase = {
	attribute: true,
	title: "matchCase",
	val: "true"
};
SLED.grammar.PropertyName = {
	prefix: "ogc",
	title: "PropertyName"
};
SLED.grammar.Literal = {
	prefix: "ogc",
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
		{	name: "ExternalGraphic",	mult: [0,1], choiceGroup: "Graphic_External_Mark" },
		{	name: "Mark",				mult: [0,1], choiceGroup: "Graphic_External_Mark" },
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
		{	name: "GraphicFill",	mult: [0,1], choiceGroup: "Stroke_Graphic" },
		{	name: "GraphicStroke",	mult: [0,1], choiceGroup: "Stroke_Graphic" },
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
SLED.grammar.Halo = {
	title: "Halo",
	content: [
		{	name: "Radius",	mult: [0,1] },
		{	name: "HaloFill",	mult: [0,1] }
	]
};
SLED.grammar.HaloFill = {
	tag: "Fill",
	title: "Fill",
	content: [
		{	name: "FillColor",		mult: [0,1] },
		{	name: "FillOpacity",	mult: [0,1] }
	]
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
		{	name: "PointPlacement",	mult: [0,1], choiceGroup: "Point_Line_Placement"  },
		{	name: "LinePlacement",	mult: [0,1], choiceGroup: "Point_Line_Placement"  }
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
SLED.grammar.Radius = {
	title: "Radius",
	val: "1"
};
SLED.grammar.Rotation = {
	title: "Rotation",
	val: "0"
};
SLED.grammar.MinScaleDenominator = {
	title: "MinScale",
	datatype: "number",
	val: "0",
	size: 7
};
SLED.grammar.MaxScaleDenominator = {
	title: "MaxScale",
	datatype: "number",
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
	datatype: "color",
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
	datatype: "color",
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

