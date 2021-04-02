// NO2
// Demonstrates before/after imagery comparison with a variety of dates.
var collection19 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2019-03-23', '2019-05-31');
  
var collection20 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-03-23', '2020-05-31');  

/*
 * Configure the imagery
 */

// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
//  'L5_01_86' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/19860101'),
//  'L5_01_89' : ee.Image('ANDSAT/LT05/C01/T1_8DAY_EVI/1989010'),
  'NO2_2019' : collection19.mean(),
//  'L5_01_02' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20020101'),
//  'L5_01_04' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20040101'),
  'NO2_2020' : collection20.mean(),
//  '5_01_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20110117'),
//  '5_02_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20011024')
};



var viz = {
min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'], 
  opacity:0.8,
};



// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
//function getWeeklySentinelComposite(date) {
//  var polarization = 'VV';
//  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
//                      .filterDate(date, date.advance(1, 'week'))
//                      .filter(ee.Filter.listContains(
//                          'transmitterReceiverPolarisation', polarization))
//                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
//                      .select(polarization)
//                      .mean();
//  return sentinel1.visualize({min: -1, max: 1, palette: ['aqua', 'black']});
//}
//Map.addLayer(images, viz);

/*
 * Set up the maps and control widgets
 */

// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.add(createLegend())
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//Map.addLayer(leftMap, viz);

// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.add(createLegend())
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');

// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');

  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],viz));
  }

  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);

  var controlPanel =
      ui.Panel({widgets: [label, select, ], style: {position: position}});

  mapToChange.add(controlPanel);
}

function createLegend() {
    var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
  })

  // Create legend title
  var legendTitle = ui.Label({
    value: 'NO2_column_number_density',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  
   // Add the title to the panel
  legend.add(legendTitle); 

  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['max'])
      ],
    });
  legend.add(panel);

  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var thumbnail = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions:'10x200'},  
    style: {padding: '1px', position: 'bottom-center'}
  });

  // add the thumbnail to the legend
  legend.add(thumbnail);

  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['min'])
      ],
    });
  
  legend.add(panel);
  return legend
}
/*
 * Tie everything together
 */

// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});

// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
//Map.setCenter(25.27, 24.11, 2.8);
leftMap.setCenter(45.27, 24.11, 4);

//O3

// Demonstrates before/after imagery comparison with a variety of dates.
var collection19 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_O3_TCL')
  .select('ozone_tropospheric_vertical_column')
  .filterDate('2019-03-23', '2019-05-31');
  
var collection20 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_O3_TCL')
  .select('ozone_tropospheric_vertical_column')
  .filterDate('2020-03-23', '2020-05-31');  

/*
 * Configure the imagery
 */

// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
//  'L5_01_86' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/19860101'),
//  'L5_01_89' : ee.Image('ANDSAT/LT05/C01/T1_8DAY_EVI/1989010'),
  'Tropos_O3_2019' : collection19.mean(),
//  'L5_01_02' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20020101'),
//  'L5_01_04' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20040101'),
  'Tropos_O3_2020' : collection20.mean(),
//  '5_01_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20110117'),
//  '5_02_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20011024')
};



var viz = {
min: 0.0,
  max: 0.015,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
  opacity:0.6,
};



// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
//function getWeeklySentinelComposite(date) {
//  var polarization = 'VV';
//  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
//                      .filterDate(date, date.advance(1, 'week'))
//                      .filter(ee.Filter.listContains(
//                          'transmitterReceiverPolarisation', polarization))
//                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
//                      .select(polarization)
//                      .mean();
//  return sentinel1.visualize({min: -1, max: 1, palette: ['aqua', 'black']});
//}
//Map.addLayer(images, viz);

/*
 * Set up the maps and control widgets
 */

// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.add(createLegend())
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//Map.addLayer(leftMap, viz);

// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.add(createLegend())
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');

// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');

  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],viz));
  }

  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);

  var controlPanel =
      ui.Panel({widgets: [label, select, ], style: {position: position}});

  mapToChange.add(controlPanel);
}

function createLegend() {
    var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
  })

  // Create legend title
  var legendTitle = ui.Label({
    value: 'Tropos O3 mixing ratio(mol/m2)',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  
   // Add the title to the panel
  legend.add(legendTitle); 

  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['max'])
      ],
    });
  legend.add(panel);

  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var thumbnail = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions:'10x200'},  
    style: {padding: '1px', position: 'bottom-center'}
  });

  // add the thumbnail to the legend
  legend.add(thumbnail);

  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['min'])
      ],
    });
  
  legend.add(panel);
  return legend
}
/*
 * Tie everything together
 */

// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});

// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
//Map.setCenter(25.27, 24.11, 2.8);
leftMap.setCenter(45.27, 4.0, 4);

// PM2.5

// Demonstrates before/after imagery comparison with a variety of dates.
var collection19 = ee.ImageCollection('ECMWF/CAMS/NRT')
  .select('particulate_matter_d_less_than_25_um_surface')
  .filterDate('2019-03-23', '2019-05-31');
  
var collection20 = ee.ImageCollection('ECMWF/CAMS/NRT')
  .select('particulate_matter_d_less_than_25_um_surface')
  .filterDate('2020-03-23', '2020-05-31');  

/*
 * Configure the imagery
 */

// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
//  'L5_01_86' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/19860101'),
//  'L5_01_89' : ee.Image('ANDSAT/LT05/C01/T1_8DAY_EVI/1989010'),
  'PM2.5_2019' : collection19.mean(),
//  'L5_01_02' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20020101'),
//  'L5_01_04' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20040101'),
  'PM2.5_2020' : collection20.mean(),
//  '5_01_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20110117'),
//  '5_02_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20011024')
};



var viz = {
min: 0.0,
  max: 2*7.6e-08,
  palette: [
    "5E4FA2",
    "3288BD",
    "66C2A5",
    "ABE0A4",
    "E6F598",
    "FFFFBF",
    "FEE08B",
    "FDAE61",
    "F46D43",
    "D53E4F",
    "9E0142"
  ], 
  opacity:0.8,
};



// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
//function getWeeklySentinelComposite(date) {
//  var polarization = 'VV';
//  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
//                      .filterDate(date, date.advance(1, 'week'))
//                      .filter(ee.Filter.listContains(
//                          'transmitterReceiverPolarisation', polarization))
//                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
//                      .select(polarization)
//                      .mean();
//  return sentinel1.visualize({min: -1, max: 1, palette: ['aqua', 'black']});
//}
//Map.addLayer(images, viz);

/*
 * Set up the maps and control widgets
 */

// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.add(createLegend())
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//Map.addLayer(leftMap, viz);

// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.add(createLegend())
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');

// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');

  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],viz));
  }

  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);

  var controlPanel =
      ui.Panel({widgets: [label, select, ], style: {position: position}});

  mapToChange.add(controlPanel);
}

function createLegend() {
    var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
  })

  // Create legend title
  var legendTitle = ui.Label({
    value: 'PM 2.5 (kg/m3)',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  
   // Add the title to the panel
  legend.add(legendTitle); 

  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['max'])
      ],
    });
  legend.add(panel);

  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var thumbnail = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions:'10x200'},  
    style: {padding: '1px', position: 'bottom-center'}
  });

  // add the thumbnail to the legend
  legend.add(thumbnail);

  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['min'])
      ],
    });
  
  legend.add(panel);
  return legend
}
/*
 * Tie everything together
 */

// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});

// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
//Map.setCenter(25.27, 24.11, 2.8);
leftMap.setCenter(45.27, 24.11, 4);

// TEMP
// Demonstrates before/after imagery comparison with a variety of dates.
var collection19 = ee.ImageCollection('MODIS/006/MYD11A1')
  .select('LST_Day_1km')
  .filterDate('2019-03-23', '2019-05-31');
  
var collection20 = ee.ImageCollection('MODIS/006/MYD11A1')
  .select('LST_Day_1km')
  .filterDate('2020-03-23', '2020-05-31');  

/*
 * Configure the imagery
 */

// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
//  'L5_01_86' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/19860101'),
//  'L5_01_89' : ee.Image('ANDSAT/LT05/C01/T1_8DAY_EVI/1989010'),
  'LST_2019' : collection19.mean().multiply(0.02),
//  'L5_01_02' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20020101'),
//  'L5_01_04' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20040101'),
  'LST_2020' : collection20.mean().multiply(0.02),
//  '5_01_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20110117'),
//  '5_02_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20011024')
};



var viz = {
min: 13000.0*0.02,
  max: 16500.0*0.02,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
  opacity:0.6,
};



// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
//function getWeeklySentinelComposite(date) {
//  var polarization = 'VV';
//  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
//                      .filterDate(date, date.advance(1, 'week'))
//                      .filter(ee.Filter.listContains(
//                          'transmitterReceiverPolarisation', polarization))
//                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
//                      .select(polarization)
//                      .mean();
//  return sentinel1.visualize({min: -1, max: 1, palette: ['aqua', 'black']});
//}
//Map.addLayer(images, viz);

/*
 * Set up the maps and control widgets
 */

// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.add(createLegend())
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//Map.addLayer(leftMap, viz);

// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.add(createLegend())
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');

// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');

  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],viz));
  }

  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);

  var controlPanel =
      ui.Panel({widgets: [label, select, ], style: {position: position}});

  mapToChange.add(controlPanel);
}

function createLegend() {
    var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
  })

  // Create legend title
  var legendTitle = ui.Label({
    value: 'LST (K)',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  
   // Add the title to the panel
  legend.add(legendTitle); 

  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['max'])
      ],
    });
  legend.add(panel);

  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var thumbnail = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions:'10x200'},  
    style: {padding: '1px', position: 'bottom-center'}
  });

  // add the thumbnail to the legend
  legend.add(thumbnail);

  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['min'])
      ],
    });
  
  legend.add(panel);
  return legend
}
/*
 * Tie everything together
 */

// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});

// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
//Map.setCenter(25.27, 24.11, 2.8);
leftMap.setCenter(45.27, 24.11, 4);

// Wind

// Demonstrates before/after imagery comparison with a variety of dates.
var collection19 = ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H')
  .select('Wind_f_inst')
  .filterDate('2019-03-23', '2019-05-31');
  
var collection20 = ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H')
  .select('Wind_f_inst')
  .filterDate('2020-03-23', '2020-05-31');  

/*
 * Configure the imagery
 */

// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
//  'L5_01_86' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/19860101'),
//  'L5_01_89' : ee.Image('ANDSAT/LT05/C01/T1_8DAY_EVI/1989010'),
  'WindSpeed_2019' : collection19.mean(),
//  'L5_01_02' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20020101'),
//  'L5_01_04' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20040101'),
  'WindSpeed_2020' : collection20.mean(),
//  '5_01_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20110117'),
//  '5_02_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20011024')
};



var viz = {
min: 0.0,
  max: 10.0,
  palette: ['1303ff', '42fff6', 'f3ff40', 'ff5d0f'],
  opacity:0.8,
};



// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
//function getWeeklySentinelComposite(date) {
//  var polarization = 'VV';
//  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
//                      .filterDate(date, date.advance(1, 'week'))
//                      .filter(ee.Filter.listContains(
//                          'transmitterReceiverPolarisation', polarization))
//                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
//                      .select(polarization)
//                      .mean();
//  return sentinel1.visualize({min: -1, max: 1, palette: ['aqua', 'black']});
//}
//Map.addLayer(images, viz);

/*
 * Set up the maps and control widgets
 */

// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.add(createLegend())
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//Map.addLayer(leftMap, viz);

// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.add(createLegend())
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');

// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');

  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],viz));
  }

  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);

  var controlPanel =
      ui.Panel({widgets: [label, select, ], style: {position: position}});

  mapToChange.add(controlPanel);
}

function createLegend() {
    var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
  })

  // Create legend title
  var legendTitle = ui.Label({
    value: 'Wind Speed (m/s)',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  
   // Add the title to the panel
  legend.add(legendTitle); 

  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['max'])
      ],
    });
  legend.add(panel);

  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var thumbnail = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions:'10x200'},  
    style: {padding: '1px', position: 'bottom-center'}
  });

  // add the thumbnail to the legend
  legend.add(thumbnail);

  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['min'])
      ],
    });
  
  legend.add(panel);
  return legend
}
/*
 * Tie everything together
 */

// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});

// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
//Map.setCenter(25.27, 24.11, 2.8);
leftMap.setCenter(45.27, 24.11, 4);

// AOD
// // Demonstrates before/after imagery comparison with a variety of dates.
var collection19 = ee.ImageCollection('MODIS/006/MCD19A2_GRANULES')
  .select('Optical_Depth_055')
  .filterDate('2019-03-23', '2019-05-31');
  
var collection20 = ee.ImageCollection('MODIS/006/MCD19A2_GRANULES')
  .select('Optical_Depth_055')
  .filterDate('2020-03-23', '2020-05-31');  

/*
 * Configure the imagery
 */

// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
//  'L5_01_86' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/19860101'),
//  'L5_01_89' : ee.Image('ANDSAT/LT05/C01/T1_8DAY_EVI/1989010'),
  'AOD_2019' : collection19.mean(),
//  'L5_01_02' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20020101'),
//  'L5_01_04' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20040101'),
  'AOD_2020' : collection20.mean(),
//  '5_01_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20110117'),
//  '5_02_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20011024')
};



var viz = {
min: 0,
  max: 750,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'], 
  opacity:0.6,
};



// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
//function getWeeklySentinelComposite(date) {
//  var polarization = 'VV';
//  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
//                      .filterDate(date, date.advance(1, 'week'))
//                      .filter(ee.Filter.listContains(
//                          'transmitterReceiverPolarisation', polarization))
//                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
//                      .select(polarization)
//                      .mean();
//  return sentinel1.visualize({min: -1, max: 1, palette: ['aqua', 'black']});
//}
//Map.addLayer(images, viz);

/*
 * Set up the maps and control widgets
 */

// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.add(createLegend())
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//Map.addLayer(leftMap, viz);

// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.add(createLegend())
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');

// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');

  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],viz));
  }

  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);

  var controlPanel =
      ui.Panel({widgets: [label, select, ], style: {position: position}});

  mapToChange.add(controlPanel);
}

function createLegend() {
    var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
  })

  // Create legend title
  var legendTitle = ui.Label({
    value: 'AOD at 550 nm',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  
   // Add the title to the panel
  legend.add(legendTitle); 

  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['max'])
      ],
    });
  legend.add(panel);

  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var thumbnail = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions:'10x200'},  
    style: {padding: '1px', position: 'bottom-center'}
  });

  // add the thumbnail to the legend
  legend.add(thumbnail);

  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['min'])
      ],
    });
  
  legend.add(panel);
  return legend
}
/*
 * Tie everything together
 */

// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});

// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
//Map.setCenter(25.27, 24.11, 2.8);
leftMap.setCenter(45.27, 24.11, 4);
