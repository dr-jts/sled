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
		{	name: "Name",	mult: [0,1] },
		{	name: "Title",	mult: [0,1] },
		{	name: "Abstract",	mult: [0,1] },
		{	name: "Rule",	mult: [1,99] }
	]
};
SLED.grammar.Rule = {
	title: "Rule",
	content: [ 
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
		{	name: "Color",	mult: [0,1] }
	]
};
SLED.grammar.Stroke = {
	title: "Stroke",
	content: [
		{	name: "Color",	mult: [0,1] }
	]
};
SLED.grammar.stuff = {
	title: "stuff",
};
SLED.grammar.MinScale = {
	title: "MinScale"
};
SLED.grammar.MaxScale = {
	title: "MinScale"
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
SLED.grammar.Color = {
	title: "Color"
};
SLED.grammar.PerpendicularOffset = {
	title: "PerpendicularOffset"
};
