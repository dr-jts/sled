SLED = {};
SLED.grammar = {};
SLED.grammar.root = {
	title: "SLD",
	content: [
		{ name: "FeatureTypeStyle",	mult: [0,99] }
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
		{ name: "MinScale",	mult: [0,1] },
		{ name: "MaxScale",	mult: [0,1] },
		{ name: "PointSymbolizer",	mult: [0,99] },
		{ name: "LineSymbolizer",	mult: [0,99] },
		{ name: "PolygonSymbolizer",	mult: [0,99] }
	]
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
		{	name: "FillColor",	mult: [0,1] }
	]
};
SLED.grammar.Stroke = {
	title: "Stroke",
	content: [
		{	name: "StrokeColor",	mult: [0,1] },
		{	name: "Width",	mult: [0,1] },
		{	name: "StrokeOpacity",	mult: [0,1] },
		{	name: "LineJoin",	mult: [0,1] },
		{	name: "LineCap",	mult: [0,1] },
		{	name: "DashArray",	mult: [0,1] },
		{	name: "DashOffset",	mult: [0,1] }
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
	val: "http://"
	
};
SLED.grammar.Format = {
	title: "Format",
};
SLED.grammar.WellKnownName = {
	title: "WellKnownName",
	val: "circle",
	size: 30
};
SLED.grammar.Opacity = {
	title: "Opacity",
};
SLED.grammar.Size = {
	title: "Size",
};
SLED.grammar.Rotation = {
	title: "Rotation",
};
SLED.grammar.MinScale = {
	title: "MinScale",
	val: "",
	size: 7
};
SLED.grammar.MaxScale = {
	title: "MaxScale",
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
	val: "#000000",
	size: 7
};
SLED.grammar.StrokeColor = {
	title: "color",
	val: "#000000",
	size: 7
};
SLED.grammar.Width = {
	title: "width"
};
SLED.grammar.StrokeOpacity = {
	title: "opacity",
	val: "1",
	size: 5
};
SLED.grammar.LineJoin = {
	title: "linejoin"
};
SLED.grammar.LineCap = {
	title: "linecap"
};
SLED.grammar.DashArray = {
	title: "dasharray"
};
SLED.grammar.DashOffset = {
	title: "dashoffset"
};
SLED.grammar.PerpendicularOffset = {
	title: "PerpendicularOffset"
};
