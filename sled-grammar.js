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
	title: "PointSymbolizer",
	content: [
		{	name: "stuff",	mult: [0,1] }
	]
};
SLED.grammar.LineSymbolizer = {
	title: "LineSymbolizer",
	content: [
		{	name: "Stroke",	mult: [1,1] },
		{	name: "PerpendicularOffset",	mult: [0,1] }
	]
};
SLED.grammar.PolygonSymbolizer = {
	title: "PolygonSymbolizer",
	content: [
		{	name: "Fill",	mult: [0,1] },
		{	name: "Stroke",	mult: [0,1] }
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
		{	name: "Opacity",	mult: [0,1] },
		{	name: "LineJoin",	mult: [0,1] },
		{	name: "LineCap",	mult: [0,1] },
		{	name: "DashArray",	mult: [0,1] },
		{	name: "DashOffset",	mult: [0,1] }
	]
};
SLED.grammar.stuff = {
	title: "stuff",
};
SLED.grammar.MinScale = {
	title: "MinScale"
};
SLED.grammar.MaxScale = {
	title: "MaxScale"
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
	title: "fill"
};
SLED.grammar.StrokeColor = {
	title: "stroke"
};
SLED.grammar.Width = {
	title: "Width"
};
SLED.grammar.Opacity = {
	title: "Opacity"
};
SLED.grammar.LineJoin = {
	title: "LineJoin"
};
SLED.grammar.LineCap = {
	title: "LineCap"
};
SLED.grammar.DashArray = {
	title: "DashArray"
};
SLED.grammar.DashOffset = {
	title: "dash-offset"
};
SLED.grammar.PerpendicularOffset = {
	title: "PerpendicularOffset"
};
